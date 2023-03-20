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

export {
    new_payment,
    find_all_payment_for_an_order,
    all_payment,
    all_user_payments,
}
