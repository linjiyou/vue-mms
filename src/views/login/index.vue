<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="el-from">
      <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" class="login">登录</el-button>
        <el-button type="primary" class="login" @click="cancelLogin">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, getUserInfo } from "@/API/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入有效账号", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码不少于6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //取消登录

    cancelLogin() {
      this.form.username = "";
      this.form.password = "";
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('Login',this.form).then(response=>{
            if(response.flag){
              this.$router.push('/')
            }else{
              this.$message({
                message:response.message,
                type:'wraning'
              })
            }
          })
          
         }else{
           return false
         }
      });
    }
  }
};
</script>
<style  scoped lang="scss">
.el-from {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 30px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/login.jpg);
  background-size: contain;
}
.login-title {
  text-align: center;
  color: black;
}
.login {
  margin-left: 34px;
}
</style>