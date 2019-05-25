<template>
  <div class="home">
    <h1>Knows Mo To'</h1>
    <h4>Select Quiz Category</h4>
    <div v-for="(category, index) in categories" v-bind:key="index">
      <category :id="category.id" :name="category.name"/>
    </div>
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


