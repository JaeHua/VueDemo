
<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" @click="$router.replace('home')">
      <img
          style="width: 100px"
          src="@/assets/img.png"
          alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />

    <el-menu-item index="1" v-if="$route.name!='Register'&&!userInfo" @click="$router.push({name:'Register'})">注册</el-menu-item>
    <el-menu-item index="1" v-if="$route.name!='Login'&&!userInfo" @click="$router.push({name:'Login'})">登陆</el-menu-item>
    <el-sub-menu v-if="userInfo" index="2" >
      <template #title >{{userInfo.name}}</template>

      <el-menu-item index="2-1" >个人中心</el-menu-item>
      <el-menu-item index="2-2" >登出</el-menu-item>
<!--      <el-menu-item index="2-3">item three</el-menu-item>-->

    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import storageService from '@/service/storageService';
import { useStore } from 'vuex'
import {mapState} from "vuex";
import {computed, ref} from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useStore()
const userInfo = computed(()=>{
  // return JSON.parse(storageService.get(storageService.USER_INFO))
  return store.state.userModule.userInfo
})
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
