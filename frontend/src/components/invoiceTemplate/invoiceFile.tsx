import { Button } from '@chakra-ui/react'

export default function InvoiceDownloadBtn({
    convert,
}: {
    convert: () => void
}) {
    return (
        <div>
            <Button colorScheme="primary" onClick={convert}>
                Download
            </Button>
        </div>
    )
}
