import styles from './loading.module.css'

export default function Loading({
    width = 240,
    height = 240,
}: {
    width: number
    height: number
}) {
    return (
        <>
            <svg
                className={styles.pl}
                width={width}
                height={height}
                viewBox={`0 0 240 240`}
            >
                <circle
                    className={`${styles.pl__ring} ${styles.pl__ring__a}`}
                    cx="120"
                    cy="120"
                    r="105"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 660"
                    stroke-dashoffset="-330"
                    stroke-linecap="round"
                ></circle>
                <circle
                    className={`${styles.pl__ring} ${styles.pl__ring__b}`}
                    cx="120"
                    cy="120"
                    r="35"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 220"
                    stroke-dashoffset="-110"
                    stroke-linecap="round"
                ></circle>
                <circle
                    className={`${styles.pl__ring} ${styles.pl__ring__c}`}
                    cx="85"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                ></circle>
                <circle
                    className={`${styles.pl__ring} ${styles.pl__ring__d}`}
                    cx="155"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                ></circle>
            </svg>
        </>
    )
}
