<template>
  <div class="side-layout">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <router-link :to="'/datashow/'+data.id">{{ node.label }}</router-link>
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
    label: 'xxx公司',
    id: 'C1',
    children:
        [
          {
            label: 'N1-T1',
            id: 'N1-T1',
          },
          {
            label: 'N2-T1',
            id: 'N2-T2',
          },
          {
            label: 'N3-T1',
            id: 'N3-T1',
          },
          {
            label: 'N4-T1',
            id: 'N4--T1',
          },
          {
            label: 'N5--T1',
            id: 'N5--T1',
          },
          {
            label: 'N6-T1',
            id: 'N6-T1',
          },
          {
            label: 'N7-T1',
            id: 'N7-T1',
          },
          {
            label: 'N8-T1',
            id: 'N8-T1',
          },
          {
            label: 'N9-T1',
            id: 'N9-T1',
          },
          {
            label: 'N10-T1',
            id: 'N10-T1',
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
