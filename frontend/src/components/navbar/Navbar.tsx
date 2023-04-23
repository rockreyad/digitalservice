'use client'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HiMenuAlt1, HiOutlineX } from 'react-icons/hi'


export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    const handleOpenNavMenu = () => {
        setIsNavOpen(prev => !prev)
    }

    const menuOptions = [
        { id: 1, label: 'Home', navUrl: '/' },
        { id: 2, label: 'Who are We ?', navUrl: 'https://ztrios.com/' },
        { id: 3, label: 'Our Services', navUrl: '/services' },
        { id: 4, label: 'Our Projects', navUrl: '/projects' },
        { id: 5, label: 'Contact', navUrl: '/contact' }
    ]

    const pathname = usePathname();

    return (
        <header className='fixed z-10 w-full mx-auto py-2 px-4 lg:px-16 bg-digitux-dark/70 backdrop-blur-[80px] flex items-center justify-between lg:justify-around'>
            <h1 className='text-2xl font-semibold'>DigitUX</h1>

            {isNavOpen ? (
                <HiOutlineX
                    onClick={handleOpenNavMenu}
                    size={32}
                    className='lg:hidden z-10 cursor-pointer'
                />
            ) : (
                <HiMenuAlt1
                    onClick={handleOpenNavMenu}
                    size={32}
                    className='lg:hidden z-10 cursor-pointer rotate-180'
                />
            )}

            {/* Mobile */}
            <nav
                className={
                    isNavOpen
                        ? 'fixed top-0 right-0 w-4/5 h-screen text-center pt-28 bg-digitux-dark/95 backdrop-blur-[80px] ease-in-out duration-300 overflow-auto'
                        : 'fixed top-0 -right-full w-4/5 h-screen text-center pt-28 bg-digitux-dark/95 backdrop-blur-[80px] ease-in-out duration-300 overflow-auto'
                }>
                <ul>
                    {menuOptions.map(({ id, label, navUrl }) => (
                        <li key={id} className='pb-8'>
                            <Link href={navUrl} onClick={handleOpenNavMenu}>
                                <span
                                    className={
                                        pathname === navUrl
                                            ? 'text-white font-bold border-b-2'
                                            : 'text-white/60 hover:text-white hover:border-b-2'
                                    }>
                                    {label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Desktop */}
            <nav className='hidden lg:flex lg:items-center lg:space-x-10'>
                <ul className='flex gap-6'>
                    {menuOptions.map(({ id, label, navUrl }) => (
                        <li key={id}>
                            <Link href={navUrl}>
                                <span
                                    className={
                                        pathname === navUrl
                                            ? 'text-white font-bold border-b-2'
                                            : 'text-white/60 hover:text-white hover:border-b-2'
                                    }>
                                    {label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {!isAuthenticated ?
                    <Link prefetch href='/login'>
                        <button className="rounded px-4 py-2 text-xs capitalize border-2 border-white/60 text-white/60 hover:bg-digitux-primary hover:text-white duration-300">log in</button> </Link> :
                    <Link prefetch href='/dashboard'>
                        <button className="rounded px-4 py-2 text-xs capitalize border-2 border-white/60 text-white/60 hover:bg-digitux-primary hover:text-white duration-300">Dashboard</button> </Link>}
            </nav>
        </header>
    )
}