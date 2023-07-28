<template>
  <div class="inverter-data-table">
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="designName" label="设备名称" sortable width="180"/>
      <el-table-column prop="totalStringCapacity" label="组串总容量(kWp)" sortable width="180"/>
      <el-table-column prop="powerGeneration" label="发电量(度)" sortable width="180"/>
      <el-table-column prop="accumulatedPowerGeneration" label="累计发电量(度)" sortable width="180"/>
      <el-table-column prop="equivalentPowerGenerationTime" label="等价发电时(kWh/kWp)" sortable width="180"/>
      <el-table-column prop="peakACPower" label="峰值交流功率(kW)" sortable width="180"/>
      <el-table-column prop="gridConnectionDuration" label="并网时长(h)" sortable width="180"/>
      <el-table-column prop="powerRationingLoss" label="限电损失电量(度)" sortable width="180"/>
      <el-table-column prop="averageAbsoluteDeviation" label="平均发电量误差" sortable width="180">
        <template #default="scope">
          <span>{{computedDis(scope.row.powerGeneration)}}</span>
        </template>

      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
          type="primary"
          size="small"
          @click="showInfo(scope)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:current-page="paginationState.currentPage"
        v-model:page-size="paginationState.pageSize"
        :page-sizes="[5, 10, 15, 20, 40]"
        layout="total,sizes, prev, pager, next,jumper"
        :total="paginationState.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {inverterTestData} from "@/testData/inverterTestData.ts"

/*const tableData =reactive([
    {
      designName:'Z-1', //设备名称
      dedignId:'Z-1',//设备ID
      totalStringCapacity:31.2, //组串总容量
      powerGeneration: 33, //发电量
      accumulatedPowerGeneration:1024,//累计发电量
      equivalentPowerGenerationTime: 55,//等价发电时
      peakACPower: 21, //峰值交流功率
      gridConnectionDuration: 523,// 并网时长
      powerRationingLoss:33,// 限电损失量
      averageAbsoluteDeviation:'',//平均发电误差
    },
])*/

// emit
const emit = defineEmits(['showInfo'])


// table数据
const tableData = ref([{}])
//分页数据
const paginationState = reactive(
    {
      currentPage: 1,
      total: 1000,
      pageSize: 10,
    }
)


const setTableData = () => {
  const {currentPage,pageSize} = paginationState
  tableData.value = inverterTestData.slice((currentPage-1)*pageSize, currentPage*pageSize)

}

const getInverterData = () => {
  // tableData.value = inverterTestData;
  paginationState.total = inverterTestData.length
  setTableData();
}


const handleSizeChange = (val) => {
  console.log('size', val)
  setTableData();

}

const handleCurrentChange = (page) => {
  console.log('page',page)
  setTableData()
}

// 详情显示
const showInfo = (scope)=>{
  console.log('被点击了')
  emit('showInfo',scope.row.data)
  console.log('scope', scope.row.data)
}

// 平均发电量
const evePowerGen = computed(()=>{
  const totalPowerGen = inverterTestData.reduce((res,item)=>{
    return res + item.powerGeneration
  },0)
  return totalPowerGen/inverterTestData.length;
})


// 计算误差
const computedDis = (powerGen)=>{
  console.log('powerGen',evePowerGen)
  return 1.0*(powerGen/evePowerGen)-1
}


onMounted(() => {
  getInverterData()
})



</script>

<style lang="scss" scoped>

.inverter-data {
  width: 100%;
}
</style>
