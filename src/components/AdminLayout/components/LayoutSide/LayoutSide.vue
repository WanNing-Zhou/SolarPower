<template>
  <div class="side-layout">
    <el-menu     background-color="#0B2D4D"
                 text-color="#ffffff"
                 active-text-color="#ffd04b"
                 :default-active="data[0].label"
                 @open="handleOpen"
                 @close="handleClose">

      <template v-for="cItem in data">
        <el-menu-item :index="cItem.label">

          <el-icon><component  v-if="cItem.icon" :is="cItem.icon"></component></el-icon>
          <router-link style="width: 100%" class="menu-item" :to="'/admin/' + cItem.to + '/'">{{cItem.label}}</router-link>
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
    label: '用户管理',
    to: 'user-ctrl',
    icon: 'UserFilled'
  },
  // {
  //   label: '创建用户',
  //   to: 'create-user',
  //   icon: 'Plus'
  // },

  {
    label: '公司管理',
    to: 'company-ctrl',
    icon: 'OfficeBuilding'
  },
  {
    label: '电站管理',
    to: 'point-ctrl',
    icon: 'Place'
  },
]




const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}

</script>

<style lang="scss" scoped>
.side-layout {
  min-height: 500px;
  height: calc(100vh - 60px);
  //background-color: #f9f9f9;
  background-color: #0B2D4D;
  overflow-y: auto;


  :deep(.el-tree) {
    background-color: transparent;
    user-select: none;
  }

  :deep(.el-menu){
    background-color: #0B2D4D;

  }

  .menu-item {
    line-height: 40px;
    margin: 4px 0;
    width: 100%;
  }


}
</style>
