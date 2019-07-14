<template>
    <main id="register">
    <div class="columns is-centered">
      <div class="column is-4 box has-text-centered">
        <h1 class="is-size-1">Register</h1>
        <form>
          <label for="name" class="label">Name</label>
          <div class="field">
            <input type="text" id="name" class="input" v-model="name" required autofocus>
          </div>
          <label for="password" class="label">Password</label>
          <div class="field">
            <input class="input" type="password" name="password" id="password" v-model="password" required>
          </div>
          <label for="password_confirm" class="label">Confirm Password</label>
          <div class="field">
            <input class="input" type="password" name="password_confirm" id="password-confirm" 
            v-model="passwordConfirmation" required @keyup="confirmPassword">
            <p class="help is-danger" v-show="!isPasswordConfirmed">Password does not match.</p>
          </div>
          <div class="buttons is-centered">
              <button type="submit" 
                class="button is-rounded is-info"
                @click="handleSubmit" v-bind:class="{'is-loading': isLoading}">Register</button>
              <router-link to="/login" class="button is-rounded">Back to Login</router-link>
          </div>
        </form>
      </div>
    </div>
    </main>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            name: '',
            password: '',
            passwordConfirmation: '',
            isLoading: false,
            isPasswordConfirmed: true,
            createdUser: Object
        }
    },
    methods: {
      confirmPassword() {
        if(this.password.length > 0 && this.passwordConfirmation.length > 0) {
          if (this.password === this.passwordConfirmation) {
            this.isPasswordConfirmed = true
          }
          else {
            this.isPasswordConfirmed = false
          }
        }
        else {
          this.isPasswordConfirmed = true
        }
      },
      handleSubmit(e) {
        e.preventDefault()

        if (this.name.length > 0 && this.password.length > 0 && this.passwordConfirmation.length > 0) {
          let userBody = {
            user: {
              name: this.name,
              password: this.password,
              password_confirmation: this.passwordConfirmation
            }
          }
          this.isLoading = true
          this.$store.dispatch('registerUser', userBody)
            .then(() => {
              this.$router.push({name: 'login', query: {registered: true, username: userBody.name}})
              this.isLoading = false
            })
        }
        else {
          alert(false)
        }
      }
    }
}
</script>

