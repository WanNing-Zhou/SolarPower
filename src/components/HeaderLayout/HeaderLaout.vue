<!--<template>-->
<!--  <div class="header">-->
<!--&lt;!&ndash;    <div class="title">陕西信惠翔新能源有限公司</div>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->

<!--</script>-->

<!--<style scoped>-->
<!-- .header{-->
<!--   background-image:url("/static/imgs/003.png") ;-->
<!--   background-size: cover;-->
<!--   height: 60px;-->
<!--   font-size: 24px;-->
<!--   line-height: 60px;-->
<!--   background-color: #409eff;-->
<!--   text-align: center;-->
<!-- }-->
<!--</style>-->

<template>
  <div class="header">
    <div class="left">分布式光伏电站发电异常管理系统</div>
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
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import UpdatePassword from "@/views/OptionShow/UpdatePassword.vue";
const router = useRouter()
const optionShow = ref(false)

const updateVis = ref(false)

const updateHandle = () => {
  // router.push('/update-password')
  updateVis.value = true
}


const logoutHandle  = async () => {
  const res:any = await logoutHandle()
  if(res.code == 200){
    ElMessage.success('登出成功')
  }
}

</script>

<style lang="scss" scoped>

.header{

  //font-size: 20px;
  line-height: 40px;
  text-align: center;
  background-color: #018CB6;
  color: #ffffff;
  height: 40px;
  position: relative;
  //box-shadow: #a8abb2 10px;
  box-shadow:1px 2px 2px rgba(51, 51, 51, 0.1);
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
    font-size: 14px;

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

