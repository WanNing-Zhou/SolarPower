<template>
  <el-dialog v-model="vis" :show-close="false" width="500">
    <template #header>
      <div class="my-header">
        {{company ? '公司编辑' : '公司添加'}}
      </div>
    </template>
    <div>
      <el-form>
        <el-form-item label="公司">
          <el-input/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input/>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input/>
        </el-form-item>
        <el-form-item label="负责人电话">
          <el-input/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmHandle">提交</el-button>
          <el-button type="primary" @click="cancelHandle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

type Prop = {
  visible: boolean,
  company?: string,
}

const props = defineProps<Prop>()

const emits = defineEmits(['update:visible'])

const form = ref({
  companyName: ''
})

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

const confirmHandle = () => {

}

</script>

<style scoped>

</style>
