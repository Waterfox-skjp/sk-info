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
            hide-actions
          >
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
              <td>{{ item.trainType }}<template v-if="item.trainType">形</template></td>
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
  data: () => ({
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
  }),
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
    allowedDate(val) {
      let startday = new Date('2019-07-06')
      let endDay = new Date(this.maxDate)
      return startday <= new Date(val) && new Date(val) <= endDay
    },
    getLastDate(){
      var trainPath = db.collection("trainPath").orderBy("timestamp", "desc").limit(1)
      var self = this
      trainPath.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          self.setDate = doc.id
          self.maxDate = doc.id
        })
      })
      .catch(err => {
        console.log('データの取得に失敗しました', err)
      })
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
