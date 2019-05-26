<template>
    <div class="notification has-text-centered is-primary">
        <router-link :to="{name: 'quiz', params: { id: id, name: name }}">{{ name }}</router-link>
    </div>
</template>

<script>
export default {
    name: 'category',
    props: ['name', 'id']
}
</script>


