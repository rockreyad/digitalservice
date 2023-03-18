import Navbar from '@/components/navbar/Navbar'
import FooterAdmin from '@/components/footer/FooterAdmin'
import HomePage from '@/components/homepage'

export const metadata = {
    title: 'Landing Page of Digital Services',
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
