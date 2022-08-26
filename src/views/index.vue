<template>
  <div id="index" ref="appRef">
      
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">大数据可视化平台</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text">各市播放数据分析</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">
                <button class="btn1"  @click="isScreenFull" v-model="isbtn">{{btn}}</button>
            <button class="btn2" style="left:130px" @click="push">进入首页</button>
              </span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">
                <!-- <img src="@/public" alt=""> -->
                淘票电影</span>
            </div>
      <!-- --------------- -->
            
      <!-- ---------------- -->
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text"
                >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
              >
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import { formatTime } from '../utils/index.js'
import centerLeft1 from './DaPing/centerLeft1'
import centerLeft2 from './DaPing/centerLeft2'
import centerRight1 from './DaPing/centerRight1'
import centerRight2 from './DaPing/centerRight2'
import center from './DaPing/center'
import bottomLeft from './DaPing/bottomLeft'
import bottomRight from './DaPing/bottomRight'
import screenfull from "screenfull";


export default {
  mixins: [ drawMixin ],
  data() {
    return {
      isbtn: true,
      btn:'进入全屏',
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000']
    }
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    bottomRight
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  beforeDestroy () {
    clearInterval(this.timing)
  },
  methods: {
    push(){
        this.$router.push('/Admin')
    },
      //全屏方法
    isScreenFull() {
      // 需要注意的是 如果判断!screenfull.enabled 显示的是不支持全屏的话 是因为谷歌的版本问题  判断改为 !screenfull.isEnabled  就可以了
      
      if (!screenfull.isEnabled) {
        // 如果不支持进入全屏，发出不支持提示
        this.$message({
          message: "您的浏览器版本过低不支持全屏显示！",
          type: "warning"
        });
        return false;
      }
      if(this.isbtn == true){
        this.isbtn = false;
        this.btn = '退出全屏'
        screenfull.request();

      }else{
        screenfull.exit();
        this.isbtn = true;
        this.btn = '进入全屏'
      }
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
.btn1{
    font-size: 1.2rem;
    margin-top: 10px;
    color: rgb(221, 220, 220);
    border: 0;
    background-color: transparent;
    margin-left: 10px; 
    float: left;
}
.btn2{
    font-size: 1.2rem;
    color: rgb(221, 220, 220);
    border: 0;
    background-color: transparent;
    margin-left: 10px; 
    float: left;
    margin-top: 10px;
}

</style>
