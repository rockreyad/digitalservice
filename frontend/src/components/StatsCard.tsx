type StatsCardProps = {
    name: string;
    title: string;
    color: string;
    count: number;
}

export default function StatsCard({ data }: { data: StatsCardProps }) {
    return (<><div className="px-2 py-3">
        <div style={{ backgroundColor: `${data.color}` }} className="py-4 px-2 flex flex-col mx-auto justify-center items-center space-y-3">
            <p className="capitalize">{data.title}</p>
            <p className="text-5xl font-extrabold">{data.count}</p>
            <h1 className="bg-gray-700 text-white px-2 py-2 font-medium">Total {data.name}</h1>
        </div>
    </div></>)
}