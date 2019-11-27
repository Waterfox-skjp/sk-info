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
            <chart style="position: relative; height: 1000px" @updated="statusUpdate"></chart>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Chart from '@/components/material/MileageChart.vue';

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartStatus: false
    }
  },
  methods: {
    statusUpdate(){
      this.chartStatus = true
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
