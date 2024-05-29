<template>
  <div class="main-layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped>
.main-layout{
  width: 100%;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 10px;
  overflow-y:auto;
}
</style>
