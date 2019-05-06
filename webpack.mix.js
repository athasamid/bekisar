require('dotenv').config()
let mix = require('laravel-mix')
let path = require('path')

//== Path Alias
mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            'sass': path.resolve(__dirname, 'resources/sass'),
            'core-ui-scss': path.resolve(__dirname, 'node_modules/@coreui/vue/Vue_Full_Project/src/assets/scss'),
            'core-ui-components': path.resolve(__dirname, 'node_modules/@coreui/vue/Vue_Full_Project/src/components'),
        }
    }
})

//== JavaScript
mix.js('resources/js/main.js', 'public/js')

//== Sass
mix.sass('resources/sass/style.scss', 'public/css')


//== SourceMaps (development only)
if (!mix.inProduction()) {
    mix.sourceMaps()
}

//== Versioning (production only)
if (mix.inProduction()) {
    mix.version()
}

