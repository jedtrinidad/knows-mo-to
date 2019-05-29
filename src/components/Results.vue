<template>
  <div id="results">
    <h1 class="is-size-2">Quiz Done</h1>
    <div class="level">
      <div class="level-left">
        <p class="is-size-1">Correct Answers: {{ $store.state.results.correct }}</p>
      </div>
      <div class="level-right">
        <p class="is-size-1">Incorrect Answers: {{ $store.state.results.incorrect }}</p>
      </div>
    </div>
    <p class="is-size-2">Accuracy: {{ ($store.state.results.correct / 10) * 100 }}%</p>
    <button class="button is-rounded is-outlined is-primary" v-on:click="playAgain">Play Again?</button>
  </div>
</template>

<script>
export default {
  name: "results",
  methods: {
    playAgain() {
      this.$emit('replay')
      this.$store.dispatch('setResults', { correct: 0, incorrect: 0 })
    }
  }
};
</script>

