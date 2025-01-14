<template>
  <div id="app">
    <div class="changelang">
      <div class="show">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          class="vt-locales-btn-icon"
          data-v-59048bcf=""
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
            class="css-c4d79v"
          ></path>
        </svg>
      </div>
      <div class="changebar" v-if="showWen">

        <div class="bar" @click="changeLang($event, 'zh')">中文</div>
        <div class="bar" @click="changeLang($event, 'en')">English</div>
        <!-- <div class="bar" @click="changeLang($event, 'ja')">日本語</div>
        <div class="bar" @click="changeLang($event, 'ko')">한국어</div> -->
      </div>
    </div>
    <div v-if="!about">
      <div class="t1">
        {{ $t("title") }}
      </div>
      <p class="tipt">
        {{ $t("desp") }}
      </p>
      <div class="wrapperItem">
        <div class="tips">{{ $t('btn1') }}</div>
        <div class="input">
          <input :placeholder="$t('danwei')" v-model="sw" type="number" />
        </div>
      </div>

      <div class="wrapperItem">
        <div class="tips">{{ $t('btn2') }}</div>
        <div class="input">
          <input :placeholder="$t('danwei')" v-model="sh" type="number" />
        </div>
      </div>

      <div class="wrapperItem">
        <div class="tips">{{ $t('btn3') }}</div>
        <div class="input">
          <input :placeholder="$t('danwei')" v-model="eyetoscrren" type="number" />
          <div class="desp">
            {{ $t('btn3desp') }}
          </div>
        </div>
      </div>

      <div class="wrapperItem">
        <div class="tips">{{ $t('btn4') }}</div>
        <div class="input">
          <input :placeholder="$t('danwei')" v-model="bickw" type="number" />
          <div class="desp">
            {{ $t('btn4desp') }}
          </div>
        </div>
      </div>

      <div class="wrapperItem">
        <div class="tips">{{ $t('btn5') }}</div>
        <div class="input">
          <input placeholder="" v-model="anglescreen" type="number" />
          <div class="desp">
            {{ $t('btn5desp') }}
          </div>
        </div>
      </div>

      <!-- <button @click="copy">复制下面这段字</button> -->
      <br />
      <div class="btngroup">
        <button @click="tryCreater">{{ $t("createbtn1") }}</button>
        <button @click="tryCreater2p">{{ $t("createbtn2") }}</button>
        <button @click="tryCreater2pLeft">{{ $t("createbtn3") }}</button>
      </div>
      <div class="line"></div>
      <div class="srp">
        <div>软件免费，如果对您有帮助，欢迎赞赏 ｜ 个人主页：https://space.bilibili.com/15476602</div>
        <div class="zansma">
          <button @click="showzanshang = 1">点击获取赞赏码</button>
          <!-- <span>赞赏码：</span> -->
        </div>
      </div>
      <div class="createResult" v-if="val">
        <button class="use" v-if="val" @click="about = true">{{ $t("about") }}</button>
        <button style="margin-left: 10px;" @click="val=''">返回</button>
        <textarea class="textarea" v-if="val" v-model="val" disabled></textarea>
      </div>
    </div>
    <div v-if="about">
      <button @click="about = false">{{ $t("returnText") }}</button>
      <About></About>
    </div>
    <div class="zanimg" @click="showzanshang = 0" v-if="showzanshang">
      <div class="close">返回</div>
      <img src="./zansma.jpg" alt="">
    </div>
  </div>
</template>

<script>
import About from "./pages/About.vue";

