<template>
  <div class="header">
    <div class="left">分布式光伏电站发电量检测管理系统后台</div>
    <div class="right" @click="optionShow = !optionShow">
      <div>操作</div>
      <div v-if="optionShow"  class="option-box">
        <el-menu>
          <el-menu-item><div @click="updateHandle">修改密码</div></el-menu-item>
          <el-menu-item><div @click="logoutHandle">登出</div></el-menu-item>
        </el-menu>
      </div>
    </div>
    <update-password v-model:visible="updateVis"></update-password>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import UpdatePassword from "@/views/OptionShow/UpdatePassword.vue";
import {logout} from "@/utils/logout.ts";
const router = useRouter()
const optionShow = ref(false)

const updateVis = ref(false)

const updateHandle = () => {
  // router.push('/update-password')
  updateVis.value = true
}

const logoutHandle  = async () => {
  // const res:any = await logoutHandle()
  // if(res.code == 200){
  //   ElMessage.success('登出成功')
  // }
  await logout()
}


</script>

<style lang="scss" scoped>

.header{

  //font-size: 20px;
  line-height: 40px;
  text-align: center;
  //background-color: #343a40;
  background-color: #018CB6;
  color: #ffffff;
  height: 40px;
  position: relative;
  //padding: 0 10px;
  .left{
    position: absolute;
    left: 10px;
    font-size: 18px;
  }
  .right {
    position: absolute;
    right: 10px;
    user-select: none;
    z-index: 10;

    .option-box{
      border-radius: 4px;
      position: absolute;
      top: 50px;
      right: 0;
       border: 1px solid #ced4da;
    }
  }
}

</style>
