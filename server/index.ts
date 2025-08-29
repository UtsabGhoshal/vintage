import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLoginFallback, handleRegisterFallback, handleProfileFallback } from "./routes/auth-fallback";
import { authenticateToken } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Authentication routes (using fallback for now due to MongoDB Atlas IP restrictions)
  app.post("/api/auth/login", handleLoginFallback);
  app.post("/api/auth/register", handleRegisterFallback);
  app.get("/api/auth/profile", authenticateToken, handleProfileFallback);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
