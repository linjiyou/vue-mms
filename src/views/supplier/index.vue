<template>
  <div>
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top:20px"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="!isDialog">
        <el-input  v-model="searchMap.code" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName" v-if="!isDialog">
        <el-input v-model="searchMap.supplierName" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="fetchDate">查询</el-button>
        <el-button type="primary" v-if="!isDialog" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('ruleForm')" v-if="!isDialog">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :highlight-current-row="isDialog" @current-change="clickCurrentChange"
    :data="supplierList" height="380" border style="width: 100%; ">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" v-if="!isDialog"></el-table-column>
      <el-table-column prop="remark" label="备注" v-if="!isDialog"></el-table-column>
      <el-table-column label="操作" width="150" v-if="!isDialog">
        <template slot-scope="scope" >
          <el-button size="mini" @click="handleEdit(scope.row.id)" >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50,150]"
      :page-size="sizePage"
      :layout="!isDialog ?'total, sizes, prev, pager, next, jumper':'prev,pager,next'"
      :total="total"
    ></el-pagination>
    <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="pojo"
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width:400px;"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman" >
          <el-input v-model="pojo.linkman"></el-input>
        </el-form-item>
        
       
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="pojo.remark"
            type="textarea"
            :autosize="{minRows:2,maxRows:4}"
            placeholder="请输入详细信息"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <!-- <el-button type="primary" @click="addDate('pojoForm')" >确 定</el-button> -->
        <el-button type="primary" @click="pojo.id===null ?addDate():updateDate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import supplierAPI from "../../API/supplier";
export default {
  props:{
   isDialog:Boolean
  },
  data() {
    return {
      supplierList: null,
      sizePage: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        name: "",
        linkman: "",
        mobile: ""
      },
      dialogFormVisible:false,
      pojo:{
          id:null,
          name:'',
          linkman:'',
          mobile:'',
          remark:''
      },
      rules:{
       name:[
           {required:true,message:'供应商名称不能为空',trigger:'blur'}
       ],
       linkman:[
           {required:true,message:'供应商名称不能为空',trigger:'blur'}
       ]
      }
    };
  },
  created() {
    this.fetchDate();
  },
  methods: {
    fetchDate() {
      let { sizePage, currentPage, searchMap } = this;
      supplierAPI.search(currentPage, sizePage, searchMap).then(response => {
        const resp = response.data.data;
        this.supplierList = resp.rows;
        this.total = resp.total;
      });
    },
    handleEdit(id) {
     this.handleAdd()
     supplierAPI.getById(id).then(response=>{
         const resp=response.data
         if(resp.flag){
             this.pojo=resp.data
         }
     })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).then(() => {
           supplierAPI.deleteDate(id).then(response=>{
             const resp=response.data
              if(resp.flag){
              this.fetchDate()
              this.$message({
              type: 'success',
              message: '删除成功!'
            })
              }else{
              this.$message({
              type: 'errow',
              message: '删除失败!'
            })
              }
           })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    
    handleSizeChange(val) {
      this.sizePage = val;
      this.fetchDate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchDate();
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    handleAdd(){
      this.dialogFormVisible=true
      this.$nextTick(()=>{
        this.$refs['pojoForm'].resetFields()  
      })
      
    },
    addDate(){
        this.$refs['pojoForm'].validate(valid=>{
            if(valid){
                supplierAPI.add(this.pojo).then(response=>{
                  const resp=response.data
                  if(resp.flag){
                    this.fetchDate()
                    this.dialogFormVisible=false

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
         console.log(1)
        this.$refs['pojoForm'].validate(valid=>{
           
            if(valid){
                supplierAPI.update(this.pojo).then(response=>{
                    const resp=response.data
                    if(resp.flag){
                        this.fetchDate()
                        this.dialogFormVisible=false
                        
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
    clickCurrentChange(currentRow,oldCurrentRow){
      
       this.$emit('option-supplier',currentRow)
    }
  }
};
</script>