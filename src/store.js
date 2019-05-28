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
    results: { correct: 0, incorrect: 0 }
  },
  mutations: {
    setCategories: (state, categories) => {
      state.categories = categories
    },
    setQuestions: (state, questions) => {
      state.questions = questions
      state.question = state.questions.shift()
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
    async getQuestions(context, categoryId) {
      try {
        if(categoryId > 0 && categoryId !== null) {
          let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${categoryId}`)
          let data = await response.json()
          context.commit('setQuestions', data.results)
        }
        else {
          let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
          let data = await response.json()
          context.commit('setQuestions', data.results)
        }
      } catch (error) {
        alert(error)
      }
    }
  },
  getters: {
    convertedQuestions: state => {
      let qArray = state.questions

      qArray.forEach(q => {
        q.question = decodeHtml(q.question)
        q.incorrect_answers.push(q.correct_answer)
        q.incorrect_answers = q.incorrect_answers.map(i => decodeHtml(i))
      })
      return qArray
    },
    convertedQuestion: state => {
      let q = state.question
      q.question = decodeHtml(q.question)
      q.incorrect_answers.push(q.correct_answer)
      q.incorrect_answers = q.incorrect_answers.map(i => decodeHtml(i))

      return q
    }
  }
})
