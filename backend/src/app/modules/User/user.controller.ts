import { Request, RequestHandler, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserInToDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = CatchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users are fetched  successfully',
    data: result,
  });
});

const DeleteBlogByAdmin: RequestHandler = CatchAsync(async (req, res) => {
  const { id } = req.params;
  // Add the author's ID to the blog data
  await UserServices.DeleteBlogByAdminFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

const BlockUserByAdmin: RequestHandler = CatchAsync(async (req, res) => {
  const id = req.params.userId;

  // Add the author's ID to the blog data
  await UserServices.BlockedUserByAdminFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Blocked successfully',
    data: {},
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  DeleteBlogByAdmin,
  BlockUserByAdmin,
};
