'use client'
import ReportCard from '@/components/cards/report'
import Loading from '@/components/loading'
import { getOrders } from '@/utils/api/order'

import {
    Box,
    Center,
    Flex,
    Grid,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    TableContainer,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useMediaQuery,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export default function Reports() {
    return (
        <>
            <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                    <Tab>Analytics</Tab>
                    <Tab>Services</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ReportHeader title={'Reports'} />
                        <ReportBody />
                    </TabPanel>
                    <TabPanel>
                        <Box
                            w={'full'}
                            bgColor={'AppWorkspace'}
                            padding={'4'}
                            borderRadius={'lg'}
                        >
                            <Text textColor={'gray.500'} fontWeight={'medium'}>
                                Providing Services
                            </Text>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

const ReportHeader = ({ title }: { title: string }) => {
    //eslint-disable-next-line
    const [date, setDate] = useState(new Date())

    return (
        <>
            <Text
                paddingBlock={'4'}
                fontFamily={'heading'}
                fontSize={'2xl'}
                fontWeight={'bold'}
            >
                {title}
            </Text>
            <Flex paddingBlock={'4'} gap={'4'}>
                <Box borderRadius={'lg'}>
                    <Input
                        placeholder="Select Date"
                        size="md"
                        bgColor={'AppWorkspace'}
                        w={'fit'}
                        type="date"
                    />
                </Box>
            </Flex>
        </>
    )
}

const ReportBody = () => {
    const [isSmallerScreen, setIsSmallerScreen] = useState(false)

    // Hook for detecting screen size
    const [isLargerThanMd] = useMediaQuery('(min-width: 48em)')

    // Function to update state based on screen size
    const handleScreenSizeChange = () => {
        if (window.innerWidth < 768) {
            setIsSmallerScreen(true)
        } else {
            setIsSmallerScreen(false)
        }
    }

    // Add event listener to window resize
    useEffect(() => {
        window.addEventListener('resize', handleScreenSizeChange)
        return () => {
            window.removeEventListener('resize', handleScreenSizeChange)
        }
    }, [])
    return (
        <Flex flexDir={isLargerThanMd ? 'row' : 'column'} rowGap={'3'}>
            {!isSmallerScreen && isLargerThanMd ? ( // Large screen layout
                <Grid templateColumns="repeat(2,1fr)" gap={4} w="full" mr={4}>
                    <ReportCard title="Order" value="5,129" />
                    <ReportCard title="Service provide" value="9564" />
                    <ReportCard title="Order Total" amount="123,112" />
                    <ReportCard title="Users" value="203" />
                </Grid>
            ) : (
                // Small screen layout
                <Grid templateColumns="repeat(2,1fr)" gap={4}>
                    <ReportCard title="Order" value="5,129" />
                    <ReportCard title="Service provide" value="9564" />
                    <ReportCard title="Order Total" amount="123,112" />
                    <ReportCard title="Users" value="203" />
                </Grid>
            )}
            <TopOrders rows={10} />
        </Flex>
    )
}

const TopOrders = ({ rows }: { rows: number }) => {
    const {
        data: topOrders,
        isLoading,
        isError,
        error,
    } = useQuery('topOrders', getOrders)

    return (
        <>
            <Box
                w={'full'}
                bgColor={'AppWorkspace'}
                padding={'4'}
                borderRadius={'lg'}
            >
                <Text textColor={'gray.500'} fontWeight={'medium'}>
                    {`Top ${rows} Orders`}
                </Text>
                {isLoading ? (
                    <Center>
                        <Loading />
                    </Center>
                ) : (
                    <TableContainer>
                        {isError ? (
                            <Text>{error as string}</Text>
                        ) : (
                            <Table size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Invoice No</Th>
                                        <Th isNumeric>Total</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {topOrders?.data
                                        ?.slice(0, rows)
                                        .map((item) => {
                                            return (
                                                <Tr key={item.orderId}>
                                                    <Td>{item.orderId}</Td>
                                                    <Td>{item.invoiceId}</Td>
                                                    <Td isNumeric>
                                                        ৳{' '}
                                                        {item?.price!.toFixed(
                                                            2,
                                                        )}
                                                    </Td>
                                                </Tr>
                                            )
                                        })}
                                </Tbody>
                            </Table>
                        )}
                    </TableContainer>
                )}
            </Box>
        </>
    )
}
