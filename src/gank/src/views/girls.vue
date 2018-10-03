<template>
  <div class="home">
    <div v-for="(item,index) in imgs" :key="index" class="list-item">
      <div class="img-item" @click="onItemClick(item)"><img :src="item.url|url"></div>
      <div class="img-note"><a :href="item.url" target="_blank">查看大图</a></div>
    </div>
    <div class="more" v-if="hasMore" @click="loadMore">{{textMore}}</div>
    <div class="more" v-else-if="hasLoaded">没有更多的信息了</div>
  </div>
</template>

<script>
import {
  getCategoryData,
} from '@/api/gank';

export default {
  name: 'girls',
  data() {
    return {
      imgs: [],
      pageSize: 10,
      pageIndex: 1,
      hasMore: false,
      hasLoaded: false,
      textMore: '加载中...'
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData(reset) {
      this.textMore = '加载中...';
      getCategoryData('福利', this.pageSize, this.pageIndex).then(res => {
        const data = res.results;
        this.hasMore = data.length === this.pageSize;
        this.hasLoaded = true;
        if (reset) {
          this.imgs = data;
        } else {
          this.imgs = this.imgs.concat(data);
        }
        this.textMore = '加载更多...';
      })
    },
    loadMore() {
      this.pageIndex++
      this.loadData()
    },
    onItemClick(data) {
      const desc = data.publishedAt.split('T')[0].split('-').join('/');
      this.$router.push(`/detail/${desc}`)
    }
  }
}
</script>

<style lang="less">
.list-item {
  margin-bottom: 10px;
}
.img-item {
  cursor: pointer;
  img {
    width: 100%;
  }
}
</style>
