<template xmlns="http://www.w3.org/1999/html">
  <div class="inverter-data-table">
    <el-table :data="tableData.value" height="450px" border>
      <el-table-column prop="powerStationName" label="电站名称" sortable width="180" />
      <el-table-column prop="inverterName" label="设备名称" sortable width="180" />
      <el-table-column prop="inverterTotalCapacity" label="组串总容量(kWp)" sortable width="180" />
      <el-table-column prop="powerGeneration" label="实际发电量(度)" sortable width="120" />

      <el-table-column prop="standPowerGeneration" label="标准容量发电量(度/kWp)" sortable width="120" />
      <el-table-column prop="computedPowerGeneration" label="计算发电量(度)" sortable width="150" />

      <!--      <el-table-column prop="averageGenPower" label="平均发电量" sortable width="180"/>-->
      <el-table-column prop="powerGenerationDeviation" label="发电量误差" sortable width="120" />
      <el-table-column prop="powerGenerationDeviationRatio" label="误差百分比" sortable width="120">

      </el-table-column>
      <el-table-column prop="factors" label="调整系数" width="90">
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
      <!-- <el-table-column prop="averageAbsoluteDeviation" label="标准单板日电量" sortable width="180"></el-table-column> -->
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

import { computed, onMounted, PropType, reactive, ref, Ref, watch } from "vue";
// import {inverterTestData} from "@/testData/inverterTestData.ts"
import { useRoute } from "vue-router";
import { InverterParam, Inverter, InverterPageParams } from "@/type/inverter.ts";
import mitts from '@/utils/bus'
import { useStore } from 'vuex'
import { PageSearch, getInverterTableData } from '@/api/apiInverter'
import { InverterParams } from '@/type/request/inverter'
import {Res} from '@/type/request/requestType'

// const props = defineProps({
//   tableData: {
//     type: Object as PropType<Inverter[]>
//   }
// })
const tableData: Inverter[] = reactive([])

const store = useStore()
const route = useRoute();




// emit
const emit = defineEmits(['showInfo'])
//返回调整系数变化的逆变器数据数组
let InverterParamData: InverterParam[] = reactive([])


//调整系数发生变化时加入数组
const watchFactors = (row: Inverter) => {
  const map = new Map()
  //定义参数对象类型
  const invertParamObject: InverterParam = reactive({})
  invertParamObject.stationName = row.powerStationName
  invertParamObject.inverterName = row.inverterName
  invertParamObject.factors = row.factors
  InverterParamData.push(invertParamObject)


  // InverterParamData = InverterParamData.filter(key => !map.has(key.inverterName) && map.set(key.inverterName, 1))
  // InverterParamData = InverterParamData.filter((item) => !map.has(item.inverterName.toString()) && map.set(item.inverterName.toString()))
  InverterParamData = unique(InverterParamData, 'inverterName')
  // emit('showInfo',InverterParamData)
  // mitts.emit('getInvertParamData',InverterParamData)
  //上传store的参数

  store.commit('setInvertParam', InverterParamData)



}
//去重函数
function unique(arr: InverterParam[], name: string) {
  const hash = {}
  return arr.reduce((acc: InverterParam[], cru: any) => {
    if (!hash[cru[name]]) {
      hash[cru[name]] = { index: acc.length }
      acc.push(cru)
    } else {
      acc.splice(hash[cru[name]]['index'], 1, cru)
    }
    return acc
  }, [])
}



//逆变器查询条件
const InverterCondition: InverterParams = reactive({

})


//分页数据
const paginationState: InverterPageParams = reactive(
  {
    currentPage: 1,
    total: 0,
    pageSize: 10,
  }
)
//分页查询条件
const pageCondition: InverterPageParams = reactive({
  stationName: '',
  page: 1,
  pageSize: 10
})

//监听vuex中分页总数
//1.返回监听字段分页总数
const getShowState = computed(() => {
  return store.state.total
})

//2.更新分页总数据
//监听计算函数返回的字段
watch(getShowState, () => {
  paginationState.total = store.state.total
  // pageCondition.stationName = route.params.label
  // console.log('163行查询参数',pageCondition)
  // getInvertTableData(pageCondition)

}, {
  // immediate: true,
  deep: true
})
//监听vuex中重新计算被点击的标志
//1.返回监听标志
const getStateFlag = computed(() => {
  return store.state.flag
})
//2.判断flag的值
watch(getStateFlag, () => {
  if (store.state.flag) {


    //当重新计算被点击时，清空调整系数参数的数组
    InverterParamData = store.state.invertParam
    store.commit('setFlag', false)

    InverterCondition.stationName = pageCondition.stationName
    InverterCondition.startTime = store.state.InverterstartTime
    InverterCondition.endTime = store.state.InverterendTime


    //重新分析逆变器数据
    getInverterTableData(InverterCondition).then((res:Res)=>{
      if(res.code===200)
      {
        console.log('重新分析',res)
        //重新分页
        getInvertTableData(pageCondition)

      }
    })


    //     将重新计算标志设为false，重置一下
    // store.commit('setFlag', false)
  }
}, {
  immediate: true,
  deep: true
})
//监听vuex中查询被点击的标志
//1.返回查询标志
const getInverterSearchFlag = computed(() => {
  return store.state.InverterSearchFlag
})
//2.判断查询标志
watch(getInverterSearchFlag, () => {
  // if (store.state.InverterSearchFlag) {
  //   console.log('获取逆变器的值')
  //   getInvertTableData(pageCondition)
  // }
  pageCondition.stationName = store.state.stationName
  getInvertTableData(pageCondition)
})

//监听左侧电站，如果电站的路由发生变化时就调用分页查询
//计算电站
const stationRouter = computed(()=>{
  return route.params.label as string
})
//监听
watch(stationRouter,(newdata,old)=>{
  // console.log('新值',newdata,old)
  pageCondition.stationName = route.params.label
  console.log('分页逆变器查询参数',pageCondition)
  getInvertTableData(pageCondition)


},{
  deep:true
})





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
const handleSizeChange = (val: number) => {
  //修改页面大小
  pageCondition.pageSize = val
  getInvertTableData(pageCondition)

}

// 当前页变化时触发
const handleCurrentChange = (page: number) => {

  //修改当前页数
  pageCondition.page = page
  getInvertTableData(pageCondition)

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

//获取逆变器报表的数据
const getInvertTableData = (pageCondition: InverterPageParams) => {

  console.log('分页查询条件',pageCondition)
  PageSearch(pageCondition).then(res => {
    console.log('res', res)
    tableData.value = res.data.data


  })
}

onMounted(() => {


  

})

</script>

<style lang="scss" scoped>
.inverter-data {
  width: 100%;
}
</style>
