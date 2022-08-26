<template>
  <div>
    <el-container>
      <el-main>

        <el-input
          placeholder="请输入内容"
          style="width: 40%; margin: 40px auto"
          class="input-with-select"
          v-model="input"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="find"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          style="margin: 35px"
          @click="dialogVisible = true"
        >
          添加电影
        </el-button>

        <el-table
          border
          :data="data"
          style="width: 90%; margin-left: 5%"
          size="medium"
        >
          <el-table-column
            prop="movie_id"
            label="电影ID"
            align="center"
            width="100px"
          >
          </el-table-column>
          <el-table-column prop="name" label="电影名"> </el-table-column>
          <el-table-column prop="director" label="导演" align="center" width="120px">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
            width="200px"
          >
          </el-table-column>
          <el-table-column prop="public_date" label="上映时间" width="150px">
          </el-table-column>

          <el-table-column align="center" label="操作" width="160px">
            <template slot-scope="scope">
              <el-button
                type="light"
                 size="mini"
                @click="dite(scope.row.movie_id)"
                >修改</el-button
              >
              <el-dialog
                title="修改电影信息"
                :visible.sync="dialogFormVisible"
                width="50%"
                center
              >
               <el-form
            :model="ruleForm"
            label-width="100px"
            text-align
            center
            :rules="rules"
            ref="ruleForm"
             style="margin-left:10%;margin-top:50px"
          >
         
                <el-form-item
                  label="电影名"
                  style="width: 80%; display: inline-block"
                  prop="name"
                >
                  <el-input v-model="ruleForm.name"></el-input> </el-form-item
                ><br />
                <el-form-item
              label="导演"
              style="width: 80%; display: inline-block"
              prop="director"
            >
              <el-input v-model="ruleForm.director"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="演员"
              style="width: 80%; display: inline-block"
              prop="actor"
            >
              <el-input v-model="ruleForm.actor"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="片长"
              style="width: 80%; display: inline-block"
              prop="long"
            >
              <el-input v-model="ruleForm.long"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="上映时间"
              style="width: 80%; display: inline-block"
              prop="publicDate"
            >
              <el-input v-model="ruleForm.publicDate"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="语言"
              prop="language"
            >
              <el-select
                v-model="ruleForm.language"
                placeholder="请选择语言"
                style="width:77%"
              >
                <el-option label="国语" value="国语"></el-option>
                <el-option label="粤语" value="粤语"></el-option>
                <el-option label="英语" value="英语"></el-option>
                <el-option label="日语" value="日语"></el-option>
                <el-option label="其它" value="其它"></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择类型"
                style="width:77%"
              >
                <el-option label="动漫" value="动漫"></el-option>
                <el-option label="言情" value="言情"></el-option>
                <el-option label="科幻" value="科幻"></el-option>
                <el-option label="喜剧" value="喜剧"></el-option>
                <el-option label="爱情" value="爱情"></el-option>
                <el-option label="剧情" value="剧情"></el-option>
                <el-option label="动作" value="动作"></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item
              label="简介"
              prop="intro"
              v-model="ruleForm.intro"
            >
              <el-input
                type="textarea"
                style="width:77%"
                v-model="ruleForm.intro"
              ></el-input>
            </el-form-item>
