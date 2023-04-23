import ServiceCard from '@/components/cards/ServiceCard'
import data from '@/utils/data/dataMockup.json'

export default function ServicesWeOffer() {
    return (
        <section className="w-full mt-32 px-4">
            <h2 className="xl:text-[22px] font-semibold leading-relaxed">
                The Services we offer
            </h2>
            <div className="flex flex-wrap sm:items-center sm:justify-center xl:grid grid-cols-4 grid-rows-2 gap-10">
                <h1 className="mt-4 text-[22px] xl:text-[40px] font-bold leading-9 xl:leading-normal col-span-2">
                    We offer a variaty of services to help you to grow and build
                    your brand and help you with developing your Products
                </h1>
                {data.services.map((props) => (
                    <ServiceCard key={props.id} {...props} />
                ))}
            </div>
        </section>
    )
}
