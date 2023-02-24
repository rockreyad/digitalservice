import { Service } from "./../../../types/service";
import axios from "axios";

export async function addService({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  //send the request with axios
  const res = await axios.post(`http://localhost:4000/service`, {
    title,
    description,
  });
  console.log("Response from server: ", res.data);
  return res.data;
}

export async function getService() {
  //send the request with axios
  const res = await axios.get(`http://localhost:4000/service`);
  console.log("Service: ", res);
  return res.data as Service[];
}
