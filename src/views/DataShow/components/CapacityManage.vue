<template>
  <div class="capacity-manage-page">

    <el-table :data="tableData" height="470px" border>
      <el-table-column prop="stationName" label="电站名称"/>
      <el-table-column prop="name" label="设备名称"  />
      <el-table-column prop="capacity" label="组串总容量(kWp)"  />
      <el-table-column prop="adjustmentFactor" label="调整系数"  />
      <el-table-column label="操作">
        <template #default=" scope ">
          <el-button type="primary" size="small" @click="editHandle(scope.row)">调整</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="paginationState.currentPage" v-model:page-size="paginationState.pageSize"
                   :page-sizes="[5, 10, 15, 20, 40]" layout="total,sizes, prev, pager, next,jumper" :total="paginationState.total"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog width="50%" title="逆变器容量&系数调整" v-model="editDialogVis">
      <el-form label-width="150px">
        <el-form-item label="电站名称">
          <el-input disabled v-model="editData.data.stationName"/>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input disabled v-model="editData.data.name"/>
        </el-form-item>
        <el-form-item label="调整系数">
          <el-input v-model="editData.data.adjustmentFactor"/>

        </el-form-item>
        <el-form-item label="组串总容量(kWp)">
          <el-input v-model="editData.data.capacity"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirmHandle">提交</el-button>
          <el-button @click="editDialogVis=false">取消</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {getInvCapList, updateInvCap} from "@/api/apiInverter.ts";
import {ElMessage} from "element-plus";
// 列表数据
const tableData = ref([])
const route = useRoute()
const editDialogVis = ref(false)

// 公司id
const compId = computed(() => {
  return route.query.compId;
})
// 电站id
const pointId = computed(() => {
  return route.query.pointId
})


const testData =  [
  {
    powerStationName: '电站1',
    inverterName: '设备1',
    inverterTotalCapacity: 100,
  },
  {

    powerStationName: '电站2',
    inverterName: '设备2',
    inverterTotalCapacity: 200,
  }
]
const getTableData = async () => {
  try {
    const  res = await getInvCapList({
      page: paginationState.currentPage,
      pageSize: paginationState.pageSize,
      stationId: pointId.value
    })
    console.log(res)
    tableData.value = res.data.data.map((item) => ({...item, tempInverterTotalCapacity: item.inverterTotalCapacity}))
    paginationState.total = res.data.totalRecords
  }catch (err) {
    console.err('request err', err)
  }

}

const paginationState  = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})


/**
 * 页面数据发生变化时重新获取表格数据
 * @param page
 */
const handleCurrentChange = (page: number) => {
  paginationState.currentPage = page
  getTableData()
}
const handleSizeChange = (pageSize: number) => {
  paginationState.pageSize = pageSize
  getTableData()
}

// 修改数据
const editData = reactive({
  data:{}
})

const editHandle = (row) => {
  console.log(row)
  editDialogVis.value = true;
  editData.data = {...row}
}


/**
 * 修改组串容量
 * @param id 设备id
 * @param inverterTotalCapacity 租串总容量
 */
const confirmHandle = async ( ) => {

  try {
    const res = await updateInvCap({
      adjustmentFactor: editData.data.adjustmentFactor,
      capacity: editData.data.capacity,
      name: editData.data.name,
      id: editData.data.id,
    })
    ElMessage.success('修改成功')
    editDialogVis.value = false
    await getTableData()
  }catch (err){
    console.error('request err', err)
  }
}


/**
 * 页面加载完成获取表格数据
 */
onMounted(() => {
  getTableData()
})



</script>

<style scoped>

</style>