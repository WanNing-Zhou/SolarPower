<template>
  <div class="detail-dialog">
    <el-dialog v-model="visible" :before-close="handleBeforeClose" :title="formData.designName">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="组串总容量">
          <el-input disabled :value="formData.totalStringCapacity" placeholder="Approved by" clearable/>
        </el-form-item>

        <el-form-item label="发电量">
          <el-input disabled v-model="formData.powerGeneration" placeholder="Approved by" clearable/>
        </el-form-item>

        <el-form-item label="累计发电量">
          <el-input disabled v-model="formData.accumulatedPowerGeneration" placeholder="Approved by" clearable/>
        </el-form-item>
        <el-form-item label="等价发电时">
          <el-input disabled v-model="formData.equivalentPowerGenerationTime" placeholder="Approved by" clearable/>
        </el-form-item>
        <el-form-item label="峰值交流功率">
          <el-input disabled v-model="formData.peakACPower" placeholder="Approved by" clearable/>
        </el-form-item>
        <el-form-item label="并网时长">
          <el-input disabled v-model="formData.gridConnectionDuration" placeholder="Approved by" clearable/>
        </el-form-item>
        <el-form-item label="限电损失量">
          <el-input disabled v-model="formData.powerRationingLoss" placeholder="Approved by" clearable/>
        </el-form-item>

        <el-form-item label="平均发电误差">
          <el-input disabled v-model="formData.averageAbsoluteDeviation" placeholder="Approved by" clearable/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {computed, ref, toRefs, watch} from "vue";


/*const tableData =reactive([
    {
      designName:'Z-1', //设备名称
      dedignId:'Z-1',//设备ID
      totalStringCapacity:31.2, //组串总容量
      powerGeneration: 33, //发电量
      accumulatedPowerGeneration:1024,//累计发电量
      equivalentPowerGenerationTime: 55,//等价发电时
      peakACPower: 21, //峰值交流功率
      gridConnectionDuration: 523,// 并网时长
      powerRationingLoss:33,// 限电损失量
      averageAbsoluteDeviation:'',//平均发电误差
      averageGenPower: ''. //平均发电量
      singleGenPower: '', //标转单板日电量
    },
])*/

// 设备名称, 组串容量, 当日发电量, 平均发电量, 发电量无法, 误差百分比, 标转单板日电量

const props = defineProps(
    {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      detailData: {
        type: Object,
        default: {
          designName: 'Z-3',
          dedignId: 'Z-3',
          totalStringCapacity: 52.1,
          powerGeneration: 45,
          accumulatedPowerGeneration: 1800,
          equivalentPowerGenerationTime: 70,
          peakACPower: 27,
          gridConnectionDuration: 730,
          powerRationingLoss: 52,
          averageAbsoluteDeviation: ''
        }
      }
    }
)

const emit = defineEmits(['close'])
const {dialogVisible} = toRefs(props)
const visible = computed(() => {
  return dialogVisible?.value;
})

// const {
//   designName,
//   totalStringCapacity,
//   powerGeneration,
//   accumulatedPowerGeneration,
//   equivalentPowerGenerationTime,
//   peakACPower,
//   gridConnectionDuration,
//   powerRationingLoss,
//   averageAbsoluteDeviation,
// } = toRefs(props.detailData)

const formData = computed(() => {
  const res = props.detailData
  console.log('prop aver',res?.averageAbsoluteDeviation)
  res.averageAbsoluteDeviation = res?.averageAbsoluteDeviation > 0 ? `+${res?.averageAbsoluteDeviation}%` : `${res?.averageAbsoluteDeviation}%`
  console.log('formData',res)
  return res
})

const handleBeforeClose = () => {
  console.log('prop', props.detailData)
  emit('close')
}


</script>

<style lang="scss" scoped>
.detail-dialog {

}

</style>
