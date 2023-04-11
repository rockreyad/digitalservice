import InvoiceView from '@/components/invoiceTemplate'

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <div>
                <InvoiceView orderId={params.id} />
            </div>
        </>
    )
}
