/*  *
* @FileNAme src\views\DataShow\components\InspectionChecklist.vue
* @author 周万宁
* @create 2023/7/31-0:21
* @version
* @description
* @TODO: 编号需要自动生成
*/
<template>
  <div class="inspection-checklist">
    <el-container>
      <el-header class="checklist-filter-from" height="38px">
        <el-form :model="conditions" status-icon label-width="80px">
          <el-form-item label="工作类型:">
            <el-select v-model="conditions.type" class="m-2" placeholder="请选择">
              <el-option v-for="item in workTypeOptions " :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="工作人:">
            <el-input v-model="conditions.workman" placeholder="请输入" clearable />
          </el-form-item>

          <el-form-item label="记录时间" prop="filterTime" width="200px">
            <el-date-picker size="small" class="data-picker" v-model="conditions.filterTime" type="daterange"
              start-placeholder="开始时间" end-placeholder="结束时间" :disabled-date="disabledDate" :shortcuts="shortcuts"
              range-separator="至" />

          </el-form-item>
          <el-form-item label-width="50">
            <el-button class="search-button" type="primary" size="small" @click="handleConfirm">查询</el-button>
          </el-form-item>
        </el-form>

      </el-header>
    </el-container>

    <div class="checklist-table">
      <el-table :data="tableData" height="450px" border>
        <!--      用户录入-->
        <el-table-column prop="type" label="工作类别"></el-table-column>
        <!--用户输入-->
        <el-table-column prop="id" label="编号"></el-table-column>

        <el-table-column prop="date" label="发生时间">

        </el-table-column>

        <el-table-column prop="workMan" label="工作人">
        </el-table-column>

        <el-table-column prop="description" :show-overflow-tooltip="true" label="内容描述"></el-table-column>
        <el-table-column prop="sceneSituation" :show-overflow-tooltip="true" label="现场情况"></el-table-column>
        <el-table-column prop="comment" :show-overflow-tooltip="true" label="备注"></el-table-column>
        <el-table-column prop="photoAndVideo" :show-overflow-tooltip="true" label="文件名称"></el-table-column>



        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
              <el-icon :size="10">
                <Checked />
              </el-icon>
            </el-button>
            <div v-else>
              <el-button type="primary" @click="editData(scope.row)">
                <el-icon :size="12">
                  <Edit />
                </el-icon>
              </el-button>
              <el-button type="primary" @click="deleteData(scope.row, scope.$index)">
                <el-icon :size="12">
                  <Delete />
                </el-icon>
              </el-button>
              <el-button type="success" @click="checkListPrint(scope.row)">
                打印<el-icon class="el-icon--right">
                  <Download />
                </el-icon>

              </el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页插件 -->
      <el-pagination v-model:current-page="conditions.page" v-model:page-size="conditions.pageSize"
        :page-sizes="[5, 10, 15, 20, 40]" layout="total,sizes, prev, pager, next,jumper" :total="conditions.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />

      <el-button type="primary" @click="addData">添加工作单</el-button>
    </div>
    <!-- 添加工作单 -->
    <InspectionChecklistForm :addNumber="addNum" @submit="handleConfirmAdd" @close="dialogClose"
      :dialogVisible="dialogVisible" ></InspectionChecklistForm>
    <!-- 编辑工作单 -->
    <InspectionEditFrom :EditdialogVisible="EditdialogVisible" @closeEdit="EditdialogClose"></InspectionEditFrom>


    <!-- <el-dialog v-model="chekListImgVisilbe">
      <img src="/static/imgs/checkList.jpg">
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">

import { Checked } from "@element-plus/icons-vue";
import { computed, Ref, ref, reactive, onMounted,watch } from "vue";
import FilterForm from "@/views/DataShow/components/FilterForm.vue";
import InspectionChecklistForm from "@/views/DataShow/components/InspectionChecklistForm.vue";
import { convertDateFormat, getCurrentDate } from "@/utils/dateUtils.ts";
import { formatNumber } from "@/utils/numberUtils.ts";
import { InverterParam, Inverter, InverterPageParams } from "@/type/inverter.ts";
import { workSheetCondition, deleteWorkSheetCondition, addConditions } from "@/type/request/worksheet"
import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import { getWorkSheet, deleteWorkSheet, printWorkSheet, addWorkSheet } from '@/api/apiworksheet'
import { Res } from '@/type/request/requestType'
import { ElMessage } from "element-plus";
import InspectionEditFrom from "./totalTableItem/InspectionEditFrom.vue";
import { InspectionChecklist } from '@/type/worksheet'


//使用store
const store = useStore()
const route = useRoute()

//时间绑定的变量
// let filterTime = reactive([])









//查询条件
const conditions: workSheetCondition = reactive({
  companyNumber: '',//公司编号
  stationNumber: '',//电站编号
  startDate: '',//起始时间
  endDate: '',//结束时间
  page: 1,//当前页面
  pageSize: 10,//页面大小
  filterTime: [],//过滤时间
  total: 0,//分页总数
  // type:'',//工作类型
  // workman:'',//工作人



})

//删除条件
const delConditions: deleteWorkSheetCondition = reactive({
  companyNumber: '',//公司编号
  stationNumber: '',//电站编号
  id: '',//工作单id
})
//添加条件
// let addConditions:



