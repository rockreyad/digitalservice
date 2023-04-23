'use client'
import Loading from '@/components/loading'
import { useAuth } from '@/contexts/auth-context'
import { all_payments } from '@/utils/api/payment'
import {
    Avatar,
    Badge,
    Box,
    Center,
    Flex,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Dispatch, SetStateAction } from 'react'
import { PaymentDrawer } from '@/components/drawers/PaymentDrawer'

export default function PaymentTable() {
    const { data: payment, isLoading } = useQuery('payment', all_payments)

    const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
    const { user } = useAuth()
    return (
        <>
            <TableFilter setPaymentStatus={setPaymentStatus} />
            {/* Payment Table */}
            {isLoading ? (
                <Center>
                    <Box>
                        <Loading width={120} height={120} />
                    </Box>
                </Center>
            ) : (
                <TableContainer bg={'AppWorkspace'}>
                    <Table size={['sm']}>
                        <Thead>
                            <Tr bgColor={'#F0EFE9'}>
                                <Th
                                    color={'gray.500'}
                                    textTransform="capitalize"
                                    width={'fit-content'}
                                >
                                    Transaction Id
                                </Th>
                                {user?.role === 'admin' ? (
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                        width={'fit-content'}
                                    >
                                        Customer
                                    </Th>
                                ) : null}

                                <Th
                                    color={'gray.500'}
                                    textTransform="capitalize"
                                    width={'fit-content'}
                                >
                                    Date
                                </Th>
                                <Th
                                    color={'gray.500'}
                                    textTransform="capitalize"
                                    width={'fit-content'}
                                >
                                    Payment Type
                                </Th>

                                <Th
                                    color={'gray.500'}
                                    textTransform="capitalize"
                                    width={'fit-content'}
                                >
                                    Amount
                                </Th>
                                <Th
                                    color={'gray.500'}
                                    textTransform="capitalize"
                                    width={'fit-content'}
                                >
                                    Status
                                </Th>

                                {user?.role === 'admin' ? (
                                    <Th
                                        color={'gray.500'}
                                        textTransform="capitalize"
                                    ></Th>
                                ) : null}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {payment?.data && payment?.data.length > 0 ? (
                                <>
                                    {payment?.data
                                        .filter((item) => {
                                            if (paymentStatus?.length) {
                                                return (
                                                    item.status ===
                                                    paymentStatus.toLocaleLowerCase()
                                                )
                                            } else {
                                                return item
                                            }
                                        })
                                        .map((item) => (
                                            <Tr key={item.transactionId}>
                                                <Td>{item.transactionId}</Td>

                                                {user?.role === 'admin' ? (
                                                    <Td>
                                                        <Flex
                                                            gap={'2'}
                                                            align={'center'}
                                                        >
                                                            <Avatar
                                                                size="sm"
                                                                name={
                                                                    item.username
                                                                }
                                                                src="https://bit.ly/kent-c-dodds"
                                                            />{' '}
                                                            <p>
                                                                {' '}
                                                                {item.username}
                                                            </p>
                                                        </Flex>
                                                    </Td>
                                                ) : null}

                                                <Td>{item.date}</Td>
                                                <Td>{item.paymentType}</Td>

                                                <Td isNumeric>
                                                    {item.amount}৳
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        px={'3'}
                                                        py="1"
                                                        rounded="sm"
                                                        colorScheme={
                                                            item.status ===
                                                            'complete'
                                                                ? 'green'
                                                                : item.status ===
                                                                  'refunded'
                                                                ? 'blue'
                                                                : item.status ===
                                                                  'failed'
                                                                ? 'red'
                                                                : item.status ===
                                                                  'pending'
                                                                ? 'orange'
                                                                : 'gray'
                                                        }
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                </Td>
                                                {user?.role === 'admin' ? (
                                                    <Td
                                                        isNumeric
                                                        className="space-x-2 items-center"
                                                    >
                                                        <PaymentDrawer
                                                            transactionId={
                                                                item.transactionId
                                                            }
                                                        />
                                                    </Td>
                                                ) : null}
                                            </Tr>
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
                </TableContainer>
            )}
        </>
    )
}

function TableFilter({
    setPaymentStatus,
}: {
    setPaymentStatus: Dispatch<SetStateAction<string | null>>
}) {
    return (
        <Box paddingBlock={'2'}>
            <HStack textColor={'gray.500'} spacing={'20px'}>
                <Text
                    borderBottom={'2px'}
                    borderBottomColor={'purple'}
                    as={'b'}
                    color={'purple'}
                    cursor={'pointer'}
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    onClick={() => setPaymentStatus(null)}
                >
                    All
                </Text>
                <Text
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    _active={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    cursor={'pointer'}
                    textTransform={'capitalize'}
                    onClick={() => setPaymentStatus('pending')}
                >
                    Pending
                </Text>
                <Text
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    _active={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    cursor={'pointer'}
                    textTransform={'capitalize'}
                    onClick={() => setPaymentStatus('failed')}
                >
                    Failed
                </Text>
                <Text
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    _active={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    cursor={'pointer'}
                    textTransform={'capitalize'}
                    onClick={() => setPaymentStatus('complete')}
                >
                    Paid
                </Text>
                <Text
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    _active={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    cursor={'pointer'}
                    textTransform={'capitalize'}
                    onClick={() => setPaymentStatus('refunded')}
                >
                    Refunded
                </Text>
            </HStack>
        </Box>
    )
}
