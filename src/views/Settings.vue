<template>
    <main id="settings">
        <h1 class="is-size-1">Settings</h1>
    </main>
</template>

<script>
export default {
    name: 'settings',
    beforeRouteLeave(to, from, next) {
        const answer = window.confirm("Are You Sure?")

        if(answer) {
            next()
        }
        else {
            next(false)
        }
    }
}
</script>
