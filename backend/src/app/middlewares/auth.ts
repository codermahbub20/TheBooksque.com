import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../Errors/AppError';
import CatchAsync from '../utils/CatchAsync';
import { User } from '../modules/User/user.model';

type Role = 'admin' | 'user';

const auth = (...roles: Role[]) => {
  return CatchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const bearerToken = req.headers.authorization;

      if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new AppError(401, 'Invalid or missing authorization header');
      }

      const token = bearerToken.split(' ')[1];

      if (!token) {
        throw new AppError(401, "You're not authorized to access this route");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { email } = decoded;

      const user = await User.isUserExistByemail(email);

      if (!user) {
        throw new AppError(401, "You're not authorized to access this route");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(
          403,
          "You don't have permission to access this route",
        );
      }

      req.user = user;

      next();
    },
  );
};
export default auth;
