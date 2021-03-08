<template>
    <div>
        <v-btn color="primary" fab x-small dark class="mb-4" @click="navigateToCreate">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-card v-for="book in books" :key="book.id" class="mb-2 pa-3">
            <v-container>
                <v-row>
                    <v-col class="pa-0">
                        
                        <v-btn
                            :color="book.featured ? 'yellow darken-2' : 'grey lighten-2'"
                            @click="updateFeatured(book.id, book.featured)"
                            icon x-large>
                            <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="col-8 d-flex flex-column">
                        <h3 class="text-truncate">
                            {{ book.title }}
                        </h3>
                        <h4 class="text-truncate">
                            {{ book.author }}
                        </h4>
                        <div class="d-flex">
                            <p class="mt-8">{{ book.description }}</p>
                            <v-btn color="blue-grey darken-2" icon x-small dark class="align-self-end">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col class="col-3">
                        <v-img :src="book.image" contain height="200"></v-img>
                    </v-col>
                </v-row>
                <v-row class="align-self-center">
                    <v-col class="col-10">
                        <v-btn color="success" fab x-small dark @click="navigateToPurchase(book.link)">
                            <v-icon>mdi-currency-usd</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn @click="deleteBook(book.id)" color="error" fab x-small dark>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ bookDeletedText }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'BooksComponent',
    data() {
        return {
            snackbar: false,
            timeout: 2000,
            bookDeletedText: 'Your book has been deleted'
        }
    },
    methods: {
        navigateToCreate() {
            this.$router.push('/add')
        },
        navigateToPurchase(link) {
            window.location.replace(link)
        },
        updateFeatured(id, featured) {
            const book = {
                id: id,
                featured: !featured
            }
            this.$store.commit('updateBook', book)
        },
        deleteBook(bookId) {
            this.$store.commit('deleteBook', bookId)
            window.scrollTo(0,0)
            this.snackbar = true
        }
    },
    mounted() {
        this.$store.dispatch('getBooks', 0)
    },
    computed: mapGetters([
        'books'
    ])
}
</script>