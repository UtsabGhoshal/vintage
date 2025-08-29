import { RequestHandler } from "express";
import { databaseService } from "../services/database.service";
import { authenticateToken, requireRole } from "../middleware/auth";

// Get all users (collaborators only)
export const handleGetUsers: RequestHandler = async (req: any, res) => {
  try {
    const users = await databaseService.getAllUsers();

    // Remove password field from response
    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
    }));

    return res.json({
      success: true,
      users: sanitizedUsers,
      total: users.length,
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user role (collaborators only)
export const handleUpdateUserRole: RequestHandler = async (req: any, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["collaborator", "guest"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either collaborator or guest",
      });
    }

    const updatedUser = await databaseService.updateUserRole(userId, role);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.created_at,
      },
    });
  } catch (error) {
    console.error("Update user role error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete user (collaborators only)
export const handleDeleteUser: RequestHandler = async (req: any, res) => {
  try {
    const { userId } = req.params;

    // Prevent users from deleting themselves
    if (req.user.userId === userId) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    const deleted = await databaseService.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
