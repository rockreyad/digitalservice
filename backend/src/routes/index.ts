import { Express, Request, Response } from "express";
import {
  RegisterAnUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../controllers/authentication";
import {
  new_service,
  find_all_services,
  update_a_service,
} from "../controllers/services";
import { all_users } from "../controllers/users";

export default function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  /** Service : new,Service list,modify*/
  app.get("/service", find_all_services);
  app.post("/service", new_service);
  app.put("/service", update_a_service);

  /** Authentication : Login , Register */
  app.post("/login", signInWithEmailAndPassword);
  app.post("/register", RegisterAnUserWithEmailAndPassword);

  /** User : User list, User details, User modify */
  app.get("/user", all_users);
}
