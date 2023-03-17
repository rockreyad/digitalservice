'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

//primary Button type
type RouterButtonProps = {
    name: string
    link: string
}

export default function RouterButton({ name, link }: RouterButtonProps) {
    const router = useRouter()
    return (
        <Button
            bgColor={'primary.500'}
            color={'white'}
            onClick={() => router.push(`/${link}`)}
        >
            {name}
        </Button>
    )
}
