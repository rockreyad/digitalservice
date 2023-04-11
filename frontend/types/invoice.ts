export interface Invoice {
    invoiceId: string
    invoiceDate: string
    customer: {
        name: string
        phone: string
    }
    orderItems: {
        serviceId: number
        serviceName: string
        servicePrice: number
    }[]
    totalAmount: number
    paymentMethod: {
        name: string
        amount: number
    }[]
}

export type InvoiceResponse = {
    status: boolean
    message?: string
    data?: Invoice
}
