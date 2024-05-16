/**
* @FileNAme src\views\DataShow\components\DailyReportPhotovoltaicPowerPlantB.vue
* @author 周万宁
* @create 2023/8/14-23:33
* @version
* @description 光伏电站日报表b
*/
1
<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-text class="mx-1">选择年月：</el-text>
        <el-date-picker v-model="queryConditions.reportDate" type="month" placeholder="选择月份" @change="getReportTable" />
        &nbsp;&nbsp;
        <el-button type="primary" @click="getReportTable">查询</el-button>
      </el-header>
      <el-main>
        <el-table :header-cell-style="{ 'text-align': 'center' }" :data="tableData">
          <!--  日期     -->
          <el-table-column prop="date" label="日期" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.date"></el-input>
              <span v-else>{{ convertDateFormat(scope.row.date, true) }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column label="品柏">
            <el-table-column prop="pinbai.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.pinbai.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.pinbai.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pinbai.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.pinbai.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.pinbai.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pinbai.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.pinbai.usageTime"></el-input>
                <span v-else>{{ scope.row.pinbai.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="和旺">
            <el-table-column prop="hewang.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.hewang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.hewang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hewang.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.hewang.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.hewang.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hewang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.hewang.usageTime"></el-input>
                <span v-else>{{ scope.row.hewang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="一厂">
            <el-table-column prop="yichang.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.yichang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yichang.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.yichang.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yichang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.usageTime"></el-input>
                <span v-else>{{ scope.row.yichang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="二厂">
            <el-table-column prop="erchang.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.erchang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="erchang.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.erchang.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="erchang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.usageTime"></el-input>
                <span v-else>{{ scope.row.erchang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="三马架">
            <el-table-column prop="sanmajia.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sanmajia.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.sanmajia.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sanmajia.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sanmajia.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.sanmajia.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sanmajia.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sanmajia.usageTime"></el-input>
                <span v-else>{{ scope.row.sanmajia.usageTime }}</span>
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
import { DailyReportPhotovoltaicPowerPlantB } from "@/type";
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { ReportParams, ReportInsertParams, ReportModifyParams } from '@/type/request/report'
import { getReport, insertReport, modifyReport, deleteReport } from '@/api/apireport'
import { ElMessage, ElMessageBox } from 'element-plus'

// 表格数据
const tableData: Ref<Array<DailyReportPhotovoltaicPowerPlantB>> = ref([])

//查询参数
const queryConditions = reactive<ReportParams>({})
//添加参数
let insertConditions = reactive<DailyReportPhotovoltaicPowerPlantB>({
  date: '',
  pinbai: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  },
  hewang: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  },
  yichang: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  },
  erchang: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  },
  sanmajia: {
    dailyOperationStatus: '',
    dailyPowerGeneration: 0,
    usageTime: 0
  }
})
//添加数据的点击次数
let addCount = 0
//电站数组
const stationNumber = ['PV005', 'PV006', 'PV007', 'PV008', 'PV009']


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
const confirmAdd = (row: DailyReportPhotovoltaicPowerPlantB) => {
  //添加参数
  let insertList = reactive<Array<ReportInsertParams>>([])
  //修改参数
  let modifyList = reactive<Array<ReportModifyParams>>([])
  //发送请求的标志
  let flag = true


  if (row.addedit) {
    for (let i = 0; i < 5; i++) {
      let tempObj = reactive<ReportInsertParams>({})
      tempObj.companyNumber = 'C004'
      tempObj.reportDate = row.date
      if (i === 0) {
        tempObj.stationNumber = 'PV006'
        tempObj.operationStatus = row.pinbai.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.pinbai.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.pinbai.usageTime)
      } else if (i === 1) {
        tempObj.stationNumber = 'PV007'
        tempObj.operationStatus = row.hewang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.hewang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.hewang.usageTime)

      } else if (i === 2) {
        tempObj.stationNumber = 'PV008'
        tempObj.operationStatus = row.yichang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.yichang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.yichang.usageTime)

      } else if (i === 3) {
        tempObj.stationNumber = 'PV009'
        tempObj.operationStatus = row.erchang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.erchang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.erchang.usageTime)
      } else {
        tempObj.companyNumber = 'C003'
        tempObj.stationNumber = 'PV005'
        tempObj.operationStatus = row.sanmajia.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.sanmajia.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.sanmajia.usageTime)
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
          insertConditions = reactive<DailyReportPhotovoltaicPowerPlantB>({
            date: '',
            pinbai: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            hewang: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            yichang: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            erchang: {
              dailyOperationStatus: '',
              dailyPowerGeneration: 0,
              usageTime: 0
            },
            sanmajia: {
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
    for (let i = 0; i < 5; i++) {
      let tempObj = reactive<ReportModifyParams>({})

      if (i === 0) {
        tempObj.id = row.pinbai.id
        tempObj.operationStatus = row.pinbai.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.pinbai.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.pinbai.usageTime)

      } else if (i === 1) {
        tempObj.id = row.hewang.id
        tempObj.operationStatus = row.hewang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.hewang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.hewang.usageTime)

      } else if (i === 2) {
        tempObj.id = row.yichang.id
        tempObj.operationStatus = row.yichang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.yichang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.yichang.usageTime)

      } else if (i === 3) {
        tempObj.id = row.erchang.id
        tempObj.operationStatus = row.erchang.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.erchang.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.erchang.usageTime)

      } else {
        tempObj.id = row.sanmajia.id
        tempObj.operationStatus = row.sanmajia.dailyOperationStatus
        tempObj.powerGeneration = parseFloat(row.sanmajia.dailyPowerGeneration)
        tempObj.useHours = parseFloat(row.sanmajia.usageTime)
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
const editData = (row: DailyReportPhotovoltaicPowerPlantB, index: number) => {
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
          pinbai: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          hewang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          yichang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          erchang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          sanmajia: {
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
const deleteData = (row: DailyReportPhotovoltaicPowerPlantB) => {
  let idList = reactive<number[]>([])
  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      idList.push(row.pinbai.id as number)
    } else if (i === 1) {
      idList.push(row.hewang.id as number)
    } else if (i === 2) {
      idList.push(row.yichang.id as number)
    } else if (i === 3) {
      idList.push(row.erchang.id as number)
    } else {
      idList.push(row.sanmajia.id as number)
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
const cancel = (row: DailyReportPhotovoltaicPowerPlantB) => {

  row.edit = false
  row.addedit = false
  //重置添加数据的点击次数
  addCount = 0
  if (row.addedit) {
    insertConditions = reactive({
      date: '',
      pinbai: {
        dailyOperationStatus: '',
        dailyPowerGeneration: 0,
        usageTime: 0
      },
      hewang: {
        dailyOperationStatus: '',
        dailyPowerGeneration: 0,
        usageTime: 0
      },
      yichang: {
        dailyOperationStatus: '',
        dailyPowerGeneration: 0,
        usageTime: 0
      },
      erchang: {
        dailyOperationStatus: '',
        dailyPowerGeneration: 0,
        usageTime: 0
      },
      sanmajia: {
        dailyOperationStatus: '',
        dailyPowerGeneration: 0,
        usageTime: 0
      }
    })
    tableData.value.pop()
    row.addedit = false
  }

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
    if (queryConditions.stationNumber === 'PV005') {
      queryConditions.companyNumber = 'C003'
    } else {
      queryConditions.companyNumber = 'C004'
    }
    console.log('查询参数', queryConditions)
    sendQueryReport(queryConditions)
  }
  console.log('报表B的数据', tableData.value)
}
//发送报表查询的请求
const sendQueryReport = (condition: ReportParams) => {

  getReport(condition).then(res => {
    if (res.code === 200) {
      if (res.data.length !== 0) {
        console.log(res)
        //定义一个电站的对象
        let stationObj = reactive<DailyReportPhotovoltaicPowerPlantB>({
          date: '',
          pinbai: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          hewang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          yichang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          erchang: {
            dailyOperationStatus: '',
            dailyPowerGeneration: 0,
            usageTime: 0
          },
          sanmajia: {
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
              if (res.data[0].stationName === '品柏') {
                stationObj.pinbai.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.pinbai.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.pinbai.usageTime = res.data[0].records[i].useHours
                stationObj.pinbai.id = res.data[0].records[i].id

              } else if (res.data[0].stationName === '和旺') {
                stationObj.hewang.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.hewang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.hewang.usageTime = res.data[0].records[i].useHours
                stationObj.hewang.id = res.data[0].records[i].id

              } else if (res.data[0].stationName === '一厂') {
                stationObj.yichang.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.yichang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.yichang.usageTime = res.data[0].records[i].useHours
                stationObj.yichang.id = res.data[0].records[i].id

              } else if (res.data[0].stationName === '二厂') {
                stationObj.erchang.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.erchang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.erchang.usageTime = res.data[0].records[i].useHours
                stationObj.erchang.id = res.data[0].records[i].id
              } else {
                stationObj.sanmajia.dailyOperationStatus = res.data[0].records[i].operationStatus
                stationObj.sanmajia.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                stationObj.sanmajia.usageTime = res.data[0].records[i].useHours
                stationObj.sanmajia.id = res.data[0].records[i].id
              }

              tableData.value.push(stationObj)

              stationObj = reactive<DailyReportPhotovoltaicPowerPlantB>({
                date: '',
                pinbai: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                hewang: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                yichang: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                erchang: {
                  dailyOperationStatus: '',
                  dailyPowerGeneration: 0,
                  usageTime: 0
                },
                sanmajia: {
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
                  if (res.data[0].stationName === '品柏') {
                    tableData.value[i].pinbai.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].pinbai.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].pinbai.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].pinbai.id = res.data[0].records[i].id

                  } else if (res.data[0].stationName === '和旺') {
                    tableData.value[i].hewang.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].hewang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].hewang.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].hewang.id = res.data[0].records[i].id

                  } else if (res.data[0].stationName === '一厂') {
                    tableData.value[i].yichang.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].yichang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].yichang.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].yichang.id = res.data[0].records[i].id

                  } else if (res.data[0].stationName === '二厂') {
                    tableData.value[i].erchang.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].erchang.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].erchang.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].erchang.id = res.data[0].records[i].id
                  } else {
                    tableData.value[i].sanmajia.dailyOperationStatus = res.data[0].records[i].operationStatus
                    tableData.value[i].sanmajia.dailyPowerGeneration = res.data[0].records[i].powerGeneration
                    tableData.value[i].sanmajia.usageTime = res.data[0].records[i].useHours
                    tableData.value[i].sanmajia.id = res.data[0].records[i].id
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
  queryConditions.reportDate = new Date()
  getReportTable()
})

</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {}
</style>
