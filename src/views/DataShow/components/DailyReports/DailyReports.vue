/**
* @FileNAme src\views\DataShow\components\DailyReportPhotovoltaicPowerPlant.vue
* @author 周万宁
* @create 2023/8/14-23:02
* @version
* @description 光伏电站日报表
*/

<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-text class="mx-1">选择年月：</el-text>
        <el-date-picker v-model="queryConditions.reportDate" type="month" placeholder="选择月份" />
        &nbsp;&nbsp;
        <el-button type="primary" @click="getReportTable">查询</el-button>
      </el-header>
      <el-main>
        <el-table :header-cell-style="{ 'text-align': 'center' }" :data="tableData" height="380px">
          <!--  日期     -->
          <el-table-column prop="date" label="日期" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.date"></el-input>
              <span v-else>{{ convertDateFormat(scope.row.date, true) }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column :label="stationStore.stationName">
            <el-table-column prop="jingdong.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.jingdong.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.jingdong.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jingdong.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.jingdong.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.jingdong.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jingdong.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.jingdong.usageTime"></el-input>
                <span v-else>{{ scope.row.jingdong.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
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
const tableData: Ref<Array<DailyReportPhotovoltaicPowerPlantA>> = ref([])

//查询参数
const queryConditions = reactive<ReportParams>({})
//添加参数
let insertConditions = reactive<DailyReportPhotovoltaicPowerPlantA>({
  date: '',
  jingdong: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  }
})
//添加数据的点击次数
let addCount = 0
//电站数组
const stationNumber = ['PV001', 'PV002', 'PV003', 'PV004']


// 添加数据
const addData = () => {
  //自动加一
  addCount++
  //保存当前长度（数组长度加上新添数据的长度）
  const arrayLength = tableData.value.length + 1

  //添加数据，数组长度加一
  if (arrayLength == (tableData.value.length + addCount)) {

    insertConditions.edit = true
    insertConditions.date = convertDateFormat(queryConditions.reportDate, true)
    insertConditions.addedit = true
    tableData.value.push(insertConditions);

  } else {
    ElMessage({
      type: 'info',
      message: '请先完成当前操作！'
    })
  }


}

//确认添加
const confirmAdd = (row: DailyReportPhotovoltaicPowerPlantA) => {

  //添加参数
  let insertList = reactive<Array<ReportInsertParams>>([])
  //修改参数
  let modifyList = reactive<Array<ReportModifyParams>>([])
  //发送请求的标志
  let flag = true


  if (row.addedit) {
    for (let i = 0; i < 4; i++) {
      let tempObj = reactive<ReportInsertParams>({})
      tempObj.companyNumber = 'C001'
      tempObj.reportDate = row.date
      if (i === 0) {
        tempObj.stationNumber = 'PV003'
        tempObj.operationStatus = row.jingdong.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.jingdong.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.jingdong.usageTime)
      } else if (i === 1) {
        tempObj.stationNumber = 'PV001'
        tempObj.operationStatus = row.zhongtie.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.zhongtie.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.zhongtie.usageTime)

      } else if (i === 2) {
        tempObj.stationNumber = 'PV002'
        tempObj.operationStatus = row.fuyou.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.fuyou.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.fuyou.usageTime)

      } else {
        tempObj.companyNumber = 'C002'
        tempObj.stationNumber = 'PV004'
        tempObj.operationStatus = row.feierte.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.feierte.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.feierte.usageTime)
      }

      if (tempObj.operationStatus === '' || tempObj.powerGeneration === 0 || tempObj.useHours === 0) {
        flag = false
      } else {
        insertList.push(tempObj)
      }

    }
    if (flag) {
      //发送添加请求
      insertReport(insertList).then(res => {
        console.log(res)
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '添加成功'
          })
          getReportTable()
          row.addedit = false
          addCount = 0
          row.edit = false
          insertConditions = reactive<DailyReportPhotovoltaicPowerPlantA>({
            date: '',
            jingdong: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            zhongtie: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            fuyou: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            feierte: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            }
          })
        } else {
          addCount = 0
        }
      })
    } else {
      ElMessage({
        type: 'warning',
        message: '数据未添加完整，请补充完整'
      })
    }
  } else {
    for (let i = 0; i < 4; i++) {
      let tempObj = reactive<ReportModifyParams>({})

      if (i === 0) {
        tempObj.id = row.jingdong.id
        tempObj.operationStatus = row.jingdong.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.jingdong.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.jingdong.usageTime)

      } else if (i === 1) {
        tempObj.id = row.zhongtie.id
        tempObj.operationStatus = row.zhongtie.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.zhongtie.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.zhongtie.usageTime)

      } else if (i === 2) {
        tempObj.id = row.fuyou.id
        tempObj.operationStatus = row.fuyou.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.fuyou.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.fuyou.usageTime)

      } else {
        tempObj.id = row.feierte.id
        tempObj.operationStatus = row.feierte.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.feierte.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.feierte.usageTime)
      }
      modifyList.push(tempObj)


    }

    modifyReport(modifyList).then(res => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        getReportTable()
        row.addedit = false
        addCount = 0
        row.edit = false
      }
    })
  }
}

