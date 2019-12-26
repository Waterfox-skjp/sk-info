<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://twitter.com/Waterfox_skjp/"
        target="_blank">Waterfox</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data(){
    return {
      links: [
        { name: 'shin-kei-sei Web', Link: 'https://www.shinkeisei.co.jp/' }
      ]
    }
  }
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
