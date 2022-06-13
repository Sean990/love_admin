<template>
  <div class="color">
    <a-card
      :style="{
        background: rgb,
      }"
    >
      <!-- <a-spin :spinning="spinning" tip="Loading..."> -->
      <img class="img-box" :src="imgUrl" @click="getImg" id="img" />
      <!-- </a-spin> -->
    </a-card>
    <a-card>
      <div id="layout-background" :style="`background: url(${imgUrl}) fixed`" />
    </a-card>
  </div>
</template>

<script>
export default {
  name: "TagList",
  components: {},
  data() {
    return {
      //   spinning: true,
      rgb: "",
      imgUrl: "",
    };
  },
  created() {},
  mounted() {
    this.getImg();
  },
  methods: {
    getImg() {
      let i = Math.floor(Math.random() * (12 - 1) + 1);
      let img = document.getElementById("img");
      this.imgUrl = require(`@/assets/bg/${i}.jpg`);
      //   this.spinning = true;
      img.onload = () => {
        // this.spinning = false;
        let rgb = this.colorfulImg(img);
        this.rgb = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
      };
      img.onerror = () => {
        console.log("error");
        this.getImg();
      };
    },
    colorfulImg: function (imgEl) {
      var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement("canvas"),
        context = canvas.getContext && canvas.getContext("2d"),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

      if (!context) {
        return defaultRGB;
      }
      height = canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
      context.drawImage(imgEl, 0, 0);
      try {
        data = context.getImageData(0, 0, width, height);
      } catch (e) {
        /* security error, img on diff domain */ alert("x");
        return defaultRGB;
      }
      length = data.data.length;
      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }
      // ~~ used to floor values
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);
      return rgb;
    },
  },
};
</script>

<style scoped>
.img-box {
  width: 100%;
}

#layout-background {
  width: 100%;
  height: 300px;
}
</style>
