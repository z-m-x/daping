<!-- App.vue -->
<template>
  <div>
    <el-table :data="tableData" width="100%" :row-class-name="rowClassName" :row-style="rowStyle" class="custom-table" style="background-color: transparent;">
        <el-table-column label="排名" prop="ranking" width="64" >
          <template slot-scope="scope">
            <span v-if="scope.$index==0" :style="rankStyle" >
            <img src="./img/t1.png" alt=""></span>
            <span v-if="scope.$index==1" :style="rankStyle" class="rank-icon-2"> <img src="./img/t2.png" alt=""></span>
            <span v-if="scope.$index==2" :style="rankStyle" class="rank-icon-3"> <img src="./img/t3.png" alt=""></span>
            <span v-if="scope.$index==3" v-text="scope.row.ranking" :style="rankStyle"></span>
            <span v-if="scope.$index==4" v-text="scope.row.ranking" :style="rankStyle"></span>

          </template>
          <template slot="header" slot-scope="scope">
            <span class="blue-text">排名</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号" prop="licensePlate" width="100" >
          <template slot-scope="scope">
            <span v-text="scope.row.licensePlate"  :style="getLicensePlateStyle(scope.row)"></span>
          </template>
          <template slot="header" slot-scope="scope">
            <span class="blue-text">车牌号</span>
          </template>
        </el-table-column>
        <el-table-column label="驾驶员" prop="driver" ></el-table-column>
        <el-table-column label="调度次数" prop="dispatchCount" ></el-table-column>
        <el-table-column label="行驶总数" prop="totalDistance" ></el-table-column>
        <el-table-column label="调度时间" prop="dispatchTime" min-width="130px"></el-table-column>
      </el-table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      tableData: [
        { ranking: 1, licensePlate: '京A12345', driver: '张三', dispatchCount: 10, totalDistance: '100 km', dispatchTime: '2023-07-28' },
        { ranking: 2, licensePlate: '京B67890', driver: '李四', dispatchCount: 5, totalDistance: '50 km', dispatchTime: '2023-07-28' },
        { ranking: 3, licensePlate: '京C24680', driver: '王五', dispatchCount: 8, totalDistance: '80 km', dispatchTime: '2023-07-27' },
        { ranking: 'NO.4', licensePlate: '京D13579', driver: '赵六', dispatchCount: 3, totalDistance: '30 km', dispatchTime: '2023-07-27' },
        { ranking: 'NO.5', licensePlate: '京E97531', driver: '钱七', dispatchCount: 6, totalDistance: '60 km', dispatchTime: '2023-07-26' }
      ],
      rankStyle: {
        color:'#fff'
      },
      licensePlateStyle: {

      }
    }
  },
  methods: {

    rowStyle({ row, rowIndex }) {
      const  gb=(rowIndex  % 2 ==1 )?{ backgroundColor: 'rgba(47, 131, 225,0.06)'}:{}
      if (rowIndex === 0) {
        return { color: '#E9331B' ,...gb};
      } else if (rowIndex === 1) {
        return { color: '#DF8E1D',...gb };
      } else if (rowIndex === 2) {
        return { color: '#13C5BB' ,...gb};
      } else {
        return {color: '#FFF' ,...gb};
      }
    },
    getLicensePlateStyle(row) {
      if (row.ranking === 1) {
        return {
          color: '#E9331B', // 设置字体颜色为蓝色
          textShadow: '0 0 6px #E9331B' // 设置光晕效果
        };
      }
      if (row.ranking === 2) {
        return {
          color: 'rgb(223, 142, 29)', // 设置字体颜色为蓝色
          textShadow: '0 0 6px rgb(223, 142, 29)' // 设置光晕效果
        };
      }
      if (row.ranking === 3) {
        return {
          color: 'rgb(19, 197, 187)', // 设置字体颜色为蓝色
          textShadow: '0 0 6px rgb(19, 197, 187)' // 设置光晕效果
        };
      } else {
        return {
          color: '#fff' // 其他行车牌号颜色为黑色
        };
      }
    },
    rowClassName() {
      return 'custom-row'; // 添加自定义行样式
    }
  }
}

</script>

<style>

.el-table__row.custom-row {
  height: 44px;
  line-height: 44px;
font-family: SourceHanSansCNVF-Regular, SourceHanSansCNVF;
}

.custom-table {
  border: none;
}

.custom-table .cell {
  padding: 0;
}

.el-table__header-wrapper {
  background-color: transparent;
}
.el-table tr{
  background-color: transparent;
}
.el-table__header {
  background-color: transparent;
}
.el-table th.el-table__cell > .cell{
font-size: 14px;
}
.el-table td.el-table__cell{
  border: none;
}
.el-table .el-table__header-wrapper th{
  background-color: transparent;

}
.el-table th.el-table__cell.is-leaf{
  border: none;

}
.el-table .el-table__header-wrapper th{
  color:#FFF
}


.el-table::before{
  height: 0;
}
/* 添加这个类来排除特定列的行颜色 */
.exclude-color .el-table__row.custom-row {
 color: transparent ;
}
.blue-text {
  color: #2F83E2;
}
.rank-icon {

}
</style>
