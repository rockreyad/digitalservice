'use client'

import React from 'react'
import { baseTheme, ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'

//Call the extendedTheme and pass the custom colors object
const theme = extendTheme({
    colors: {
        brand: {
            100: '#3700B3',
        },
        primary: baseTheme.colors.purple,
        secondary: baseTheme.colors.telegram,
    },
})

export default function ChakraWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    //Return the ChakraProvider with the theme prop
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
