import { neon } from '@neondatabase/serverless';

export class DatabaseService {
    private readonly sql;

    constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            throw new Error('DATABASE_URL environment variable is required');
        }
        this.sql = neon(databaseUrl);
    }

    // Initialize user table
    async initializeUserTable() {
        try {
            await this.sql`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) CHECK (role IN ('collaborator', 'guest')) NOT NULL DEFAULT 'guest',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            console.log('User table initialized successfully');
        } catch (error) {
            console.error('Error initializing user table:', error);
            throw error;
        }
    }

    // Create a new user
    async createUser(username: string, email: string, hashedPassword: string, role: 'collaborator' | 'guest') {
        try {
            const result = await this.sql`
                INSERT INTO users (username, email, password, role)
                VALUES (${username}, ${email}, ${hashedPassword}, ${role})
                RETURNING id, username, email, role, created_at
            `;
            return result[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Find user by email
    async findUserByEmail(email: string) {
        try {
            const result = await this.sql`
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
        try {
            const result = await this.sql`
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
        try {
            const result = await this.sql`
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
        try {
            const result = await this.sql`
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
        try {
            const result = await this.sql`
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
        try {
            const result = await this.sql`
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
        try {
            // Note: Neon uses template literals, so this is a simplified wrapper
            const result = await this.sql(queryText, params);
            return result;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
}

// Create singleton instance
export const databaseService = new DatabaseService();
