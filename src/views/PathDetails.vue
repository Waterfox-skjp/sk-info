<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout column>
      <v-flex xs12>
        <material-card
          color="primary"
          title="運用詳細"
          text="運用の詳細な時間を確認することができます"
        >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6 md2>
                <v-select
                  v-model="pathType"
                  :items="pathTypeSelect"
                  item-text="text"
                  item-value="value"
                  label="運用タイプ"
                ></v-select>
              </v-flex>
              <v-flex xs6 md2>
                <v-select
                  v-model="pathNumber"
                  :items="pathSelect()"
                  label="運用番号"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <img :src="'/img/path-sheet/'+pathType+'_'+pathNumber+'.png'" alt="" class="sheet-img">
              </v-flex>
            </v-layout>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      pathType: 'weekday',
      pathTypeSelect: [
        { text: '平日', value: 'weekday' },
        { text: '土休日', value: 'holiday' }
      ],
      pathNumber: '801'
    }
  },
  methods: {
    pathSelect(){
      var x = []
      if(this.pathType == 'weekday'){
        x = ['801','501','702','503','704','505','706','708','507','710','712','551','553','714','202','555','716','557','718','559','720','561','722','724']
      }else{
        x = ['801','501','702','503','704','505','706','708','507','509','710','511','513','202']
      }
      return x
    }
  }
}
</script>

<style lang="scss">
  .sheet-img { margin: 0 auto; display: block; max-width: 1050px; width: 100%; }
</style>