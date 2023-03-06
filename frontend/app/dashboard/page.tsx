import QuickStats from "@/components/overview/QuickStats";
import TotalStats from "@/components/overview/TotalStats";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full p-2">
      <QuickStats />
      <TotalStats />
    </div>
  );
}
