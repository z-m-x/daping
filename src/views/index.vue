<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        车辆备案
        <el-radio-group v-model="declareType" @change="countDeclareByYMD"  style="float: right; position: relative; z-index: 1">
          <el-radio label="N7">近7日</el-radio>
          <el-radio label="NM">本月</el-radio>
          <el-radio label="NY">本年</el-radio>
        </el-radio-group>
      </el-col>
      <line-chart :chart-data="lineChartData1" />
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        车辆调度统计
        <el-radio-group v-model="masterType" @change="countMasterByYMD" style="float: right; position: relative; z-index: 1">
          <el-radio label="N7">近7日</el-radio>
          <el-radio label="NM">本月</el-radio>
          <el-radio label="NY">本年</el-radio>
        </el-radio-group>
      </el-col>
      <line-chart :chart-data="lineChartData2" />
    </el-row>

  </div>
</template>

<script>
  import PanelGroup from './dashboard/PanelGroup'
  import LineChart from './dashboard/LineChart'
  import RaddarChart from './dashboard/RaddarChart'
  import PieChart from './dashboard/PieChart'
  import BarChart from './dashboard/BarChart'
  import {countDeclareByYMD, countMasterByYMD} from "@/api/statistical/statistical";

  const lineChartData = {
    declares: {
      legendData: ['已申报', '未申报'],
      xAxiData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lineDataMap: {
        '已申报': [100, 120, 161, 134, 105, 160, 165],
        '未申报': [120, 82, 91, 154, 162, 140, 145]
      }
    },
    masters: {
      legendData: ['已入库', '已出库'],
      xAxiData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lineDataMap: {
        '已入库': [100, 120, 161, 134, 105, 160, 165],
        '已出库': [120, 82, 91, 154, 162, 140, 145]
      }
    }
  }

  export default {
    name: 'Index',
    components: {
      PanelGroup,
      LineChart,
      RaddarChart,
      PieChart,
      BarChart
    },
    data() {
      return {
        declareType: 'N7',
        masterType: 'N7',
        lineChartData1: lineChartData.declares,
        lineChartData2: lineChartData.masters
      }
    },
    mounted() {
      this.countDeclareByYMD();
      this.countMasterByYMD();
    },
    methods: {
      handleSetLineChartData(type) {
        // this.lineChartData = lineChartData[type]
      },
      countDeclareByYMD() {
        countDeclareByYMD(this.declareType).then(res => {
          console.log("countDeclareByYMD", res.data)
          let chart = {
            legendData: ['已申报', '未申报'],
            xAxiData: [],
            lineDataMap: {
              '已申报': [],
              '未申报': []
            }
          }
          res.data.forEach(vo => {
            chart.xAxiData.push(vo.id);
            chart.lineDataMap['已申报'].push(vo.v1);
            chart.lineDataMap['未申报'].push(vo.v2);
          });
          this.lineChartData1 = chart;
        });
      },
      countMasterByYMD() {
        countMasterByYMD(this.masterType).then(res => {
          console.log("countMasterByYMD", res.data)
          let chart = {
            legendData: ['已入库', '已出库'],
            xAxiData: [],
            lineDataMap: {
              '已入库': [],
              '已出库': []
            }
          }
          res.data.forEach(vo => {
            chart.xAxiData.push(vo.id);
            chart.lineDataMap['已入库'].push(vo.v1);
            chart.lineDataMap['已出库'].push(vo.v2);
          });
          this.lineChartData2 = chart;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
