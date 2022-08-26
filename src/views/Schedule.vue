<template>
  <div v-if="tableData">
    <!-- 电影排片 -->
    <el-container>
      <el-main>
        <el-input placeholder="请输入内容" v-model="name" class="input">
          <el-button icon="el-icon-search" slot="append" @click="seek"></el-button>
        </el-input>
        <el-button type="primary" @click="get" style="margin: 35px">安排电影</el-button>
        <!-- -------------- -->
            <el-dialog title="添加排片" :visible.sync="anpai" width="50%" center>
              <el-form :model="ruleForm" style="margin-left:10%;margin-top:50px" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="电影名" prop="mname">
                    <el-select v-model="ruleForm.mname" placeholder="请选择电影" style="width:80%">
                      <el-option v-for="x in movieData" :key="x.movie_id" :label="x.name" :value="x.movie_id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="影院" prop="cinema" required>
                    <el-select @change="getMH" v-model="ruleForm.cinema" placeholder="请选择影院" style="width:80%">
                      <el-option v-for="x in cinemaData" :key="x.cinema_id" :label="x.cinema_name" :value="x.cinema_id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="影厅" prop="movieHall">
                    <el-select v-model="ruleForm.movieHall" placeholder="请选择影厅" style="width:80%">
                      <el-option v-for="x in mhData" :key="x.hall_id" :label="x.name" :value="x.name"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="放映日期" prop="data1"  required>
                    <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.data1" type="date" placeholder="选择日期" style="width:80%"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="放映时间"  prop="data2" required>
                    <el-time-picker value-format="HH:mm" style="width:80%" v-model="ruleForm.data2" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="选择时间"></el-time-picker>
                  </el-form-item>
                  <el-form-item label="售价" prop="price">
                    <el-input v-model="ruleForm.price" style="width:80%" ></el-input>
                  </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer" style="padding-top:120px">
                <el-button @click="resetForm('ruleForm')" style="width:80px;height:40px;margin-left:70%">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>
        <!-- -------------- -->
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 90%;margin-left:5%" size=medium>
          <el-table-column prop="schedule_id" label="排片ID" width="70px"></el-table-column>
          <el-table-column prop="name" label="电影名" width="180px"></el-table-column>
          <el-table-column prop="cinema_name" label="影院名"></el-table-column>
          <el-table-column prop="cinema_name" label="放映大厅"></el-table-column>
          <el-table-column prop="show_date" label="放映日期" width="100px"></el-table-column>
          <el-table-column prop="show_time" label="放映时间" width="60px"></el-table-column>
          <el-table-column prop="price" label="售价（元）" width="80px"></el-table-column>
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <el-button slot="reference" @click.native.prevent="del(scope.$index, scope.row)" type="danger" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页符 -->
        <el-pagination background v-if="total!=false" @current-change="fy" :page-size="8" layout="prev, pager, next" :total="total" style="margin-top:30px">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  methods: {
        seek(){
          let name=this.name
          this.axios.get(`admin/getCurrentPageMovieSchedule?currentPage=1&pageSize=8&input=${name}`).then(res=>{
          this.tableData=res.data.data
          this.total=res.data.total
          })
        },
        getMH(value){
          this.axios.get(`admin/getHallByCinemaId?cinemaId=${value}`).then(res=>{
            this.mhData=res.data.data
          })         
        },
        get(){
          this.anpai=true
          this.axios.get('admin/getAllMovie').then(res=>{
            this.movieData=res.data.data
          })
          this.axios.get('admin/getAllCinema').then(res=>{
            this.cinemaData=res.data.data
          })
        },
////////////////////////////////////////
        del(index, row) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let scheduleId=row.schedule_id
          // console.log(scheduleId)
           this.axios.post('admin/deleteMovieSchedule', {scheduleId}).then((res) => { 
            this.reload()
            this.$message({
            type: 'success',
            message: '删除成功!',
          
          });
           
           });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
/////////////////////////////////////
        fy(val){
          this.axios.get(`admin/getCurrentPageMovieSchedule?currentPage=${val}&pageSize=8&input=`).then(res=>{
          this.tableData=res.data.data
          })
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let movieId=this.ruleForm.mname
            let cinemaId=this.ruleForm.cinema
            let hallName=this.ruleForm.movieHall
            let showDate=this.ruleForm.data1
            let showTime=this.ruleForm.data2
            let price=this.ruleForm.price
            this.axios.post('admin/addScheduleInfo',{movieId,cinemaId,hallName,showDate,showTime,price}).then(res=>{
              this.reload()
              this.$message({
                message:'添加成功',
                type:'success'
            })
            })
            
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.anpai=false
      }
    },
  data() {
    return {
      vsb:false,
      time1:'',
      movieData:'',
      cinemaData:'',
      mhData:'',
      ruleForm: {
          price: '',
          mname: '',
          cinema:'',
          movieHall:'',
          data1:'',
          data2:''
        },
      anpai:false,
      tableData: [],
      name: "",
      total:null,
      isReloadData:true,
      rules: {
          mname: [
            { required: true, message: '请选择电影名称', trigger: 'change' }
          ],
          cinema: [
            { required: true, message: '请选择影院', trigger: 'change' }
          ],
          movieHall: [
            { required: true, message: '请选择影厅', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入电影售价', trigger: 'blur' },
          ],
        }
    };
  },
  mounted () {
    this.axios.get(`admin/getCurrentPageMovieSchedule?currentPage=1&pageSize=8&input=`).then(res=>{  
      this.tableData=res.data.data
    })
    this.axios.get(`admin/getCurrentAll`).then(res=>{  
      this.total=res.data.total
    })
  },
};
</script>
<style scoped>
.input {
  width: 40%;
  margin:40px auto;
}
</style>










