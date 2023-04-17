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
    user: {
        firstName: string
        lastName: string
        email?: string
        user_id?: string
    }
    invoiceId: string
    price?: number
    statusType: string
    statusId: number
    orderItems: {
        service: {
            title: string
        }[]
        itemPrice?: number
    }
    createAt: string
}

export type OrderStatus = {
    statusId: number
    name: string
    description?: string
}

export type OrderStatusResponse = {
    status: boolean
    message: string
    data?: OrderStatus[]
}
