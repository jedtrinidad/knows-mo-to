<template>
  <div id="root">
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </component>
    </transition>
  </div>
</template>

<script>
const default_layout = "default"

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>


