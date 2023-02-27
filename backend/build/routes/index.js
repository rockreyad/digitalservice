"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const services_1 = require("../controllers/services");
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    /** Service : new,Service list,modify*/
    app.get("/service", services_1.get_service_list);
    app.post("/service", services_1.new_service);
    /** Authentication : Login , Register */
    app.post("/login", authentication_1.signInWithEmailAndPassword);
    app.post("/register", authentication_1.RegisterAnUserWithEmailAndPassword);
}
exports.default = routes;
//# sourceMappingURL=index.js.map