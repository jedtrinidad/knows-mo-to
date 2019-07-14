<template>
    <div id="main">
        <navbar></navbar>
        <main class="hero is-fullheight is-primary">
            <div class="hero-body">
                <div class="container">
                    <slot/>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    name: 'hero-layout',
    components: {Navbar}
}
</script>

