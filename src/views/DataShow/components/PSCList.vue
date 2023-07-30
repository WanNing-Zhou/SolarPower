<template>
  <div class="PSC-list">
    <el-table :data="tableData">
      <!--      用户录入-->
      <el-table-column prop="gatewayPower" label="关口表电量">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.gatewayPower" placeholder="关口表电量"></el-input>
          <span v-else>{{ scope.row.gatewayPower }}</span>
        </template>
      </el-table-column>
      <!--用户输入-->
      <el-table-column prop="onlinePower" label="上网电量">
        <template #default="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.onlinePower" placeholder="上网电量"></el-input>
          <span v-else>{{ scope.row.onlinePower }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="selfUsePower" label="自用电量">

      </el-table-column>

      <el-table-column prop="onlineCharge" label="上网电费">
      </el-table-column>

      <el-table-column prop="selfUseCharge" label="自用电费">

      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
            <el-icon :size="20">
              <Checked />
            </el-icon>
          </el-button>
          <div v-else>
            <el-button type="primary"  @click="editData(scope.row)">
              <el-icon :size="20">
                <Edit />
              </el-icon>
            </el-button>
            <el-button type="primary" @click="deleteData(scope.row,scope.$index)">
              <el-icon :size="20">
                <Delete />
              </el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>


    <el-button type="primary" @click="addData">添加数据</el-button>
    <el-divider></el-divider>
    <el-button @click="submitData">提交 </el-button>

  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ReactiveFlags, Ref, ref} from "vue";
import {Checked} from "@element-plus/icons-vue";

interface pscData{
  gatewayPower?:number | string //关口表电量
  onlinePower?: number | string // 上网电量
  selfUsePower ?: number | string //自用电量
  onlineCharge ?: number | string // 上网费用
  selfUseCharge ?: number |  string // 自用电费
  edit ?: boolean //是否是编辑状态
}

const testData: Array<pscData> = [
    {
      gatewayPower : 134,
      onlinePower : 13,
      selfUsePower : 4455,
      onlineCharge : 20,
      selfUseCharge : 1030,
      edit:false
    },
  {
    gatewayPower : 1344,
    onlinePower : 154,
    selfUsePower : 44455,
    onlineCharge : 250,
    selfUseCharge : 51030,
    edit:false
  },
]

const tableData:Ref<Array<pscData>> = ref([{}])

//添加
const addData  = () => {
  tableData.value.push({
    edit: true,
  });
  console.log('添加数据触发', tableData.value)

}

// 对数据进行计算
const computedData = (row:pscData)=>{
  row.selfUseCharge = 4678;
  row.onlineCharge = 4432;
  row.selfUsePower = 4451;
}

//确认添加
const confirmAdd = (row:pscData)=>{
  //对数据进行计算
  computedData(row)

  row.edit = false;
}

//修改
const editData = (row:pscData)=>{
  // 对出局重新计算
  computedData(row)
  row.edit = true;
}

//删除
const deleteData = (row:pscData, index:number)=>{
  tableData.value.splice(index, 1);
}

//提交数据
const submitData = ()=>{
  alert(JSON.stringify(tableData.value))
}

onMounted(()=>{
  tableData.value = testData;
})

</script>


<style scoped>

</style>
