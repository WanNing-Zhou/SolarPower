<template>
  <section class="statistics-electricity-loss">
    <el-container>
      <el-header class="filter-from" height="38px">
        <el-text class="mx-1">起止日期：</el-text>
        <el-date-picker v-model="queryCondition.filterTime" type="daterange" start-placeholder="年度开始时间"
          end-placeholder="选择时间" />
        &nbsp;&nbsp;
        <el-button type="primary" @click="getLossTableData">查询</el-button>
        &nbsp;
        <el-button type="primary" @click="addData">添加数据</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData" size="small" border show-summary :summary-method="getSummaries">
          <el-table-column prop="stationName" width="180" label="站名" />
          <el-table-column prop="reportDate" label="停电时间" width="140">
            <template #default="scope">
              <el-date-picker size="small" v-model="editForm.reportDate" type="date" placeholder="日期"
                v-if="scope.row.edit" />
              <span v-else>{{ scope.row.reportDate }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="duration" label="停电时长（分钟）" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.duration" placeholder=""></el-input>
              <span v-else>{{ scope.row.duration }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="loss" label="少发电量" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.loss" placeholder=""></el-input>
              <span v-else>{{ scope.row.loss }}</span>
            </template>
          </el-table-column>
          <!--用户输入-->
          <el-table-column prop="violationCount" width="150" label="现场工作违章次数">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.violationCount"></el-input>
              <span v-else>{{ scope.row.violationCount }}</span>
            </template>
          </el-table-column>

          <!--用户输入-->
          <el-table-column prop="responseTime" width="150" label="接单响应时间">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.responseTime"></el-input>
              <span v-else>{{ scope.row.responseTime }}</span>
            </template>
          </el-table-column>


          <!--用户输入-->
          <el-table-column prop="secondaryLoss" width="120" label="次生灾害损失">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="editForm.secondaryLoss"></el-input>
              <span v-else>{{ scope.row.secondaryLoss }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200">
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
        <el-divider />

        <el-divider />
        <!-- 分页插件 -->
        <el-pagination v-model:current-page="queryCondition.page" v-model:page-size="queryCondition.pageSize"
          :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="queryCondition.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />

      </el-main>
    </el-container>
  </section>
</template>

<script setup lang="ts">

import { Checked } from "@element-plus/icons-vue";
import { computed, Ref, ref, onMounted, watch, reactive } from "vue";
import { StatisticsElectricityLoss } from "@/type";
import { useRoute } from "vue-router";
import type { TableColumnCtx } from 'element-plus';
import { LossQueryParams, LossInsertParams, LossModifyParams, LossDeleteParams } from '@/type/request/report'
import { convertDateFormat } from "@/utils/dateUtils";
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { queryLossEl, insertLossEL, deleteLossEL, modifyLossEL } from '@/api/apireport'
import {useStationStore} from "@/store/pinia/station";
//使用store
const store = useStore()
const stationStore = useStationStore()
// 使用路由参数
const route = useRoute()
//选择电站的下拉框
interface SummaryMethodProps<T = StatisticsElectricityLoss> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
//电站下拉框选项
const options: any = ref([])
//获取当前年份的1月1号
const getStartDate = (date: Date) => {

  date.setMonth(0)
  date.setDate(1)
  return date
}
//添加数据的点击次数
let addCount = 0
//取消被点击状态
const cancelStatus = ref(0)
// 列表数据
const tableData: Ref<StatisticsElectricityLoss[]> = ref([])

//获取损失电量的数据
const getLossTableData = async () => {
  queryCondition.value.startDate = convertDateFormat(queryCondition.value.filterTime[0], true)
  queryCondition.value.endDate = convertDateFormat(queryCondition.value.filterTime[1], true)
  const param = {
    page: queryCondition.value.page,
    pageSize: queryCondition.value.pageSize,
    startDate: convertDateFormat(queryCondition.value.filterTime[0], true),
    endDate: convertDateFormat(queryCondition.value.filterTime[1], true),
    stationId: stationStore.stationId
  }
  try {
    const res = await queryLossEl(param)
    tableData.value = res.data.data
    queryCondition.value.total = res.data.totalRecords
    addCount = 0
  }catch (err){
    console.log('request err', err)
  }
}

// 编辑源数据
const baseEditData = {
  edit: false,
  duration: 0, // 停电时长
  loss: 0, // 损失电量
  reportDate: "", // 上报时间
  responseTime: "", // 响应时间
  secondaryLoss: "", // 次损失
  stationName: stationStore.stationName, // 电站名称
  violationCount: 0 // 违章次数
}

// 编辑表单
const editForm = ref({...baseEditData})

//查询参数
const queryCondition: Ref<LossQueryParams> = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

//添加参数
let insertConditions = reactive<LossInsertParams>({})

const cancelStatus1 = computed(() => {
  return cancelStatus.value
})
watch(cancelStatus1, (newValue) => {
  if (newValue === 1)
  {
    console.log(`新值为${newValue}`)
  }
})


// 添加数据
const addData = () => {
  //自动加一
  addCount++
  //重置取消状态
  cancelStatus.value = 1
  //保存当前长度（数组长度加上新添数据的长度）
  const arrayLength = tableData.value.length + 1

  //添加数据，数组长度加一
  if (arrayLength == (tableData.value.length + addCount)) {

    editForm.value = {...baseEditData, reportDate:convertDateFormat(new Date(), true) , edit: true}

    tableData.value.push({...editForm.value})

  } else {
    ElMessage({
      type: 'info',
      message: '请先完成当前操作！'
    })
  }
}

//确认添加
const confirmAdd = async (row: StatisticsElectricityLoss) => {

  const param: any = {
    ...editForm.value,
    reportDate: convertDateFormat(editForm.value.reportDate, true),
    loss: Number(editForm.value.loss),
    violationCount: Number(editForm.value.violationCount),
    duration: Number(editForm.value.duration)
  }
  delete param.edit;
  delete param.stationName;
  try {
    // 当row。id存在为修改， 欧股则为添加
    if(row.id){

      const res =  await modifyLossEL(param)
      ElMessage.success('编辑成功')

    }else {
      param.stationId = stationStore.stationId
      const res = await insertLossEL(param)
      ElMessage({
        type: 'success',
        message: '添加成功'
      })
    }
    await  getLossTableData()

    addCount = 0
  }catch(err){
    console.error('request err', err )
  }

}

//修改
const editData = (row: any, index: number) => {
  //避免编辑的同时，还可以添加数据
  addCount++

  for (let i = 0; i < tableData.value.length; i++) {
    if (i === index) {
      ElMessage({
        type: 'info',
        message: '在对数据进行操作时，只允许对一条数据进行操作'
      })

      tableData.value[i].edit = true
      editForm.value = {...row}

      if (insertConditions.addedit) {
        insertConditions = reactive({})
        tableData.value.pop()
        row.addedit = false
      }

    } else {
      tableData.value[i].edit = false
    }
  }
}

//删除
const deleteData = (row: StatisticsElectricityLoss) => {

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
      deleteLossEL({id: row.id as number}).then(res => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getLossTableData()
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
const cancel = (row: StatisticsElectricityLoss) => {

  row.edit = false
  row.addedit = false
  //重置添加数据的点击次数
  addCount = 0
  //被点击了
  cancelStatus.value = 0

  if (row.addedit) {
    insertConditions = reactive({})
    tableData.value.pop()
    row.addedit = false
  }

  ElMessage({
    type: 'info',
    message: '取消操作'
  })
  getLossTableData()

}

// 当前页大小发生变化时触发
const handleSizeChange = (val: number) => {
  //修改页面大小
  queryCondition.value.pageSize = val
  getLossTableData()

}
const handleCurrentChange = (val: number) => {
  queryCondition.value.page = val
  getLossTableData()
}

//合计
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index !== 7 && index !== 1 && index !== 5 && index !== 6 && index !== 4) {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      const values = data.map((item) => Number(item[column.property]))
      if (!values.every((value) => Number.isNaN(value))) {
        sums[index] = ` ${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)}`
      } else {
        sums[index] = ''
      }
    }
  }
  )
  return sums
}

onMounted(() => {
  queryCondition.value.filterTime = [getStartDate(new Date()), new Date()]
  getLossTableData()
})
</script>

<style lang="scss" scoped>
.statistics-electricity-loss {}

.el-select {
  width: 220px;
  margin-right: 50px;
}
</style>
