<template>
  <el-dialog v-model="vis" title="修改密码" width="500">
    <div>
      <el-form label-width="120">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
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
    // 关闭dialog
    emits('update:visible', false)
  }

}

</script>

<style lang="scss" scoped>

</style>
