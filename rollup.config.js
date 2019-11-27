import babel from 'rollup-plugin-babel';

var pkg = require('./package.json');

export default {
    input: pkg.module,
    output: {
        name: 'webCharts',
        file: pkg.main,
        format: 'umd',
        globals: {
            d3: 'd3'
        },
    },
    external: (function() {
        const dependencies = pkg.dependencies;

        return Object.keys(dependencies);
    }()),
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ '@babel/preset-env' ]
            ],
            //plugins: [
            //    '@babel/plugin-external-helpers'
            //],
            babelrc: false
        })
    ]
};
