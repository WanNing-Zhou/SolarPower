<template>
  <tr>
<!--    <th rowspan="2" colspan="2">单元格 1</th>-->
    <td rowspan="2">{{portData.index}}</td>
    <th rowspan="2">{{portData.name}}</th>
    <th>容量</th>
    <th>发电量</th>
    <template v-for="item in portData?.powerGeneration">
      <td>{{item}}</td>
    </template>
    <td>{{sumPowerGeneration}}</td>
    <td rowspan="2">这是备注</td>
  </tr>

  <tr>
    <td>{{portData.capacity}}</td>
    <th>利用小时</th>
    <template v-for="item in portData?.usageDuration">
      <td>{{item}}</td>
    </template>
    <td>{{sumUsageDuration}}</td>
  </tr>
</template>

<script setup lang="ts">
import {computed, PropType} from "vue";
import {PortData} from "@/type";


const porps = defineProps({
  portData: {
    type: Object as PropType<PortData>,
  }
})

// 总容量
const sumUsageDuration = computed(()=>{
  let sum  = 0;
  porps.portData?.usageDuration?.forEach(item=>sum+=item)
  return sum;
})
// 总发电量
const sumPowerGeneration = computed(()=>{
  let sum = 0;
  porps.portData?.powerGeneration?.forEach(item=>sum+=item)
  return sum;
})

</script>

<style lang="scss" scoped>
th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #dddddd;
}
</style>