//修改
const editData = (row: DailyReportPhotovoltaicPowerPlantA, index: number) => {
  //避免编辑的同时，还可以添加数据
  addCount++

  for (let i = 0; i < tableData.value.length; i++) {
    if (i === index) {
      ElMessage({
        type: 'info',
        message: '在修改数据时，只允许对一条数据进行操作'
      })


      tableData.value[i].edit = true
      if (insertConditions.addedit) {
        insertConditions = reactive({
          date: '',
          jingdong: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          zhongtie: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          fuyou: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          feierte: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          }
        })
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
const deleteData = (row: DailyReportPhotovoltaicPowerPlantA) => {
  let idList = reactive<number[]>([])
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      idList.push(row.jingdong.id as number)
    } else if (i === 1) {
      idList.push(row.zhongtie.id as number)
    } else if (i === 2) {
      idList.push(row.fuyou.id as number)
    } else {
      idList.push(row.feierte.id as number)
    }
  }

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
        deleteReport(idList).then(res => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getReportTable()

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
  getReportTable()

}
//获取报表的数据
const getReportTable = () => {
  addCount = 0
  tableData.value = []
  queryConditions.reportDate = convertDateFormat(queryConditions.reportDate, false)

  for (let i = 0; i < stationNumber.length; i++) {
    queryConditions.stationNumber = stationNumber[i]
    if (queryConditions.stationNumber === 'PV004') {
      queryConditions.companyNumber = 'C002'
    } else {
      queryConditions.companyNumber = 'C001'
    }
    console.log('查询参数', queryConditions)
    sendQueryReport(queryConditions)
  }
  console.log('报表A的数据', tableData.value)
}

//发送报表查询的请求
const sendQueryReport = (condition: ReportParams) => {

  getReport(condition).then(res => {
    if (res.code === 200) {
      if (res.data.length !== 0) {
        console.log(res)
        //定义一个电站的对象
        let stationObj = reactive<DailyReportPhotovoltaicPowerPlantA>({
          date: '',
          jingdong: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          zhongtie: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          fuyou: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          feierte: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          }
        })
        //判断数组并添加数据
        if (tableData.value.length === 0) {

          if (res.data[0].records.length !== 0) {
            for (let i = 0; i < res.data[0].records.length; i++) {
              stationObj.date = res.data[0].records[i].date
              if (res.data[0].stationName === '西安京东亚一园站') {
                stationObj.jingdong.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.jingdong.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.jingdong.usageTime = res.data[0].records[i].useHours
                stationObj.jingdong.id = res.data[0].records[i].id

              } else if (res.data[0].stationName === '陕西中铁科技园区光伏电站') {
                stationObj.zhongtie.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.zhongtie.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.zhongtie.usageTime = res.data[0].records[i].useHours
                stationObj.zhongtie.id = res.data[0].records[i].id

              } else if (res.data[0].stationName === '神木富油科技能源有限公司') {
                stationObj.fuyou.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.fuyou.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.fuyou.usageTime = res.data[0].records[i].useHours
                stationObj.fuyou.id = res.data[0].records[i].id

              } else {
                stationObj.feierte.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.feierte.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.feierte.usageTime = res.data[0].records[i].useHours
                stationObj.feierte.id = res.data[0].records[i].id
              }

              tableData.value.push(stationObj)

              stationObj = reactive<DailyReportPhotovoltaicPowerPlantA>({
                date: '',
                jingdong: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                zhongtie: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                fuyou: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                feierte: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                }
              })

            }
          }
        } else {
          for (let i = 0; i < tableData.value.length; i++) {
            if (res.data[0].records.length !== 0) {
              for (let i = 0; i < res.data[0].records.length; i++) {
                if (tableData.value[i].date === res.data[0].records[i].date) {
                  if (res.data[0].stationName === '西安京东亚一园站') {
                    tableData.value[i].jingdong.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].jingdong.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].jingdong.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].jingdong.id = res.data[0].records[i].id

                  } else if (res.data[0].stationName === '陕西中铁科技园区光伏电站') {
                    tableData.value[i].zhongtie.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].zhongtie.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].zhongtie.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].zhongtie.id = res.data[0].records[i].id

                  } else if (res.data[0].stationName === '神木富油科技能源有限公司') {
                    tableData.value[i].fuyou.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].fuyou.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].fuyou.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].fuyou.id = res.data[0].records[i].id

                  } else {
                    tableData.value[i].feierte.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].feierte.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].feierte.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].feierte.id = res.data[0].records[i].id
                  }
                }
              }
            }

          }
        }
      }





    }

  })

}

onMounted(() => {
  // tableData.value = summaryDataA

  // queryConditions.companyNumber = 'C001'
  queryConditions.reportDate = new Date()
  getReportTable()
})

</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {}
</style>
