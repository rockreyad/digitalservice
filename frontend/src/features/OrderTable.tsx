'use client'

import {
    Badge,
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { FaRegEdit } from 'react-icons/fa'
import { CiRead } from 'react-icons/ci'
import { useQuery } from 'react-query'
import { getOrders } from '@/utils/api/order'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export default function OrderTable() {
    const { data, isLoading, isError } = useQuery('orders', getOrders)
    const { user } = useAuth()

    return (
        <div className="w-full">
            <Box overflow={'scroll'}>
                <Table
                    variant="striped"
                    colorScheme="whiteAlpha"
                    overflow={'scroll'}
                    size={'sm'}
                >
                    <Thead bgColor={'gray.200'}>
                        <Tr>
                            <Th>Order ID</Th>
                            {user?.role === 'admin' ? <Th>Order By</Th> : null}
                            <Th>Order Date</Th>
                            <Th>Order Status</Th>
                            <Th>Order Total</Th>
                            <Th>Order Action</Th>
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
                                <Td>Something went wrong!</Td>
                            </Tr>
                        ) : null}

                        {data?.data && data.data?.length > 0
                            ? data.data?.map((order, index) => (
                                  <Tr
                                      color={'gray.800'}
                                      bgColor="white"
                                      key={index}
                                  >
                                      <Td color={'blue'} isNumeric>
                                          {order.orderId}
                                      </Td>

                                      {user?.role === 'admin' ? (
                                          <Td>
                                              {order.user.firstName +
                                                  ' ' +
                                                  order.user.lastName}
                                          </Td>
                                      ) : null}
                                      <Td>{order.createAt}</Td>
                                      <Td>
                                          <Badge
                                              px={'3'}
                                              py="1"
                                              rounded="sm"
                                              colorScheme={
                                                  order.statusType ===
                                                  'delivered'
                                                      ? 'green'
                                                      : order.statusType ===
                                                        'complete'
                                                      ? 'blue'
                                                      : order.statusType ===
                                                        'fraud'
                                                      ? 'red'
                                                      : order.statusType ===
                                                        'pending'
                                                      ? 'orange'
                                                      : 'gray'
                                              }
                                          >
                                              {order.statusType}
                                          </Badge>
                                      </Td>
                                      <Td isNumeric>{order.price}</Td>
                                      <Td className="space-x-2 items-center">
                                          <Link
                                              href={`/dashboard/order/${order.orderId}`}
                                              className="font-light text-gray-500 scale-110 transition  ease-in-out duration-500 hover:text-gray-700"
                                          >
                                              <Button
                                                  size={'xs'}
                                                  colorScheme={'gray'}
                                                  className="space-x-1"
                                              >
                                                  <CiRead className="" />
                                                  <p> view</p>
                                              </Button>
                                          </Link>
                                          <Button
                                              size={'xs'}
                                              colorScheme={'teal'}
                                              className="space-x-1"
                                          >
                                              <FaRegEdit className="" />
                                              <p> edit</p>
                                          </Button>
                                      </Td>
                                  </Tr>
                              ))
                            : null}
                    </Tbody>
                </Table>
            </Box>
        </div>
    )
}
