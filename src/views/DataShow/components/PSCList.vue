<template>
  <div class="PSC-list">
    <el-container>
      <el-header class="filter-from" height="38px">
        <el-form :model="conditions" status-icon>
          <el-form-item class="form-item-short" label="选择电站:">
            <el-select v-model="conditions.stationNumber" class="m-2" placeholder="请选择">
              <el-option v-for="item in options " :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label-width="200px" label="记录时间" prop="filterTime">
            <el-date-picker v-model="conditions.filterTime" type="monthrange" unlink-panels range-separator="To"
              start-placeholder="Start month" end-placeholder="End month" :shortcuts="shortcuts" />

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleConfirm">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="data-operation">
          <el-button @click="exportExcel">导出Excel</el-button>
        </div>

      </el-header>

      <el-main>
        <el-table :data="tableData.value" show-summary size="small" height="380px" border :summary-method="getSummaries">
          <el-table-column prop="stationName" width="120" label="电站名称" :show-overflow-tooltip="true" />
          <el-table-column prop="date" label="日期（年月）" width="100">
            <template #default="scope">
              <el-date-picker size="small" v-model="scope.row.date" type="month" placeholder="日期" v-if="scope.row.edit" />
              <!--          <el-input v-if="scope.row.edit" v-model="scope.row.date" placeholder="关口表电量"></el-input>-->
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="inverterName" label="逆变器名称" :show-overflow-tooltip="true">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.inverterName"
                placeholder="逆变器名称"></el-input>
              <span v-else>{{ scope.row.inverterName }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="electricityConsumptionTotal" label="发电表总电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.electricityConsumptionTotal"
                placeholder="发电表总电量"></el-input>
              <span v-else>{{ scope.row.electricityConsumptionTotal }}</span>
            </template>
          </el-table-column>
          <!--用户输入-->
          <el-table-column prop="electricityOnGridTotal" width="80" label="上网总电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.electricityOnGridTotal"
                placeholder="上网总电量"></el-input>
              <span v-else>{{ scope.row.electricityOnGridTotal }}</span>
            </template>
          </el-table-column>

          <!--用户输入-->
          <el-table-column prop="onGridPowerPrice" width="80" label="上网电价">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.onGridPowerPrice"
                placeholder="上网电价"></el-input>
              <span v-else>{{ scope.row.onGridPowerPrice }}</span>
            </template>
          </el-table-column>


          <el-table-column prop="selfUsePowerPrice" width="80" label="自用电价">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.selfUsePowerPrice" placeholder="自用电价"
                @mouseleave="computedData(scope.row)"></el-input>
              <span v-else>{{ scope.row.selfUsePowerPrice }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="scenePicture" width="150" label="现场照片" :show-overflow-tooltip="true">
            <template #default="scope">
              <el-upload v-model:file-list="fileList" class="upload-demo" multiple v-if="scope.row.edit" size="small"
                action="http://124.220.61.93:8080/api/file/upload1" type="primary" link>上传图片</el-upload>

              <!-- <img :src="scope.row.scenePicture"> -->
            </template>
          </el-table-column>


          <el-table-column prop="electricitySelfUseTotal" width="80" label="自用电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.electricitySelfUseTotal"
                placeholder="自用电价"></el-input>
              <span v-else>{{ scope.row.electricitySelfUseTotal }}</span>
            </template>

          </el-table-column>

          <el-table-column prop="onGridElectricCharge" width="80" label="上网电费">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.onGridElectricCharge"
                placeholder="自用电价"></el-input>
              <span v-else>{{ scope.row.onGridElectricCharge }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="selfUseElectricCharge" width="80" label="自用电费">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.selfUseElectricCharge"
                placeholder="自用电价"></el-input>
              <span v-else>{{ scope.row.selfUseElectricCharge }}</span>
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


        <el-divider></el-divider>

        <el-pagination v-model:current-page="conditions.page" v-model:page-size="conditions.pageSize"
          :page-sizes="[5, 10, 15, 20, 40]" layout="total,sizes, prev, pager, next,jumper" :total="conditions.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <el-divider></el-divider>
        <el-button type="primary" @click="addData">添加数据</el-button>

        <EditDialog v-if="dialogVisible" :isEdit="editStatus.isEdit" @confirm="dialogConfirm" @cancel="dialogCancel" :editData="editStatus.editData" v-model:visible="dialogVisible"/>

      </el-main>
    </el-container>

  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive, ReactiveFlags, Ref, ref, computed, watch } from "vue";
import { Checked, Close } from "@element-plus/icons-vue";
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { useRoute } from "vue-router";
import type { TableColumnCtx, UploadUserFile } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'
import { ChecklistConditions, pscData, deleteSelfConditions, addSelfConditions } from '@/type/request/selfTable'
import { useStore } from 'vuex'
import { getSelfTable, editSelfTable, deleteSelfTable, addSelfTable } from '@/api/apiself'
import { Res } from '@/type/request/requestType'
import { fileParams } from '@/type/request/worksheet'
import { uploadPhotoAndVideo } from '@/api/upload'
import EditDialog from "@/views/DataShow/components/pcList/editDialog.vue";

//使用store
const store = useStore()
const route = useRoute()

const options = [
  {
    value: '0000',
    label: '请选择电站'
  },
  {
    value: 'PV001',
    label: '陕西中铁科技园区光伏电站'
  },
  {
    value: 'PV002',
    label: '神木富油科技能源有限公司'
  },
  {
    value: 'PV003',
    label: '西安京东亚一园站'
  }
]

// 文件列表
let fileList = ref<UploadUserFile[]>([])

//添加数据的点击次数
let addCount = 0

//查询条件
const conditions = reactive<ChecklistConditions>({
  companyNumber: '',
  filterTime: [],
  startDate: '',
  endDate: '',
  page: 1,
  pageSize: 10,
  total: 0
})
//添加参数
let SelfAddConditions = reactive<addSelfConditions>({})
//编辑参数
let SelfEditConditions = reactive<pscData>({})


const shortcuts = [
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

//查询
const handleConfirm = () => {

  //去除0000的请求电站编号
  if (conditions.stationNumber === '0000') {
    delete conditions.stationNumber
  }

  getSelfTableData()

}



const tableData: Array<pscData> = reactive([{}])

onMounted(() => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
  conditions.filterTime = [start, end]

})

const dialogVisible = ref(false);
// 编辑的数据
const editStatus = reactive({
  isEdit: false, // 是否是编辑状态
  editData: {} as any // 编辑的数据
})

const dialogCancel = () => {
  dialogVisible.value = false;
}
// 当显示为false时
watch(dialogVisible, ()=>{
  if(dialogVisible.value === false){
    editStatus.isEdit = false;
    // editStatus.editData = {}
  }

})


//添加
const addData = () => {
  //自动加一
  addCount++

  dialogVisible.value = true;

  //保存当前长度（数组长度加上新添数据的长度）
  const arrayLength = tableData.value.length + 1
  console.log(arrayLength)

  //添加数据，数组长度加一
  if (arrayLength == (tableData.value.length + addCount)) {
    ElMessage({
      type: 'info',
      message: '在添加数据时，自用电费、上网电费、自用电费不用添写，系统会自动计算'
    })

    SelfAddConditions.stationName = route.params.label

    SelfAddConditions.edit = true
    SelfAddConditions.addEdit = true
    tableData.value.push(SelfAddConditions)
  } else {
    ElMessage({
      type: 'info',
      message: '请先完成当前操作！'
    })
  }

  fileList = ref<UploadUserFile[]>([])

}

//获取自用上网报表的数据
const getSelfTableData = () => {
  if (store.state.companyNumber === '') {
    ElMessage({
      type: 'error',
      message: '请先选择公司~-_-!~'
    })

  } else {
    conditions.companyNumber = store.state.companyNumber
    conditions.startDate = convertDateFormat(conditions.filterTime[0], false)
    conditions.endDate = convertDateFormat(conditions.filterTime[1], false)
    console.log('上网报表分页查询条件', conditions)

    getSelfTable(conditions).then((res: Res) => {
      console.log('上网报表的返回结果', res)
      if (res.code === 200) {
        tableData.value = res.data.data
        //字符串处理
        for (let i = 0; i < tableData.value.length; i++) {
          //处理日期格式问题
          tableData.value[i].date = tableData.value[i].date?.slice(0, 7)
          //处理多个编辑问题----赋值
          tableData.value[i].onlyEdit = false
        }
        conditions.total = res.data.totalRecords
      }
      console.log('上网报表', tableData)

    })
  }
}


// 对数据进行计算
const computedData = (row: pscData) => {
  row.electricitySelfUseTotal = parseFloat(row.electricityConsumptionTotal - row.electricityOnGridTotal); //自用电量 = 发电表总电量 - 上网总电量
  row.onGridElectricCharge = parseFloat(row.electricityOnGridTotal * row.onGridPowerPrice).toFixed(2); // 上网费用 = 上网总电量 * 上网电价
  row.selfUseElectricCharge = parseFloat(row.electricitySelfUseTotal * row.selfUsePowerPrice).toFixed(2); // 自用电费 = 自用电量 * 自用电价
}

// 当前页大小发生变化时触发
const handleSizeChange = (val: number) => {
  //修改页面大小
  conditions.pageSize = val
  getSelfTableData()

}

// 当前页变化时触发
const handleCurrentChange = (page: number) => {

  //修改当前页数
  conditions.page = page
  getSelfTableData()

}

// 提交数据
const dialogConfirm = async (row: pscData) => {
  // 如果是编辑状态
  if(editStatus.isEdit) {
    // 提交编辑
    SelfEditConditions.saogpId = row.saogpId
    SelfEditConditions.companyNumber = store.state.companyNumber
    SelfEditConditions.stationNumber = route.params.id
    SelfEditConditions.date = convertDateFormat(row.date, false)
    SelfEditConditions.inverterName = row.inverterName
    SelfEditConditions.electricityConsumptionTotal = parseFloat(row.electricityConsumptionTotal)
    SelfEditConditions.electricityOnGridTotal = parseFloat(row.electricityOnGridTotal)
    SelfEditConditions.onGridPowerPrice = parseFloat(row.onGridPowerPrice)
    SelfEditConditions.selfUsePowerPrice = parseFloat(row.selfUsePowerPrice)
    SelfEditConditions.electricitySelfUseTotal = parseFloat(row.electricitySelfUseTotal)
    SelfEditConditions.onGridElectricCharge = parseFloat(row.onGridElectricCharge)
    SelfEditConditions.selfUseElectricCharge = parseFloat(row.selfUseElectricCharge)
    SelfEditConditions.scenePicture = row.scenePicture


    await editSelfTable(SelfEditConditions).then((res: Res) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.data
        })

        getSelfTableData()
        addCount = 0
        dialogCancel()

        fileList = ref<UploadUserFile[]>([])


      }
    })

    row.edit = false


  } else{ // 添加状态
    SelfAddConditions.companyNumber = store.state.companyNumber
    SelfAddConditions.stationNumber = route.params.id
    SelfAddConditions.date = convertDateFormat(row.date, false)
    SelfAddConditions.inverterName = row.inverterName
    SelfAddConditions.electricityConsumptionTotal = row.electricityConsumptionTotal
    SelfAddConditions.electricityOnGridTotal = row.electricityOnGridTotal
    SelfAddConditions.onGridPowerPrice = row.onGridPowerPrice
    SelfAddConditions.selfUsePowerPrice = row.selfUsePowerPrice
    SelfAddConditions.electricitySelfUseTotal = row.electricitySelfUseTotal
    SelfAddConditions.onGridElectricCharge = row.onGridElectricCharge
    SelfAddConditions.selfUseElectricCharge = row.selfUseElectricCharge
    SelfAddConditions.scenePicture = row.scenePicture


    addSelfTable(SelfAddConditions).then((res: Res) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })

        row.addEdit = false

        dialogCancel()

        getSelfTableData()

        addCount = 0

        // SelfAddConditions = reactive({})
        fileList = ref<UploadUserFile[]>([])

      } else {
        ElMessage({
          type: 'error',
          message: '发生了错误。。。'
        })
      }
    })

  }
}


