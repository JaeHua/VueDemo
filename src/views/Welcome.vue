<script setup>
import {ref, onMounted, watch, onBeforeUnmount} from 'vue'
import { DArrowRight } from '@element-plus/icons-vue'

const message = ref('')
const index = ref(0)
const showButton = ref(false)

const greetingMessage = '欢迎访问JaeHua的测试网站，这是一个利用elementUi+vue3+Gin搭建的demo项目，功能会逐步完善，还在初步学习搭建阶段!'

function typeWriter() {
  if (index.value < greetingMessage.length) {
    message.value += greetingMessage.charAt(index.value)
    index.value++
    setTimeout(typeWriter, 100)
  } else {
    showButton.value = true // 当文字打印完毕时,显示按钮
  }
}

watch(message, () => {
  if (message.value.length === greetingMessage.length) {
    showButton.value = true
  }
})

onMounted(() => {
  typeWriter()
    //背景设置
    document
        .querySelector("body")
        .setAttribute("style", "background-color: #e8f6ff");


    //背景移除
    onBeforeUnmount(() => {
      document.querySelector("body").removeAttribute("style")
    })

})
</script>

<template>
  <h1 style="text-align: center">DemoProject</h1>

  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="9"><div class="grid-content ep-bg-purple" /><div id ="home">{{ message }}</div></el-col>
    <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
  <br>
  <el-row :gutter="20">
    <el-col :span="11"><div class="grid-content ep-bg-purple" /></el-col>
    <el-button v-if="showButton" size="large"  color="#626aef" @click="$router.push({name:'Home'})">Go Home<el-icon><DArrowRight /></el-icon></el-button>
    <el-col :span="1"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
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