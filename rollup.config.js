import babel from 'rollup-plugin-babel';

var pkg = require('./package.json');

module.exports = {
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
        var dependencies = pkg.dependencies;

        return Object.keys(dependencies);
    }()),
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ 'env', {modules: false} ]
            ],
            plugins: [
                'external-helpers'
            ],
            babelrc: false
        })
    ]
};
