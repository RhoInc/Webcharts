import babel from 'rollup-plugin-babel';

module.exports = {
  moduleName: 'webcharts',
  entry: './src/index.js',
  format: 'iife',
  globals: {
    d3: 'd3'
  },
  plugins: [
    babel(
      {
        "presets": [
          [
            "es2015",
            {
              "modules": false
            }
          ]
        ],
        "plugins": [
          "external-helpers"
        ],
        "exclude": "node_modules/**"
      })
  ]
}; 
