<template>
    <article id="answers">
        <div class="notification" v-for="(choice, i) in questionObject.incorrect_answers" 
            v-bind:key="i" v-bind:class="{ 'is-primary':hasSelected }"
            v-on:click="pickOption(choice)">
            <h1 class="is-size-3">{{choice}}</h1>
        </div>
    </article>
</template>

<script>
export default {
    name: 'answers',
    props: ["questionObject"],
    data() {
        return {
            selected: '',
            correct: '',
            isCorrect: false,
            hasSelected: false
        }
    },
    methods: {
        pickOption(choice, el) {
            this.hasSelected = true
            this.correct = this.questionObject.correct_answer
            this.selected = choice

            if(this.correct === this.selected) {
                this.isCorrect = true
            }
            else {
                this.isCorrect = false
            }
            //alert(`Correct Answer: ${this.correct}`)
            this.nextQuestion()
            this.hasSelected = false
        },
        nextQuestion() {
            this.$emit('nextQuestion', this.isCorrect)
        }
    }
}
</script>

