<template>
    <article id="answers">
        <div class="notification is-primary" v-for="(choice, i) in answerArray" v-bind:key="i">
            <div class="level">
                <div class="level-left">
                    <h1 class="is-size-4">{{choice}}</h1>
                </div>
                <div class="level-right">
                    <button class="button is-rounded is-outlined is-inverted is-primary">
                        SELECT
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'answers',
    props: ["answerArray"]
}
</script>

