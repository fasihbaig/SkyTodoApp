// cat.model.ts
import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  avtar: string | null;
  dateOfBirth: Date | null;
  isBlocked: boolean | null;
  blockedDate: Date | null;
  createdAt: string;
  updatedAt: string;
  
}

const UserSchema = new Schema({
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
      enum: ["male", "female", "other"], 
      required: true
    },
    avatar: { 
      type: String, 
      required: false
    },
    dateOfBirth: { 
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

export const UserModel = model<User>('User', UserSchema);