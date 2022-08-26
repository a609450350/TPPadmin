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
      cdata: {
        xData: ["石家庄", "张家口", "秦皇岛", "唐山", "沧州", "保定"],
        seriesData: [
          { value: 10, name: "石家庄" },
          { value: 5, name: "张家口" },
          { value: 15, name: "秦皇岛" },
          { value: 25, name: "唐山" },
          { value: 20, name: "沧州" },
          { value: 35, name: "保定" }
        ]
      }
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