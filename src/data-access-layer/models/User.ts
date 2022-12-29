import { Schema, model } from 'mongoose';
import { UserNS }  from '../model-interfaces';

const userSchema = new Schema<UserNS.UserBaseDocument>({
  name: { 
    type: String, 
    required: true
  },
  username: {
    type: String, 
    require:  true, 
    unique: true, 
    index: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true  
  },
  password: { 
    type: String, 
    require: true
  },
  gender: { 
    type: String, 
    enum: Object.values(UserNS.Gender), 
    required: true
  },
  avatar: { 
    type: String, 
    required: false
  },
  isBlocked: {
    type: Boolean, 
    required: false, 
    default: null
  },
  blockedDate: {
    type: Date, 
    required: false, 
    default: null
  },
}, {
   timestamps: true 
});

const User = model<UserNS.UserBaseDocument>('User', userSchema);

export default User;
