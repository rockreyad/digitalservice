import {
    ServiceCategoryResponse,
    ServiceResponse,
} from './../../../types/service'
import axios from '../../utils/axiosUtils'

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
    const res = await axios.post(`/service`, {
        title,
        description,
        price,
        categoryId,
    })

    return res.data
}

export async function getService() {
    //send the request with axios
    const res = await axios.get(`/service`)
    return res.data as ServiceResponse
}

export async function getCategories() {
    //send the request with axios
    const res = await axios.get(`/category`)
    return res.data as ServiceCategoryResponse
}

export async function getServiceByCategory(categoryId: number) {
    //send the request with axios
    const res = await axios.get(`/category/${categoryId}`)
    return res.data as ServiceResponse
}

export async function createCategory({
    name,
    description,
}: {
    name: string
    description: string
}) {
    const res = await axios.post(`/category`, {
        name,
        description,
    })
    return res.data
}
