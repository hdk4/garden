// 数字转千分符
export function toThousand(v, sep = ',') {
  if (Number(v)) {
    return String(v).trim().replace(/^(\d+)((\.\d+)?)$/, function (_, a, b) {
      return a.replace(/(\d)(?=(?:\d{3})+$)/g, function (x) { return x + sep }) + b;
    });
  }
  // 数值换转失败则原值返回
  return v;
}

// 提升新浪资源图片
export function url(v) {
  if (v.indexOf('sinaimg') !== -1) {
    return v.replace(/^http:\/\//, 'https://');
  } else {
    return v;
  }
}
