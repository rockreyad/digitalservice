'use client'
import { getOrderById } from '@/utils/api/order'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
    Badge,
    Flex,
    IconButton,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    UnorderedList,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { useQuery } from 'react-query'

const OrderInfo = ({ orderId }: { orderId: string }) => {
    const { data, isSuccess, isLoading, isError } = useQuery(
        [orderId],
        getOrderById,
    )
    return (
        <>
            <div className="space-y-4">
                {isLoading && <Text> Loading... </Text>}
                {isSuccess && (
                    <>
                        <OrderHeader
                            orderId={data?.data?.orderId as number}
                            createAt={data?.data?.createAt as string}
                            statusType={data?.data?.statusType as string}
                            key={data?.data?.orderId as number}
                        />
                        <main className="grid grid-flow-col grid-rows-2 grid-cols-1 md:grid-cols-3 md:grid-flow-row gap-2">
                            <CustomerCart
                                orderItems={data?.data?.orderItems as any}
                                orderSummary={data?.data?.price as number}
                            />
                            <CustomerInfo
                                user={
                                    data?.data?.user as {
                                        firstName: string
                                        lastName: string
                                        email: string
                                    }
                                }
                            />
                        </main>
                    </>
                )}
                {isError && <Text> Something went wrong </Text>}
            </div>
        </>
    )
}
function OrderHeader({
    orderId,
    createAt,
    statusType,
}: {
    orderId: number
    createAt: string
    statusType: string
}) {
    return (
        <>
            <header className="flex justify-between">
                <div className="flex space-x-2">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-semibold">
                            Order
                            <span className="font-light"> # {orderId}</span>
                        </h1>
                        <p className="text-gray-500 text-sm">{createAt}</p>
                    </div>
                    <div>
                        <Badge
                            className=""
                            variant="subtle"
                            colorScheme={
                                statusType === 'delivered'
                                    ? 'green'
                                    : statusType === 'complete'
                                    ? 'blue'
                                    : statusType === 'fraud'
                                    ? 'red'
                                    : statusType === 'pending'
                                    ? 'orange'
                                    : 'gray'
                            }
                        >
                            {statusType}
                        </Badge>
                    </div>
                </div>

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<BsThreeDots />}
                    />
                    <MenuList>
                        <MenuItem icon={<AddIcon />}>Update Order</MenuItem>
                        <Link prefetch href={'/dashboard/order/invoice/'}>
                            <MenuItem icon={<ExternalLinkIcon />}>
                                Print
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </header>
        </>
    )
}
function CustomerCart({
    orderItems,
    orderSummary,
}: {
    orderItems: { service: { title: string }; itemPrice: number }[]
    orderSummary: number
}) {
    return (
        <>
            <div className="md:col-start-1 md:col-end-3 space-y-5">
                <div className="bg-white p-4 rounded-md">
                    <div>
                        <h1 className="text-xl font-medium">
                            Customer&apos;s cart
                        </h1>
                        <p>Sevice list</p>
                    </div>
                    <UnorderedList className="p-2">
                        {orderItems?.map((item, index) => (
                            <ListItem key={index}>
                                <Flex justify={'space-between'}>
                                    <Text
                                        fontSize={'small'}
                                        fontWeight={'medium'}
                                        color={'GrayText'}
                                    >
                                        {item?.service?.title}
                                    </Text>
                                    <Text>
                                        {item.itemPrice === 0 ? (
                                            'Free'
                                        ) : (
                                            <>{item?.itemPrice}৳</>
                                        )}
                                    </Text>
                                </Flex>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </div>
                <OrderSummary price={orderSummary} />
            </div>
        </>
    )
}

function CustomerInfo({
    user,
}: {
    user: { firstName: string; lastName: string; email: string }
}) {
    return (
        <>
            <div className="bg-white p-4 h-fit space-y-4">
                <div className="">
                    <h1 className="text-xl font-medium">
                        Customer Information
                    </h1>

                    <div className="flex justify-between py-4">
                        <p>Customer Name</p>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Customer Email</p>
                        <p>
                            <a href="mailto:" className="text-blue-500">
                                {user.email}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

function OrderSummary({ price }: { price: number }) {
    return (
        <>
            <div className="bg-white p-4 rounded-md space-y-4">
                <h1 className="text-xl font-medium">Summary</h1>

                <div>
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>৳ 0.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Tax</p>
                        <p>৳ 0.00</p>
                    </div>
                    <hr />
                    <div className="flex justify-between py-4">
                        <p className="font-semibold text-lg">Total</p>
                        <p className="font-semibold text-lg">
                            ৳ {price.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderInfo
