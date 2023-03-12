'use client'
import CreateCategoryForm from '@/components/forms/CreateCategoryForm'
import { useAuth } from '@/contexts/auth-context'
import React from 'react'

export default function CreateCategoryPage() {
    const { user } = useAuth()

    React.useEffect(() => {
        if (user?.role !== 'admin') window.location.replace('/dashboard')
    }, [user?.role])
    return (
        <>
            <div>
                <div className="w-full px-4 space-y-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">Create</h1>
                            <p>A new Category will hold related services</p>
                        </div>
                    </div>
                    <CreateCategoryForm />
                </div>
            </div>
        </>
    )
}
