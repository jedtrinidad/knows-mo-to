<template>
  <div id="home">
    <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="is-size-1">Knows Mo To'</h1>
        <router-link to="/quiz/0" class="button is-primary is-outlined is-rounded">Play Now</router-link>
        <p class="subtitle">
          Questions from
          <a href="https://opentdb.com/" target="_blank">Open Trivia Database</a>
        </p>
      </div>
      <div class="column">
        <article class="box">
          <p class="is-size-4 has-text-right notification is-primary">Select a Category To Begin</p>
          <div class="tags">
            <category
              v-for="(category, index) in categories"
              v-bind:id="category.id"
              v-bind:name="category.name"
              v-bind:key="index"
            ></category>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Category from "@/components/Category.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "home",
  components: {
    Category,
    Loading
  },
  data() {
    return {
      categories: [],
      isLoading: false
    };
  },
  methods: {
    startGame() {
      alert("OK")
    }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch('getCategories')
      .then(() => {
        this.isLoading = false
        this.categories = this.$store.state.categories
      })
  }
};
</script>

<style scoped>
#parent-tile {
  flex-wrap: wrap;
}

#id {
  text-align: center;
}
</style>



