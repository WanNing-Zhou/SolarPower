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

      <template v-for="cItem in data">
        <el-menu-item :index="cItem.label">
          <router-link class="menu-item" :to="'/admin/' + cItem.to + '/'">{{cItem.label}}</router-link>
        </el-menu-item>
      </template>

    </el-menu>

  </div>
</template>

<script setup lang="ts">

import {useStore} from 'vuex'
const store = useStore()


const data = [
  // {
  //   label: '授权管理',
  //   to: 'auth-ctrl'
  // },
  {
    label: '创建用户',
    to: 'create-user',
  },
  {
    label: '用户管理',
    to: 'user-ctrl',
  },
  {
    label: '站点管理',
    to: 'point-ctrl'
  },
  {
    label: '公司管理',
    to: 'company-ctrl'
  }

]




const handleOpen = (key: string, keyPath: string[]) => {

  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  store.commit('setcompanyNumber',key)
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
    width: 100%;

  }


}
</style>
