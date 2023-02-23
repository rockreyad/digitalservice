import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

function getErrorStatus(error: any) {
  return error.status || 500;
}

const prisma = new PrismaClient();
import { create_service, read } from "../services/services";

const new_service = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const service = await prisma.service.create({
      data: { ...req.body },
    });

    return res.json(service);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    res.status(status || 500).json({
      status: "FAILED",
      message: error,
    });
  }
};

//get service list
const get_service_list = async (req: Request, res: Response) => {
  try {
    const service = await read();
    return res.json(service);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    res.status(status || 500).json({
      status: "FAILED",
      message: error,
    });
  }
};

export { new_service, get_service_list };
