import OrderInfo from '@/features/ViewOrder'

export const metadata = {
    title: 'Order Details | Project-D',
}

export default function OrderView({ params }: { params: { id: string } }) {
    return (
        <>
            <OrderInfo orderId={params.id} />
        </>
    )
}
