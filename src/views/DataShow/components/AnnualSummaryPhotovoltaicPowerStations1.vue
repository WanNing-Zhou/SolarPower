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
              <th>{{item }}月</th>
            </template>
            <th>总量</th>
            <th>备注</th>
          </tr>

          <template v-for="item in protYearData">
            <TotalTableItem :portData="item"></TotalTableItem>
          </template>
        </table>
        <section>
          <div>总发电时长: </div>
          <div>总容量:</div>
          <div>总发电量:</div>
        </section>

      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import TotalTableItem from "@/views/DataShow/components/totalTableItem/totalTableItem.vue";
import {PortData} from "@/type";
import {protYearData} from "@/testData/portYearData.ts";

const tableYear: Ref<Date> = ref(new Date())
const tableData: Ref<Array<PortData>> = ref({})

onMounted(()=>{
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

.daily-report-photovoltaic-power-plan{

}

</style>
