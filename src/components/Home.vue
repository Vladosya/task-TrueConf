<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type HomeDataType = {
  colorArr: string[];
};

export default Vue.extend({
  data(): HomeDataType {
    return {
      colorArr: ["green", "yellow", "red"],
    };
  },
  created(): void {
    const randomColor: number = Math.floor(
      Math.random() * this.colorArr.length
    );

    if (this.$route.path === "/") {
      this.$router.push(`/${this.colorArr[randomColor]}`);
    }
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}

.container > div {
  height: 100%;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.red {
  background-color: red;
}
</style>
