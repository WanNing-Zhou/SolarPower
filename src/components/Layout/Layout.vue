<template>
  <section class="common-layout">
    <el-container>
      <el-header>
        <header-laout></header-laout>
      </el-header>
      <el-container>
        <el-aside style="background-color: white" width="250px">
          <side-layout/>
        </el-aside>
        <el-container>
          <el-main>
            <main-layout></main-layout>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import Header from "@/components/HeaderLayout/HeaderLaout.vue";
import HeaderLaout from "@/components/HeaderLayout/HeaderLaout.vue";
import SideLayout from "@/components/SideLayout/SideLayout.vue";
import MainLayout from "@/components/MainLayout/MainLayout.vue";
</script>

<style lang="scss" scoped>
.common-layout{
  &:deep(.el-header){
    padding: 0;
    height: 40px;
  }
  &:deep(.el-main){
    padding: 0px;
  }
}

</style>
