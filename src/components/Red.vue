<template>
  <div
    :class="[
      $route.path === '/red' ? 'red' : 'no-red',
      { 'red-animation': animationGreen },
    ]"
  >
    <h2 class="timer">{{ countDown }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type RedDataType = {
  countDown: number;
  animationGreen: boolean;
};

export default Vue.extend({
  data(): RedDataType {
    return {
      countDown: 10,
      animationGreen: false,
    };
  },
  created(): void {
    if (
      Number(localStorage.getItem("countDown")) < 10 &&
      Number(localStorage.getItem("countDown")) > 0
    ) {
      const countOld: string | null = localStorage.getItem("countDown");
      const needTimer: string = countOld + "000";

      this.settingsGreen(Number(needTimer), Number(countOld));
      localStorage.removeItem("countDown");
    } else {
      this.settingsGreen(10000, this.countDown);
    }
  },
  methods: {
    settingsGreen(needTimer: number, count: number): void {
      const namePath: string = this.$route.path.substr(1);
      this.countDownTimer(count);
      if (this.$route.query.fromPath === "yellow") {
        setTimeout(() => {
          this.$router.push(`/yellow?fromPath=${namePath}`);
        }, needTimer);
      } else if (this.$route.query.namePath === undefined) {
        setTimeout(() => {
          this.$router.push(`/yellow?fromPath=${namePath}`);
        }, needTimer);
      }
    },
    countDownTimer(count: number): void {
      this.countDown = count;

      if (count > 0) {
        setTimeout(() => {
          count -= 1;

          if (count === 3) {
            this.animationGreen = true;
          }
          this.countDownTimer(count);
        }, 1000);
      }
    },
  },
  watch: {
    countDown(): void {
      localStorage.setItem("countDown", JSON.stringify(this.countDown));
      if (this.countDown === 1) {
        localStorage.removeItem("countDown");
      }
    },
  },
});
</script>

<style scoped>
.red {
  background-color: red;
}

.red-animation {
  animation-name: blinkerRed;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1, 0, 0, 1);
  animation-duration: 1s;
  -webkit-animation-name: blinkerRed;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1);
  -webkit-animation-duration: 1s;
}

@keyframes blinkerRed {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.8;
  }
}

@-webkit-keyframes blinkerRed {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.8;
  }
}

.timer {
  padding: 10px 0 0 10px;
  font-size: 50px;
  font-weight: 500;
}

.no-red {
  background-color: red;
  opacity: 0.6;
}
</style>
