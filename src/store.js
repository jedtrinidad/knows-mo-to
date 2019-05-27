import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    questions: [],
    question: Object,
    isLoading: false
  },
  mutations: {
    setCategories: (state, categories) => {
      state.categories = categories
    },
    setQuestions: (state, questions) => {
      state.question = questions.shift()
      state.questions = questions
    }
  },
  actions: {
    async getCategories(context) {
      try {
        let response = await fetch("https://opentdb.com/api_category.php")
        let data = await response.json()
        if(context.state.categories.length === 0) {
          context.commit('setCategories', data.trivia_categories)
        }
      } catch (error) {
        alert(error)
      }
    },
    async getQuestions(context, categoryId) {
      try {
        if(categoryId > 0 && categoryId != null) {
          let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${categoryId}`)
          let data = await response.json()
          context.commit('setQuestions', data.results)
        }
        else {
          let response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
          let data = await response.json()
          context.commit('setQuestions', data.results)
        }
      } catch (error) {
        alert(error)
      }
    }
  }
})
