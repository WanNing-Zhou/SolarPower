<template>
  <div class="data-show">
    <el-container>
      <el-header height="30px">
        <div class="header-left">
          <el-button link type="primary" @click="toLink('https://cn.fusionsolar.huawei.com/')">京东/富油/中铁</el-button>
          <span> | </span>
          <el-button link type="primary" @click="toLink('https://www.ginlongcloud.com/#/station')">菲尔特</el-button>
          <span> | </span>
          <el-button link type="primary" @click="toLink('https://www.sems.com.cn')">三马架</el-button>
          <span> | </span>
          <el-button link type="primary" @click="toLink('https://server-cn.growatt.com/login')">品柏/和旺/一厂/二厂</el-button>

        </div>

<!--        <div class="header-right">-->
<!--            <el-button @click="toLink">登录华为页面</el-button>-->
<!--        </div>-->
      </el-header>
      <el-main>

        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="工作单管理" name="first">
            <inspection-checklist/>
          </el-tab-pane>
          <el-tab-pane label="逆变器报表" name="second">
            <inverter-data/>
          </el-tab-pane>
          <el-tab-pane label="自用和上网报表" name="third">
            <PSCList/>
          </el-tab-pane>
          <el-tab-pane label="核查业务流程" name="fourth"><verify-business-processes/></el-tab-pane>
          <el-tab-pane label="电站系统图" name="five">
              <PowerStationSystem :imgUrls="imgUrls"></PowerStationSystem>
          </el-tab-pane>

          <el-tab-pane label="电站报表" name="portTable">
            <PowerStationReport></PowerStationReport>
          </el-tab-pane>


<!--          <el-tab-pane label="光伏电站年汇总表" name="six">
&lt;!&ndash;            <AnnualSummaryPhotovoltaicPowerStations></AnnualSummaryPhotovoltaicPowerStations>&ndash;&gt;
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
          </el-tab-pane>-->
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import InverterData from "@/views/DataShow/components/InverterData.vue";
import InspectionChecklist from "@/views/DataShow/components/InspectionChecklist.vue";
import PSCList from "@/views/DataShow/components/PSCList.vue";
import VerifyBusinessProcesses from "@/views/DataShow/components/verifyBusinessProcesses.vue";
import PowerStationSystem from "@/views/DataShow/components/PowerStationSystem.vue";
import {imgUrls} from "@/testData/imgUrls.ts";
import DailyReportPhotovoltaicPowerPlant from "@/views/DataShow/components/DailyReportPhotovoltaicPowerPlant.vue";
import AnnualSummaryPhotovoltaicPowerStations
  from "@/views/DataShow/components/AnnualSummaryPhotovoltaicPowerStations.vue";
import DailyReportPhotovoltaicPowerPlantB from "@/views/DataShow/components/DailyReportPhotovoltaicPowerPlantB.vue";
import AnnualSummaryPhotovoltaicPowerStations1
  from "@/views/DataShow/components/AnnualSummaryPhotovoltaicPowerStations1.vue";
import StatisticsElectricityLoss
  from "@/views/DataShow/components/statisticsElectricityLoss/statisticsElectricityLoss.vue";
import PowerStationReport from "@/views/DataShow/components/powerStationReport/powerStationReport.vue";

const activeName = ref('second')

const toLink = (url)=>{
  // const url = ''
  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
 .data-show{
   width: 100%;
   display: flow-root;
   .header-left{
     float: left;
   }
   .header-right{
     float: right;
   }
 }

</style>
