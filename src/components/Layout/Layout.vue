<template>
  <section class="common-layout">
    <el-container>
      <el-header>
        <header-laout></header-laout>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <side-layout/>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import Header from "@/components/HeaderLayout/HeaderLaout.vue";
import HeaderLaout from "@/components/HeaderLayout/HeaderLaout.vue";
import SideLayout from "@/components/SideLayout/SideLayout.vue";
</script>

<style lang="scss" scoped>
.common-layout{

  &:deep(.el-header){
    padding: 0;
  }
}

</style>
