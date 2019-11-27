<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  name: 'chart',
  data () {
    return {
      data: {
        labels: ['8512', '8518', '8801', '8802', '8803', '8804', '8805', '8806', '8807', '8808', '8809', '8810', '8811', '8812', '8813', '8814', '8815', '8816', '8918', '8928', '8938', 'N818', 'N828', 'N838', 'N848', 'N858', '80016'],
        datasets: [
          {
            label: '走行距離（km）',
            data: [10, 20, 30, 40, 50, 30],
            backgroundColor: 'rgba(232, 82, 152, 0.2)',
            borderColor: 'rgba(232, 82, 152,1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true, //0から始まる
              min: 0,
              stepSize: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'km'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index]
                + ": "
                + data.datasets[0].data[tooltipItem.index]
                + "km"; //ここで単位を付けます
            }
          }
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
