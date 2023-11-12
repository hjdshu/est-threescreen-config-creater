<template>
  <div id="app">
    <div v-if="!about">
      <div class="t1">欧卡三屏multimon_config.sii生成器</div>
      <p class="tipt">本计算方式由帖子 <a>https://tieba.baidu.com/p/5725691718</a> 提供, 本工具主要是按照原作者的计算方法来实现</p>
      <input placeholder="显示器宽度（毫米）" v-model="sw" type="number">
      <div class="tips">显示器高度</div>
      <input placeholder="显示器高度（毫米）" v-model="sh" type="number">
      <div class="tips">显示器宽度</div>
      <input placeholder="人眼到显示器距离（毫米）" v-model="eyetoscrren" type="number">
      <div class="tips">此数值对fov的影响比较大，可根据实际情况加减此数值</div>
      <input placeholder="边框宽度（毫米）可以填负数" v-model="bickw" type="number">
      <div class="tips">比如有三屏边框消除套件的，通常这里填负数，或者0等，可自由发挥</div>
      <input placeholder="显示器夹角（填小的那个夹角，比如120度，那就填60）" v-model="anglescreen" type="number">
      <div class="tips">一般来说，120度的三屏夹角就填60，但是有时候可以根据你实际情况加减浮动</div>
      <!-- <button @click="copy">复制下面这段字</button> -->
      <br>
      <button @click="tryCreater">生成配置并复制</button>
      <br>
      <br>
      <textarea class="textarea" v-if="val" v-model="val" disabled></textarea>
      <br>
      <br>
      <button class="use" v-if="val" @click="about=true">文件使用方法</button>
    </div>
    <div v-if="about">
      <button @click="about=false">返回</button>
      <About></About>
    </div>
  </div>
</template>

<script>
import About from './pages/About.vue';

let clipboardWrite = () => {
  Toast('请yarn dev 在electron环境下操作')
};
if (window.electron) {
  const { clipboard } = window.electron;
  clipboardWrite = function (text) {
    clipboard.writeText(text);
    Toast('复制成功')
  };
}

function Toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement("div");
  m.innerHTML = msg;
  m.style.cssText =
    "max-width:80%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 1000);
  }, duration);
}


export default {
  name: "App",
  components: {
    About
  },
  data() {
    return {
      val: '',
      sw: null,
      sh: null,
      eyetoscrren: null,
      bickw: null,
      anglescreen: null,
      about: false,
    };
  },
  methods: {
    tryCreater() {
      if (!window.electron) {
        Toast('请yarn dev 在electron环境下操作')
      }
      if (!this.sw || !this.sh || !this.eyetoscrren || !this.bickw || !this.anglescreen) {
        Toast('请填写完整')
        return
      }
      let ipcRenderer = window.electron.ipcRenderer;
      //options.sw,
      // options.sh,
      // options.eyetoscrren,
      // options.bickw,
      // options.anglescreen
      // 697.68, // 显示器宽度475mm
      // 392.26, // 显示器高度267.1875mm
      // 550, // 眼睛到显示器距离372.800325mm
      // -3, // 屏幕边框宽度17.5mm
      // 58 // 屏幕边框角度20度
      const result = ipcRenderer.sendSync('create', JSON.stringify({
        sw: Number(this.sw),
        sh: Number(this.sh),
        eyetoscrren: Number(this.eyetoscrren),
        bickw: Number(this.bickw),
        anglescreen: Number(this.anglescreen),
      }))
      console.log(result)
      clipboardWrite(result)
      this.val = result;
    },
    copy() {
      clipboardWrite(this.val)
    },
    go(path) {
      location.href = path
    }
  },
};
</script>

<style lang="less" scoped>
.tipt{
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.textarea {
  width: 600px;
  height: 200px;
}

input {
  display: block;
  margin-top: 10px;
  width: 400px;
}

.tips {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.t1 {
  font-weight: bold;
}</style>
