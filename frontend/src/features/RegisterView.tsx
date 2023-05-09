'use client'
import React, { useEffect } from 'react'
import { createUser, UserLoginError } from '@/utils/api/user'
import {
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    Text,
    chakra,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AuthResponse, AuthUserInfo } from 'types/user'
import Link from 'next/link'
import { FaUserAlt, FaLock, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
const CMdEmail = chakra(MdEmail)
const CFaPhoneAlt = chakra(FaPhoneAlt)

interface PasswordVisibility {
    [key: string]: boolean
}

export default function RegisterView() {
    const toast = useToast()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
    })
    const [showPassword, setShowPassword] = useState<PasswordVisibility>({
        password: false,
        repeatPassword: false,
    })

    const handleShowClick = (buttonName: string) => {
        setShowPassword((prevShowPassword) => ({
            ...prevShowPassword,
            [buttonName]: !prevShowPassword[buttonName], // toggle the value
        }))
    }

    const queryClient = useQueryClient()
    const router = useRouter()
    const { isAuthenticated, setCurrentUser } = useAuth()
    const { mutate, isSuccess, isLoading, isError, error, data } = useMutation(
        createUser,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user')
            },
        },
    )
    const RegistrationError = (error as UserLoginError)?.message
        ? (error as UserLoginError).message
        : 'Something went wrong'

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
            return toast({
                title: `Password does not match`,
                status: 'error',
                isClosable: false,
                duration: 1300,
            })
        }
        mutate(user)
    }

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard')
        }
        if (isSuccess) {
            const userdata = data as AuthResponse
            setCurrentUser(userdata?.data as AuthUserInfo)
        }
    }, [isSuccess, router, data, isAuthenticated, setCurrentUser])

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            bgGradient={'linear(to-r, primary.500, primary.300)'}
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Heading
                    fontSize={['4xl', '4xl', '5xl']}
                    textTransform={'uppercase'}
                    color="white"
                >
                    user Registration
                </Heading>
                <Box py={'10'} minW={{ base: '90%', md: '468px' }}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            {isError ? (
                                <FormControl>
                                    <Box
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        <Text textColor={'red.400'}>
                                            {RegistrationError}
                                        </Text>
                                    </Box>
                                </FormControl>
                            ) : null}
                            {isSuccess ? (
                                <FormControl>
                                    <Box
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                    >
                                        <Text textColor={'green.500'}>
                                            {data?.message}
                                        </Text>
                                    </Box>
                                </FormControl>
                            ) : null}

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <CFaUserAlt color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="first_name"
                                        placeholder="First Name"
                                        autoComplete="firstName"
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
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CFaUserAlt color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="last_name"
                                        placeholder="Last Name"
                                        autoComplete="lastName"
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
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CMdEmail color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email_address"
                                        placeholder="Email Address"
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
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CFaPhoneAlt color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Phone Number"
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
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CFaLock color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type={
                                            showPassword.password
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="password"
                                        id="password"
                                        placeholder="Password"
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
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                handleShowClick('password')
                                            }
                                        >
                                            {showPassword.password
                                                ? 'Hide'
                                                : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                    >
                                        <CFaLock color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type={
                                            showPassword.repeatPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="repeatPassword"
                                        id="repeatPassword"
                                        placeholder="Repeat Password"
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
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                handleShowClick(
                                                    'repeatPassword',
                                                )
                                            }
                                        >
                                            {showPassword.repeatPassword
                                                ? 'Hide'
                                                : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="primary"
                                width="full"
                            >
                                {isLoading ? 'Loading...' : 'Register'}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box display="flex" gap={5}>
                Already have an account?
                <Link color="white" href="/login">
                    Login
                </Link>
            </Box>
        </Flex>
    )
}
