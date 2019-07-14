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
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories
    },
    SET_TOKEN_AND_USER: (state, payload) => {
      state.token = payload.auth_token
      state.user = JSON.stringify(payload.user)
      localStorage.setItem('jwt', state.token)
      localStorage.setItem('user', state.user)
    },
    SET_USER: (state, payload) => {
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
          context.commit('SET_CATEGORIES', data.trivia_categories)
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
        context.commit('SET_TOKEN_AND_USER', data)
      }
      catch (error) {
        alert(error)
        context.commit('SET_TOKEN_AND_USER', {})
      }
    },
    logout() {
      localStorage.clear()
    },
    async registerUser(context, userBody) {
      try {
        let response = await fetch("https://kmt-backend.herokuapp.com/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(userBody)
        })

        let data = await response.json()

        context.commit('SET_USER',data)
      }
      catch (error) {
        alert(error)
      }
    },
    async getUserWithGames(context) {
      let cu = JSON.parse(context.state.user)
      try {
        let response = await fetch(`https://kmt-backend.herokuapp.com/api/users/${cu.id}/games`, {
          headers: {
            "Authorization": `Bearer ${context.state.token}`
          }

        })
        let data = await response.json()
        context.commit('SET_USER', data)
      }
      catch (error) {
        alert(error)
        localStorage.clear()
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    currentUser: state => state.user,
    categories: state => state.categories,
    categoryById: state => id => state.categories.find(cat => cat.id === id)
  }
})
