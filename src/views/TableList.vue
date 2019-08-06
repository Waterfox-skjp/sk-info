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
      :day-format="date => new Date(date).getDate()" min="2019-07-06"></v-date-picker>
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
              <td>{{ item.pathName }}</td>
              <td>{{ item.trainNum }}</td>
              <td></td>
              <td class="text-xs-right"></td>
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
      date: new Date().toISOString().substr(0, 10),
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
        value: 'salary',
        align: 'right'
      }
    ]
  }),
  mounted(){
    this.testA()
  },
  methods:{
    testA(){
    var cityRef = db.collection('trainPath').doc(this.date);
    cityRef.get()
      .then(doc => {
        this.pathList = doc.data().pathData
      })
      .catch(err => {
        console.log('Error getting document', err);
      })
    }
  }
}
</script>
