
<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="@/assets/img.png"
          alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" v-if="$route.name!='Register'" @click="$router.push({name:'Register'})">注册</el-menu-item>
    <el-menu-item index="1" v-if="$route.name!='Login'" @click="$router.push({name:'Login'})">登陆</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1" >个人中心</el-menu-item>
      <el-menu-item index="2-2" >登出</el-menu-item>
<!--      <el-menu-item index="2-3">item three</el-menu-item>-->

    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
