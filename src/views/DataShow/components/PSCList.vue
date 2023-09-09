<template>
  <div class="PSC-list">
    <el-container>
      <el-header class="filter-from" height="38px">
        <el-form :model="conditions" status-icon>
          <el-form-item   class="form-item-short" label="电站:" prop="">
            <el-input v-model="conditions.workerName"  size="small" placeholder="全部" clearable />
          </el-form-item>
          <el-form-item class="form-item-short" label="计量点:" prop="">
            <el-input size="small"  placeholder="全部" clearable />
          </el-form-item>
          <el-form-item label-width="100px" label="记录时间" prop="filterTime">
            <el-date-picker v-model="conditions.filterTime" type="monthrange" unlink-panels range-separator="To"
              start-placeholder="Start month" end-placeholder="End month" :shortcuts="shortcuts" />

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleConfirm">查询</el-button>
          </el-form-item>
        </el-form>

        <div class="data-operation">
          <el-button>导出Excel</el-button>
        </div>

      </el-header>

      <el-main>
        <el-table :data="tableData" show-summary size="small" border>
          <el-table-column prop="portName" width="120" label="站名" />
          <el-table-column prop="date" label="年月" width="160">
            <template #default="scope">
              <el-date-picker size="small" v-model="scope.row.date" type="month" placeholder="日期" v-if="scope.row.edit" />
              <!--          <el-input v-if="scope.row.edit" v-model="scope.row.date" placeholder="关口表电量"></el-input>-->
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="" label="计量点名称">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"
                placeholder="发电表总电量"></el-input>
              <span v-else>{{ scope.row.measurementPointName }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="gatewayPower" label="发电表总电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.gatewayPower"
                placeholder="发电表总电量"></el-input>
              <span v-else>{{ scope.row.gatewayPower }}</span>
            </template>
          </el-table-column>
          <!--用户输入-->
          <el-table-column prop="onlinePower" width="100" label="上网总电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.onlinePower" placeholder="上网总电量"></el-input>
              <span v-else>{{ scope.row.onlinePower }}</span>
            </template>
          </el-table-column>

          <!--用户输入-->
          <el-table-column prop="onlinePrice" width="100" label="上网电价">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.onlinePrice" placeholder="上网电价"></el-input>
              <span v-else>{{ scope.row.onlinePrice }}</span>
            </template>
          </el-table-column>


          <!--用户输入-->
          <el-table-column prop="selfUsePrice" width="100" label="自用电价">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.selfUsePrice" placeholder="自用电价"></el-input>
              <span v-else>{{ scope.row.selfUsePrice }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="currentImg" width="100" label="现场照片">
            <template #default="scope">
              <!--              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.onlinePrice" placeholder="上网电价"></el-input>-->
              <!--              <span v-else>{{ scope.row.onlinePrice }}</span>-->
              <el-button v-if="scope.row.edit" size="small" type="primary" link>上传图片</el-button>
              <img :src="scope.row.currentImg">
            </template>
          </el-table-column>


          <el-table-column prop="selfUsePower" width="60" label="自用电量">

          </el-table-column>

          <el-table-column prop="onlineCharge" width="60" label="上网电费">
          </el-table-column>

          <el-table-column prop="selfUseCharge" width="60" label="自用电费">

          </el-table-column>

          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
                <el-icon :size="20">
                  <Checked />
                </el-icon>
              </el-button>
              <div v-else>
                <el-button type="primary" @click="editData(scope.row)">
                  <el-icon :size="20">
                    <Edit />
                  </el-icon>
                </el-button>
                <el-button type="primary" @click="deleteData(scope.row, scope.$index)">
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
        <el-button @click="submitData">提交</el-button>

      </el-main>
    </el-container>

  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive, ReactiveFlags, Ref, ref } from "vue";
import { Checked } from "@element-plus/icons-vue";
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { useRoute } from "vue-router";

const route = useRoute()

interface pscData {
  gatewayPower?: number | string //发电表总电量
  onlinePower?: number | string // 上网电量
  selfUsePower?: number | string //自用电量
  onlinePrice?: number | string // 上网电价
  selfUsePrice?: number | string // 自用电价
  onlineCharge?: number | string // 上网费用
  selfUseCharge?: number | string // 自用电费
  date?: number | string //日期
  edit?: boolean //是否是编辑状态
  portName?: string | null | any//站名
  measurementPointName?: string | null; // 计量点名称
  currentImg?: string | null // 现场照片

}

interface ChecklistConditions {
  workType?: string; // 工作类型
  workerName?: string; // 工作人
  filterTime?: string; //过滤时间
}


//查询条件
const conditions: Ref<ChecklistConditions> = ref({
  workType: '',
  workerName: '',
  filterTime: '',
})

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

const handleConfirm = () => {
  console.log(conditions.value)
}

const testData: Array<pscData> = [
  {
    portName: route.params.id,
    gatewayPower: 134,
    onlinePower: 13,
    selfUsePower: 4455,
    onlineCharge: 20,
    selfUseCharge: 1030,
    edit: false
  },
  {
    portName: route.params.id,
    gatewayPower: 1344,
    onlinePower: 154,
    selfUsePower: 44455,
    onlineCharge: 250,
    selfUseCharge: 51030,
    edit: false
  },
]

const tableData: Ref<Array<pscData>> = ref([{}])

//添加
const addData = () => {

  const preData = tableData.value[tableData.value.length - 1]

  tableData.value.push({
    portName: preData.portName,
    date: preData.date,
    onlinePrice: preData.onlinePrice, // 上网电价
    selfUsePrice: preData.selfUsePrice, // 自用电价
    edit: true,
    measurementPointName: preData.measurementPointName // 计量点名称
  });
  console.log('添加数据触发', tableData.value)

}

// 对数据进行计算
const computedData = (row: pscData) => {
  row.portName = route.params.id;
  console.log('route', route)
  row.date = convertDateFormat(<string>row.date)
  console.log('row', row.gatewayPower, row.onlinePower)
  console.log('row', row.onlinePower, row.onlineCharge)
  row.selfUsePower = row.gatewayPower - row.onlinePower; //自用电量 = 发电表总电量 - 上网电量
  row.onlineCharge = (row.onlinePower * row.onlinePrice).toFixed(2); // 上网费用 = 上网电量 * 上网电价
  row.selfUseCharge = (row.selfUsePrice * row.onlinePower).toFixed(2); // 自用电费 = 自用电量 * 上网电价
}

//确认添加
const confirmAdd = (row: pscData) => {
  //对数据进行计算
  computedData(row)

  row.edit = false;
}

//修改
const editData = (row: pscData) => {
  // 对数据计算
  computedData(row)
  row.edit = true;
}

//删除
const deleteData = (row: pscData, index: number) => {
  tableData.value.splice(index, 1);
}

//提交数据
const submitData = () => {
  alert(JSON.stringify(tableData.value))
}

onMounted(() => {
  tableData.value = testData;
})

</script>


<style scoped>
.PSC-list {
  .filter-from {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-form {
      width: 120px !important;
      display: flex;
      .form-item-short {
        display: flex;
        float: left;
        margin-right: 50px;
        width: 200px;
        .el-input{
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
