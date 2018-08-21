<!-- 用户管理组件 -->
<template>
  <div class="userList">
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
      </el-row>
     </div>
   <div id="table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="账户"
         >
        </el-table-column>
        <el-table-column
          prop="school"
          label="学校"
          >
        </el-table-column>
        <el-table-column
          prop="customer_id"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="hometown"
          label="地址"
          >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
         >
        </el-table-column>
        <el-table-column
          :context="_self"
          inline-template
          label="操作">
          <span>
            <el-button @click="onEditClick($index)" type="text" size="small">查看</el-button>
            <el-button @click="onDelClick($index)" type="text" size="small">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
   </div>
 
   <el-dialog :title="dialogTitle" v-model="isDialogShow" size="small" class="form">
      <el-form :model="this.form">
       <el-form-item label="账户" :label-width="formLabelWidth">
         <span>{{form.name}}</span>
       </el-form-item>
       <el-form-item label="院系" :label-width="formLabelWidth">
        <span>{{form.department}}</span>
       </el-form-item>
       <el-form-item label="性别" :label-width="formLabelWidth">
         <input type="radio" value="1" v-model="form.sex">男
         <input type="radio" value="0" v-model="form.sex">女
       </el-form-item>
       <el-form-item label="生日" :label-width="formLabelWidth">
        <span>{{form.birthday}}</span>
       </el-form-item>
       <el-form-item label="入学时间" :label-width="formLabelWidth">
         <span>{{form.time_enrolment}}</span>
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
import Nothing from "../common/Nothing.vue";
import tableData from "../../mock/userList.js";
export default {
  data() {
    return {
      tableData: tableData,
      dialogTitle: "",
      isDialogShow: false,
      form: {
        name: "",
        birthday: "",
        department: "",
        classNum: "",
        sex: "",
        time_enrolment: "",
        pImage: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    Nothing
  },
  methods: {
    onEditClick(index) {
      const form = this.form;
      const tableData = this.tableData;
      form.name = tableData[index].name;
      form.department = tableData[index].department;
      form.sex = tableData[index].sex;
      form.birthday = tableData[index].birthday;
      form.time_enrolment = tableData[index].time_enrolment;
      this.dialogTitle = "查看";
      this.isDialogShow = true;
    },
    onDelClick(index) {
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
      console.log("点击了");

      this.dialogTitle = "添加商品";
      this.isDialogShow = true;
    },
    onEnsureclick() {
      console.log("点击了");
      console.log(this.form.goodsName);
      this.isDialogShow = false;
    }
  }
};
</script>


<style>
#table {
  text-align: left;
}

</style>
