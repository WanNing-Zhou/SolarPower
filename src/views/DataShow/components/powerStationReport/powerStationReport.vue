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
      <el-tab-pane label="光伏电站年汇总表" name="reportYear">
        <!--            <AnnualSummaryPhotovoltaicPowerStations></AnnualSummaryPhotovoltaicPowerStations>-->
        <AnnualSummaryPhotovoltaicPowerStations1 v-if="activeName=='reportYear'"></AnnualSummaryPhotovoltaicPowerStations1>
      </el-tab-pane>
<!--      <el-tab-pane label="光伏电站日报表A" name="reportA">-->
<!--        <DailyReportPhotovoltaicPowerPlant v-if="activeName=='reportA'"></DailyReportPhotovoltaicPowerPlant>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="光伏电站日报表B" name="reportB" >-->
<!--        <DailyReportPhotovoltaicPowerPlantB v-if="activeName=='reportB'"></DailyReportPhotovoltaicPowerPlantB>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="光伏电站日报表" name="reportForm">
        <DailyReports v-if="activeName=='reportForm'"/>
      </el-tab-pane>
      <el-tab-pane label="电站损失电量统计" name="loss">
        <StatisticsElectricityLoss v-if="activeName=='loss'"></StatisticsElectricityLoss>
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
import DailyReports from "@/views/DataShow/components/DailyReports/DailyReports.vue";

const activeName = ref('reportYear')
</script>

<style lang="scss" scoped>

</style>
