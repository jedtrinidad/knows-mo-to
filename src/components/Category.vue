<template>
    <div class="tag is-rounded is-large">
        <router-link :to="{name: 'quiz', params: { id: id, name: name }}">{{name}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'category',
    props: ['name', 'id'],
    mounted() {
        const targets = this.$el
        console.log(this.$el)
        this.$anime
            .timeline()
            .add({
                targets,
                translateX: 5,
                easing: 'easeOutExpo'
            })
    }
}
</script>


