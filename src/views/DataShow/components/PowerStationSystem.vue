<template>
  <div class="power-station-system">
    <div class="img-box" v-for="imgUrl in imgUrls">
      <img  class="img" :src="imgUrl">
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  imgUrls:{
    type:Array<string>,
    default: []
  }
})

</script>

<style lang="scss" scoped>
.power-station-system{
  .img{
    width: 100%;
  }
}

</style>
