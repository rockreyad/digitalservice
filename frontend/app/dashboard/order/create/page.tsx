import CreateOrderForm from '@/components/orders/CreateOrderForm'

export default function CreateOrder() {
    return (
        <>
            <div className="p-2 space-y-4">
                <div className="">
                    <h1 className="text-2xl font-semibold">Create an Order</h1>
                </div>
                <CreateOrderForm />
            </div>
        </>
    )
}
