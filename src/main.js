import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import '@/style/index.scss'
import './plugins/element.js'
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(animated)
Vue.config.productionTip = false
/**测试分支使用 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
