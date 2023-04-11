'use client'

import styles from './invoice.module.css'
import jsPDF from 'jspdf'

import Image from 'next/image'
import InvoiceDownloadBtn from './invoiceFile'
import {
    Box,
    Center,
    Divider,
    Flex,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getInvoice } from '@/utils/api/invoice'
import { Invoice } from 'types/invoice'
import Loading from '../loading'

const companyInformation = {
    name: 'Ztrios Tech & Marketing',
    address: '1234 Main St, Anytown, USA 12345',
    contact: '123-456-7890',
}

const customerInformation = {
    name: 'John Doe',
    address: '1234 Main St, Anytown, USA 12345',
    contact: '123-456-7890',
}

function convertHTMLToPDF() {
    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16,
    })
    var pdfjs = window.document.querySelector(
        '#invoice-template',
    ) as HTMLElement

    doc.html(pdfjs, {
        autoPaging: true,
        callback: function (doc) {
            window.open(doc.output('bloburl'), '_blank')
        },
    })
}

export default function InvoiceView({ orderId }: { orderId: string }) {
    const {
        data: invoice,
        isSuccess,
        isLoading,
        isError,
    } = useQuery(['invoice', orderId], getInvoice)
    console.log('invoice', invoice)
    return (
        <div className="space-y-4">
            {isLoading ? (
                <Center>
                    <Loading />
                </Center>
            ) : (
                <>
                    {isSuccess && invoice.data ? (
                        <>
                            <div className="flex justify-end">
                                <InvoiceDownloadBtn
                                    convert={convertHTMLToPDF}
                                />
                            </div>
                            <InvoiceTemplate data={invoice?.data!} />
                        </>
                    ) : <>
                          {isError && (
                              <Center>
                                  <Text
                                      fontSize={'3xl'}
                                      fontWeight={'bold'}
                                      textTransform={'lowercase'}
                                      color={'red.500'}
                                  >
                                      Something went wrong
                                  </Text>
                              </Center>
                          )}
                      </> ? (
                        <>
                            <NoInvoiceFound />
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    )
}

//invoice Template component will be used in invoiceView component to render invoice pdf
function InvoiceTemplate({ data }: { data: Invoice }) {
    const {
        orderItems,
        customer,
        invoiceDate,
        invoiceId,
        paymentMethod,
        totalAmount,
    } = data

    let totalPayment = 0
    let dueAmount = 0

    // console.log('paymentMethod', paymentMethod)

    // sum up total payment amount
    for (const payment of paymentMethod) {
        totalPayment += payment.amount
    }

    // calculate due amount
    dueAmount = totalAmount - totalPayment
    return (
        <div id="invoice-template" className={styles.invoice}>
            <div className={styles.invoice_view}>
                <Box as="div">
                    <Box bgColor={'powderblue'}>
                        <Flex
                            paddingInline={'8'}
                            paddingBlock={'8'}
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                            textColor={'blackAlpha.700'}
                        >
                            <Box>
                                <Text paddingBlock={'2'} fontWeight={'bold'}>
                                    {companyInformation.name}
                                </Text>
                                <Text>{companyInformation.address}</Text>
                                <Text>{companyInformation.contact}</Text>
                            </Box>
                            <Image
                                width="100"
                                height="100"
                                src="/ztrios.png"
                                alt="Ztrios"
                            />
                            <Box>
                                <Text paddingBlock={'2'} fontWeight={'bold'}>
                                    {customer.name}
                                </Text>
                                <Text>{customerInformation.address}</Text>
                                <Text>{customer.phone}</Text>
                            </Box>
                        </Flex>
                        <Box
                            as="div"
                            className="space-y-2"
                            paddingInline={'8'}
                            paddingBlock={'12'}
                            bgColor={'AppWorkspace'}
                        >
                            <Flex justifyContent={'space-between'}>
                                <Text
                                    fontSize={'3xl'}
                                    fontWeight={'extrabold'}
                                    textTransform={'lowercase'}
                                >
                                    Invoice .
                                </Text>
                                <div>
                                    <Stack direction={'column'}>
                                        <Text
                                            fontSize={'medium'}
                                            textTransform={'lowercase'}
                                        >
                                            Invoice No :
                                            <span className="font-bold uppercase px-2">
                                                # {invoiceId}
                                            </span>
                                        </Text>
                                        <Text
                                            fontSize={'medium'}
                                            textTransform={'lowercase'}
                                        >
                                            Date Preiod: {invoiceDate}
                                        </Text>
                                    </Stack>
                                </div>
                            </Flex>
                            <TableContainer>
                                <Table size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th className="w-4">#</Th>
                                            <Th>item Name</Th>
                                            <Th isNumeric>item price</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {orderItems.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{item.serviceId}</Td>
                                                <Td>{item.serviceName}</Td>
                                                <Td isNumeric>
                                                    {item.servicePrice}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot className="border-t-2 border-black">
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th isNumeric>
                                                <Text
                                                    className="py-4"
                                                    fontFamily={'monospace'}
                                                    fontSize={'3xl'}
                                                >
                                                    <span className="text-xl px-1">
                                                        ৳
                                                    </span>
                                                    {Number(
                                                        totalAmount,
                                                    ).toFixed(2)}
                                                </Text>
                                            </Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                            <Flex
                                justifyContent={'space-between'}
                                paddingBlock={'4'}
                            >
                                {/* sample table of payment data */}
                                <Box
                                    as="div"
                                    className="space-y-2"
                                    w={'fit-content'}
                                    paddingBlock={'2'}
                                    paddingInline={'2'}
                                    bgColor={'AppWorkspace'}
                                >
                                    <Text
                                        fontSize={'medium'}
                                        textTransform={'capitalize'}
                                        color={'blackAlpha.700'}
                                    >
                                        Payment Method :
                                    </Text>

                                    <TableContainer>
                                        <Table size="sm">
                                            <Thead>
                                                <Tr>
                                                    <Th className="w-4">#</Th>
                                                    <Th>method</Th>
                                                    <Th isNumeric>amount</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {paymentMethod.map(
                                                    (item, index) => (
                                                        <Tr key={index}>
                                                            <Td>{index}</Td>
                                                            <Td>{item.name}</Td>
                                                            <Td isNumeric>
                                                                {item.amount}
                                                            </Td>
                                                        </Tr>
                                                    ),
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                {/* due amount and total payment amount */}
                                {totalAmount - totalPayment > 0 ? (
                                    <Box
                                        as="div"
                                        className="space-y-2"
                                        w={'fit-content'}
                                        paddingBlock={'2'}
                                        paddingInline={'2'}
                                        bgColor={'AppWorkspace'}
                                    >
                                        <Text
                                            fontSize={'medium'}
                                            textTransform={'capitalize'}
                                            color={'blackAlpha.700'}
                                        >
                                            Payment Status :
                                        </Text>

                                        <TableContainer>
                                            <Table size="sm">
                                                <Tbody>
                                                    <Tr>
                                                        <Td>Total Payment</Td>
                                                        <Td isNumeric>
                                                            <Text
                                                                fontWeight={
                                                                    'bold'
                                                                }
                                                                color={
                                                                    'green.500'
                                                                }
                                                            >
                                                                {totalPayment}
                                                            </Text>
                                                        </Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>Due Amount</Td>
                                                        <Td isNumeric>
                                                            <Text
                                                                fontWeight={
                                                                    'bold'
                                                                }
                                                                color={
                                                                    'red.500'
                                                                }
                                                            >
                                                                {dueAmount}
                                                            </Text>
                                                        </Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                ) : (
                                    <Text
                                        fontWeight={'extrabold'}
                                        fontSize={'6xl'}
                                        color={'green.500'}
                                        textTransform={'uppercase'}
                                    >
                                        Paid
                                    </Text>
                                )}
                            </Flex>

                            <Divider
                                colorScheme="black"
                                orientation="horizontal"
                            />
                        </Box>
                    </Box>
                    <Box
                        bgColor={'blue.700'}
                        textColor={'white'}
                        paddingBlock={'1'}
                    >
                        <Center>
                            <Text
                                textTransform={'capitalize'}
                                fontSize={'medium'}
                            >
                                Thank you for your business
                            </Text>
                        </Center>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

//No invoice found
function NoInvoiceFound() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <Image
                    width="100"
                    height="100"
                    src="/ztrios.png"
                    alt="Ztrios"
                />
                <Text
                    fontSize={'4xl'}
                    fontWeight={'extrabold'}
                    textTransform={'lowercase'}
                >
                    Invoice not found
                </Text>
            </div>
        </div>
    )
}
