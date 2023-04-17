'use client'
import React, { useState, useRef } from 'react'
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    // DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    // Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'
import { get_payment_details, update_payment_status } from '@/utils/api/payment'
import {
    BankPayment,
    CashPayment,
    DebitCardPayment,
    MobileBankingPayment,
    ViewTransactionProps,
} from 'types/payment'

export function PaymentDrawer({ transactionId }: { transactionId: number }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [paymentStatus, setPaymentStatus] = useState('1')

    const handlePaymentStatusChange = (value: string) => {
        setPaymentStatus(value)
    }

    const { data, isLoading, isError } = useQuery(
        ['transaction', transactionId],
        () => get_payment_details({ transactionId }),
    )
    const { mutate, isLoading: loading } = useMutation(
        'update_payment_status',
        update_payment_status,
    )

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log('paymentStatus', paymentStatus)
        mutate({
            paymentId: transactionId,
            paymentStatusId: Number(paymentStatus),
        })
    }

    return (
        <>
            <Button
                ref={btnRef as React.MutableRefObject<any>}
                colorScheme="primary"
                size={'sm'}
                onClick={onOpen}
            >
                view
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef as React.MutableRefObject<any>}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Payment Details</DrawerHeader>

                    <DrawerBody bgColor={'gray.100'}>
                        <ViewTransaction
                            transaction={data}
                            loading={isLoading}
                            error={isError}
                        />
                        <Box
                            as="div"
                            fontWeight="medium"
                            fontSize="sm"
                            marginBlock={'4'}
                            padding={'4'}
                            bgColor={'AppWorkspace'}
                        >
                            <h1>Payment Status</h1>
                            <form onSubmit={handleSubmit}>
                                <PaymentStatusRadio
                                    value={paymentStatus}
                                    onChange={handlePaymentStatusChange}
                                />
                                <button
                                    className="bg-rose-400"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Update Payment Status
                                </button>
                            </form>
                        </Box>
                    </DrawerBody>
                    {/* <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}

import { Radio, RadioGroup } from '@chakra-ui/react'

const ViewTransaction = ({
    transaction,
    loading,
    error,
}: ViewTransactionProps) => {
    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            {transaction &&
            transaction.data.paymentType &&
            transaction.data.paymentType === 'cash' ? (
                <Cash transaction={transaction.data.transactionDetails} />
            ) : null}
            {transaction &&
            transaction.data.paymentType &&
            transaction.data.paymentType === 'mobile_banking' ? (
                <MobileBanking
                    transaction={
                        transaction.data
                            .transactionDetails as MobileBankingPayment
                    }
                />
            ) : null}
            {transaction &&
            transaction.data.paymentType &&
            transaction.data.paymentType === 'debit_card' ? (
                <DebitCard
                    transaction={
                        transaction.data.transactionDetails as DebitCardPayment
                    }
                />
            ) : null}
            {transaction &&
            transaction.data.paymentType &&
            transaction.data.paymentType === 'bank' ? (
                <Bank
                    transaction={
                        transaction.data.transactionDetails as BankPayment
                    }
                />
            ) : null}
        </>
    )
}

const MobileBanking = ({
    transaction,
}: {
    transaction: MobileBankingPayment
}) => {
    return (
        <TableContainer>
            <Table bgColor={'AppWorkspace'} size="sm">
                <Thead bgColor={'gray.400'}>
                    <Tr>
                        <Th>Details</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td fontWeight={'bold'}>pay by</Td>
                        <Td>{transaction.bank_name}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>payeer</Td>
                        <Td>{transaction.account_holder_name}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>from</Td>
                        <Td>{transaction.account_number!}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Trx Id</Td>
                        <Td>{transaction.trxId!}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Amount</Td>
                        <Td>{transaction.amount!}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Status</Td>
                        <Td>{transaction.paymentStatus.name}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

const DebitCard = ({ transaction }: { transaction: DebitCardPayment }) => {
    return (
        <TableContainer>
            <Table bgColor={'AppWorkspace'} size="sm">
                <Thead bgColor={'gray.400'}>
                    <Tr>
                        <Th>Details</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td fontWeight={'bold'}>payeer</Td>
                        <Td>{transaction.name}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>card number</Td>
                        <Td>{transaction.card_number}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>expired on</Td>
                        <Td>{transaction.exp_date}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Amount</Td>
                        <Td>{transaction.amount}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Status</Td>
                        <Td>{transaction.paymentStatus.name}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

const Cash = ({ transaction }: { transaction: CashPayment }) => {
    return (
        <TableContainer>
            <Table bgColor={'AppWorkspace'} size="sm">
                <Thead bgColor={'gray.400'}>
                    <Tr>
                        <Th>Details</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td fontWeight={'bold'}>Amount</Td>
                        <Td>{transaction.amount}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Status</Td>
                        <Td>{transaction.paymentStatus.name}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

const Bank = ({ transaction }: { transaction: BankPayment }) => {
    return (
        <TableContainer>
            <Table bgColor={'AppWorkspace'} size="sm">
                <Thead bgColor={'gray.400'}>
                    <Tr>
                        <Th>Details</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td fontWeight={'bold'}>Bank Name</Td>
                        <Td>{transaction.name}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>payeer</Td>
                        <Td>{transaction.account_holder_name}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>account number</Td>
                        <Td>{transaction.account_number}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Account Type</Td>
                        <Td>{transaction.account_type}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Amount</Td>
                        <Td>{transaction.amount}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight={'bold'}>Status</Td>
                        <Td>{transaction.paymentStatus.name}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

function PaymentStatusRadio({
    value,
    onChange,
}: {
    value: string
    onChange: (value: string) => void
}) {
    const [paymentStatus, setPaymentStatus] = useState(String(value))
    const radioTextColor = useColorModeValue('gray.800', 'gray.200')

    const handlePaymentStatusChange = (value: string) => {
        setPaymentStatus(value)
        console.log(value)
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <RadioGroup value={paymentStatus} onChange={handlePaymentStatusChange}>
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                rounded="md"
                p={2}
                justify={{ base: 'space-around', md: 'center' }}
            >
                {['pending', 'failed', 'complete', 'refunded'].map(
                    (status, index) => (
                        <Radio
                            key={index}
                            value={String(index + 1)}
                            colorScheme="blue"
                        >
                            <Text fontWeight="medium" color={radioTextColor}>
                                {status.toUpperCase()}
                            </Text>
                        </Radio>
                    ),
                )}
            </Flex>
        </RadioGroup>
    )
}

export default PaymentStatusRadio
