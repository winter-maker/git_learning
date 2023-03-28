import {terser} from 'rollup-plugin-terser';
export default {
    input: './index.js',
    plugins: [terser()],
    output: [{
        file: './dist/es.min.js',
        format: 'es'
    }]
}