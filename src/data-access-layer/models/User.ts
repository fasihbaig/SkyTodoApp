import { Schema, model } from 'mongoose';
import { UserNS }  from '../model-interfaces';

const userSchema = new Schema<UserNS.UserBaseDocument>({
  name: { type: String, required: true },
  username: {type: String, require:  true, unique: true },
  email: { type: String, required: true, unique: true  },
  password: { type: String, require: true },
  gender: { type: String, enum: Object.values(UserNS.Gender), required: true},
  avatar: String
});

export const User = model<UserNS.UserBaseDocument>('User', userSchema);
