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
            v-model:file-list="fileList as Array<any>"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="removeHandle"
            :http-request="uploadFileHandle"
        />
      </el-form-item>

      <el-form-item>
        <template v-for="tag in tags" :key="tag">
          <el-tag
              closable
              @close="removeTagHandle(tag)"
              v-if="tag"
          >{{tag}}</el-tag>
        </template>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>


  </el-dialog>
</template>

<script setup lang="ts">

import {computed, onMounted, PropType, ref} from "vue";
import {pscData} from "@/type/request/selfTable.ts";
import {ElMessage, UploadUserFile} from "element-plus";
import {uploadPhotoAndVideo} from "@/api/upload.ts";
import {Res} from "@/type/request/requestType.ts";

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
  },
  // 编辑的数据
  editData: {
    type: Object as PropType<pscData>,
    default: () => { return {} }
  }
})

const emit = defineEmits<{
  // 更改visible可见性
  'update:visible': [value:Boolean]
  // 表单提交
  'confirm':[form:any],
  // 取消操作
  cancel: [],
}>()

const form = ref<pscData>({
  stationName: '',  // 电站名称
  date: '', // 年月
  inverterName: '', // 逆变器名称
  electricityConsumptionTotal: 0, // 发电表总电量
  electricityOnGridTotal: 0, // 上网总电量
  onGridPowerPrice: 0, // 上网
  selfUsePowerPrice: 0, // 自用电价
  electricitySelfUseTotal: 0, // 自用电量
})

const tags = ref([
  'Tag 1',
 ])

onMounted(()=> {
  // 判断是否是编辑状态, 为form赋初始值
  if(props.isEdit) {
    form.value = props.editData
    try {
      fileList.value = JSON.parse(<string>props.editData?.scenePicture)
    }catch{
      console.log('scenePicture 不为json格式')
    }

    const str = props.editData?.scenePicture as string

    tags.value = str.split('#')|| []

  }
})

// 文件数组
const fileList = ref<UploadUserFile[]>([

]);

// 弹窗可见性
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(value: boolean) {
    emit('update:visible', value)
  }
})

// 照片预览操作
const handlePictureCardPreview = () => {

}

// 上传照片
const uploadFileHandle = async ( fileData: any ) => {
  const file = {
    file: fileData.file,
    type: 'self_and_on_grid'
  }
  console.log('这里是文件', file.file);

  const res:any = await uploadPhotoAndVideo(file)

  if (res.code === 200) {
    ElMessage({
      message: '文件上传成功',
      type: 'success',
    })
  }

  tags.value.push(res.data)

  console.log(res)

  return {
    url: res.url,
    name: res.name + '#',
  }
}

// 删除照片操作
const removeHandle = () => {

}
// 删除操作
const removeTagHandle = (tag:string) => {
  const index = tags.value.findIndex(item => item === tag)
  tags.value.splice(index,1) // 删除操作
}

// 提交表单
const onSubmit = () => {
  // 提交前对数据进行构造
  // form.value.scenePicture = JSON.stringify(fileList.value)
  form.value.scenePicture = tags.value.join('#')
  emit('confirm', form.value)
}

// 取消操作
const onCancel = () => {
  emit('cancel')
}

</script>

<style lang="scss" scoped>

</style>
