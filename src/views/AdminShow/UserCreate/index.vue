<template>
<div>


  <div class="page-header">创建用户</div>
  <el-divider/>
  <el-form label-position="right" label-width="80px" :model="formData">
    <el-form-item label="账号">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="formData.contact"></el-input>
    </el-form-item>
    <el-form-item label="登录密码">
      <el-input v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="formData.phone"></el-input>
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
import {ref} from "vue";
import {useRoute} from "vue-router";
import {addUser} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
const route = useRoute()

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
const formData=  ref({...baseForm})

// 提交
const confirmHandle = async () => {
 try {
 const res: any =   await addUser(formData.value)
 res.code === 200 && ElMessage.success('添加成功')
 }catch (err){

 }
}

// 重置
const resetHandle = () => {
  formData.value = {...baseForm}
}
</script>
