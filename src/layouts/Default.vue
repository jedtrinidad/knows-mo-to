<template>
  <div id="root">
    <navbar></navbar>
    <section class="section">
      <main class="container">
        <slot></slot>
      </main>
    </section>
    <footer class="footer">
      <p class="content has-text-centered">
        Questions from
        <a href="https://opentdb.com/" target="_blank">Open Trivia Database</a>
        <br>Check out the code
        <a href="https://github.com/jedtrinidad/knows-mo-to">here</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'default-layout',
    components: { Navbar }    
}
</script>
