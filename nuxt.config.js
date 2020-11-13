export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Demo Project',
    // 页面默认meta设置
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Demo Project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "/js/lodash/1.8.3/lodash.min.js"
      }
    ]
  },
  loading: {
    color: "blue",
    height: "5px"
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  // 定义应用的全局样式文件、模块或第三方库
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  // 配置需要在 根vue.js应用 实例化之前运行的 Javascript 插件。
  // ssr设置为false 只在客户端使用
  plugins: [
    // '@/plugins/antd-ui'
    {
      src: "@/plugins/antd-ui",
      ssr: false
    },
    {
      src: "@/plugins/axios",
      ssr: true
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    retry: { retries: 3 },
    // 开发模式下开启debug
    debug: process.env._ENV !== "production",
    // 设置不同环境的请求地址
    baseURL: process.env._ENV === "production" ? '' : '',
    withCredentials: true
  },
  proxy: {
    //开启代理
    "/api/": {
      target: "http://192.168.1.2:10086/v1",
      pathRewrite: { "^/api/": "" }
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  //   Nuxt.js 允许你在自动生成的 vendor.bundle.js 文件中添加一些模块，以减少应用 bundle 的体积。
  //   如果你的应用依赖第三方模块，这个配置项是十分实用的。
  //   【webpack的相关配置可以在这配置】

  //   1、vendor配置 ： 添加模块，配置只打包一次，减少应用bundle的体积。
  //   比如，对于axios这种ajax请求插件，基本每个页面都使用import引入，会导致打包时打包多次，
  //   这时需要配置，实现只打包一次。
  build: {
  }
}
