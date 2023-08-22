<!--
  @FileNAme src\views\DataShow\components\powerStationReport\powerStationReport.vue
  @author 周万宁
  @create 2023/8/22-21:07
  @version
  @description 电站报表
 -->
<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="光伏电站年汇总表" name="six">
        <!--            <AnnualSummaryPhotovoltaicPowerStations></AnnualSummaryPhotovoltaicPowerStations>-->
        <AnnualSummaryPhotovoltaicPowerStations1></AnnualSummaryPhotovoltaicPowerStations1>
      </el-tab-pane>
      <el-tab-pane label="光伏电站日报表A">
        <DailyReportPhotovoltaicPowerPlant></DailyReportPhotovoltaicPowerPlant>
      </el-tab-pane>
      <el-tab-pane label="光伏电站日报表B">
        <DailyReportPhotovoltaicPowerPlantB></DailyReportPhotovoltaicPowerPlantB>
      </el-tab-pane>
      <el-tab-pane label="电站损失电量统计">
        <StatisticsElectricityLoss></StatisticsElectricityLoss>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script setup lang="ts">

import StatisticsElectricityLoss
  from "@/views/DataShow/components/statisticsElectricityLoss/statisticsElectricityLoss.vue";
import DailyReportPhotovoltaicPowerPlantB from "@/views/DataShow/components/DailyReportPhotovoltaicPowerPlantB.vue";
import AnnualSummaryPhotovoltaicPowerStations1
  from "@/views/DataShow/components/AnnualSummaryPhotovoltaicPowerStations1.vue";
import DailyReportPhotovoltaicPowerPlant from "@/views/DataShow/components/DailyReportPhotovoltaicPowerPlant.vue";
import {ref} from "vue";

const activeName = ref('six')
</script>

<style lang="scss" scoped>

</style>
