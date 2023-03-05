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
<<<<<<< HEAD
exports.create_a_category = exports.update_a_category = exports.find_a_category = exports.find_all_services_by_category = exports.find_all_category = void 0;
=======
exports.create_a_category = exports.update_a_category = exports.find_a_category = exports.find_all_services_by_category = void 0;
>>>>>>> main
const serviceCategory_1 = require("../services/serviceCategory");
function getErrorStatus(error) {
    return error.status || 500;
}
//Create a category
const create_a_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        if (!name || !description) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: "Please submit all the filed" });
        }
        const categoryData = {
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
        };
        //duplicate category check
        const duplicateCategory = yield (0, serviceCategory_1.find_first_category)({
            name: categoryData.name,
        });
        if (duplicateCategory) {
            //Response: Category already exist
            return res
                .status(400)
                .json({ status: false, message: "Category already exist" });
        }
        const responseData = yield (0, serviceCategory_1.create_category)(categoryData);
        let response = {
            status: true,
            message: "Category created successfully",
            data: {
                categoryId: responseData.id,
                name: responseData.name,
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
exports.create_a_category = create_a_category;
//Update a Category
const update_a_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, name, description } = req.body;
    try {
        if (!categoryId || !name || !description) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: "Please submit all the filed" });
        }
        const categoryData = {
            id: Number(categoryId),
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
        };
        const responseData = yield (0, serviceCategory_1.update_category)(categoryData);
        let response = {
            status: true,
            message: "Category updated successfully",
            data: {
                categoryId: responseData.id,
                name: responseData.name,
                description: responseData.description,
            },
        };
        //Response: Category updated successfully
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
exports.update_a_category = update_a_category;
<<<<<<< HEAD
//find all category
const find_all_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = yield (0, serviceCategory_1.all_category)();
        if (responseData.length === 0) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: "Category not found" });
        }
        let response = {
            status: true,
            message: "Category found successfully",
            data: responseData,
        };
        //Response: Category found successfully
        return res.status(200).json(response);
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
exports.find_all_category = find_all_category;
=======
>>>>>>> main
//find a category
const find_a_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.body;
    try {
        if (!categoryId) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: "Please submit all the filed" });
        }
        let categoryData = {
            id: Number(categoryId),
        };
        const responseData = yield (0, serviceCategory_1.find_first_category_by_id)(categoryData);
        if (!responseData) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: "Category not found" });
        }
        let response = {
            status: true,
            message: "Category found successfully",
            data: {
                categoryId: responseData.id,
                name: responseData.name,
                description: responseData.description,
            },
        };
        //Response: Category found successfully
        return res.status(201).json(response);
    }
<<<<<<< HEAD
    catch (error) {
        let status = getErrorStatus(error);
        let responseData = {
            status: false,
            message: error,
        };
        //Response: Error
        res.status(status || 500).json(responseData);
    }
=======
    catch (error) { }
>>>>>>> main
});
exports.find_a_category = find_a_category;
//find all services by category
const find_all_services_by_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const { categoryId } = req.params;
=======
    const { categoryId } = req.body;
>>>>>>> main
    try {
        if (!categoryId) {
            //Response: Mandatory fields are missing
            return res
                .status(400)
                .json({ status: false, message: "Please submit all the filed" });
        }
        let categoryData = {
            categoryId: Number(categoryId),
        };
        const responseData = yield (0, serviceCategory_1.find_all_services_by_category_id)(categoryData);
        if (!responseData) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: "Category not found" });
        }
        let response = {
            status: true,
            message: `${responseData.length} Category found successfully`,
            data: responseData.map((item) => {
                return {
                    serviceId: item.id,
                    title: item.title,
                    status: item.status,
                    description: item.description,
                };
            }),
        };
        //Response: Category found successfully
<<<<<<< HEAD
        return res.status(200).json(response);
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
=======
        return res.status(201).json(response);
    }
    catch (error) { }
>>>>>>> main
});
exports.find_all_services_by_category = find_all_services_by_category;
//# sourceMappingURL=serviceCategory.js.map