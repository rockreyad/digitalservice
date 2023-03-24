'use client'
import React, { useState } from 'react'
import {
    Flex,
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
} from '@chakra-ui/react'
// import { useMutation } from 'react-query'

const paymentMoney = [500, 1000, 2000, 5000, 10000]

export default function PaymentForm() {
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [debitCard, setDebitCard] = useState({
        name: '',
        card_number: '',
        cvv: '',
        exp_date: '',
        amount: 0,
    })
    const [cashPayment, setCashPayment] = useState({
        amount: 0,
        paymentStatus: 0,
    })
    const [mobileBanking, setMobileBanking] = useState({
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        amount: 0,
        trxId: '',
        paymentStatus: 0,
    })
    const [bank, setBank] = useState({
        account_holder_name: '',
        account_number: '',
        account_type: '',
        name: '',
        amount: 0,
        paymentStatus: 0,
    })

    // const paymentMutation = useMutation(
    //     (data: { orderId: string; payment: any }) =>
    //         fetch('http://localhost:4000/payment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         }),
    //     {
    //         onSuccess: () => {
    //             console.log('Payment successful')
    //         },
    //         onError: (error) => {
    //             console.error('Error processing payment:', error)
    //         },
    //     },
    // )

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const paymentData: any = {
            paymentMethod,
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
        // paymentMutation.mutate({
        //     orderId: 'your-order-id', // Replace with actual order ID
        //     payment: paymentData,
        // })

        const paymentDetails = {
            orderId: 'your-order-id', // Replace with actual order ID
            payment: paymentData,
        }
        console.log('Payment Details: ', paymentDetails)
    }

    return (
        <div>
            <form onSubmit={handlePayment} className="space-y-4">
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
                                    colorScheme="primary"
                                    variant="outline"
                                    type="button"
                                    onClick={() => setAmount(money)}
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
                            <NumberInput
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
                            </NumberInput>
                        </FormControl>
                    )}

                    {paymentMethod === 'mobile_banking' && (
                        <FormControl>
                            <FormLabel>Mobile Banking</FormLabel>
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
                            <FormLabel>Account Number</FormLabel>
                            <Input
                                placeholder="Account Number"
                                onChange={(e) =>
                                    setMobileBanking((prevState) => ({
                                        ...prevState,
                                        account_number: e.target.value,
                                    }))
                                }
                            />
                            <FormLabel>Bank Name</FormLabel>
                            <Input
                                placeholder="Bank Name"
                                onChange={(e) =>
                                    setMobileBanking((prevState) => ({
                                        ...prevState,
                                        bank_name: e.target.value,
                                    }))
                                }
                            />
                            <FormLabel>Amount</FormLabel>
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
                            </NumberInput>

                            <FormLabel>Transaction ID</FormLabel>
                            <Input
                                placeholder="Transaction ID"
                                onChange={(e) =>
                                    setMobileBanking((prevState) => ({
                                        ...prevState,
                                        trxId: e.target.value,
                                    }))
                                }
                            />
                        </FormControl>
                    )}

                    {paymentMethod === 'debit_card' && (
                        <FormControl>
                            <FormLabel>Debit Card Payment</FormLabel>
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
                            <FormLabel>Amount</FormLabel>
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
                            </NumberInput>
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