let clipboardWrite = () => {
  Toast("请yarn dev 在electron环境下操作");
};
if (window.electron) {
  const { clipboard } = window.electron;
  clipboardWrite = (text) => {
    clipboard.writeText(text);
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
    About,
  },
  data() {
    return {
      showzanshang: 0,
      showWen: 1,
      val: "",
      sw: localStorage.getItem('est-config-sw') || null,
      sh: localStorage.getItem('est-config-sh') || null,
      eyetoscrren: localStorage.getItem('est-config-eyetoscrren') || null,
      bickw: localStorage.getItem('est-config-bickw') || null,
      anglescreen: localStorage.getItem('est-config-anglescreen') || null,
      about: false,
    };
  },
  methods: {
    changeLang (e, lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang)
    },
    tryCreater2p() {
      this.tryCreater(null, true, false);
    },
    tryCreater2pLeft() {
      this.tryCreater(null, false, true);
    },
    tryCreater(e, is2p, is2pLeft) {
      if (!window.electron) {
        Toast("请yarn dev 在electron环境下操作");
      }
      if (
        !this.sw ||
        !this.sh ||
        !this.eyetoscrren ||
        !this.bickw ||
        !this.anglescreen
      ) {
        Toast(this.$i18n.t('inputNotFull'));
        return;
      }

      // 这里在localStorage里面保存一下
      localStorage.setItem('est-config-sw', this.sw)
      localStorage.setItem('est-config-sh', this.sh)
      localStorage.setItem('est-config-eyetoscrren', this.eyetoscrren)
      localStorage.setItem('est-config-bickw', this.bickw)
      localStorage.setItem('est-config-anglescreen', this.anglescreen)

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
      const result = ipcRenderer.sendSync(
        "create",
        JSON.stringify({
          sw: Number(this.sw),
          sh: Number(this.sh),
          eyetoscrren: Number(this.eyetoscrren),
          bickw: Number(this.bickw),
          anglescreen: Number(this.anglescreen),
          is2p: is2p ? true : false,
          is2pLeft: is2pLeft ? true : false,
        })
      );
      console.log(result);
      clipboardWrite(result);
      this.val = result;
      Toast(this.$i18n.t('createToast'));
    },
    copy() {
      clipboardWrite(this.val);
    },
    go(path) {
      location.href = path;
    },
  },
};
</script>
<style>
* {
  font-family: 'San Francisco', 'Helvetica Neue', 'Microsoft YaHei', 'Arial', sans-serif;
}
</style>
<style lang="less" scoped>
.zanimg{
  .close{
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    border: 1px solid #acacac;
    border-radius: 2px;
    width: 100px;
    height: 30px;
    display: flex;
    color: #696969;
    align-items: center;
    justify-content: center;
  }
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 60%;
  }
}
.line{
  width: 100%;
  height: 1px;
  background: #e6e6e6;
  margin-top: 20px;
}
.srp{
  margin-top: 10px;
  font-size: 14px;
  color: #606060;
  border-radius: 5px;
  padding: 10px;
  width: 90%; 
  .th{
    margin-top: 10px;
  }
}
.zansma{
  display: flex;
  align-items: center;
  span{
    width: 80px;
  }
  margin-top: 10px;
}
.createResult{
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  box-sizing: border-box;
  padding: 30px;
}
.changelang {
  position: fixed;
  right: 20px;
  top: 15px;
  cursor: pointer;
  .changebar{
    background: #fff;
    display: none;
    position: absolute;
    width: 50px;
    top: 100%;
    right: 0;
    // background: #505050;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: 0 0 5px #c8c8c8a8;
    .bar{
      font-size: 13px;
      color: #606060;
      margin-bottom: 5px;
      width: 100%;
      box-sizing: border-box;
      padding: 2px 4px;
      &:hover{
        background: #dddddd;
      }
    }
  }
  .show svg {
    width: 20px;
    font-size: 20px;
  }
  &:hover{
    .changebar{
      display: block;
    }
  }
}
.btngroup{
  display: flex;
  margin-bottom: 10px;
  button {
    display: block;
    margin-right: 10px;
  }
}
.use {
  margin-bottom: 10px;
}
.wrapperItem {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  width: 500px;
  padding: 5px 5px;
  margin-bottom: 5px;
}
.tipt {
  font-size: 12px;
  width: 90%;
  color: #999;
  margin-bottom: 10px;
}
.textarea {
  display: block;
  width: 90%;
  height: 550px;
  margin-bottom: 5px;
}
.desp {
  width: 300px;
  font-size: 13px;
  color: #505050;
}
input {
  display: block;
  width: 300px;
}

.tips {
  color: #000000;
  font-size: 13px;
  margin-top: 5px;
  margin-right: 15px;
  width: 120px;
}

.t1 {
  font-weight: bold;
  width: 90%;
}
</style>
