<!--
  @FileNAme src\views\DataShow\components\statisticsElectricityLoss\statisticsElectricityLoss.vue
  @author 周万宁
  @create 2023/8/18-20:09
  @version
  @description 电站损失电量统计
 -->

<template>
  <section class="statistics-electricity-loss">
    <el-container>
      <el-header class="filter-from" height="38px">
        <el-text class="mx-1">选择电站：</el-text>
        <el-select v-model="queryCondition.stationNumber" class="m-2" placeholder="选择电站">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" clearable />
        </el-select>
        <el-text class="mx-1">起止日期：</el-text>
        <el-date-picker v-model="queryCondition.filterTime" type="daterange" start-placeholder="年度开始时间"
          end-placeholder="选择时间" />
        &nbsp;&nbsp;
        <el-button type="primary" @click="getLossTableData">查询</el-button>
      </el-header>

      <el-main>
        <el-table :data="tableData" size="small" border show-summary :summary-method="getSummaries">
          <el-table-column prop="stationName" width="180" label="站名" />
          <el-table-column prop="date" label="停电时间" width="140">
            <template #default="scope">
              <el-date-picker size="small" v-model="scope.row.date" type="date" placeholder="日期"
                v-if="scope.row.addedit" />
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="duration" label="停电时长" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.duration" placeholder=""></el-input>
              <span v-else>{{ scope.row.duration }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="loss" label="少发电量" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.loss" placeholder=""></el-input>
              <span v-else>{{ scope.row.loss }}</span>
            </template>
          </el-table-column>
          <!--用户输入-->
          <el-table-column prop="violationCount" width="150" label="现场工作违章次数">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.violationCount"></el-input>
              <span v-else>{{ scope.row.violationCount }}</span>
            </template>
          </el-table-column>

          <!--用户输入-->
          <el-table-column prop="responseTime" width="150" label="接单响应时间">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.responseTime"></el-input>
              <span v-else>{{ scope.row.responseTime }}</span>
            </template>
          </el-table-column>


          <!--用户输入-->
          <el-table-column prop="secondaryLoss" width="120" label="次生灾害损失">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.secondaryLoss"></el-input>
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
        <el-button type="primary" @click="addData">添加数据</el-button>
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
//使用store
const store = useStore()
// 使用路由参数
const route = useRoute()
//选择电站的下拉框
interface SummaryMethodProps<T = StatisticsElectricityLoss> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
//电站下拉框选项
const options: any = ref([])
const options1 = [
  {
    value: '0000',
    label: '请选择',
  },
  {
    value: 'PV001',
    label: '陕西中铁科技园区光伏电站',
  },
  {
    value: 'PV002',
    label: '神木富油科技能源有限公司',
  },
  {
    value: 'PV003',
    label: '西安京东亚一园站',
  }
]
const options2 = [
  {
    value: '0000',
    label: '请选择',
  },
  {
    value: 'PV004',
    label: '西安菲尔特2.5MW光伏项目',
  }
]
const options3 = [
  {
    value: '0000',
    label: '请选择',
  },
  {
    value: 'PV005',
    label: '望奎三马架发电站',
  }
]
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
const tableData1: Ref<StatisticsElectricityLoss[]> = ref([])
//查询参数
const queryCondition: Ref<LossQueryParams> = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

//添加参数
let insertConditions = reactive<LossInsertParams>({})
let insertConditionsList = reactive<Array<LossInsertParams>>([])
//修改参数
let modifyConditions = reactive<LossModifyParams>({})
let modifyConditionsList = reactive<Array<LossModifyParams>>([])
//删除参数
let deleteConditionsList = reactive<Array<LossDeleteParams>>([])
let deleteConditions = reactive<LossDeleteParams>({})

let stationNameTemp = ''

const cancelStatus1 = computed(() => {
  return cancelStatus.value
})
watch(cancelStatus1, (newValue) => {
  if (newValue === 1)
  {
    console.log(`新值为${newValue}`)
  }
   
})

//监听左侧电站，如果电站的路由发生变化时就调用分页查询
//计算电站
const stationRouter = computed(() => {
  return route.params.label as string
})
//监听
watch(stationRouter, () => {
  queryCondition.value.stationNumber = route.params.id as string
  stationNameTemp = route.params?.label as string
  addCount = 0
  switch (route.params?.label) {
    case '陕西信惠翔新能源有限公司':
      options.value = options1
      break
    case '西安隆菲阳新能源有限公司':
      options.value = options2
      break
    case '三马架新能源有限公司':
      options.value = options3
      break
    default:
      if (route.params?.label === '西安菲尔特2.5MW光伏项目') {
        options.value = options2
        store.commit('setcompanyNumber', 'C002')

      } else if (route.params?.label === '望奎三马架发电站') {
        options.value = options3
        store.commit('setcompanyNumber', 'C003')
      } else {
        options.value = options1
        store.commit('setcompanyNumber', 'C001')
      }

      break


  }
  getLossTableData()
}, {
  deep: true
})

//计算选择电站，避免选择框中显示公司的value
const stationNumber = computed(() => {
  return queryCondition.value.stationNumber
}
)
//监听stationNumber
watch(stationNumber, (newValue) => {
  addCount = 0
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i].value === newValue) {
      stationNameTemp = options.value[i].label
    }
  }
  if (queryCondition.value.stationNumber === 'C001' || queryCondition.value.stationNumber === 'C002' || queryCondition.value.stationNumber === 'C003') {
    queryCondition.value.stationNumber = '0000'
  } else {
    queryCondition.value.stationNumber = newValue
  }

}, {
  deep: true
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
    insertConditions.companyNumber = store.state.companyNumber
    if ((route.params?.label === '陕西信惠翔新能源有限公司' || route.params?.label === '西安隆菲阳新能源有限公司' || route.params?.label === '三马架新能源有限公司') && (stationNameTemp === '' || stationNameTemp === '请选择')) {
      ElMessage({
        type: 'warning',
        message: '请选择电站'
      })
      addCount = 0
      return
    }

    insertConditions.stationName = stationNameTemp === '请选择' ? route.params.label : stationNameTemp
    insertConditions.stationNumber = route.params?.id as string
    insertConditions.date = convertDateFormat(new Date(), true)
    insertConditions.edit = true
    insertConditions.addedit = true
    tableData.value.push(insertConditions)

  } else {
    ElMessage({
      type: 'info',
      message: '请先完成当前操作！'
    })
  }


}

