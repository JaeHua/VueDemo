<template>
  <el-row :gutter="20">
<!--    布局对齐tips-->
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="15"><div class="grid-content ep-bg-purple" />
      <img src="@/assets/logo.png" width="15%" style="margin-left: 21%">
      <el-card style="max-width: 500px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 20px;margin-left: 27%;font-weight: bold;color: black;">Create your account</span>
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
          <el-form-item label="用户名" prop="name" >
            <el-input v-model="ruleForm.name" placeholder="选填" />
          </el-form-item>
          <el-form-item label="QQ号" prop="telephone" >
            <el-input v-model.number="ruleForm.telephone" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="">
            <el-input
                v-model="ruleForm.vCode"
                type="number"
                autocomplete="off"
                style="width: 40%"
            />
            <el-button
                type="primary"
                :disabled="disableResend"
                @click="submitVerify"
            >
              <span v-if="disableResend">
                {{ countdown }}s
              </span>
              <span v-else>
                Send
              </span>
            </el-button>
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
import { useStore, } from 'vuex'
import sendVerifyCode from '@/service/emailService'
import verifyTheCode from '@/service/emailService'

const ruleFormRef = ref<FormInstance>()

//QQ验证
const checkTelephone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入QQ号'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      value = value + '' //转变为字符串
      if (value.length < 6 || value.length>11) {
        // console.log("length:"+value.length)
        callback(new Error('QQ格式错误'))
      } else {
        callback()
      }
    }
  }, 100)
}

//密码验证
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
//密码重复验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

//验证验证码
const checkvCode = (rule: any, value: any, callback: any) =>{
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.length !== 6) {
    callback(new Error("验证码应该为6位"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  telephone: '',
  name:'',
  vCode:'',
})

//验证码逻辑
const countdown = ref(0);
const disableResend = ref(false);
let timer = null;

//验证码发送倒计时
const startCountdown = () => {
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
      disableResend.value = false;
    }
  }, 1000);
};

const submitVerify= () => {
  // 发送验证码逻辑
  sendVerifyCode.sendVerifyCode({"mail":ruleForm.telephone.toString()+"@qq.com"})
  // 启动倒计时
  countdown.value = 60;
  disableResend.value = true;
  startCountdown();
};

//验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  telephone: [{ validator: checkTelephone, trigger: 'blur' }],
  name:[{trigger:'blur'}], //trigger之后才能计算值
  vCode:[{validator:checkvCode,trigger:'blur'}]
})

//路由
const router = useRouter()

//vuex中store
const store = useStore()

//提交注册
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      // console.log('user:'+ruleForm.name+' '+ruleForm.telephone+' '+ruleForm.pass)
      //请求
      // console.log("vcode",Vcode.value)

      verifyTheCode.verifyTheCode({"mail":ruleForm.telephone.toString()+"@qq.com","vcode":ruleForm.vCode}).then((response)=>{
        //验证码验证成功
        if (response.status===200)
        {
          const data = {"name":ruleForm.name,"telephone":ruleForm.telephone.toString(),"password":ruleForm.pass}
          //dispatch触发action=>mutation
          store.dispatch('userModule/register',data).then(()=>{
            //跳转主页
            router.replace('home')
          })
              .catch((err)=>{
            (() => {
              ElMessage.error('Ops,'+err.response.data.msg)
            })()

          })
        }else
        {
          (() => {
            ElMessage({
              message: '验证码有误.',
              type: 'warning',
            })
          })()
        }
      })

    } else {
      //数据验证失败的提示
      (() => {
        ElMessage({
          message: 'Warning, the data you input is invalid.',
          type: 'warning',
        })
      })()
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

