<script setup>
import Navbar from "@/views/layout/Navbar.vue";
import Welcome from "@/views/Welcome.vue";
</script>

<template>
  <Navbar v-if="$route.meta.showNav" />
  <router-view></router-view>
</template>

<style scoped>

</style>
