<template>
  <div class="side-layout">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <router-link :to="'/datashow/'+data.label">{{ node.label }}</router-link>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">

interface Tree {
  label: string
  id?: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '陕西信惠翔新能源有限公司',
    id: 'C1',
    children:
        [
          {
            label: '陕西中铁科技园区光伏电站',
            id: 'N1-T1',
          },
          {
            label: '神木富油科技能源有限公司',
            id: 'N10-T1',
          },
          {
            label: '  西安京东亚一园站',
            id: 'N2-T1',
          },
        ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label',
}


</script>

<style lang="scss" scoped>
.side-layout {
  min-height: 500px;
  height: calc(100vh - 80px);
  background-color: #f9f9f9;
  overflow-y: auto;

  .el-tree {
    background-color: transparent;
    user-select: none;
  }

}
</style>
