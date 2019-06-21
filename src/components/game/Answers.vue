<template>
    <div class="box">
        <button class="button is-rounded is-large"
            v-show="!hasPicked"
            v-for="(a,i) in options"
            v-bind:key="i"
            ref="choice"
            @click="pickOption($event)" :value="a">{{a}}</button>
        <div v-show="hasPicked">
            <p class="content">
                {{result}}
            </p>
            <button class="button is-rounded" @click="nextQuestion">Next Question</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'answers',
    props: ['options', 'correctOption'],
    data() {
        return {
            hasPicked: false,
            result: '',
            isCorrect: false
        }
    },
    methods: {
        pickOption(e) {
            this.hasPicked = true
            if(e.target.value === this.correctOption) {
                e.target.classList.add('is-info')
                this.result = "Correct!"
                this.isCorrect = true
            }
            else {
                e.target.classList.add('is-danger')
                this.result = `Wrong!\nCorrect Answer: ${this.correctOption}`
                this.isCorrect = false
            }
        },
        nextQuestion() {
            this.hasPicked = false
            this.$refs.choice.forEach(e => {
                e.classList.remove('is-info')
                e.classList.remove('is-danger')
            })
            this.$emit('answeredQuestion', this.isCorrect)
        }
    }
}
</script>

