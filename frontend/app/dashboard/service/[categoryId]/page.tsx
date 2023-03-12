import ServiceList from '@/components/services/ServiceList'
import { getServiceByCategory } from '@/utils/api/services'

interface pageProps {
    params: { categoryId: number }
}

export default async function CategoryService({ params }: pageProps) {
    const { categoryId } = params
    const data = await getServiceByCategory(categoryId)

    return (
        <>
            <ServiceList data={data} />
        </>
    )
}
