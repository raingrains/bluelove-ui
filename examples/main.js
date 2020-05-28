import Vue from 'vue'
import App from './App.vue'
import BlueLoveUI from '../packages'
Vue.config.productionTip = false

Vue.use(BlueLoveUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
