<template>
    <el-row class="login-page">
      <!-- <el-col :span="14" class="bg"></el-col> -->
      <el-col :span="24"  class="form">
        <div class="form-box" style="width: 30%">
          <!-- 登录 -->
          <el-form ref="form" :model="formModel" :rules="rules" size="large" autocomplete="off">
            <el-form-item>
              <h1 style="color: aliceblue;margin-bottom: 30px">分布式光伏电站发电量检测管理系统</h1>
            </el-form-item>
<!--            <el-form-item>-->
<!--              <h1>登录</h1>-->
<!--            </el-form-item>-->
            <el-form-item prop="username">
              <el-input
                  prefix-icon="User"
                  v-model="formModel.username"
                  placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  name="password"
                  prefix-icon="Lock"
                  type="password"
                  v-model="formModel.password"
                  placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox v-model="oRemember">记住我</el-checkbox>
                <!-- <el-link type="primary" :underline="false">忘记密码？</el-link> -->
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="button" type="primary" @click="confirm" auto-insert-space>登录</el-button>
            </el-form-item>
            <el-form-item class="flex">
              <!--            <el-link  :underline="false" @click="isRegister = true"> 注册 → </el-link>-->
            </el-form-item>
          </el-form>
        </div>

      </el-col>
    </el-row>
  </template>
<script lang="ts" setup>
import {User, Lock, Message} from '@element-plus/icons-vue'
import {onMounted, ref, watch} from 'vue'
// import type { LoginForm } from '@/type/user/loginType'
// import { userRegisterService, userLoginService } from '@/api/user'
// import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import {login, getUserInfo} from "@/api/user.ts";
import {ElMessage} from "element-plus";
import {setToken} from "@/utils/tokenTool.ts";
const isRegister = ref(false)


const oRemember = ref(false)



const formModel = ref({
    username: '',
    password: '',
    repassword: ''
  }
)

onMounted(() => {
  const formStr = localStorage.getItem('acc-form')
  //atob() 方法，可用于将数据编码为 Base64 或从 Base64 解码。
  if(formStr){
    oRemember.value = true
    const form = JSON.parse(formStr)
    formModel.value.username = form.username
    formModel.value.password =  atob(form.password)
  }
})
const form = ref()
//校验时机
//1.required：非空校验 message：提示信息 trigger：触发时机
//2.长度校验 min：xx ,max: xx
//3.正则校验 pattern: 正则规则
//4.自定义校验 => 自己写逻辑校验（检验函数）
//     validator: (rule, value, callback)
//   （1）rule 当前校验规则相关的信息
//   （2）value 所校验的表单元素目前的表单值
//   （3）callback 无论成功还是失败，都需要 callback 回调
//            - callback() 校验成功
//            - callback(new Error(错误信息)) 校验失败
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^\S{5,15}$/,
      message: '密码必须是5-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^\S{5,15}$/,
      message: '密码必须是5-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: ( value: string, callback: any) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  await form.value.validate()
//   await userRegisterService(formModel.value)
//   ElMessage.success('注册成功')
  isRegister.value = false
}
// const useUser = useUserStore()
const router = useRouter()
const confirm = async () => {
  // btoa() 和 atob() 方法，可用于将数据编码为 Base64 或从 Base64 解码。
  if(oRemember.value){
    const form = JSON.stringify({
      password: btoa(formModel.value.password),
      username: formModel.value.username
    })
    localStorage.setItem('acc-form', form)
  }else{
    localStorage.removeItem('acc-form')
  }
  try {
     await form.value.validate()
    const res = await login({username: formModel.value.username, password: formModel.value.password})
    // console.log(res)
    if(res.data){
      setToken(res.data)
    }

    const info: any = await getUserInfo();
    console.log(info)
    const{ isAdmin } = info?.data?.permission
    if (!isAdmin){
      // throw Error('访问失败')
      router.push('/home')
    }else {
      router.push('/admin')
    }
    ElMessage.success('登录成功')
  } catch (err) {
    ElMessage.error( err)
  }
}


//监视切换时清空表单
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
});
</script>
<style lang="scss" scoped>
.login-page {
  height: calc(100vh - 20px);
  background-color: #fff;
  .bg {
    background:
      url('@/assets/R-C.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    background:
      url('@/assets/solar.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    align-items: center;

    .form-box{
      padding: 30px;
      border-radius: 10px;
      backdrop-filter: blur(6px);
      min-width: 450px;
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 5px 15px rgba(20, 20, 20, 0.2);

    }

    .el-form{
        margin: auto;
    }
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
