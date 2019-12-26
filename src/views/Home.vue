<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs12 md6>
        <material-card
          color="primary"
          title="運行情報"
          text="最新の運行情報を確認することができます"
        >
            <template v-if="infoJson">
              <v-alert
                :value="true"
                :color="alertColor"
                :icon="alertIcon"
                outline
              >
                <div>{{ infoJson.update | dateFormat }} 時点</div>
                <div class="subheading">{{ infoJson.text }}</div>
              </v-alert>
            </template>
            <template v-else>
              <div class="text-xs-center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
        </material-card>
      </v-flex>
      <v-flex xs12 md6>
        <material-card
          color="primary"
          title="試運転情報"
          text="今日の試運転情報について確認することができます"
        >
          <v-card-text>
            <p>準備中です</p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12>
        <material-card
          color="primary"
          title="天気"
          text="沿線の天気を確認することができます。"
        >
          <v-card-text>
            <Weather></Weather>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12>
        <material-card
          color="primary"
          title="SK infoとは？"
          text="What's SK info?"
        >
          <v-card-text>
            <p>運行、及び車両データを一覧で確認するためのダッシュボードタイプサイトです。</p>
            <p>関連する問い合わせは水狐（<a href="https://twitter.com/Waterfox_skjp" target="_blank">@Waterfox_skjp</a>）へ</p>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Weather from '@/components/material/Weather.vue'
import dayjs from 'dayjs'

export default {
  components: {
    Weather
  },
  data() {
    return {
      infoJson: '',
      alertColor: '',
      alertIcon: ''
    }
  },
  created() {
    const api = 'https://script.google.com/macros/s/AKfycbxVH5umFi8gveKyv1it29o5Tz7VfQKlnSoIwSO42qO2iTPgc1o/exec'
    this.$http.get(api).then(response => {
      this.infoJson = response.data
      var status = response.data.status
      // 状態でアイコンを変える
      if(status == 'delay' || status == 'no-direct' || status == 'other'){
        this.alertColor = 'warning'
        this.alertIcon = 'mdi-alert'
      }else if(status == 'stop'){
        this.alertColor = 'danger'
        this.alertIcon = 'mdi-alert-decagram'
      }else{
        this.alertColor = 'success'
        this.alertIcon = 'mdi-information'
      }
    })
  },
  filters: {
    dateFormat(x){
      return dayjs(x).format('YYYY/MM/DD HH:mm')
    }
  }
}
</script>
