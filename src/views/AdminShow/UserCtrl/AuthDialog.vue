<template>
  <el-dialog v-model="vis" :show-close="false" width="500">
    <template #header>
      <div class="my-header">
        授权管理
      </div>
    </template>
    <div style="min-height: 300px">
      <el-form>
        <el-form-item label="用户名">
          {{user.username}}
        </el-form-item>
<!--        <el-form-item label="权限">-->
<!--          <el-tag-->
<!--              style="margin-right: 6px"-->
<!--              v-for="tag in tags"-->
<!--              :key="tag"-->
<!--              closable-->
<!--              :disable-transitions="false"-->
<!--              @close="handleTagClose(tag)"-->
<!--          >-->
<!--            {{ tag }}-->
<!--          </el-tag>-->
<!--          <el-button class="button-new-tag" size="small" @click="addAuth">-->
<!--            + New Tag-->
<!--          </el-button>-->
<!--        </el-form-item>-->
        <el-form-item label="权限">
          <el-cascader v-model="selectData" :rows="2" :props="optionProps" :options="options" :show-all-levels="false" />
        </el-form-item>
        <el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button type="primary" @click="confirmHandle">确认</el-button>
        <el-button type="primary" @click="cancelHandle">重置</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {authToUser, getCompanySearch} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
import {getCSOption} from "@/utils/findDataUtils.ts";

type Prop = {
  visible: boolean,
  user?: any,
}

const props = defineProps<Prop>()

const emits = defineEmits(['update:visible', 'success'])

const form = ref({
  userId: '',
  stationIds: []
})

const optionProps = { multiple: true }

const options = ref([])
// 获取选项列表
const getOptions = async () => {
  const res:any = await getCompanySearch()
  const optionArr = res.data.map(item => {
    const childArr = (item?.stations || []).map(citem => {
      return {
        value: citem.id,
        label: citem.name
      }
    })
    return {
      value: item.id,
      label: item.name,
      children: childArr
    }
  })
  options.value = optionArr
}
getOptions()

const selectData = ref([])
// 经停selectData数据变化为form赋值
watch(selectData, (newValue, oldValue)=>{
  const sTemp = []
  // form.value = selectData.value.map()
  selectData.value.forEach(item => {
    if(item[1]){
      sTemp.push(item[1])
    }
  })
  form.value.stationIds = sTemp
})

watch(props,async ()=>{
  // console.log('user变化了', props.user)
  if(props?.user?.id && props.visible ){
    form.value.userId=props.user.id;
    // 当这个数据为空的时候
    if(!options.value.length){
      await getOptions();
      // ElMessage.warning('网络缓慢,请稍后再试')
    }
    const stations = props.user.permission.stationIds
    selectData.value = getCSOption(stations, options.value)
  }


})

const tags = ref(['kakxi', 'kakdong'])

const vis = computed({
  get(){
    return props.visible;
  },
  set(){
    emits('update:visible', false)
  }
})


const cancelHandle = () => {
  emits('update:visible')
}

const confirmHandle = async () => {
  const res:any = await authToUser(form.value)
  if(res.code == 200){
    ElMessage.success('修改成功')
    emits('update:visible', false)
    emits('success')
  }

}

// 标签删除
const handleTagClose = (tag: string) => {
  tags.value = tags.value.filter((item) => item != tag)
}

const addAuth = () => {

}

</script>

<style scoped>

</style>
