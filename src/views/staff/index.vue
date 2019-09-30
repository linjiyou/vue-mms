<template>
  <div>
    <el-form
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      ref="ruleForm"
      style="margin-top:20px"
    >
      <el-form-item prop="username">
        <el-input v-model="searchMap.username" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fentchDate">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="staffList" border style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="账号" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="salary" label="工资"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 120]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="pojo"
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width:400px;"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="pojo.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="pojo.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="工资" prop="salary">
          <el-input v-model="pojo.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            value-format="yyy-MM-dd"
            v-model="pojo.entryDate"
            type="date"
            placeholder="出生日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id?updateDate():addDate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入获取数据接口
import staffAPI from "../../API/staff";
export default {
  data() {
    return {
      staffList: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {
        username: "",
        name: ""
      },
      dialogFormVisible: false,
      pojo: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.fentchDate();
  },
  methods: {
    //绑定数据到页面
    fentchDate() {
      let { currentPage, pageSize, searchMap } = this;
      staffAPI.search(currentPage, pageSize, searchMap).then(response => {
        const resp = response.data.data;
        this.staffList = resp.rows;
        this.total = resp.total;
      });
    },
    handleEdit(id) {
      staffAPI.getById(id).then(response=>{
          const resp=response.data
          this.pojo=resp.data
          this.handleAdd()
      })
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
       })
        .then(() => {
          staffAPI.delete(id).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fentchDate();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "errow",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields()
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fentchDate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fentchDate();
    },
    addDate(){
      this.$refs['pojoForm'].validate(vaild=>{
          if(vaild){
           staffAPI.add(this.pojo).then(response=>{
               const resp=response.data
                this.dialogFormVisible=false
               if(resp.flag){
                   this.fentchDate()
                   this.$message({
                       message:resp.message,
                       type:'success'
                   })
               }else{
                   this.$message({
                       message:resp.message,
                       type:'wraning'
                   })
               }
           })
          }else{
              return false
          }
      })  
    },
    updateDate(){
      this.$refs['pojoForm'].validate(vaild=>{
          if(vaild){
          staffAPI.update(this.pojo).then(response=>{
              console.log(1)
              const resp=response.data
              this.dialogFormVisible=false
              if(resp.flag){
              
               this.fentchDate()
               this.$message({
                   message:resp.message,
                   type:'success'
               })
              }else{
                  this.$message({
                      message:resp.message,
                      type:'wraning'
                  })
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