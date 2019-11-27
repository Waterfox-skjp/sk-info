<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout column>
      <v-flex xs12>
        <material-card
          color="primary"
          title="運行情報"
          text="最新の運行情報を確認することができます"
        >
          <v-card-text>
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
              <v-layout align-center justify-start v-if="infoJson.cause != '' || infoJson.tags.station != '' || infoJson.tags.line != ''">
                <v-flex xs1>
                  関連タグ：
                </v-flex>
                <v-flex class="text-xs-left">
                  <v-chip v-if="infoJson.cause">{{ infoJson.cause | causeFormat }}</v-chip>
                  <v-chip v-for="(item, index) in infoJson.tags.station" :key="index">
                    {{ item }}
                  </v-chip>
                  <v-chip v-for="(item, index) in infoJson.tags.line" :key="index">
                    {{ item }}
                  </v-chip>
                </v-flex>
              </v-layout>
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
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12>
        <material-card
          color="primary"
          title="試運転情報"
          text="今日の試運転情報について確認することができます"
        >
          <v-card-text>

          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data: () => ({
    infoJson: '',
    alertColor: '',
    alertIcon: ''
  }),
  created() {
    const api = 'https://script.google.com/macros/s/AKfycbxVH5umFi8gveKyv1it29o5Tz7VfQKlnSoIwSO42qO2iTPgc1o/exec'
    this.$http.get(api).then(response => {
      this.infoJson = response.data
      var status = response.data.status
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
      return dayjs(x).format('YYYY-MM-DD HH:mm')
    },
    causeFormat(y){
      var cause = ''
      switch(y) {
        case 'accident-causing-injur':
          cause = '人身事故'
          break

        case 'blackout':
          cause = '停電'
          break

        case 'wind':
          cause = '強風'
          break

        case 'earthquake':
          cause = '地震'
          break

        case 'rain':
          cause = '大雨'
          break

        case 'fog':
          cause = '濃霧'
          break

        case 'typhoon':
          cause = '台風'
          break

        case 'signal':
          cause = '信号トラブル'
          break

        case 'mechanical':
          cause = '車両故障'
          break

        case 'enter-tracks':
          cause = '人立ち入り'
          break

        case 'patient':
          cause = '急病人'
          break
      }
      return cause
    }
  }
}
</script>
