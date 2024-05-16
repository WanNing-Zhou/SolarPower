<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-text class="mx-1">自然年：</el-text>
        <el-date-picker v-model="tableYear" type="year" placeholder="选择年"  />
        &nbsp;&nbsp;
        <el-button  type="primary" @click="getYearTableData">查询</el-button>
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
            <!-- <th>备注</th> -->
          </tr>

          <template v-for="item in protYearData">
            <TotalTableItem :portData="item"></TotalTableItem>
          </template>
        </table>

      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import { onMounted, Ref, ref, reactive } from "vue";
import TotalTableItem from "@/views/DataShow/components/totalTableItem/totalTableItem.vue";
import { PortData } from "@/type";
import { queryYearReport } from '@/api/apireport'

const tableYear: Ref<Date> = ref(new Date())
let protYearData: Ref<Array<PortData>> = ref([])

//获取年报表的数据
const getYearTableData = () => {

  
  let year = tableYear.value.getFullYear()
  queryYearReport({ year }).then(res => {
    console.log('年报表的数据', res)
    if (res.code === 200) {
      if (res.data.length !== 0) {
        let tempObj = reactive<PortData>({
          name: '',
          index: 0,
          capacity: 0,
          usageDuration: [],
          powerGeneration: [],
          generationTotal: 0,
          useHoursTotal: 0
        })

        for (let i = 0; i < res.data.length; i++) {
          tempObj.name = res.data[i].stationName
          tempObj.index = i + 1;
          tempObj.capacity = res.data[i].capacity
          tempObj.generationTotal = res.data[i].generationTotal
          tempObj.useHoursTotal = res.data[i].useHoursTotal
          tempObj.usageDuration = new Array(12)
          tempObj.powerGeneration = new Array(12)
          for (let j = 0; j < res.data[i].records.length; j++) {
            let month = res.data[i].records[j].month - 1
            tempObj.usageDuration[month] = res.data[i].records[j].generation
            tempObj.powerGeneration[month] = res.data[i].records[j].useHours
          }

          protYearData.value.push(tempObj)

          tempObj = reactive<PortData>({
            name: '',
            index: 0,
            capacity: 0,
            usageDuration: [],
            powerGeneration: [],
            generationTotal: 0,
            useHoursTotal: 0
          })

        }
      }else{
        protYearData.value = reactive<Array<PortData>>([])
      }
    }
  })
}
onMounted(() => {
  getYearTableData()
})
</script>

<style lang="scss" scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #dddddd;
}
</style>
