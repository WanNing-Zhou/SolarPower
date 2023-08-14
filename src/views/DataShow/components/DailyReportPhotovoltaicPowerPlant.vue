/**
* @FileNAme src\views\DataShow\components\DailyReportPhotovoltaicPowerPlant.vue
* @author 周万宁
* @create 2023/8/14-23:02
* @version
* @description 光伏电站日报表
*/

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
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
              <span v-else>{{ scope.row.measurementPointName }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column label="京东">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="中铁">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="富油">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="菲尔特">
            <el-table-column prop="name" label="当天运行情况" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="日发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="利用小时h" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.measurementPointName"></el-input>
                <span v-else>{{ scope.row.measurementPointName }}</span>
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
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import {Ref, ref} from "vue";
import {Checked} from "@element-plus/icons-vue";
// 表格数据
const tableData = ref([{}])
// 表格月份
const tableMonth: Ref<Date> = ref(new Date())


//确认添加
const handleConfirmAdd = (data: InspectionChecklist) => {
  tableData.value.push(data)
}

//确认添加
const confirmAdd = (row: InspectionChecklist) => {

  //对数据进行计算
  row.edit = false;
}

//修改
const editData = (row: InspectionChecklist) => {
  // 对数据重新计算
  row.edit = true;
}

//删除
const deleteData = (row: InspectionChecklist, index: number) => {

  tableData.value.splice(index, 1);
}


</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {

}
</style>
