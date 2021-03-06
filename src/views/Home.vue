<template>
  <v-container class="grey lighten-5 fill-height">
    <v-row class="align-self-start">
      <v-col class="col-4">
        <GenresComponent v-on:filter-books="filterBooks($event)" :genres="genres"></GenresComponent>
      </v-col>
      <v-col class="col-8">
        <BooksComponent v-on:delete-book="deleteBook($event)" :books="books"></BooksComponent>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ bookDeletedText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import GenresQuery from '@/graphql/queries/Genres.gql'
import BooksQuery from '@/graphql/queries/Books.gql'
import DeleteBook from '@/graphql/mutations/DeleteBook.gql'
import GenresComponent from '@/components/Genres.vue'
import BooksComponent from '@/components/Books.vue'

export default {
  name: 'Home',
  components: {
    GenresComponent,
    BooksComponent
  },
  data() {
    return {
      selectedGenre: 'featured',
      genreData: {},
      genres: [],
      booksData: {},
      books: [],
      deletedBook: {},
      snackbar: false,
      timeout: 2000,
      bookDeletedText: 'Your book has been deleted'
    }
  },
  methods: {
    filterBooks(filter) {
      this.books = this.booksData.data.books
      if (filter === 'all') {
        this.books = this.booksData.data.books
      } else if (filter === 'featured') {
        this.books = this.books.filter(book => book.featured)
      } else {
        this.books = this.books.filter(book => book.genre.id === filter)
      }
      window.scrollTo(0,0)
    },
    async getBooks() {
      this.booksData = await this.$apollo.query({query: BooksQuery})
      this.books = this.booksData.data.books
    },
    async deleteBook($event) {
      this.deletedBook = await this.$apollo.mutate({
          mutation: DeleteBook,
          variables: {
              id: $event
          }
      })
      this.books = this.booksData.data.books.filter(book => book.id !== $event)
      this.booksData.data.books = this.books
      window.scrollTo(0,0)
      this.snackbar = true
    }
  },
  async mounted() {
    this.genreData = await this.$apollo.query({query: GenresQuery})
    this.genres = this.genreData.data.genres
    this.getBooks()
  }
}
</script>
