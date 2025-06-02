module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',        // アプリ本体
        './src/components/**/*.{js,ts,jsx,tsx}', // コンポーネント
        './src/**/*.{html,css}',                 // グローバル CSS
        './src/**/*.{module.css}'                // CSS Modules 全般
    ],
    theme: { extend: {} },
    plugins: [],
}
