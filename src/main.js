import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/utils/vant-ui'
import '../src/style/common.less'
import '@/mock/mockASearve'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
