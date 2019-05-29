<template>
  <main id="game" class="box">
    <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>

    <question v-bind:question-object="question" v-if="!isDone"></question>
    <answers
      v-bind:question-object="question"
      v-if="!isDone"
      v-on:nextQuestion="getQuestion($event)"
    ></answers>
    <results v-if="isDone"></results>
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
    let id = this.$route.params.id;
    this.isLoading = true;
    this.$store.dispatch("getQuestions", id).then(() => {
      this.isLoading = false;
      this.questions = this.$store.getters.convertedQuestions;
      this.question = this.$store.getters.convertedQuestion;
      this.results = this.$store.state.results;
    });
  },
  methods: {
    getQuestion(result) {
      this.question = this.questions.pop();

      if (result) this.results.correct += 1;
      else this.results.incorrect += 1;

      if (this.questions.length === 0) this.isDone = true;
      this.$store.dispatch("setResults", this.results);
    }
  },
  beforeUpdate() {
    let targets = this.$children.map(child => child.$el);
    this.$anime
      .timeline()
      .add({
        targets,
        opacity: 0,
        duration: 300
      })
      .add({
        targets,
        opacity: 1,
        duration: 300,
        easing: "linear",
        delay: this.$anime.stagger(200)
      });
  }
};
</script>

