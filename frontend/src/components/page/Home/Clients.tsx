import Image from 'next/image'

import logoMs from '@/assets/images/logo-microsoft-4096.png'
import logoGg from '@/assets/images/logo-google-4096.png'
import logoSp from '@/assets/images/logo-spotify-4096.png'
import logoTl from '@/assets/images/logo-tesla-1024.png'
import logoYh from '@/assets/images/logo-yahoo-4096.png'
import logoCa from '@/assets/images/logo-codecademy-4096.png'
import logoGp from '@/assets/images/logo-gympass-4096.png'
import logoSr from '@/assets/images/logo-spiral-4096.png'

export default function Clients() {
    return (
        <section className="w-full mt-32 px-4">
            <h1 className="text-2xl font-bold">Client we helped</h1>
            <div className="mt-7 xl:mt-12 overflow-x-auto scrollbar-hide flex items-center xl:justify-evenly gap-12">
                <Image
                    src={logoMs}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoGg}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoSp}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoTl}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoYh}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoCa}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoGp}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
                <Image
                    src={logoSr}
                    alt={''}
                    className="w-32 h-full object-cover"
                />
            </div>
        </section>
    )
}
