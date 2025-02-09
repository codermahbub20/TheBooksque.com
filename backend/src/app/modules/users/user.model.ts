import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const UserModel = model<TUser>('User', userSchema);
