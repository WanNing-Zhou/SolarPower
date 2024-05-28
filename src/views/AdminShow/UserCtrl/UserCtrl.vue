<template>
  <div class="user-ctrl-page">
    <div class="page-header">用户管理</div>
    <el-divider/>
    <div class="search-row">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="账号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户名">
                <el-input/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="end">
            <el-col :span="4">
              <el-button type="primary">搜索</el-button>
              <el-button >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
    </div>
    <div class="option-row">
      <el-button type="primary" @click="newUserHandle">新建用户</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="username"
          label="账号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="联系方式">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column label="操作" width="280">

        <template #default="scope">
          <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
              size="small"
              @click="handleAuthEdit(scope.row)">授权管理</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
 import {useRouter} from "vue-router";
 import {getUserList} from "@/api/suer.ts";
 const conditionFrom = ref({
   username: '',
   name: '',
   phone: '',
 })
 const testData = [{
   date: '2016-05-02',
   name: '王小虎',
   address: '上海市普陀区金沙江路 1518 弄',
   username: 'admin',
   phone: '879329',
 },]
 const tableData = ref(testData)


 const router = useRouter()

 const getTableData = async ()=> {
   // const res = await getUserList();
   // const tableData = res.data.filter(item => {
   //
   // })
   // console.log(res)
 }

 getTableData();

 // 跳转到新建用户
 const newUserHandle = () => {
   router.push({path: '/admin/create-user'})
 }

 // 编辑
 const handleEdit = (row: any) => {

 }

 // 删除
 const handleDelete = (row: any) => {

 }

 const authDialogData = reactive({
   visible: false
 })

 const handleAuthEdit = (row: any) => {
    authDialogData.visible = true
 }


</script>

<style lang="scss" scoped>


</style>
