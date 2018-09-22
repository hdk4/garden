<template>
  <div class="category">
    <z-category v-model="cat" :list="cats"></z-category>
    <z-list class="mt10" :list="listData"></z-list>
    <div class="more" v-if="hasMore" @click="loadMore">{{textMore}}</div>
    <div class="more" v-else-if="hasLoaded">没有更多的信息了</div>
  </div>
</template>

<script>
import {
  getCategoryData,
} from '@/api/gank';
export default {
  name: 'category',
  data() {
    return {
      listData: [],
      pageSize: 10,
      pageIndex: 1,
      hasMore: false,
      hasLoaded: false,
      textMore: '加载中...',

      cats: [
        'Android',
        'iOS',
        '前端',
        '瞎推荐',
        '休息视频',
        'App',
        '拓展资源'
      ],
      cat: 'Android'
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData(reset) {
      this.textMore = '加载中...';
      getCategoryData(this.cat, this.pageSize, this.pageIndex).then(res => {
        const data = res.results;
        this.hasMore = data.length === this.pageSize;
        this.hasLoaded = true;
        if (reset) {
          this.listData = data;
        } else {
          this.listData = this.listData.concat(data);
        }
        this.textMore = '加载更多...';
      })
    },
    loadMore() {
      this.pageIndex++
      this.loadData()
    },
  },
  watch: {
    cat() {
      this.pageIndex = 1;
      this.loadData(true)
    }
  }
}
</script>

<style lang="less">

</style>
