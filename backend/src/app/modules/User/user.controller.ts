import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import UserService from './user.service';

const getMyProfile = CatchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserService.GetMyProfile(user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User profile fetched successfully',
    data: result,
  });
});

const getAllCustomers = CatchAsync(async (req, res) => {
  const result = await UserService.GetAllCustomers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Customers fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const blockUser = CatchAsync(async (req, res) => {
  const { targatedUserId } = req.params;
  const user = req.user;

  await UserService.BlockUser(targatedUserId, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User blocked successfully',
    data: {},
  });
});

export const UserController = { getMyProfile, blockUser, getAllCustomers };
