<script setup>
import Navbar from "@/views/layout/Navbar.vue";

</script>

<template>
  <Navbar v-if="$route.meta.showNav" />

  <router-view></router-view>

</template>

<style scoped>

</style>
