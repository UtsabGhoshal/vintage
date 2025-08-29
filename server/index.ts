import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLoginNeon, handleRegisterNeon, handleProfileNeon } from "./routes/auth-neon";
import { authenticateToken } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Authentication routes (using Neon database)
  app.post("/api/auth/login", handleLoginNeon);
  app.post("/api/auth/register", handleRegisterNeon);
  app.get("/api/auth/profile", authenticateToken, handleProfileNeon);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
