"use client";

import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Service } from "types/service";
import { useQuery } from "react-query";
import axios from "axios";

// const serviceData: Service[] = [
//   {
//     id: "adadadada",
//     name: "facebook page creation",
//     description: "description",
//     status: true,
//   },
//   {
//     id: "adadadada",
//     name: "facebook page optimization",
//     description: "description",
//     status: false,
//   },
//   {
//     id: "adadadada",
//     name: "facebook ads management",
//     description: "description",
//     status: true,
//   },
//   {
//     id: "adadadada",
//     name: "ads campaign monitoring",
//     description: "description",
//     status: true,
//   },
// ];

export const getService = async () => {
  const res: { data: Service[] } = await axios.get(
    "http://127.0.0.1:5500/frontend/app/service/data/serviceData.json"
  );
  return res.data;
};

export default function ServiceList() {
  const { data, isLoading, isError } = useQuery("services", getService);

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td>Loading...</Td>
            </Tr>
          ) : null}
          {isError ? (
            <Tr>
              <Td>Error...</Td>
            </Tr>
          ) : null}
          {data?.data.length > 0
            ? data?.data.map((service, index) => (
                <Tr key={index}>
                  <Td>{service.name}</Td>
                  <Td>{service.status ? "active" : "deactive"}</Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
