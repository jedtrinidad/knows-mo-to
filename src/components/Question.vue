<template>
    <div class="question">
        <h1 v-html="question"></h1>
        <div v-for="(choice, i) in choices" v-bind:key="i">
            <button v-for="(a, i) in choice" v-bind:key="i" v-html="a" @click="$emit('q-answered', a)"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'question',
    props: ['question', 'correct-answer', 'incorrect-answers'],
    data() {
        return {
            choices: []
        }
    },
    created() {
        var choice = this.$props.incorrectAnswers
        var i = Math.random() * choice.length
        choice.splice(i, 0, this.$props.correctAnswer)
        this.choices.push(choice)
    }
}
</script>

