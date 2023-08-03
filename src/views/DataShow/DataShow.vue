<template>
  <div class="data-show">
    <el-container>
      <el-header height="30px">
        <div class="header-left">
          <el-button link @click="toLink('https://cn.fusionsolar.huawei.com/')">陕西西安（京东/富油/中铁）</el-button>
          <span> | </span>
          <el-button link @click="toLink('https://server-cn.growatt.com/login')">广东佛山（品柏/和旺/一厂/二厂）</el-button>
          <span> | </span>
          <el-button link @click="toLink('')">西安菲尔特</el-button>
        </div>

        <div class="header-right">
            <el-button @click="toLink">登录华为页面</el-button>
        </div>
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
          <el-tab-pane label="核查业务流程" name="fourth">核查业务流程verifyBusinessProcesses</el-tab-pane>
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
