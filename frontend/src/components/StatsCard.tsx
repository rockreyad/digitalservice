type StatsCardProps = {
  name: string;
  title: string;
  color: string;
  count: number;
};

export default function StatsCard({ data }: { data: StatsCardProps }) {
  return (
    <div>
      <div
        style={{ backgroundColor: `${data.color}` }}
        className="py-4 px-2 flex flex-col mx-auto justify-center items-center space-y-3 rounded-md"
      >
        <p className="capitalize">{data.title}</p>
        <p className="text-5xl font-extrabold">{data.count}</p>
        <h1 className="bg-gray-100 shadow-md text-gray-500 px-2 py-2 font-medium rounded-md w-full text-center">
          Total {data.name}
        </h1>
      </div>
    </div>
  );
}
