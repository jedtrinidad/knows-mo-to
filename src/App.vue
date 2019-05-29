<template>
  <div id="app">
    <nav class="navbar has-shadow is-light is-fixed-bottom">
      <div class="navbar-menu">
        <router-link to="/" class="navbar-item">Home</router-link>
        <div class="navbar-item">
          <p>
            Correct: {{$store.state.results.correct}}
          </p>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <p>
              Questions from
              <a href="https://opentdb.com/" target="_blank">Open Trivia Database</a>
            </p>
          </div>
        </div>
      </div>
    </nav>
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
