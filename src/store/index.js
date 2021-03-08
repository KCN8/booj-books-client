import Vue from 'vue'
import Vuex from 'vuex'
import BooksQuery from '@/graphql/queries/Books.gql'
import GenresQuery from '@/graphql/queries/Genres.gql'
import CreateBook from '@/graphql/mutations/CreateBook.gql'
import UpdateBook from '@/graphql/mutations/UpdateBook.gql'
import DeleteBook from '@/graphql/mutations/DeleteBook.gql'
import { apolloClient } from '../vue-apollo';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    genres: [],
    books: [],
    selectedGenreId: Number,
    
  },
  mutations: {
    setGenres(state, genres) {
      state.genres = genres
    },
    setBooks(state, books) {
      state.books = books
    },
    addBook(state, book) {
      apolloClient.mutate({
          mutation: CreateBook,
          variables: {
            title: book.title,
            author: book.author,
            image: book.image,
            link: book.link,
            description: book.description,
            featured: book.featured,
            genre_id: book.genre_id
          }
      })
      state.books.push(book)
    },
    async updateBook(state, book) {
      const updatedBookData = await apolloClient.mutate({
        mutation: UpdateBook,
        variables: {
            id: book.id,
            title: book.title,
            author: book.author,
            image: book.image,
            link: book.link,
            description: book.description,
            featured: book.featured,
            genre_id: book.genre_id
        }
      })
      const oldBook = state.books.find(b => b.id === book.id)
      const index = state.books.indexOf(oldBook)
      const updatedBook = updatedBookData.data.updateBook
      updatedBook.id = book.id
      Vue.set(state.books, index, updatedBook)
    },
    deleteBook(state, bookId) {
      apolloClient.mutate({
          mutation: DeleteBook,
          variables: {
              id: bookId
          }
      })
      state.books = state.books.filter(book => book.id !== bookId)
    }
  },
  actions: {
    async getGenres(context) {
      const genreData = await apolloClient.query({ query: GenresQuery })
      const genres = genreData.data.genres
      context.commit('setGenres', genres)
    },
    async getBooks(context, selectedGenreId) {
      const booksData = await apolloClient.query({query: BooksQuery})
      const unfilteredBooks = booksData.data.books
      let books
      if (selectedGenreId === 0) {
        books = unfilteredBooks
      } else if (selectedGenreId === -1) {
        books = unfilteredBooks.filter(book => book.featured)
      } else {
        books = unfilteredBooks.filter(book => +book.genre.id === selectedGenreId)
      }
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
