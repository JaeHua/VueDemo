
<template>
  <el-row :gutter="20">
    <!--    布局对齐tips-->
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="12"><div class="grid-content ep-bg-purple" />
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>Profile</span>
          </div>

        </template>
        <el-text>用户名称:<el-text class="mx-1" type="primary">{{userInfo.name}}</el-text></el-text><br>
        <el-text>用户电话:<el-text class="mx-1" type="primary">{{userInfo.telephone}}</el-text></el-text>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { useStore } from 'vuex'
import {computed} from "vue";
const store = useStore()
const userInfo = computed(()=>{
  // return JSON.parse(storageService.get(storageService.USER_INFO))
  return store.state.userModule.userInfo
})
import { ref } from 'vue'
import user from "../store/module/user.js";

const activeName = ref('1')
</script>

<style scoped>

</style>