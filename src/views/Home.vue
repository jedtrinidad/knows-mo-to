<template>
  <div id="home">

    <modal ref="customizerModal" can-close="true">
      <h1 class="title">Custom Game</h1>

      <div class="field">
        <label for="categorySelect" class="label">Category</label>
        <div class="control">
          <div class="select">
            <select id="categorySelect" v-model="selectedQuestionId">
              <option :value="cat.id" v-for="(cat, i) in categories" v-bind:key="i">{{cat.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label for="difficultySelect" class="label">Difficulty</label>
        <div class="control">
          <div class="select">
            <select name="difficultySelect" id="difficultySelect" v-model="selectedDifficulty">
              <option :value="diff" v-for="(diff, i) in difficulties" v-bind:key="i">{{diff}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label for="quantity" class="label">No. of Questions</label>
        <div class="control">
          <input type="number" class="input" name="quantity" id="quantity" :max="totalQuestions" v-model="questionAmount">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-rounded is-outlined is-primary" @click="startCustomGame">Start Game!</button>
        </div>
      </div>
    </modal>

    <modal ref="quickModal" can-close="true">
      <h1 class="title">Quick Game</h1>
      <p class="is-size-5">Select Category</p>
      <table class="table is-fullwidth">
        <thead>
          <th>Category</th>
          <th>ID</th>
        </thead>
        <tbody>
          <tr v-for="(cat, i) in categories" v-bind:key="i">
            <td>
               <router-link :to="{name: 'game', params: {categoryId: cat.id}}">
                {{cat.name}}
              </router-link>
            </td>
            <td>{{cat.id}}</td>
          </tr>
        </tbody>
      </table>
    </modal>

    <div class="tile is-ancestor box is-vertical">
      <div class="has-text-centered">
        <img src="@/assets/knows_mo_to_logo.png" alt="Logo" height="150" width="150">
      </div>
      <div class="tile is-parent">
        <div class="tile is-parent has-text-centered">
          <div class="tile is-child notification is-danger">
            <h1 class="title">Quick</h1>
            <p class="subtitle">Play A Quick Game</p>
            <button class="button is-danger is-rounded is-inverted" @click="launchQuickModal">Play</button>
          </div>
        </div>
        <div class="tile is-parent has-text-centered">
          <div class="tile is-child notification is-primary">
            <h1 class="title">Custom</h1>
            <p class="subtitle">Create A Custom Game</p>
            <button class="button is-primary is-rounded is-inverted" @click="launchCustomizerModal">Play</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from '@/components/Modal.vue'

export default {
  name: "home",
  components: { Modal },
  data() {
    return {
      user: this.$store.getters.currentUser,
      categories: this.$store.state.categories,
      difficulties: this.$store.state.difficulties,
      selectedQuestionId: 0,
      selectedDifficulty: '',
      totalQuestions: 55,
      questionAmount: 10,
      categoryQuestionCount: Object
    }
  },
  mounted() {
    this.$store.dispatch('getCategories')
      .then(() => { 
        this.categories = this.$store.getters.categories
        this.selectedQuestionId = this.categories[0].id
        this.selectedDifficulty = this.$store.state.difficulties[0]
      }
    )
  },
  methods: {
    launchCustomizerModal() {
      this.$refs.customizerModal.openModal()
    },
    launchQuickModal() {
      this.$refs.quickModal.openModal()
    },
    startCustomGame() {
      this.$router.push({
        name: 'game', 
        params: {categoryId: this.selectedQuestionId},
        query: {difficulty: this.selectedDifficulty, amount: this.questionAmount} 
      })
    },
    getDiff(e) {
      console.log(e)
    }
  }
};
</script>



