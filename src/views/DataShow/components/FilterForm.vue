<template>
  <div class=filter-form>
    <el-form
        :model="conditions"
        status-icon
        label-width="80px"
    >
      <el-form-item class="form-item-short" label="选择设备:" prop="equipment">
        <el-input size="small" v-model="conditions.equipment" placeholder="全部" clearable/>
      </el-form-item>

      <el-form-item class="form-item-middle" label="时间维度:" prop="timeDimension">
        <el-select size="small" v-model="conditions.timeDimension" class="m-2" placeholder="Select">
          <el-option
              v-for="item in timeDimensionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

      </el-form-item>

      <el-form-item class="form-item-long" label="统计时间" width="200px" prop="statisticalTime">
        <el-date-picker
            size="small"
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

      <el-form-item class="form-item-mini" label-width="20px">
        <el-button type="primary" size="small" ref="searchBtn" @click="handleConfirm">查询</el-button>
      </el-form-item>

    </el-form>

    <div class="data-operation">
      <input id="inverterUpload" ref="fileUpload" @change="upload" style="display: none" type="file">
      <el-button size="small">重新计算</el-button>
      <el-button size="small" @click="uploadHandle">导入华为数据</el-button>
      <el-button size="small" @click="exportFile">导出分析结果</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">

import {reactive, defineEmits, ref, onMounted, Ref, Component} from "vue";
import {InverterExport, invertImport} from "@/api/apiInverter.ts";
import {uploadFile} from "@/api/upload.ts";
import {ElMessage} from "element-plus";

const emit = defineEmits(['confirm'])

const conditions = reactive({
  equipment: '全部', // 设备
  timeDimension: '1', //时间维度
  statisticalTime: [],// 统计时间
})

onMounted(() => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
  conditions.statisticalTime = [start, end]
})

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
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
const handleConfirm = () => {
  emit('confirm', conditions)
}

// 导出数据
const exportFile = () => {
  const link = document.createElement('a');
  link.href = `${import.meta.env.VITE_APP_BASE_API}/api/inverter/export`;
  link.setAttribute('download', '逆变器报表.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link)
}

const fileUpload = ref()
// 文件上传辅助函数
const uploadHandle = () => {
  const inputUpload: HTMLElement = document.querySelector('#inverterUpload');
  inputUpload.click() // 触发文件输入款的点击
}

const searchBtn: Ref = ref()
// 上传文件
const upload = () => {
  const file = fileUpload.value.files[0]
  const formData = new FormData()
  console.log(file)
  formData.append('file', file);
  formData.append('type', 'inverter_report');
  uploadFile(formData).then(res => {

    const fildId = res.data;
    invertImport({fildId}).then(res => {
      console.log('res', res)
      // 导入数据后重新获取数据
      searchBtn.value.click();
      ElMessage({message: '数据导入成功', type: 'success'})
    }).catch(err => {
      ElMessage({message: '数据导入失败请稍后再试', type: 'error'})
    })
    // 清空选择的文件
    fileUpload.value.files.pop();
  }).catch(error=>{
    console.log('文件上传失败')
  })
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

    .form-item-mini {
      width: 50px;
    }

    .form-item-short {
      width: 200px;
    }

    .form-item-middle {
      width: 280px;
    }

    .form-item-long {
      width: 350px;
    }

    //.el-form-item {
    //  width: 30%;
    //  display: flex;
    //  margin:0  5px 0 5px;
    //  .data-picker{
    //    width:40% !important;
    //  }
    //}
  }

  .data-operation {
    display: flex;
  }

}

</style>
