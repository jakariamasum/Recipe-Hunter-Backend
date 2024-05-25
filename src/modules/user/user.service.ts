import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserToDB= async (user:User)=>{
    const result= await UserModel.create(user);
    return user;
}

const getAllUsersFromDB= async ()=>{
    const result= await UserModel.find();
    return result;
}

const getSingleUserByEmailFromDB= async (email: string)=>{
    const result= await UserModel.findOne({email});
    return result;
}

export const userServices={
    createUserToDB,
    getAllUsersFromDB,
    getSingleUserByEmailFromDB,
}