module.exports = {
    entry: "./client/app/es6/main.es6",
    output: {
        path: __dirname,
        filename: "./client/app/js/bundle.js"
    },
    module: {
            loaders: [
                {
                    test: /\.es6$/,
                    loader: 'babel-loader'
                }, {
                    test: /\.scss$/,
                    loaders: [ "style", "css", "sass"]
                }
            ]
        }
};