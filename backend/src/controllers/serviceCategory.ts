import { Request, Response } from 'express'
import {
    create_category,
    find_all_services_by_category_id,
    find_first_category,
    find_first_category_by_id,
    update_category,
    all_category,
} from '../services/serviceCategory'

function getErrorStatus(error: any) {
    return error.status || 500
}

//Create a category
const create_a_category = async (req: Request, res: Response) => {
    const { name, description } = req.body
    try {
        if (!name || !description) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            })
        }
        const categoryData = {
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
        }

        //duplicate category check
        const duplicateCategory = await find_first_category({
            name: categoryData.name,
        })

        if (duplicateCategory) {
            //Response: Category already exist
            return res
                .status(400)
                .json({ status: false, message: 'Category already exist' })
        }

        const responseData = await create_category(categoryData)

        let response = {
            status: true,
            message: 'Category created successfully',
            data: {
                categoryId: responseData.id,
                name: responseData.name,
            },
        }

        //Response: User created successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//Update a Category
const update_a_category = async (req: Request, res: Response) => {
    const { categoryId, name, description } = req.body

    try {
        if (!categoryId || !name || !description) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            })
        }

        const categoryData = {
            id: Number(categoryId),
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
        }

        const responseData = await update_category(categoryData)

        let response = {
            status: true,
            message: 'Category updated successfully',
            data: {
                categoryId: responseData.id,
                name: responseData.name,
                description: responseData.description,
            },
        }

        //Response: Category updated successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//find all category
const find_all_category = async (req: Request, res: Response) => {
    try {
        const responseData = await all_category()

        if (responseData.length === 0) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: 'Category not found' })
        }

        let response = {
            status: true,
            message: 'Category found successfully',
            data: responseData,
        }
        //Response: Category found successfully
        return res.status(200).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//find a category
const find_a_category = async (req: Request, res: Response) => {
    const { categoryId } = req.body

    try {
        if (!categoryId) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            })
        }

        let categoryData = {
            id: Number(categoryId),
        }

        const responseData = await find_first_category_by_id(categoryData)

        if (!responseData) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: 'Category not found' })
        }

        let response = {
            status: true,
            message: 'Category found successfully',
            data: {
                categoryId: responseData.id,
                name: responseData.name,
                description: responseData.description,
            },
        }
        //Response: Category found successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

//find all services by category
const find_all_services_by_category = async (req: Request, res: Response) => {
    const { categoryId } = req.params

    try {
        if (!categoryId) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            })
        }

        let categoryData = {
            categoryId: Number(categoryId),
        }

        const responseData = await find_all_services_by_category_id(
            categoryData,
        )

        if (!responseData) {
            //Response: Category not found
            return res
                .status(400)
                .json({ status: false, message: 'Category not found' })
        }

        let response = {
            status: true,
            message: `${responseData.length} Category found successfully`,
            data: responseData.map((item) => {
                return {
                    serviceId: item.id,
                    title: item.title,
                    price: item.price,
                    status: item.status,
                    description: item.description,
                }
            }),
        }
        //Response: Category found successfully
        return res.status(200).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

export {
    find_all_category,
    find_all_services_by_category,
    find_a_category,
    update_a_category,
    create_a_category,
}