//确认添加
const confirmAdd = async (row: pscData) => {
  //对数据进行计算
  // computedData(row)
  if (row.addEdit) {

    SelfAddConditions.companyNumber = store.state.companyNumber
    SelfAddConditions.stationNumber = route.params.id
    SelfAddConditions.date = convertDateFormat(row.date, false)
    SelfAddConditions.inverterName = row.inverterName
    SelfAddConditions.electricityConsumptionTotal = row.electricityConsumptionTotal
    SelfAddConditions.electricityOnGridTotal = row.electricityOnGridTotal
    SelfAddConditions.onGridPowerPrice = row.onGridPowerPrice
    SelfAddConditions.selfUsePowerPrice = row.selfUsePowerPrice
    SelfAddConditions.electricitySelfUseTotal = row.electricitySelfUseTotal
    SelfAddConditions.onGridElectricCharge = row.onGridElectricCharge
    SelfAddConditions.selfUseElectricCharge = row.selfUseElectricCharge


    //文件上传
    SelfAddConditions.scenePicture = await uploadFile()
    console.log('上网报表的添加条件', SelfAddConditions)

    //添加数据
    await addSelfTable(SelfAddConditions).then((res: Res) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })

        row.addEdit = false

        getSelfTableData()

        addCount = 0

        // SelfAddConditions = reactive({})
        fileList = ref<UploadUserFile[]>([])

      } else {
        ElMessage({
          type: 'error',
          message: '发生了错误。。。'
        })
      }

    })



    row.edit = false;
  } else {
    SelfEditConditions.saogpId = row.saogpId
    SelfEditConditions.companyNumber = store.state.companyNumber
    SelfEditConditions.stationNumber = route.params.id
    SelfEditConditions.date = convertDateFormat(row.date, false)
    SelfEditConditions.inverterName = row.inverterName
    SelfEditConditions.electricityConsumptionTotal = parseFloat(row.electricityConsumptionTotal)
    SelfEditConditions.electricityOnGridTotal = parseFloat(row.electricityOnGridTotal)
    SelfEditConditions.onGridPowerPrice = parseFloat(row.onGridPowerPrice)
    SelfEditConditions.selfUsePowerPrice = parseFloat(row.selfUsePowerPrice)
    SelfEditConditions.electricitySelfUseTotal = parseFloat(row.electricitySelfUseTotal)
    SelfEditConditions.onGridElectricCharge = parseFloat(row.onGridElectricCharge)
    SelfEditConditions.selfUseElectricCharge = parseFloat(row.selfUseElectricCharge)



    //文件上传
    SelfEditConditions.scenePicture = await uploadFile()
    console.log('编辑的条件', SelfEditConditions)

    console.log('编辑的行', row)




    await editSelfTable(SelfEditConditions).then((res: Res) => {
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: res.data
        })

        getSelfTableData()
        dialogCancel()

        addCount = 0
        fileList = ref<UploadUserFile[]>([])
      }
    })

    row.edit = false


  }

}

