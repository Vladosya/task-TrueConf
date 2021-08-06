<template>
  <div
    :class="[
      $route.path === '/yellow' ? 'yellow' : 'no-yellow',
      { 'yellow-animation': animationYellow },
    ]"
  >
    <h2 class="timer">{{ countDown }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type YellowDataType = {
  countDown: number;
  animationYellow: boolean;
};

export default Vue.extend({
  data(): YellowDataType {
    return {
      countDown: 3,
      animationYellow: false,
    };
  },
  created(): void {
    if (
      Number(localStorage.getItem("countDown")) < 3 &&
      Number(localStorage.getItem("countDown")) > 0
    ) {
      const countOld: string | null = localStorage.getItem("countDown");
      const needTimer: string = countOld + "000";

      this.settingsGreen(Number(needTimer), Number(countOld));
      localStorage.removeItem("countDown");
    } else {
      this.settingsGreen(3000, this.countDown);
    }
  },
  methods: {
    settingsGreen(needTimer: number, count: number): void {
      const namePath: string = this.$route.path.substr(1);
      this.countDownTimer(count);
      if (this.$route.query.fromPath === "red") {
        setTimeout(() => {
          this.$router.push(`/green?fromPath=${namePath}`);
        }, needTimer);
      } else if (this.$route.query.fromPath === "green") {
        setTimeout(() => {
          this.$router.push(`/red?fromPath=${namePath}`);
        }, needTimer);
      } else if (this.$route.query.namePath === undefined) {
        setTimeout(() => {
          this.$router.push(`/green?fromPath=${namePath}`);
        }, needTimer);
      }
    },
    countDownTimer(count: number): void {
      this.countDown = count;

      if (count > 0) {
        setTimeout(() => {
          count -= 1;

          if (count === 2) {
            this.animationYellow = true;
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
.yellow {
  background-color: yellow;
}

.yellow-animation {
  animation-name: blinkerYellow;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1, 0, 0, 1);
  animation-duration: 1s;
  -webkit-animation-name: blinkerYellow;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1);
  -webkit-animation-duration: 1s;
}

@keyframes blinkerYellow {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}

@-webkit-keyframes blinkerYellow {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}

.timer {
  padding: 10px 0 0 10px;
  font-size: 50px;
  font-weight: 500;
}

.no-yellow {
  background-color: yellow;
  opacity: 0.4;
}
</style>
