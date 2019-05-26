<template>
    <div class="game">
        <h1>Score: {{ score }}</h1>
        <div class="playfield" v-for="(q, index) in questions" v-bind:key="index">
            <question 
                v-show="index === questionIndex"
                @q-answered="recieveAnswer"
                :question="q.question" 
                :correct-answer="q.correct_answer"
                :incorrect-answers="q.incorrect_answers"/>
        </div>
        <div v-if="questionIndex === 10">
            <h1>Done</h1>
        </div>
    </div>
</template>

<script>
import Question from '@/components/Question.vue'

export default {
    name: 'game',
    props: ['id'],
    data() {
        return {
            questions: [],
            questionIndex: 0,
            currentQuestion: Object, 
            answer: "",
            score: 0
        }
    },
    components: {
        Question
    },
    methods: {
        recieveAnswer(message) {
            if(this.currentQuestion.correct_answer === message) {
                this.score++
            }
            this.questionIndex++
            this.currentQuestion = this.questions[this.questionIndex]
        }
    },
    beforeMount() {
        if (this.$props.id === 0) {
            fetch(`https://opentdb.com/api.php?amount=10`)
                .then((res) => res.json())
                .then((data) => { 
                    this.questions = data.results
                    this.currentQuestion = this.questions[this.questionIndex]
                })
                .catch((err) => console.log(err))
        }
        else {
            fetch(`https://opentdb.com/api.php?amount=10&category=${this.$props.id}`)
                .then((res) => res.json())
                .then((data) => { 
                    this.questions = data.results 
                    this.currentQuestion = this.questions[this.questionIndex]
                })
                .catch((err) => console.log(err))
        }
    }
}
</script>

