<template>


    <el-menu default-active="App/testManagement" class="el-menu-vertical-demo" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="/App/testManagement">商品</el-menu-item>
            <el-menu-item index="/App/help">订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/App/user">用户列表</el-menu-item>
              <el-menu-item index="/App/userGroup">用户意见</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>系统设置</template>
            <el-menu-item-group>
              <el-menu-item index="/App/testManagement">权限管理</el-menu-item>
              <el-menu-item index="/App/userGroup">数据备份</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

  </el-menu>




</template>
