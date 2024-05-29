<template>
  <div class="user-ctrl-page">
    <div class="page-header">用户管理</div>
    <el-divider/>
<!--    <div class="search-row">-->
<!--        <el-form>-->
<!--          <el-row>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="账号">-->
<!--                <el-input></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="用户名">-->
<!--                <el-input/>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="联系电话">-->
<!--                <el-input/>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row justify="end">-->
<!--            <el-col :span="4">-->
<!--              <el-button type="primary">搜索</el-button>-->
<!--              <el-button >重置</el-button>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-form>-->
<!--    </div>-->
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
          prop="contact"
          label="联系电话">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column label="操作" width="280">

        <template #default="scope">
<!--          <el-button-->
<!--              size="small"-->
<!--              @click="handleEdit(scope.row)">编辑</el-button>-->
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
    <edit-user-dialog v-model:visible="editDialog.visible" :user="editDialog.data"/>
    <AuthDialog v-model:visible="authDialogData.visible" :user="authDialogData.data" @success="getTableData"/>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
 import {useRouter} from "vue-router";
import {deleteUser, getUserList} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
import EditUserDialog from "@/views/AdminShow/UserCtrl/EditUserDialog.vue";
import AuthDialog from "@/views/AdminShow/UserCtrl/AuthDialog.vue";
 const conditionFrom = ref({
   username: '',
   name: '',
   phone: '',
 })
 const tableData = ref([])


 const router = useRouter()

 const getTableData = async ()=> {
   const res = await getUserList();
   // console.log(res)
   const resValue = res.data.filter(item => {
    return !item.permission.isAdmin
   })
   tableData.value = resValue
   // console.log(res)
 }

 getTableData();

 // 跳转到新建用户
 const newUserHandle = () => {
   router.push({path: '/admin/create-user'})
 }

 const editDialog = reactive({
   visible: false,
   data: {} as any,
 })

 // 编辑
 const handleEdit = (row: any) => {
   // router.push({path: '/admin/create-user', query:{id: row.id}})
   editDialog.visible = true
   editDialog.data={...row}
 }

 // 删除
 const handleDelete = async (row: any) => {
   try {
     console.log(row.id)
     await deleteUser(row.id)
     await getTableData()
     ElMessage.success('删除成功')
   }catch (e){

   }
 }

 const authDialogData = reactive({
   visible: false,
   data: null
 })

 const handleAuthEdit = (row: any) => {
    authDialogData.visible = true
   authDialogData.data =row
 }


</script>

<style lang="scss" scoped>


</style>
