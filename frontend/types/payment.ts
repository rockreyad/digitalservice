export type PaymentStatus = {
    id: number
    name: string
    description: string
}

export type CashPayment = {
    amount: number
    paymentStatus: PaymentStatus
}

export type MobileBankingPayment = {
    account_holder_name: string
    account_number: string
    bank_name: string
    amount: number
    trxId: string
    paymentStatus: PaymentStatus
}

export type DebitCardPayment = {
    name: string
    card_number: string
    cvv: string
    exp_date: string
    amount: number
    paymentStatus: PaymentStatus
}

export type BankPayment = {
    account_holder_name: string
    account_number: string
    account_type: string
    name: string
    amount: number
    paymentStatus: PaymentStatus
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
    status: boolean
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

export type PaymentList = {
    status: boolean
    message: string
    data: {
        transactionId: number
        username: string
        invoiceId: string
        paymentType: string
        amount: number
        status: string
        date: string
    }[]
}

export type Transaction = {
    status: boolean
    message: string
    data: {
        paymentType: PaymentMethod
        transactionDetails:
            | CashPayment
            | BankPayment
            | DebitCardPayment
            | MobileBankingPayment
    }
}

export interface PaymentError {
    message: string
}

export type ViewTransactionProps = {
    transaction?: Transaction
    loading: boolean
    error: boolean
}
