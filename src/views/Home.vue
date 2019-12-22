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
            準備中です
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
            <v-layout wrap align-center>
              <v-flex md12>
                <v-select :items="locationSelect" item-value="value" item-text="label" v-model="location"  label="地域選択" @change="changeLocation"></v-select>
              </v-flex>
              <v-flex xs12 md6 class="text-xs-center">
                <div>
                  <img :src="'/img/weather-icon/' + today.icon + '.svg'" class="wether-icon">
                </div>
                <div>
                  <div class="display-1">{{ today.condition }}</div>
                  <div class="display-3">{{ today.temp | round('10') }} <span class="display-1">℃</span></div>
                </div>
              </v-flex>
              <v-flex xs12 md6>
                <ul class="weather-info">
                  <li>最高気温：<span class="title">{{ today.tempMax }}</span> ℃</li>
                  <li>最低気温：<span class="title">{{ today.tempMin }}</span> ℃</li>
                  <li>湿度：<span class="title">{{ today.humidity }}</span> %</li>
                  <li>風速：<span class="title">{{ today.wind }}</span> m/s</li>
                  <li>気圧：<span class="title">{{ today.pressure }}</span> hPa</li>
                </ul>
              </v-flex>
              <v-flex xs12>
                <v-data-iterator
                  :items="forecast"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  content-tag="v-layout"
                  row
                  wrap
                >
                  <v-flex
                    slot="item"
                    slot-scope="props"
                    xs6
                    sm4
                    md2
                  >
                    <v-card>
                      <v-card-title><h4>{{ props.item.dt_txt + 'Z' | date }}</h4></v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <div class="text-xs-center py-3"><img :src="'/img/weather-icon/' + props.item.weather[0].icon + '.svg'" :alt="props.item.weather[0].main" class="list-icon"><br>{{ props.item.weather[0].main }}</div>
                        <v-list-tile>
                          <v-list-tile-content>気温:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.main.temp | round('10') }} ℃</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>湿度:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.main.humidity }} %</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>風速:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.wind.speed | round('10') }} m/s</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>気圧:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.main.pressure | round('1') }} hPa</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-data-iterator>
              </v-flex>
            </v-layout>
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
import dayjs from 'dayjs'

export default {
  data () {
    return {
      infoJson: '',
      alertColor: '',
      alertIcon: '',
      location: 'Matsudo', // 地方選択 初期値
      locationSelect: [ // 地方選択
        { value: 'Matsudo', label: '松戸（Tokyo）' },
        { value: 'Funabashi', label: '船橋（Sapporo）' },
        { value: 'Narashino', label: '習志野（Nagoya）' }
      ],
      today: {
        city: '', // 都市名
        temp: '', // 現在気温
        pressure: '', // 気圧
        humidity: '', // 湿度
        tempMin: '', // 最低気温
        tempMax: '', // 最高気温
        wind: '', // 風速
        condition: '', // コンディション
        icon: 'processing' // アイコン
      },
      forecast: [], // 3時間ごとの天気を格納する配列
      rowsPerPageItems: [6, 12, 18], // リスト表示個数
      pagination: {
        rowsPerPage: 6 // リスト表示個数 初期値
      }
    }
  },
  mounted: function () {
    this.changeLocation()
  },
  methods: {
    changeLocation() {
      let apiKey = 'd502c97651f307ef988eaf7f53d7e633'
      // 現在の天気を取得するAPI
      const apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.location + ',jp&units=metric&appid=' + apiKey
      // 3時間ごとの天気を取得するAPI
      const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.location + ',jp&units=metric&appid=' + apiKey
      this.$http.get(apiWeather)
        .then((response) => {
          this.today.city = response.data.name
          this.today.temp = response.data.main.temp
          this.today.pressure = response.data.main.pressure
          this.today.humidity = response.data.main.humidity
          this.today.tempMin = response.data.main.temp_min
          this.today.tempMax = response.data.main.temp_max
          this.today.wind = response.data.wind.speed
          this.today.condition = response.data.weather[0].main
          this.today.icon = response.data.weather[0].icon
        })
        .catch((error) => {
          console.log(error)
        })
      this.$http.get(apiForecast)
        .then((response) => {
          this.forecast = response.data.list
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
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
      return dayjs(x).format('YYYY/MM/DD HH:mm')
    },
    // 指定の位で四捨五入するフィルター
    round(value, size) {
      return Math.round(value * size) / size
    },
    date(x) {
      return x = dayjs(x).format('D日 H時')
    }
  }
}
</script>

<style scoped lang="scss">
  .wether-icon { width: 30%; }
  .weather-info {
    padding: 0;
    list-style-type: none;
    li { padding: .5em 1em;
      &:not(:last-child) {
        border-bottom: 1px solid #CCC;
      }
    }
  }
  .list-icon { width: 40%; }
</style>