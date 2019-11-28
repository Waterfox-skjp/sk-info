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
            color="warning"
            icon="mdi-alert"
            outline
            class="mb-4"
            dismissible
          >
            8928編成は前回入場時から、80016編成は営業開始日から起算。<br>
            そのほかの編成については2019/12/○○から起算。
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
            <chart :style="chartStyle" @updated="statusUpdate"></chart>
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
      chartStyle: 'display: none'
    }
  },
  methods: {
    statusUpdate(x){
      this.chartStatus = true
      this.update = x
      this.chartStyle = 'position: relative; height: 1000px'
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
</style>
