"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const services_1 = require("../controllers/services");
const users_1 = require("../controllers/users");
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    /** Service : new,Service list,modify*/
    app.get("/service", services_1.find_all_services);
    app.post("/service", services_1.new_service);
    app.put("/service", services_1.update_a_service);
    /** Authentication : Login , Register */
    app.post("/login", authentication_1.signInWithEmailAndPassword);
    app.post("/register", authentication_1.RegisterAnUserWithEmailAndPassword);
    /** User : User list, User details, User modify */
    app.get("/user", users_1.all_users);
}
exports.default = routes;
//# sourceMappingURL=index.js.map