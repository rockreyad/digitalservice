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
                    invoiceId: true,
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
                    invoiceId: true,
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

async function update_mobile_banking({
    id,
    status,
}: {
    id: number
    status: number
}) {
    const mobile_banking_payment = await prisma.mobileBanking.update({
        where: {
            id,
        },
        data: {
            status,
        },
    })

    return mobile_banking_payment
}
async function update_cash_payment({
    id,
    status,
}: {
    id: number
    status: number
}) {
    const cash_payment = await prisma.cashPayment.update({
        where: {
            id,
        },
        data: {
            status,
        },
    })

    return cash_payment
}
async function update_debit_card({
    id,
    status,
}: {
    id: number
    status: number
}) {
    const debit_card_payment = await prisma.debitCard.update({
        where: {
            id,
        },
        data: {
            status,
        },
    })

    return debit_card_payment
}

async function update_bank({ id, status }: { id: number; status: number }) {
    const bank_payment = await prisma.bank.update({
        where: {
            id,
        },
        data: {
            status,
        },
    })

    return bank_payment
}

export {
    new_payment,
    find_all_payment_for_an_order,
    all_payment,
    all_user_payments,
    find_payment_by_id,
    update_mobile_banking,
    update_debit_card,
    update_bank,
    update_cash_payment,
}
