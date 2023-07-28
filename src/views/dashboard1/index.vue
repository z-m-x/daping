<!-- App.vue -->
<!-- App.vue -->
<template>
  <div class="app-container"   @dblclick="fullScreen" ref="board">
    <Header class="header"/>
    <div class="content">
      <div class="left-column">
        <div class="top-block bg-blue" style="height: 323px; margin-bottom: 27px;">Left Top</div>
        <div class="middle-block bg-yellow" style="height: 251px; margin-bottom: 32px;">Left Middle</div>
        <div class="bottom-block bg-green" style="height: 303px;">Left Bottom</div>
      </div>
      <div class="middle-column">
        <div class="top-block bg-orange" style="height: 112px; margin-bottom: 27px;margin-top: 8px;">Middle Top</div>
        <div class="middle-block bg-pink" style="height: 475px;margin-bottom: 11px;">Middle Middle</div>
        <div class="bottom-block bg-red" style="height: 303px;">Middle Bottom</div>
      </div>
      <div class="right-column">
        <div class="top-block bg-purple" style="height: 294px; margin-bottom: 26px;">Right Top</div>
        <div class="middle-block bg-cyan" style="height: 303px; margin-bottom: 13px;">Right Middle</div>
        <div class="bottom-block bg-blue" style="height: 299px;">Right Bottom</div>
      </div>
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
    //实现全屏
fullScreen() {
  let el=this.$refs.board
  var isFullscreen =
    document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;
  if (!isFullscreen) {
    //进入全屏,多重短路表达式
    (el.requestFullscreen && el.requestFullscreen()) ||
      (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
      (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) ||
      (el.msRequestFullscreen && el.msRequestFullscreen());
  } else {
    //退出全屏,三目运算符
    this.isFull=false
    document.exitFullscreen
      ? document.exitFullscreen()
      : document.mozCancelFullScreen
      ? document.mozCancelFullScreen()
      : document.webkitExitFullscreen
      ? document.webkitExitFullscreen()
      : "";
  }
},
  },
}

</script>

<!-- App.vue (updated) -->
<style>
.app-container {
  background-image: url(./img/bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.header {
  height: 103px;
  background-color: #f0f0f0;
}

.content {
  display: flex;
  padding-bottom: 31px;
  margin: 0 40px;
  height: calc(100% - 103px - 31px); /* Subtract header height and bottom margin from total height */
}

.left-column,
.middle-column,
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.left-column {
  width: 404px;
}

.middle-column {
  margin: 0 54px 0 37px; /* Add left and right margins */
}

.right-column {
  width: 365px;
}

.left-column > .top-block {
  flex: 0 0 323px; /* Setting height to 323px */
}

.left-column > .middle-block,
.right-column > .middle-block {
}

.left-column > .bottom-block {
  flex: 0 0 303px; /* Setting height to 303px */
}

.middle-column > .top-block {
  flex: 0 0 112px; /* Setting height to 112px */
  margin-bottom: 27px; /* Add bottom margin */
}

.middle-column > .middle-block {
}

.middle-column > .bottom-block {
  flex: 0 0 303px; /* Setting height to 303px */
}

.right-column > .top-block {
}

.right-column > .middle-block {
}

.right-column > .bottom-block {
}

/* Define different background colors with transparency for each block */
.bg-blue {
  background-color: rgba(0, 123, 255, 0.8); /* Transparent blue */
}

.bg-yellow {
  background-color: rgba(255, 193, 7, 0.8); /* Transparent yellow */
}

.bg-green {
  background-color: rgba(40, 167, 69, 0.8); /* Transparent green */
}

.bg-orange {
  background-color: rgba(253, 126, 20, 0.8); /* Transparent orange */
}

.bg-pink {
  background-color: rgba(232, 62, 140, 0.8); /* Transparent pink */
}

.bg-purple {
  background-color: rgba(111, 66, 193, 0.8); /* Transparent purple */
}

.bg-cyan {
  background-color: rgba(23, 162, 184, 0.8); /* Transparent cyan */
}

.bg-red {
  background-color: rgba(220, 53, 69, 0.8); /* Transparent red */
}

/* Additional styling for the blocks can be added here */
</style>
