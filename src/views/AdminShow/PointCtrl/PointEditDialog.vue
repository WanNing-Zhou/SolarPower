<template>
  <el-dialog v-model="vis" :show-close="false" width="500">
    <template #header>
      <div class="my-header">
        {{pointData ? '站点编辑' : '站点添加'}}
      </div>
    </template>
    <div>
      <el-form label-width="120">
        <el-form-item label="电站名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model="form.capacity"/>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input v-model="form.type"/>
        </el-form-item>
        <el-form-item  label="负责人">
          <el-input v-model="form.manager"/>
        </el-form-item>
        <el-form-item label="负责人电话">
          <el-input v-model="form.contact"/>
        </el-form-item>
        <el-form-item  label="电站地址">
          <el-input v-model="form.address"/>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="confirmHandle">提交</el-button>-->
<!--          <el-button type="primary" @click="cancelHandle">取消</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
    <template #footer>
      <el-button type="primary" @click="confirmHandle">提交</el-button>
      <el-button type="primary" @click="cancelHandle">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {addStation, updateStation} from "@/api/suer.ts";

type Prop = {
  visible: boolean,
  companyId: string
  data?: any,
}

const props = defineProps<Prop>()

const emits = defineEmits(['update:visible', 'success'])

const baseForm = {
  name: '',
  address: '',
  manager: '',
  contact: '',
  type: '',
  capacity: '', // 设备容量
}
const form = ref({...baseForm})

const pointData = computed(() => {
  return props.data
})

watch(pointData, () => {
  if(pointData.value){
    form.value = {...pointData.value}
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
  // 当data为false时为添加
  if(!props.data){
    const res: any = await addStation({...form.value, companyId: props.companyId});
    if(res.code == 200){
      ElMessage.success('添加成功')
      emits('success')
      emits('update:visible')
    }
  }else{
    const param :any = {...form.value, id: pointData.value.id};
    delete param.companyId
    const res: any = await updateStation(param)
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
