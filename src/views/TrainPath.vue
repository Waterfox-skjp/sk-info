<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card
          color="primary"
          title="運用一覧"
          text="現在・過去の運用を一覧で見ることができます"
        >
          <v-layout justify-space-between wrap>
            <v-flex md3 xs6>
              <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="setDate"
                    label="日付を選択してください"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  @change="getData"
                  v-model="setDate"
                  @input="datePicker = false"
                  color="primary"
                  :show-current="false"
                  locale="jp-ja"
                  :day-format="date => new Date(date).getDate()"
                  :allowed-dates="allowedDate"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex md3 xs6>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items="pathList"
            :search="search"
            :loading="pathList.length == 0"
            hide-actions
          >
            <template v-slot:progress>
              <v-progress-linear
                :height="5"
                indeterminate
              />
            </template>
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-secondary text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.pathNum }}</td>
              <td>{{ item.pathType | pathTypeSet }}</td>
              <td>{{ item.trainNum }}<template v-if="item.trainNum">F</template></td>
              <td><template v-if="item.trainType"><img :src="iconDisplay(item.trainType,item.trainNum)" :alt="item.trainType" class="ico-train"><span class="train-type-txt">{{ item.trainType }}形</span></template></td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
  data(){
    return {
      setDate: '',
      maxDate: '',
      search: '',
      datePicker: false,
      pathList: [],
      headers: [
        {
          sortable: false,
          text: '列車番号',
          value: 'pathNum'
        },
        {
          sortable: false,
          text: '運用形態',
          value: 'pathType'
        },
        {
          sortable: false,
          text: '編成',
          value: 'trainNum'
        },
        {
          sortable: false,
          text: '形式',
          value: 'trainType'
          //align: 'right'
        }
      ]
    }
  },
  created(){
    this.getLastDate()
  },
  beforeUpdate(){
    this.getData()
  },
  methods: {
    getData(){
      var trainPath = db.collection('trainPath').doc(this.setDate);
      trainPath.get().then(doc => {
        this.pathList = doc.data().pathData
      })
      .catch(err => {
        console.log('データの取得に失敗しました', err)
      })
    },
    allowedDate(val) { // 日付ピッカーの範囲を決定
      let startday = new Date('2019-11-01')
      let endDay = new Date(this.maxDate)
      return startday <= new Date(val) && new Date(val) <= endDay
    },
    getLastDate(){ //
      var trainPath = db.collection("trainPath").orderBy("timestamp", "desc").limit(1)
      var self = this
      trainPath.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          self.setDate = doc.id // ピッカー用の日付
          self.maxDate = doc.id // 存在する最新の日付
        })
      })
      .catch(err => {
        console.log('データの取得に失敗しました', err)
      })
    },
    iconDisplay(trainType,trainNum){
      // 8512Fの時だけアイコンを変える
      if(trainNum == 8512){
        trainType = 8512
      }
      return '/img/train-icon/' + trainType + '.png'
    }
  },
  filters: {
    pathTypeSet(x){
      var text
      if(x == 'inline'){
        text = '線内'
      }else if(x == 'direct'){
        text = '直通'
      }else if(x == 'testrun'){
        text = '試運転'
      }
      return text
    }
  }
}
</script>

<style lang="scss">
  .ico-train { height: 2.2em; vertical-align: middle; }
  .train-type-txt { margin-left: .5em; }
  .v-progress-linear { margin: 0; }
  @media only screen and (max-width:640px){
    .train-type-txt { display: none; }
  }
</style>
