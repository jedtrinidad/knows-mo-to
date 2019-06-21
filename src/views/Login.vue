<template>
  <main id="login">
    <h1 class="title">Login</h1>
    <div class="columns">
      <div class="column is-4">
        <form>
          <label for="name" class="label">Name</label>
          <div class="field">
            <input type="text" id="name" class="input" v-model="name" required autofocus>
          </div>
          <label for="password" class="label">Password</label>
          <div class="field">
            <input class="input" type="password" name="password" id="password" v-model="password" required>
          </div>
          <div class="field">
              <button type="submit" 
              class="button is-rounded is-outlined is-inverted is-primary"
              @click="handleSubmit" v-bind:class="{'is-loading': isLoading}">Login</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "login",
  data() {
      return {
          name: "",
          password: "",
          isLoading: false
      }
  },
  methods: {
      handleSubmit(e) {
        e.preventDefault()

        if(this.password.length > 0) {
          this.isLoading = true
          this.$store.dispatch('login', {name: this.name, password: this.password}).then(() => {
            this.$router.push({name: "home"})
            this.isLoading = false
          })
        }
      }
  }
};
</script>

