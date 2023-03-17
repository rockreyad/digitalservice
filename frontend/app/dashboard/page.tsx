import QuickStats from '@/components/overview/QuickStats'
import TotalStats from '@/components/overview/TotalStats'

export const metadata = {
    title: 'Dashboard | Project-D',
}

export default function Dashboard() {
    return (
        <div className="flex flex-col space-y-5 w-full py-20">
            <QuickStats />
            <TotalStats />
        </div>
    )
}
