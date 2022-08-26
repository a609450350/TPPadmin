<template>
    <div>
        <el-container>
                <el-main class="main">
                    <!-- 输入框部分 -->
                    <el-input placeholder="请输入内容" style="width: 50%;margin:40px auto;" v-model="input" class="input-with-select">
                        <el-button @click="seek" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <!-- 表格部分 -->
                    <el-table :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" :data="tableData" border style="width: 90%;margin-left:5%" size=medium>
                        <el-table-column prop="comment_id" label="评论ID" width="70px">
                        </el-table-column>
                        <el-table-column prop="user_name" label="用户名">
                        </el-table-column>
                        <el-table-column prop="name" label="电影名">
                        </el-table-column>
                        <el-table-column prop="public_date" label="评论时间" width="120px">
                        </el-table-column>
                        <el-table-column prop="user_score" label="用户评分" width="80px">
                        </el-table-column>
                        <el-table-column prop="comment_content" label="评论内容">
                        </el-table-column>
                        <el-table-column label="操作" width="80px">
                            <template slot-scope="scope">
                            <!------删除确认框--------------------- ---- -->
                            <!-- <el-popover title="注意：" placement="top" width="160" trigger="manual" :ref="`popoverCode${scope.row.comment_id}`">
                                <p>确定删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="$refs[`popoverCode${scope.row.comment_id}`].showPopper = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="sc(scope.row)">确定</el-button>
                                </div>
                                <el-button slot="reference" @click.native.prevent="deleteRow(scope.row)" type="danger" size="small">撤销</el-button>
                                </el-popover>              -->
<el-button slot="reference" @click.native.prevent="del(scope.$index, scope.row)" type="danger" size="small">撤销</el-button>
<!--------------------------- ---- -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页符 -->
                    <el-pagination background v-if="total!=0" @current-change="fy" :page-size="8" layout="prev, pager, next" :total="total" style="margin-top:30px">
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
          let input=this.input
          this.axios.get(`admin/getCurrentPageComment?currentPage=1&pageSize=8&input=${input}`).then(res=>{
          this.tableData=res.data.data
          this.total=res.data.total
          })
        },
    del(index, row) {
        this.$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let commentId=row.comment_id
          let movieId = row.movie_id
        //   console.log(scheduleId)
           this.axios.post('admin/deleteCurrentComment', {commentId,movieId}).then((res) => { 
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
        sc(data){
            this.$refs[`popoverCode${data.comment_id}`].showPopper = false
            let commentId=data.comment_id
            let movieId=data.movie_id
            this.axios.post('admin/deleteCurrentComment',{commentId,movieId}).then(res=>{
              this.reload()
            })
            this.$message({
                message:'删除成功',
                type:'success'
            })
        },
        deleteRow(data) {
            this.$refs[`popoverCode${data.comment_id}`].showPopper = true
        },
        fy(val){
          this.axios.get(`admin/getCurrentPageComment?currentPage=${val}&pageSize=8&input=`).then(res=>{
          this.tableData=res.data.data
          this.total=res.data.total
          })},
    },
    data() {
        return {
            input: '',
            tableData: [],
            total:'',
            vsb:false,
            commentId:'',
            movieId:''
        }
    },
    mounted () {
        this.axios.get('admin/getCurrentPageComment?currentPage=1&pageSize=8&input=').then(res=>{
            this.tableData=res.data.data
            this.total=res.data.total
        })
    },
}
</script>

<style scoped>

</style>