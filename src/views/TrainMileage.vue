<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <material-card
          color="primary"
          title="走行距離一覧"
          text="編成別の走行距離を確認することができます"
        >
          <v-card-text>
          <v-alert
            :value="true"
            color="primary"
            icon="mdi-information"
            outline
            class="mb-4"
          >
            グレーのグラフは2019年12月1日から起算。<br>ピンクのグラフは前回検査、もしくは営業開始日から起算。
          </v-alert>
            <template v-if="chartStatus == false">
              <div class="text-xs-center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
            <template v-if="chartStatus">
              <p class="body-1">{{ update | dateFormat }} 更新</p>
            </template>
            <div class="chartWrap">
            <div :style="chartStyle">
              <chart style="position: relative; height: 1000px" @updated="statusUpdate"></chart>
            </div>
            </div>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Chart from '@/components/material/MileageChart.vue'
import dayjs from 'dayjs'

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartStatus: false,
      update: '',
      chartStyle: 'position: absolute; width:100%'
    }
  },
  methods: {
    statusUpdate(x){
      this.chartStatus = true
      this.update = x
      this.chartStyle = 'position: relative; width:100%'
    }
  },
  filters: {
    dateFormat(x){
      return dayjs(x).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
  .chartWrap { position: relative; overflow: hidden; }
</style>
