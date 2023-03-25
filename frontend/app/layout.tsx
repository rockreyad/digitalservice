import React from 'react'
import './globals.css'
import { Montserrat } from 'next/font/google'

import ChakraWrapper from '@/components/wrappers/chakra'
import QueryClientWrapper from '@/components/wrappers/QueryClientWrapper'
import ContextWrapper from '@/contexts'

const montserrat = Montserrat({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
})

export const metadata = {
    title: {
        default: 'Project D',
        template: '%s | Project D',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${montserrat.className}`}>
                <ContextWrapper>
                    <ChakraWrapper>
                        <QueryClientWrapper>{children}</QueryClientWrapper>
                    </ChakraWrapper>
                </ContextWrapper>
            </body>
        </html>
    )
}
