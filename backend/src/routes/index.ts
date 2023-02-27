import { Express, Request, Response } from "express";
import { RegisterAnUserWithEmailAndPassword, signInWithEmailAndPassword } from "../controllers/authentication";
import { new_service, get_service_list } from "../controllers/services";

export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  /** Service : new,Service list,modify*/
  app.get("/service", get_service_list);
  app.post("/service", new_service);

  /** Authentication : Login , Register */
  app.post("/login", signInWithEmailAndPassword);
  app.post("/register", RegisterAnUserWithEmailAndPassword);

}
