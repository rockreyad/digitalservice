import {
    update_bank,
    update_cash_payment,
    update_debit_card,
    update_mobile_banking,
} from '../services/payment'

export default async function update_payment({
    id,
    type,
    status,
}: {
    id: number
    type: string
    status: number
}) {
    let updatedPayment

    switch (type) {
        case 'mobile_banking':
            updatedPayment = await update_mobile_banking({ id, status })
            break
        case 'debit_card':
            updatedPayment = await update_debit_card({ id, status })
            break
        case 'bank':
            updatedPayment = await update_bank({ id, status })
            break
        case 'cash_payment':
            updatedPayment = await update_cash_payment({ id, status })
            break
        default:
            break
    }

    return updatedPayment
}
