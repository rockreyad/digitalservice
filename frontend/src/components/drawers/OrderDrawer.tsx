'use client'
import React, { useState, useRef } from 'react'
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { FaRegEdit } from 'react-icons/fa'
import { Order } from 'types/order'
import { updateOrder } from '@/utils/api/order'

export default function OrderDrawer({ order }: { order: Order }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <>
            <Button
                ref={btnRef as React.MutableRefObject<any>}
                size={'xs'}
                colorScheme={'gray'}
                className="space-x-1"
                onClick={onOpen}
            >
                <FaRegEdit className="" />
                <p> edit</p>
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
                    <DrawerHeader>Order History</DrawerHeader>

                    <DrawerBody bgColor={'gray.100'}>
                        <Box
                            as="div"
                            fontWeight="medium"
                            fontSize="sm"
                            marginBlock={'4'}
                            padding={'4'}
                            borderRadius={'sm'}
                            bgColor={'AppWorkspace'}
                        >
                            <h1>Order Status</h1>

                            <OrderStatusRadio
                                orderId={order.orderId}
                                orderStatus={order.statusId}
                            />
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

function OrderStatusRadio({
    orderId,
    orderStatus,
}: {
    orderId: number
    orderStatus: number
}) {
    const [status, setStatus] = useState(String(orderStatus))
    const radioTextColor = useColorModeValue('gray.600', 'gray.200')
    const queryClient = useQueryClient()
    const toast = useToast()

    const handleStatusChange = (value: string) => {
        setStatus(value)
    }
    const { mutate, isLoading } = useMutation(`orders`, updateOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries(`orders`)
            toast({
                title: 'Order has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        },
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate({
            orderId,
            orderStatusId: Number(status),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <RadioGroup value={status} onChange={handleStatusChange}>
                <Flex
                    direction={{ base: 'column' }}
                    rounded="md"
                    p={2}
                    justify={{ base: 'space-around', md: 'center' }}
                >
                    {[
                        'pending',
                        'delivered',
                        'complete',
                        'fraud',
                        'processing',
                    ].map((status, index) => (
                        <Radio
                            key={index}
                            value={String(index + 1)}
                            colorScheme="blue"
                        >
                            <Text
                                fontWeight="medium"
                                textColor={radioTextColor}
                                textTransform={'capitalize'}
                                color={radioTextColor}
                            >
                                {status}
                            </Text>
                        </Radio>
                    ))}
                </Flex>
            </RadioGroup>
            <Button
                colorScheme="primary"
                size={'xs'}
                className="px-2 py-0.5 rounded"
                type="submit"
                disabled={isLoading}
            >
                Update oder Status
            </Button>
        </form>
    )
}
