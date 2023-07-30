// 录入工作单管理dialog

<template>
  <el-dialog  v-model="visible" title="工作单录入" :before-close="handleBeforeClose" class="inspection-checklist-form">
    <el-form label-width="100" title="工作单">
      <el-form-item label="工作类型">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="编号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="工作人">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="发生时间">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="内容描述">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="现场情况">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="备注">
        <el-input
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

import {computed, ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

const prop = defineProps({
  dialogVisible:{
    type:Boolean,
    default: false
  }
})

const emit = defineEmits(['close','submit'])

// dialog显示
const visible = computed(()=>{
  return prop.dialogVisible;
})

// 关闭前操作
const handleBeforeClose = ()=>{
  emit('close')
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
  emit('submit')
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
