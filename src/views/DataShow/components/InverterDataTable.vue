<template xmlns="http://www.w3.org/1999/html">
  <div class="inverter-data-table">
    <el-table :data="tableData" height="450px" border>
      <el-table-column prop="powerStationName" label="电站名称" sortable width="180" />
      <el-table-column prop="inverterName" label="设备名称" sortable width="180" />
      <el-table-column prop="inverterTotalCapacity" label="组串总容量(kWp)" sortable width="180" />
      <el-table-column prop="powerGeneration" label="实际发电量(度)" sortable width="180" />

      <el-table-column prop="standPowerGeneration" label="标准容量发电量(度/kWp)" sortable width="180" />
      <el-table-column prop="computedPowerGeneration" label="计算发电量(度)" sortable width="180" />

      <!--      <el-table-column prop="averageGenPower" label="平均发电量" sortable width="180"/>-->
      <el-table-column prop="powerGenerationDeviation" label="发电量误差" sortable width="180" />
      <el-table-column prop="powerGenerationDeviationRatio" label="误差百分比" sortable width="180">

      </el-table-column>
      <el-table-column prop="factors" label="调整系数" width="180">
        <!-- <template #default="scope">
          <el-input v-if="editRow == scope.row.dedignId" v-model="scope.row.factors"
                    @blur="editRow= '' "/>
          <div style="height:100%" v-else @dblclick="editRow = scope.row.dedignId">
            {{ scope.row.factors }}
          </div>
        </template> -->
        <template #default="scope">
          <el-input id="el-input-factors" v-model="scope.row.factors" @change="watchFactors(scope.row)" />



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

    <el-pagination v-model:current-page="paginationState.currentPage" v-model:page-size="paginationState.pageSize"
      :page-sizes="[5, 10, 15, 20, 40]" layout="total,sizes, prev, pager, next,jumper" :total="paginationState.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, PropType, reactive, ref, Ref } from "vue";
// import {inverterTestData} from "@/testData/inverterTestData.ts"
import { useRoute } from "vue-router";
import { InverterParam, Inverter } from "@/type/inverter.ts";
import mitts from '@/utils/bus'
import {useStore} from 'vuex'


// const props = defineProps({
//   tableData: {
//     type: Object as PropType<Inverter[]>
//   }
// })

const store = useStore()

const route = useRoute();
//测试数据
// const tableData: Inverter[] = [{
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-110',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 1,
//   averageAbsoluteDeviation: ''
// },
// {
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-111',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 1,
//   averageAbsoluteDeviation: ''
// },
// {
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-112',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 1,
//   averageAbsoluteDeviation: ''
// },
// {
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-113',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 1,
//   averageAbsoluteDeviation: ''
// },
// {
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-114',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 0.6,
//   averageAbsoluteDeviation: ''
// },
// {
//   powerStationName: '西安京东亚一园站',
//   inverterName: 'N19-7#-5B-20-115',
//   inverterTotalCapacity: 168.21,
//   powerGeneration: 930.0,
//   standPowerGeneration: 10.81,
//   computedPowerGeneration: 839.35,
//   powerGenerationDeviation: 4.99,
//   powerGenerationDeviationRatio: '90.69',
//   factors: 1,
//   averageAbsoluteDeviation: ''
// }]
// const tableData: = 

// const tableData =reactive([
//     {
//       designName:'Z-1', //设备名称
//       dedignId:'Z-1',//设备ID
//       totalStringCapacity:31.2, //组串总容量
//       powerGeneration: 33, //发电量
//       accumulatedPowerGeneration:1024,//累计发电量
//       equivalentPowerGenerationTime: 55,//等价发电时
//       peakACPower: 21, //峰值交流功率
//       gridConnectionDuration: 523,// 并网时长
//       powerRationingLoss:33,// 限电损失量
//       averageAbsoluteDeviation:'',//平均发电误差
//       averageGenPower: ''. //平均发电量
//       singleGenPower: '', //标转单板日电量
//       measurementPointName: '', //计量点名称
//       portName:''. //电站名称
//       standardPowerGeneration: '', //标准容量发电量
//       calculatePowerGeneration: '', // 计算发电量
//       adjustmentCoefficient: '', //调整系数
//     },
// ])

// emit
const emit = defineEmits(['showInfo'])
//返回调整系数变化的逆变器数据数组
let InverterParamData: InverterParam[] = reactive([])


//调整系数发生变化时加入数组
const watchFactors = (row: Inverter) => {
  const map = new Map()
//定义参数对象类型
  const invertParamObject:InverterParam  = reactive({})
  invertParamObject.stationName = row.powerStationName
  invertParamObject.inverterName = row.inverterName
  invertParamObject.factors = row.factors
  InverterParamData.push(invertParamObject)


  // InverterParamData = InverterParamData.filter(key => !map.has(key.inverterName) && map.set(key.inverterName, 1))
  // InverterParamData = InverterParamData.filter((item) => !map.has(item.inverterName.toString()) && map.set(item.inverterName.toString()))
  InverterParamData = unique(InverterParamData,'inverterName')
  console.log('InverterParamData',InverterParamData)
  // emit('showInfo',InverterParamData)
  // mitts.emit('getInvertParamData',InverterParamData)
  //上传store的参数
  store.commit('setInvertParam',InverterParamData)
  


}
  //去重函数
  function unique(arr:InverterParam[], name:string) {
  const hash = {}
  return arr.reduce((acc:InverterParam[], cru:any) => {
    if (!hash[cru[name]]) {
      hash[cru[name]] = { index: acc.length }
      acc.push(cru)
    } else {
      acc.splice(hash[cru[name]]['index'], 1, cru)
    }
    return acc
  }, [])
}






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
// const showInfo = (scope) => {
//   // console.log('被点击了')
//   // console.log('被点击了', scope.row)
//   emit('showInfo', scope.row)
// }

// 编辑
// const editRow = ref('')
// const edit = (scope) => {
//   emit('editInfo', scope.row)
// }



</script>

<style lang="scss" scoped>
.inverter-data {
  width: 100%;
}
</style>
