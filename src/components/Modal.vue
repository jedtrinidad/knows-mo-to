<template>
    <div class="modal" v-bind:class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" v-if="!canBeClosed" @click="closeModal"></button>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: ["canBeClosed"],
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        closeModal() {
            this.isActive = false
        },
        openModal() {
            this.isActive = true
        }
    }
}
</script>

