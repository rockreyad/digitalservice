import { Express, Request, Response } from "express";
import { new_service, get_service_list } from "../controllers/services";

export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  /** Service : new,Service list,modify*/
  app.get("/service", get_service_list);
  app.post("/service", new_service);
}
