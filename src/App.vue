<template>
  <div id="app">
    <div class="navbar has-shadow">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/about" class="navbar-item">About</router-link>
    </div>
    <section class="section">
      <main class="container">
        <router-view/>
      </main>
    </section>
  </div>
</template>

<style>
#app {
  /**font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  **/
  color: #2c3e50;
}
</style>
