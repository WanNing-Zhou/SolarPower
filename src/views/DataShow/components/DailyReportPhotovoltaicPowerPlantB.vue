/**
* @FileNAme src\views\DataShow\components\DailyReportPhotovoltaicPowerPlantB.vue
* @author 周万宁
* @create 2023/8/14-23:33
* @version
* @description 光伏电站日报表b
*/
1
<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-date-picker
            v-model="tableMonth"
            type="month"
            placeholder="选择月份"
        />
      </el-header>
      <el-main>
        <el-table :header-cell-style="{'text-align':'center'}" :data="tableData">
          <!--  日期     -->
          <el-table-column prop="date" label="日期" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.date"></el-input>
              <span v-else>{{ convertDateFormat(scope.row.date,true) }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column label="包装">
            <el-table-column prop="baozhuang.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.baozhuang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.baozhuang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="baozhuang.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.baozhuang.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.baozhuang.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="baozhuang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.baozhuang.usageTime"></el-input>
                <span v-else>{{ scope.row.baozhuang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="科技">
            <el-table-column prop="keji.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.keji.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.keji.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="keji.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.keji.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.keji.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="keji.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.keji.usageTime"></el-input>
                <span v-else>{{ scope.row.keji.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="一厂">
            <el-table-column prop="yichang.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.yichang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yichang.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.yichang.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yichang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.usageTime"></el-input>
                <span v-else>{{ scope.row.yichang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="二厂">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.erchang.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="usageTime" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.erchang.usageTime"></el-input>
                <span v-else>{{ scope.row.erchang.usageTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="erchang.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.usageTime"></el-input>
                <span v-else>{{ scope.row.erchang.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="三马架">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sanmajia.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.sanmajia.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feierte.dailyOperationStatus" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.sanmajia.usageTime"></el-input>
                <span v-else>{{ scope.row.sanmajia.usageTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sanmajia.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sanmajia.usageTime"></el-input>
                <span v-else>{{ scope.row.sanmajia.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
                <el-icon :size="20">
                  <Checked/>
                </el-icon>
              </el-button>
              <div v-else>
                <el-button type="primary" @click="editData(scope.row)">
                  <el-icon :size="20">
                    <Edit/>
                  </el-icon>
                </el-button>
                <el-button type="primary" @click="deleteData(scope.row,scope.$index)">
                  <el-icon :size="20">
                    <Delete/>
                  </el-icon>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addData">添加数据</el-button>
        <el-divider></el-divider>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import {onMounted, Ref, ref} from "vue";
import {Checked} from "@element-plus/icons-vue";
import {DailyReportPhotovoltaicPowerPlantB, SalaryPortData} from "@/type";
import {summaryBData} from "@/testData/SummaryB.ts";
import {convertDateFormat} from "@/utils/dateUtils.ts";
// 表格数据
const tableData: Ref<Array<DailyReportPhotovoltaicPowerPlantB>> = ref([])

// 表格月份
const tableMonth: Ref<Date> = ref(new Date())

// 添加数据
const addData = () => {
  let length = tableData.value.length + 1
  tableData.value.push({
    edit: true,
    baozhuang: {},
    keji: {},
    yichang: {},
    erchang: {},
    date: convertDateFormat(tableMonth.value) + '-' + (length > 9 ? length : `0${length}`)
  });
  console.log('添加数据触发', tableData.value)

}

//确认添加
const handleConfirmAdd = (data: DailyReportPhotovoltaicPowerPlantB) => {
  data.date = new Date(new String(data.date))
  tableData.value.push(data)
}

//确认添加
const confirmAdd = (row: DailyReportPhotovoltaicPowerPlantB) => {

  //对数据进行计算
  row.edit = false;
}

//修改
const editData = (row: DailyReportPhotovoltaicPowerPlantB) => {
  // 对数据重新计算
  row.edit = true;
}

//删除
const deleteData = (row: DailyReportPhotovoltaicPowerPlantB, index: number) => {

  tableData.value.splice(index, 1);
}

onMounted(()=>{
  tableData.value = summaryBData
})

</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {

}
</style>
