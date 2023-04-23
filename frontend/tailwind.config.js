/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                digitux: {
                    primary: '#3700B3',
                    text: '#0E0E2C',
                    grey: '#A0A4AB',
                    greySoft: '#B1B1B1',
                    dark: '#262A31',
                },
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
}
