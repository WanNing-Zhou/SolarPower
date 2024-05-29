<template>
  <div class="user-ctrl-page">
    <div class="page-header">公司管理</div>
    <el-divider/>
<!--    <div class="search-row">-->
<!--      <el-form>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="公司名称">-->
<!--              <el-input></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-button type="primary">搜索</el-button>-->
<!--            <el-button >重置</el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row justify="end">-->

<!--        </el-row>-->


<!--      </el-form>-->
<!--    </div>-->
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
          prop="manager"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="contact"
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
    <company-edit-dialog v-model:visible="companyEditData.visible" :company="companyEditData.company" @success="getTableData"/>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import CompanyEditDialog from "./CompanyEditDialog.vue";
import {deleteCompany, getCompanyList, getCompanySearch} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
const conditionFrom = ref({
  username: '',
  name: '',
  phone: '',
})

const tableData = ref([])

// 获取列表信息
const getTableData = async () => {
  // getCompanyList()
  const res = await getCompanySearch()
  tableData.value = res.data

}
getTableData();

const companyEditData= reactive({
  visible: false,
  company: null as any,
})


const router = useRouter()
// 跳转到新建用户
const newHandle = () => {
  // router.push({path: '/admin/create-user'})
  companyEditData.visible= true
  companyEditData.company=null
}

// 编辑
const handleEdit = (row: any) => {
  companyEditData.visible= true
  companyEditData.company=row
}

// 删除
const handleDelete = async (row: any) => {
  const res:any = await deleteCompany(row.id)
  if(res.code == 200){
    ElMessage.success('删除成功')
    await getTableData()
  }
}

</script>

<style lang="scss" scoped>


</style>
