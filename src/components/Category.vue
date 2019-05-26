<template>
    <div class="category">
        <router-link :to="{name: 'quiz', params: { id: id, name: name }}">{{ name }}</router-link>
    </div>
</template>

<script>
export default {
    name: 'category',
    props: ['name', 'id']
}
</script>

<style scoped>
.category {
    padding: 5px;
    font-size: 15px;
}
a {
    color:  #2c3e50;
}
a:hover {
    color: #42b983;
}
</style>

