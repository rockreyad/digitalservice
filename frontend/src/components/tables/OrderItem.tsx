'use client'
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { GoDiffAdded } from 'react-icons/go'
import { Service, ServiceResponse } from 'types/service'

export const OrderItem = ({
    data,
    setSelectedServices,
    selectedServices,
}: {
    data: ServiceResponse
    setSelectedServices: React.Dispatch<React.SetStateAction<Service[]>>
    selectedServices: Service[]
}) => {
    const toast = useToast()
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
                                    {/* Cart Button to select services */}
                                    <GoDiffAdded
                                        className="cursor-pointer hover:bg-black hover:text-white"
                                        //add service to selected services
                                        onClick={() => {
                                            // check if service already selected
                                            const isExist =
                                                selectedServices.find(
                                                    (item) =>
                                                        item.serviceId ===
                                                        service.serviceId,
                                                )

                                            // if not exist then add to selected service
                                            if (!isExist) {
                                                setSelectedServices((prev) => [
                                                    ...prev,
                                                    service,
                                                ])
                                            }

                                            // if exist then show error toast
                                            else
                                                toast({
                                                    title: `Service already selected`,
                                                    status: 'error',
                                                    isClosable: false,
                                                    duration: 1000,
                                                })
                                        }}
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
