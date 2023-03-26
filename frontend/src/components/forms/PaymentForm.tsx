'use client'
import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    HStack,
    Button,
    Select,
    Input,
    Grid,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-query'
import { payForOrder, totalPayment } from '@/utils/api/payment'
import { getOrderById } from '@/utils/api/order'

export default function PaymentForm({ orderId }: { orderId: number }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [debitCard, setDebitCard] = useState({
        name: '',
        card_number: '',
        cvv: '',
        exp_date: '',
        amount: amount,
        paymentStatus: 1,
    })
    const [cashPayment] = useState({
        amount: amount,
        paymentStatus: 1,
    })
    const [mobileBanking, setMobileBanking] = useState({
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        amount: amount,
        trxId: '',
        paymentStatus: 1,
    })
    const [bank, setBank] = useState({
        account_holder_name: '',
        account_number: '',
        account_type: '',
        name: '',
        amount: amount,
        paymentStatus: 1,
    })

    const { mutate, isSuccess } = useMutation(payForOrder, {
        onSuccess: () => {
            onOpen()
            console.log('Payment successful')
        },
    })

    const { data: totalOrderPayment } = useQuery(
        'totalPayment',
        () => totalPayment({ orderId: orderId }),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    )

    const { data: totalOrderPrice } = useQuery([orderId], getOrderById)

    console.log('totalOrderPrice: ', totalOrderPrice)

    let totalPaid = 0

    for (let i = 0; i < totalOrderPayment?.data?.length!; i++) {
        if (totalOrderPayment?.data[i]?.cashPayment) {
            totalPaid += totalOrderPayment?.data[i]?.cashPayment?.amount!
        } else if (totalOrderPayment?.data[i].bank) {
            totalPaid += totalOrderPayment?.data[i]?.bank?.amount!
        } else if (totalOrderPayment?.data[i]?.debitCard) {
            totalPaid += totalOrderPayment?.data[i]?.debitCard?.amount!
        } else if (totalOrderPayment?.data[i]?.mobileBanking) {
            totalPaid += totalOrderPayment.data[i].mobileBanking?.amount!
        }
    }
    let due = Number(
        Number(totalOrderPrice?.data?.price!) - Number(totalPaid),
    ).toFixed(2)

    const paymentMoney = [500, 1000, 2000, 5000, 10000, due]

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const paymentData: any = {
            paymentMethod,
            amount,
        }
        if (paymentMethod === 'debit_card') {
            paymentData.debitCard = debitCard
        } else if (paymentMethod === 'cash') {
            paymentData.cashPayment = cashPayment
        } else if (paymentMethod === 'mobile_banking') {
            paymentData.mobileBanking = mobileBanking
        } else if (paymentMethod === 'bank') {
            paymentData.bank = bank
        }

        const paymentDetails = {
            orderId: orderId, // Replace with actual order ID
            payment: paymentData,
        }

        mutate(paymentDetails)
        console.log('Payment Details: ', paymentDetails)
    }

    return (
        <div>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg="none"
                    backdropFilter="auto"
                    backdropInvert="80%"
                    backdropBlur="2px"
                />
                <ModalContent>
                    <ModalHeader>Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isSuccess ? (
                            <Text color={'green.500'}>
                                Payment has been successfull!
                            </Text>
                        ) : (
                            <Text color={'red.500'}>
                                Payment has been decliend!
                            </Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                bg={'AppWorkspace'}
                paddingBlock="10"
                paddingInline={'10'}
                borderRadius="md"
            >
                <Flex justify={'space-between'} textAlign="center">
                    <Grid>
                        <Text fontSize="xl" fontWeight="bold">
                            Total Paid
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
                            BDT{' '}
                            <span className="text-green-500">
                                {totalPaid}&#2547;
                            </span>
                        </Text>
                    </Grid>
                    <Grid>
                        <Text fontSize="xl" fontWeight="bold">
                            Total Dues
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
                            BDT{' '}
                            <span className="text-red-500">{due}&#2547;</span>
                        </Text>
                    </Grid>
                </Flex>
            </Box>
            <form
                onSubmit={handlePayment}
                className="space-y-4 bg-white p-2 rounded-sm mt-4"
            >
                <Flex flexDir="column" gap="4">
                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput
                            // format={(value: string | number) => `BDT ${value}`}
                            value={amount}
                            max={10000}
                            min={100}
                            onChange={(valueString) =>
                                setAmount(
                                    valueString ? parseInt(valueString) : 0,
                                )
                            }
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            {paymentMoney.map((money) => (
                                <Button
                                    key={money}
                                    colorScheme={
                                        money === due ? 'red' : 'primary'
                                    }
                                    variant="outline"
                                    type="button"
                                    onClick={() => setAmount(money as number)}
                                >
                                    {money}&#2547;
                                </Button>
                            ))}
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                            placeholder="Select option"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="mobile_banking">
                                Mobile Banking
                            </option>
                            <option value="bank">Bank</option>
                        </Select>
                    </FormControl>

                    {/* Payment method */}
                    {paymentMethod === 'cash' && (
                        <FormControl>
                            <FormLabel>Cash Payment</FormLabel>

                            <Text>
                                Please pay the amount of {amount} &#2547; to the
                                admin
                            </Text>
                            {/* <NumberInput
                                format={(value: string | number) =>
                                    `BDT ${value}`
                                }
                                value={cashPayment.amount}
                                max={10000}
                                min={100}
                                onChange={(valueString) =>
                                    setCashPayment((prevState) => ({
                                        ...prevState,
                                        amount: valueString
                                            ? parseInt(valueString)
                                            : 0,
                                    }))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}
                        </FormControl>
                    )}

                    {paymentMethod === 'mobile_banking' && (
                        <FormControl
                            bgColor={'white'}
                            padding="2"
                            borderRadius={'2'}
                        >
                            <FormLabel>Mobile Banking</FormLabel>
                            <Grid gap={'4'}>
                                <FormLabel>Account Holder Name</FormLabel>
                                <Input
                                    placeholder="Account Holder Name"
                                    onChange={(e) =>
                                        setMobileBanking((prevState) => ({
                                            ...prevState,
                                            account_holder_name: e.target.value,
                                        }))
                                    }
                                />
                                <Flex columnGap={'4'}>
                                    <FormControl>
                                        <FormLabel>Account Number</FormLabel>
                                        <Input
                                            placeholder="Account Number"
                                            onChange={(e) =>
                                                setMobileBanking(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        account_number:
                                                            e.target.value,
                                                    }),
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Bank Name</FormLabel>
                                        <Input
                                            placeholder="Bank Name"
                                            onChange={(e) =>
                                                setMobileBanking(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        bank_name:
                                                            e.target.value,
                                                    }),
                                                )
                                            }
                                        />
                                    </FormControl>
                                    {/* <FormLabel>Amount</FormLabel>
                            <NumberInput
                                // format={(value: string | number) =>
                                //     `BDT ${value}`
                                // }
                                value={mobileBanking.amount}
                                max={10000}
                                min={100}
                                onChange={(valueString) =>
                                    setMobileBanking((prevState) => ({
                                        ...prevState,
                                        amount: valueString
                                            ? parseInt(valueString)
                                            : 0,
                                    }))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}

                                    <FormControl>
                                        <FormLabel>Transaction ID</FormLabel>
                                        <Input
                                            placeholder="Transaction ID"
                                            onChange={(e) =>
                                                setMobileBanking(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        trxId: e.target.value,
                                                    }),
                                                )
                                            }
                                        />
                                    </FormControl>
                                </Flex>
                            </Grid>
                        </FormControl>
                    )}

                    {paymentMethod === 'debit_card' && (
                        <FormControl>
                            <FormLabel>Debit Card Payment</FormLabel>
                            <Grid gap={'4'}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setDebitCard((prevState) => ({
                                                ...prevState,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </FormControl>
                                <Flex columnGap={'4'}>
                                    <FormControl>
                                        <FormLabel>Card Number</FormLabel>
                                        <Input
                                            placeholder="Card Number"
                                            onChange={(e) =>
                                                setDebitCard((prevState) => ({
                                                    ...prevState,
                                                    card_number: e.target.value,
                                                }))
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>CVV</FormLabel>
                                        <Input
                                            placeholder="CVV"
                                            onChange={(e) =>
                                                setDebitCard((prevState) => ({
                                                    ...prevState,
                                                    cvv: e.target.value,
                                                }))
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Expiration Date</FormLabel>
                                        <Input
                                            placeholder="Expiration Date"
                                            onChange={(e) =>
                                                setDebitCard((prevState) => ({
                                                    ...prevState,
                                                    exp_date: e.target.value,
                                                }))
                                            }
                                        />
                                    </FormControl>
                                </Flex>
                                {/* <FormControl>
                                    <FormLabel>Amount</FormLabel>
                                    <NumberInput
                                        // format={(value: string | number) =>
                                        //     `BDT ${value}`
                                        // }
                                        value={debitCard.amount}
                                        max={10000}
                                        min={100}
                                        onChange={(valueString) =>
                                            setDebitCard((prevState) => ({
                                                ...prevState,
                                                amount: valueString
                                                    ? parseInt(valueString)
                                                    : 0,
                                            }))
                                        }
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </FormControl> */}
                            </Grid>
                        </FormControl>
                    )}

                    {paymentMethod === 'bank' && (
                        <FormControl>
                            <FormLabel>Bank Payment</FormLabel>
                            <FormLabel>Account Holder Name</FormLabel>
                            <Input
                                placeholder="Account Holder Name"
                                onChange={(e) =>
                                    setBank((prevState) => ({
                                        ...prevState,
                                        account_holder_name: e.target.value,
                                    }))
                                }
                            />
                            <FormLabel>Account Number</FormLabel>
                            <Input
                                placeholder="Account Number"
                                onChange={(e) =>
                                    setBank((prevState) => ({
                                        ...prevState,
                                        account_number: e.target.value,
                                    }))
                                }
                            />
                            <FormLabel>Bank Name</FormLabel>
                            <Input
                                placeholder="Bank Name"
                                onChange={(e) =>
                                    setBank((prevState) => ({
                                        ...prevState,
                                        bank_name: e.target.value,
                                    }))
                                }
                            />
                            {/* <FormLabel>Amount</FormLabel>
                            <NumberInput
                                // format={(value: string | number) =>
                                //     `BDT ${value}`
                                // }
                                value={bank.amount}
                                max={10000}
                                min={100}
                                onChange={(valueString) =>
                                    setBank((prevState) => ({
                                        ...prevState,
                                        amount: valueString
                                            ? parseInt(valueString)
                                            : 0,
                                    }))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> */}
                        </FormControl>
                    )}
                </Flex>
                <Button colorScheme="primary" variant="solid" type="submit">
                    Pay now
                </Button>
            </form>
        </div>
    )
}
