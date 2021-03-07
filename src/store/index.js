import Vue from 'vue'
import Vuex from 'vuex'
import BooksQuery from '@/graphql/queries/Books.gql'
import GenresQuery from '@/graphql/queries/Genres.gql'
import { apolloClient } from '../vue-apollo';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    genres: [],
    books: []
  },
  mutations: {
    setGenres(state, genres) {
      state.genres = genres
    },
    setBooks(state, books) {
      state.books = books
    }
  },
  actions: {
    async getGenres(context) {
      const genreData = await apolloClient.query({ query: GenresQuery })
      const genres = genreData.data.genres
      context.commit('setGenres', genres)
    },
    async getBooks(context) {
      const booksData = await apolloClient.query({query: BooksQuery})
      const books = booksData.data.books
      context.commit('setBooks', books)
    }
  },
  getters: {
    genres(state) {
      return state.genres
    },
    books(state) {
      return state.books
    }
  },
  modules: {
  }
})
