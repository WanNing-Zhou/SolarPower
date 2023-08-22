<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-date-picker
            v-model="tableYear"
            type="year"
            placeholder="选择年"
        />
      </el-header>
      <el-main>
        <table>
          <tr>
            <th>序号</th>
            <th colspan="3">名称</th>
            <template v-for="item in 12">
              <th>{{ item }}月</th>
            </template>
            <th>总量</th>
            <th>备注</th>
          </tr>

          <template v-for="item in protYearData">
            <TotalTableItem :portData="item"></TotalTableItem>
          </template>
<!--          <tr>
            &lt;!&ndash;    <th rowspan="2" colspan="2">单元格 1</th>&ndash;&gt;
            <td rowspan="2"></td>
            <th rowspan="2">合计</th>
            <th>总容量</th>
            <th>总发电量</th>
            <template v-for="item in totalPowerGeneration">
              <td>{{ item }}</td>
            </template>
            <td>{{ sumTotalPowerGeneration }}</td>
            <td rowspan="2"></td>
          </tr>

          <tr>
            <td>{{ totalCapacity }}</td>
            <th>总利用小时</th>
            <template v-for="item in totalUsageDuration">
              <td>{{ item }}</td>
            </template>
            <td>{{ sumTotalUsageDuration }}</td>
          </tr>-->
        </table>

      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, Ref, ref} from "vue";
import TotalTableItem from "@/views/DataShow/components/totalTableItem/totalTableItem.vue";
import {PortData} from "@/type";
import {protYearData} from "@/testData/portYearData.ts";

const tableYear: Ref<Date> = ref(new Date())
const tableData: Ref<Array<PortData>> = ref({})
// 总容量
const totalCapacity = computed(() => {
  let sum = 0
  if (tableData.value?.length > 0) {
    tableData.value.forEach(item => {
      sum += item.capacity ? item.capacity : 0;
    })
  }
  return sum;
})
// 总使用时长
const totalUsageDuration = computed(() => {
  const arr = new Array(12)
  let sum = 0
  if (tableData.value?.length > 0) {
    tableData.value.forEach(item => {
      for (let i = 0; i < item.usageDuration?.length; i++) {
        if (!arr[i]) {
          arr[i] = 0
        }
        arr[i] = arr[i] + item.usageDuration?.[i]
      }
    })
  }
  return arr
})
// 总发电量
const totalPowerGeneration: Ref<Array<number>> = computed(() => {
  const arr = new Array(12)
  let sum = 0
  if (tableData.value?.length > 0) {
    tableData.value.forEach(item => {
      for (let i = 0; i < item.powerGeneration?.length; i++) {
        if (!arr[i]) {
          arr[i] = 0
        }
        arr[i] = arr[i] + item.powerGeneration?.[i]
      }
    })
  }

  return arr
})
// 合计总发电量
const sumTotalPowerGeneration = computed(() => {
  if(totalPowerGeneration.value.length > 0){
    return totalPowerGeneration.value.reduce((sum, item) => sum + item, 0);
  }
  return 0;

})
// 合计总使用时长
const sumTotalUsageDuration = computed(() => {
  if(totalUsageDuration.value.length > 0){
    return totalUsageDuration.value.reduce((sum, item) => sum + item, 0);
  }
})


onMounted(() => {
  tableData.value = protYearData
})
</script>

<style lang="scss" scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #dddddd;
}

.daily-report-photovoltaic-power-plan {

}

</style>
