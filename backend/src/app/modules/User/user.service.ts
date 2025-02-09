// import AppError from '../../Errors/AppError';

import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInToDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const users = await User.find().exec();
  return users;
};

// const DeleteBlogByAdminFromDB = async (id: string) => {
//   // Find the blog by ID
//   const blog = await Blog.findById(id);

//   if (!blog) {
//     throw new AppError(401, 'Blog not found');
//   }
//   const updatedBlog = await Blog.findByIdAndUpdate(
//     id,
//     {
//       isDeleted: true,
//     },
//     { new: true },
//   );

//   return updatedBlog;
// };
// Blocked user by admin
// const BlockedUserByAdminFromDB = async (id: string) => {
//   const updatedBlog = await User.findByIdAndUpdate(
//     id,
//     {
//       isBlocked: true,
//     },
//     { new: true },
//   );

//   return updatedBlog;
// };

export const UserServices = {
  createUserInToDB,
  getAllUserFromDB,
  // DeleteBlogByAdminFromDB,
  // BlockedUserByAdminFromDB,
};
