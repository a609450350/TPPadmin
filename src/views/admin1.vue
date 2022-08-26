<template>
  <div>
    <!-- 用户管理 -->
    <el-container>
      <el-main>
        <!-- 输入框 -->
        <el-input placeholder="请输入内容" v-model="uname" class="input">
          <el-button
            icon="el-icon-search"
            slot="append"
            @click="sousuo()"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          style="margin: 35px"
          @click="dialogUserVisible = true"
        >
          添加用户
        </el-button>

        <el-dialog
          title="添加用户"
          :visible.sync="dialogUserVisible"
          width="30%"
          close-on-press-escape
        >
          <el-form
            ref="f1"
            :model="user"
            :rules="rules"
            label-width="100px"
            style="width: 400px"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="user.name" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="性别" :label-width="userLabelWidth">
              <el-select
                v-model="user.sex"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option label="男" value="nan"></el-option>
                <el-option label="女" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="user.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="个人签名" prop="email">
              <el-input v-model="user.sign" placeholder="请输入个人签名" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserVisible = false">取消</el-button>
            <el-button type="primary" @click="UserInfo()">确定</el-button>
          </div>
        </el-dialog>
        <!-- 下方表格 -->
          <el-table :data="data" border style="width: 90%;margin-left:5%" size=medium>
            <el-table-column prop="user_id" label="用户ID" width="70px"></el-table-column>
            <el-table-column prop="user_name" label="用户名"></el-table-column>
            <el-table-column prop="sex" label="性别"  width="50px"></el-table-column>
            <el-table-column prop="phone" label="手机" ></el-table-column>
            <el-table-column prop="sign" label="个人签名"></el-table-column>
            <el-table-column label="操作" width="160px" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="bianji(scope.row.user_id)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row)">{{scope.row.status ? '冻结' : '解封'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- ------- -->
        <el-dialog
                  title="修改信息"
                  :visible.sync="dialogFormVisible"
                  width="30%"
                >
                 <el-form
            ref="f1"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="width: 400px"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="user.name" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="性别" :label-width="userLabelWidth">
              <el-select
                v-model="user.sex"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option label="男" value="nan"></el-option>
                <el-option label="女" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="user.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="个人签名" prop="email">
              <el-input v-model="user.sign" placeholder="请输入个人签名" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserVisible = false">取消</el-button>
            <el-button type="primary" @click="UserInfo()">确定</el-button>
          </div>
        </el-dialog>
        <!-- 分页符 -->
        <!--  @current-change='fy'  分页 相当监听器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
           :page-size="8"
          style="margin-top: 30px"
          @current-change="fy"
        >
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  // 发送请求从后台拿数据
  mounted() {
    let url = `admin/getCurrentPageUser?currentPage=1&pageSize=8&input=`;
    this.axios.get(url).then((res) => {
      this.data = res.data.data;
    });
    this.axios.get('admin/getCurrentUserall').then((res)=>{
      // console.log(res)
      this.total = res.data.total
    })
  },
  methods: {
    del(row){
      let userId=row.user_id
      let status= row.status ? '0' : '1'
      this.axios.post('index/banUser',{userId,status}).then(res=>{
        this.reload()
      })
    },
    // 搜索
    sousuo() {
      let uname = this.uname;
      this.axios
        .get(`admin/getCurrentPageUser?currentPage=1&pageSize=5&input=${uname}`)
        .then((res) => {
          this.data = res.data.data;
          this.total = res.total;
        });
    },
    // 编辑用户信息
    bianji(id) {
      this.dialogFormVisible = true;
      this.vid = id;
    },
    updateUserInfo() {
      let params = `userId=${this.vid}&userName=${this.form.name}&sex=${this.form.sex}&phone=${this.form.phone}&sign=${this.form.sign}`;
      this.axios.post("admin/updateUserInfo", params).then((res) => {
        this.dialogFormVisible = false;
      });
    },
    // 添加用户信息
    UserInfo() {
      let params = `userName=${this.user.name}&sex=${this.user.sex}&phone=${this.user.phone}&sign=${this.user.sign}`;
      this.axios.post("admin/addUserInfo", params).then((res) => {
        this.dialogFormVisible = false;
      });
    },
    // 分页
    fy(val) {
      // let url = `admin/getCurrentPageUser?currentPage=${val}&pageSize=5&input=`;
      // (this.data = this.data.splice(val - 1) * 3), val * 5;
      // this.axios.get(url).then((res) => {
      //   this.total = res.data.total;
      //   this.data = res.data.data;
      // });
      this.axios.get(`admin/getCurrentPageUser?currentPage=${val}&pageSize=8&input=`).then(res=>{
          this.data = res.data.data;
          this.total = res.data.totals;
      })
    },
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "账号必填", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "手机号必填", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "格式不正确", trigger: "blur" },
        ],
      },
      vid: "",
      data: [],
      uname: "",
      total: 0,
      dialogFormVisible: false,
      dialogUserVisible: false,
      user: {
        name: "", // 绑定账号
        phone: "", // 绑定手机号
        sign: "", // 绑定邮箱
      },
      userLabelWidth: "100px",
      form: {
        name: "",
        phone: "",
        sign: "",
      },
      formLabelWidth: "120px",
    };
  },
};
</script>
<style scoped>
.input {
  width: 40%;
  margin: 40px auto;
}
</style>
