
<template>
    <!--    布局对齐tips-->
    <el-container class="container">
      <el-header class="_img">
        <h1 >

          <img
              src="@/assets/profile.png"
              style="width: 100px "
          />
        </h1>
      </el-header>
      <el-main class="parent-container">
        <div class="todolist_box">
          <div class="bar-message">
            <div class="bar-message-text">
              我的个人信息🤏🤏
            </div>
          </div>
          <ul class="empty-tips">
            <li>✔️ 用户名:{{userInfo.name}}</li>
            <li>✔️ 电话号码:{{userInfo.telephone}}</li>

            <li>🔒</li></ul>

        </div>
      </el-main>
    </el-container>
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
._img{
  margin:auto;
  animation: slide 2s infinite alternate;
}
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;

}
.todolist_box {
  position: relative;
  background: #fff;
  box-shadow: 4px 4px 0 #33322E;
  border: 2px solid #33322E;
  border-radius: 12px;
  margin: 0;
  padding-top: 0;
  transition: all .5s ease;
  max-width: 100%;
  width: 40%;

  overflow: hidden;
}
.bar-message {
  position: relative;
  display: block;
  align-items: center;
  justify-self: flex-start;
  border-bottom: 2px solid #33322E;

}
.bar-message-text {
  display: inline-block;
  text-align: center;
  font-weight: 600;
  padding: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.empty-tips {
  text-align: left;
  max-width: 480px;
  width: 90%;
  margin: 20px auto 50px 25px ;

  top: 15%;
  left: 2%;
  font-size: 16px;
  color: #606060;
  line-height: 1.6;
  letter-spacing: 1px;
}
ul, li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
@keyframes slide {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
</style>