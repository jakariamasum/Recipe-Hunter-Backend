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
  coin: {
    type: Number,
    default: 50,
  },
  photoURL: {
    type: String,
    trim: true,
  },
});

export const UserModel = model<User>("user", UserSchema);
