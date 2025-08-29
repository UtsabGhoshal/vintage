import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLoginNeon, handleRegisterNeon, handleProfileNeon } from "./routes/auth-neon";
import { handleGetUsers, handleUpdateUserRole, handleDeleteUser } from "./routes/admin";
import { authenticateToken, requireRole } from "./middleware/auth";
import { databaseService } from "./services/database.service";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Database health check
  app.get("/api/health/db", async (_req, res) => {
    try {
      // Simple query to test database connection
      await databaseService.query("SELECT 1 as test");
      res.json({
        success: true,
        message: "Database connection healthy",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message
      });
    }
  });

  // Authentication routes (using Neon database)
  app.post("/api/auth/login", handleLoginNeon);
  app.post("/api/auth/register", handleRegisterNeon);
  app.get("/api/auth/profile", authenticateToken, handleProfileNeon);

  // Admin routes (collaborators only)
  app.get("/api/admin/users", authenticateToken, requireRole('collaborator'), handleGetUsers);
  app.put("/api/admin/users/:userId/role", authenticateToken, requireRole('collaborator'), handleUpdateUserRole);
  app.delete("/api/admin/users/:userId", authenticateToken, requireRole('collaborator'), handleDeleteUser);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
