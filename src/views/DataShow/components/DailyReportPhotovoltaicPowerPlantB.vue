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
        <el-table :data="tableData">
          <!--  日期     -->
          <el-table-column prop="date" label="日期" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.date"></el-input>
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column label="包装">
            <el-table-column prop="jingdong.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.jingdong.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.jingdong.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jingdong.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.jingdong.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.jingdong.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jingdong.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.jingdong.usageTime"></el-input>
                <span v-else>{{ scope.row.jingdong.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="科技">
            <el-table-column prop="zhongtie.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.zhongtie.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.zhongtie.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zhongtie.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.zhongtie.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.zhongtie.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zhongtie.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.zhongtie.usageTime"></el-input>
                <span v-else>{{ scope.row.zhongtie.usageTime }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="一厂">
            <el-table-column prop="fuyou.dailyOperationStatus" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.fuyou.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.fuyou.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fuyou.dailyPowerGeneration" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.fuyou.dailyPowerGeneration"></el-input>
                <span v-else>{{ scope.row.fuyou.dailyPowerGeneration }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fuyou.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="二厂">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.fuyou.usageTime"></el-input>
                <span v-else>{{ scope.row.fuyou.usageTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feierte.dailyOperationStatus" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.feierte.dailyOperationStatus"></el-input>
                <span v-else>{{ scope.row.feierte.dailyOperationStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feierte.usageTime" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.feierte.usageTime"></el-input>
                <span v-else>{{ scope.row.feierte.usageTime }}</span>
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

import {Ref, ref} from "vue";
import {Checked} from "@element-plus/icons-vue";
import {DailyReportPhotovoltaicPowerPlantB, SalaryPortData} from "@/type";
// 表格数据
const tableData: Ref<Array<DailyReportPhotovoltaicPowerPlantB>> = ref([])

// 表格月份
const tableMonth: Ref<Date> = ref(new Date())

// 添加数据
const addData = () => {

  tableData.value.push({
    edit: true,
    baozhuang: {},
    keji: {},
    yichang: {},
    erchang: {}
  });
  console.log('添加数据触发', tableData.value)

}

//确认添加
const handleConfirmAdd = (data: DailyReportPhotovoltaicPowerPlantB) => {
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


</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {

}
</style>
