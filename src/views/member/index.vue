 <template>
  <div>
    <el-form  ref="ruleForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top:20px">
      <el-form-item prop="cardNum" >
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="paytype" > 
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
          
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
         <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="memberList" height="380" border style="width: 100%; ">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType|payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50,150]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
  <el-form :model="pojo"
     :rules="rules"
    ref="pojoForm"
    label-width="100px"
    label-position="right"
    style="width:400px;"
  >
    <el-form-item label="会员卡号" prop="cardNum" >
      <el-input v-model="pojo.cardNum" ></el-input>
    </el-form-item>
    <el-form-item label="会员姓名" prop="name" >
       <el-input v-model="pojo.name" ></el-input>
    </el-form-item>
    <el-form-item label="会员生日" prop="brithday">
        <el-date-picker value-format="yyy-MM-dd" v-model="pojo.birthday" type="date" placeholder="出生日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
       <el-input v-model="pojo.phone" ></el-input>
    </el-form-item>
    <el-form-item label="开卡金额" prop="money">
       <el-input v-model="pojo.money" ></el-input>
    </el-form-item>
    <el-form-item label="可用积分" prop="integral">
       <el-input v-model="pojo.integral" ></el-input>
    </el-form-item>
    <el-form-item label="支付类型"  prop="payType" >
      <el-select v-model="pojo.payType" placeholder="支付类型" style="width:110px">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="会员地址" prop="address">
       <el-input v-model="pojo.address" type="textarea"
        :autosize="{minRows:2,maxRows:4}" placeholder="请输入地址"
       />

       
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible=false">取 消</el-button>
    <!-- <el-button type="primary" @click="addDate('pojoForm')" >确 定</el-button> -->
    <el-button type="primary" @click="pojo.id?updateDate(pojo):addDate('pojoForm')" >确 定</el-button>

  </div>
</el-dialog>
  </div>
</template>

<script>
import memberApi from "../../API/member";
//支付类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];

export default {
  data() {
    return {
      memberList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum:'',
        name:'',
        payType:'',
        birthday:''
      },
      payTypeOptions,
      pojo:{
        id:null,
        cardNum:'',
        name:'',
        birthday:'',
        phone:'',
        money:0,
        integral:0,
        payType:'',
        address:''
      },
      dialogFormVisible:false,
      //检验规则
      rules:{
       cardNum:[
         {required:true,message:'卡号不能为空',trigger:'blur'}
       ],
       name:[
          {required:true,message:'姓名不能为空',trigger:'blur'}
       ],
      
      payType:[
        { required: true, message: '请选择支付类型', trigger: 'change' }
        ], 
       
      }

    };
  },
  created() {
    this.getData();
  },

  methods: {
    addDate(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
            memberApi.add(this.pojo).then(response=>{
             console.log(response);
             
             const resp=response.data
             if(resp.flag){
               this.getData()
               this.dialogFormVisible=false
             }
           })      
        }else{
           this.$message({
             message:'',
             type:'warning'
           }) 
          return false
        }
      })
    },
    handleSizeChange(val){
       this.pageSize=val
       this.getData()
    },
    handleCurrentChange(val){
       this.currentPage=val
       this.getData()
    },
    getData() {
      let { currentPage, pageSize, searchMap } = this;
      memberApi
        .search(currentPage, pageSize, searchMap)
        .then(response => {
          const resp = response.data;
         // console.log(response)
          this.memberList = resp.data.rows;
          this.total = resp.data.total;
         
          

          // console.log(this.memberList);
        });
    },
    handleEdit(id) {
      console.log(id);
      this.dialogFormVisible=true
      memberApi.getById(id).then(response=>{
        const resp=response.data
            this.pojo=resp.data
      })
    },
    updateDate(pojo){
      
       this.$refs['pojoForm'].validate(valid=>{
         if(valid){
         memberApi.update(pojo).then(response=>{
            const resp=response.data
              if(resp.flag){
                this.getData();
                this.dialogFormVisible=false;
              }else{
                this.$message({
                  message:resp.message,
                  type:'wraning'
                })
                return false
              } 
              
             })
             }
       })
  
    },
    handleDelete(id) {
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).then(() => {
           memberApi.deleteDate(id).then(response=>{
             const resp=response.data
              if(resp.flag){
              this.getData()
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
    resetForm(ruleForm){
        this.$refs[ruleForm].resetFields();
      
    },
    handleAdd(){
      this.dialogFormVisible=true
      // 异步解决表单重置问题
      this.$nextTick(()=>{
       this.$refs['pojoForm'].resetFields()
      })
    }

  },

  filters: {
    payTypeFilter(type) {
      const obj = payTypeOptions.find(obj => obj.type == type);
      return obj ? obj.name : null;
    }
  }
};
</script>
