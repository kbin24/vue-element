<template>
  <div class="login">
    <img src="./assets/logo.png">
       <h1>欢迎登陆</h1>
      账号:<input type="text" v-model="username"><br>
      密码:<input type="password" v-model="password" @keydown.enter="goTo"><br>
      <button @click="goTo">登陆</button>
      <button @click="clickRegiste">注册</button>

       <el-dialog :title="dialogTitle" v-model="isDialogShow" width="30%">
        <el-form :model="this.form" :label-width="formLabelWidth">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-col :span="12">
            <el-input v-model="form.studentId" placeholder="请输入学号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="学校">
            <el-col :span="12">
            <el-input v-model="form.studentId" placeholder="请输入学校"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机">
            <el-col :span="12">
            <el-input v-model="form.studentId" placeholder="请输入手机号码"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
          <el-button @click="isDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="isDialogShow=false">确 定</el-button>
      </span>
      </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      dialogTitle: "",
      isDialogShow: false,
      formLabelWidth: "120px",
      form: {
        studentId: "",
        schoolName: "",
        phone: ""
      }
    };
  },
  methods: {
    goTo() {
     
      if (this.username == "kbin" && this.password == 123) {
        this.$router.push({ path: "/App/home" });
      } 
      else if(this.username==''||this.password==''){
        alert('账号或密码为空')
      }
      else {
        alert("账号或密码错误");
      }
    },
    clickRegiste() {
      this.isDialogShow = true;
    }
  }
};
</script>
<style>
.login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.dialog{
  width: 200px;
  height: 300px;
  background-color: azure;
}
</style>