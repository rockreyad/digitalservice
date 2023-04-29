import Image from 'next/image'

export default function Profile() {
    return (
        <>
            {' '}
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <Image
                                className="h-48 w-full object-cover md:w-48"
                                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Profile Image"
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                Admin
                            </div>
                            <a
                                href="#"
                                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                            >
                                Reyad Hasan
                            </a>
                            <p className="mt-2 text-gray-500">
                                admin@gmail.com
                            </p>
                            <p className="mt-2 text-gray-600">
                                I am a passionate software engineer with
                                expertise in developing scalable and robust
                                applications. I have extensive experience in
                                both front-end and back-end development,
                                including React, Node.js, and SQL. My goal is to
                                create innovative solutions that exceed client
                                expectations.
                            </p>
                            <div className="flex items-center mt-4 text-gray-600">
                                <svg
                                    className="h-6 w-6 fill-current mr-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M19.293 13.293l-6-6a.999.999 0 10-1.414 1.414L16.586 12H7a1 1 0 100 2h9.586l-4.707 4.707a.999.999 0 101.414 1.414l6-6a.999.999 0 000-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Joined on Mar 2023
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
