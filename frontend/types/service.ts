export type Service = {
    serviceId?: number
    title: string
    description: string
    status: boolean
    createdAt?: string
    updatedAt?: string
}

export type ServiceResponse = {
    status: boolean
    message: string
    data?: Service[]
}

export type ServiceCategoryResponse = {
    status: boolean
    message: string
    data?: ServiceCategory[]
}

export type ServiceCategory = {
    id: number
    name: string
    description: string
    createdAt?: string
    updatedAt?: string
}
