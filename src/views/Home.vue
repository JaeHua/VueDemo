<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')
const index = ref(0)

const greetingMessage = '欢迎访问JaeHua的测试网站，这是一个利用elementUi+vue3+Gin搭建的demo项目，还在初步测试阶段!'

function typeWriter() {
  if (index.value < greetingMessage.length) {
    message.value += greetingMessage.charAt(index.value)
    index.value++
    setTimeout(typeWriter, 100)
  }
}

onMounted(() => {
  typeWriter()
})
</script>

<template>


  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="9"><div class="grid-content ep-bg-purple" /><div id ="home">{{ message }}</div></el-col>
    <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>


</template>

<style scoped>
#home{
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(to right, #ff00cc, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


</style>

