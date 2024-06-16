<!--
  @FileNAme src\views\DataShow\components\pcList\editDialog.vue
  @author 周万宁
  @create 2023/9/27-22:22
  @version
  @description 自用和上传报告的数据添加与编辑
 -->
<template>
  <el-dialog v-model="dialogVisible" width="50%" align-center :title="isEdit ? '编辑自由上网的数据' : '添加自由上网的数据'">
    <el-form v-model="form" label-width="110px">
<!--      <el-form-item class="form-item-short" label="选择电站:">-->
<!--        <el-select v-model="form.stationName" class="m-2" placeholder="请选择">-->
<!--          <el-option v-for="item in options " :key="item.value" :label="item.label" :value="item.value" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="日期（年月）">
        <el-date-picker v-model="form.reportDate" type="month" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="逆变器名称">
        <el-input v-model="form.inverterName" style="width: 590px;" />
      </el-form-item>
      <el-form-item label="发电表总电量">
        <el-input v-model="form.electricityConsumptionTotal" @mouseleave="computedData"/>
      </el-form-item>
      <el-form-item label="上网总电量">
        <el-input v-model="form.electricityOnGridTotal" @mouseleave="computedData"/>
      </el-form-item>
      <el-form-item label="上网电价">
        <el-input v-model="form.onGridPowerPrice" @mouseleave="computedData"/>
      </el-form-item>
      <el-form-item label="自用电价">
        <el-input v-model="form.selfUsePowerPrice" @mouseleave="computedData" />
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="自用电量">
            <el-input v-model="form.electricitySelfUseTotal" style="width: 65px;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上网电费">
            <el-input v-model="form.onGridElectricCharge" style="width: 65px;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="自用电费">
            <el-input v-model="form.selfUseElectricCharge" style="width: 65px;" />
          </el-form-item>
        </el-col>
        <!-- 在这里继续添加 el-col 和 el-form-item -->
      </el-row>



      <el-form-item label="现场照片">
        <el-upload v-model:file-list="fileList as Array<any>" action="" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="removeHandle" :http-request="uploadFileHandle"
          :before-remove="handleBeforeRemove" />
      </el-form-item>
      <el-form-item v-if="isEdit">
        <el-row>
          <el-col v-for="(image, index) in images" :key="index" :span="6">
            <el-image :src="image.url" class="image-item">
              <template #error>
                <!-- 自定义加载失败的内容或字样 -->
                <div></div>
              </template></el-image>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <template v-for="tag in tags" :key="tag">
          <el-tag closable @close="removeTagHandle(tag)" v-if="tag" width="200px">{{ tag }}</el-tag>
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

import { computed, onMounted, PropType, ref, watch, reactive } from "vue";
import { pscData } from "@/type/request/selfTable.ts";
import { ElMessage, UploadUserFile, UploadProps } from "element-plus";
import { uploadPhotoAndVideo } from "@/api/upload.ts";
import { useRoute } from "vue-router";
import { deleteFile } from '@/api/upload'
const route = useRoute()
const base = `${import.meta.env.VITE_APP_BASE_API}/api/file/download/self_and_on_grid/`
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
let images = ref([{
  url: '#'
}])
const emit = defineEmits<{
  // 更改visible可见性
  'update:visible': [value: Boolean]
  // 表单提交
  'confirm': [form: any],
  // 取消操作
  cancel: [],
}>()

const stationId = computed(() => {
  return route.query.pointId
})

const form = ref<pscData>({
  // stationName: '',  // 电站名称
  stationId: stationId.value, // 电站id
  date: '', // 年月
  inverterName: '', // 逆变器名称
  electricityConsumptionTotal: 0, // 发电表总电量
  electricityOnGridTotal: 0, // 上网总电量
  onGridPowerPrice: 0, // 上网电价
  selfUsePowerPrice: 0, // 自用电价
  electricitySelfUseTotal: 0, // 自用电量
  onGridElectricCharge: 0,//上网电费
  selfUseElectricCharge: 0,//自用电费
})

const options: any = ref([])
const tags = ref([

])
const newImgName = ref([])
let tagCount = 0 //tags标签的数量


