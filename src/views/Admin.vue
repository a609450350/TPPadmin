<template>
  <div class="component" v-if="data">
    <el-container>
        <el-header style="min-width: 1200px;padding-top:30px;background-color:rgb(254, 254, 254);height:120px;box-shadow:0px 15px 10px -15px rgba(0,0,0,0.5);">
          <div class="header">
            <div class="left">
                <i class="logo"  style="font-size: 10px;margin-right: 5px;"></i>
                <h1>淘气电影</h1>
            </div>
            <div class="right">
            <el-dropdown trigger="click" style="padding:15px 10px;font-size:20px;margin-left:12px">
              <span class="el-dropdown-link" style="color:#409eff;">
                admin
              <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown"  style="padding:15px;width:100px;">
                  <el-button type="text" @click="xiugai = true" style="margin:10px auto">修改密码</el-button>
                  <el-button type="text" @click="goLogin()" style="margin:10px auto">退出登录</el-button>
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </div>
          <el-dialog title="修改密码" :visible.sync="xiugai" width="30%" center>
            <!-- ------- -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <br><br>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <!-- ------- -->
            <span slot="footer" class="dialog-footer" style="padding-top:120px">
              <el-button @click="resetForm('ruleForm')" style="width:80px;height:30px">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width:80px;height:30px">确 定</el-button>
            </span>
          </el-dialog>
        </el-header>
      <div style="margin-top:30px">
      <el-container style="margin:0 10vw;">
        <el-aside class="box" style="text-algin:center;border: 1px solid #e9eaeb;width: 10%;min-width: 200px;">
            <el-menu router :default-active="$route.path" class="menu" text-color="#000" active-text-color="#fff">
                <el-menu-item :index='x.path' style="font-size:1.1em" v-for="(x) in data" :key="x.id">
                  <i :class="icon[x.id]" style="color:black"></i>
                  {{x.name}}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="content">
          <router-view  v-if="isRouterAlive"/>
        </el-main>
      </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      username:'',
      userId:'',
      isRouterAlive:true,
      xiugai: false,
      data:'',
      icon:{
        '1':'el-icon-user-solid',
        '2':'el-icon-s-flag',
        '3':'el-icon-video-camera-solid',
        '4':'el-icon-s-operation',
        '6':'el-icon-finished',
        '5':'el-icon-s-comment',
        '7':'el-icon-s-ticket',
        '8':'el-icon-s-order'

      },
      ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    reload(){
          this.isRouterAlive=false
          this.$nextTick(function(){
            this.isRouterAlive=true
          })
        },
      goLogin(){
        this.$router.push('/')
        this.$message.success("退出成功");
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let password	=this.ruleForm.pass
            let adminId=this.userId
            // console.log(password,adminId)
            this.axios.post('admin/updatePw',{password,adminId}).then(res=>{
              alert('success')
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.xiugai=false
      }
    },
  mounted () {
    this.axios.get('admin/list').then(res=>{
      this.data=res.data.data
    })
    let user=JSON.parse(localStorage.getItem('user'))
    this.username=user[0].name
    this.userId=user[0].admin_id
  },
};
</script>

<style lang="scss" scoped>
  *{
    margin:0;
    padding: 0;
  }
  .component{
    background-color:#eee;
    width: 100%;
    min-width: 1200px;
    height: 100vh;
  }
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header{
    margin-left: 200px;
    height: 100%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1450px;
  }
  .el-menu-item{
    background-color:rgb(254, 254, 254);
    color: white;
    padding-left: 0 !important;
  }
  .el-menu-item.is-active {
    color: #fff;
    background-color: #409eff;
  }
  .content {
  width: 90%;
  min-width: 1000px;
  height: 80vh;
  background-color: #fff;
  border: 1px solid #e9eaeb;
  border-left: none;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
}
  .logo{
    width: 3.5vw;
 height: 3.5vw;
 margin-right: .8vw;
 background-repeat: no-repeat;
 background-size: 100% 100%;
 background-image: url(//gw.alicdn.com/tfs/TB1mKkzl9zqK1RjSZFpXXakSXXa-50-50.svg);
}
  
</style>