onMounted(() => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
  conditions.filterTime = [start, end]
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

// 工作类型选择
const workTypeOptions = [
  {
    value: '0000',
    label: '请选择'
  },
  {
    value: '0001',
    label: '巡视记录'
  },
  {
    value: '0002',
    label: '故障处理单'
  },
  {
    value: '0003',
    label: '日常巡检'
  },
  {
    value: '0004',
    label: '故障复检'
  },

]



// 默认数据
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}



//table数据
let tableData: Ref<Array<InspectionChecklist>> = ref([]);

//添加 dialog显示
const dialogVisible = ref(false)
//编辑的 dialog显示
const EditdialogVisible = ref(false)



const addNum = computed(() => {
  return getCurrentDate() + '-' + formatNumber((tableData.value.length + 1), 3);
})
//添加
const addData = () => {
  // dialog显示
  if (store.state.companyNumber !== route.params.id) {
    dialogVisible.value = true;

  } else {
    ElMessage(
      {
        type: 'error',
        message: '请先选择电站 -__-!'
      }

    )
  }
}

//添加 dialog关闭
const dialogClose = () => {
  dialogVisible.value = false;
}
//修改 dialog关闭
const EditdialogClose = () => {
  EditdialogVisible.value = false

}

//确认添加
const handleConfirmAdd = (data: addConditions) => {



  // tableData.value.push(data)
  console.log('data', data)

  addWorkSheet(data).then(res => {
    console.log('添加返回的结果', res)
    if (res.code === 200) {
      ElMessage({
        message: res.data,
        type: 'success',
      })
      //重新查询
      conditions.type = data.type
      handleConfirm()
    }
  })

  // dialog隐藏
  dialogVisible.value = false;




}

// dialog关闭
const handleDialogClose = () => {
  dialogVisible.value = false;
}

//确认添加
const confirmAdd = (row: InspectionChecklist) => {

  //对数据进行计算
  // row.edit = false;

}

//修改数据
const editData = (row: InspectionChecklist) => {
  // 对数据重新计算
  // row.edit = true;

  EditdialogVisible.value = true

  store.commit('setEditTableData', row)




}

//删除
const deleteData = (row: InspectionChecklist, index: number) => {

  delConditions.companyNumber = store.state.companyNumber
  delConditions.stationNumber = route.params.id
  delConditions.id = row.id

  deleteWorkSheet(delConditions).then(res => {

    if (res.code === 200) {
      ElMessage({
        message: res.data,
        type: 'success',
      })

      tableData.value.splice(index, 1);
      handleConfirm()

    }


  })

}

//提交数据
const submitData = () => {
  alert(JSON.stringify(tableData.value))
}

// 打印功能
// const chekListImgVisilbe = ref(false);

const checkListPrint = (row: InspectionChecklist) => {
  // chekListImgVisilbe.value = true;
  console.log(row.id)

  printWorkSheet(row.id).then((res: Res) => {
    if (res.code === 200) {
      ElMessage({
        message: '打印已完成',
        type: 'success',
      })
      //下载工作单
      const link = document.createElement('a');
      link.href = `${import.meta.env.VITE_APP_BASE_API}/api/file/download/worksheet_print/` + res.data;
      link.setAttribute('download', res.data);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link)



    }


  })



}

//表单提交
const handleConfirm =async () => {


  tableData.value = []
  conditions.companyNumber = store.state.companyNumber
  conditions.stationNumber = route.params.id
  conditions.startDate = convertDateFormat(conditions.filterTime[0], true)
  conditions.endDate = convertDateFormat(conditions.filterTime[1], true)
  if(conditions.type === '0000')
  {
     
    delete conditions.type
  }
  console.log('工作单查询条件', conditions)

  if (store.state.companyNumber !== route.params.id) {
      getWorkSheetData(conditions)

  } else {
    ElMessage(
      {
        type: 'error',
        message: '请先选择电站 -__-!'
      }

    )
  }


}
//获取表单数据
const getWorkSheetData = (val: workSheetCondition) => {


  getWorkSheet(val).then((res: Res) => {
    console.log(res)
    if (res.code === 200) {
      console.log('工作单查询返回的结果', res)
      tableData.value = res.data.data
      conditions.total = res.data.totalRecords
    } else {
      tableData.value = []
    }



  })

}


// 当前页大小发生变化时触发
const handleSizeChange = (val: number) => {
  //修改页面大小
  conditions.pageSize = val
  handleConfirm()


}

const handleCurrentChange = (val: number) => {
  conditions.page = val
  handleConfirm()

}

//监听左侧电站，如果电站的路由发生变化时就调用分页查询
//计算电站
const stationRouter = computed(()=>{
  return route.params.label as string
})
//监听
watch(stationRouter,()=>{

  handleConfirm()


},{
  deep:true
})


</script>

<style scoped>
.inspection-checklist {
  .checklist-filter-from {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-form {
      width: 100%;
      display: flex;


      .el-form-item {
        width: 25%;
        display: flex;
        margin: 0 5px 0 5px;



        .data-picker {
          width: 40% !important;
        }
      }
    }

    .data-operation {
      display: flex;
    }

  }

  .el-button {
    margin-top: 10px;

  }

}
</style>
