<template>
  <el-row :gutter="20">
    <!--    布局对齐tips-->
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="17"><div class="grid-content ep-bg-purple" />
      <el-card style="max-width: 600px">
        <template #header>
          <div class="card-header">
            <el-text tag="b" size="large">登陆</el-text>
          </div>
        </template>
        <el-form
            ref="ruleFormRef"
            style="max-width: 100%"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
        >

          <el-form-item label="Telephone" prop="telephone" >
            <el-input v-model.number="ruleForm.telephone" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
        <template #footer>没有账号？ <el-link type="primary" href="/register">前往注册</el-link></template>
      </el-card>
    </el-col>

  </el-row>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {useStore} from "vuex";
const ruleFormRef = ref<FormInstance>()

const checkTelephone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the telephone'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      value = value + '' //转变为字符串
      if (value.length != 11) {
        // console.log("length:"+value.length)
        callback(new Error('电话格式错误'))
      } else {
        callback()
      }
    }
  }, 100)

}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (value.length < 6) {
      // console.log("length:"+value.length)
      callback(new Error('密码不得少于六位'))
    } else {
      callback()
    }
  }
}

const ruleForm = reactive({
  pass: '',
  telephone: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  telephone: [{ validator: checkTelephone, trigger: 'blur' }],
})
const router = useRouter()
const store = useStore()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      // console.log('user:'+ruleForm.name+' '+ruleForm.telephone+' '+ruleForm.pass)
      //请求

      const data = {"telephone":ruleForm.telephone.toString(),"password":ruleForm.pass}
      //dispatch触发action=>mutation
      store.dispatch('userModule/login',data).then(()=>{
        //跳转主页
        router.replace('home')
      }).catch((err)=>{
            (() => {

              ElMessage.error('Oops,'+err.response.data.msg)
            })()
          })
    } else {
      //数据验证失败的提示
      (() => {
        ElMessage({
          message: 'Warning, the data you input is invalid.',
          type: 'warning',
        })
      })()

      // throw new Error('Validation failed')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

