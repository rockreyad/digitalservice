'use client'
import React, { useEffect } from 'react'
import { createUser } from '@/utils/api/user'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    Stack,
    Text,
    chakra,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/navigation'

export const metadata = {
    title: 'Registration on Digital Web Service',
}

export default function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
    })

    const queryClient = useQueryClient()
    const router = useRouter()
    const { mutate, isSuccess, isError, data } = useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        },
    })

    //mutate the inputfiled data
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //validation and send data to backend
    const handleSubmit = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault()
        if (user.password !== user.repeatPassword) {
            //TODO: send a toast message
            return alert('Password does not match')
        }
        mutate(user)
    }

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('token', JSON.stringify(data?.data?.token))
            router.push('/login')
        }
    }, [isSuccess, router, data])

    return (
        <>
            <Box
                bg="#edf3f8"
                _dark={{
                    bg: '#111',
                }}
                p={10}
            >
                <Box mt={[10, 0]}>
                    <SimpleGrid
                        display={{
                            base: 'initial',
                            md: 'grid',
                        }}
                        columns={{
                            md: 3,
                        }}
                        spacing={{
                            md: 6,
                        }}
                    >
                        <GridItem
                            colSpan={{
                                md: 1,
                            }}
                        >
                            <Box px={[4, 0]}>
                                <Heading
                                    fontSize="lg"
                                    fontWeight="medium"
                                    lineHeight="6"
                                >
                                    Personal Information
                                </Heading>
                                <Text
                                    mt={1}
                                    fontSize="sm"
                                    color="gray.600"
                                    _dark={{
                                        color: 'gray.400',
                                    }}
                                >
                                    Please be carefully fill the form
                                </Text>
                            </Box>
                        </GridItem>
                        <GridItem
                            mt={[5, null, 0]}
                            colSpan={{
                                md: 2,
                            }}
                        >
                            <chakra.form
                                method="POST"
                                shadow="base"
                                onSubmit={handleSubmit}
                                rounded={[null, 'md']}
                                overflow={{
                                    sm: 'hidden',
                                }}
                            >
                                <Stack
                                    px={4}
                                    py={5}
                                    p={[null, 6]}
                                    bg="white"
                                    _dark={{
                                        bg: '#141517',
                                    }}
                                    spacing={6}
                                >
                                    {isError ? (
                                        <Text fontSize="sm" color="gray.500">
                                            &quot;Something went wrong&quot;
                                        </Text>
                                    ) : null}

                                    <SimpleGrid columns={6} spacing={6}>
                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 3]}
                                        >
                                            <FormLabel
                                                htmlFor="first_name"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                First name
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                id="first_name"
                                                autoComplete="given-name"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                onChange={handleChange}
                                                value={user.firstName}
                                            />
                                        </FormControl>

                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 3]}
                                        >
                                            <FormLabel
                                                htmlFor="last_name"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                Last name
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                id="last_name"
                                                autoComplete="family-name"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                value={user.lastName}
                                                onChange={handleChange}
                                            />
                                        </FormControl>

                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 4]}
                                        >
                                            <FormLabel
                                                htmlFor="email_address"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                Email address
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email_address"
                                                autoComplete="email"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                value={user.email}
                                                onChange={handleChange}
                                            />
                                        </FormControl>

                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 4]}
                                        >
                                            <FormLabel
                                                htmlFor="phone"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                Phone
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                autoComplete="phone"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                value={user.phone}
                                                onChange={handleChange}
                                            />
                                        </FormControl>

                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 4]}
                                        >
                                            <FormLabel
                                                htmlFor="email_address"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                Password
                                            </FormLabel>
                                            <Input
                                                type="text/password"
                                                name="password"
                                                id="password"
                                                autoComplete="password"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                value={user.password}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl
                                            as={GridItem}
                                            colSpan={[6, 4]}
                                        >
                                            <FormLabel
                                                htmlFor="repeat_password"
                                                fontSize="sm"
                                                fontWeight="md"
                                                color="gray.700"
                                                _dark={{
                                                    color: 'gray.50',
                                                }}
                                            >
                                                Password
                                            </FormLabel>
                                            <Input
                                                type="text/password"
                                                name="repeatPassword"
                                                id="repeatPassword"
                                                autoComplete="password"
                                                mt={1}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                                required
                                                value={user.repeatPassword}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                    </SimpleGrid>
                                </Stack>
                                <Box
                                    px={{
                                        base: 4,
                                        sm: 6,
                                    }}
                                    py={3}
                                    bg="gray.50"
                                    _dark={{
                                        bg: '#121212',
                                    }}
                                    textAlign="right"
                                >
                                    <Button
                                        className="bg-green-400"
                                        type="submit"
                                        colorScheme="green.100"
                                        _focus={{
                                            shadow: '',
                                        }}
                                        fontWeight="md"
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </chakra.form>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
            ;
        </>
    )
}
