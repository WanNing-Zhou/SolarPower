<template>
  <div class=filter-form>
    <el-form
    :model="conditions"
    status-icon
    label-width="80px"
    >
      <el-form-item label="选择设备:" prop="equipment">
        <el-input v-model="conditions.equipment" placeholder="全部"  clearable />
      </el-form-item>

      <el-form-item label="时间维度:" prop="timeDimension">
        <el-select v-model="conditions.timeDimension" class="m-2" placeholder="Select" >
          <el-option
              v-for="item in timeDimensionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

      </el-form-item>

      <el-form-item label="统计时间">


      </el-form-item>



    </el-form>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";

const conditions = reactive({
  equipment: '全部', // 设备
  timeDimension:'1', //时间维度
  statisticalTime: '',// 统计时间
})

const timeDimensionOptions= [
  {
    value:'0',
    label:'请选择'
  },
  {
    value: '1',
    label:'按日统计'
  },
  {
    value: '2',
    label:'按周统计'
  },
  {
    value: '3',
    label:'按月统计'
  },
  {
    value: '4',
    label:'按季度统计'
  },
]

</script>

<style lang="scss" scoped>

.filter-form{
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-form{
    width: 100%;
    display: flex;
    .el-form-item{
      width: 25%;
      display: flex;
    }
  }

}

</style>
