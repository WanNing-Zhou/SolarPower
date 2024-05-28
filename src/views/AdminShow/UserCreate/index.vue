<template>

  <h1>用户创建</h1>
  <el-form label-position="right" label-width="80px" :model="formData">
    <el-form-item label="账号">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="formData.name"></el-input>
    </el-form-item>
    <el-form-item label="登录密码">
      <el-input v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="formData.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmHandle">提交</el-button>
      <el-button type="info" @click="resetHandle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()

// :TODO 当userId存在的时候为编辑,不存在为添加
const userId = route.query.id;

const baseForm = {
  username: '',
  password: '',
  name: '',
  phone: '',
  address: ''
}
const formData=  ref({...baseForm})

// 提交
const confirmHandle = () => {
}

// 重置
const resetHandle = () => {
  formData.value = {...baseForm}
}
</script>
