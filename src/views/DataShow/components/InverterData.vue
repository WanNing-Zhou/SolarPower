<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="38px">
        <filter-form  @confirm="handFilter" />
      </el-header>
      <el-main>
        <inverter-data-table :tableData="tableData"  :searchFlag="searchFlag" @showInfo="showInfo"></inverter-data-table>
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
const {compId, pointId, pointName} = route.query
// console.log('电站名称:', compId)
// 电站名称
const stationName = computed(() => {
  console.log('电站名称:', route.query)
  return route.params.label as string
})

watch(stationName, () => {
  getTableData()
}, { deep: true })

const tableData = ref([])

//查询标记
const searchFlag = ref(false)

// 获取表单数据
const getTableData = (data?: InverterParams) => {
  if (!data) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3) // 最近三天数据
    data = {
      stationName: stationName.value,
      startTime: convertDateFormat(start, true),
      endTime: convertDateFormat(end, true)
    }
  }

  //获得数据得总数
  getInverterTableData(data).then(res => {
    console.log('逆变器报表查询参数data', data)
    console.log('tableData', res)
    
    //将返回的总体数据放到vuex中
    store.commit('setTotal',res.data)

    //将时间放到vuex中
    store.commit('seteInverterstartTime',data?.startTime)
    store.commit('setInverterendTime',data?.endTime)
    store.commit('setInvertParam', [])

  })
}

// 加载时计算
onBeforeMount(() => {
  console.log('api', import.meta.env.VITE_APP_BASE_API)

  getTableData()
})

// 筛选---拿到查询的参数
const handFilter = (conditions: Conditions) => {
  const startTime = conditions.statisticalTime[0];
  const endTime = conditions.statisticalTime[1]
  getTableData({
    stationName: conditions.equipment,
    startTime: convertDateFormat(startTime, true),
    endTime: convertDateFormat(endTime, true)
  })
  searchFlag.value = true

  //存入电站的名称
  store.commit('setStationName',conditions.equipment)
}

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
