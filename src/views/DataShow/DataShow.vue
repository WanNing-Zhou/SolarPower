<template>
  <div class="data-show">
    <el-container>
      <el-header height="30px">
        <div class="header-left">
          <span>报表管理</span>
          <span> | </span>
          <span> 设备管理 </span>
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
import PSCList from "@/views/DataShow/components/PSCList.vue";

const activeName = ref('second')

const toLink = ()=>{
  const url = 'https://cn.fusionsolar.huawei.com/unisso/login.action?service=https%3A%2F%2Fpvms01cn.fusionsolar.huawei.com%2Funisess%2Fv1%2Fauth%3Fservice%3D%252Fpvmswebsite%252Fassets%252Fbuild%252Findex.html&decision=1#/view/device/NE=33573736/dongle/details'
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
