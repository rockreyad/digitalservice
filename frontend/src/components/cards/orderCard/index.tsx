'use client'
import { Box, Text } from '@chakra-ui/react'

const OrderProps = [
    {
        id: 1,
        title: 'Total Order',
        value: 100,
    },
    {
        id: 2,
        title: 'Total Earn',
        value: 4000,
    },
    {
        id: 3,
        title: 'Active Order',
        value: 4000,
    },
    {
        id: 4,
        title: 'Complete Order',
        value: 4000,
    },
]

export default function OrderCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {OrderProps.map((item) => (
                <StatsCard key={item.id} data={item} />
            ))}
        </div>
    )
}

function StatsCard({ data }: { data: any }) {
    return (
        <div className="">
            <Box rounded={'md'} bg="white" w="100%" p={3} color="gray.600">
                <div className="flex flex-col">
                    <Text
                        textColor={'primary.400'}
                        fontWeight={'semibold'}
                        fontSize="x-small"
                    >
                        {data.title}
                    </Text>
                    <Text fontFamily={'cursive'} fontSize={'2xl'}>
                        {data.value}
                    </Text>
                </div>
            </Box>
        </div>
    )
}
