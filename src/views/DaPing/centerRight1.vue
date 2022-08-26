<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务完成排行榜</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ['地区', '负责人', '覆盖率'],
        data: [
          ['石家庄', '王嘉豪', "<span  class='colorRed'>↑75%</span>"],
          ['沧州', '张三', "<span  class='colorGrass'>↓33%</span>"],
          ['唐山', '李四', "<span  class='colorRed'>↑100%</span>"],
          ['保定', '王五', "<span  class='colorRed'>↑94%</span>"],
          ['秦皇岛', '赵六', "<span  class='colorRed'>↑95%</span>"],
          ['邢台', '孙七', "<span  class='colorRed'>↑63%</span>"],
          ['邯郸', '周八', "<span  class='colorRed'>↑84%</span>"],
          ['张家口', '吴九', "<span  class='colorGrass'>↓46%</span>"],
          ['承德', '郑十', "<span  class='colorGrass'>↓13%</span>"],
          ['廊坊', '王嘉豪', "<span  class='colorRed'>↑76%</span>"]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', //表头
        oddRowBGC: '#0f1325', //奇数行
        evenRowBGC: '#171c33', //偶数行
        index: true,
        columnWidth: [50],
        align: ['center']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 300px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 270px;
      height: 340px;
    }
  }
}
</style>
