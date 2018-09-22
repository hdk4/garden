import api from './core'

// 根据 https://gank.io/api 文档描述构建

// 获取最新一天的干货
export function getToday() {
  return api('/today')
}

// 获取闲读的主分类
export function getXianduCategories () {
  return api('/xiandu/categories')
}

// 获取闲读的子分类
export function getXianduCategory(en_name) {
  return api(`/xiandu/category/${en_name}`)
}

// 获取闲读数据
export function getXianduContent(id, count = 10, page = 1) {
  return api(`/xiandu/data/id/${id}/count/${count}/page/${page}`)
}

// 搜索 API
export function search(keyword, category = 'all', count = 10, page = 1) {
  return api(`/search/query/${keyword}/category/${category}/count/${count}/page/${page}`)
}

// 获取某几日干货网站数据
export function getSpecHistory(num = 1, page = 1) {
  return api(`/history/content/${num}/${page}`)
}

// 获取特定日期网站数据
export function getSpecDay(year, month, day) {
  return api(`/history/content/day/${year}/${month}/${day}`)
}

// 获取发过干货日期接口
export function getList() {
  return api('/day/history')
}

// 支持提交干货到审核区
export function post(data) {
  return api('/add2gank', {
    method: 'post',
    data
  })
}

// 分类数据: http://gank.io/api/data/数据类型/请求个数/第几页
export function getCategoryData(category, num = 10, page = 1) {
  return api(`/data/${category}/${num}/${page}`)
}

// 每日数据： http://gank.io/api/day/年/月/日
export function getDay(year, month, day) {
  return api(`/day/${year}/${month}/${day}`)
}

// 随机数据：http://gank.io/api/random/data/分类/个数
export function getRandom(category, num = 10) {
  return api(`/random/data/${category}/${num}`)
}
