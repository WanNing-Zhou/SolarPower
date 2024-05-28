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
  height: calc(100vh - 120px);
  overflow-y:auto;
}
</style>
