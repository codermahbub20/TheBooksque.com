import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserValidation } from './user.validation';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  // validateRequest(UserValidation.UpdateUserValidationSchema),
  UserController.BlockUserByAdmin,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  // validateRequest(BlogValidationScheema.UpdateblogValidationSchema),
  UserController.DeleteBlogByAdmin,
);
// call the controller
router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

export const userRoutes = router;
