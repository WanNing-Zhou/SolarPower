<template>
  <div class="data-show">
    <el-container>
      <el-header height="30px">
        <span>报表管理</span>
        <span> | </span>
        <span> 设备管理 </span>
      </el-header>
      <el-main>
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="检询单录入" name="first"><inspection-checklist/></el-tab-pane>
            <el-tab-pane label="逆变器报表" name="second"><inverter-data/></el-tab-pane>
            <el-tab-pane label="PCS报表" name="third">PCS报表</el-tab-pane>
            <el-tab-pane label="储能报表" name="fourth">储能报表</el-tab-pane>
          </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import InverterData from "@/views/DataShow/components/InverterData.vue";
import InspectionChecklist from "@/views/DataShow/components/InspectionChecklist.vue";

const activeName = ref('second')

</script>

<style lang="scss" scoped>

</style>
