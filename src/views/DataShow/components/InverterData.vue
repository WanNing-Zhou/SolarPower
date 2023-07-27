<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="40px">
        <filter-form @confirm="handFilter"/>
      </el-header>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import FilterForm from "@/views/DataShow/components/FilterForm.vue";

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

}

</style>
