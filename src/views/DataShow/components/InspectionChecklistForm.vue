// 录入工作单管理dialog

<template>
  <el-dialog v-model="visible" title="工作单录入" :before-close="handleBeforeClose" class="inspection-checklist-form">
    <el-form v-model="checklistFrom" label-width="100" title="工作单">
      <el-form-item label="工作类型">
        <el-select v-model="checklistFrom.typeCode" class="m-2" placeholder="请选择">
          <el-option v-for="item in workTypeOptions " :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label-width="100" label="编号">
        <el-input v-model="prop.addNumber"></el-input>
      </el-form-item> -->
      <el-form-item label-width="100" label="工作人">
        <el-input v-model="checklistFrom.workMan"></el-input>
      </el-form-item>
      <el-form-item label-width="100" label="发生时间">
        <el-date-picker v-model="checklistFrom.workDate" type="date" placeholder="请选择时间" />
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
            <el-upload v-model:file-list="fileList" class="upload-demo" multiple :auto-upload="false" action="#"
              :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="9"
              :on-exceed="handleExceed" :on-success="successUpLoad" list-type="picture"
              accept=".png,.jpg,.gif,.jpeg,.svg">
              <el-button type="primary">选择文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  图片大小小于50MB
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

import { computed, ref, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { addConditions } from '@/type/request/worksheet'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { fileParams } from '@/type/request/worksheet'
import { uploadPhotoAndVideo } from '@/api/upload'
import { dataURLtoFile, compressImg } from '@/utils/imageUtils'
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
//文件名
const fileName = ref('')
let checklistFrom = ref<addConditions | any>({})
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
  checklistFrom = ref({})
  fileList = ref<UploadUserFile[]>([])
  emit('close')
  console.log('visible', visible.value)


}




const handleRemove: UploadProps['onRemove'] = (file) => {
  console.log(file)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `文件上传限制是9个, 这次您选择上传 ${files.length} 个文件, 加起来一共 ${files.length + uploadFiles.length
    } 个`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile) => {
  return ElMessageBox.confirm(
    `取消 ${uploadFile.name}的上传 ?`
  ).then(
    () => true,
    () => false
  )
}

//上传文件
const successUpLoad = () => {
  // console.log('fileList',fileList)

}

const pointId = computed(() => {
  return route.query.pointId;
})
// 提交数据--文件上传
const workListSubmit = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: '图片正在上传，请耐心等待',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  // checklistFrom.value.id = prop.addNumber
  if (checklistFrom.value.date != null) {
    checklistFrom.value.date = convertDateFormat(checklistFrom.value.date, true)
  }
  // checklistFrom.value.companyNumber = store.state.companyNumber
  // checklistFrom.value.stationNumber = route.params.id as string
  checklistFrom.value.stationId= pointId.value as string

  //文件大小
  let fileSize = 0
  //求文件大小
  for (let i = 0; i < fileList.value.length; i++) {
    fileSize += fileList.value[i].size!
  }
  //循环上传文件
  for (let i = 0; i < fileList.value.length; i++) {

    if (fileSize > 419430400) {
      ElMessage({
        message: '文件大小超过50MB，请重新上传',
        type: 'error',
      })

    } else {

      const compressedResult: any = await compressImg(fileList.value[i].raw)
      const fileImg = dataURLtoFile(compressedResult, fileList.value[i].raw!.name)

      let uploadFile: fileParams = reactive({})
      uploadFile.type = 'worksheet'
      uploadFile.file = fileImg
      const res: any = await uploadPhotoAndVideo(uploadFile)
      if (res.code === 200) {
        ElMessage({
          message: '文件上传成功',
          type: 'success',
        })
        fileName.value = fileName.value + res.data + '#'
      }
    }

  }
  checklistFrom.value.files = fileName.value
  emit('submit', checklistFrom.value)
  checklistFrom = ref({})
  fileList = ref<UploadUserFile[]>([])
  loading.close()

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