onMounted(() => {
  // switch (route.params?.label) {
  //   case '西安菲尔特2.5MW光伏项目':
  //     options.value = options2
  //     break
  //   case '望奎三马架发电站':
  //     options.value = options3
  //     break
  //   default:
  //     options.value = options1
  //     break
  // }
  // 判断是否是编辑状态, 为form赋初始值
  if (props.isEdit) {
    form.value = props.editData

    try {
      fileList.value = JSON.parse(<string>props.editData?.scenePicture)
    } catch {
      console.log('scenePicture 不为json格式')
    }

    const str = props.editData?.scenePicture as string

    tags.value = str.split('#') || []

    tagCount = tags.value.length

    for (let i = 0; i < tags.value.length; i++) {
      if (tags.value[i] !== '') {
        let url = ''
        url = base + tags.value[i]
        newImgName.value.push(tags.value[i])
        images.value.push({ url })
        // console.log('编辑回显图片的名称', url)
      }
    }
    images.value.shift()

  } else {
    // form.value.stationName = route.params.label
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
const uploadFileHandle = (fileData: any) => {
  const file = {
    file: fileData.file,
    type: 'self_and_on_grid'
  }

  console.log('文件数组上传', fileList.value)
  //添加
  tags.value.push(fileData.file.name)

  console.log('这里是文件', file.file);
}
//文件上传
const uploadFileR = async (file: any) => {
  const res: any = await uploadPhotoAndVideo(file)

  if (res.code === 200) {
    ElMessage({
      message: '文件上传成功',
      type: 'success',
    })
  }

  newImgName.value.push(res.data)
  console.log('form.value.scenePicture', newImgName.value)

  console.log(res)

  return {
    url: res.url,
    name: res.name + '#',
  }
}

// 删除照片操作
const removeHandle: UploadProps['onRemove'] = () => {

}
// 删除操作
const removeTagHandle = (tag: string) => {

  const index = tags.value.findIndex(item => item === tag)
  const filename: string = tags.value[index]

  if (filename.startsWith('169')) {
    console.log('回显删除文件的名称：', filename)
    console.log('tags.value', tags.value)
    const type = 'self_and_on_grid'
    const id = filename
    deleteFile(type, id).then(res => {
      console.log('res', res)
      if (res.code === 200) {
        ElMessage({
          message: '文件删除成功',
          type: 'success',
        })
        newImgName.value.splice(index, 1)
        images.value.splice(index, 1)
        console.log('images', images.value)

      }

    })
  } else {
    fileList.value.splice(index - tagCount, 1)
  }
  tags.value.splice(index, 1) // 删除操作
  // fileList.value.splice(index - tagCount, 1)


}
//删除图片前的操作
const handleBeforeRemove = (file: any, fileList: any) => {
  const index = fileList.indexOf(file)
  tags.value.splice(index - tagCount, 1) // 删除操作

}

//文件上传

// 提交表单
const onSubmit = async () => {
  // 提交前对数据进行构造
  // form.value.scenePicture = JSON.stringify(fileList.value)
  console.log('文件数组上传', fileList.value)

  for (let i = 0; i < fileList.value.length; i++) {
    const file = reactive({
      type: 'self_and_on_grid'
    })
    // if(i === fileList.value.length - 1){
    //   file.file = fileList.value[i].raw
    // }
    console.log('xxxx', fileList.value[i], i)
    file.file = fileList.value[i].raw
    console.log('file', file)
    await uploadFileR(file)
  }

  // //清空文件数组
  // fileList.value.splice(0,fileList.value.length)

  form.value.scenePicture = newImgName.value.join('#')
  // console.log('form.value.scenePicture', form.value.scenePicture)
  // console.log('form', form.value)

  emit('confirm', form.value)
}


// 取消操作
const onCancel = () => {
  emit('cancel')
}
// 对数据进行计算
const computedData = () => {
  form.value.electricitySelfUseTotal = parseFloat(form.value.electricityConsumptionTotal - form.value.electricityOnGridTotal); //自用电量 = 发电表总电量 - 上网总电量
  form.value.onGridElectricCharge = parseFloat(form.value.electricityOnGridTotal * form.value.onGridPowerPrice).toFixed(2); // 上网费用 = 上网总电量 * 上网电价
  form.value.selfUseElectricCharge = parseFloat(form.value.electricitySelfUseTotal * form.value.selfUsePowerPrice).toFixed(2); // 自用电费 = 自用电量 * 自用电价
}

</script>

<style lang="scss" scoped>
.image-item {
  left: -125px;
  margin: 10px 0;
}
</style>
