<template>
    <div class="fill-height fixed">
        <v-list dense>
            <v-subheader>GENRES</v-subheader>
            <v-list-item-group>
                <v-list-item>
                <v-list-item-content v-on:click="$emit('filter-books', 'all')">
                    <v-list-item-title v-text="'All Books'"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                <v-list-item>
                <v-list-item-content v-on:click="$emit('filter-books', 'featured')">
                    <v-list-item-title v-text="'Featured Books'"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="genre in genres" :key="genre.id">
                <v-list-item-content v-on:click="$emit('filter-books', genre.id)">
                    <v-list-item-title v-text="genre.name"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>

export default {
    name: 'GenresComponent',
    props: {
        genres: {}
    }
}
</script>

<style scoped>
    .fixed {
        position: fixed;
        width: 25%;
    }
</style>