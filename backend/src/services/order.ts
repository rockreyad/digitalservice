import prisma from '../config/prisma'

async function create_order({
    userId,
    statusId,
    price = 0,
    orderItems,
}: {
    userId: string
    statusId: number
    price: number
    orderItems: {
        serviceId: number
        itemPrice: number
    }[]
}) {
    const order = await prisma.order.create({
        data: {
            userId,
            statusId,
            price,
            orderItems: {
                create: orderItems,
            },
        },
        include: {
            orderItems: true,
        },
    })
    return order
}

async function find_order_by_userId({ userId }: { userId: string }) {
    const order = await prisma.order.findMany({
        where: {
            userId,
        },
        include: {
            orderItems: {
                select: {
                    service: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    user_id: true,
                },
            },
            status: {
                select: {
                    name: true,
                },
            },
        },
    })
    return order
}

async function find_order_by_orderId({ id }: { id: number }) {
    const order = await prisma.order.findUnique({
        where: {
            id,
        },
        include: {
            orderItems: {
                select: {
                    service: {
                        select: {
                            title: true,
                        },
                    },
                    itemPrice: true,
                },
            },
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            status: {
                select: {
                    name: true,
                },
            },
        },
    })
    return order
}

async function update_order({
    id,
    statusId,
}: {
    id: number
    statusId: number
}) {
    const order = await prisma.order.update({
        where: {
            id,
        },
        data: {
            statusId,
        },
        include: {
            orderItems: true,
        },
    })
    return order
}

async function all_order() {
    const order = await prisma.order.findMany({
        include: {
            orderItems: {
                select: {
                    service: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    user_id: true,
                },
            },
            status: {
                select: {
                    name: true,
                },
            },
        },
    })
    return order
}

async function find_all_order_status() {
    const orderStatus = await prisma.orderStatus.findMany()
    return orderStatus
}

export {
    create_order,
    all_order,
    update_order,
    find_order_by_userId,
    find_order_by_orderId,
    find_all_order_status,
}
