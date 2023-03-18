'use client'
import {
    Avatar,
    Box,
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

export default function PaymentTable() {
    return (
        <>
            <TableFilter />
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr bgColor={'#F0EFE9'}>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Member
                            </Th>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Date
                            </Th>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Payment Type
                            </Th>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Payment Details
                            </Th>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Amount
                            </Th>
                            <Th color={'gray.500'} textTransform="capitalize">
                                Status
                            </Th>
                            <Th
                                color={'gray.500'}
                                textTransform="capitalize"
                            ></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Flex gap={'2'} align={'center'}>
                                    <Avatar
                                        size="sm"
                                        name="John Doe"
                                        src="https://bit.ly/kent-c-dodds"
                                    />{' '}
                                    <p> John Doe</p>
                                </Flex>
                            </Td>
                            <Td>May 19 2023</Td>
                            <Td>PayPal</Td>
                            <Td>Lorem ipsum dolor sit.</Td>
                            <Td>{Number(100).toFixed(2)}৳</Td>
                            <Td>Completed</Td>
                            <Td>...</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

function TableFilter() {
    return (
        <Box paddingBlock={'2'}>
            <HStack textColor={'gray.500'} spacing={'20px'}>
                <Text
                    borderBottom={'2px'}
                    borderBottomColor={'purple'}
                    as={'b'}
                    color={'purple'}
                >
                    All
                </Text>
                <Text>Pending</Text>
                <Text>Failed</Text>
                <Text>Paid</Text>
                <Text>Refunded</Text>
            </HStack>
        </Box>
    )
}
