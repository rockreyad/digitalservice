import Image from 'next/image'
import Link from 'next/link'

import { FiArrowRight, FiMessageSquare } from 'react-icons/fi'

import arrow from '@/assets/images/hero__arrow.png'
import heroBanner from '@/assets/images/hero__banner.png'

export default function Hero() {
    return (
        <section className='w-full pt-16 px-4'>
            <div className='w-full flex flex-col xl:flex-row items-center justify-between'>
                <div className='relative max-w-[523px] w-full'>
                    <Image
                        src={arrow}
                        quality={100}
                        alt={''}
                        className='hidden 2xl:block w-auto h-[432px] absolute top-4 -left-28'
                    />
                    <p className='font-bold xl:text-[22px]'>Hello,</p>
                    <h1 className='text-[40px] xl:text-[48px] font-bold mt-4 leading-[60px] xl:leading-[80px]'>
                        We Help People To Bring Their Ideas Alive
                    </h1>
                    <p className='text-lg xl:text-[22px] text-white/80 font-light leading-relaxed mt-8'>
                        A talented team to help you in your journey on creating usefull and
                        easy to use product
                    </p>

                    <div className='mt-6 flex flex-col xl:flex-row items-center gap-8'>
                        <a
                            href=''
                            className='w-full text-sm font-semibold py-4 bg-digitux-primary rounded flex-1 flex items-center justify-center gap-2 hover:filter hover:contrast-200 transition-color ease-in-out duration-300'>
                            Let&apos;s Talk
                            <FiMessageSquare size={24} />
                        </a>
                        <Link
                            href={'/services'}
                            className='flex items-center gap-2 hover:border-b-2 ease-in-out duration-75'>
                            Check our Services
                            <FiArrowRight className='' />
                        </Link>
                    </div>
                </div>

                <Image
                    src={heroBanner}
                    alt={''}
                    quality={100}
                    className='hidden xl:block'
                />
            </div>
        </section>
    )
}