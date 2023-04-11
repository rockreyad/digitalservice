import prisma from '../config/prisma'

//generate invoice pdf
async function generate_invoice_pdf({ id }: { id: number }) {
    const invoice = await prisma.order.findUnique({
        where: {
            id,
        },
        include: {
            orderItems: {
                include: {
                    service: true,
                },
            },
            payment: {
                select: {
                    cashPayment: {
                        select: {
                            amount: true,
                        },
                    },
                    debitCard: {
                        select: {
                            amount: true,
                        },
                    },
                    bank: {
                        select: {
                            amount: true,
                        },
                    },
                    mobileBanking: {
                        select: {
                            amount: true,
                        },
                    },
                },
            },
            user: true,
        },
    })

    if (!invoice) {
        return null
    }

    return invoice
}

export { generate_invoice_pdf }
