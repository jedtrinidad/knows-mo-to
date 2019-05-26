<template>
  <div class="home">
    <h1 class="is-size-1">Knows Mo To'</h1>
    <router-link to="/quiz/0" class="button is-primary is-outlined is-rounded">Play Now</router-link>
    <h4>or</h4>
    <h4 class="is-size-4">Select Quiz Category</h4>
    <article class="tags">
      <category 
        v-for="(category, index) in categories"
        v-bind:id="category.id"
        v-bind:name="category.name"
        v-bind:key="index"></category>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import Category from "@/components/Category.vue"

export default {
  name: 'home',
  components: {
    Category
  },
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => { this.categories = data.trivia_categories })
  }
}
</script>

<style scoped>
#parent-tile {
  flex-wrap: wrap;
}
</style>



