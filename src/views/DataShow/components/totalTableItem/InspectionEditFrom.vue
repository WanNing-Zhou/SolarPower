// 修改工作单管理dialog

<template>
    <el-dialog v-model="visible" title="工作单修改" :before-close="handleBeforeClose" class="inspection-checklist-form">
        <el-form v-model="checklistFrom" label-width="100" title="工作单">
            <el-form-item label="工作类型">
                <el-select v-model="checklistFrom.typeCode" class="m-2" placeholder="请选择">
                    <el-option v-for="item in workTypeOptions " :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label-width="100" label="编号">
                <el-input v-model="checklistFrom.id"></el-input>
            </el-form-item>
            <el-form-item label-width="100" label="工作人">
                <el-input v-model="checklistFrom.workMan"></el-input>
            </el-form-item>
            <el-form-item label-width="100" label="发生时间">
                <el-date-picker v-model="checklistFrom.date" type="date" placeholder="请选择时间" />
            </el-form-item>
            <el-form-item label-width="100" label="内容描述">
                <el-input v-model="checklistFrom.description" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
            </el-form-item>

            <el-form-item label-width="100" label="现场情况">
                <el-input v-model="checklistFrom.sceneSituation" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
            </el-form-item>

            <el-form-item label-width="100" label="备注">
                <el-input v-model="checklistFrom.comment" type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
            </el-form-item>


            <el-form-item label-width="100">
                <section class="btn-group">
                    <section>
                        <el-upload v-model:file-list="fileList" :auto-upload="false" action="#" list-type="picture-card"
                            :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </section>
                    <section>
                        <el-button @click="workListSubmit">修改</el-button>
                    </section>


                </section>

            </el-form-item>


        </el-form>

    </el-dialog>
    <el-dialog v-model="dialogVisible">
        <el-image :src="dialogImageUrl" fit="cover" />
    </el-dialog>
</template>

<script setup lang="ts">

import { computed, ref, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { editWorkSheet } from '@/api/apiworksheet'
import { editConditions } from '@/type/request/worksheet'
import { ElMessage, ElLoading } from "element-plus"
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { fileParams } from '@/type/request/worksheet'
import { uploadPhotoAndVideo } from '@/api/upload'
import { deleteFile } from '@/api/upload'
import {dataURLtoFile, compressImg} from '@/utils/imageUtils'
const store = useStore()
const route = useRoute()

const prop = defineProps({
    EditdialogVisible: {
        type: Boolean,
        default: false
    },
    addNumber: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['closeEdit'])

let checklistFrom = ref<editConditions>({})
let photoArr = ref<string[]>([])
// 文件列表
let fileList = ref<UploadUserFile[]>([])
// 页面加载时更新checklistFrom中的数据
//返回state中的编辑数据
const getEditTableData = computed(() => {
    return store.state.EditTableData
})

//监听编辑的数据
watch(getEditTableData, async () => {
    checklistFrom.value = store.state.EditTableData
    photoArr.value = checklistFrom.value.photoAndVideo?.split('#') as string[]
    photoArr.value = photoArr.value?.filter(v => v !== "")


    for (const [idx, element] of photoArr.value.entries()) {
        const obj = {
            url: import.meta.env.VITE_APP_BASE_API + `/api/file/download/worksheet/${element}`,
            name: element,
            flag: true
        }
        fileList.value[idx] = obj
    }
}, {
    immediate: true,
    deep: true
})
// console.log(photoArr.value)




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
    return prop.EditdialogVisible;
})
// 保存上一个索引
let lastIndex = -1
watch(visible, () => {
    if (lastIndex !== checklistFrom.value.index) {
        lastIndex = checklistFrom.value.index as number
        fileList.value = []
    }


})


// 关闭前操作
const handleBeforeClose = () => {
    fileList.value = []
    emit('closeEdit')
}
// 修改数据
const workListSubmit = async () => {
    const loading = ElLoading.service({
    lock: true,
    text: '图片正在上传，请耐心等待',
    background: 'rgba(0, 0, 0, 0.7)',
  })
    checklistFrom.value.companyNumber = store.state.companyNumber
    checklistFrom.value.stationNumber = route.params.id as string
    checklistFrom.value.type = checklistFrom.value.typeCode
    // delete checklistFrom.value.typeCode
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
        file.type = 'worksheet'
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
    fileList.value.forEach(o => fileName = fileName + o.url?.substring(o.url.indexOf('worksheet') + 10) + '#')
    checklistFrom.value.photoAndVideo = fileName
    await editWorkSheet(checklistFrom.value).then((res: any) => {
        if (res.code === 200) {
            ElMessage({
                message: res.data,
                type: 'success',
            })
            emit('closeEdit', checklistFrom.value)
            loading.close()
        }
    })
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
const handleRemove: UploadProps['onRemove'] = (uploadFile) => {
    console.log(uploadFile)
    if ('flag' in uploadFile) {
        deleteFile('worksheet', uploadFile.name)
    }
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
