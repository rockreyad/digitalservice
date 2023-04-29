'use client'
import ReportCard from '@/components/cards/report'
import Loading from '@/components/loading'
import { getOrdersByDateRange } from '@/utils/api/report'
import { getService } from '@/utils/api/services'

import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    Grid,
    Input,
    Radio,
    RadioGroup,
    Stack,
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
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Order } from 'types/order'
import { Service } from 'types/service'

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
                        <ReportController title={'Reports'} />
                    </TabPanel>
                    <TabPanel>
                        <Box
                            w={'full'}
                            bgColor={'AppWorkspace'}
                            padding={'4'}
                            borderRadius={'lg'}
                        >
                            <Flex justify={'flex-end'}>
                                <Button size={'sm'} colorScheme="primary">
                                    Print
                                </Button>
                            </Flex>
                            <Text textColor={'gray.500'} fontWeight={'medium'}>
                                Providing Services
                            </Text>
                            <ServiceTable />
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

const ReportController = ({ title }: { title: string }) => {
    //eslint-disable-next-line
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [status, setStatus] = useState('')
    const [isChecked, setIsChecked] = useState('')

    const queryClient = useQueryClient()
    const toast = useToast()

    const {
        mutate,
        isLoading,
        isError,
        error,
        data: reports,
    } = useMutation('reports', getOrdersByDateRange, {
        onSuccess: () => {
            queryClient.invalidateQueries('reports')
        },
    })

    const handleSubmit = async () => {
        if (dateFrom === '' || dateTo === '') {
            toast({
                title: 'Please fill all the fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        const data = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            status: Number(status),
            isChecked: isChecked,
        }
        await mutate(data)
        console.log(reports)
    }

    const handleClear = () => {
        //a toast to clear the fields
        toast({
            title: 'all fields cleared',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        setDateFrom('')
        setDateTo('')
        setStatus('')
        setIsChecked('')
    }

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
            <FormControl
                id="date"
                paddingBlock={'4'}
                paddingInline={'4'}
                w={'full'}
                bgColor={'AppWorkspace'}
                borderRadius={'lg'}
            >
                <Flex paddingBlock={'4'} gap={'4'} align={'flex-end'}>
                    <Box borderRadius={'lg'}>
                        <Text textColor={'gray.500'} fontWeight={'medium'}>
                            From
                        </Text>
                        <Input
                            placeholder="Select Date"
                            size="md"
                            w={'fit'}
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </Box>
                    <Box borderRadius={'lg'}>
                        <Text textColor={'gray.500'} fontWeight={'medium'}>
                            To
                        </Text>
                        <Input
                            placeholder="Select Date"
                            size="md"
                            w={'fit'}
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </Box>
                    <Box borderRadius={'lg'}>
                        <Button colorScheme="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                    <Box borderRadius={'lg'}>
                        <Button
                            size={'xs'}
                            color="blackAlpha.300"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </Box>
                </Flex>
                <Flex paddingBlock={'4'} gap={'4'}>
                    <Box borderRadius={'lg'}>
                        <Text textColor={'gray.500'} fontWeight={'medium'}>
                            Status
                        </Text>
                        <RadioGroup
                            value={status}
                            onChange={(value) => setStatus(value)}
                        >
                            <Stack direction="row">
                                <Radio value="1">Pending</Radio>
                                <Radio value="2">Delivered</Radio>
                                <Radio value="3">Completed</Radio>
                                <Radio value="4">Fraud</Radio>
                                <Radio value="5">Processing</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Flex>
                <Flex paddingBlock={'4'} gap={'4'}>
                    <Box borderRadius={'lg'}>
                        <Text textColor={'gray.500'} fontWeight={'medium'}>
                            Payment
                        </Text>

                        <RadioGroup
                            value={isChecked}
                            onChange={(value) => setIsChecked(value)}
                        >
                            <Stack direction="row">
                                <Radio value="true">
                                    <Text>Paid</Text>
                                </Radio>
                                <Radio value="false">Not Payment yet</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Flex>
            </FormControl>
            {isLoading ? (
                <Center>
                    <Loading />
                </Center>
            ) : (
                <>
                    {reports?.data && reports.data.length > 0 ? (
                        <>
                            <ReportBody data={reports.data} />
                            <AllOrders data={reports.data} />
                        </>
                    ) : (
                        <ReportNotFound />
                    )}
                </>
            )}

            {isError && <p>{error as unknown as string}</p>}
        </>
    )
}

const ReportBody = ({ data: orders }: { data: Order[] }) => {
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

    let orderStats = {
        totalOrder: orders.length,
        totalAmount: getTotalPrice(orders) as unknown as number,
        totalServices: countTotalServices(orders),
        totalUsers: countUniqueUsers(orders),
    }

    // Function to calculate total price
    function getTotalPrice(orders: Order[]) {
        let totalPrice = 0
        for (let i = 0; i < orders.length; i++) {
            totalPrice += orders[i].price!
        }
        return totalPrice.toFixed(2)
    }

    // Function to calculate total services
    function countTotalServices(orders: Order[]) {
        let totalServices = 0
        for (let i = 0; i < orders.length; i++) {
            const orderItems: any = orders[i].orderItems
            for (let j = 0; j < orderItems.length!; j++) {
                const service = orderItems[j].service!
                if (service && service.title) {
                    totalServices++
                }
            }
        }
        return totalServices
    }

    // Function to calculate total unique users
    function countUniqueUsers(orders: Order[]) {
        const users = new Set()
        for (let i = 0; i < orders.length; i++) {
            const user = orders[i].user
            if (user && user.user_id) {
                users.add(user.user_id)
            }
        }
        return users.size
    }

    return (
        <Flex
            flexDir={isLargerThanMd ? 'row' : 'column'}
            rowGap={'3'}
            paddingBlock={'4'}
        >
            {!isSmallerScreen && isLargerThanMd ? ( // Large screen layout
                <Grid templateColumns="repeat(2,1fr)" gap={4} w="full" mr={4}>
                    <ReportCard title="Sales" value={orders.length} />
                    <ReportCard
                        title="Service sales"
                        value={orderStats.totalServices}
                    />
                    <ReportCard
                        title="Total Sales"
                        amount={orderStats.totalAmount}
                    />
                    <ReportCard
                        title="User Order"
                        value={orderStats.totalUsers}
                    />
                </Grid>
            ) : (
                // Small screen layout
                <Grid templateColumns="repeat(2,1fr)" gap={4}>
                    <ReportCard title="Sales" value={orders.length} />
                    <ReportCard
                        title="Service sales"
                        value={orderStats.totalServices}
                    />
                    <ReportCard
                        title="Total Sales"
                        amount={orderStats.totalAmount}
                    />
                    <ReportCard
                        title="User Order"
                        value={orderStats.totalUsers}
                    />
                </Grid>
            )}
            <TopOrders data={orders} rows={10} />
        </Flex>
    )
}

const TopOrders = ({
    data: topOrders,
    rows,
}: {
    data: Order[]
    rows: number
}) => {
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
                {topOrders && (
                    <TableContainer>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Invoice No</Th>
                                    <Th isNumeric>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {topOrders
                                    ?.slice(0, rows)
                                    .sort((a, b) => {
                                        if (a.price && b.price) {
                                            return b.price - a.price
                                        }
                                        return 0
                                    })
                                    .map((item) => {
                                        return (
                                            <Tr key={item.orderId}>
                                                <Td>{item.orderId}</Td>
                                                <Td>{item.invoiceId}</Td>
                                                <Td isNumeric>
                                                    ৳ {item?.price!.toFixed(2)}
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </>
    )
}

//this component is for all order list
const AllOrders = ({ data: orders }: { data: Order[] }) => {
    return (
        <Box
            w={'full'}
            bgColor={'AppWorkspace'}
            padding={'4'}
            borderRadius={'lg'}
        >
            <Text textColor={'gray.500'} fontWeight={'medium'}>
                All Orders
            </Text>
            {orders && (
                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Invoice No</Th>
                                <Th>Customer</Th>
                                <Th>Top Service</Th>
                                <Th>date</Th>
                                <Th>status</Th>
                                <Th isNumeric>Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((item) => {
                                return (
                                    <Tr key={item.orderId}>
                                        <Td>{item.orderId}</Td>
                                        <Td>{item.invoiceId}</Td>
                                        <Td>{item.user?.firstName}</Td>

                                        <Td>
                                            {
                                                item?.orderItems[0]?.service
                                                    ?.title!
                                            }
                                        </Td>
                                        <Td>{item.createAt}</Td>
                                        <Td>
                                            <Badge
                                                px={'3'}
                                                py="1"
                                                rounded="sm"
                                                colorScheme={
                                                    item.statusType ===
                                                    'delivered'
                                                        ? 'green'
                                                        : item.statusType ===
                                                          'complete'
                                                        ? 'blue'
                                                        : item.statusType ===
                                                          'fraud'
                                                        ? 'red'
                                                        : item.statusType ===
                                                          'pending'
                                                        ? 'orange'
                                                        : 'gray'
                                                }
                                            >
                                                {item.statusType}
                                            </Badge>
                                        </Td>
                                        <Td isNumeric>
                                            ৳ {item?.price!.toFixed(2)}
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

const ReportNotFound = () => {
    return (
        <Flex
            flexDir={'column'}
            align={'center'}
            justify={'center'}
            w={'full'}
            h={'full'}
            paddingBlock={'4'}
        >
            <Box
                w={'full'}
                bgColor={'AppWorkspace'}
                padding={'4'}
                borderRadius={'lg'}
            >
                <Text textColor={'gray.500'} fontWeight={'medium'}>
                    No Reports Found
                </Text>
            </Box>
        </Flex>
    )
}

const ServiceTable = () => {
    const { data, isLoading, isError } = useQuery('all services', getService)

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <>Something went wrong</>
    }

    return (
        <Flex
            flexDir={'column'}
            align={'center'}
            justify={'center'}
            w={'full'}
            h={'full'}
            paddingBlock={'4'}
        >
            <Box
                w={'full'}
                bgColor={'AppWorkspace'}
                padding={'4'}
                borderRadius={'lg'}
            >
                {data?.data && <ServiceTables services={data.data} />}
            </Box>
        </Flex>
    )
}

const ServiceTables = ({ services }: { services: Service[] }) => {
    return (
        <TableContainer>
            <Table size="sm">
                <Tbody>
                    {services.map((item) => {
                        return (
                            <Tr key={item.serviceId}>
                                <Td as={'p'}>{item.title}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
