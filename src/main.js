import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 解决手机端100-300ms的延迟问题
import fastclick from 'fastclick'
import './assets/css/base.scss'
// 导入使用懒加载插件（记得还有v-lazy=''）
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // require也是一种导入资源的方法 详细解读：http://www.ruanyifeng.com/blog/2015/05/require.html?utm_medium=referral&utm_source=tuicool
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
