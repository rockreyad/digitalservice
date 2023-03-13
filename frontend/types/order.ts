export type OrderResponse = {
    status: boolean
    message: string
    data?: Order[]
}

export type OrderViewResponse = {
    status: boolean
    message: string
    data?: Order
}

export interface OrderError {
    message: string
}

export interface Order {
    orderId: number
    price?: number
    user: {
        firstName: string
        lastName: string
        email?: string
        user_id?: string
    }
    orderItems: {
        service: {
            title: string
        }[]
    }
    statusType: string
    createAt: string
}
