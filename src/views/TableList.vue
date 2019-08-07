<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="primary"
          title="Simple Table"
          text="Here is a subtitle for this table"
        >
      <v-menu
        v-model="menu2"
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
            v-model="date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker @change="testA" v-model="date" @input="menu2 = false" color="primary" :show-current="false"       locale="jp-ja"
      :day-format="date => new Date(date).getDate()" :allowed-dates="allowedDate"></v-date-picker>
      </v-menu>
          <v-data-table
            :headers="headers"
            :items="pathList"
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
      date: '',
      maxdate: '',
      menu: false,
      modal: false,
      menu2: false,
pathList: [],
    headers: [
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Country',
        value: 'country'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
      {
        sortable: false,
        text: 'Salary',
        value: 'salary'
        //align: 'right'
      }
    ]
  }),
  created(){
this.testB()
  },
  beforeUpdate(){
    this.testA()
  },
  methods: {
    testA(){
    var cityRef = db.collection('trainPath').doc(this.date);
    cityRef.get()
      .then(doc => {
        this.pathList = doc.data().pathData
      })
      .catch(err => {
        console.log('Error getting document', err);
      })
    },
    allowedDate: function (val) {
      // 今日～100日後までを選べるようにする
      let startday = new Date('2019-07-06')
      let today = new Date(this.maxdate)
      return startday <= new Date(val) && new Date(val) <= today
    },
    testB(){
db.collection("trainPath").orderBy("timestamp", "desc").limit(1)
  .get()
  .then((querySnapshot) => {
     querySnapshot.forEach( (doc) => {
       var self = this
      self.date = doc.id
      self.maxdate = doc.id
     });
  })
  .catch( (error) => {
     console.log(`データの取得に失敗しました (${error})`);
  });
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
