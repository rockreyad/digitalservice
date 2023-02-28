import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { create_user, login_user } from "../services/auth";
import { get_user } from "../services/user";
import { create_role, get_role } from "../services/role";

const prisma = new PrismaClient();

function getErrorStatus(error: any) {
  return error.status || 500;
}

const RegisterAnUserWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !password) {
    //Response: Mandatory fields are missing
    return res
      .status(400)
      .json({ status: false, message: "Please submit all the filed" });
  }

  let userData = {
    firstName,
    lastName,
    email,
    password,
    phone,
  };

  try {
    //if user already exists
    const duplicateUser = await get_user({ email });

    if (duplicateUser) {
      //Response: User already exists
      return res.status(380).json({
        status: false,
        message: "Registration Fields! User already exists!",
      });
    }

    const createdUser = await create_user(userData);

    //Assign a Role to User
    const role = await create_role({ userId: createdUser.user_id });

    let response = {
      status: true,
      message: "User created successfully assigned a role",
      data: {
        userId: createdUser.user_id,
        role: role.role.role_name,
      },
    };

    //Response: User created successfully
    return res.status(201).json(response);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let responseData = {
      status: "FAILED",
      message: error,
    };

    //Response: Error
    res.status(status || 500).json(responseData);
  }
};

const signInWithEmailAndPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      //Response: Mandatory fields are missing
      return res
        .status(400)
        .json({ status: false, message: "Please submit all the filed" });
    }
    let userData = {
      email,
      password,
    };

    const user = await login_user(userData);
    if (!user) {
      //Response: User not exists
      return res
        .status(404)
        .json({ status: false, message: "User not found!" });
    }

    if (user.password !== password) {
      //Response: Password not Matched
      return res
        .status(401)
        .json({ status: false, message: "Password is incorrect!" });
    }

    //Get User Role
    const role = await get_role({ userId: user.user_id });

    const response = {
      status: true,
      message: "Login success!",
      data: { userId: user.user_id, role: role[0]?.role.role_name },
    };

    //Response: Login success
    return res.status(200).json(response);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let responseData = {
      status: false,
      message: error,
    };

    //Response: Error
    res.status(status || 500).json(responseData);
  }
};

export { RegisterAnUserWithEmailAndPassword, signInWithEmailAndPassword };
