<template>
  <header class="header">
    <a href="#/">
      <img src="@/assets/logo.png" alt width="25px" class="logo" />
      <span class="compony">公司管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{user.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a" icon="el-icon-edit">修改密码</el-dropdown-item>
        <el-dropdown-item command="b" icon="el-icon-s-fold">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="选择供应商" :visible.sync="dialogUserVisible" width="400px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width:300px"
      >
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model.number="ruleForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </header>
</template>
<script>
import { logout } from "../../API/login"
import passwordAPI from '../../API/password'
export default {
  data() {
    const validatePass = (rule,value,callback) => {
         passwordAPI.checkPwd(this.user.id,value).then(respone=>{
           const resp=respone.data
           if(resp.flag){
             callback()
           }else{
             callback(new Error(resp.message))
           }
         })
    };
    const validatecheckPass=(rule,value,callback) => {
         if(value!=this.ruleForm.newPass){
           callback(new Error("两次输入密码不一致"))
         }else{
           callback()
         }
    }
    return {
      // user: JSON.parse(localStorage.getItem("msm-user")),
      user:this.$store.state.user.user,
      ruleForm: {
        pass:'',
        newPass:'',
        checkPass:''
      },
      dialogUserVisible: false,
      rules: {
        pass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator:validatePass, trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator:validatecheckPass, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handlePwd();
          break;
        case "b":
          this.handleLogout();
          break;
      }
    },
    handleLogout() {
      this.$store.dispatch('Logout').then(response=>{
        if(response.flag){
          this.$router.push('/login')
        }else{
           this.$message({
              message: "退出失败，请网络好的时候尝试",
              type: "warning"
            });
        }
      })
      // logout(localStorage.getItem(localStorage.getItem("msm-token"))).then(
      //   respone => {
      //     const resp = respone.data;
      //     if (resp.flag) {
      //       localStorage.removeItem("msm-token");
      //       localStorage.removeItem("msm-user");
      //       this.$router.push("/login");
      //     } else {
      //       this.$message({
      //         message: "退出失败，请网络好的时候尝试",
      //         type: "warning"
      //       });
      //     }
      //   }
      // );
    },
    handlePwd() {
      this.dialogUserVisible = true;
      this.$nextTick(()=>{
        this.$refs['ruleForm'].resetFields()
      })
    },
    submitForm(){
      this.$refs['ruleForm'].validate(valid=>{
        if(valid){
          passwordAPI.updatePwd(this.user.id,this.ruleForm.checkPass)
          .then(response=>{
            const resp=response.data
            this.$message({
              message:resp.message,
              type:resp.flag?'success':'warning'
            })
            if(resp.flag){
              this.handleLogout()
              this.dialogUserVisible=false
            }
          })
        }else{
          return false
        }
      })
    }
  }
};
</script>
<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.compony {
  color: white;
  position: absolute;
  text-align: center;
}
.el-dropdown {
  position: absolute;
  right: 0;
  margin-right: 35px;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
</style>