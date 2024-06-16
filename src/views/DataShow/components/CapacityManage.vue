<template>
  <div class="capacity-manage-page">

    <el-table :data="tableData" height="450px" border>
      <el-table-column prop="powerStationName" label="电站名称"/>
      <el-table-column prop="inverterName" label="设备名称"  />
      <el-table-column prop="inverterTotalCapacity" label="组串总容量(kWp)"  >
        <template #default="scope">
          <el-row justify="center" align="middle">
            <el-col :span="18">
              <el-input size="small" id="el-input-factors" v-model="scope.row.tempInverterTotalCapacity" @change="watchFactors(scope.row)" />
            </el-col>
            <el-col :span="6">
              <el-button
                  v-if="scope.row.tempInverterTotalCapacity != scope.row.inverterTotalCapacity"
                  type="primary"
                  size="small"
                  @click="confirmHandle(row.id,scope.row.tempInverterTotalCapacity)"
              >确认</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
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


const testData =  [
  {
    powerStationName: '电站1',
    inverterName: '设备1',
    inverterTotalCapacity: 100,
  },
  {

    powerStationName: '电站2',
    inverterName: '设备2',
    inverterTotalCapacity: 200,
  }
]
const getTableData = async () => {
  tableData.value = testData.map((item) => ({...item, tempInverterTotalCapacity: item.inverterTotalCapacity}))
}



/**
 * 修改组串容量
 * @param id 设备id
 * @param inverterTotalCapacity 租串总容量
 */
const confirmHandle = (id: string, inverterTotalCapacity: string ) => {

}


/**
 * 页面加载完成获取表格数据
 */
onMounted(() => {
  getTableData()
})


</script>

<style scoped>

</style>