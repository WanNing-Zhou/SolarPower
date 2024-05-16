<template>
  <tr>
<!--    <th rowspan="2" colspan="2">单元格 1</th>-->
    <td rowspan="2">{{portData?.index}}</td>
    <th rowspan="2">{{portData?.name}}</th>
    <th>容量Mwh</th>
    <th>发电量{{portData?.unit ? portData.unit : '万kwh'}}</th>
    <template v-for="item in portData?.powerGeneration">
      <td>{{item}}</td>
    </template>
    <td>{{portData?.useHoursTotal}}</td>
    <!-- <td rowspan="2">这是备注</td> -->
  </tr>

  <tr>
    <td>{{portData?.capacity}}</td>
    <th>利用小时h</th>
    <template v-for="item in portData?.usageDuration">
      <td>{{item}}</td>
    </template>
    <td>{{portData?.generationTotal}}</td>
  </tr>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {PortData} from "@/type";


const porps = defineProps({
  portData: {
    type: Object as PropType<PortData>,
  }
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
