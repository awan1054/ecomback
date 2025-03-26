import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";

export interface AuthRequest extends Request {
  user?: {
    username: string;
    email: string;
    role: string;
    password: string; // Fixed typo
    id: string;
  };
}
export enum Role {
  Admin = "admin",
  Customer = "customer",
}

class AuthMiddleware {
  async isAuthenticated(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(400).json({ message: "Token not provided" });
      return;
    }

    const token = req.headers.authorization; // Extract actual token
    if (!token) {
      res.status(400).json({ message: "Invalid token format" });
      return;
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, decoded: any) => {
        if (err) {
          res.status(403).json({ message: "Invalid token" });
          return;
        }

        try {
          const UserData = await User.findByPk(decoded.id);
          if (!UserData) {
            res.status(404).json({ message: "No user with that token" });
            return;
          }

          req.user = UserData.get({ plain: true }); // Convert to plain object
          next();
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
        }
      }
    );
  }

  restrictTo(...roles: Role[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;

      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "You dont have permission",
        });
      } else {
        next();
      }
    };
  }
}
export default new AuthMiddleware();
