<template>
  <div class="main-layout">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const windowHeight = ref(window.innerHeight-80)

</script>

<style scoped>
.main-layout{
  width: 100%;
  height: v-bind(windowHeight+'px');
  overflow-y:auto ;
}
</style>
