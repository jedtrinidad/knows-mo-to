<template>
    <div id="game">
        <h1 class="is-size-1" v-show="isLoading">Loading...</h1>
        <div v-show="!isLoading">
            <div class="box">
                <p class="is-size-4">Question {{questionCount}} of {{amount}}</p>
                <p class="is-size-5">Score {{this.score}}</p>
            </div>
            <question :question="currentQuestion.question"></question>
            <answers 
                :options="currentQuestion.incorrect_answers" 
                :correct-option="currentQuestion.correct_answer"
                v-on:answeredQuestion="questionAnswered($event)"></answers>
        </div>
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
            score: 0, 
            isDone: false,
            isLoading: this.$store.state.isLoading,
            currentUser: this.$store.getters.currentUser
        }
    },
    methods: {
        async getQuestions(url) {
            this.isLoading = true
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
                alert(error)
            }
            this.isLoading = false
            this.currentQuestion = this.questions.pop()
            this.questionCount++
        },
        questionAnswered(e) {
            if(this.questions.length !== 0) {
                this.currentQuestion = this.questions.pop()
                if(e) {
                    switch (this.currentQuestion.difficulty) {
                        case 'easy':
                            this.score += 1
                            break;
                        case 'medium':
                            this.score += 5
                            break;
                        case 'hard':
                            this.score += 10
                            break;
                        default:
                            break;
                    }
                }
                else {
                    this.score -= 1
                }
            }
            else {
                // alert("Done!")
                this.isDone = true
                this.$router.push({
                    name: 'results', 
                    query: {
                        score: this.score,
                        difficulty: this.$route.query.difficulty,
                        amount: this.$route.query.amount,
                        gameType: this.$route.query.gameType,
                        category: this.$route.params.categoryId
                    }
                })
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
        if(this.isDone) {
            next()
        }
        else {
            let answer = window.confirm("Are you sure?")

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

