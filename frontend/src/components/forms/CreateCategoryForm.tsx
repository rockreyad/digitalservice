'use client'

import { createCategory } from '@/utils/api/services'
import { Textarea } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
export default function CreateCategoryForm() {
    const [categories, setCategories] = useState({
        name: String(''),
        description: String(''),
    })

    //mutate the inputfiled data
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setCategories({ ...categories, [e.target.name]: e.target.value })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading, isError, isSuccess } = useMutation(
        createCategory,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('categories')
            },
        },
    )

    //validation and send data to backend

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate(categories)
    }

    const router = useRouter()
    React.useEffect(() => {
        isSuccess ? router.push('/dashboard/service') : null
    }, [isSuccess, router])
    return (
        <>
            <div>
                {isLoading && <p>loading...</p>}
                {/* {isSuccess && <p>{data}</p>} */}
                {isError && <p>error</p>}
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                        {/* Title and Description field  */}
                        <div className="space-y-4">
                            <div className="">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="service-name"
                                >
                                    Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-transparent  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="service-name"
                                    type="text"
                                    onChange={handleChange}
                                    value={categories.name}
                                    name="name"
                                    placeholder="Website seo"
                                />
                                <p className="text-gray-600 text-xs italic">
                                    Make it shorter and as simpler as you&apos;d
                                    like
                                </p>
                            </div>
                            <div className="">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="service-description"
                                >
                                    Description
                                </label>
                                <Textarea
                                    onChange={handleChange}
                                    value={categories.description}
                                    id="service-description"
                                    name="description"
                                    _focus={{ backgroundColor: 'white' }}
                                    placeholder="Facebook ads are targeted to users based on their location, demographic, and profile information"
                                    size="sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="bg-black py-1 px-6 rounded text-white capitalize"
                        type="submit"
                    >
                        {isLoading ? 'loading...' : 'add'}
                    </button>
                </form>
            </div>
        </>
    )
}
