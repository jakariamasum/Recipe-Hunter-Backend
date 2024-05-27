import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserToDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserByEmailFromDB = async (email: string) => {
  const result = await UserModel.findOne({ email: email });
  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSingleUserByEmailFromDB,
};
