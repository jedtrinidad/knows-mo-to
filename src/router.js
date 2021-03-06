import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        layout: 'default'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        layout: 'hero',
        hideMenu: true
      }
    },
    {
      path: '/register',
      name: 'registration',
      component: () => import('./views/Register.vue'),
      meta: {
        layout: 'hero',
        hideMenu: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
      meta: {
        requiresAuth: true,
        layout: 'default'
      }
    },
    {
      path: '/game/:categoryId',
      name: 'game',
      component: () => import(/* webPackChunkName: "game" */ './views/Game.vue'),
      meta: {
        requiresAuth: true,
        layout: 'hero',
        hideMenu: true
      }
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('./views/ResultScreen.vue'),
      meta: {
        requiresAuth: true,
        layout: 'hero',
        hideMenu: true
      }
    }
  ]
})
