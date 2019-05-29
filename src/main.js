import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
import router from './router'
import store from './store'
import VueAnime from 'vue-animejs'

Vue.use(VueAnime)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
