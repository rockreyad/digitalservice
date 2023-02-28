"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_a_service = exports.find_all_services = exports.new_service = void 0;
function getErrorStatus(error) {
    return error.status || 500;
}
const service_1 = require("../services/service");
const new_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, categoryId } = req.body;
        if (!title || !description) {
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
        const duplicateService = yield (0, service_1.find_first_service)(serviceData.title);
        if (duplicateService) {
            //Response: Service already exist
            return res
                .status(400)
                .json({ status: false, message: "Service already exist" });
        }
        const responseData = yield (0, service_1.create_service)(serviceData);
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
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
});
exports.new_service = new_service;
//get service list
const find_all_services = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield (0, service_1.all_service)();
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
    }
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        res.status(status || 500).json(responseData);
    }
});
exports.find_all_services = find_all_services;
//update service
const update_a_service = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const responseData = yield (0, service_1.update_service)(serviceData);
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
    }
    catch (error) {
        let status = getErrorStatus(error);
        let response = {
            status: false,
            message: error,
        };
        res.status(status || 500).json(response);
    }
});
exports.update_a_service = update_a_service;
//# sourceMappingURL=services.js.map