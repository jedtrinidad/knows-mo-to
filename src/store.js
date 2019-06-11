import Vue from 'vue'
import Vuex from 'vuex'
import {decodeHtml} from './utilities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    questions: [],
    question: Object,
    isLoading: false,
    results: { correct: 0, incorrect: 0 },
    user: Object,
    token: localStorage.getItem('jwt') || ''
  },
  mutations: {
    setCategories: (state, categories) => {
      state.categories = categories
    },
    setQuestions: (state, questions) => {
      state.questions = questions
      state.question = state.questions.shift()
    },
    setResults: (state, results) => {
      state.results = results
    },
    setToken: (state, token) => {
      state.token = token
      localStorage.setItem('jwt', state.token)
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token
  }
})
