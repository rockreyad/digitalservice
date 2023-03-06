'use client'

import { getServiceCategory } from '@/utils/api/services'
import { Box, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { ServiceCategory } from 'types/service'
import RouterButton from '../Button/RouterButton'

export default function ServiceCategoryList() {
    const { isSuccess, isError, data } = useQuery(
        'serviceCategory',
        getServiceCategory,
    )
    return (
        <>
            <div className="space-y-4">
                <ServiceListHeader />
                {isError && <Text>Something went wrong!</Text>}
                {isSuccess && <ServiceList serviceCategory={data?.data} />}
            </div>
        </>
    )
}

function ServiceListHeader() {
    return (
        <>
            <div className="w-full">
                <HStack
                    justifyContent={'space-between'}
                    alignContent={'space-between'}
                >
                    <Stack spacing={1}>
                        <Text as="b">Category of Service</Text>
                        <Text textColor={'gray.500'} fontSize={'smaller'}>
                            under these categoris we are serving services
                        </Text>
                    </Stack>
                    <RouterButton
                        link="dashboard/service/create-category"
                        name="create"
                    />
                </HStack>
            </div>
        </>
    )
}

function ServiceList({
    serviceCategory,
}: {
    serviceCategory: ServiceCategory[] | undefined
}) {
    return (
        <>
            {serviceCategory ? (
                <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={5}>
                    {serviceCategory &&
                        serviceCategory.map((category) => (
                            <Link
                                key={category.id}
                                className="cursor-pointer"
                                href={`/dashboard/service/${category.id}`}
                            >
                                <Box
                                    rounded={'sm'}
                                    textColor={'black'}
                                    borderRadius={'md'}
                                    boxShadow={'md'}
                                    bg="white"
                                    height={'100%'}
                                    padding={['5px', '20px']}
                                    className="hover:shadow-lg hover:bg-green-50 transition duration-500 ease-in-out"
                                >
                                    <Text
                                        textTransform={'capitalize'}
                                        fontSize={[
                                            'small',
                                            'sm',
                                            'medium',
                                            'md',
                                        ]}
                                        as={'b'}
                                    >
                                        {category.name}
                                    </Text>
                                    <Text
                                        textColor={'gray.600'}
                                        textTransform={'capitalize'}
                                        fontSize={[
                                            'x-small',
                                            'xx-small',
                                            'small',
                                        ]}
                                    >
                                        {category.description}
                                    </Text>
                                </Box>
                            </Link>
                        ))}
                </SimpleGrid>
            ) : (
                <Text>No Category Found!</Text>
            )}
        </>
    )
}
