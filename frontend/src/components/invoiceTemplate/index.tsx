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

export default function InvoiceView() {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <InvoiceDownloadBtn convert={convertHTMLToPDF} />
            </div>
            <InvoiceTemplate />
        </div>
    )
}

function InvoiceTemplate() {
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
                                    {customerInformation.name}
                                </Text>
                                <Text>{customerInformation.address}</Text>
                                <Text>{customerInformation.contact}</Text>
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
                                                # INV202304021
                                            </span>
                                        </Text>
                                        <Text
                                            fontSize={'medium'}
                                            textTransform={'lowercase'}
                                        >
                                            Date Preiod: 12/12/2023
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
                                        <Tr>
                                            <Td>1</Td>
                                            <Td>millimetres (mm)</Td>
                                            <Td isNumeric>25.4</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>2</Td>
                                            <Td>centimetres (cm)</Td>
                                            <Td isNumeric>30.48</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>3</Td>
                                            <Td>metres (m)</Td>
                                            <Td isNumeric>0.91444</Td>
                                        </Tr>
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
                                                    13,400.00
                                                </Text>
                                            </Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
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
