// 录入工作单管理dialog

<template>
  <el-dialog  v-model="visible" title="工作单录入" :before-close="handleBeforeClose" class="inspection-checklist-form">
    <el-form v-model="checklistFrom" label-width="100" title="工作单">
      <el-form-item label="工作类型">
        <el-select v-model="checklistFrom.workType" class="m-2" placeholder="请选择">
          <el-option
              v-for="item in workTypeOptions "
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item  label-width="100"  label="编号">
        <el-input v-model="prop.addNumber"></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="工作人">
        <el-input v-model="checklistFrom.workerName"></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="发生时间">
        <el-date-picker
            v-model="checklistFrom.startTime"
            type="date"
            placeholder="请选择时间"
        />
      </el-form-item>
      <el-form-item label-width="100"  label="内容描述">
        <el-input
            v-model="checklistFrom.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="现场情况">
        <el-input
            v-model="checklistFrom.sceneSituation"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="备注">
        <el-input
            v-model="checklistFrom.remarks"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>


      <el-form-item label-width="100">
        <section class="btn-group">
          <section>
            <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="3"
                :on-exceed="handleExceed"
            >
              <el-button type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500KB.
                </div>
              </template>
            </el-upload>
          </section>
          <section>
            <el-button @click="workListSubmit">提交</el-button>
          </section>


        </section>

      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script setup lang="ts">

import {computed, Ref, ref, watch} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'
import {convertDateFormat} from "@/utils/dateUtils.ts";


interface InspectionChecklist {
  workType?: string; // 工作类型
  number?: string; //编号
  startTime?: string; //发生时间
  workerName?: string; // 工作人签字
  content?: string; //内容描述
  sceneSituation?: string; //现场情况
  remarks?: string; // 备注
  edit?: boolean; //编辑编辑状态
}

const prop = defineProps({
  dialogVisible:{
    type:Boolean,
    default: false
  },
  addNumber:{
    type:String,
    default:''
  }
})

const emit = defineEmits(['close','submit'])

const checklistFrom:Ref<InspectionChecklist> = ref({})

// 工作类型选项
const workTypeOptions = [
  {
    value: '0',
    label: '请选择'
  },
  {
    value: '1',
    label: '选项1'
  },
  {
    value: '2',
    label: '选项2'
  },
  {
    value: '3',
    label: '选项3'
  },
  {
    value: '4',
    label: '选项4'
  },
]

// dialog显示
const visible = computed(()=>{
  return prop.dialogVisible;
})

// 关闭前操作
const handleBeforeClose = ()=>{
  console.log('输入框关闭')
  emit('close')
  console.log('visible',visible.value)
}

// 文件列表
const fileList = ref<UploadUserFile[]>([

])

// 移除操作
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

// 预览操作
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

// 文件超过处理
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  )
}


// 删除前操作
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
}

// 提交数据
const workListSubmit = ()=>{
  checklistFrom.value.number = prop.addNumber
  if (checklistFrom.value.startTime != null) {
    checklistFrom.value.startTime = convertDateFormat(checklistFrom.value.startTime)
  }
  emit('submit',checklistFrom.value)
}

</script>

<style scoped>
  .inspection-checklist-form{
    width: 600px;

    .btn-group{
      display: flex;
      justify-content: space-around;
    }
  }
</style>
