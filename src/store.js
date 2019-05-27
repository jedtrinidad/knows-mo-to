import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    isLoading: false
  },
  mutations: {
    setCategories: (state, categories) => {
      state.categories = categories
    }
  },
  actions: {
    async getCategories(context) {
      try {
        let response = await fetch("https://opentdb.com/api_category.php")
        let data = await response.json()
        context.commit('setCategories', data.trivia_categories)
      } catch (error) {
        alert(error)
      }
    }
  }
})
