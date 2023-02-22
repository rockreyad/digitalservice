import StatsCard from "../StatsCard"

const StatsCardData = [
    {
        name: "user",
        title: 'Total 24% Increase this month',
        count: 1223,
        color: "#37fab6"
    }, {
        name: "Registered User",
        title: 'Total valid acccount',
        count: 2782,
        color: "#37fab6"
    }, {
        name: "Order",
        title: 'Total number of order',
        count: 26237,
        color: "#37fab6"
    }
]


export default function TotalStats() {
    return (<>
        <div><h1 className="text-2xl">Total Stats</h1>
            <div>
                {StatsCardData.map((item, index) => <StatsCard key={index} data={item} />)}
            </div>
        </div></>)
}