</el-form>
                <el-button style="width:80px;height:40px;margin-left:70%" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editForm('ruleForm')"
                  >确 定</el-button
                >
                
              </el-dialog>
              <el-button
                type="danger"
                @click="del(scope.$index, scope.row)"
                 size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="fy"
          background
          layout="prev, pager, next"
          :total="total"
          style="margin-top: 30px"
        >
        </el-pagination>
        <el-dialog title="添加电影" :visible.sync="dialogVisible" width="50%"
                center>
          <el-form
            style="margin-left:10%;margin-top:50px"
            :model="ruleForm"
            label-width="100px"
            text-align
            center
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item
              label="电影名"
              style="width: 80%; display: inline-block"
              prop="name"
            >
              <el-input v-model="ruleForm.name"></el-input> </el-form-item
            ><br />
            <!-- <el-form-item
              label="海报"
              style="width: 50%; display: inline-block"
              prop="poster"
            >
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload> </el-form-item
            ><br /> -->
            <el-form-item
              label="导演"
              style="width: 80%; display: inline-block"
              prop="director"
            >
              <el-input v-model="ruleForm.director"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="演员"
              style="width: 80%; display: inline-block"
              prop="actor"
            >
              <el-input v-model="ruleForm.actor"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="片长"
              style="width: 80%; display: inline-block"
              prop="long"
            >
              <el-input v-model="ruleForm.long"></el-input> </el-form-item
            ><br />
            <el-form-item
              label="上映时间"
              style="width: 80%; display: inline-block"
              prop="publicDate"
            >
              <el-input v-model="ruleForm.publicDate"></el-input> </el-form-item
            >
            <el-form-item
              label="语言"
              prop="language"

            >
              <el-select
                v-model="ruleForm.language"
                placeholder="请选择语言"
                style="width:77%"
              >
                <el-option label="国语" value="guoyu"></el-option>
                <el-option label="粤语" value="yueyu"></el-option>
                <el-option label="英语" value="yingyu"></el-option>
                <el-option label="日语" value="riyu"></el-option>
                <el-option label="其它" value="qita"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择类型"
                style="width:77%"
              >
                <el-option label="动漫" value="dongman"></el-option>
                <el-option label="言情" value="yanqing"></el-option>
                <el-option label="科幻" value="kehuan"></el-option>
                <el-option label="喜剧" value="xijv"></el-option>
                <el-option label="爱情" value="aiqing"></el-option>
                <el-option label="剧情" value="jvqing"></el-option>
                <el-option label="动作" value="dongzuo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="简介"
              prop="intro"
              v-model="ruleForm.intro"
            >
              <el-input
                type="textarea"
                style="width:77%"
                v-model="ruleForm.intro"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button style="width:80px;height:40px;margin-left:70%" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  mounted() {
    this.download();
    this.axios.get('admin/getCurrentAllmovie').then((res)=>{
      // console.log(res);
      this.total = res.data.total;
    })
  },
  methods: {
    //修改电影
     dite(id) {
      this.dialogFormVisible = true;
      this.movieid = id;
    },
editForm() {
     
    // 编辑影院
    
      var params = `movieId=${this.movieid}&movieName=${this.ruleForm.name}&poster=${this.ruleForm.poster}&director=${this.ruleForm.director}&actor=${this.ruleForm.actor}&long=${this.ruleForm.long}&type=${this.ruleForm.type}&language=${this.ruleForm.language}&publicDate=${this.ruleForm.publicDate}&intro=${this.ruleForm.intro}`;
      this.axios.post("admin/updateMovieInfo", params).then((res) => {
        // console.log(res);
        this.dialogFormVisible = false;
      });
      this.$message({
         message:'编辑成功',
        type:'success'
      })
    
    },




    //搜索
    find() {
      var url = `admin/getCurrentPageMovie?currentPage=1&pageSize=8&input=${this.input}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
      });
    },
    //删除电影
     del(index, row) {
      var params = `movieId=${row.movie_id}`;
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           this.axios.post("admin/deleteMovieInfo", params).then((res) => { this.reload()
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
   
    //添加电影
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let movieName = this.ruleForm.name;
          let director = this.ruleForm.director;
          let actor = this.ruleForm.actor;
          let long = this.ruleForm.long;
          let type = this.ruleForm.type;
          let language = this.ruleFormlanguage;
          let publicDate = this.ruleForm.publicDate;
          let intro = this.ruleForm.intro;
          this.axios
            .post("admin/addMovieInfo", {
              movieName,
              director,
              actor,
              long,
              type,
              actor,
              language,
              publicDate,
              intro,
            })
            .then((res) => {
              this.reload();
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    //上传图片组件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //分页
    fy(val) {
      var url = `admin/getCurrentPageMovie?currentPage=${val}&pageSize=8&input=`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
        this.total = res.data.totals;
      });
    },
    // 获取电影信息
    download() {
      var url = "admin/getCurrentPageMovie?currentPage=1&pageSize=8&input=";
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.data = res.data.data;

      });
    },
  },
  data() {
    return {
      data: [],
      total: 0,
      input: "",
      movie_id:"",
      movieid:"",
      ruleForm: {
        movieid:"",
        name: "",
        director: "",
        actor: "",
        long: "",
        language: "",
        type: "",
        intro: "",
        poster: "",
        publicDate: "",
      },
      rules: {
        movieId:[{ required: true }],
        name: [{ required: true,message: '请输入电影名称', trigger: 'blur'}],
        director: [{ required: true,message: '请输入导演名称', trigger: 'blur'}],
        actor: [{ required: true,message: '请输入演员名称', trigger: 'blur'}],
        long: [{ required: true,message: '请输入电影长度', trigger: 'blur'}],
        language: [{ required: true,message: '请输入电影语言', trigger: 'blur'}],
        type: [{ required: true,message: '请输入电影类型', trigger: 'blur'}],
        intro: [{ required: true,message: '请输入电影简介', trigger: 'blur'}],
        poster: [{ required: true,message: '请输入导演名称', trigger: 'blur'}],
        publicDate: [{ required: true,message: '请输入上映时间', trigger: 'blur'}],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialogFormVisible: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
