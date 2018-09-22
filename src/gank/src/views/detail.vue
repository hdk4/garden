<template>
  <div class="detail">
    <div class="detail-box" v-if="welfare.length > 0">
      <h3>福利</h3>
      <div v-for="(item,index) in welfare" :key="index" class="list-welfare">
        <a :href="item.url" target="_blank"><img :alt="item.desc" :src="item.url|url"></a>
      </div>
    </div>
    <z-list :list="ios" v-if="ios.length > 0" name="iOS"></z-list>
    <z-list :list="android" v-if="android.length > 0" name="Android"></z-list>
    <z-list :list="frontend" v-if="frontend.length > 0" name="前端"></z-list>
    <z-list :list="recommend" v-if="recommend.length > 0" name="瞎推荐"></z-list>
    <z-list :list="app" v-if="app.length > 0" name="App"></z-list>
    <z-list :list="source" v-if="source.length > 0" name="拓展资源"></z-list>
    <z-list :list="rest" v-if="rest.length > 0" name="休息视频"></z-list>
    <div class="flex nextprev">
      <div class="prev">
        <router-link :to="prev" v-if="prev">上一篇</router-link>
        <span v-else>没有了</span>
      </div>
      <div class="next">
        <router-link :to="next" v-if="next">下一篇</router-link>
        <span v-else>没有了</span>
      </div>
    </div>
    <div class="h50"></div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      android: [],
      ios: [],
      frontend: [],
      rest: [],
      welfare: [],
      recommend: [],
      app: [],
      source: [],

      // all | Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
    }
  },
  computed: {
    year() {
      return this.$route.params.year
    },
    month() {
      return this.$route.params.month
    },
    day() {
      return this.$route.params.day
    },
    date() {
      return `${this.year}-${this.month}-${this.day}`
    },
    history() {
      return this.$store.state.history
    },
    index() {
      return this.history.indexOf(this.date)
    },
    next() {
      const next = this.history[this.index + 1];
      if (next) {
        return '/detail/' + next.split('-').join('/')
      } else {
        return ''
      }
    },
    prev() {
      const prev = this.history[this.index - 1];
      if (prev) {
        return '/detail/' + prev.split('-').join('/')
      } else {
        return ''
      }
    }
  },
  created() {
    this.loadData()
    this.$store.dispatch('fetchHistory');
  },
  methods: {
    loadData() {
      this.$store.dispatch('fetchDetail', this.date).then(data => {
        this.android = data.Android || [];
        this.ios = data.iOS || [];
        this.frontend = data['前端'] || [];
        this.rest = data['休息视频'] || [];
        this.welfare = data['福利'] || [];
        this.recommend = data['瞎推荐'] || [];
        this.app = data.App || [];
        this.source = data['拓展资源'] || [];
      });
    }
  },
  watch: {
    $route() {
      this.loadData()
    }
  }
}
</script>

<style lang="less">
.list-welfare img {
  max-width: 100%;
}
.nextprev {
  position: fixed;
  bottom: 50px; left: 0; right: 0;
  background-color: #fff;
  height: 40px; line-height: 40px;
  span {
    color: #666;
  }
}
</style>
