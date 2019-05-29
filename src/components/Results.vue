<template>
  <div id="results">
    <h1 class="is-size-2">Quiz Done</h1>
    <div class="level">
      <div class="level-left">
        <p class="is-size-1">Correct Answers: {{ $store.state.results.correct }}</p>
      </div>
      <div class="level-right">
        <p class="is-size-1">Incorrect Answers: {{ $store.state.results.incorrect}}</p>
      </div>
    </div>
    <router-link class="button is-rounded is-outlined is-primary" to="/">Play Again?</router-link>
  </div>
</template>

<script>
export default {
  name: "results"
};
</script>

