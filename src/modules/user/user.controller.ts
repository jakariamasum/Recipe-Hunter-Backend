import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const userInfo = req.body;

  try {
    let user = await userServices.getSingleUserByEmailFromDB(req.body.email);

    if (!user) {
      const userData = {
        ...userInfo,
        coin: 50,
      };
      const user = await userServices.createUserToDB(userData);

      const authToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "10h" }
      );

      res.status(400).json({
        success: true,
        message: "User created successfully",
        authToken,
        data: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "user already exits",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched succesfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
export const userControllers = {
  createUser,
  getAllUsers,
};
