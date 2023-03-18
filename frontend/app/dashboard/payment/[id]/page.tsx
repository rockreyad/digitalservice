import PaymentForm from '@/components/forms/PaymentForm'

export const metadata = {
    title: 'Payment Page | Dashboard',
}

export default function PaymentPage({ params }: { params: { id: string } }) {
    return (
        <>
            Payment Page of {params.id}
            <PaymentForm />
        </>
    )
}
