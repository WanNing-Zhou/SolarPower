<template>
  <div class=filter-form>
    <el-form
        :model="conditions"
        status-icon
        label-width="80px"
    >
      <el-form-item label="选择设备:" prop="equipment">
        <el-input v-model="conditions.equipment" placeholder="全部" clearable/>
      </el-form-item>

      <el-form-item label="时间维度:" prop="timeDimension">
        <el-select v-model="conditions.timeDimension" class="m-2" placeholder="Select">
          <el-option
              v-for="item in timeDimensionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

      </el-form-item>

      <el-form-item label="统计时间" prop="statisticalTime">
        <el-date-picker
            class="data-picker"
            v-model="conditions.statisticalTime"
            type="daterange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            range-separator="至"
        />

      </el-form-item>
      <el-button type="primary" @click="handleConfirm">查询</el-button>
    </el-form>

    <div class="data-operation">
      <el-button>导入华为数据</el-button>
      <el-button>导出分析结果</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">

import {reactive,defineEmits, ref} from "vue";

const emit = defineEmits(['confirm'])

const conditions = reactive({
  equipment: '全部', // 设备
  timeDimension: '1', //时间维度
  statisticalTime: '',// 统计时间
})


const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 时间维度选择
const timeDimensionOptions = [
  {
    value: '0',
    label: '请选择'
  },
  {
    value: '1',
    label: '按日统计'
  },
  {
    value: '2',
    label: '按周统计'
  },
  {
    value: '3',
    label: '按月统计'
  },
  {
    value: '4',
    label: '按季度统计'
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

//表单提交
const handleConfirm = ()=>{
  emit('confirm',conditions)
}

</script>

<style lang="scss" scoped>

.filter-form {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-form {
    width: 100%;
    display: flex;

    .el-form-item {
      width: 25%;
      display: flex;
      margin:0  5px 0 5px;
      .data-picker{
        width:40% !important;
      }
    }
  }

  .data-operation{
    display: flex;
  }

}

</style>
