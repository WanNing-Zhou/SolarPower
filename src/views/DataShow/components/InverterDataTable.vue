<template>
  <div class="inverter-data-table">
    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="designName" label="设备名称" width="180" />
      <el-table-column prop="name" label="组串总容量(kWp)" width="180" />
      <el-table-column prop="address" label="发电量(度)" width="180" />
      <el-table-column prop="address" label="累计发电量(度)" width="180"  />
      <el-table-column prop="address" label="等价发电时(kWh/kWp)" width="180" />
      <el-table-column prop="address" label="峰值交流功率(kW)" width="180" />
      <el-table-column prop="address" label="并网时长(h)" width="180" />
      <el-table-column prop="address" label="限电损失电量(度)" width="180"  />
      <el-table-column prop="" label="平均发电量误差" width="180" />
    </el-table>
    <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";

const tableData =reactive([
    {
      designName:'', //设备名称
      totalStringCapacity:'', //组串总容量
    },
])



</script>

<style lang="scss" scoped>

.inverter-data{
  width: 100%;
}
</style>
