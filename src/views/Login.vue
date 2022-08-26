<template>
  <div id="login">
    <div class="box">
      <el-form  label-width="50px" :rules="rules" ref="form">
        <h3>影院售票管理系统</h3>
        <el-form-item label="用户">
          <el-input v-model="form.name" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="form.pwad" show-password></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button @click="kong">重置</el-button>
          <el-button type="primary" size="medium" @click="getdata">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  data() {
    return {
      data: null,
      form: {
        name: "",
        pwad: "",
      },
      rules: {
        // 定义表单的验证规则
        name: [
          { required: true, message: "账号必填", trigger: "blur" },
          {
            pattern: /^\w{3,10}$/,
            message: "账号不正确",
            trigger: "blur",
          },
        ],
        pwad: [
          { required: true, message: "密码必填", trigger: "blur" },
          { pattern: /^\w{3,10}$/, message: "密码格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    kong() {
      (this.form.name = ""), (this.form.pwad = "");
    },
    getdata() {
      this.axios
        .post("/login", { name: this.form.name, password: this.form.pwad })
        .then((res) => {
          this.data = res.data;
          // console.log(res);
          let tokens = res.data.token;
          if (this.data.success_code == 200) {
            screenfull.exit();
            this.$message.success("登录成功");
            this.$router.push("/welcome");
            this.$store.dispatch("userData", res.data.data);
            // 储存token
            sessionStorage.setItem("token",JSON.stringify(tokens));
            
          } else if(res.data.code == 401){
            return this.$message.error("token失效");
          }else {
            this.$message.error("登录失败");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url('../assets/bg_admin.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #fff;
}
.box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, .8);
  justify-content: center;
  display: flex;
  align-items: center;
  flex-flow: column;
  border-radius: 4px;
  box-shadow: 0 0 8px 8px #ccc;
}
h3 {
  margin-bottom: 40px;
  font-size: 36px;
  letter-spacing: 2px;
  color: #888;
  text-align: center
}
</style>