//取消
const cancel = (row: pscData) => {

  row.edit = false
  //重置添加数据的点击次数
  addCount = 0


  if (SelfAddConditions.addEdit) {
    SelfAddConditions = reactive({})
    tableData.value.pop()

  }
  ElMessage({
    type: 'info',
    message: '取消操作'
  })
  getSelfTableData()

}

// 编辑操作
const dialogEdit = ( row:pscData, index: number ) => {
  dialogVisible.value = true;
  editStatus.isEdit = true;
  editStatus.editData = row
}

//修改
const editData = (row: pscData, index: number) => {
  dialogEdit(row,index)

  //只有当前的onlyEdit为true，其余都为false（排他思想）
  for (let i = 0; i < tableData.value.length; i++) {
    if (i === index) {
      ElMessage({
        type: 'info',
        message: '在修改数据时，只允许对一条数据进行操作，ps:自用电费、上网电费、自用电费不用添写，系统会自动计算'
      })

      // 对数据计算
      // computedData(row)



      console.log('row.fileList', fileList)



      tableData.value[i].edit = true
      if (SelfAddConditions.addEdit) {
        SelfAddConditions = reactive({})
        tableData.value.pop()
        ElMessage({
          type: 'warning',
          message: '取消添加操作'
        })
      }

      if (row.addEdit) {
        SelfAddConditions = reactive({})
        tableData.value.pop()

      }

    } else {
      tableData.value[i].edit = false

    }
  }






}

