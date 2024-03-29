'use client'

import {
    Badge,
    Box,
    Button,
    Center,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { CiRead } from 'react-icons/ci'
import { useQuery } from 'react-query'
import { getOrders, getOrderStatus } from '@/utils/api/order'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { MdPayment } from 'react-icons/md'
import OrderTableFilter from '@/components/tableFilters/OrderTableFilter'
import React from 'react'
import Loading from '@/components/loading'
import { Order } from 'types/order'
import OrderDrawer from '../drawers/OrderDrawer'

export default function OrderTable() {
    const { data, isLoading, isError } = useQuery('orders', getOrders)

    const { data: orderStatus, isLoading: statusLoading } = useQuery(
        'orderStatus',
        getOrderStatus,
    )

    const [orderStatusId, setOrderStatusId] = React.useState<number | null>(
        null,
    )
    const { user } = useAuth()

    return (
        <>
            {/* Order Filter Section */}
            {!statusLoading &&
            orderStatus?.data &&
            orderStatus.data?.length > 0 ? (
                <OrderTableFilter
                    setOrderStatus={setOrderStatusId}
                    data={orderStatus?.data}
                />
            ) : null}

            {/* Order Table */}
            {isLoading ? (
                <Center>
                    <Box>
                        <Loading width={120} height={120} />
                    </Box>
                </Center>
            ) : (
                <div className="w-full">
                    <Box>
                        <Table
                            variant="striped"
                            colorScheme="whiteAlpha"
                            overflow={'scroll'}
                            size={'sm'}
                        >
                            <Thead>
                                <Tr bgColor={'#F0EFE9'}>
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    >
                                        Order ID
                                    </Th>
                                    {user?.role === 'admin' ? (
                                        <Th
                                            color={'gray.500'}
                                            textTransform="capitalize"
                                            width={'fit-content'}
                                        >
                                            Order By
                                        </Th>
                                    ) : null}
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    >
                                        Order Date
                                    </Th>
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    >
                                        Order Status
                                    </Th>
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    >
                                        Order Total
                                    </Th>
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    ></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isError ? (
                                    <Tr>
                                        <Td>Something went wrong!</Td>
                                    </Tr>
                                ) : null}
                                {data?.data && data.data?.length > 0 ? (
                                    <>
                                        {data.data
                                            ?.filter((order) => {
                                                if (orderStatusId) {
                                                    return (
                                                        order.statusId ===
                                                        orderStatusId
                                                    )
                                                } else {
                                                    return order
                                                }
                                            })
                                            .map((order, index) => (
                                                <TableRow
                                                    key={index}
                                                    order={order}
                                                />
                                            ))}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={7} textAlign={'center'}>
                                            No Data Found
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                </div>
            )}
        </>
    )
}

// Table Row Data Component
const TableRow = ({ order }: { order: Order }) => {
    const { user } = useAuth()
    return (
        <Tr color={'gray.800'} bgColor="white">
            <Td color={'blue'} isNumeric>
                {order.orderId}
            </Td>

            {user?.role === 'admin' ? (
                <Td>{order.user.firstName + ' ' + order.user.lastName}</Td>
            ) : null}
            <Td>{order.createAt}</Td>
            <Td>
                <Badge
                    px={'3'}
                    py="1"
                    rounded="sm"
                    colorScheme={
                        order.statusType === 'delivered'
                            ? 'green'
                            : order.statusType === 'complete'
                            ? 'blue'
                            : order.statusType === 'fraud'
                            ? 'red'
                            : order.statusType === 'pending'
                            ? 'orange'
                            : 'gray'
                    }
                >
                    {order.statusType}
                </Badge>
            </Td>
            <Td isNumeric>{order.price?.toFixed(2)} &#2547;</Td>
            <Td isNumeric className="space-x-2 items-center">
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
                {order.statusType !== 'fraud' &&
                order.statusType !== 'complete' &&
                order?.price! >= 0 ? (
                    <Link
                        href={`/dashboard/payment/${order.orderId}`}
                        className="font-light text-gray-500 scale-110 transition  ease-in-out duration-500 hover:text-gray-700"
                    >
                        <Button
                            size={'xs'}
                            colorScheme={'gray'}
                            className="space-x-1"
                        >
                            <MdPayment className="" />
                            <p> pay</p>
                        </Button>
                    </Link>
                ) : null}

                {user?.role === 'admin' ? <OrderDrawer order={order} /> : null}
            </Td>
        </Tr>
    )
}
