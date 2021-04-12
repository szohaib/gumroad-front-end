const path = require( 'path' );

module.exports = {

    // generate source maps
    devtool: 'source-map',

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/public/index.ts',

    // output bundles (location)
    output: {
        path: path.resolve('dist' ),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },



    // set watch mode to `true`
    watch: true
};