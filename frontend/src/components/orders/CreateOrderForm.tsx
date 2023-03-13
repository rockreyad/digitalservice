'use client'

import { useAuth } from '@/contexts/auth-context'
import { createOrder } from '@/utils/api/order'
import { getService } from '@/utils/api/services'
import { Box, FormControl, Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { OrderError } from 'types/order'
import { ServiceResponse } from 'types/service'
import OrderItem from './OrderItem'

export default function CreateOrderForm() {
    //users for selecting user
    // const fetchUser = async () => {}

    //status for selecting status
    // const fetchStatus = async () => {}

    const { user } = useAuth()
    const [order, setOrder] = useState({
        userId: user?.role === 'admin' ? String('') : (user?.userId as string),
        statusId: user?.role === 'admin' ? Number('') : Number(1),
        price: Number(''),
        orderItems: Array<{ serviceId: number }>(),
    })
    const router = useRouter()

    //mutate the inputfiled data
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>,
    ) {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    function handleOrderItemChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const serviceId = Number(e.target.value)
        const orderItems = order.orderItems.concat({ serviceId: serviceId })
        setOrder({ ...order, orderItems })
    }

    const queryClient = useQueryClient()
    const { data: services } = useQuery<ServiceResponse>('services', getService)

    const { mutate, data, isSuccess, isLoading, error, isError } = useMutation(
        createOrder,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('orders')
            },
        },
    )

    //validation and send data to backend
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(order)

        console.log(order)
    }

    React.useEffect(() => {
        isSuccess ? router.push('/dashboard/order') : null
    }, [isSuccess, router])

    const OrderError = (error as OrderError)?.message
        ? (error as OrderError).message
        : 'Something went wrong'

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    {isError ? (
                        <FormControl>
                            <Box
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                <Text textColor={'red.400'}>{OrderError}</Text>
                            </Box>
                        </FormControl>
                    ) : null}
                    {isSuccess ? (
                        <FormControl>
                            <Box
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                <Text textColor={'green.500'}>
                                    {data?.message}
                                </Text>
                            </Box>
                        </FormControl>
                    ) : null}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        {/* User Filed */}
                        {user?.role === 'admin' && (
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="service-name"
                                >
                                    User
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="service-name"
                                    type="text"
                                    onChange={handleChange}
                                    value={order.userId}
                                    name="userId"
                                    placeholder="Type user id"
                                />
                                <p className="text-gray-600 text-xs italic">
                                    Make it shorter and as simpler as you&apos;d
                                    like
                                </p>
                            </div>
                        )}
                        {/* Price Field */}
                        <div className="w-full md:w-1/2 px-3  mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="service-description"
                            >
                                Order price
                            </label>

                            <input
                                type={'number'}
                                {...(user?.role === 'user' && {
                                    disabled: true,
                                })}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="service-description"
                                onChange={handleChange}
                                value={order.price}
                                name="price"
                                placeholder="price"
                            />
                        </div>

                        {/* Select Filed */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="service-description"
                            >
                                Select Services
                            </label>
                            <select
                                className="appearance-none block w-full  h-80 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                multiple
                                onChange={handleOrderItemChange}
                                placeholder="Select option"
                            >
                                {services?.data &&
                                    services.data.map((service) => {
                                        return (
                                            <option
                                                key={service.serviceId}
                                                value={service.serviceId}
                                            >
                                                {service.title}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>

                        {/* Order Status */}
                        {user?.role === 'admin' && (
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="service-description"
                                >
                                    Order Status
                                </label>
                                <Select
                                    value={order.statusId}
                                    onChange={handleChange}
                                    name="statusId"
                                    placeholder="Select option"
                                >
                                    <option value={1}>pending</option>
                                    <option value={2}>delivered</option>
                                    <option value={3}>complete</option>
                                    <option value={4}>fraud</option>
                                </Select>
                            </div>
                        )}

                        {/* Order Item */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 pt-4">
                            <OrderItem />
                        </div>
                    </div>

                    <button
                        className="bg-black py-1 px-6 rounded text-white capitalize"
                        type="submit"
                    >
                        {isLoading ? 'loading...' : 'submit'}
                    </button>
                </form>
            </div>
        </>
    )
}
