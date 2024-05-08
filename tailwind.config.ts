import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
				'primary': '#82C09A',
                'primary-light': '#A0CFB2',
                'primary-dark': '#6AB486',
                'primary-darker': '#52A371',
				'secondary': '#285943',
                'secondary-light': '#397F5F',
                'secondary-dark': '#204635',
                'secondary-darker': '#132A20',
				'tertiary': '#705D56',
                'tertiary-dark': '#5C4D47',
                'tertiary-darker': '#453A35',
                'success': '#28A745',
                'danger': '#DC3545',
                'warning': '#FFC107',
                'info': '#17A2B8',
				'light': '#F7EDF0',
				'dark': '#32292F',
			}
        },
    },
    plugins: [],
};
export default config;
