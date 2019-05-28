<script>
import {Doughnut} from 'vue-chartjs'

export default {
    extends: Doughnut,
    data() {
        return {
            incorrects: this.$store.state.results.incorrect,
            corrects: this.$store.state.results.correct
        }
    }, 
    mounted() {
        this.renderChart({
            labels: ['Incorrect Answers', 'Correct Answers'],
            datasets: [{
                backgroundColor: ['#E74C3C','#82BF56'],
                data: [this.incorrects, this.corrects]
            },
            {responsive: true, maintainAspectRatio: false}]
        })
    }
}
</script>

