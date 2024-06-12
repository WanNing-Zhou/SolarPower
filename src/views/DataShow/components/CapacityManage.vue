<template>
  <div class="capacity-manage-page">

    <el-table :data="tableData" height="450px" border>
      <el-table-column prop="powerStationName" label="电站名称"/>
      <el-table-column prop="inverterName" label="设备名称"  />
      <el-table-column prop="inverterTotalCapacity" label="组串总容量(kWp)"  >
        <template #default="scope">
          <el-input id="el-input-factors" v-model="scope.row.factors" @change="watchFactors(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="factors" label="调整系数" width="90">

        <template #default="scope">

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {useRoute} from "vue-router";
// 列表数据
const tableData = ref([])
const route = useRoute()

// 公司id
const compId = computed(() => {
  return route.query.compId;
})
// 电站id
const pointId = computed(() => {
  return route.query.pointId
})

const getTableData = async () => {

}

const editData = (row, value) =>{

}


</script>

<style scoped>

</style>