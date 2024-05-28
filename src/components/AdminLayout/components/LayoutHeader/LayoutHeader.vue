<template>
  <div class="header">
    <div class="left">管理平台</div>
    <div class="right" @click="optionShow = !optionShow">
      <div>操作</div>
      <div v-if="optionShow"  class="option-box">
        <el-menu>
          <el-menu-item>修改密码</el-menu-item>
          <el-menu-item>登出</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
const optionShow = ref(false)

</script>

<style lang="scss" scoped>

.header{

  //font-size: 20px;
  line-height: 40px;
  text-align: center;
  background-color: #343a40;
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
