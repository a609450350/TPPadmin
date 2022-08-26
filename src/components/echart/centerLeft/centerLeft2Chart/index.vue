<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: [
        {
          // 名字需要与 “common/map/fujian.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
          name: '石家庄市',
          value: 10,
          elseData:{
            // 这里放置地图 tooltip 里想显示的数据
          }
        },
        {
          name: '邢台市',
          value: 9,
        },
        {
          name: '邯郸市',
          value: 8,
        },
        {
          name: '衡水市',
          value: 7,
        },
        {
          name: '沧州市',
          value: 6,
        },
        {
          name: '廊坊市',
          value: 5,
        },
        {
          name: '保定市',
          value: 4,
        },
        {
          name: '张家口市',
          value: 3,
        },
        {
          name: '承德市',
          value: 2,
        },
        {
          name: '秦皇岛市',
          value: 1,
        },
        {
          name: '唐山市',
          value: 0,
        },
      ]
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>