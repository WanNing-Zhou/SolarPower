<!--
  @FileNAme src\views\DataShow\components\pcList\editDialog.vue
  @author 周万宁
  @create 2023/9/27-22:22
  @version
  @description 自用和上传报告的数据添加与编辑
 -->
<template>
  <el-dialog
      v-model="dialogVisible"
      width="60%"
      align-center
      :title="isEdit ? '编辑数据' : '添加数据' "
  >
    <el-form v-model="form" label-width="120px">
      <el-form-item label="电站名称">
        <el-input v-model="form.stationName"/>
      </el-form-item>
      <el-form-item label="日期（年月）">
        <el-date-picker v-model="form.date" type="month" placeholder="请选择日期"/>
      </el-form-item>
      <el-form-item label="逆变器名称">
        <el-input v-model="form.inverterName"/>
      </el-form-item>
      <el-form-item label="发电表总电量">
        <el-input v-model="form.electricityConsumptionTotal"/>
      </el-form-item>
      <el-form-item label="上网总电量">
        <el-input v-model="form.electricityOnGridTotal"/>
      </el-form-item>
      <el-form-item label="上网电价">
        <el-input v-model="form.onGridPowerPrice"/>
      </el-form-item>
      <el-form-item label="自动电价">
        <el-input v-model="form.selfUsePowerPrice"/>
      </el-form-item>
      <el-form-item label="自用电量">
        <el-input v-model="form.electricitySelfUseTotal"/>
      </el-form-item>
      <el-form-item label="现场照片">
        <el-upload
            v-model:file-list="form.scenePicture as Array<any>"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="removeHandle"
            :http-request="uploadFileHandle"
        >
      </el-form-item>
    </el-form>


  </el-dialog>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {pscData} from "@/type/request/selfTable.ts";

const props = defineProps({
  // 弹窗的可见性 (v-modle)
  visible: {
    type: Boolean,
    default: false,
  },

  // 是否是编辑状态
  isEdit: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits<{
  // 更改visible可见性
  'update:visible': [value:Boolean]
  // 表单提交
  'confirm':[]
}>()

const form = ref<pscData>({

})

// 弹窗可见性
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(value: boolean) {
    emit('update:visible', value)
  }
})

const handlePictureCardPreview = () => {

}

// 上传照片
const uploadFileHandle = () => {

}

// 删除照片操作
const removeHandle = () => {

}


</script>

<style lang="scss" scoped>

</style>
