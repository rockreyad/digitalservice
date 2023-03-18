'use client'
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'

export default function HeroSection() {
    return (
        <>
            <Container maxW={'full'} className="space-y-10 mt-10 h-screen">
                <Box>
                    <Text
                        textTransform={'capitalize'}
                        className="flex flex-col"
                        fontSize={'5xl'}
                        as="b"
                    >
                        Boost your Profits By Growing
                        <Flex justify={'space-between'} align="center">
                            <span> your Business</span>
                            <Text
                                className="flex flex-col"
                                fontSize={'xx-small'}
                            >
                                Boost your profits by growing your business
                                generate more sales
                                <span>or improving your digital strategy</span>
                            </Text>
                        </Flex>
                    </Text>
                </Box>

                <Flex>
                    <Box className="space-y-10">
                        <WrapItem gap={'5'}>
                            <Button
                                bgColor="black"
                                textColor={'white'}
                                variant={'solid'}
                            >
                                Get in touch
                            </Button>
                            <Button
                                colorScheme={'blackAlpha'}
                                variant={'outline'}
                            >
                                About us
                            </Button>
                        </WrapItem>

                        <Wrap>
                            <VStack>
                                <div className="space-y-10">
                                    <Text as="b">
                                        A Comprehensive Directory
                                    </Text>

                                    <HStack>
                                        <div className="flex flex-col">
                                            <Text as="b">8+</Text>
                                            <Text>years of experience</Text>
                                        </div>
                                        <div className="flex flex-col">
                                            <Text as="b">100+</Text>
                                            <Text>Places in the world</Text>
                                        </div>
                                        <div className="flex flex-col">
                                            <Text as="b">50k</Text>
                                            <Text>Happy People</Text>
                                        </div>
                                    </HStack>
                                </div>
                            </VStack>
                        </Wrap>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}
