<template>
  <el-dialog v-model="vis" :show-close="false" width="500">
    <template #header>
      <div class="my-header">
        授权管理
      </div>
    </template>
    <div>
      <el-form>
        <el-form-item label="用户名">
          某某某
        </el-form-item>
        <el-form-item label="地址">
          <el-tag
              v-for="tag in tags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-button v-else class="button-new-tag" size="small" @click="addAuth">
            + New Tag
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmHandle">确认</el-button>
          <el-button type="primary" @click="cancelHandle">重置</el-button>
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

const confirmHandle = () => {

}

// 标签删除
const handleTagClose = () => {

}

const addAuth = () => {

}

</script>

<style scoped>

</style>
