import RouterButton from "@/components/Button/RouterButton";
import OrderCard from "@/components/cards/orderCard";
import OrderTable from "@/features/OrderTable";

export const metadata = {
  title: "Order List | Admin Dashboard",
};

export default function Order() {
  return (
    <>
      <div className="space-y-4 w-full">
        <OrderCard data="" />
        <div className="flex justify-between space-x-2">
          <h1 className="text-2xl font-semibold">Orders List</h1>
          <RouterButton link="dashboard/order/create" name="create" />
        </div>
        <div className="w-full">
          <OrderTable />
        </div>
      </div>
    </>
  );
}
