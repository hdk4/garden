<template>
  <div class="category-box">
    <div class="category-list" v-for="(item,index) in all" :key="index">
      <div class="category-item"
        v-for="(cat,cIndex) in item"
        :key="cIndex"
        :class="{on:curCat===cat}"
        @click="onItemClick(cat)"
      >{{cat==='all'?'全部':cat}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-category',
  props: {
    list: Array,
    value: String
  },
  data() {
    return {
      all: [],
      curCat: '',
    }
  },
  created() {
    this.curCat = this.value;
    const all = [];
    for (let i = 0; i < this.list.length; i+= 4) {
      const item = this.list.slice(i, i + 4);
      item.length = 4;
      all.push(item);
    }
    this.all = all;
  },
  methods: {
    onItemClick(data) {
      if (data) {
        this.curCat = data;
      }
    }
  },
  watch: {
    curCat(v) {
      this.$emit('input', v);
    },
    // value(v) {
    //   this.curCat = v;
    // }
  }
}
</script>
