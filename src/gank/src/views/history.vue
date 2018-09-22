<template>
  <div class="history">
    <div class="history-update" @click="onRefresh"><span>刷新</span></div>
    <div class="history-list">
      <div class="history-item"
        v-for="(item,index) in list"
        :key="index"
        @click="onItemClick(item)"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  computed: {
    list() {
      return this.$store.state.history
    }
  },
  created() {
    this.$store.dispatch('fetchHistory')
  },
  methods: {
    onItemClick(data) {
      this.$router.push(`/detail/${data.split('-').join('/')}`)
    },
    onRefresh() {
      this.$store.dispatch('fetchHistory', true);
    }
  }
}
</script>

<style lang="less">
.history-list {
  overflow: hidden;
}
.history-item {
  cursor: pointer;
  float: left;
  width: 33.33%;
  text-align: center;
  padding: 5px 0;
  margin: 5px 0;
}
.history-update {
  height: 30px; line-height: 30px; text-align: right;
}
</style>
