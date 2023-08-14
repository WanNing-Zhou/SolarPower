/**
* @FileNAme src\views\DataShow\components\AnnualSummaryPhotovoltaicPowerStations.vue
* @author 周万宁
* @create 2023/8/14-23:26
* @version
* @description 光伏电站年汇总表
*/

<template>
  <div class="daily-report-photovoltaic-power-plant">
    <el-container>
      <el-header>
        <el-date-picker
            v-model="tableMonth"
            type="year"
            placeholder="选择年"
        />
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <!--  日期     -->
          <el-table-column prop="date" label="月份" width="150">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.date"></el-input>
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <!--  京东    -->
          <el-table-column label="西安京东">
            <el-table-column prop="jingdong.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.jingdong.capacity"></el-input>
                <span v-else>{{ scope.row.jingdong.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jingdong.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.jingdong.powerGeneration"></el-input>
                <span v-else>{{ scope.row.jingdong.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="陕西中铁">
            <el-table-column prop="zhongtie.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.zhongtie.capacity"></el-input>
                <span v-else>{{ scope.row.zhongtie.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zhongtie.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.zhongtie.powerGeneration"></el-input>
                <span v-else>{{ scope.row.zhongtie.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="神木富油">
            <el-table-column prop="fuyou.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.fuyou.capacity"></el-input>
                <span v-else>{{ scope.row.fuyou.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fuyou.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.fuyou.powerGeneration"></el-input>
                <span v-else>{{ scope.row.fuyou.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="和旺包装">
            <el-table-column prop="baozhuang.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.baozhuang.capacity"></el-input>
                <span v-else>{{ scope.row.baozhuang.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feierte.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.feierte.powerGeneration"></el-input>
                <span v-else>{{ scope.row.feierte.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="品柏科技">
            <el-table-column prop="keji.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.keji.capacity"></el-input>
                <span v-else>{{ scope.row.keji.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="keji.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.keji.powerGeneration"></el-input>
                <span v-else>{{ scope.row.keji.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="中旗一厂">
            <el-table-column prop="yichang.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.yichang.capacity"></el-input>
                <span v-else>{{ scope.row.yichang.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="yichang.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.yichang.powerGeneration"></el-input>
                <span v-else>{{ scope.row.yichang.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="中旗二厂">
            <el-table-column prop="erchang.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.erchang.capacity"></el-input>
                <span v-else>{{ scope.row.erchang.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="erchang.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.erchang.powerGeneration"></el-input>
                <span v-else>{{ scope.row.erchang.powerGeneration }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="西安菲尔特">
            <el-table-column prop="feierte.capacity" label="容量Mw" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit" v-model="scope.row.feierte.capacity"></el-input>
                <span v-else>{{ scope.row.feierte.capacity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feierte.powerGeneration" label="发电量Mwh" width="120">
              <template #default="scope">
                <el-input size="small" v-if="scope.row.edit"
                          v-model="scope.row.feierte.powerGeneration"></el-input>
                <span v-else>{{ scope.row.feierte.powerGeneration }}</span>
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
import {AnnualSummaryPhotovoltaicPowerStations, SalaryPortData} from "@/type";
// 表格数据
const tableData: Ref<Array<AnnualSummaryPhotovoltaicPowerStations>> = ref([])

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
const handleConfirmAdd = (data: AnnualSummaryPhotovoltaicPowerStations) => {
  tableData.value.push(data)
}

//确认添加
const confirmAdd = (row: AnnualSummaryPhotovoltaicPowerStations) => {

  //对数据进行计算
  row.edit = false;
}

//修改
const editData = (row: AnnualSummaryPhotovoltaicPowerStations) => {
  // 对数据重新计算
  row.edit = true;
}

//删除
const deleteData = (row: AnnualSummaryPhotovoltaicPowerStations, index: number) => {

  tableData.value.splice(index, 1);
}


</script>

<style lang="scss" scoped>
.daily-report-photovoltaic-power-plant {

}
</style>

