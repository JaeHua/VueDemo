<template>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
  <el-col :span="6"><div class="grid-content ep-bg-purple" />
    <el-card id="card" style="max-width: 256px" @click="handleClick">
      <template #header id="title"><el-text tag="b" size="large">GitHub</el-text></template>
      <img
          src="@/assets/github.png"
          style="width: 100%"
      />
      <el-text tag="i">赞一个star吧⭐</el-text>
    </el-card></el-col>
  <el-col :span="6"><div class="grid-content ep-bg-purple" />
    <el-card id="card" style="max-width: 256px">
      <template #header id="title"><el-text tag="b" size="large">Todolist</el-text></template>
      <img
          src="@/assets/todolist.png"
          style="width: 100%"
      />
      <el-text tag="i">What's to plan?⭐</el-text>
    </el-card>

  </el-col>
    <el-col :span="6"><div class="grid-content ep-bg-purple" />
      <el-card id="card" style="max-width: 256px">
        <template #header id="title"><el-text tag="b" size="large">Nothing</el-text></template>
        <img
            src="@/assets/more.png"
            style="width: 100%"
        />
        <el-text tag="i">敬请期待⭐</el-text>
      </el-card>

    </el-col>
  </el-row>
</template>
<script setup>
const handleClick = () =>{
  window.location.href = 'https://github.com/JaeHua';
}
</script>
<style scoped>
#title{
  width: 100%;
  font: bold 14px Arial;
  font-family: 'Helvetica Neue Bold', Helvetica, Arial, sans-serif;
}
#card:hover { cursor: pointer; background-color: #e8f0fe; }
</style>