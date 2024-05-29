<template>
  <el-dialog v-model="vis" title="修改密码">
    <div>
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.rePassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="confirmHandle" type="primary">提交</el-button>
      </el-form-item>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
import {updatePassword} from "@/api/user.ts";

type Prop = {
  visible: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['update:visible'])
const vis = computed({
  get() {
    return props.visible
  },
  set(){
    emits('update:visible', false)
  }
})

const form = ref({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})

const confirmHandle  = async () =>{
  const {oldPassword, newPassword, rePassword} = form.value
  if(!newPassword || !oldPassword){
    ElMessage.warning('密码不能为空')
    return
  }
  if(newPassword != rePassword){
    ElMessage.warning('新密码两次输入不一致')
    return
  }

  await updatePassword({oldPassword, newPassword})
  ElMessage.success('修改成功')

}

</script>

<style lang="scss" scoped>

</style>
