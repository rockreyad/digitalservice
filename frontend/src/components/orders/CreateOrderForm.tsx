'use client'

import { useAuth } from '@/contexts/auth-context'
import { createOrder } from '@/utils/api/order'
import { getService } from '@/utils/api/services'
import { getUserList } from '@/utils/api/user'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
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
import { GoDiffRemoved } from 'react-icons/go'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { OrderError } from 'types/order'
import { Service, ServiceResponse } from 'types/service'
import { UserListResponse } from 'types/user'
import { OrderItem } from './OrderItem'

export default function CreateOrderForm() {
    const { user } = useAuth()
    const [order, setOrder] = useState({
        userId: user?.role === 'admin' ? String('') : (user?.userId as string),
        statusId: user?.role === 'admin' ? Number('') : Number(1),
        price: Number(''),
        orderItems: Array<{ serviceId: number; itemPrice: number }>(),
    })

    //selected services
    const [selectedServices, setSelectedServices] = useState<Service[]>([])

    //total service price for OrderItems Array
    const totalServicePrice = selectedServices.reduce(
        (acc, service) => acc + service.price,
        0,
    )
    React.useEffect(() => {
        setOrder((prevOrder) => ({
            ...prevOrder,
            orderItems: selectedServices.map((service) => ({
                serviceId: service.serviceId!,
                itemPrice: service.price,
            })),
            price: totalServicePrice,
        }))
    }, [selectedServices, totalServicePrice])

    const router = useRouter()
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

    //if the order is created successfully redirect to the order page
    React.useEffect(() => {
        isSuccess ? router.push('/dashboard/order') : null
    }, [isSuccess, router])

    //Error message
    const OrderError = (error as OrderError)?.message
        ? (error as OrderError).message
        : 'Something went wrong'

    //mutate the inputfiled data
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    //validation and send data to backend
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(order)

        console.log(order)
    }

    //remove services from selected services
    const removeService = (serviceId: number | undefined) => {
        if (!serviceId) {
            return
        }

        const newServices = selectedServices.filter(
            (service) => service.serviceId !== serviceId,
        )
        setSelectedServices(newServices)
    }

    const handlePriceChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number | undefined,
    ) => {
        if (!id) {
            return
        }

        const service = selectedServices.map((service) =>
            service.serviceId === id
                ? { ...service, price: Number(e.target.value) }
                : service,
        )

        setSelectedServices(service)
    }

    return (
        <>
            <div className="lg:h-screen">
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
                                        <FormLabel
                                            color={'primary.500'}
                                            className="block uppercase tracking-wide  text-xs font-bold mb-2"
                                            htmlFor="service-description"
                                        >
                                            Select Customer
                                        </FormLabel>
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
                                    <FormLabel
                                        color={'primary.500'}
                                        className="block uppercase tracking-wide  text-xs font-bold p-1"
                                    >
                                        Selected Services
                                    </FormLabel>
                                    {selectedServices.length > 0 ? (
                                        <TableContainer>
                                            <Table size="sm">
                                                <Thead>
                                                    <Tr>
                                                        <Th>name</Th>
                                                        <Th isNumeric>price</Th>
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
                                                                    {/* if the
                                                                    user is
                                                                    admin then
                                                                    he can
                                                                    change the
                                                                    price */}
                                                                    {user?.role ===
                                                                    'admin' ? (
                                                                        <InputGroup>
                                                                            <InputLeftElement color="gray.300">
                                                                                &#2547;
                                                                            </InputLeftElement>

                                                                            <Input
                                                                                type={
                                                                                    'number'
                                                                                }
                                                                                name="price"
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    handlePriceChange(
                                                                                        e,
                                                                                        service?.serviceId,
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    service.price
                                                                                }
                                                                                size="sm"
                                                                            />
                                                                        </InputGroup>
                                                                    ) : (
                                                                        <>
                                                                            <Text>
                                                                                {'&#2547;' +
                                                                                    service.price}
                                                                            </Text>
                                                                        </>
                                                                    )}
                                                                    <Text
                                                                        fontSize={
                                                                            'smaller'
                                                                        }
                                                                    ></Text>
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
                                        <FormLabel
                                            color={'primary.500'}
                                            className="block uppercase tracking-wide  text-xs font-bold mb-2"
                                            htmlFor="service-description"
                                        >
                                            Order Status
                                        </FormLabel>
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
                                    <FormLabel
                                        color="primary.500"
                                        className="block uppercase tracking-wide  text-xs font-bold mb-2"
                                        htmlFor="service-description"
                                    >
                                        Order price
                                    </FormLabel>

                                    <Input
                                        disabled
                                        hidden
                                        textColor={'black'}
                                        type={'number'}
                                        {...(user?.role === 'user' && {
                                            disabled: true,
                                        })}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="service-description"
                                        value={totalServicePrice}
                                        name="price"
                                        placeholder="price"
                                    />

                                    <Text fontSize={'lg'} as="b">
                                        &#2547;{' '}
                                        {parseFloat(
                                            String(totalServicePrice),
                                        ).toFixed(2)}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        {/* Select service Item */}
                        <div className="md:w-3/5 px-3 mb-6 md:mb-0">
                            <div className="bg-white p-2 rounded">
                                <FormLabel
                                    color={'primary.500'}
                                    className="block uppercase tracking-wide  text-xs font-bold mb-2"
                                    htmlFor="service-description"
                                >
                                    Service List
                                </FormLabel>

                                <OrderItem
                                    setSelectedServices={setSelectedServices}
                                    selectedServices={selectedServices}
                                    data={services as ServiceResponse}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Submit button */}
                    <Button
                        bgColor={'primary.500'}
                        color={'white'}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'loading...' : 'submit'}
                    </Button>
                </form>
            </div>
        </>
    )
}
