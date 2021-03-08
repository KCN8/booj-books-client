<template>
  <v-card class="mx-auto pa-8 mt-8" max-width="500">
  <v-card-title class="pa-0">Add your new book</v-card-title>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="author"
      :rules="authorRules"
      label="Author"
      required
    ></v-text-field>

    <v-text-field
      v-model="image"
      label="Link for an image?"
    ></v-text-field>

    <v-text-field
      v-model="link"
      label="Link to a place to purchase?"
    ></v-text-field>

    <v-text-field
      v-model="description"
      label="Description?"
    ></v-text-field>

    <v-select
      v-model="select"
      :items="genres"
      item-text="genre"
      item-value="id"
      label="Genre"
    ></v-select>
    
    <v-checkbox
      v-model="featured"
      label="Make this a featured book?"
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="submit"
    >
      Submit
    </v-btn>

    <v-btn
      outlined
      color="primary"
      class="mr-4"
      @click="cancel"
    >
      Cancel
    </v-btn>
  </v-form>
  </v-card>
</template>

<script>

  export default {
    data: () => ({
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
      ],
      author: '',
      authorRules: [
        v => !!v || 'Author is required',
      ],
      image: '',
      link: '',
      description: '',
      select: { genre: null, id: null },
      genres: [
        { genre: 'Mysteries & Thrillers', id: 1 },
        { genre: 'Science Fiction', id: 2 },
        { genre: 'Fantasy', id: 3 },
        { genre: 'Technology', id: 4 },
        { genre: 'History', id: 5 },
        { genre: 'Business', id: 6 },
      ],
      featured: false,
    }),

    methods: {
      submit() {
        if (this.valid) {
          const book = {
            title: this.title,
            author: this.author,
            image: this.image,
            link: this.link,
            description: this.description,
            featured: this.featured,
            genre_id: this.select
          }
          this.$store.commit('addBook', book)
        }
        this.$router.push('/')
      },
      cancel () {
        this.$router.push('/')
      }
    },
  }
</script>