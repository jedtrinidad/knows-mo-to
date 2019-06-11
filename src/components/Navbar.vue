<template>
    <nav class="navbar is-spaced is-light is-fixed-top">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="@/assets/knows_mo_to_logo.png" alt="knows_mo_to_logo.png">
            </div>

             <a role="button" class="navbar-burger" aria-label="menu" :aria-expanded="isExpanded"
                v-on:click="isExpanded = !isExpanded" v-bind:class="{ 'is-active' : isExpanded }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active' : isExpanded }" v-if="$route.meta.requiresAuth">
            <router-link class="navbar-item" to="/" v-on:click.native="isExpanded = !isExpanded">Home</router-link>
            <router-link class="navbar-item" to="/settings" v-on:click.native="isExpanded = !isExpanded">Settings</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            isExpanded: false
        }
    }
}
</script>


