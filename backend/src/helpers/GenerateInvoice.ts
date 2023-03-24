import dayjs from 'dayjs'

export default function generateInvoice(orderId: number) {
    const now = dayjs()
    const formattedDate = now.format('YYYYMMDD')
    return `INV${formattedDate}${orderId}`
}
