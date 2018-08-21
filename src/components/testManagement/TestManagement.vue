<template>
  <div id="testManagement">
    <el-tabs :active-name="activeName">
      <el-tab-pane label="商品列表" name="first">
        <test-project></test-project>
      </el-tab-pane>
      <el-tab-pane label="商品评论">
        <feedback></feedback>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Nothing from '../common/Nothing.vue'
  import TestProject from './TestProject.vue'
  import TestUser from './TestUser.vue'
  import Feedback from './Feedback.vue'
  export default{
    data(){
      return {
          activeName: 'first'//绑定路径名
      }
    },
    components:{
      Nothing,
      TestProject,//子组件 只能在这个组件中使用
      TestUser,
      Feedback
    }
  }
</script>

<style>
  .el-tabs{
    width: 100%;
  }
</style>
