<template>
  <el-dialog v-model="vis" title="修改密码" width="500">
    <div>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input v-model="form.oldPassword" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input v-model="form.newPassword" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword" label="确认密码">
          <el-input v-model="form.rePassword" show-password type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
        <el-button @click="confirmHandle" type="primary">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {computed, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {updatePassword} from "@/api/user.ts";
import {logout} from "@/utils/logout.ts";

type Prop = {
  visible: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['update:visible'])

const rules = reactive<FormRules>({
  oldPassword: [
    {min: 6 ,max: 32, message: '密码长度应在6-32间'}
  ],
  newPassword: [
    {min: 6 ,max: 32, message: '密码长度应在6-32间'}
  ],
  rePassword: [
    {min: 6 ,max: 32, message: '密码长度应在6-32间'}
  ]
})
const formRef = ref<FormInstance>()
const vis = computed({
  get() {
    return props.visible
  },
  set(value){
    emits('update:visible', value)
  }
})

const form = ref({
  oldPassword: '',
  newPassword: '',
  rePassword: ''
})

// 提交表单
const confirmHandle  = async () =>{
  formRef.value?.validate((async (isValid) => {
    if(isValid){

      const {oldPassword, newPassword, rePassword} = form.value
      if(!newPassword || !oldPassword){
        ElMessage.warning('密码不能为空')
        return
      }
      if(newPassword != rePassword){
        ElMessage.warning('新密码两次输入不一致')
        return
      }

      const res: any = await updatePassword({oldPassword, newPassword})
      if(res.code == 200){
        ElMessage.success('修改成功')
        logout()
        // 关闭dialog
        emits('update:visible', false)
      }
    }else {
      ElMessage.warning('表单校验失败, 请检查表单')
    }
  }))
}

</script>

<style lang="scss" scoped>

</style>
