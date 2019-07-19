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
        <kmt-footer :in-hero="true"></kmt-footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import KmtFooter from '@/components/Footer.vue'
export default {
    name: 'hero-layout',
    components: {Navbar, KmtFooter}
}
</script>

