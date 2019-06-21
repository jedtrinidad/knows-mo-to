import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
import router from './router'
import store from './store'

import Default from './layouts/Default.vue'
import Hero from './layouts/Hero.vue'

Vue.component('default-layout', Default)
Vue.component('hero-layout', Hero)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.getters.isLoggedIn === false) {
      next({ name: 'login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')