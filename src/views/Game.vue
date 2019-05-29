<template>
  <main id="game" class="box">
    <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter">
    <div id="play-field" v-if="!isLoading">
      <question v-bind:question-object="question" v-if="!isDone"></question>
      <answers
        v-bind:question-object="question"
        v-if="!isDone"
        v-on:nextQuestion="getQuestion($event)"
      ></answers>
      <results v-if="isDone" v-on:replay="getQuestions()"></results>
    </div>
    </transition>
  </main>
</template>

<script>
import Question from "@/components/Question.vue";
import Answers from "@/components/Answers.vue";
import Results from "@/components/Results.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "game",
  components: {
    Loading,
    Question,
    Answers,
    Results
  },
  data() {
    return {
      isLoading: this.$store.state.isLoading,
      question: this.$store.state.question,
      questions: this.$store.state.questions,
      results: this.$store.state.results,
      isDone: false
    };
  },
  mounted() {
    this.getQuestions()
  },
  destroyed() {
    this.$store.dispatch('setResults', { correct: 0, incorrect: 0 })
  },
  methods: {
    getQuestions() {
      let id = this.$route.params.id;
      this.isLoading = true;
      this.$store.dispatch("getQuestions", id).then(() => {
        this.isLoading = false;
        this.questions = this.$store.getters.convertedQuestions;
        this.question = this.$store.getters.convertedQuestion;
        this.results = this.$store.state.results;
      });
      this.isDone = false
    },
    getQuestion(result) {
      this.question = this.questions.pop();

      if (result) this.results.correct += 1;
      else this.results.incorrect += 1;

      if (this.questions.length === 0) this.isDone = true;
      this.$store.dispatch("setResults", this.results);
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      this
        .$anime
        .timeline()
        .add({
          targets: el,
          opacity: 0,
          duration: 1000,
          easing: 'linear'
        })
        .add({
          targets: el,
          opacity: 1,
          easing: 'linear'
        })
    }
  }
};
</script>

