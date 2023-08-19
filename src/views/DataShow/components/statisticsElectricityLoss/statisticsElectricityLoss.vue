<!--
  @FileNAme src\views\DataShow\components\statisticsElectricityLoss\statisticsElectricityLoss.vue
  @author 周万宁
  @create 2023/8/18-20:09
  @version
  @description 电站损失电量统计
 -->

<template>
  <section class="statistics-electricity-loss">
    <el-container>
      <el-header class="filter-from" height="38px">
        <el-date-picker
            v-model="searchTime"
            type="date"
            placeholder="选择年"
        />
      </el-header>

      <el-main>
        <el-table :data="tableData" size="small" border>
          <el-table-column prop="portName" width="120" label="站名"/>
          <el-table-column prop="date" label="停电时间" width="160">
            <template #default="scope">
              <el-date-picker
                  size="small"
                  v-model="scope.row.date"
                  type="date"
                  placeholder="日期"
                  v-if="scope.row.edit"
              />
              <span v-else>{{ scope.row.date }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="powerOutageDuration" label="停电时长">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.powerOutageDuration"
                        placeholder=""></el-input>
              <span v-else>{{ scope.row.powerOutageDuration }}</span>
            </template>
          </el-table-column>

          <!--      用户录入-->
          <el-table-column prop="lessPowerGeneration" label="少发电量">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.lessPowerGeneration"
                        placeholder=""></el-input>
              <span v-else>{{ scope.row.lessPowerGeneration }}</span>
            </template>
          </el-table-column>
          <!--用户输入-->
          <el-table-column prop="numberViolations" width="100" label="现场工作违章次数">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.numberViolations"
              ></el-input>
              <span v-else>{{ scope.row.numberViolations }}</span>
            </template>
          </el-table-column>

          <!--用户输入-->
          <el-table-column prop="responseTime" width="100" label="接单响应时间">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.responseTime"
                        placeholder="上网电价"></el-input>
              <span v-else>{{ scope.row.responseTime }}</span>
            </template>
          </el-table-column>


          <!--用户输入-->
          <el-table-column prop="loss" width="100" label="次生灾害损失">
            <template #default="scope">
              <el-input size="small" v-if="scope.row.edit" v-model="scope.row.loss"
                      ></el-input>
              <span v-else>{{ scope.row.loss }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200">
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

        <section>
          <div>合计: </div>
          <div>停电时长: {{totalPowerOutageDuration}} </div>
          <div>少发电量: {{totalLessPower }} </div>
        </section>

      </el-main>
    </el-container>
  </section>
</template>

<script setup lang="ts">

import {Checked} from "@element-plus/icons-vue";
import {computed, Ref, ref} from "vue";
import {StatisticsElectricityLoss} from "@/type";
import {useRoute} from "vue-router";

// 列表数据
const tableData: Ref<StatisticsElectricityLoss[]> = ref([])
// 合计停电时长
const totalPowerOutageDuration = computed(()=>{
  return tableData.value.reduce((sum, item )=> sum+parseInt(item.powerOutageDuration as string),0)
})
const totalLessPower = computed(()=>{
  return tableData.value.reduce((sum,item)=>sum+parseInt(item.lessPowerGeneration as string), 0)
})
// 搜索时间
const searchTime : Ref<Date> = ref(new Date())
// 使用路由参数
const route = useRoute()

// 添加数据
const addData = () => {

  const preData = tableData.value[tableData.value.length - 1]
  tableData.value.push({
    portName: route.params?.id as string,
    date: new Date(),
    edit: true,
  });
}

//确认添加
const confirmAdd = (row:StatisticsElectricityLoss ) => {
  //对数据进行计算
  // computedData(row)

  row.edit = false;
}

//修改
const editData = (row: StatisticsElectricityLoss) => {
  row.edit = true;
}

//删除
const deleteData = (row: StatisticsElectricityLoss, index: number) => {
  tableData.value.splice(index, 1);
}


</script>

<style lang="scss" scoped>
.statistics-electricity-loss{

}
</style>
