
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
        <el-form
            :model="conditions"
            status-icon
            label-width="80px"
        >
          <el-form-item label="工作类型:" prop="workType">
            <el-select v-model="conditions.workType" class="m-2" placeholder="请选择">
              <el-option
                  v-for="item in workTypeOptions "
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
            <el-form-item label="工作人:" prop="workerName">
              <el-input v-model="conditions.workerName" placeholder="请输入" clearable/>
            </el-form-item>

            <el-form-item label="记录时间" prop="filterTime">
              <el-date-picker
                  class="data-picker"
                  v-model="conditions.filterTime"
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
      </el-header>
    </el-container>

    <div class="checklist-table">
      <el-table :data="tableData">
        <!--      用户录入-->
        <el-table-column prop="workType" label="工作类别"></el-table-column>
        <!--用户输入-->
        <el-table-column prop="number" label="编号"></el-table-column>

        <el-table-column prop="startTime" label="发生时间">

        </el-table-column>

        <el-table-column prop="workerName" label="工作人">
        </el-table-column>

        <el-table-column prop="content" :show-overflow-tooltip="true" label="内容描述"></el-table-column>
        <el-table-column prop="sceneSituation" :show-overflow-tooltip="true" label="现场情况"></el-table-column>
        <el-table-column prop="remarks" :show-overflow-tooltip="true" label="备注"></el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmAdd(scope.row)">
              <el-icon :size="20">
                <Checked/>
              </el-icon>
            </el-button>
            <div v-else>
              <el-button type="primary" @click="editData(scope.row)">
                <el-icon :size="20">
                  <Edit/>
                </el-icon>
              </el-button>
              <el-button type="primary" @click="deleteData(scope.row,scope.$index)">
                <el-icon :size="20">
                  <Delete/>
                </el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>

      <el-button type="primary" @click="addData">添加数据</el-button>
    </div>


  </div>
</template>

<script setup lang="ts">

import {Checked} from "@element-plus/icons-vue";
import {Ref, ref} from "vue";
import FilterForm from "@/views/DataShow/components/FilterForm.vue";

interface InspectionChecklist {
  workType?: string; // 工作类型
  number?: string; //编号
  startTime?: string; //发生时间
  workerName?: string; // 工作人签字
  content?: string; //内容描述
  sceneSituation?: string; //现场情况
  remarks?: string; // 备注
  edit?: boolean; //编辑编辑状态
}

interface ChecklistConditions {
  workType?: string; // 工作类型
  workerName?: string; // 工作人
  filterTime?: string; //过滤时间
}


//查询条件
const conditions: Ref<ChecklistConditions> = ref({
  workType: '',
  workerName: '',
  filterTime: '',
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
const workTypeOptions = [
  {
    value: '0',
    label: '请选择'
  },
  {
    value: '1',
    label: '选项1'
  },
  {
    value: '2',
    label: '选项2'
  },
  {
    value: '3',
    label: '选项3'
  },
  {
    value: '4',
    label: '选项4'
  },
]

// 默认数据
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

//表单提交
const handleConfirm = () => {
  console.log(conditions)
}

//table数据
const tableData: Ref<Array<InspectionChecklist>> = ref([]);

//添加
const addData = () => {
  tableData.value.push({
    edit: true,
  });
  console.log('添加数据触发', tableData.value)

}


//确认添加
const confirmAdd = (row: InspectionChecklist) => {
  //对数据进行计算
  row.edit = false;
}

//修改
const editData = (row: InspectionChecklist) => {
  // 对数据重新计算
  row.edit = true;
}

//删除
const deleteData = (row: InspectionChecklist, index: number) => {
  tableData.value.splice(index, 1);
}

//提交数据
const submitData = () => {
  alert(JSON.stringify(tableData.value))
}


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
}

</style>
