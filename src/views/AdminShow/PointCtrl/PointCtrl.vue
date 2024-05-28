<template>
  <div class="user-ctrl-page">
    <div class="page-header">电站管理</div>
    <el-divider/>

    <el-select
        v-model="optionValue"
        placeholder="Select"
        size="large"
        style="width: 240px"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>

    <div class="search-row">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电站名称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">搜索</el-button>
            <el-button >重置</el-button>
          </el-col>
        </el-row>
        <el-row justify="end">

        </el-row>


      </el-form>
    </div>
    <div class="option-row">
      <el-button type="primary" @click="newHandle">新建公司</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="公司名">
      </el-table-column>
      <el-table-column
          prop="address"
          width="220"
          label="地址">
      </el-table-column>
      <el-table-column
          prop="response"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="responsePhone"
          label="负责人电话">
      </el-table-column>
      <el-table-column label="操作" width="180">

        <template #default="scope">
          <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <company-edit-dialog v-model:visible="companyEditData.visible" :company="companyEditData.company"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import CompanyEditDialog from "./CompanyEditDialog.vue";
import {getCompanyList} from "@/api/suer.ts";

const optionValue = ref()
const options = [
  {label: 'kakaxi', value: '123'}
]

// 获取选项
const getOptions = async () =>{
  // const res = await getCompanyList()
}

const testData = [{
  date: '2016-05-02',
  name: 'xxx公司',
  address: '上海市普陀区金沙江路 1518 弄',
  username: 'admin',
  responsePhone: '879329',
  response: '王小虎',
}]

const tableData = ref(testData)

// 获取列表信息
const getTableData = () => {
  // getCompanyList()

}
// 监听optionValue变化，变化后获取表单
watch(optionValue, ()=>{
  getTableData()
})
// getTableData();

const companyEditData= reactive({
  visible: false,
  company: '',
})


const router = useRouter()
// 跳转到新建用户
const newHandle = () => {
  // router.push({path: '/admin/create-user'})
  companyEditData.visible= true
}

// 编辑
const handleEdit = (row: any) => {

}

// 删除
const handleDelete = (row: any) => {

}

/**
 * 进入页面首次执行流程
 * 1. 获取options
 * 2. 将第一个表单作为选项
 */
onMounted(async () => {
  await getOptions()
})

</script>

<style lang="scss" scoped>


</style>
