import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const register = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const AuthController = {
  register,
  login,
};
