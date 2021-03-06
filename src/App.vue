<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-title>Booj Books</v-app-bar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn target="_blank" text @click="navigateHome">
        <span class="mr-2">Home</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  methods: {
    navigateHome() {
      this.$router.push('/')
    }
  }
};
</script>
