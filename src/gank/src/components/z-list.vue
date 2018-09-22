<template>
  <div class="detail-box">
    <h3 v-if="name">{{name}}</h3>
    <ul>
      <li v-for="(item,index) in list" :key="index" class="list-item">
        <a :href="item.url" target="_blank">{{item.desc}}</a>
        <div class="list-imgs" v-if="item.images && item.images.length > 0">
          <img v-for="(img,index2) in item.images" :key="index2" :src="img|url">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'z-list',
  props: {
    name: String,
    list: Array
  }
}
</script>
