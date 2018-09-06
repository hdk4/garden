# Garden

> Yep, it is just an interesting GARDEN.

## Tools

> Under construction...

## Docs

> Fetch the documentation files from `GitHub` and then render them.

### Depends

- [`marked`](https://github.com/markedjs/marked), render `.md` files.
- [`es6-promise`](https://github.com/stefanpenner/es6-promise), a polyfill for ES6-style Promises.
- [`fetch`](https://github.com/github/fetch), a window.fetch JavaScript polyfill.
- [`highlight.js`](https://github.com/highlightjs/highlight.js), syntax highlighter.
- [atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob), decode. Use [a polyfill](https://github.com/davidchambers/Base64.js) if necessary.

### Config

```js
window.config = {
  url: 'https://github.com/hdk4/garden',
  branch: 'master',
  rootPath: '/',
  assetPath: '/',
  defaultPage: '/README',
  fileExt: '.md',
  markedOptions: null,
  cache: 1,
  ...
};
```

- `url`, **required**, specified the link for the `GitHub` repo.
- `branch`, the `ref` params for [`GitHub` API v3](https://developer.github.com/v3/repos/contents/#get-contents). Default to `master`.
- `rootPath`, the root path for all file to fetch. Default to `/`.
- `assetPath`, when using inner assets, this param can be useful. Default to `/`.
- `defaultPage`, the default page to visit without an available hash. Default to `/README`.
- `fileExt`, if the file path does not have a file extension, append it to the path. Default to `.md`, **if it is not a string**.
- `markedOptions`, _object_, [options](https://hdk4.com/garden/docs/marked.html#/USING_ADVANCED#options) for `marked`.
- `cache`, use `Storage` to cache request results or not. Set a falsy value to disable it, set number `1` to use `sesstionStorage`, otherwise `localStorage`.
- `cachePrefix`, available only when `cache` is a truthy value. Cache name's prefix for `Storage`. Default to `__`.
- `keepFrontMatter`, set this to `true` to avoid remove the front-matter content.
- `mapLink`, _object_, a map data for inner link.
- `filterRaw`, _function_, filter the raw text before `marked` executes. It's will have two params `raw` and `uri`, `raw` is the text while `uri` is current page path that fetched from `GitHub` just now.
- `filterHTML`, _function_, filter the html content before set it to `content` to render. It's will have two params `html` and `uri`, likewise, `html` is the html content and `uri` is similar to `uri` in `filterRaw`.
- `filterLink`, _function_, filter the internal link. It's will have two params `link` and `uri`, `link` is the `href` value from `<a>`; for `uri`, see above.
- `filterAsset`, _function_, filter the asset source, the same as `filterLink`.
- `onReady`, _function_, excute while the job is done.

### Current docs

- [marked.js](https://hdk4.com/garden/docs/marked.html)
- [vue 2.x](https://hdk4.com/garden/docs/vue.html), [Chinese](https://hdk4.com/garden/docs/vue_zh.html)
- [less.js](https://hdk4.com/garden/docs/less.html)
- [pug](https://hdk4.com/garden/docs/pug.html), [Chinese](https://hdk4.com/garden/docs/pug_zh.html)
- [webpack 4](https://hdk4.com/garden/docs/webpack.html)
- [lodash v4.17.10](https://hdk4.com/garden/docs/lodash.html)

> Caution: While using Chinese, due to the encode/decode problems, some links maybe **invalid**. There is no plans to fixed it, just visit the English documentation alternatively.

### Special thanks to

- [**marked**](https://github.com/markedjs/marked) and its [documentation](https://marked.js.org), inspired of.
- [Less-To-CSS Playground](http://lesscss.org/less-preview/).
- [`primer`](https://github.com/primer/primer).
- [BootCDN](https://www.bootcdn.cn/).
- [PLACEHOLDER.COM](https://placeholder.com).
