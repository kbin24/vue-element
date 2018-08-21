<template>
  <div class="testUser">
    <div class="function">
     
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入商品类型"
              icon="search"
              v-model="input">
            </el-input>
          </div>
        </el-col>
        <el-col :span="20">
          <!--
            .native 给自定义的组件添加原生事件
          -->
          <el-button type="primary" @click.native="onNewClick">添加类型</el-button>
        </el-col>
      </el-row>

    </div>
    <div id="table">
      <el-table
        :data="filtertableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="商品ID"
          width=80>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
         >
        </el-table-column>
        <el-table-column
          prop="types"
          label="商品类型">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
         >
        </el-table-column>
        <el-table-column
          prop="number"
          label="商品数量"
          >
        </el-table-column>
        <el-table-column
          prop="publish"
          label="发布时间"
         >
        </el-table-column>
        <el-table-column
          :context="_self"
          inline-template
          label="操作"
          width=120>
          <span>
            <el-button @click="onEditClick($index)" type="text" size="small">查看</el-button>
            <el-button @click="onDelClick($index)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>

    <!--
      点击添加商品按钮后弹出来的界面
    -->
    <el-dialog :title="dialogTitle" v-model="isDialogShow" size="small">
      <el-form :model="this.form">
       <el-form-item label="商品名称" :label-width="formLabelWidth">
         <!--
           <el-input></el-input>一个封装的可清除输入内容的输入框
         -->
         <el-input v-model="form.goodsName" auto-complete="off"></el-input>
       </el-form-item>
       <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.price" placeholder="请输入商品价格"></el-input>
       </el-form-item>
       <el-form-item label="商品介绍" :label-width="formLabelWidth">
         <el-input type="textarea" v-model="form.information" auto-complete="off" placeholder="请输入商品介绍"></el-input>
       </el-form-item>
       <el-form-item label="商品类型" :label-width="formLabelWidth">
         <el-select v-model="form.types" placeholder="请选择商品类型">
           <el-option label="类型一" value="shanghai"></el-option>
           <el-option label="类型二" value="beijing"></el-option>
         </el-select>
       </el-form-item>
     </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="isDialogShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //tableData就是表格里的数据
  import tableData from '../../mock/testUser.js'
  export default {
    data(){
      return {
        input: '',//搜索输入的内容
        dialogTitle: '',//点击添加商品按钮后后出现在左上角的名称
        isDialogShow: false,//样式判定
        tableData: tableData,//商品属性栏目
        form: {
         goodsName: '',//商品名称
         types: '',//商品类型
         price:'',//商品价格
         number:'',//商品数量
         information:''//商品介绍
       },
       formLabelWidth: '120px'
      }
    },
    //计算属性是基于它们的依赖进行缓存的，计算属性只有在它的相关依赖发生改变时才会重新求值，同时计算属性不是一个function
    //当我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算，此时我们可以使用计算属性
    //如搜索、多次点击事件中使
     computed:{
     filtertableData(){
        var tableData_array=this.tableData
        var input=this.input
        if(!input){
          return tableData_array
        }
        input=input.trim()
        tableData_array=tableData_array.filter(function(item){
          if(item.goodsName==input||item.types==input)
          {
            return item
          }
        })
        return tableData_array
      }
    },
    methods: {
      // 表格内编辑按钮点击实现
      onEditClick: function(index){
        const form=this.form
        const tableData=this.tableData
        form.goodsName=tableData[index].goodsName
        form.price=tableData[index].price
        form.information=tableData[index].information
        form.types=tableData[index].types
        this.dialogTitle = "查看"
        this.isDialogShow = true
        
      },

      // 表格内删除按钮点击实现
      onDelClick: function(index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 此处应为异步请求服务器进行数据库的操作
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onNewClick: function(){
        console.log('点击了')
        this.dialogTitle = "添加商品";
        this.isDialogShow = true;
      }
    }
  }
</script>

<style media="screen">
  .function{
    margin-bottom:10px;
  }
  .function button{
    float:right;
  }
</style>
