import OrderCard from '@/components/cards/orderCard'

export default function AnalyticsPage() {
    return (
        <>
            <div className="space-y-4 w-full">
                <OrderCard />
                <div className="flex justify-between space-x-2">
                    <h1 className="text-2xl font-semibold">Reports</h1>
                </div>
                <div className="grid grid-col md:grid-cols-6 w-full">
                    <div className="bg-gray-200 px-2 py-4 col-span-2 xl:col-span-1">
                        Filter By
                    </div>
                    <div className="col-span-3 xl:col-span-5">Table</div>
                </div>
            </div>
        </>
    )
}
