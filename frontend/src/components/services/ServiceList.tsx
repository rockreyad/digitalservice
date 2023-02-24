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
import { useQuery } from "react-query";
import { getService } from "@/utils/api/services";

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
          {data && data?.length > 0 ? (
            data?.map((service, index) => (
              <Tr key={index}>
                <Td>{service.title}</Td>
                <Td>{service.status ? "active" : "deactive"}</Td>
              </Tr>
            ))
          ) : (
            <>
              {!(isLoading || isError) ? (
                <Tr>
                  <Td>no data found</Td>
                </Tr>
              ) : null}
            </>
          )}
          {isError ? (
            <Tr>
              <Td>Error...</Td>
            </Tr>
          ) : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
