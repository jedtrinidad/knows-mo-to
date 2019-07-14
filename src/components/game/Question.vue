<template>
    <div class="box">
        <p class="tag is-large is-info">{{ question.category }}</p>
        <h1 class="is-size-3">{{ question.question }}</h1>
    </div>
</template>

<script>
export default {
    name: 'question',
    props: ['question']
}
</script>

