'use client'
import { useState } from 'react'
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
} from '@chakra-ui/react'

const paymentMoney = [500, 1000, 2000, 5000, 10000]

export default function PaymentForm() {
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')

    const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Payment Details:', {
            amount,
            paymentMethod,
        })
    }

    return (
        <div>
            <form onSubmit={handlePayment} className="space-y-4">
                <Flex flexDir="column" gap="4">
                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <NumberInput
                            format={(
                                value: string | number | null | undefined,
                            ) => `${value}`}
                            value={amount}
                            max={10000}
                            min={100}
                            onChange={(valueString) =>
                                setAmount(parseInt(valueString))
                            }
                        >
                            <NumberInputField value={amount} />
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
                            <option value="mobile_banks">Mobile Banks</option>
                        </Select>
                    </FormControl>
                </Flex>
                <Button colorScheme="primary" variant="solid" type="submit">
                    Pay now
                </Button>
            </form>
        </div>
    )
}
