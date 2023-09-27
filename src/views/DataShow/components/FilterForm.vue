<template>
  <div class=filter-form>
    <el-form :model="conditions" status-icon label-width="80px">
      <el-form-item class="form-item-short" label="选择电站:" prop="equipment">
        <!-- <el-input size="small" v-model="conditions.equipment" placeholder="全部" clearable /> -->
        <el-select v-model="conditions.equipment" class="m-2" placeholder="选择电站" size="small" width="200px">
        <el-option v-for="item in options" :key="item.value"  :label="item.label" :value="item.value" />
      </el-select>
      </el-form-item>


      <el-form-item class="form-item-long" label="统计时间" width="200px" prop="statisticalTime">
        <el-date-picker size="small" class="data-picker" v-model="conditions.statisticalTime" type="daterange"
          start-placeholder="开始时间" end-placeholder="结束时间" :disabled-date="disabledDate" :shortcuts="shortcuts"
          range-separator="至" />
      </el-form-item>

      <el-form-item class="form-item-mini" label-width="20px">
        <el-button type="primary" size="small" ref="searchBtn" @click="handleConfirm">查询</el-button>
      </el-form-item>

    </el-form>

    <div class="data-operation">
      <input id="inverterUpload" ref="fileUpload" @change="upload" style="display: none" type="file">
      <el-button size="small" @click="reCount">重新计算</el-button>
      <el-button size="small" @click="uploadHandle">导入华为数据</el-button>
      <el-button size="small" @click="exportFile">导出分析结果</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">

import { reactive, defineEmits, ref, onMounted, Ref, PropType, Component, nextTick } from "vue";
import { getInverterTableData, InverterExport, invertImport, ReCount } from "@/api/apiInverter.ts";
import { uploadFile } from "@/api/upload.ts";
import { ElMessage } from "element-plus";
import { InverterParam } from "@/type/inverter.ts";
import mitts from '@/utils/bus'
import { useStore } from 'vuex'
import { Res } from '@/type/request/requestType'
import { useRoute } from "vue-router";

const emit = defineEmits(['confirm'])
const store = useStore()
const route = useRoute()
const conditions = reactive({
  equipment: '全部', // 设备
  statisticalTime: [],// 统计时间
})


const options = [
  {
    value: '陕西中铁科技园区光伏电站',
    label: '陕西中铁科技园区光伏电站'
  },
  {
    value: '神木富油科技能源有限公司',
    label: '神木富油科技能源有限公司'
  },
  {
    value: '西安京东亚一园站',
    label: '西安京东亚一园站'
  },
]


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
    text: '最近三天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
      return [start, end]
    },
  },
]




const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

//表单提交
const handleConfirm = () => {
  console.log('conditions',conditions)
  emit('confirm', conditions)

  //查询被点击后触发
  store.commit('setInverterSearchFlag', !store.state.InverterSearchFlag)

}

// 导出数据
const exportFile = () => {
  const link = document.createElement('a');
  link.href = `${import.meta.env.VITE_APP_BASE_API}/api/inverter/export?stationName=` + route.params.label
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
    console.log('fildld', fildId)
    invertImport({ fildId }).then(res => {
      // console.log('res', res)
      ElMessage({ message: '数据导入成功', type: 'success' })
      // 重新获取数据
      emit('confirm', conditions)
    }).catch(err => {
      // console.log('err', err)
      ElMessage({ message: '数据导入失败请稍后再试', type: 'error' })
    })
  }).catch(error => {
    console.log('文件上传失败', error)
  })
}


//重新计算
const reCount = () => {
  //参数从store中获取值
  ReCount(store.state.invertParam).then((res: Res) => {
    console.log('res', res)
    if (res.code === 200) {
      ElMessage({ message: res.message + ',更改了' + res.data + '条数据', type: 'success' })
      store.commit('setFlag', true)
      //清空调整系数的数组
      store.commit('setInvertParam', [])

    } else {
      ElMessage({ message: '操作失败', type: 'error' })
    }

  })
  console.log('vuex', store.state.invertParam)

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
