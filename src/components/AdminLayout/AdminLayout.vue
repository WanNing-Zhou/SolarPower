<template>
  <section class="admin-layout">
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-container>
        <el-aside style="background-color: white" width="240px">
          <layout-side/>
        </el-aside>
        <el-container>
          <el-main>
            <layout-main/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </section>
</template>

<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader/LayoutHeader.vue'
import LayoutSide from "@/components/AdminLayout/components/LayoutSide/LayoutSide.vue";
import LayoutMain from "@/components/AdminLayout/components/LayoutMain/LayoutMain.vue";
</script>

<style lang="scss" scoped>
.admin-layout{
  &:deep(.el-header){
    padding: 0;
    height: 40px;
  }
  &:deep(.el-main){
    padding: 0px;
  }
}
</style>
