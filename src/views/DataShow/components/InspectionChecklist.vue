<template>
  <div class="inspection-checklist">
    <el-form label-width="100" title="检巡单">
      <el-form-item label="工作类型">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="编号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="工作人">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="发生时间">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label-width="100"  label="内容描述">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="现场情况">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="100"  label="备注">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>


      <el-form-item label-width="100">
        <el-button>上传附件</el-button>
        <el-button>提交</el-button>
      </el-form-item>


    </el-form>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .inspection-checklist{
    width: 600px;
  }
</style>
