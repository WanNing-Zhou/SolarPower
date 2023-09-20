// 录入工作单管理dialog

<template>
  <el-dialog v-model="visible" title="工作单录入" :before-close="handleBeforeClose" class="inspection-checklist-form">
    <el-form v-model="checklistFrom" label-width="100" title="工作单">
      <el-form-item label="工作类型">
        <el-select v-model="checklistFrom.type" class="m-2" placeholder="请选择">
          <el-option v-for="item in workTypeOptions " :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label-width="100" label="编号">
        <el-input v-model="prop.addNumber"></el-input>
      </el-form-item> -->
      <el-form-item label-width="100" label="工作人">
        <el-input v-model="checklistFrom.man"></el-input>
      </el-form-item>
      <el-form-item label-width="100" label="发生时间">
        <el-date-picker v-model="checklistFrom.date" type="date" placeholder="请选择时间" />
      </el-form-item>
      <el-form-item label-width="100" label="内容描述">
        <el-input v-model="checklistFrom.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>

      <el-form-item label-width="100" label="现场情况">
        <el-input v-model="checklistFrom.sceneSituation" type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>

      <el-form-item label-width="100" label="备注">
        <el-input v-model="checklistFrom.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>


      <el-form-item label-width="100">
        <section class="btn-group">
          <section>
            <!-- :TODO  参照导入华为数据的上传去开发 -->
            <el-upload v-model:file-list="fileList" class="upload-demo" multiple
              action="http://124.220.61.93:8080/api/file/upload1" :on-preview="handlePreview" :on-remove="handleRemove"
              :before-remove="beforeRemove" :limit="8" :on-exceed="handleExceed" :on-success="successUpLoad">
              <el-button type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  视频和图片大小要小于50MB
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

import { computed, Ref, ref, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addConditions } from '@/type/request/worksheet'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { fileParams } from '@/type/request/worksheet'
import { uploadPhotoAndVideo } from '@/api/upload'
import { Res } from '@/type/request/requestType'
//使用store
const store = useStore()
const route = useRoute()

const prop = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  addNumber: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'submit'])

let checklistFrom: Ref<addConditions> = ref({})
// 文件列表
let fileList = ref<UploadUserFile[]>([])
// 工作类型选项
const workTypeOptions = [
  {
    value: '0000',
    label: '请选择'
  },
  {
    value: '0001',
    label: '巡视记录'
  },
  {
    value: '0002',
    label: '故障处理单'
  },
  {
    value: '0003',
    label: '日常巡检'
  },
  {
    value: '0004',
    label: '故障复检'
  },
]

// dialog显示
const visible = computed(() => {

  return prop.dialogVisible;
})

watch(visible, (a, b) => {
  console.log(a, b)



}, {
  deep: true
})

// 关闭前操作
const handleBeforeClose = () => {
  console.log('输入框关闭')
  emit('close')
  console.log('visible', visible.value)


}




const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

//上传文件
const successUpLoad = () => {
  // console.log('fileList',fileList)

}

// 提交数据--文件上传
const workListSubmit = async () => {
  // checklistFrom.value.id = prop.addNumber
  if (checklistFrom.value.date != null) {
    checklistFrom.value.date = convertDateFormat(checklistFrom.value.date, true)
    console.log(checklistFrom.value.date)
  }
  checklistFrom.value.companyNumber = store.state.companyNumber
  checklistFrom.value.stationNumber = route.params.id

  //文件大小
  let fileSize = 0
  //文件名
  let fileName = ''
  //求文件大小
  for (let i = 0; i < fileList.value.length; i++) {
    fileSize += fileList.value[i].size
    // fileName += fileList.value[i].name 
    // if(i !== fileList.value.length-1)
    // {
    //   fileName += '#'
    // }


  }

  console.log('fileSize', fileSize)
  console.log('fileName', fileName)
  //循环上传文件
  for (let i = 0; i < fileList.value.length; i++) {

    console.log(fileList.value[i])
    let file: fileParams = reactive({})
    file.file = fileList.value[i].raw
    file.type = 'worksheet'


    if (fileSize > 419430400) {
      ElMessage({
        message: '文件大小超过50MB，请重新上传',
        type: 'error',
      })

    } else {
      await uploadPhotoAndVideo(file).then((res: Res) => {
        console.log('文件', res)
        if (res.code === 200) {
          ElMessage({
            message: '文件上传成功',
            type: 'success',
          })
          fileName = fileName + res.data + '#'
          console.log(fileName)
          checklistFrom.value.photoAndVideo = fileName
        }

      })

    }

  }
  console.log('checklistFrom.value', checklistFrom.value)
  emit('submit', checklistFrom.value)



}

</script>

<style scoped>
.inspection-checklist-form {
  width: 600px;

  .btn-group {
    display: flex;
    justify-content: space-around;
  }
}
</style>