//确认添加
const confirmAdd = async (row: StatisticsElectricityLoss) => {
  //对数据进行计算
  // computedData(row)

  if (row.addedit) {
    insertConditions.duration = row.duration
    insertConditions.loss = row.loss
    insertConditions.responseTime = row.responseTime
    insertConditions.secondaryLoss = row.secondaryLoss
    insertConditions.violationCount = row.violationCount
    insertConditions.date = convertDateFormat(row.date, true)

    insertConditionsList.push(insertConditions)


    const queryCondition1: Ref<LossQueryParams> = ref({
      page: 1,
      pageSize: 100000,
      total: 0
    })
    queryCondition1.value.companyNumber = queryCondition.value.companyNumber
    queryCondition1.value.stationNumber = queryCondition.value.stationNumber
    queryCondition1.value.startDate = insertConditions.date
    queryCondition1.value.endDate = insertConditions.date
    await queryLossEl(queryCondition1.value).then(res => {
      if (res.code === 200) {
        tableData1.value = res.data.data
      }
    })
    if (tableData1.value.length !== 0) {
      ElMessage({
        type: 'warning',
        message: `所添加的电站存在同日期${insertConditions.date}的数据，请重新选择日期或者修改数据`
      })
      getLossTableData()
      row.addedit = false
      addCount = 0
      row.edit = false
      insertConditions = reactive<LossInsertParams>({})
      insertConditionsList.pop()
      return
    }





    insertLossEL(insertConditionsList).then(res => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
        getLossTableData()
        row.addedit = false
        addCount = 0
        row.edit = false
        insertConditions = reactive<LossInsertParams>({})
        // insertConditionsList = reactive<Array<LossInsertParams>>([])
        insertConditionsList.pop()
      } else {
        ElMessage({
          type: 'warning',
          message: '同日期的记录已存在'
        })
        addCount = 0
        insertConditions = reactive<LossInsertParams>({})
        insertConditionsList.pop()
      }

    })
      .catch(() => {
        insertConditions = reactive<LossInsertParams>({})
        insertConditionsList.pop()
      })
  } else {

    modifyConditions.id = row.id
    modifyConditions.duration = row.duration
    modifyConditions.loss = row.loss
    modifyConditions.responseTime = row.responseTime
    modifyConditions.secondaryLoss = row.secondaryLoss
    modifyConditions.violationCount = row.violationCount

    modifyConditionsList.push(modifyConditions)


    modifyLossEL(modifyConditionsList).then(res => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        getLossTableData()
        row.addedit = false
        addCount = 0
        row.edit = false
        modifyConditions = reactive<LossModifyParams>({})
        modifyConditionsList = reactive<Array<LossModifyParams>>([])
      }

    })

  }
}

//修改
const editData = (row: StatisticsElectricityLoss, index: number) => {
  //避免编辑的同时，还可以添加数据
  addCount++

  for (let i = 0; i < tableData.value.length; i++) {
    if (i === index) {
      ElMessage({
        type: 'info',
        message: '在对数据进行操作时，只允许对一条数据进行操作'
      })



      tableData.value[i].edit = true

      if (insertConditions.addedit) {
        insertConditions = reactive({})
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
const deleteData = (row: StatisticsElectricityLoss) => {

  deleteConditions.id = row.id
  deleteConditionsList.push(deleteConditions)

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
      deleteLossEL(deleteConditionsList).then(res => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getLossTableData()
          deleteConditionsList = reactive<Array<LossDeleteParams>>([])
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
//获取损失电量的数据
const getLossTableData = () => {
  queryCondition.value.startDate = convertDateFormat(queryCondition.value.filterTime[0], true)
  queryCondition.value.endDate = convertDateFormat(queryCondition.value.filterTime[1], true)
  if (store.state.companyNumber !== '') {
    queryCondition.value.companyNumber = store.state.companyNumber
    // queryCondition.value.stationNumber = route.params.id
  } else {
    ElMessage({
      type: 'warning',
      message: '请先选择公司！！'
    })
  }
  console.log('损失电量的请求参数', queryCondition.value)

  if (queryCondition.value.stationNumber === '0000') {
    delete queryCondition.value.stationNumber
  }
  queryLossEl(queryCondition.value).then(res => {
    if (res.code === 200) {
      console.log(res)
      tableData.value = res.data.data
      queryCondition.value.total = res.data.totalRecords
    }
  })
  addCount = 0




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
  options.value = options1

})
</script>

<style lang="scss" scoped>
.statistics-electricity-loss {}

.el-select {
  width: 220px;
  margin-right: 50px;
}
</style>
