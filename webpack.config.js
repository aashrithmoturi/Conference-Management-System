const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // __dirname is the current directory and dist is the destination directory
        //here we need absolute path not relative as the one mentioned above
        filename: 'bundle.js'
    },
    watch: true
}

// once this is completed go to package.json and add
//  "build": "webpack" into the scripts tag