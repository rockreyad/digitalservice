'use client'

import { useAuth } from '@/contexts/auth-context'
import { createOrder } from '@/utils/api/order'
import { getService } from '@/utils/api/services'
import { getUserList } from '@/utils/api/user'
import {
    Box,
    FormControl,
    Select,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { GoDiffAdded, GoDiffRemoved } from 'react-icons/go'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { OrderError } from 'types/order'
import { Service, ServiceResponse } from 'types/service'
import { UserListResponse } from 'types/user'

export default function CreateOrderForm() {
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

    const queryClient = useQueryClient()

    //get The services and users
    const { data: services } = useQuery<ServiceResponse>('services', getService)
    const { data: users } = useQuery<UserListResponse>('users', getUserList)

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
        //if the order is created successfully redirect to the order page
        isSuccess ? router.push('/dashboard/order') : null
    }, [isSuccess, router])

    const OrderError = (error as OrderError)?.message
        ? (error as OrderError).message
        : 'Something went wrong'

    //if the Service is Free

    const [selectedServices, setSelectedServices] = useState<Service[]>([])

    const customPrice = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number | undefined,
    ) => {
        if (!id) {
            return
        }
        const service = selectedServices.map((service) =>
            service.serviceId === id
                ? { ...service, isFree: e.target.checked }
                : service,
        )
        setSelectedServices(service)
    }
    const removeService = (serviceId: number | undefined) => {
        if (!serviceId) {
            return
        }

        const newServices = selectedServices.filter(
            (service) => service.serviceId !== serviceId,
        )
        setSelectedServices(newServices)
    }
    return (
        <>
            <div className="">
                <form onSubmit={handleSubmit} className="w-full">
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
                    <div className="flex flex-col md:flex-row -mx-3 mb-6 w-full space-y-4 md:space-y-0">
                        <div className="flex flex-col md:w-4/6 space-y-4">
                            {/* Select User */}
                            {user?.role === 'admin' && (
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <div className="bg-white p-2 rounded">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="service-description"
                                        >
                                            Select Customer
                                        </label>
                                        <Select
                                            value={order.userId}
                                            onChange={handleChange}
                                            name="userId"
                                            placeholder="Select Customer"
                                        >
                                            {users?.data?.map((user) => (
                                                <option
                                                    key={user.userId}
                                                    value={user.userId}
                                                >
                                                    {user.email}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {/* Selected Services */}
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <div className="bg-white p-2 rounded">
                                    <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold p-1">
                                        Selected Services
                                    </h1>
                                    {selectedServices.length > 0 ? (
                                        <TableContainer>
                                            <Table size="sm">
                                                <Thead>
                                                    <Tr>
                                                        <Th>name</Th>
                                                        <Th isNumeric>price</Th>
                                                        <Th>free</Th>
                                                        <Th>cart</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {selectedServices.map(
                                                        (service) => (
                                                            <Tr
                                                                key={
                                                                    service?.serviceId
                                                                }
                                                            >
                                                                <Td>
                                                                    <Text
                                                                        fontSize={
                                                                            'smaller'
                                                                        }
                                                                    >
                                                                        {
                                                                            service.title
                                                                        }
                                                                    </Text>
                                                                </Td>
                                                                <Td isNumeric>
                                                                    <Text
                                                                        fontSize={
                                                                            'smaller'
                                                                        }
                                                                    >
                                                                        {service.isFree
                                                                            ? 0
                                                                            : service.price}
                                                                    </Text>
                                                                </Td>
                                                                <Td>
                                                                    <Switch
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            customPrice(
                                                                                e,
                                                                                service?.serviceId,
                                                                            )
                                                                        }
                                                                        size="sm"
                                                                    />
                                                                </Td>
                                                                <Td>
                                                                    <GoDiffRemoved
                                                                        className="cursor-pointer hover:bg-black hover:text-white"
                                                                        onClick={() =>
                                                                            removeService(
                                                                                service.serviceId,
                                                                            )
                                                                        }
                                                                    />
                                                                </Td>
                                                            </Tr>
                                                        ),
                                                    )}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Text
                                            fontSize={'x-small'}
                                            color="red.300"
                                        >
                                            No Service Selected
                                        </Text>
                                    )}
                                </div>
                            </div>

                            {/* Order Status */}
                            {user?.role === 'admin' && (
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <div className="bg-white p-2 rounded">
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
                                </div>
                            )}

                            {/* Price Field */}
                            <div className="w-full px-3  mb-6 md:mb-0">
                                <div className="bg-white p-2 rounded">
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
                            </div>
                        </div>
                        {/* Select service Item */}
                        <div className="md:w-3/5 px-3 mb-6 md:mb-0">
                            <div className="bg-white p-2 rounded">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="service-description"
                                >
                                    Service List
                                </label>

                                <OrderItem
                                    setSelectedServices={setSelectedServices}
                                    data={services as ServiceResponse}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-black py-1 px-6 rounded text-white capitalize"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'loading...' : 'submit'}
                    </button>
                </form>
            </div>
        </>
    )
}

const OrderItem = ({
    data,
    setSelectedServices,
}: {
    data: ServiceResponse
    setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>
}) => {
    return (
        <div>
            <TableContainer>
                <Table size={['sm']}>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <Th isNumeric>price</Th>
                            <Th>cart</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data?.map((service) => (
                            <Tr key={service.serviceId}>
                                <Td>
                                    <Text fontSize={'smaller'}>
                                        {service.title}
                                    </Text>
                                </Td>
                                <Td isNumeric>
                                    <Text fontSize={'smaller'}>
                                        {service.price}
                                    </Text>
                                </Td>

                                <Td>
                                    <GoDiffAdded
                                        className="cursor-pointer hover:bg-black hover:text-white"
                                        onClick={() =>
                                            setSelectedServices((prev) => [
                                                ...prev,
                                                service,
                                            ])
                                        }
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}
