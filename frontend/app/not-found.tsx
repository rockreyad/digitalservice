'use client'
import Link from 'next/link'

import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className='max-w-[1154px] w-full h-screen mx-auto text-4xl text-center flex flex-col justify-center'>
        <h1 className='text-8xl font-extrabold'>Not Found</h1>
        <h2 className='text-4xl font-bold mb-4'>
          This page doesn&apos;t exist, please return to home page
        </h2>
        <Link
          className='text-2xl font-light text-purple-500 underline underline-offset-4 hover:text-purple-800'
          href='/'>
          Home
        </Link>
      </motion.section>
    </>
  )
}