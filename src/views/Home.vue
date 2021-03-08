<template>
  <v-container class="grey lighten-5 fill-height">
    <v-row class="align-self-start">
      <v-col class="col-4">
        <GenresComponent :genres="genres"></GenresComponent>
      </v-col>
      <v-col class="col-8">
        <BooksComponent></BooksComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'
import GenresComponent from '@/components/Genres.vue'
import BooksComponent from '@/components/Books.vue'

export default {
  name: 'Home',
  components: {
    GenresComponent,
    BooksComponent
  },
  computed: mapGetters([
    'genres'
  ]),
  data() {
    return {
      selectedGenre: 'featured',
    }
  },
  async mounted() {
    this.$store.dispatch('getGenres')
  }
}
</script>
