<template>
  <main id="login">
    <article class="content has-text-centered">
      <h1 class="title">Hello You!</h1>
      <h2 class="subtitle">Wanna play a game?</h2>
    </article>
    <div class="columns is-centered">
      <div class="column is-4 box has-text-centered">
        <h1 class="is-size-1">Login</h1>
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
              class="button is-rounded is-primary"
              @click="handleSubmit" v-bind:class="{'is-loading': isLoading}">Login</button>
          </div>
          <div class="field">
            <p class="is-size-5">
              Don't have an account?
              <br>
              <router-link to="/register" tag="button" class="button is-rounded is-primary">Register Here</router-link>
            </p>
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
          name: this.$route.query.username || "",
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

