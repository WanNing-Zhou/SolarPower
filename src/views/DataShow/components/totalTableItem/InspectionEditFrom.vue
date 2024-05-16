// 修改工作单管理dialog

<template>
    <el-dialog v-model="visible" title="工作单修改" :before-close="handleBeforeClose" class="inspection-checklist-form">
        <el-form v-model="checklistFrom" label-width="100" title="工作单">
            <el-form-item label="工作类型">
                <el-select v-model="checklistFrom.type" class="m-2" placeholder="请选择">
                    <el-option v-for="item in workTypeOptions " :key="item.value" :label="item.label" :value="item.value" />
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
                <el-input v-model="checklistFrom.comment" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
            </el-form-item>


            <el-form-item label-width="100">
                <section class="btn-group">
                    <section>
                        <el-upload v-model:file-list="fileList" class="upload-demo">

                        </el-upload>
                    </section>
                    <section>
                        <el-button @click="workListSubmit">修改</el-button>
                    </section>


                </section>

            </el-form-item>


        </el-form>

    </el-dialog>
</template>

<script setup lang="ts">

import { computed, Ref, ref, watch} from 'vue'
import type { UploadUserFile } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { editWorkSheet } from '@/api/apiworksheet'
import { editConditions } from '@/type/request/worksheet'
import { ElMessage } from "element-plus";
import { Res } from '@/type/request/requestType'


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

let checklistFrom: Ref<editConditions> = ref({})
// let editCoditions:Ref<editConditions> = ref({})

// 页面加载时更新checklistFrom中的数据

//返回state中的编辑数据
const getEditTableData = computed(() => {
    return store.state.EditTableData
})

//监听编辑的数据
watch(getEditTableData, () => {
    checklistFrom.value = store.state.EditTableData

    //修改参数
    // editCoditions.value = checklistFrom.value
    // editCoditions.companyNumber = store.state.companyNumber
    // editCoditions.stationNumber = route.params.id




}, {
    immediate: true,
    deep: true
})





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

// 关闭前操作
const handleBeforeClose = () => {
    console.log('输入框关闭')
    emit('closeEdit')
    console.log('visible', visible.value)

}

// 文件列表
let fileList = ref<UploadUserFile[]>([

])



// 修改数据
const workListSubmit = () => {
    checklistFrom.value.companyNumber = store.state.companyNumber
    checklistFrom.value.stationNumber = route.params.id
    checklistFrom.value.man = checklistFrom.value.workMan
    checklistFrom.value.type = checklistFrom.value.typeCode
    editWorkSheet(checklistFrom.value).then((res: Res) => {
        if (res.code === 200) {
            ElMessage({
                message: res.data,
                type: 'success',
            })
            checklistFrom.value.type = checklistFrom.value.type
            emit('closeEdit')
        }
    })









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
