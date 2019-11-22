<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-layout
      class="fill-height"
      tag="v-list"
      column
    >
      <v-list-tile avatar>
        <v-list-tile-avatar
          color="white"
        >
          <v-img
            :src="logo"
            height="34"
            contain
          />
        </v-list-tile-avatar>
        <v-list-tile-title class="title">
          SK info
        </v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        avatar
        active-class="primary"
        class="v-list-item"
      >
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title
          v-text="link.text"
        />
      </v-list-tile>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    logo: '/img/vuetifylogo.png',
    links: [
      {
        to: '/',
        icon: 'mdi-home',
        text: 'Home'
      },
      {
        to: '/information/',
        icon: 'mdi-information',
        text: 'Information'
      },
      {
        to: '/train-path/',
        icon: 'mdi-train',
        text: 'Train Path'
      },
      {
        to: '/train-mileage/',
        icon: 'mdi-speedometer',
        text: 'Train Mileage'
      },
      // {
      //   to: '/typography/',
      //   icon: 'mdi-format-font',
      //   text: 'Typography'
      // },
      // {
      //   to: '/icons/',
      //   icon: 'mdi-chart-bubble',
      //   text: 'Icons'
      // },
      {
        to: '/maps/',
        icon: 'mdi-google-maps',
        text: 'Maps'
      },
      // {
      //   to: '/notifications/',
      //   icon: 'mdi-bell',
      //   text: 'Notifications'
      // }
    ],
    responsive: false
  }),
  computed: {
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    },
    sidebarOverlayGradiant () {
      return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    div.v-responsive.v-image > div.v-responsive__content {
      overflow-y: auto;
    }
  }
</style>
