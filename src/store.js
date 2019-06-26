import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    isLoading: false,
    user: localStorage.getItem('user') || '',
    token: localStorage.getItem('jwt') || '',
    difficulties: ['easy', 'medium', 'hard']
  },
  mutations: {
    setCategories: (state, categories) => {
      state.categories = categories
    },
    setTokenAndUser: (state, payload) => {
      state.token = payload.auth_token
      state.user = JSON.stringify(payload.user)
      localStorage.setItem('jwt', state.token)
      localStorage.setItem('user', state.user)
    },
    setUser: (state, payload) => {
      state.user = JSON.stringify(payload)
      localStorage.setItem('user', state.user)
    }
  },
  actions: {
    async getCategories(context) {
      try {
        if(context.state.categories.length === 0) {
          let response = await fetch("https://opentdb.com/api_category.php")
          let data = await response.json()
          context.commit('setCategories', data.trivia_categories)
        }
      } catch (error) {
        alert(error)
      }
    },
    async login(context, params) {
      try {
        let response = await fetch("https://kmt-backend.herokuapp.com/api/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
        })
        let data = await response.json()
        context.commit('setTokenAndUser', data)
      }
      catch (error) {
        alert(error)
      }
    },
    async getUserWithGames(context) {
      let cu = context.getters.currentUser
      try {
        let response = await fetch(`https://kmt-backend.herokuapp.com/api/users/${cu.id}/games`, {
          headers: {
            "Authorization": `Bearer ${context.state.token}`
          }
        })
        let data = await response.json()
        context.commit('setUser', data)
      }
      catch (error) {
        alert(error)
      }
    },
    logout() {
      localStorage.clear()
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => JSON.parse(state.user),
    categories: state => state.categories,
    categoryById: state => id => state.categories.find(cat => cat.id === id)
  }
})
