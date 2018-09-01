# Garden

> Yep, it is just an interesting GARDEN.

## Tools

> Under construction...

## Docs

### Depends

- [`marked`](https://github.com/markedjs/marked), render `.md` files.
- [`es6-promise`](https://github.com/stefanpenner/es6-promise), a polyfill for ES6-style Promises.
- [`fetch`](https://github.com/github/fetch), a window.fetch JavaScript polyfill.
- [`highlight.js`](https://github.com/highlightjs/highlight.js), syntax highlighter.
- [atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob), decode. Use [a polyfill](https://github.com/davidchambers/Base64.js) if necessary.

### config

```js
window.config = {
  url: 'https://github.com/hdk4/garden',
  branch: 'master',
  rootPath: '/',
  assetPath: '/',
  defaultPage: 'README.md',
  markedOptions: null,
  highlight: true,
  cache: 1,
  scripts: true,
  filterRAW: null,
  filterHTML: null
};
```

- `url`, **required**, specified the link for the `GitHub` repo.
- `branch`, the `ref` params for [`GitHub` API v3](https://developer.github.com/v3/repos/contents/#get-contents). Default to `master`.
- `rootPath`, the root path for all file to fetch. Default to `/`.
- `assetPath`, when using inner assets, this param can be useful. Default to `/`.
- `defaultPage`, the default page to visit without an available hash. Default to `/README`.
- `markedOptions`, _object_, [options](https://hdk4.com/garden/docs/marked.html#/USING_ADVANCED#options) for `marked`.
- `highlight`, set a truthy value to use highlight for code block within `highlight.js`.
- `cache`, use `Storage` to cache request results or not. Set a falsy value to disable it, set number `1` to use `sesstionStorage`, otherwise `localStorage`.
- `scripts`, enable scripts between `{% raw %}` and `{% endraw %}`.
- `filterRAW`, _function_, filter the raw text before `marked` executes. It's will have two params `raw` and `uri`, `raw` is the text while `uri` is current page path that fetched from `GitHub` just now.
- `filterHTML`, _function_, filter the html content before set it to `content` to render. It's will have two params `html` and `uri`, likewise, `html` is the html content and `uri` is similar to `uri` in `filterRAW`.

### Current Docs

- [marked.js](https://hdk4.com/garden/docs/marked.html)
- [vue 2.x](https://hdk4.com/garden/docs/vue.html)
- [vue 2.x - 中文版](https://hdk4.com/garden/docs/vue_zh.html)，因链接中存在中文未转义或翻译不同步的问题，部分链接跳转可能会失效，建议翻阅上面的英文版。
- [less.js](https://hdk4.com/garden/docs/less.html)

### Special thanks to

- [**marked**](https://github.com/markedjs/marked) and its [documentation](https://marked.js.org), inspired of.
- [Less-To-CSS Playground](http://lesscss.org/less-preview/).
- [`primer`](https://github.com/primer/primer).
- [BootCDN](https://www.bootcdn.cn/).
- [PLACEHOLDER.COM](https://placeholder.com).
