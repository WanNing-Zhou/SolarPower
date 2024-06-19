<template>
  <el-dialog v-model="vis" :show-close="false" width="600">
    <template #header>
      <div class="my-header">
        {{company ? '公司编辑' : '公司添加'}}
      </div>
    </template>
    <div>
      <el-form label-width="120">
        <el-form-item label="公司名">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"/>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.manager"/>
        </el-form-item>
        <el-form-item label="负责人电话">
          <el-input v-model="form.contact"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmHandle">提交</el-button>
          <el-button type="primary" @click="cancelHandle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {addCompany, updateCompany} from "@/api/suer.ts";
import {ElMessage} from "element-plus";

type Prop = {
  visible: boolean,
  company?: any,
}

const props = defineProps<Prop>()

const emits = defineEmits(['update:visible', 'success'])

const baseForm = {
  name: '',
  address: '',
  manager: '',
  contact: '',
}
const form = ref<any>({...baseForm})

const company = computed(() => {
  return props.company
})

watch(company, () => {
  if(company.value){
    form.value = {...company.value}
    // form.value.name = company.value.name
    // form.value.address = company.value.address
    // form.value.manager = company.value.manager
    // form.value.contact = company.value.contact
  }else {
    form.value = {...baseForm}
  }
})

const vis = computed({
  get(){
    return props.visible;
  },
  set(){
    emits('update:visible', false)
  }
})


const cancelHandle = () => {
  emits('update:visible', false)
}

const confirmHandle = async () => {
  // 当company为false时为添加
  if(!props.company){
    const param = {
      address: form.value.address,
      contact: form.value.contact,
      // id: form.value.id,
      manager: form.value.manager,
      name: form.value.name
    }
    const res: any = await addCompany(param);
    if(res.code == 200){
      ElMessage.success('添加成功')
      emits('success')
      emits('update:visible')
    }
  }else{

    const param = {
      address: form.value.address,
      contact: form.value.contact,
      id: form.value.id,
      manager: form.value.manager,
      name: form.value.name
    }
    const res: any = await updateCompany(param)
    if(res.code == 200){
      ElMessage.success('修改成功')
      emits('success')
      emits('update:visible')
    }
  }
}

</script>

<style scoped>

</style>
