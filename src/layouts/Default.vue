<template>
  <div id="root">
    <navbar></navbar>
    <section class="section">
      <main class="container">
        <slot></slot>
      </main>
    </section>
    <kmt-footer :in-hero="false"></kmt-footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import KmtFooter from '@/components/Footer.vue'
export default {
    name: 'default-layout',
    components: { Navbar, KmtFooter }    
}
</script>
