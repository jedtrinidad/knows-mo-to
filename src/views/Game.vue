<template>
    <main id="game" class="box">
        <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>
        
        <question v-bind:question-object="question" v-if="!isDone"></question>
        <answers v-bind:question-object="question" v-if="!isDone"
            v-on:nextQuestion="getQuestion($event)"></answers>
        <div v-show="isDone">
            <h1 class="is-size-2">Quiz Done</h1>
            <div class="level">
                <div class="level-left">
                    <p class="is-size-1">Correct Answers {{$store.state.results.correct}}</p>
                </div>
                <div class="level-right">
                    <p class="is-size-1">Wrong Answers {{$store.state.results.incorrect}}</p>
                </div>
            </div>
            <router-link class="button is-rounded is-outlined is-primary" to="/">Play Again?</router-link>
        </div>
    </main>
</template>

<script>
import Question from '@/components/Question.vue'
import Answers from '@/components/Answers.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'game',
    components: {
        Loading, Question, Answers
    },
    data() {
        return {
            isLoading: this.$store.state.isLoading,
            question: this.$store.state.question,
            questions: this.$store.state.questions,
            results: this.$store.state.results,
            isDone: false
        }
    },
    mounted() {
        let id = this.$route.params.id
        this.isLoading = true
        this.$store.dispatch('getQuestions', id)
            .then(() => {
                this.isLoading = false
                this.questions = this.$store.getters.convertedQuestions
                this.question = this.$store.getters.convertedQuestion
                this.results = this.$store.state.results
            })
    },
    methods: {
        getQuestion(result) {
            this.question = this.questions.pop()

            if(result) this.results.correct += 1
            else this.results.incorrect += 1 
            
            if(this.questions.length === 0) this.isDone = true; this.$store.dispatch('setResults', this.results)
        }
    }
}
</script>

