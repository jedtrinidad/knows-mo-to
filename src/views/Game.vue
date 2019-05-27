<template>
    <div id="game">
        <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'game',
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            question: Object,
            questions: []
        }
    },
    created() {
        this.isLoading = true
        this.$store.dispatch('getQuestions', this.$route.id)
            .then(() => {
                this.isLoading = false
                this.question = this.$store.state.question
                this.questions = this.$store.state.questions
            })
    }
}
</script>

