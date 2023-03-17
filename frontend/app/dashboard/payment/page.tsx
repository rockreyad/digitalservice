import PaymentTable from '@/features/PaymentTable'

export const metadata = {
    title: 'Payment Page | Dashboard',
}

export default function PaymentPage() {
    return (
        <div>
            <h1>Payment Page</h1>
            <PaymentTable />
        </div>
    )
}
