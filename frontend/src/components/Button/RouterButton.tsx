'use client'

import { useRouter } from 'next/navigation'

//primary Button type
type RouterButtonProps = {
    name: string
    link: string
}

export default function RouterButton({ name, link }: RouterButtonProps) {
    const router = useRouter()
    return (
        <button
            className="px-2 py-1 bg-black text-white hover:bg-white hover:text-black border border-black rounded"
            onClick={() => router.push(`/${link}`)}
        >
            {name}
        </button>
    )
}
