import { Prisma } from '@prisma/client'
import prisma from '../config/prisma'
import { OrderFilterParams } from '../types/report'

async function getOrdersByDateRange({
    startDate,
    endDate,
    statusId,
    payment,
}: OrderFilterParams) {
    const where: Prisma.OrderWhereInput[] = [
        { createdAt: { gte: startDate } },
        { createdAt: { lte: endDate } },
    ]

    if (statusId) {
        where.push({ statusId })
    }

    if (payment == 'false') {
        where.push({ payment: { none: { id: { in: undefined } } } })
    }
    if (payment == 'true') {
        where.push({ payment: { some: { id: { in: undefined } } } })
    }

    const orders = await prisma.order.findMany({
        where: {
            AND: where,
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
            payment: {
                select: {
                    id: true,
                },
            },
        },
    })

    return orders
}

export { getOrdersByDateRange }
