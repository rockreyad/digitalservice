import {
    ServiceCategoryResponse,
    ServiceResponse,
} from './../../../types/service'
import axios from 'axios'

export async function addService({
    title,
    description,
    categoryId,
    price,
}: {
    title: string
    description: string
    categoryId: number
    price: number
}) {
    //send the request with axios
    const res = await axios.post(`http://localhost:4000/service`, {
        title,
        description,
        price,
        categoryId,
    })

    return res.data
}

export async function getService() {
    //send the request with axios
    const res = await axios.get(`http://localhost:4000/service`)
    return res.data as ServiceResponse
}

export async function getServiceCategory() {
    //send the request with axios
    const res = await axios.get(`http://localhost:4000/service/category`)
    return res.data as ServiceCategoryResponse
}

export async function getServiceByCategory(categoryId: number) {
    //send the request with axios
    const res = await axios.get(
        `http://localhost:4000/service/category/${categoryId}`,
    )
    return res.data as ServiceResponse
}

export async function createCategory({
    name,
    description,
}: {
    name: string
    description: string
}) {
    const res = await axios.post(`http://localhost:4000/service/category`, {
        name,
        description,
    })
    return res.data
}
