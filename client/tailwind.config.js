const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(({addComponents, addUtilities}) => {
            addComponents({
                '.btn-primary': {
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '6px'
                }
            })
            addUtilities({
                '.text-l': {
                    fontSize: '15px'
                },
                '.grid-primary': {
                    gridTemplateColumns: '18rem 1fr'
                },
                '.grid-menubar-item': {
                    gridTemplateColumns: '30px 1fr'
                },
                '.bg-white-transparent': {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                },
                '.min-h-300': {
                    minHeight: '300px'
                }
            })
        })
    ],
}
