'use client'
import { Box, HStack, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { OrderStatus } from 'types/order'

export default function OrderTableFilter({
    data = [],
    setOrderStatus,
}: {
    data?: OrderStatus[]
    setOrderStatus: Dispatch<SetStateAction<number | null>>
}) {
    return (
        <Box paddingBlock={'2'}>
            <HStack textColor={'gray.500'} spacing={'20px'}>
                <Text
                    borderBottom={'2px'}
                    borderBottomColor={'purple'}
                    as={'b'}
                    color={'purple'}
                    cursor={'pointer'}
                    _hover={{
                        borderBottom: '2px',
                        borderBottomColor: 'purple',
                        as: 'b',
                        color: 'purple',
                    }}
                    onClick={() => setOrderStatus(null)}
                >
                    All
                </Text>
                {data?.map((status) => (
                    <Text
                        key={status.statusId}
                        _hover={{
                            borderBottom: '2px',
                            borderBottomColor: 'purple',
                            as: 'b',
                            color: 'purple',
                        }}
                        _active={{
                            borderBottom: '2px',
                            borderBottomColor: 'purple',
                            as: 'b',
                            color: 'purple',
                        }}
                        cursor={'pointer'}
                        textTransform={'capitalize'}
                        onClick={() => setOrderStatus(status.statusId)}
                    >
                        {status.name}
                    </Text>
                ))}
            </HStack>
        </Box>
    )
}
