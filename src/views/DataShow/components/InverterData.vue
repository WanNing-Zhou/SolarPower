<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="38px">
        <filter-form @confirm="handFilter"/>
      </el-header>
      <el-main>
        <inverter-data-table :tableData="tableData" @showInfo="showInfo"></inverter-data-table>
      </el-main>
    </el-container>
    <DetailDialog :detailData="detailData" :dialogVisible="detailDialogVisible" @close="handleClose"></DetailDialog>
  </div>
</template>

<script setup lang="ts">

import FilterForm from "@/views/DataShow/components/FilterForm.vue";
import InverterDataTable from "@/views/DataShow/components/InverterDataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import DetailDialog from "@/views/DataShow/components/DetailDialog.vue";
import {getInverterTableData} from "@/api/apiInverter.ts";
import {useRoute} from "vue-router";
import {InverterParams} from "@/type/request/inverter.ts";
import {convertDateFormat} from "@/utils/dateUtils.ts";

interface Conditions {
  equipment: string // 设备
  timeDimension: string //时间维度
  statisticalTime: string// 统计时间
}

const route = useRoute();
// 电站名称
const stationName = computed(() => {
  console.log('电站名称:', route.params.id)
  return route.params.id as string
})

watch(stationName, () => {

  getTableData()
}, {deep: true})

const tableData = ref([])

// 获取表单数据
const getTableData = (data ?: InverterParams) => {
  if (!data) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 *3) // 最近三天数据
    data = {
      stationName: stationName.value,
      startTime: convertDateFormat(start, true),
      endTime: convertDateFormat(end, true)
    }
  }

  getInverterTableData(data).then(res => {
    console.log('tableData', res)
    tableData.value = res.data
  })
}

// 加载时计算
onMounted(() => {
  console.log('api', import.meta.env.VITE_APP_BASE_API)

  getTableData()
})

// 筛选
const handFilter = (conditions: Conditions) => {
  const startTime = conditions.statisticalTime[0];
  const endTime = conditions.statisticalTime[1]
  getTableData({
    stationName: stationName.value,
    startTime: convertDateFormat(startTime, true),
    endTime: convertDateFormat(endTime, true)
  })
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
