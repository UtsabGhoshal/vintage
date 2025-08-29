import { neon } from '@neondatabase/serverless';

export class DatabaseService {
    private sql: ReturnType<typeof neon> | null = null;

    private ensureSql() {
        if (this.sql) return;
        const databaseUrl = process.env.DATABASE_URL;
        // Do not initialize with placeholder or missing URL to avoid crashing dev server
        if (!databaseUrl || /user:password@hostname:port\/database/.test(databaseUrl)) {
            throw new Error('DATABASE_URL is not configured. Please set a valid Neon connection string.');
        }
        this.sql = neon(databaseUrl);
    }

    // Initialize user table
    async initializeUserTable() {
        this.ensureSql();
        try {
            await this.sql!`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) CHECK (role IN ('collaborator', 'guest')) NOT NULL DEFAULT 'guest',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            // Optional: index for faster lookups
            await this.sql!`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
            await this.sql!`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`;
            console.log('User table initialized successfully');
        } catch (error) {
            console.error('Error initializing user table:', error);
            throw error;
        }
    }

    // Create a new user
    async createUser(username: string, email: string, hashedPassword: string, role: 'collaborator' | 'guest') {
        this.ensureSql();
        try {
            const result = await this.sql!`
                INSERT INTO users (username, email, password, role)
                VALUES (${username}, ${email}, ${hashedPassword}, ${role})
                RETURNING id, username, email, role, created_at
            `;
            return result[0];
        } catch (error: any) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Find user by email
    async findUserByEmail(email: string) {
        this.ensureSql();
        try {
            const result = await this.sql!`
                SELECT id, username, email, password, role, created_at
                FROM users
                WHERE email = ${email}
                LIMIT 1
            `;
            return result[0] || null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    // Find user by ID
    async findUserById(id: string) {
        this.ensureSql();
        try {
            const result = await this.sql!`
                SELECT id, username, email, role, created_at
                FROM users
                WHERE id = ${id}
                LIMIT 1
            `;
            return result[0] || null;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    // Check if user exists by email or username
    async userExists(email: string, username: string) {
        this.ensureSql();
        try {
            const result = await this.sql!`
                SELECT id FROM users
                WHERE email = ${email} OR username = ${username}
                LIMIT 1
            `;
            return result.length > 0;
        } catch (error) {
            console.error('Error checking if user exists:', error);
            throw error;
        }
    }

    // Get all users (for admin purposes)
    async getAllUsers() {
        this.ensureSql();
        try {
            const result = await this.sql!`
                SELECT id, username, email, role, created_at
                FROM users
                ORDER BY created_at DESC
            `;
            return result;
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    // Update user role
    async updateUserRole(id: string, role: 'collaborator' | 'guest') {
        this.ensureSql();
        try {
            const result = await this.sql!`
                UPDATE users
                SET role = ${role}
                WHERE id = ${id}
                RETURNING id, username, email, role, created_at
            `;
            return result[0] || null;
        } catch (error) {
            console.error('Error updating user role:', error);
            throw error;
        }
    }

    // Delete user
    async deleteUser(id: string) {
        this.ensureSql();
        try {
            const result = await this.sql!`
                DELETE FROM users
                WHERE id = ${id}
                RETURNING id
            `;
            return result.length > 0;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    // Generic query method for custom operations
    async query(queryText: string, params: any[] = []) {
        this.ensureSql();
        try {
            // Neon uses tagged template literals; this helper allows raw text when needed
            const result = await (this.sql as any)(queryText, params);
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

// Singleton instance (lazy neon init)
export const databaseService = new DatabaseService();
