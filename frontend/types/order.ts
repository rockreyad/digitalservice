export type OrderResponse = {
    status: boolean
    message: string
    data?: Order[]
}

export type Order = {
    orderId: number
    price?: number
    user: {
        firstName: string
        lastName: string
        user_id: string
    }
    orderItems: {
        service: {
            title: string
        }[]
    }
    statusType: string
    createAt: string
}
