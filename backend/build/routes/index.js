"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../controllers/services");
function routes(app) {
    app.get("/", (req, res) => {
        res.send("Express + TypeScript Server");
    });
    /** Service : new,Service list,modify*/
    app.get("/service", services_1.get_service_list);
    app.post("/service", services_1.new_service);
}
exports.default = routes;
//# sourceMappingURL=index.js.map