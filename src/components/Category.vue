<template>
    <div class="tag is-rounded is-large">
        <router-link :to="{name: 'quiz', params: { id: id, name: name }}">{{name}}</router-link>
    </div>
</template>

<script>
export default {
    name: 'category',
    props: ['name', 'id']
}
</script>


