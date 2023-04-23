import Link from 'next/link'

import { FiChevronRight } from 'react-icons/fi'

interface IServiceCardProps {
    title: string
    description: string
}

const ServiceCard = ({ description, title }: IServiceCardProps) => {
    return (
        <div className="w-[240px] mt-12 flex flex-col gap-[14px]">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-white/80">{description}</p>
            <Link
                href={'/services'}
                className="w-40 py-4 border-2 rounded flex items-center justify-center gap-2 hover:bg-white hover:text-black duration-300 ease-in-out"
            >
                Learn More
                <FiChevronRight size={24} />
            </Link>
        </div>
    )
}

export default ServiceCard
