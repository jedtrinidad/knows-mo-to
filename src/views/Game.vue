<template>
    <div id="game">
        <div class="box">
            <p class="is-size-4">Question {{questionCount}} of {{amount}}</p>
        </div>
        <question :question="currentQuestion.question"></question>
        <answers 
            :options="currentQuestion.incorrect_answers" 
            :correct-option="currentQuestion.correct_answer"
            v-on:answeredQuestion="questionAnswered($event)"></answers>
    </div>
</template>

<script>
import {decodeHtml,shuffle} from '@/utilities.js'
import Question from '@/components/game/Question.vue'
import Answers from '@/components/game/Answers.vue'
export default {
    name: 'game',
    components: { Question, Answers },
    data() {
        return {
            questions: [],
            currentQuestion: Object,
            amount: 0,
            questionCount: 0,
            results: this.$store.state.results,
            isDone: false
        }
    },
    methods: {
        async getQuestions(url) {
            try {
                let response = await fetch(url)
                let data = await response.json()
                let _questions = data.results
                _questions.forEach(question => {
                    question.question = decodeHtml(question.question)
                    question.incorrect_answers.push(question.correct_answer)
                    question.incorrect_answers = question.incorrect_answers.map(ans => decodeHtml(ans))
                    question.incorrect_answers = shuffle(question.incorrect_answers)

                });
                this.questions = shuffle(_questions)
            }
            catch(error) {
                console.log(error)
            }
            this.currentQuestion = this.questions.pop()
            this.questionCount++
        },
        questionAnswered(e) {
            if(this.questions.length !== 0) {
                this.currentQuestion = this.questions.pop()
                if(e) {
                    this.results.correct += 1
                }
                else {
                    this.results.incorrect += 1
                }
            }
            else {
                alert("Done!")
                this.isDone = true
                this.$router.push({name: 'home'})
            }
            this.questionCount++
        }
    },
    beforeRouteEnter(to, from, next) {
        let url = `https://opentdb.com/api.php?category=${to.params.categoryId}`
        let amount = parseInt(to.query.amount) || 10
        let difficulty = to.query.difficulty || ""
        url += `&amount=${amount}`
        if(difficulty !== "") {
            url += `&difficulty=${difficulty}`
        }
        next(vm => {
            vm.getQuestions(url)
            vm.amount = amount
        })
    },
    beforeRouteLeave(to, from, next) {
        const answer = window.confirm("Are You Sure?")

        if(this.isDone === true) {
            if(answer) {
                next()
            }
            else {
                next(false)
            }
        }
    }
}
</script>

