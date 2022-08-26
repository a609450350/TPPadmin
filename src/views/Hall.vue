<template>
  <div v-if="data">
    <el-container>
      <el-main >
          <el-input
            placeholder="请输入内容"
            style="width: 40%;margin:40px auto"
            class="input-with-select"
            v-model="input"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="ssk"
            ></el-button>
          </el-input>
          <el-button
            type="primary"
            style="margin: 35px"
            @click="dialogFormVisible1 = true"
            >添加影厅</el-button>
          <el-dialog  title="添加影厅" :visible.sync="dialogFormVisible1" width="50%" center>
            <el-form :model="form"  style="margin-left:10%;margin-top:50px"  label-width="100px">
              <el-form-item label="影院名" :label-width="formLabelWidth">
                <el-select
                  @change="yt"
                  v-model="form.region"
                  placeholder="请选择影院"
                  style="width:80%"
                >
                  <el-option
                    v-for="x in datas"
                    :key="x.cinema_id"
                    :label="x.cinema_name"
                    :value="x.cinema_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="影厅名" :label-width="formLabelWidth">
                <el-input style="width:80%" v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button style="width:80px;height:40px;margin-left:70%" @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="tianjia()">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
            border
            :data="data"
            style="width: 90%;margin-left:5%" size=medium
          >
            <el-table-column
              align="center"
              prop="hall_id"
              label="影厅ID"
              width="70"
            >
            </el-table-column>
            <el-table-column prop="cinema_name" label="影院名">
            </el-table-column>
            <el-table-column prop="cinema_phone" label="电话">
            </el-table-column>
            <el-table-column prop="name" label="影厅">
            </el-table-column>
            <el-table-column align="center" label="操作"  width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="dite(scope.row)">编辑</el-button>
                <el-dialog
                  title="修改影厅"
                  :visible.sync="dialogFormVisible"
                  width="30%"
                  center
                >
                  <el-form :model="form" style="margin-left:10%;margin-top:50px">
                    <el-form-item label="影厅名" :label-width="formLabelWidth">
                      <el-input
                        v-model="form.names"
                        autocomplete="off"
                        style="width:80%"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button style="margin-left:70%" @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="postData()"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.capture="del(scope.$index, scope.row)"
                  >删除</el-button
                >
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
    this.getdata()
  },

  methods: {
    del(index, row) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          var params = `cinemaId=${row.cinema_id}&hallName=${row.name}`;
          this.axios.post("admin/deleteHall", params).then((res) => {
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
    // 搜索框
    ssk() {
      var url = `admin/getCurrentPageHall?currentPage=1&pageSize=8&input=${this.input}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
      });
    },
    // 添加影院
    yt(value) {
      // console.log(value);
      this.form.vid = value;
    },
    getdata(){
      this.axios.get('admin/getAllCinema').then(res=>{
        // console.log("添加",res);
        this.datas=res.data.data
      })
    },
    tianjia() {
      // console.log(this.form.name);
      var params = `cinemaId=${this.form.vid}&hallName=${this.form.name}`;
      this.axios.post("admin/addHallInfo", params).then((res) => {
        this.dialogFormVisible1 = false;
        this.reload()
        this.$message({
        message: "添加成功",
        type: "success",
      });
      },
      );
    },
    // 编辑影院
    dite(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      this.cinemaid = row.cinema_id;
      this.hallId = row.hall_id;
      this.hallOldName = row.name;
      // console.log(this.hallOldName);
    },

    postData() {
      var params = `hallId=${this.hallId}&cinemaId=${this.cinemaid}&hallOldName=${this.hallOldName}&hallNewName=${this.form.names}`;
      this.axios.post("admin/updateHallInfo", params).then((res) => {
        // console.log(res);
        this.dialogFormVisible = false;
        this.reload()
      });
    },

    // 分页
    fy(val) {
      this.axios.get(`admin/getCurrentPageHall?currentPage=${val}&pageSize=8&input=`).then((res) => {
          this.total = res.data.total;
          this.data = res.data.data;
        });
    },
    // 获取影厅
    getData() {
      var url = `admin/getCurrentPageHall?currentPage=1&pageSize=8&input=`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.data = res.data.data;
        this.total = res.data.total;
      });
    },
  },

  data() {
    return {
      datas:[],
      input: "",
      data: [],
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogVisible: false,
      form: {
        name: "",
        vid: "",
        names: "",
      },
      formLabelWidth: "120px",
      cinemaid: "",
      hallId: "",
      hallOldName: "",
    };
  },
};
</script>

<style lang="scss">
</style>