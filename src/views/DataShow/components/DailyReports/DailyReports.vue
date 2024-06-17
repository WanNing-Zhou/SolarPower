
<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-text class="mx-1">选择年月：</el-text>
        <el-date-picker v-model="queryConditions.reportDate" type="month" placeholder="选择月份" />
        &nbsp;&nbsp;
        <el-button type="primary" @click="getTableData">查询</el-button>
      </el-header>
      <el-main>
        <el-table :header-cell-style="{ 'text-align': 'center' }" :data="tableData" height="380px">
          <!--  日期     -->
          <el-table-column prop="reportDate" label="日期" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.reportDate"></el-input>
              <span v-else>{{ convertDateFormat(scope.row.reportDate, true) }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column :label="stationStore.stationName">
            <el-table-column prop="operationStatus" label="当天运行情况" >
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="editForm.operationStatus"></el-input>
                <span v-else>{{ scope.row.operationStatus }}</span>
              </template>
            </el-table-column>z
            <el-table-column prop="powerGeneration" label="日发电量Mwh" >
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="editForm.powerGeneration"></el-input>
                <span v-else>{{ scope.row.powerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="useHours" label="利用小时h">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="editForm.useHours"></el-input>
                <span v-else>{{ scope.row.useHours }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template #default="scope">
              <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
                <el-icon :size="20">
                  <Checked />
                </el-icon>
              </el-button>
              <el-button v-if="scope.row.edit" type="primary" size="small" @click="cancel(scope.row)">
                <el-icon :size="20">
                  <Close />
                </el-icon>
              </el-button>
              <div v-else>
                <el-button type="primary" @click="editData(scope.row, scope.$index)">
                  <el-icon :size="20">
                    <Edit />
                  </el-icon>
                </el-button>
                <el-button type="primary" @click="deleteData(scope.row)">
                  <el-icon :size="20">
                    <Delete />
                  </el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addData">添加数据</el-button>
        <el-divider></el-divider>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import { onMounted, Ref, ref, reactive } from "vue";
import { Checked, Close } from "@element-plus/icons-vue";
import { DailyReportPhotovoltaicPowerPlantA } from "@/type";
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { ReportParams, ReportInsertParams, ReportModifyParams } from '@/type/request/report'
import { getReport, insertReport, modifyReport, deleteReport } from '@/api/apireport'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useStationStore} from "@/store/pinia/station";
// import { useRoute } from "vue-router";
// const route = useRoute()

const stationStore = useStationStore()

// 表格数据
// const tableData: Ref<Array<DailyReportPhotovoltaicPowerPlantA>> = ref([])
const tableData = ref([])
//查询参数
const queryConditions = reactive<ReportParams>({
  reportDate: new Date()
})
const getTableData =  async  () => {
  const res = await getReport({
    stationId: stationStore.stationId as string,
    // 后端为为是心啊
    reportDate: convertDateFormat(queryConditions.reportDate as string),
  })
  tableData.value = res.data.records;
  // const res = await getReport(queryConditions)
}


onMounted( () => {
  // queryConditions.reportDate = convertDateFormat(new Date())
  getTableData()
})


//添加参数
let insertConditions = reactive({
  edit: false,
  addedit: false,
  reportDate: '',
  useHours: 0,
  powerGeneration: 0,
  operationStatus: '',
})
//添加数据的点击次数
let addCount = 0
//电站数组
const stationNumber = ['PV001', 'PV002', 'PV003', 'PV004']

const baseEditForm = {
  operationStatus: '', // 当天运行情况
  powerGeneration: 0 , // 日发电量
  useHours: 0,
  reportDate: '', // 时间
  edit: false,
}

const editForm = ref({...baseEditForm})

// 添加数据
const addData = () => {
  //自动加一
  addCount++
  //保存当前长度（数组长度加上新添数据的长度）
  const arrayLength = tableData.value.length + 1
  //添加数据，数组长度加一
  if (arrayLength == (tableData.value.length + addCount)) {

    editForm.value = {...baseEditForm, edit: true, reportDate: convertDateFormat(queryConditions.reportDate as Date, true)}
    // tableData.value.push(insertConditions);
    tableData.value.push(editForm.value)

  } else {
    ElMessage({
      type: 'info',
      message: '请先完成当前操作！'
    })
  }
}

//确认添加
const confirmAdd = async (row) => {
  console.log(row)

  // const param = {...row, stationId: stationStore.stationId, powerGeneration: Number(row.powerGeneration), useHours: Number(row.useHours)}
  const param = {...row, stationId: stationStore.stationId, powerGeneration: Number(editForm.value.powerGeneration), useHours: Number(editForm.value.useHours)}
  delete param.edit;
  delete param.addedit;

  try {
    // id 存在为修改， 否则为添加
    if(param.id){
      delete param.stationId
      const res = await modifyReport(param)
      ElMessage.success('编辑成功')
    }else{
      const res = await insertReport(param)
      ElMessage.success('添加成功')
    }
    addCount = 0
    insertConditions.addedit = false
    insertConditions.edit = false
    await getTableData()
  }catch (err) {
    console.log('request err', err)
  }

  //发送请求的标志
  // let flag = true
}

//修改
const editData = (row: any, index: number) => {
  //避免编辑的同时，还可以添加数据
  addCount++;
  editForm.value = {...row}

  for (let i = 0; i < tableData.value.length; i++) {
    if (i === index) {
      ElMessage({
        type: 'info',
        message: '在修改数据时，只允许对一条数据进行操作'
      })
      tableData.value[i].edit = true
      // 如果有添加数据， 就把当前添加的数据pop出去
      if (insertConditions.addedit) {
        tableData.value.pop()
        row.addedit = false
        // ElMessage({
        //   type: 'warning',
        //   message: '取消添加操作'
        // })
      }

    } else {
      tableData.value[i].edit = false

    }
  }
}

//删除
const deleteData = (row) => {
  ElMessageBox.confirm(
      '确定要永久删除这条数据吗?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        deleteReport({id: row.id}).then(res => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getTableData()
          }
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消该操作',
        })
      })
}

//取消
const cancel = (row: DailyReportPhotovoltaicPowerPlantA) => {

  row.edit = false
  row.addedit = false
  //重置添加数据的点击次数
  addCount = 0

  ElMessage({
    type: 'info',
    message: '取消操作'
  })
  getTableData()
}


</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {}
</style>
