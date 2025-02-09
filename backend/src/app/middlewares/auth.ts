import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../Errors/AppError';
import CatchAsync from '../utils/CatchAsync';
import { User } from '../modules/User/user.model';
const auth = (...requiredRoles: string[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization,requiredRoles);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(403, `Unauthorized User `);
    }
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(actualToken, config.jwt_access_secret as string);

    const { role, email } = decoded as JwtPayload;
    const user = await User.isUserExistByemail(email);
    if (!user) {
      throw new AppError(401, `Invalid credentials`);
    }
    const BlockedUser = await User.isUserBlocked(email);
    if (BlockedUser) {
      throw new AppError(403, `The user is blocked `);
    }
    // const isUserisDeleted=user?.isDeleted
    // if(isUserisDeleted){
    //     throw new AppError(httpStatus.FORBIDDEN,`The user is deleted `);
    // }
    console.log(requiredRoles.includes(role));
    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(403, `Unauthorized User `);
    // }
    req.user = decoded as JwtPayload;

    next();
  });
};
export default auth;
