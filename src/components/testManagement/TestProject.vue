<template>
  <div class="testProject">
    <div class="function">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-autocomplete
              placeholder="请输入商品名称"
              icon="search"
              v-model="input"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              suffix-icon="danger"
              >
            </el-autocomplete>
          </div>
        </el-col>
        <el-col :span="20">
          <!--
            .native 给自定义的组件添加原生事件
          -->
          <el-button type="danger" @click="handleDeleteClick">删除分类</el-button>
          <el-button type="primary" @click.native="onNewClick">添加分类</el-button>
          
        </el-col>
      </el-row>
     
    </div>
    <div id="table">
      <el-table
        :data="filtertableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="data.category.cate_id"
          label="商品号">
        </el-table-column>
        <el-table-column
          prop="data.seller_id"
          label="发布者"
          >
        </el-table-column>
        <el-table-column
          prop="data.category.cate_name"
          label="类别"
          >
        </el-table-column>
        <el-table-column
          prop="data.com_name"
          label="名称">
        </el-table-column>
        
        <el-table-column
          prop="data.rDate"
          label="发布时间"
         >
        </el-table-column>
        <el-table-column
          :context="_self"
          inline-template
          label="操作">
          <span>
            <el-button @click="onEditClick($index)" type="text" size="small">编辑</el-button>
            <el-button @click="onDelClick($index)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>

    <!--
      点击添加商品按钮后弹出来的界面
    -->
    <el-dialog :title="dialogTitle" v-model="isDialogShow" size="small">
       <el-form :model="this.form" :label-width="formLabelWidth">

        <el-form-item label="主人">
          <el-col :span="10">
            <el-input v-model="form.seller_id" ></el-input>
          </el-col>
         </el-form-item>
       <el-form-item label="名称" >
         <el-col :span="10">
         <el-input v-model="form.com_name" ></el-input>
         </el-col>
       </el-form-item>
      <el-form-item label="数量" >
         <el-col :span="10">
         <el-input v-model="form.count"></el-input>
         </el-col>
         <el-col :span="2" class="line">价格</el-col>
         <el-col :span="10"> 
           <el-input v-model="form.price"></el-input>
         </el-col>
       </el-form-item>
       <el-form-item label="发布日期" >
          <el-col :span="10">
            <el-date-picker type="date" v-model="form.bDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-time-picker type="fixed-time" v-model="form.bDate" placeholder="选择时间"  style="width: 100%;"></el-time-picker>
          </el-col>
       </el-form-item>
       
        <el-form-item label="类别" >
          <el-col :span="10">
            <el-select v-model="form.cate_name" >
              <el-option label="租赁" value="shanghai"></el-option>
              <el-option label="快递" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="4">是否删除</el-col>
          <el-col :span="10">
            <input type="radio" value="1" v-model="form.deleted">是
            <input type="radio" value="0" v-model="form.deleted">否
          </el-col>
       </el-form-item>
       <el-form-item label="介绍:" >
         <el-input type="textarea" v-model="form.description"></el-input>
       </el-form-item>
     </el-form>
       <div class="photo">
           <img src="../../assets/kebi.jpg" width="120px" height="120px"> 
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onEnsureclick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogTitle" v-model="isDialogShowAdd" size="small">
      <el-col :span="12">
        <el-input v-show="isAddShow" v-model="input1" :placeholder="holder" @keydown.enter.native="Addclick"></el-input>
        <el-input v-show="isDeleteShow" v-model="input1" :placeholder="holder" @keydown.enter.native="Deleteclick"></el-input>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button v-show="isAddShow" type="primary" @click="Addclick" >确 定</el-button>
        <el-button  v-show="isDeleteShow" type="primary" @click="Deleteclick">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//tableData就是表格里的数据
