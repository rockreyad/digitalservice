import Link from 'next/link'
import {
    FiDribbble,
    FiFacebook,
    FiInstagram,
    FiSend,
    FiTwitter
} from 'react-icons/fi'

export default function Footer() {
    const socialLinks = [
        { id: 1, icon: <FiFacebook size={28} />, linkLabel: 'fb.com/DigitalUX' },
        { id: 2, icon: <FiInstagram size={28} />, linkLabel: '@DigitalUX' },
        { id: 3, icon: <FiTwitter size={28} />, linkLabel: '@DigitalUX' },
        {
            id: 4,
            icon: <FiDribbble size={28} />,
            linkLabel: 'Dribbble.com/DigitalUx'
        }
    ]
    const navLinks = [
        { id: 1, linkUrl: '/about', linkLabel: 'About Us' },
        { id: 2, linkUrl: '', linkLabel: 'Study Case' },
        { id: 3, linkUrl: '', linkLabel: 'Blogs' },
        { id: 4, linkUrl: '', linkLabel: 'Portfolio' },
        { id: 5, linkUrl: '', linkLabel: 'Careers' }
    ]

    return (
        <footer className='max-w-[1440px] w-full mx-auto mt-40 mb-5 px-4 py-2 flex flex-col sm:flex-row items-center sm:items-start justify-between'>
            <div className='flex lg:gap-16 xl:gap-32'>
                <div className='max-w-[250px]'>
                    <h1 className='text-[32px] font-semibold'>DigitUX</h1>
                    <p className='mt-5 text-sm'>
                        DigitUx is a Digital agency that create User centred Product that
                        help her client to evolve
                    </p>
                </div>

                <div className='hidden lg:block'>
                    <h1 className='text-lg font-semibold'>About Us</h1>
                    <ul className='mt-6 flex flex-col gap-4'>
                        {navLinks.map(({ id, linkUrl, linkLabel }) => (
                            <li key={id}>
                                <Link
                                    href={linkUrl}
                                    className='hover:font-semibold hover:border-b-2 ease-in-out duration-150'>
                                    {linkLabel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='flex lg:gap-16 xl:gap-32'>
                <div className='hidden lg:block'>
                    <h1 className='text-lg font-semibold'>Follow Us</h1>
                    <ul className='mt-6 flex flex-col gap-4'>
                        {socialLinks.map(({ id, icon, linkLabel }) => (
                            <li key={id} className='flex items-center gap-2'>
                                {icon}
                                {linkLabel}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='max-w-[250px] mt-12 sm:mt-0'>
                    <h1 className='text-lg font-semibold'>Get In touch with Us</h1>
                    <p className='mt-4 text-sm'>
                        Need Answers? Need help ? Just email us
                    </p>
                    <label className='relative'>
                        <input
                            type='email'
                            placeholder='Your email'
                            className='w-full mt-8 py-2 px-5 text-black rounded border border-[#767676]'
                        />
                        <FiSend className='absolute top-1 right-1 text-digitux-primary' />
                    </label>
                </div>
            </div>
        </footer>
    )
}
