<template>
<el-form :inline="true" class="demo-form-inline">
  <el-form-item label="用户名">
    <el-input v-model="userName"  placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
   <el-input v-model="password" placeholder="请输入密码"  show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>

   <el-container id="main-view">
      <el-header class="header">
        用户信息
      </el-header>
    <el-main>
      {{userInfo.name}} <br/>
      {{userInfo.email}}
    </el-main>

   </el-container>
</el-form>


</template>

<script>
import http from '../plugins/http.js'
import jwt_decode from "jwt-decode";

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password:'',
      userInfo:{}
    }
  },
  props: {
    msg: String
  },

  methods:{
    onSubmit(){
     var tokenUrl="http://localhost:5000/api/Authorize/token";
     var loginData={
       "UserName":this.userName,
       "Password":this.password
     };
      http.post(tokenUrl,loginData).then(res=>{
        var token=res.data;
        if(token!==""){
        localStorage.setItem("JWT_TOKEN",token);
        
        const decode = jwt_decode(token);
        console.log("decode:"+  JSON.stringify(decode));

        var userUrl="http://localhost:5000/api/user/getuserbyid/001";
        http.get(userUrl).then(res=>{
          console.log(res.data);
          this.userInfo=res.data;
        });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
