import prisma from '../config/prisma'

async function pay_by_mobile_banking({
    paymentId,
    mobileBanking,
}: {
    paymentId: number
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
                    amount: mobileBanking?.amount,
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

export { pay_by_mobile_banking }
