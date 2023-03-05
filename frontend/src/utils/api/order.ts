import axios from "axios";
import { OrderResponse } from "types/order";

export async function getOrders() {
  const res = await axios.get(`http://localhost:4000/order`);
  return res.data as OrderResponse;
}

export async function createOrder({
  userId,
  statusId,
  price,
  orderItems,
}: {
  userId: string;
  statusId: number;
  price: number;
  orderItems: { serviceId: number }[];
}) {
  const res = await axios.post(`http://localhost:4000/order`, {
    userId,
    statusId,
    price,
    orderItems,
  });
  return res.data;
}
