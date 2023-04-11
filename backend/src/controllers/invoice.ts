import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { generate_invoice_pdf } from '../services/invoice'
const get_invoice_details = async (req: Request, res: Response) => {
    //check if the user has an order
    const { invoiceId } = req.params
    if (!invoiceId) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Missing required fields' })
    }

    if (isNaN(Number(invoiceId))) {
        //Response: Invalid invoice id
        return res
            .status(400)
            .json({ status: false, message: 'Invalid invoice id' })
    }

    const generatedInvoice = await generate_invoice_pdf({
        id: Number(invoiceId),
    })
    if (!generatedInvoice) {
        //Response: Invoice not found
        return res
            .status(400)
            .json({ status: false, message: 'Invoice not found' })
    }

    let invoicePdfData = {
        invoiceId: generatedInvoice.invoiceId,
        invoiceDate: dayjs(generatedInvoice.createdAt).format('DD/MM/YYYY'),

        customer: {
            name: `${generatedInvoice.user.firstName} ${generatedInvoice.user.lastName}`,
            phone: generatedInvoice.user.phone,
        },
        orderItems: generatedInvoice.orderItems.map((item) => {
            return {
                serviceId: item.service.id,
                serviceName: item.service.title,
                servicePrice: item.itemPrice,
            }
        }),
        totalAmount: generatedInvoice.price,
        paymentMethod: generatedInvoice.payment.map((item) => {
            return item.cashPayment !== null
                ? { name: 'Cash', amount: item.cashPayment.amount }
                : item.bank !== null
                ? { name: 'Bank', amount: item.bank.amount }
                : item.debitCard !== null
                ? { name: 'Debit Card', amount: item.debitCard.amount }
                : item.mobileBanking !== null
                ? { name: 'Mobile Banking', amount: item.mobileBanking.amount }
                : null
        }),
    }

    //Response: Invoice details
    return res.status(200).json({ status: true, data: invoicePdfData })
}

export { get_invoice_details }
