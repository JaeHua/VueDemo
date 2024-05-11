
<template>
  <div v-if="userInfo">hi,{{userInfo.name}}</div>
  hi
</template>
<script setup>
import { useStore } from 'vuex'
import {computed} from "vue";
const store = useStore()
const userInfo = computed(()=>{
  // return JSON.parse(storageService.get(storageService.USER_INFO))
  return store.state.userModule.userInfo
})
</script>

<style scoped>

</style>