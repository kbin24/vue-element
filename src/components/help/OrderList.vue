<template>
 <div class="orderList">
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
         <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="center" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.commodity.com_name }}</span>
                </el-form-item>
                <el-form-item label="类别名称">
                  <span>{{props.row.commodity.category.cate_name}}</span>
                </el-form-item>
                <el-form-item label="seller">
                  <span>{{ props.row.commodity.seller.customer_id }}</span>
                </el-form-item>
                <el-form-item label="customer">
                  <span>{{props.row.customer.customer_id}}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{props.row.commodity.bDate}}</span>
                </el-form-item>
                <el-form-item label="归还时间">
                  <span>{{props.row.commodity.rDate}}</span>
                </el-form-item>
                <el-form-item label="数量">
                  <span>{{props.row.commodity.count}}</span>
                </el-form-item>
                <el-form-item label="价格">
                  <span>{{props.row.commodity.price}}</span>
                </el-form-item>
                <el-form-item label="订单号">
                  <span>{{props.row.commodity.commodity_id}}</span>
                </el-form-item>
                <el-form-item label="商品介绍">
                  <span>{{props.row.commodity.description}}</span>
                </el-form-item>
              </el-form>
            </template>
      </el-table-column>
        <el-table-column
          prop="commodity.commodity_id"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="commodity.category.cate_name"
          label="类别"
          width=80px>
        </el-table-column>
        <el-table-column
          prop="commodity.seller.customer_id"
          label="seller"
         >
        </el-table-column>
        <el-table-column
          prop="customer.customer_id"
          label="customer">
        </el-table-column>
        <el-table-column
        prop="commodity.rDate"
        label="时间"
        >
        </el-table-column>
        <el-table-column
          :context="_self"
          inline-template
          label="操作">
          <span>
            <el-button type="text" size="small" @click="onEditClick($index)">编辑</el-button>
            <el-button type="text" size="small" @click="onDelClick($index)">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>

     <el-dialog :title="dialogTitle" v-model="isDialogShow" size="small">
      <el-form :model="this.form" :label-width="formLabelWidth">
       <el-form-item label="订单ID" :label-width="formLabelWidth">
         <el-input v-model="form.order_id" auto-complete="off" ></el-input>
       </el-form-item>
       <el-form-item label="用户ID" :label-width="formLabelWidth">
        <el-input v-model="form.customer_id"></el-input>
       </el-form-item>
       <el-form-item label="下单时间" :label-width="formLabelWidth">
         <el-date-picker type="date" v-model="form.order_time" style="width: 100%;"></el-date-picker>
       </el-form-item>
       <el-form-item label="当前订单状态" :label-width="formLabelWidth">
        <el-input v-model="form.state"></el-input>
       </el-form-item>
       <el-form-item label="商品ID">
         <el-input v-model="form.commodity_id"></el-input>
       </el-form-item>
       <el-form-item label="数量">
         <el-input v-model="form.count"></el-input>
       </el-form-item>
       <el-form-item label="总价格">
         <el-input v-model="form.total"></el-input>
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
import tableData from '../../mock/orderList.js';
  export default {
    data(){
      return {
        input: '',//搜索输入的内容
        dialogTitle: '',//点击添加商品按钮后后出现在左上角的名称
        isDialogShow: false,//样式判定
        tableData: tableData,//商品属性栏目
        form:{
        order_id: '',//订单ID
        customer_id: '',//用户ID
        order_time:'',//下单时间
        state:'',//订单当前状态
        commodity_id:'',//商品commodity_id
        count:'',//数量
        total:''//总价格
        },
        formLabelWidth: '120px'
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
          if(item.commodity.category.cate_name==input||item.commodity.category.cate_id==input)
          {
            return item
          }
        })
        return tableData_array
      }
    },
    methods:{
       onEditClick: function(index){
        const form=this.form
        const tableData=this.tableData
        form.order_id=tableData[index].order_id
        form.customer_id=tableData[index].customer.customer_id
        form.order_time=tableData[index].order_time
        form.state=tableData[index].state
        form.commodity_id=tableData[index].commodity.commodity_id
        form.count=tableData[index].commodity.count
        form.total=tableData[index].total
        this.dialogTitle = "查看"
        this.isDialogShow = true
       
      },
      onDelClick:function(index){
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
<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    /* width: 50%; */
  }
</style>