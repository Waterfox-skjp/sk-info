<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  name: 'chart',
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: '走行距離（km）',
            data: this.mileage,
            backgroundColor: [
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(136, 136, 136, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)',
              'rgba(232, 82, 152, 0.2)'
            ],
            borderColor: [
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)',
              'rgba(232, 82, 152, 1)'
            ],
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
              stepSize: 10000
            },
            scaleLabel: {
              display: true,
              labelString: 'km'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              var labelMileage = data.datasets[0].data[tooltipItem.index]
              labelMileage = Math.floor(labelMileage * Math.pow(10, 1)) / Math.pow(10, 1) // 小数第1位まで表示
              return labelMileage + 'km'; //ここで単位を付けます
              // data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index] + 'km'; //ここで単位を付けます
            }
          }
        }
      }
    }
  },
  mounted() {
    const api = 'https://script.google.com/macros/s/AKfycbzQX1bZCwguPr9SPWl1zGEn2CuAbzsn6-UWwaX1mWB_elhyMrw/exec'
    this.$http.get(api).then(response => {
      var update = response.data.update // 更新日
      var result = response.data.mileageList
      this.data['labels'] = result.map(item=>item.trainNum) // 編成
      this.data['datasets'][0]['data'] = result.map(item=>item.mileage) // 走行距離

      this.$emit('updated',update)
      this.renderChart(this.data, this.options)
    })
  }
}
</script>
