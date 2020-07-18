import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 解决手机端100-300ms的延迟问题
import fastclick from 'fastclick'
import './assets/css/base.scss'
// 导入使用懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
