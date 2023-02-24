import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

function getErrorStatus(error: any) {
  return error.status || 500;
}

const prisma = new PrismaClient();
import { create_service, read } from "../services/service";

const new_service = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const responseData = await prisma.service.create({
      data: { title, description },
    });

    return res.json(responseData);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let responseData = {
      status: "FAILED",
      message: error,
    };

    res.status(status || 500).json(responseData);
  }
};

//get service list
const get_service_list = async (req: Request, res: Response) => {
  try {
    const responseData = await read();
    return res.json(responseData);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let responseData = {
      status: "FAILED",
      message: error,
    };

    res.status(status || 500).json(responseData);
  }
};

export { new_service, get_service_list };
