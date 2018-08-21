<template>
  <div class="orderTriage">
    <div class="function">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入订单名称"
              icon="search"
              v-model="input">
            </el-input>
          </div>
        </el-col>
        <!--
        <el-col :span="20">
          <el-button type="primary" @click.native="onNewClick">添加类型</el-button>
        </el-col>
        -->
      </el-row>
    </div>
     <div id="table">
       <el-table
        :data="filtertableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="publish"
          label="下单日期"
         >
        </el-table-column>
        <el-table-column
          prop="endtime"
          label="归还日期">
        </el-table-column>

        <el-table-column
          :context="_self"
          inline-template
          label="操作">
          <span>
            <el-button type="text" size="small" @click="onEditClick($index)">查看</el-button>
            <el-button type="text" size="small" @click="onDelClick($index)">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="dialogTitle" v-model="isDialogShow" size="small">
      <el-form :model="this.form">
       <el-form-item label="商品名称" :label-width="formLabelWidth">
         <el-input v-model="form.goodsName" auto-complete="off" ></el-input>
       </el-form-item>
       <el-form-item label="订单号" :label-width="formLabelWidth">
        <el-input v-model="form.id"></el-input>
       </el-form-item>
       <el-form-item label="商品介绍" :label-width="formLabelWidth">
         <el-input type="textarea" v-model="form.information" auto-complete="off" ></el-input>
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
        <el-button type="primary" @click="onEnsureclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableData from '../../mock/orderTriage.js';
  export default {
    data(){
      return {
       input: '',//搜索输入的内容
       dialogTitle: '',//点击添加商品按钮后后出现在左上角的名称
       isDialogShow: false,//样式判定
        tableData: tableData,//商品属性栏目
       form:{
         goodsName: '',//商品名称
         types: '',//商品类型
         id:'',//商品价格
         information:''
        },
        formLabelWidth:'120px'
      }
    },
    computed:{
      filtertableData(){
         var tableData_array=this.tableData
        var input=this.input
        if(!input){
          return tableData_array
        }
        input=input.trim()
        tableData_array=tableData_array.filter(function(item){
          if(item.goodsName==input||item.publish==input)
          {
            return item
          }
        })
        return tableData_array
      }
      
    },
    methods:{
      onEditClick(index){
        const form=this.form
        const tableData=this.tableData
        form.goodsName=tableData[index].goodsName
        form.id=tableData[index].id
        form.information=tableData[index].information
        form.types=tableData[index].types
        this.dialogTitle = "查看"
        this.isDialogShow = true
      },
      onDelClick(index){
         this.$confirm('此操作将永久删除该文件,是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.tableData.splice(index,1)
          this.$message({
            type:'success',
            message:'删除成功'
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      },
      onEnsureclick(){
        this.isDialogShow=false
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