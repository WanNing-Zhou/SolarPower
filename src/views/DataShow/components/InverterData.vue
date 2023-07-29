<template>
  <div class="inverter-data">
    <el-container>
      <el-header height="38px">
        <filter-form @confirm="handFilter"/>
      </el-header>
      <el-main>
        <inverter-data-table @showInfo="showInfo"> </inverter-data-table>
      </el-main>
    </el-container>
    <DetailDialog :detailData="detailData" :dialogVisible="detailDialogVisible" @close="handleClose" ></DetailDialog>
  </div>
</template>

<script setup lang="ts">

import FilterForm from "@/views/DataShow/components/FilterForm.vue";
import InverterDataTable from "@/views/DataShow/components/InverterDataTable.vue";
import {ref} from "vue";
import DetailDialog from "@/views/DataShow/components/DetailDialog.vue";

interface Conditions {
  equipment: string // 设备
  timeDimension:string //时间维度
  statisticalTime:string// 统计时间
}

const handFilter = (conditions:Conditions)=>{
  console.log(conditions)
}

//弹出框显示
const detailDialogVisible = ref(false)
// 详情值
const detailData = ref({})
const showInfo = (row)=>{
  detailDialogVisible.value = true
  detailData.value = row;
  console.log('showInfo',row)


}

const handleClose  = ()=>{

  //
  detailDialogVisible.value = false;

}

</script>

<style lang="scss" scoped>

.inverter-data{
   :deep(.el-main){
     padding: 0px;
  }

}

</style>
