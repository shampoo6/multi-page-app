import Vue from 'vue'
import App from './app.vue'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(element)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
