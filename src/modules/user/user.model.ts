import { model, Schema } from "mongoose";
import { User } from "./user.interface";

const UserSchema = new Schema<User>({
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  photoURL: {
    type: String,
    trim: true,
    required: true,
  },
  coin: {
    type: Number,
    default: 50,
    required: true,
  },
});

export const UserModel = model<User>("user", UserSchema);
