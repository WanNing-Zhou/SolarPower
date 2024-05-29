<template>
  <el-dialog v-model="vis">
    <template #title>
      <div>编辑用户</div>
    </template>
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
      <el-form-item label="地址">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmHandle">提交</el-button>
        <el-button type="info" @click="cancelHandle">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {addUser} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
import {computed} from "vue";

type Prop = {
  visible: boolean,
  user: any
}
const props = defineProps<Prop>()
const emits = defineEmits(['update:visible'])

const vis = computed({
  get(){
    return props.visible;
  },
  set(){
    emits('update:visible', false)
  }
})

const baseForm = {
  username: '',
  password: '',
  concat: '',
  contact: '',
  address: ''
}
const formData=  ref({...baseForm})
// formData.value = {...props.user} // 赋值
const editData = computed(() => {
  return props.user
})
watch(editData, () => {
  console.log('触发了')
  formData.value = {...props.user}
}, {deep: true, immediate: true})

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


const cancelHandle = () => {
  emits('update:visible', false)
}
</script>
