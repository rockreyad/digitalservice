"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
const services_1 = require("../controllers/services");
const users_1 = require("../controllers/users");
const serviceCategory_1 = require("../controllers/serviceCategory");
const order_1 = require("../controllers/order");
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
    /** Service Category : new,Service list by Category,modify*/
    app.get("/service/category", serviceCategory_1.find_all_category);
    app.get("/service/category/:categoryId", serviceCategory_1.find_all_services_by_category);
    app.post("/service/category", serviceCategory_1.create_a_category);
    app.put("/service/category", serviceCategory_1.update_a_category);
    /** Order : new,Order list,modify*/
    app.post("/order", order_1.create_an_order);
    app.put("/order", order_1.update_an_order);
    app.get("/order", order_1.get_all_order);
    app.get("/order/:orderId", order_1.find_an_order);
    app.get("/order/user/:userId", order_1.get_all_order_by_userId);
}
exports.default = routes;
//# sourceMappingURL=index.js.map