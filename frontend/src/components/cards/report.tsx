'use client'
import { Box, Center, Text } from '@chakra-ui/react'

export default function ReportCard({
    title,
    value,
    amount,
}: {
    title: string
    value?: string
    amount?: string
}) {
    return (
        <>
            <Box borderRadius={'lg'} bgColor={'AppWorkspace'} padding={'4'}>
                <Header title={title} />
                <Center padding={'5'}>
                    {value && <Body value={value} />}
                    {amount && <Body amount={amount} />}
                </Center>
            </Box>
        </>
    )
}

const Header = ({ title }: { title: string }) => {
    return (
        <Text textColor={'gray.500'} fontWeight={'medium'}>
            {title}
        </Text>
    )
}

const Body = ({ value, amount }: { value?: string; amount?: string }) => {
    return (
        <Text
            textColor={'blackAlpha.800'}
            fontSize={['2xl', '5xl', '6xl']}
            fontWeight={'extrabold'}
        >
            {value ? (
                value
            ) : amount ? (
                <>
                    <span className="text-xs">৳</span>
                    {amount}
                </>
            ) : null}
        </Text>
    )
}
