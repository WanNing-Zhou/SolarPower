<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="38px">
        <filter-form  @confirm="handFilter" />
      </el-header>
      <el-main>
        <inverter-data-table :analyseId="analyseId"  :searchFlag="searchFlag" @showInfo="showInfo"></inverter-data-table>
      </el-main>
    </el-container>
    <DetailDialog :detailData="detailData" :dialogVisible="detailDialogVisible" @close="handleClose"></DetailDialog>
  </div>
</template>

<script setup lang="ts">

import FilterForm from "@/views/DataShow/components/FilterForm.vue";
import InverterDataTable from "@/views/DataShow/components/InverterDataTable.vue";
import { computed, onMounted, ref, watch, reactive,onBeforeMount } from "vue";
import DetailDialog from "@/views/DataShow/components/DetailDialog.vue";
import { getInverterTableData } from "@/api/apiInverter.ts";
import { useRoute } from "vue-router";
import { InverterParams } from "@/type/request/inverter.ts";
import { convertDateFormat } from "@/utils/dateUtils.ts";
import { InverterParam } from "@/type/inverter.ts";
import {useStore} from 'vuex'


interface Conditions {
  equipment: string // 设备
  statisticalTime: string// 统计时间
}
//使用useStore
const store = useStore()
const route = useRoute();
// const {compId, pointId, pointName} = route.query
// console.log('电站名称:', compId)


// 电站名称
const stationId = computed(() => {
  // console.log('电站名称:', route.query)
  // return route.params.label as string
  return route.query.pointId
})




//查询标记
const searchFlag = ref(false)

const analyseId = ref('')

// 获取表单数据
const getAnalyseId = async (data?: InverterParams) => {
  if (!data) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3) // 最近三天数据
    data = {
      stationId: stationId.value,
      startTime: convertDateFormat(start, true),
      endTime: convertDateFormat(end, true)
    }
  }

  // 获取数据
  const res = await getInverterTableData(data);
  analyseId.value = res.data;
  // console.log(analyseId.value)
}

// 筛选---拿到查询的参数
const handFilter = (conditions: Conditions) => {
  console.log('筛选条件:', conditions)
  const startTime = conditions.statisticalTime[0];
  const endTime = conditions.statisticalTime[1]

  getAnalyseId({
    // stationId: conditions.equipment,
    stationId: stationId.value,
    startTime: convertDateFormat(startTime, true),
    endTime: convertDateFormat(endTime, true)
  })
  // searchFlag.value = true

  //存入电站的名称
  // store.commit('setStationName',conditions.equipment)
}

// 加载时计算
onMounted(() => {
  getAnalyseId()
})


//弹出框显示
const detailDialogVisible = ref(false)

// 详情值
const detailData = ref({})
const showInfo = (row) => {
  detailDialogVisible.value = true
  detailData.value = row;
  console.log('showInfo', row)
}

const handleClose = () => {
  //
  detailDialogVisible.value = false;
}



</script>

<style lang="scss" scoped>
.inverter-data {
  :deep(.el-main) {
    padding: 0px;
  }

}
</style>
