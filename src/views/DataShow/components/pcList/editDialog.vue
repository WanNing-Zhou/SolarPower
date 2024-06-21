<!--
  @FileNAme src\views\DataShow\components\pcList\editDialog.vue
  @author 周万宁
  @create 2023/9/27-22:22
  @version
  @description 自用和上传报告的数据添加与编辑
 -->
 <template>
  <el-dialog v-model="dialogVisible" width="50%"  :before-close="handleBeforeClose" align-center :title="isEdit ? '编辑自由上网的数据' : '添加自由上网的数据'">
    <el-form v-model="form" label-width="110px">
      <el-form-item label="日期（年月）">
        <el-date-picker v-model="form.reportDate" type="month" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="逆变器名称">
        <el-input v-model="form.inverterName" style="width: 590px;" />
      </el-form-item>
      <el-form-item label="发电表总电量">
        <el-input v-model="form.electricityConsumptionTotal" @mouseleave="computedData" />
      </el-form-item>
      <el-form-item label="上网总电量">
        <el-input v-model="form.electricityOnGridTotal" @mouseleave="computedData" />
      </el-form-item>
      <el-form-item label="上网电价">
        <el-input v-model="form.onGridPowerPrice" @mouseleave="computedData" />
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
        <el-upload v-model:file-list="fileList" :auto-upload="false" action="#" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" accept=".png,.jpg,.gif,.jpeg,.svg">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-model="previewDialogVisible">
    <el-image :src="dialogImageUrl" fit="cover" />
  </el-dialog>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { computed, onMounted, PropType, ref, reactive } from "vue";
import { pscData } from "@/type/request/selfTable.ts";
import { ElMessage, UploadUserFile, UploadProps, UploadStatus, ElLoading } from "element-plus";
import { uploadPhotoAndVideo } from "@/api/upload.ts";
import { useRoute } from "vue-router";
import { deleteFile } from '@/api/upload'
import { fileParams } from '@/type/request/worksheet'
import { dataURLtoFile, compressImg } from '@/utils/imageUtils'
const route = useRoute()
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
const dialogImageUrl = ref('')
const previewDialogVisible = ref(false)
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
// 文件数组
const fileList = ref<UploadUserFile[]>([]);
let photoArr = ref<string[]>([])

onMounted(() => {
  if (props.isEdit) {
    console.log(props.editData)
    form.value = props.editData
    photoArr.value = form.value.scenePicture?.split('#') as string[]
    photoArr.value = photoArr.value?.filter(v => v !== "")
    for (let i = 0; i < photoArr.value.length; i++) {
      const obj = {
        url: import.meta.env.VITE_APP_BASE_API + `/api/file/download/self_and_on_grid/${photoArr.value[i]}`,
        name: photoArr.value[i],
        flag: true,
        status: 'success' as UploadStatus,
        uid: 1718890059368
      }
      // fileList[i] = {...fileList[i]} && obj  
      fileList.value.push(obj)
    }
    console.log(fileList.value)
  }
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

// 照片预览操作
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
  dialogImageUrl.value = uploadFile.url!
  previewDialogVisible.value = true
}


// 删除照片操作
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
  console.log(uploadFile)
  if ('flag' in uploadFile) {
    deleteFile('self_and_on_grid', uploadFile.name)
  }
}

//文件上传

// 提交表单
const onSubmit = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: '图片正在上传，请耐心等待',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  // 处理文件列表 文件名以#分割
  let fileArr: UploadUserFile[] = fileList.value.filter(o => typeof o?.flag == "undefined")
  //文件大小
  let fileSize = 0
  let fileName = ''
  // 先上传新增文件
  for (const [idx, element] of fileArr.entries()) {
    fileSize += element.size!
  }
  for (let i = 0; i < fileArr.length; i++) {
    let file: fileParams = reactive({})
    // file.file = fileArr[i].raw
    file.type = 'self_and_on_grid'
    if (fileSize > 419430400) {
      ElMessage({
        message: '文件大小超过50MB，请重新上传',
        type: 'error',
      })
    } else {
      const compressedResult: any = await compressImg(fileArr[i].raw)
      file.file = dataURLtoFile(compressedResult, fileArr[i].raw!.name)
      const res: any = await uploadPhotoAndVideo(file)
      if (res.code === 200) {
        ElMessage({
          message: '文件上传成功',
          type: 'success',
        })
        fileName = fileName + res.data + '#'
      }
    }
  }

  fileList.value = fileList.value.filter(o => typeof o?.flag != "undefined")
  fileList.value.forEach(o => fileName = fileName + o.url?.substring(o.url.indexOf('self_and_on_grid') + 17) + '#')
  form.value.scenePicture = fileName
  console.log(form.value)
  emit('confirm', form.value)
  loading.close()
}

const handleBeforeClose = () => {
    fileList.value = []
    emit('cancel')
}
// 取消操作
const onCancel = () => {
  fileList.value = []
  emit('cancel')
}

// 对数据进行计算
const computedData = () => {
  form.value.electricitySelfUseTotal = Number(parseFloat(form.value.electricityConsumptionTotal! - form.value.electricityOnGridTotal! + '')); //自用电量 = 发电表总电量 - 上网总电量
  form.value.onGridElectricCharge = Number(parseFloat(form.value.electricityOnGridTotal! * form.value.onGridPowerPrice! + '').toFixed(2)); // 上网费用 = 上网总电量 * 上网电价
  form.value.selfUseElectricCharge = Number(parseFloat(form.value.electricitySelfUseTotal! * form.value.selfUsePowerPrice! + '').toFixed(2)); // 自用电费 = 自用电量 * 自用电价
}

</script>

<style lang="scss" scoped>
.image-item {
  left: -125px;
  margin: 10px 0;
}
</style>
