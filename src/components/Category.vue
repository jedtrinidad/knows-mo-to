<template>
    <div>
        <router-link :to="{name: 'quiz', params: { id: id }}" tag="button">{{ name }}</router-link>
    </div>
</template>

<script>
export default {
    name: 'category',
    props: ['name', 'id']
}
</script>

