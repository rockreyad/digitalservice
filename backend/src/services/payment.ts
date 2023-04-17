import prisma from '../config/prisma'

async function new_payment({ orderId }: { orderId: number }) {
    const payment = await prisma.payment.create({
        data: {
            order: {
                connect: {
                    id: orderId,
                },
            },
        },
    })

    return payment
}

async function find_all_payment_for_an_order({ orderId }: { orderId: number }) {
    const payment = await prisma.payment.findMany({
        where: {
            orderId,
        },
        include: {
            cashPayment: {
                include: {
                    paymentStatus: true,
                },
            },
            bank: {
                include: {
                    paymentStatus: true,
                },
            },
            debitCard: {
                include: {
                    paymentStatus: true,
                },
            },
            mobileBanking: {
                include: {
                    paymentStatus: true,
                },
            },
        },
    })

    return payment
}

async function all_payment() {
    const payment = await prisma.payment.findMany({
        include: {
            order: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
            cashPayment: {
                include: {
                    paymentStatus: true,
                },
            },
            bank: {
                include: {
                    paymentStatus: true,
                },
            },
            debitCard: {
                include: {
                    paymentStatus: true,
                },
            },
            mobileBanking: {
                include: {
                    paymentStatus: true,
                },
            },
        },
    })

    return payment
}

async function all_user_payments({ userId }: { userId: string }) {
    const payment = await prisma.payment.findMany({
        where: {
            order: {
                userId,
            },
        },
        include: {
            order: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            },
            cashPayment: {
                include: {
                    paymentStatus: true,
                },
            },
            bank: {
                include: {
                    paymentStatus: true,
                },
            },
            debitCard: {
                include: {
                    paymentStatus: true,
                },
            },
            mobileBanking: {
                include: {
                    paymentStatus: true,
                },
            },
        },
    })

    return payment
}

async function find_payment_by_id({ id }: { id: number }) {
    const payment = await prisma.payment.findUnique({
        where: {
            id,
        },
        include: {
            cashPayment: {
                include: {
                    paymentStatus: true,
                },
            },
            bank: {
                include: {
                    paymentStatus: true,
                },
            },
            debitCard: {
                include: {
                    paymentStatus: true,
                },
            },
            mobileBanking: {
                include: {
                    paymentStatus: true,
                },
            },
        },
    })

    return payment
}

async function update_payment_status({
    paymentId,
    paymentStatusId,
}: {
    paymentId: number
    paymentStatusId: number
}) {
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            cashPayment: {
                update: {
                    status: paymentStatusId,
                },
            },
            bank: {
                update: {
                    status: paymentStatusId,
                },
            },
            debitCard: {
                update: {
                    status: paymentStatusId,
                },
            },
            mobileBanking: {
                update: {
                    status: paymentStatusId,
                },
            },
        },
    })

    return payment
}

export {
    new_payment,
    find_all_payment_for_an_order,
    all_payment,
    all_user_payments,
    find_payment_by_id,
    update_payment_status,
}
