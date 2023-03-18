import RouterButton from '@/components/Button/RouterButton'
import OrderCard from '@/components/cards/orderCard'
import PaymentTable from '@/features/PaymentTable'

export const metadata = {
    title: 'Payment Page | Dashboard',
}

export default function PaymentPage() {
    return (
        <div>
            <div className="space-y-4 w-full">
                <OrderCard />
                <div className="flex justify-between space-x-2">
                    <h1 className="text-2xl font-semibold">Payment List</h1>
                    <RouterButton link="dashboard/order/create" name="create" />
                </div>
                <div className="w-full">
                    <PaymentTable />
                </div>
            </div>
        </div>
    )
}
