<template>
  <div class="side-layout">
    <!--    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <template #default="{ node, data }">
        <div class="menu-item" @click="currentNodeId = node.id" :class="`${node.id == currentNodeId ? 'link-active' : ''}`">
          <router-link :to="'/datashow/'+data.label">{{ node.label }}</router-link>
        </div>
      </template>
    </el-tree>-->

    <el-menu
        ref="menuRef"
        :collapse="false"
        background-color="#0B2D4D"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        @open="handleOpen"
        @close="handleClose"
        :default-active="defaultActive"
    >
      <template v-for="item in data">
        <el-sub-menu :index="'comp_' + item.id">
          <template #title>
            <el-menu-item :index="'comp_'+item.id">
<!--                            <el-icon><location /></el-icon>-->
              <el-icon><OfficeBuilding /></el-icon>
<!--              <router-link class="menu-item" :to="'/datashow/' + item.id + '/' + item.label">{{ item.label }}</router-link>-->
                  <div>{{item.label}}</div>
            </el-menu-item>
          </template>

          <template v-for="cItem in item.children">
            <el-menu-item :index="'point_'+cItem.id">
              <el-icon><Place/></el-icon>
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
import {getUserInfo} from "@/api/user.ts";
import {computed, nextTick, onMounted, ref} from "vue";
import {getCSArray} from "@/utils/findDataUtils.ts";
import {getCompanySearch} from "@/api/suer.ts";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
const store = useStore()
interface Tree {
  label: string
  id?: string
  children?: Tree[]
}
const menuRef = ref()

// const data: Tree[] = ref()[
//   {
//     label: '陕西信惠翔新能源有限公司',
//     id: 'C001',
//     children:
//       [
//         {
//           label: '陕西中铁科技园区光伏电站',
//           id: 'PV001',
//         },
//         {
//           label: '神木富油科技能源有限公司',
//           id: 'PV002',
//         },
//         {
//           label: '西安京东亚一园站',
//           id: 'PV003',
//         },
//       ]
//   },
//   {
//     label: '西安隆菲阳新能源有限公司',
//     id: 'C002',
//     children:
//       [
//         {
//           label: '西安菲尔特2.5MW光伏项目',
//           id: 'PV004',
//         }
//       ]
//   },
//   {
//     label: '三马架新能源有限公司',
//     id: 'C003',
//     children:
//       [
//         {
//           label: '望奎三马架发电站',
//           id: 'PV005',
//         }
//       ]
//   }
// ]

const data = ref([])

const defaultActive = computed(() => {
  if(data.value.length){
    return 'point_' + data.value[0].children[0].id
  }
  return null
})


const router = useRouter()
// 获取菜单信息
const getMenu = async () => {
  const res:any = await getUserInfo()
  const stations = res.data.permission.stationIds
  const csRes: any = await getCompanySearch()
  // 提取菜单数据
  let csArray = getCSArray(stations, csRes.data);
  data.value = csArray

  if(!csArray.length){
    ElMessage.warning('当前角色无访问权限,请联系管理员添加')
    return ;
  }

  nextTick(() => {
    const firstMenu = data.value[0].children[0];
    // 展开第一个子菜单
    menuRef.value.open('comp_'+ data.value[0].id)
    // 跳转到第一个菜单所在的目录
    router.replace('/datashow/' + firstMenu.id + '/' + firstMenu.label)
  })
}

onMounted(()=>{
  getMenu()
})




const handleOpen = (key: string, keyPath: string[]) => {

  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  store.commit('setcompanyNumber',key)
  // console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.side-layout {
  min-height: 500px;
  height: calc(100vh - 60px);
  //background-color: #f9f9f9;
  background-color: #0B2D4D;
  //background-color: #f9f9f9;
  overflow-y: auto;


  :deep(.el-tree) {
    background-color: transparent;
    user-select: none;
  }

   .el-menu {
     background-color: #0B2D4D;
    border-right: none;
  }
  .menu-item {
    line-height: 40px;
    margin: 4px 0;
    width: 100%;


  }


}
</style>
