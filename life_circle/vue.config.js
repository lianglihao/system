module.exports = {
    pwa:{
        iconPaths:{
            favicon32: 'draw.png',
            favicon16: 'draw.png',
            appleTouchIcon: 'draw.png',
            maskIcon: 'draw.png',
            msTileImage: 'draw.png'
        }
    },
    devServer: {
        // open: true,
        //配置跨域
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api',
                // target: 'http://139.199.206.151:5000/api',
                ws: true,
                changeOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': ''
                    //请求时使用api就可以
                }
            }
        }
    }
}