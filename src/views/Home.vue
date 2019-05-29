<template>
  <div id="home">
    <loading :active.sync="isLoading" :can-cancel="false" loader="dots"></loading>
    <transition
      v-on:before-enter="beforePlayFieldEnter"
      v-on:enter="playFieldEnter">
      <div class="columns" v-if="!isLoading">
        <div class="column has-text-centered">
          <img src="@/assets/knows_mo_to_logo.png" alt="logo" height="450" width="450">
        </div>
        <div class="column">
          <article class="box">
            <div class="notification is-primary has-text-right">
              <p class="is-size-4">Select a Category To Begin</p>
              <router-link
                to="/quiz/0"
                class="button is-primary is-outlined is-rounded is-inverted"
              >Play With Random Questions</router-link>
            </div>
            <div class="tags">
              <category
                v-for="(category, index) in categories"
                v-bind:id="category.id"
                v-bind:name="category.name"
                v-bind:key="index"
                ref="category"
              ></category>
            </div>
          </article>
        </div>
      </div>
    </transition>
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
      categories: this.$store.state.categories,
      isLoading: this.$store.state.isLoading
    };
  },
  methods: {
    startGame() {
      alert("OK");
    },
    beforePlayFieldEnter(el) {
      el.style.opacity = 0
    },
    playFieldEnter(el, done) {
      this
        .$anime
        .timeline()
        .add({
          targets: el,
          opacity: 0,
          duration: 120,
          translateY: 100
        })
        .add({
          targets: el,
          opacity: 1,
          translateY: 0
        })
    }
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("getCategories").then(() => {
      this.isLoading = false;
      this.categories = this.$store.state.categories;
    });
  },
  updated() {
    let targets = this.$refs.category.map(cat => cat.$el);
    this.$anime
      .timeline()
      .add({
        targets,
        opacity: 0,
        duration: 150
      })
      .add({
        targets,
        opacity: 1,
        duration: 150,
        easing: "linear",
        delay: this.$anime.stagger(200)
      });
  }
};
</script>



