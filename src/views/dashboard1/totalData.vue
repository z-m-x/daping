<!-- App.vue -->
<template>
 <div class="total-data">
    <div class="box">
      <div class="upper-text">车辆总数</div>
      <span class="lower-text"><em>123</em></span>
    </div>

    <div class="box">
      <div class="upper-text">车辆调度总数</div>
      <div class="lower-text"><em>123</em></div>
    </div>

    <div class="box">
      <div class="upper-text">行程里程总数</div>
      <div class="lower-text"><em>123</em></div>
    </div>

    <div class="box">
      <div class="upper-text">加油公里油耗</div>
      <div class="lower-text"><em>123</em></div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods: {




  }
}

</script>

<style >
 .total-data {
      display: flex;
      justify-content: space-around;
      height: 100%;
    }

    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      flex: 1;
      height: 100%; /* 设置容器的高度 */
      background-image: url('./img/ctbg.png'); /* 设置容器的背景图片路径 */
      background-size: cover; /* 让背景图片充满容器 */
    }

    .upper-text {
      font-size: 15px;
      color: #fff;

    }

    .lower-text em{
      font-size: 34px;
      color: #fff;
      text-shadow: 0 0 24px #2F83E2;
      display: inline-block;
      font-weight: 800;
    }

</style>
