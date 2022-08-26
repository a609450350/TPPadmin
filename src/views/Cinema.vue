<template>
  <div>
    <el-container>
      <el-main>
          <el-input placeholder="请输入内容" style="width: 40%;margin:40px auto" class="input" v-model="input">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="ssk"
            ></el-button>
          </el-input>
          <el-button type="primary" style="margin: 35px" @click="dialogFormVisible1 = true">添加影院</el-button>
            <!-- 添加影院 -->
            <el-dialog title="添加影院" :visible.sync="dialogFormVisible1">
            <el-form :model="form" :rules="rules"   style="margin-left:10%;margin-top:50px">
                <el-form-item label="影院名" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" style="width:80%" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                  <el-input v-model="form.phone" style="width:80%" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="dizhi">
                  <el-input v-model="form.dizhi" style="width:80%" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button style="width:80px;height:40px;margin-left:70%" @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="tianjia()">确 定</el-button>
            </div>
            </el-dialog>
          <!-- ----- -->
          <el-table
            border
            :data="data"
            style="width: 90%;margin-left:5%"
            size="medium"
          >
            <el-table-column
              align="center"
              prop="cinema_id"
              label="ID"
              width="70"
            >
            </el-table-column>
            <el-table-column prop="cinema_name" label="影院名" width="250">
            </el-table-column>
            <el-table-column prop="cinema_phone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="specified_address" label="地址">
            </el-table-column>
            <el-table-column align="center" label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="dite(scope.row.cinema_id)"
                  >编辑</el-button
                >
                <el-dialog
                  title="修改影院"
                  :visible.sync="dialogFormVisible"
                  width="50%"
                  center
                >
                  <el-form :model="form" :rules="rules" style="margin-left:10%;margin-top:50px">
                    <el-form-item label="影院名" :label-width="formLabelWidth" prop="name">
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                        style="width:80%"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="联系电话"
                      :label-width="formLabelWidth"
                      prop="phone"
                    >
                      <el-input
                        v-model="form.phone"
                        autocomplete="off"
                        style="width:80%"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="地址" :label-width="formLabelWidth" prop="dizhi">
                      <el-input
                        v-model="form.dizhi"
                        autocomplete="off"
                        style="width:80%"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button style="width:80px;height:40px;margin-left:70%" @click="dialogFormVisible = false"
                      >取 消</el-button
                    >

                    <el-button type="primary" @click="postData()"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>

                <!-- 删除确认 -->
              <el-dialog title="注意" :visible.sync="vsb" width="30%" center>
                <span>是否确定删除此场次电影</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="vsb = false">取 消</el-button>
                  <el-button type="primary" @click="sc">确认</el-button>
                </span>
              </el-dialog>
              <el-button slot="reference" @click.native.prevent="del(scope.$index, scope.row)" type="danger" size="mini">撤销</el-button>
              <!-- ---- -->
              </template></el-table-column
            >
          </el-table>
          <el-pagination
            background
            @current-change="fy"
            layout="prev, pager, next"
            :page-size="8"
            :total="total"
             style="margin-top:30px"
          >
          </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  mounted() {
    this.getData();
  },

  methods: {

    // 搜索框
    ssk() {
      var url = `admin/getCurrentPageCinema?currentPage=1&pageSize=7&input=${this.input}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
        // console.log(this.data)
      });
    },
    // 添加影院
    tianjia() {
      var params = `cinemaName=${this.form.name}&cinemaPhone=${this.form.phone}&address=${this.form.dizhi}`;
      this.axios.post("admin/addCinemaInfo", params).then((res) => {
        this.dialogFormVisible1 = false;
        this.reload()
        this.$message({
         message:'添加成功',
        type:'success'
      })
      });
      
    },
    dite(id) {
      this.dialogFormVisible = true;
      this.cinemaid = id;
    },
    // 编辑影院
    postData() {
      var params = `cinemaId=${this.cinemaid}&cinemaName=${this.form.name}&cinemaPhone=${this.form.phone}&address=${this.form.dizhi}`;
      this.axios.post("admin/updateCinemaInfo", params).then((res) => {
        this.dialogFormVisible = false;
        this.reload()
        this.$message({
         message:'编辑成功',
        type:'success'
      })
      });
      
    },
    del(index, row) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // console.log(row)
      var params = `cinemaId=${row.cinema_id}&cinemaName=${this.form.name}&cinemaPhone=${this.form.phone}&address=${this.form.dizhi}`;
          this.axios.post("admin/deleteCinemaInfo", params).then((res) => {
        this.dialogVisible = false;
        this.reload()
         this.$message({
        message: "删除成功",
        type: "success",
      });
      });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    // 分页
    fy(val) {
      this.axios
        .get(`admin/getCurrentPageCinema?currentPage=${val}&pageSize=7&input=`)
        .then((res) => {
          this.data = res.data.data;
        });
    },
    // 获取影院
    getData() {
      var url = `admin/getCurrentPageCinema?currentPage=1&pageSize=7&input=`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
        // console.log(this.data)
      });

      var url1=`admin/getAllCinema`
      this.axios.get(url1).then((res) => {
        this.total = res.data.total;
      });
    },
    // 删除影院
    sc(){
      var params = `cinemaId=${this.cinema_id}&cinemaName=${this.form.name}&cinemaPhone=${this.form.phone}&address=${this.form.dizhi}`;
      this.axios.post("admin/deleteCinemaInfo", params).then((res) => {
        this.reload()
        this.$message({
                message:'删除成功',
                type:'success'
            })
      });
      
    },
    deleteRow(cinema_id) {
      this.vsb=true
      this.cinema_id=cinema_id
    },
  },
  data() {
    return {
      vsb:false,
      cinema_id:'',
      input: "",
      data: [],
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {
        id: "",
        name: "",
        phone: "",
        dizhi: "",
        gps: "",
      },
        rules: {
          name: [
            { required: true,message: '请输入影院', },
          ],
          phone:[
            {required: true,message: '请输入电话',},
            {required: true,pattern:/^1[3-9]\d{9}$/,message:'手机号格式不正确'}
          ],
          dizhi:[
            {required: true,message: '请输入地址',},
          ]},
      formLabelWidth: "120px",
      cinemaid: "",
    };
  },
};
</script>

<style scoped>
.input {
  width: 40%;
  margin:40px auto;
}
</style>