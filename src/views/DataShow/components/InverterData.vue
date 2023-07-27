<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="38px">
        <filter-form @confirm="handFilter"/>
      </el-header>
      <el-main>
        <inverter-data-table> </inverter-data-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import FilterForm from "@/views/DataShow/components/FilterForm.vue";
import InverterDataTable from "@/views/DataShow/components/InverterDataTable.vue";

interface Conditions {
  equipment: string // 设备
  timeDimension:string //时间维度
  statisticalTime:string// 统计时间
}

const handFilter = (conditions:Conditions)=>{
  console.log(conditions)
}

</script>

<style lang="scss" scoped>

.inverter-data{
   :deep(.el-main){
     padding: 0px;
  }

}

</style>
