<template>
  <el-row :gutter="20">
<!--    布局对齐tips-->
    <el-col :span="7"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="17"><div class="grid-content ep-bg-purple" />
      <el-card style="max-width: 600px">
        <template #header>
          <div class="card-header">
            <span>注册</span>
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
          <el-form-item label="Name" prop="name" >
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="Telephone" prop="telephone" >
            <el-input v-model.number="ruleForm.telephone" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
        <template #footer>已有账号？ <el-link type="primary" href="/login">前往登陆</el-link></template>
      </el-card>
    </el-col>

  </el-row>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// import API from "../plugins/axiosInstance"
import axios from 'axios'
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
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  telephone: '',
  name:'',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  telephone: [{ validator: checkTelephone, trigger: 'blur' }],
  name:[{trigger:'blur'}], //trigger之后才能计算值
})
const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      // console.log('user:'+ruleForm.name+' '+ruleForm.telephone+' '+ruleForm.pass)
      //请求
      const api = 'http://localhost:3344/api/auth/register'
      const data = {"name":ruleForm.name,"telephone":ruleForm.telephone.toString(),"password":ruleForm.pass}
      axios.post(api,data,{
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }})
          .then((res)=>{
            //保存token
            console.log(res.data)
            router.replace('home')

          })
          .catch((err)=>{
            (() => {
              ElMessage.error('Oops,'+err.response.data.msg)
            })()
            // console.log("error:"+JSON.stringify(err.response.data.msg))
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

