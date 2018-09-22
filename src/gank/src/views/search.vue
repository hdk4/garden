<template>
  <div class="search">
    <div class="search-input">
      <input v-model="keyword" placeholder="请输入关键字">
      <span @click="onSearch" :class="{on: keyword}">搜索</span>
    </div>
    <z-category v-model="cat" :list="cats"></z-category>
    <z-list class="mt10" :list="listData"></z-list>
    <div class="more" v-if="hasMore" @click="loadMore">{{textMore}}</div>
    <div class="more" v-else-if="hasLoaded">没有更多的信息了</div>
  </div>
</template>

<script>
import {
  search,
} from '@/api/gank';
export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      cats: [
        'all',
        'Android',
        'iOS',
        '前端',
        '休息视频',
        '瞎推荐',
        '拓展资源',
        'App'
      ],
      cat: 'all',

      listData: [],
      pageSize: 10,
      pageIndex: 1,
      hasMore: false,
      hasLoaded: false,
      textMore: '加载中...',
    }
  },
  methods: {
    loadData(reset) {
      if (this.keyword) {
        this.textMore = '加载中...';
        search(this.keyword, this.cat, this.pageSize, this.pageIndex).then(res => {
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
      }
    },
    loadMore() {
      this.pageIndex++
      this.loadData()
    },
    onSearch() {
      this.pageIndex = 1;
      this.loadData(true)
    }
  }
}
</script>

<style lang="less">
.search-input {
  display: flex;
  margin-bottom: 10px;
  height: 30px; line-height: 30px;
  input {
    flex: 1;
    border: 1px solid #ccc;
    padding: 5px;
  }
  span {
    width: 80px;
    text-align: center;
    color: #ddd;
    &.on {
      color: #000;
    }
  }
}
</style>
