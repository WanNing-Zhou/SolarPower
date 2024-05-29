<template>
  <div class="user-ctrl-page">
    <div class="page-header">电站管理</div>
    <el-divider/>
    <div class="search-row">
      <el-form>
        <el-row>
          <el-col></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司名称">
              <el-select
                  v-model="optionValue"
                  placeholder="Select"
                  style="width: 240px"
              >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
<!--            <el-button type="primary">搜索</el-button>-->
<!--            <el-button >重置</el-button>-->
          </el-col>
        </el-row>
        <el-row justify="end">

        </el-row>


      </el-form>
    </div>
    <div class="option-row">
      <el-button type="primary" @click="newHandle">新建站点</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="电站名">
      </el-table-column>
      <el-table-column prop="capacity" label="容量"></el-table-column>
      <el-table-column prop="type" label="设备类型"></el-table-column>
      <el-table-column
          prop="manager"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="contact"
          label="负责人电话">
      </el-table-column>
      <el-table-column
          prop="address"
          width="220"
          label="地址">
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
<!--    <company-edit-dialog v-model:visible="companyEditData.visible" :company="companyEditData.company"/>-->
  <point-edit-dialog
      v-model:visible="pointEditData.visible"
      @success="getTableData"
      :company-id="optionValue"
      :data="pointEditData.data"
  ></point-edit-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
// import CompanyEditDialog from "./CompanyEditDialog.vue";
import {deleteStation, getCompanyList, getCompanySearch, getStationList} from "@/api/suer.ts";
import PointEditDialog from "@/views/AdminShow/PointCtrl/PointEditDialog.vue";
import {ElMessage} from "element-plus";

const optionValue = ref<any>(null)
const options = ref([
  {label: 'kakaxi', value: '123'}
])

// 获取选项
const getOptions = async () =>{
  // 获取全部公司
  // const res = await getCompanyList()
  const res = await getCompanySearch()
  options.value = res.data.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  })
}
//
// const testData = [{
//   date: '2016-05-02',
//   name: 'xxx公司',
//   address: '上海市普陀区金沙江路 1518 弄',
//   username: 'admin',
//   responsePhone: '879329',
//   response: '王小虎',
// }]

const tableData = ref([])

// 获取列表信息
const getTableData = async () => {
  console.log(optionValue.value)
  // 根据option获取电站信息
  const res:any = await getStationList({companyId: optionValue.value})
  tableData.value = res.data
}
// 监听optionValue变化，变化后获取表单
watch(optionValue, ()=>{
  getTableData()
})
// getTableData();

const pointEditData= reactive({
  visible: false,
  data: null as any,
})


const router = useRouter()
// 跳转到新建用户
const newHandle = () => {
  // router.push({path: '/admin/create-user'})
  pointEditData.visible= true
  pointEditData.data = null
}

// 编辑
const handleEdit = (row: any) => {
  pointEditData.visible= true
  pointEditData.data = row
}

// 删除
const handleDelete =  async (row: any) => {
  const res:any = await deleteStation(row.id)
  if(res.code == 200){
    ElMessage.success('删除成功')
    await getTableData()
  }
}

/**
 * 进入页面首次执行流程
 * 1. 获取options
 * 2. 将第一个表单作为选项
 */
onMounted(async () => {
  await getOptions()
  optionValue.value=options.value[0].value
  // console.log('kaka',optionValue.value)
  // await getTableData()
})

</script>

<style lang="scss" scoped>


</style>
