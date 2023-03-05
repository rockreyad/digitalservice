import { Request, Response } from "express";

function getErrorStatus(error: any) {
  return error.status || 500;
}

import {
  create_service,
  all_service,
  update_service,
  find_first_service,
} from "../services/service";

const new_service = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId } = req.body;

    if (!title || !description || !categoryId) {
      //Response: Mandatory fields are missing
      return res
        .status(400)
        .json({ status: false, message: "Please submit all the filed" });
    }

    let serviceData = {
      title,
      description,
      categoryId: Number(categoryId),
    };

    //find duplicate service
    const duplicateService = await find_first_service(serviceData.title);
    if (duplicateService) {
      //Response: Service already exist
      return res
        .status(400)
        .json({ status: false, message: "Service already exist" });
    }

    const responseData = await create_service(serviceData);

    let response = {
      status: true,
      message: "Service created successfully",
      data: {
        serviceId: responseData.id,
        title: responseData.title,
      },
    };

    //Response: User created successfully
    return res.status(201).json(response);
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

//get service list
const find_all_services = async (req: Request, res: Response) => {
  try {
    const responseData = await all_service();

    if (!responseData) {
      return res
        .status(404)
        .json({ status: false, message: "No service found" });
    }

    let response = {
      status: true,
      message: `${responseData.length} Services found`,
      data: responseData.map((service) => {
        return {
          serviceId: service.id,
          title: service.title,
          description: service.description,
          status: service.status,
        };
      }),
    };

    return res.status(200).json(response);
  } catch (error: unknown) {
    let status: number = getErrorStatus(error);

    let responseData = {
      status: false,
      message: error,
    };

    res.status(status || 500).json(responseData);
  }
};

//update service
const update_a_service = async (req: Request, res: Response) => {
  try {
    const { id, title, description, status } = req.body;

    if (!id || !title || !description || !status) {
      //Response: Mandatory fields are missing
      return res
        .status(400)
        .json({ status: false, message: "Please submit all the filed" });
    }

    let serviceData = {
      id: Number(id),
      title,
      description,
      status: Boolean(status),
    };

    const responseData = await update_service(serviceData);

    let response = {
      status: true,
      message: "Service updated successfully",
      data: {
        serviceId: responseData.id,
        title: responseData.title,
      },
    };

    //Service updated successfully
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
export { new_service, find_all_services, update_a_service };
