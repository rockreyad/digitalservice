'use client'
import { motion } from 'framer-motion'
import Hero from '../page/Home/Hero'
import Clients from '../page/Home/Clients'
import ServicesWeOffer from '../page/Home/ServicesWeOffer'

export default function HomePage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="max-w-[1440px] w-full mx-auto"
        >
            <Hero />
            <Clients />
            <ServicesWeOffer />
        </motion.main>
    )
}