//删除
const deleteData = (row: pscData) => {


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
      let deleteSelfCondition = reactive<deleteSelfConditions>({})
      deleteSelfCondition.saogpId = row.saogpId
      deleteSelfTable(deleteSelfCondition).then((res: Res) => {
        if (res.code === 200) {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          getSelfTableData()
          addCount = 0

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

//监听左侧电站，如果电站的路由发生变化时就调用分页查询
//计算电站
const stationRouter = computed(() => {
  return route.params.label as string
})
//监听
watch(stationRouter, () => {
  conditions.stationNumber = route.params.id



  getSelfTableData()


}, {
  deep: true
})

//导出Excel
const exportExcel = () => {
  const link = document.createElement('a');

  const url = '?companyNumber=' + conditions.companyNumber + '&stationNumber=' + conditions.stationNumber +
    '&startDate=' + conditions.startDate + '&endDate=' + conditions.endDate + '&page=' + conditions.page + '&pageSize=' + conditions.pageSize
  link.href = `${import.meta.env.VITE_APP_BASE_API}/api/selfAndOnGrid/export` + url
  link.setAttribute('download', '自由上网报表.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link)
}

//上传文件
const uploadFile = async () => {

  console.log(fileList)
  //文件名
  let fileName = ''
  for (let i = 0; i < fileList.value.length; i++) {
    let file: fileParams = reactive({})
    file.file = fileList.value[i].raw
    file.type = 'self_and_on_grid'
    console.log(file)
    await uploadPhotoAndVideo(file).then((res: Res) => {
      console.log('文件', res)
      if (res.code === 200) {
        ElMessage({
          message: '文件上传成功',
          type: 'success',
        })
        fileName = fileName + res.data + '#'
      }
    })
  }
  return fileName
}



interface SummaryMethodProps<T = pscData> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
//合计
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index !== 7 && index !== 1 && index !== 2 && index !== 5 && index !== 6) {
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

</script>


<style scoped>
.PSC-list {
  .filter-from {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-form {
      width: 500px !important;
      display: flex;

      .form-item-short {
        display: flex;
        float: left;
        margin-right: 50px;
        width: 200px;

        .el-select {
          width: 200px;
        }

        .el-input {
          width: 200px;
        }

      }

      .el-form-item {
        display: flex;
        margin: 0 5px 0 5px;

      }
    }
  }
}
</style>
