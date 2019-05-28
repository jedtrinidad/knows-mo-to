<template>
    <article id="answers">
        <div class="notification is-primary" v-for="(choice, i) in questionObject.incorrect_answers" v-bind:key="i">
            <div class="level">
                <div class="level-left">
                    <h1 class="is-size-4">{{choice}}</h1>
                </div>
                <div class="level-right">
                    <button class="button is-rounded is-outlined is-inverted is-primary"
                        @click="pickOption(choice)">
                        SELECT
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'answers',
    props: ["questionObject"],
    data() {
        return {
            choices: [],
            selected: '',
            correct: '',
            isCorrect: false,
            hasSelected: false
        }
    },
    methods: {
        pickOption(choice) {
            this.hasSelected = true
            this.correct = this.questionObject.correct_answer
            this.selected = choice

            if(this.correct === this.selected) {
                this.isCorrect = true
            }
            else {
                this.isCorrect = false
            }
            alert(`Correct Answer: ${this.correct}`)
            this.nextQuestion()
        },
        nextQuestion() {
            this.$emit('nextQuestion', this.isCorrect)
        }
    }
}
</script>

