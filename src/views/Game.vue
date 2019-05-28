<template>
    <main id="game" class="box">
        <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>
        
        <question v-bind:question-object="question"></question>
        <answers v-bind:question-object="question"
            v-on:nextQuestion="getQuestion($event)"></answers>
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
            isLoading: false,
            question: Object,
            questions: []
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
            })
    },
    methods: {
        getQuestion() {
            this.question = this.questions.pop()
        }
    }
}
</script>

