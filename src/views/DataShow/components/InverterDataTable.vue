<template xmlns="http://www.w3.org/1999/html">
  <div class="inverter-data-table">
    <el-table :data="tableData" height="450px" border>
      <el-table-column prop="powerStationName" label="电站名称" sortable width="180"/>
      <el-table-column prop="inverterName" label="设备名称" sortable width="180"/>
      <el-table-column prop="inverterTotalCapacity" label="组串总容量(kWp)" sortable width="180"/>
      <el-table-column prop="powerGeneration" label="实际发电量(度)" sortable width="180"/>

      <el-table-column prop="standPowerGeneration" label="标准容量发电量(度/kWp)" sortable width="180"/>
      <el-table-column prop="computedPowerGeneration" label="计算发电量(度)" sortable width="180"/>

      <!--      <el-table-column prop="averageGenPower" label="平均发电量" sortable width="180"/>-->
      <el-table-column prop="powerGenerationDeviation" label="发电量误差" sortable width="180"/>
      <el-table-column prop="powerGenerationDeviationRatio" label="误差百分比" sortable width="180">

      </el-table-column>
      <el-table-column prop="factors" label="调整系数" width="180">
        <template #default="scope">
          <el-input v-if="editRow == scope.row.dedignId" v-model="scope.row.factors"
                    @blur="editRow= '' "/>
          <div style="height:100%" v-else @dblclick="editRow = scope.row.dedignId">
            {{ scope.row.factors }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="averageAbsoluteDeviation" label="标准单板日电量" sortable width="180"></el-table-column>
      <!--      <el-table-column label="操作" width="180">
              <template #default="scope">
                &lt;!&ndash;                  <el-button&ndash;&gt;
                &lt;!&ndash;                      type="primary"&ndash;&gt;
                &lt;!&ndash;                      size="small"&ndash;&gt;
                &lt;!&ndash;                      @click="showInfo(scope)"&ndash;&gt;
                &lt;!&ndash;                  >&ndash;&gt;
                &lt;!&ndash;                    详情&ndash;&gt;
                &lt;!&ndash;                  </el-button> &ndash;&gt;

                <el-button
                    type="primary"
                    size="small"
                    @click="edit(scope)"
                >
                  编辑
                </el-button>
              </template>
            </el-table-column>-->
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

import {computed, onMounted, PropType, reactive, ref} from "vue";
// import {inverterTestData} from "@/testData/inverterTestData.ts"
import {useRoute} from "vue-router";
import {Inverter} from "@/type/inverter.ts";


const props = defineProps({
  tableData: {
    type: Object as PropType<Inverter[]>
  }
})

const route = useRoute();


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
            averageGenPower: ''. //平均发电量
      singleGenPower: '', //标转单板日电量
      measurementPointName: '', //计量点名称
      portName:''. //电站名称
      standardPowerGeneration: '', //标准容量发电量
      calculatePowerGeneration: '', // 计算发电量
      adjustmentCoefficient: '', //调整系数
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

// 设置页面显示数据
/*const setTableData = () => {
  const {currentPage, pageSize} = paginationState
  tableData.value = inverterTestData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  console.log(tableData.value)
}*/
// 获取数据
/*const getInverterData = () => {
  // tableData.value = inverterTestData;

  inverterTestData.forEach(item => {
    item.averageAbsoluteDeviation = (((1.0 * (item.powerGeneration / evePowerGen.value) - 1) * 100).toFixed(2))
    item.portName = route.params.id as string;
  })
  console.log(inverterTestData)
  paginationState.total = inverterTestData.length
  setTableData();
}*/

// 当前页大小发生变化时触发
const handleSizeChange = (val) => {
  console.log('size', val)
}

// 当前页变化时触发
const handleCurrentChange = (page) => {
  // console.log('page', page)
}

// 详情显示
const showInfo = (scope) => {
  // console.log('被点击了')
  // console.log('被点击了', scope.row)
  emit('showInfo', scope.row)
}

// 编辑
const editRow = ref('')
const edit = (scope) => {
  emit('editInfo', scope.row)
}

/*
// 平均发电量
const evePowerGen = computed(() => {
  const totalPowerGen = inverterTestData.reduce((res, item) => {
    return res + item.powerGeneration
  }, 0)
  return totalPowerGen / inverterTestData.length;
})


// 计算误差
const computedDis = (powerGen) => {
  console.log('powerGen', evePowerGen.value)
  return ((1.0 * (powerGen / evePowerGen.value) - 1) * 100).toFixed(2)
}


onMounted(() => {
  getInverterData()
})
*/


</script>

<style lang="scss" scoped>

.inverter-data {
  width: 100%;
}
</style>