import tableData from "../../mock/testProject.js";
export default {
  data() {
    return {
      input: "", //搜索输入的内容
      dialogTitle: "", //点击添加商品按钮后后出现在左上角的名称
      isDialogShow: false, //样式判定
      tableData: tableData, //商品属性栏目
      restaurants: [], //类别数组,
      isDialogShowAdd: false,
      input1: "", //添加分类输入的类别
      data: [],
      holder: "", //placeholder文字
      isAddShow: false, //添加弹出框中的确定按钮的显示
      isDeleteShow: false, //删除弹框删除按钮显示判断
      form: {
        seller_id: "", //卖方id
        cate_id: "", //类别id
        cate_name: "", //类别
        count: "", //商品数量
        bDate: "", //发布日期
        rDate: "", //归还日期
        commodity_id: "", //商品id
        com_image: "", //商品图片
        deleted: "", //是否被删除
        price: "", //商品价格
        description: "" //商品描述
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    filtertableData() {
      var tableData_array = this.tableData;
      var input = this.input;
      if (!input) {
        return tableData_array;
      }
      input = input.trim();
      tableData_array = tableData_array.filter(function(item) {
        if (
          item.data.com_name == input ||
          item.data.category.cate_id == input ||
          item.data.category.cate_name == input
        ) {
          return item;
        }
      });
      return tableData_array;
    }
  },
  methods: {
    // 表格内编辑按钮点击实现
    onEditClick: function(index) {
      const form = this.form;
      const tableData = this.tableData;
      form.seller_id = tableData[index].data.seller_id;
      form.com_name = tableData[index].data.com_name;
      form.description = tableData[index].data.description;
      form.bDate = tableData[index].data.bDate;
      form.count = tableData[index].data.count;
      form.price = tableData[index].data.price;
      form.cate_name = tableData[index].data.category.cate_name;
      this.dialogTitle = "编辑";
      this.isDialogShow = true;
    },

    // 表格内删除按钮点击实现
    onDelClick: function(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 此处应为异步请求服务器进行数据库的操作
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onNewClick: function() {
      // console.log("点击了");
      this.dialogTitle = "添加分类";
      this.isDialogShowAdd = true;
      this.isAddShow = true;
    },
    //编辑内的确定按钮
    onEnsureclick() {
      this.isDialogShow = false;
    },
    //搜索框给出建议
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      //调用callback返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      // this.axios
      // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      // .then(response => (console.log(response)))
      // this.axios
      //   .get("http://119.23.216.28:8080/Erent/admin/AdminCategoryServlet?method=findAll"
      //   )
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      return this.data;
    },
    handleSelect(item) {
      console.log(item.value);
      // this.restaurants.splice(item,1)
    },
    Addclick() {
      // console.log("点击了添加按钮");

      var input1 = this.input1;
      this.data.push({ value: input1 });
      this.isDialogShowAdd = false;
      this.input1 = "";
      this.isAddShow = false;
      // this.axios
      //   .get("http://119.23.216.28:8080/Erent/admin/AdminCategoryServlet?method=add", {
      //     params: {
      //       cate_name: input1
      //     }
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },

    handleDeleteClick() {
      this.dialogTitle = "删除分类";
      this.isDialogShowAdd = true;
      this.isDeleteShow = true;
    },
    //弹出框的取消按钮
    handleCancel() {
      this.isDialogShowAdd = false;
      this.isAddShow = false;
      this.isDeleteShow = false;
    },
    //删除弹出框的删除按钮
    Deleteclick() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var input1 = this.input1;
          for (var i = 0; i < this.restaurants.length; i++) {
            if (input1 == this.restaurants[i].value) {
              this.restaurants.splice(i, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              break;
            }
          }
          this.input1 = "";
          this.isDialogShowAdd = false;
          this.isDeleteShow = false;
          // 此处应为异步请求服务器进行数据库的操作
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  watch: {
    dialogTitle: function() {
      if (this.dialogTitle === "添加分类") {
        this.holder = "请输入新的分类";
      } else {
        this.holder = "请输入要删除的分类";
      }
    }
  }
};
</script>

<style media="screen">
.function {
  margin-bottom: 10px;
}
.function button {
  float: right;
}
.photo {
  width: 120px;
  height: 120px;
  background-color: antiquewhite;
  position: absolute;
  right: 80px;
  top: 40px;
}
.line {
  text-align: center;
}
h3 {
  text-align: center;
}
</style>
