export type PaymentStatus = {
    id: number
    name: string
    description: string
}

export type CashPayment = {
    amount: number
    paymentStatus: number
}

export type MobileBankingPayment = {
    account_holder_name: string
    account_number: string
    bank_name: string
    amount: number
    trxId: string
    paymentStatus: number
}

export type DebitCardPayment = {
    name: string
    card_number: string
    cvv: string
    exp_date: string
    amount: number
    paymentStatus: number
}

export type BankPayment = {
    account_holder_name: string
    account_number: string
    account_type: string
    name: string
    amount: number
    paymentStatus: number
}

export type PaymentMethod = 'cash' | 'debit_card' | 'mobile_banking' | 'bank'
export type Payment = {
    paymentMethod: PaymentMethod
    cashPayment?: CashPayment
    mobileBanking?: MobileBankingPayment
    debitCard?: DebitCardPayment
    bank?: BankPayment
}

export type PaymentsForOrderResponse = {
    status: Boolean
    message: string
    data: {
        id: number
        orderId: number
        cashPayment: null | CashPayment
        bank: null | BankPayment
        debitCard: null | DebitCardPayment
        mobileBanking: null | MobileBankingPayment
    }[]
}
