<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <router-view />
    </keep-alive>
    <div class="h50"></div>
    <div class="footer">
      <router-link to="/home" class="foot-tab" :class="{on: isHome}">妹纸</router-link>
      <router-link to="/history" class="foot-tab" :class="{on: isHistory}">历史</router-link>
      <router-link to="/category" class="foot-tab" :class="{on: isCategory}">分类</router-link>
      <router-link to="/search" class="foot-tab" :class="{on: isSearch}">搜索</router-link>
    </div>
    <div class="loading" v-if="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      exclude: [
        'detail',
      ]
    }
  },
  computed: {
    isHome() {
      return this.$route.path.indexOf('home') !== -1
    },
    isHistory() {
      return this.$route.path.indexOf('history') !== -1
    },
    isCategory() {
      return this.$route.path.indexOf('category') !== -1
    },
    isSearch() {
      return this.$route.path.indexOf('search') !== -1
    },
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>


<style lang="less">
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 5px;
  word-break: break-all;
}
.footer {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 50px; line-height: 50px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
}
.foot-tab {
  flex: 1;
  text-align: center;
  cursor: pointer;
  &.on {
    background-color: #dc4b83;
    color: #fff;
  }
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
}
.loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  margin-top: -2em;
  margin-left: -2em;
  border: solid 2em #0366d6;
  border-right: solid 2em transparent;
  border-left: solid 2em transparent;
  border-radius: 100%;
  animation: loading 1.2s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
