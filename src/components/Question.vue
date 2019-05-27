<template>
    <article id="question">
        <div class="tag is-rounded is-large is-info">{{ questionObject.category }}</div>
        <h1 class="is-size-1">{{ questionObject.question }}</h1>
    </article>
</template>

<script>
export default {
    name: 'question',
    props: ["questionObject"]
}
</script>

