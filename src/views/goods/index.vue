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
        <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          readonly
          @click.native="dialogSupplierVisible=true"
          v-model="searchMap.supplierName"
          placeholder="供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchDate">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="goodsList" height="380" border style="width: 100%; ">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
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
      :page-size="sizePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
      <supplier :isDialog="true" @option-supplier="optionSupplier"></supplier>
    </el-dialog>
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="pojo"
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width:400px;"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="pojo.code"></el-input>
        </el-form-item>

        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="pojo.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="pojo.retailPrice" />
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice" />
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="pojo.storageNum" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="pojo.supplierName" readonly @click.native="editOptionSupplier" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <!-- <el-button type="primary" @click="addDate('pojoForm')">确 定</el-button> -->
        <el-button type="primary" @click="pojo.id===null ? addDate() : updateDate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import goodsAPI from "../../API/goods";
import Supplier from "../supplier";
export default {
  components: { Supplier },
  data() {
    return {
      goodsList: null,
      sizePage: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        name: "",
        code: "",
        supplierName: ""
      },
      dialogSupplierVisible: false,
      pojo: {
        id: null,
        name: "",
        code: "",
        spec: "",
        retailPrice: "0.0",
        purchasePrice: "0.0",
        storageNum: "0.0",
        supplierName: "",
        supplierId: null
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        retailPrice: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ]
      },
      isEdit: false
    };
  },
  created() {
    this.fetchDate();
  },
  methods: {
    fetchDate() {
      let { sizePage, currentPage, searchMap } = this;
      goodsAPI.search(currentPage, sizePage, searchMap).then(response => {
        const resp = response.data.data;
        this.goodsList = resp.rows;
        this.total = resp.total;
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
    handleEdit(id) {
      this.handleAdd();
      goodsAPI.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
       })
        .then(() => {
          goodsAPI.deleteDate(id).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchDate();
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
    optionSupplier(currentRow) {
      if (this.isEdit) {
        this.pojo.supplierName = currentRow.name;
        this.pojo.supplierId = currentRow.id;
      } else {
        this.searchMap.supplierName = currentRow.name;
        this.searchMap.supplierId = currentRow.id;
      }
      this.isEdit = false;
      this.dialogSupplierVisible = false;
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    addDate() {
      this.$refs["pojoForm"].validate(valid => {
        if (valid) {
          goodsAPI.add(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchDate();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "wraning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    editOptionSupplier() {
      console.log(1);

      this.isEdit = true;
      this.dialogSupplierVisible = true;
    },
    updateDate(){
       this.$refs['pojoForm'].validate(valid=>{
           
            if(valid){
                goodsAPI.update(this.pojo).then(response=>{
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
    }
  }
};
</script>