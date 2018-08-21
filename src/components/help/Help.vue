<template>
  <div id="help">
    <el-tabs :active-name="activeName">
      <el-tab-pane label="订单列表" name="first">
        <order-list></order-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Nothing from '../common/Nothing.vue';
  import OrderList from './OrderList.vue';
  import OrderTriage from './OrderTriage.vue';
  export default{
    data(){
      return {
          activeName: 'first'//绑定路径名
      }
    },
    components:{
      Nothing,
      OrderList,
      OrderTriage
    }
  }
</script>

<style>
  .el-tabs{
    width: 100%;
  }
</style>
