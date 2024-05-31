<template>
<div class="user-create-page">


  <div class="page-header"> <el-button @click="$router.back()" class="back" type="primary"><el-icon><ArrowLeft/></el-icon></el-button>创建用户</div>
  <el-divider/>
  <el-form ref="formRef" :rules="rules" label-position="right" label-width="80px" :model="formData">
    <el-form-item label="账号">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="登录密码">
      <el-input v-model="formData.password" type="password" show-password></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="formData.contact"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formData.address"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmHandle">提交</el-button>
      <el-button type="info" @click="resetHandle">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {addUser} from "@/api/suer.ts";
import {ElMessage, FormInstance, FormRules} from "element-plus";
const route = useRoute()
const router= useRouter()

// :TODO 当userId存在的时候为编辑,不存在为添加
const userId = route.query.id;

/**
 *  "address": "string",
 *   "contact": "string",
 *   "password": "string",
 *   "username": "string"
 */
const baseForm = {
  username: '',
  password: '',
  concat: '',
  contact: '',
  address: ''
}

type RuleForm =  {
  password: string,
}
const formRef = ref()
const rules =reactive<FormRules>(
    {
      password: [
        {min: 6, max: 32, trigger: 'blur', message: '密码长度需在6到32间' }
      ]
    }
)
const formData=  ref({...baseForm})

// 提交
const confirmHandle = async () => {
  if(!formRef.value) return

  await (formRef.value as FormInstance).validate(async (valid, fields) => {
    if (valid) {
      // console.log('submit!')
      try {
        const res: any =   await addUser(formData.value)
        res.code === 200 && ElMessage.success('添加成功')
        router.back()
      }catch (err){

      }
    }else {
      ElMessage('表单校验失败，请按要求填写表单')
    }
  })

}

// 重置
const resetHandle = () => {
  formData.value = {...baseForm}
}
</script>
<style lang="scss" scoped>
  .user-create-page{
    .back{
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
</style>
