<template>
    <footer v-bind:class="inHero ? 'hero-foot' : 'footer'">
      <p class="content has-text-centered">
        Questions from
        <a href="https://opentdb.com/" target="_blank">Open Trivia Database</a>
        <br>Check out the code
        <a href="https://github.com/jedtrinidad/knows-mo-to">here</a>
      </p>
    </footer>
</template>

<script>
export default {
    name: 'kmt-footer',
    props: {
        inHero: Boolean
    }
}
</script>

