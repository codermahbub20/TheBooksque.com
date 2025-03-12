/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Response } from 'express';
import { Request } from 'express'; // Keep this import to ensure proper type extension
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../Errors/AppError';
import { User } from '../modules/User/user.model';

// types/auth.ts
declare module 'express-serve-static-core' {
  export interface Request {
    user?: AuthenticatedUser;
  }
}

export interface AuthenticatedUser extends JwtPayload {
  role: string;
  email: string;
}

// middleware/auth.ts
const auth = (...requiredRoles: string[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication token missing or invalid format');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as AuthenticatedUser;

      const user = await User.isUserExists(decoded.email);

      if (!user) {
        throw new AppError(400, 'User not found');
      }

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new AppError(403, 'Forbidden - Insufficient permissions');
      }

      (req as Request).user = decoded;

      next();
    } catch (err) {
      throw new AppError(401, 'Invalid authentication token');
    }
  });
};

export default auth;
