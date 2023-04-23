import Navbar from '@/components/navbar/Navbar'
import HomePage from '@/components/homepage'
import Footer from '@/components/layout/LandingPageFooter'


export const metadata = {
    title: 'Digital Web Services',
    keywords: 'Digital Services, Digital Services in Bangladesh',
    authors: [{ name: 'Mahamud Hasan', portfolio: 'https://hasan.narc.dev' }],
    publisher: 'Ztrois Tech & Marketing',
}

export default function Home() {
    return (
        <div className='mainbody'>
            <Navbar />
            <HomePage />
            <Footer />
        </div>
    )
}
