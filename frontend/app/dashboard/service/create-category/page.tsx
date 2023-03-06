import CreateCategoryForm from '@/components/forms/CreateCategoryForm'

export default function CreateCategoryPage() {
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
