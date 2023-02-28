import { Request, Response } from "express";
import { get_user, user_list } from "../services/user";

function getErrorStatus(error: any) {
  return error.status || 500;
}

const all_users = async (req: Request, res: Response) => {
  try {
    const users = await user_list();

    if (!users)
      //Response : User not Found
      return res
        .status(400)
        .json({ status: false, message: "No users found!" });
    let response = {
      status: true,
      message: `${users?.length} Users found`,
      data: users?.map((user) => {
        return {
          userId: user.user_id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        };
      }),
    };

    //Response: UserList
    return res.status(200).json(response);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let response = {
      status: false,
      message: error,
    };

    res.status(status || 500).json(response);
  }
};

const find_user = async (req: Request, res: Response) => {
  const { email } = req.body || req.params;

  try {
    if (!email) {
      //Response: Mandatory fields are missing
      return res
        .status(400)
        .json({ status: false, message: "Please submit all the filed" });
    }

    const user = await get_user({ email });

    if (!user) {
      //Response : User not Found
      return res
        .status(400)
        .json({ status: false, message: "User not found!" });
    }
    let response = {
      status: true,
      message: "User found",
      data: {
        userId: user.user_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    };

    //Response: User
    return res.status(200).json(response);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let response = {
      status: false,
      message: error,
    };

    res.status(status || 500).json(response);
  }
};


export { all_users, find_user };
