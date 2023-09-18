<template>
  <div class="side-layout">
    <!--    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <div class="menu-item" @click="currentNodeId = node.id" :class="`${node.id == currentNodeId ? 'link-active' : ''}`">
          <router-link :to="'/datashow/'+data.label">{{ node.label }}</router-link>
        </div>
      </template>
    </el-tree>-->

    <el-menu default-active="C1" @open="handleOpen" @close="handleClose">
      <template v-for="item in data">
        <el-sub-menu :index="item.id">
          <template #title>
            <el-menu-item :index="item.id">
              <!--              <el-icon><location /></el-icon>-->
              <router-link class="menu-item" :to="'/datashow/' + item.id + '/' + item.label">{{ item.label }}</router-link>
            </el-menu-item>
          </template>

          <template v-for="cItem in item.children">
            <el-menu-item :index="cItem.id">
              <router-link class="menu-item" :to="'/datashow/' + cItem.id + '/' + cItem.label">{{ cItem.label }}</router-link>
            </el-menu-item>
          </template>

        </el-sub-menu>
      </template>


    </el-menu>

  </div>
</template>

<script setup lang="ts">

import {useStore} from 'vuex'
const store = useStore()
interface Tree {
  label: string
  id?: string
  children?: Tree[]
}


const data: Tree[] = [
  {
    label: '陕西信惠翔新能源有限公司',
    id: 'C001',
    children:
      [
        {
          label: '陕西中铁科技园区光伏电站',
          id: 'PV001',
        },
        {
          label: '神木富油科技能源有限公司',
          id: 'PV002',
        },
        {
          label: '西安京东亚一园站',
          id: 'PV003',
        },
      ]
  }
]




const handleOpen = (key: string, keyPath: string[]) => {


  store.commit('setcompanyNumber',key)
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.side-layout {
  min-height: 500px;
  height: calc(100vh - 80px);
  background-color: #f9f9f9;
  overflow-y: auto;


  :deep(.el-tree) {
    background-color: transparent;
    user-select: none;
  }


  .menu-item {
    line-height: 40px;
    margin: 4px 0;

  }


}
</style>
