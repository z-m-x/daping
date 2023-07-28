<!-- App.vue -->
<template>
<div  class="newOrder">
         <p class="title">
            <span class="blue-text">车牌号</span>
            <span >驾驶员</span>
            <span >始发地</span>
            <span >目的地</span>
            <span >调度时间</span>
         </p>
         <div :style="'overflow:hidden;height:200px;position:relative'">
            <div :class="{anim:animate==true}">
                <p class="item" v-for="(item,index) in dataArr" :key="index" >
                    <span class="c"> {{ item.c }}</span>
                    <span > {{ item.j  }}</span>
                    <span > {{ item.s  }}</span>
                    <span > {{ item.m  }}</span>
                    <span > {{ item.d  }}</span>

                </p>




            </div>
            <div class="xuni">
                  <P  v-if='dataArr.length>0'>

</P>
<P v-if='dataArr.length>1' class="itemEven">

</P>
<P v-if='dataArr.length>2' >

</P>
<P v-if='dataArr.length>3' class="itemEven">

</P>

                </div>
         </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      dataArr: [
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        },
        {
          c:'京N 8Y521',
          j:'张三',
          s:'北京',
          m :'深圳',
          d:'2023.07.24',
        }

      ],
      animate:false,
            timer : null
    }
  },
  mounted() {
    this.getNewOrder()
  },
  methods: {
    getNewOrder(){

                  this.dataArr = [...this.dataArr,...this.dataArr]
                  if (this.dataArr.length > 4) {
                    this.timer = setInterval(this.saleScroll, 3000)
                 } else {
                   clearInterval(this.timer)
                 }
         },
         saleScroll() {
            this.animate = true;
            let that = this;

            setTimeout(function () {
                that.dataArr.push(that.dataArr[0]);
                that.dataArr.shift();
                that.animate = false;
            }, 500)
        },
  }
}

</script>

<style lang="scss">
.c{
  text-shadow: 0 0 14px #2F83E2 // 设置光晕效果

}
.blue-text {
  color: #2F83E2;
}
.newOrder{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .title{
      height: 50px;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: #fff;
        font-size: 14px;
        background: rgba(47, 131, 225, 0.06);
        span{
            display: inline-block;
            width:104px;
            text-align: center;
        }
    }
    .xuni{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      p{
        height: 50px;
        margin: 0;
      }
    }
    .item{
        margin: 0;
        height: 50px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: #fff;
        font-size: 14px;
        span{
            display: inline-block;
            width:104px;
            text-align: center;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }}
.itemEven{
    background:rgba(47, 131, 225, 0.06)
}
.anim{transition: all 0.5s; margin-top: -50px; }

</style>
