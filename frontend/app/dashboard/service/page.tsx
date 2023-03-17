import ServiceCategoryList from '@/components/services/ServiceCategoryList'

export const metadata = {
    title: 'Service List | Admin Dashboard',
}

const Service = () => {
    return (
        <div className="w-full px-4 space-y-5">
            <ServiceCategoryList />
        </div>
    )
}

export default Service
