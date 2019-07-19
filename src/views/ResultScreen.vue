<template>
    <main id="results">
        <div class="notification is-info" v-show="isLoading">
            Please Wait. Sending Scores To Server...
        </div>
        <div class="box has-text-centered">
            <h1 class="is-size-5">Your Final Score</h1>
            <p class="is-size-1">{{score}}</p>
        </div>
        <div class="box">
            <nav class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <div class="level-item">
                        <router-link tag="button" to="/" class="button is-primary is-rounded">Go to Home</router-link>
                    </div>
                </div>
            </nav>
        </div>
    </main>
</template>

<script>
export default {
    name: 'result-screen',
    data() {
        return {
            score: 0,
            amount: 0,
            difficulty: "",
            type: "",
            category: "",
            categoryName: "",
            isLoading: false
        }
    },
    beforeRouteEnter(to, from, next) {
        if(from.name === "game") {
            next()
        }
        else {
            next("/")
        }
    },
    beforeRouteLeave(to, from, next) {
        if(this.score < 0) {
            window.alert("Score too low :(")
            next()
        }
        this.isLoading = true
        let body = {
            user_id: JSON.parse(this.$store.getters.currentUser).id,
            game: {
                category_name: this.categoryName,
                category_id: this.category,
                type: this.type,
                difficulty: this.difficulty,
                amount_of_questions: this.amount,
                final_score: this.score
            }
        }
        fetch("https://kmt-backend.herokuapp.com/api/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.$store.state.token}`
            },
            body: JSON.stringify(body)
        })
        .then(() => next())
        .catch((error) => alert(error))
    },
    mounted() {
        this.score = parseInt(this.$route.query.score)
        this.category = this.$route.query.category
        this.type = this.$route.query.gameType
        this.difficulty = this.$route.query.difficulty
        this.amount = parseInt(this.$route.query.amount)
        this.categoryName = this.$store.getters.categoryById(parseInt(this.category)).name
    }
}
</script>

