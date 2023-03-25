import Navbar from '@/components/navbar/Navbar'
import FooterAdmin from '@/components/footer/FooterAdmin'
import HomePage from '@/components/homepage'

export const metadata = {
    title: 'Landing Page of Digital Services',
    keywords: 'Digital Services, Digital Services in Bangladesh',
    authors: [{ name: 'Mahamud Hasan', portfolio: 'https://hasan.narc.dev' }],
    publisher: 'Ztrois Tech & Marketing',
}

export default function Home() {
    return (
        <>
            <div>
                {/* Top Header */}
                <Navbar />

                <HomePage />
                {/* Footer */}
                <FooterAdmin />
            </div>
        </>
    )
}
