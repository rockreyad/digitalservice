import prisma from '../config/prisma'

async function pay_by_mobile_banking({
    paymentId,
    amount,
    mobileBanking,
}: {
    paymentId: number
    amount: number
    mobileBanking: {
        account_holder_name: string
        account_number: string
        bank_name: string
        amount: number
        trxId: string
        paymentStatus: number
    }
}) {
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            mobileBanking: {
                create: {
                    account_holder_name: mobileBanking?.account_holder_name,
                    account_number: mobileBanking?.account_number,
                    bank_name: mobileBanking?.bank_name,
                    amount: amount,
                    trxId: mobileBanking?.trxId,
                    paymentStatus: {
                        connect: {
                            id: mobileBanking?.paymentStatus,
                        },
                    },
                },
            },
        },
    })

    return payment
}

async function pay_by_debit_card({
    paymentId,
    amount,
    debitCard,
}: {
    paymentId: number
    amount: number
    debitCard: {
        name: string
        card_number: string
        cvv: string
        exp_date: string
        amount: number
        paymentStatus: number
    }
}) {
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            debitCard: {
                create: {
                    name: debitCard?.name,
                    card_number: debitCard?.card_number,
                    cvv: debitCard?.cvv,
                    exp_date: debitCard?.exp_date,
                    amount: amount,
                    paymentStatus: {
                        connect: {
                            id: debitCard?.paymentStatus,
                        },
                    },
                },
            },
        },
    })

    return payment
}

async function pay_by_cash({
    paymentId,
    amount,
    cashPayment,
}: {
    paymentId: number
    amount: number
    cashPayment: {
        amount: number
        paymentStatus: number
    }
}) {
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            cashPayment: {
                create: {
                    amount: amount,
                    paymentStatus: {
                        connect: {
                            id: cashPayment?.paymentStatus,
                        },
                    },
                },
            },
        },
    })

    return payment
}

async function pay_by_bank({
    paymentId,
    amount,
    bank,
}: {
    paymentId: number
    amount: number
    bank: {
        account_holder_name: string
        account_number: string
        account_type: string
        name: string
        amount: number
        paymentStatus: number
    }
}) {
    const payment = await prisma.payment.update({
        where: {
            id: paymentId,
        },
        data: {
            bank: {
                create: {
                    account_holder_name: bank?.account_holder_name,
                    account_number: bank?.account_number,
                    account_type: bank?.account_type,
                    name: bank?.name,
                    amount: amount,
                    paymentStatus: {
                        connect: {
                            id: bank?.paymentStatus,
                        },
                    },
                },
            },
        },
    })

    return payment
}
export { pay_by_mobile_banking, pay_by_debit_card, pay_by_cash, pay_by_bank }
