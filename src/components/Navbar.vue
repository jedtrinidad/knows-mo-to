<template>
    <nav class="navbar is-spaced is-light is-fixed-top">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="@/assets/knows_mo_to_logo.png" alt="knows_mo_to_logo.png">
            </div>

             <a role="button" class="navbar-burger" aria-label="menu" :aria-expanded="isExpanded"
                v-on:click="toggle" v-bind:class="{ 'is-active' : isExpanded }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active' : isExpanded }" v-if="$route.meta.requiresAuth">
            <router-link class="navbar-item" to="/" v-on:click.native="isExpanded = !isExpanded">Home</router-link>
            <router-link class="navbar-item" to="/settings" v-on:click.native="isExpanded = !isExpanded">Settings</router-link>
            <div class="navbar-end">
                <div class="navbar-item">
                    {{$store.getters.currentUser.name}}
                </div>
                <div class="navbar-item">
                    <button class="button is-rounded is-danger" @click="logout"
                        v-bind:class="{'is-loading': isLoading}">Logout</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            isExpanded: false,
            isLoading: false
        }
    },
    methods: {
        toggle() {
            this.isExpanded = !this.isExpanded
        },
        logout() {
            const answer = window.confirm("Are You Sure?")

            if(answer) {
                this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push({name: "login"})
                })
            }
        }
    }
}
</script>


