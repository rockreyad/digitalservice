'use client'

import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { ServiceResponse } from 'types/service'

export default function ServiceList({ data }: { data: ServiceResponse }) {
    return (
        <div className="space-y-4">
            <ServiceListHeader />
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data && data?.data.length > 0
                            ? data?.data.map((service, index) => (
                                  <Tr key={index}>
                                      <Td>{service.title}</Td>
                                      <Td>
                                          {service.status
                                              ? 'active'
                                              : 'deactive'}
                                      </Td>
                                  </Tr>
                              ))
                            : null}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

import { HStack, Stack, Text } from '@chakra-ui/react'
import RouterButton from '../Button/RouterButton'

function ServiceListHeader() {
    return (
        <>
            <div className="w-full">
                <HStack
                    justifyContent={'space-between'}
                    alignContent={'space-between'}
                >
                    <Stack spacing={1}>
                        <Text as="b">Services</Text>
                        <Text textColor={'gray.500'} fontSize={'smaller'}>
                            service we&apos;re providing
                        </Text>
                    </Stack>
                    <RouterButton
                        link="dashboard/service/create"
                        name="create"
                    />
                </HStack>
            </div>
        </>
    )
}
