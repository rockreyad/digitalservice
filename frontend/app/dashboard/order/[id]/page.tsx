'use client'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
    Badge,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'

import { BsThreeDots } from 'react-icons/bs'

export default function OrderView() {
    return (
        <>
            <div className="space-y-4">
                <header className="flex justify-between">
                    <div className="flex space-x-2">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold">
                                Order{' '}
                                <span className="font-light"> #17278</span>
                            </h1>
                            <p className="text-gray-500 text-sm">
                                2 May 2023 at 12:00 PM
                            </p>
                        </div>
                        <div>
                            <Badge
                                className=""
                                variant="subtle"
                                colorScheme="green"
                            >
                                paid
                            </Badge>
                        </div>
                    </div>

                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BsThreeDots />}
                        />
                        <MenuList>
                            <MenuItem icon={<AddIcon />}>Update Order</MenuItem>
                            <MenuItem icon={<ExternalLinkIcon />}>
                                Print
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </header>

                <main className="grid grid-flow-col grid-rows-2 grid-cols-1 md:grid-cols-3 md:grid-flow-row gap-2">
                    <div className="md:col-start-1 md:col-end-3 space-y-5">
                        <div className="bg-white p-4 rounded-md">
                            <div>
                                <h1 className="text-xl font-medium">
                                    Customer&apos;s cart
                                </h1>
                                <p>Sevice list</p>
                            </div>
                            <ul className="p-2">
                                <li className="list-disc">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </li>
                                <li className="list-disc">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </li>
                                <li className="list-disc">
                                    {' '}
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </li>
                                <li className="list-disc">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </li>
                                <li className="list-disc">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-md ">
                            <h1 className="text-xl font-medium">Summary</h1>

                            <div>
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>₦ 0.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Tax</p>
                                    <p>₦ 0.00</p>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p>₦ 0.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 h-fit">
                        <div className="">
                            <h1 className="text-xl font-medium">
                                Customer Information
                            </h1>

                            <div className="flex justify-between">
                                <p>Customer Name</p>
                                <p>John Doe</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Customer Email</p>
                                <p>
                                    <a href="mailto:" className="text-blue-500">
                                        akkak
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
