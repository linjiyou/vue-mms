<template>
  <nav class="navBox">
    <el-menu
      :router="true"
      default-active="/home"
      class="el-menu-vertical-demo"
    
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-menu-item index="/member/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
       <el-menu-item index="/supplier/">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
       <el-menu-item index="/goods/">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
       <el-menu-item index="/staff/">
        <i class="el-icon-user"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<style scoped>
 .el-menu{
      background-color:#dddddd; 

 }
</style>