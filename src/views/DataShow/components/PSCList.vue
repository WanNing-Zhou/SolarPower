<template>
  <div class="PSC-list">
    <el-table>
      <!--      用户录入-->
      <el-table-column prop="name" label="关口表电量">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" placeholder="姓名"></el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!--用户输入-->
      <el-table-column prop="name" label="上网电量">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" placeholder="姓名"></el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="自用电量">

      </el-table-column>

      <el-table-column prop="name" label="上网电费">
      </el-table-column>

      <el-table-column prop="" label="自用电费">

      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row)">
            <i class="el-icon-check" aria-hidden="true"></i>
          </el-button>
          <div v-else>
            <el-button type="text" size="medium" @click="editData(scope.row)">
              <i class="el-icon-edit" aria-hidden="true"></i>
            </el-button>
            <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
              <i class="el-icon-delete" aria-hidden="true"></i>
            </el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>


    <el-button type="text" @click="addData">添加数据</el-button>
    <el-divider></el-divider>
    <el-button @click="submitData">提交 </el-button>

  </div>
</template>

<script setup lang="ts">

import {reactive, ReactiveFlags, Ref, ref} from "vue";

interface pscData{
  gatewayPower?:number | string //关口表电量
  onlinePower?: number | string // 上网电量
  selfUseCharge ?: number | string //自用费用
  onlineCahrge ?: number | string // 上网费用
  selfUseCharge ?: number |  string // 自用电费
  edit ?: boolean //是否是编辑状态
}

const tableData:Ref<Array<pscData>> = ref([{}])

//添加
const addData  = () => {
  tableData.value.push({
    edit: true,
  });
}

//确认添加
const confirmAdd = (row)=>{
  row.edit = false;
}

//修改
const editData = (row)=>{
  row.edit = true;
}

//删除
const deleteData = (row, index)=>{
  tableData.value.splice(index, 1);
}
//提交数据
const submitData = ()=>{
  alert(JSON.stringify(this.tableData))
}

</script>


<style scoped>

</style>
