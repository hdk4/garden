
// fix window.atob
// https://github.com/davidchambers/Base64.js
if (!window.atob) {
  window.atob = function (input) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }
}

// default highlighter
marked.defaults.highlight = function (code, lang) {
  if (!lang) {
    return code;
  }
  try {
    code = hljs.highlight(lang, code).value;
  } catch(e) {
    console.error(e);
  }
  return code;
};

;(function () {

  if (!window.config || !config.url) {
    throw new Error('`config.url` is required!');
  }

  var windowHeight = window.innerHeight || document.documentElement.offsetHeight || document.body.offsetHeight;
  var windowWidth = window.innerWidth || document.documentElement.offsetWidth || document.body.offsetWidth;

  // set height
  (function () {
    var $temp = document.getElementById('main').children;
    var height = (windowHeight - 100) + 'px';
    for (var i = 0; i < $temp.length; i++) {
      $temp[i].style.height = height;
    }
  })();

  var $menu = document.getElementById('menu');
  var $expand = document.getElementById('expand');

  if (config.noMenu) {
    if ($menu) {
      $menu.parentNode.removeChild($menu)
    }
    if ($expand) {
      $expand.parentNode.removeChild($expand)
    }
  } else {
    $expand.onclick = function () {
      var isShow = $menu.className === 'show';
      $menu.className = isShow ? 'hide' : 'show';
    };
  }

  var _repo = config.url.split('/');
  config.owner = _repo[3];
  config.repo = _repo[4];

  var $loading = document.createElement('div');
  $loading.id = 'loading';

  // defaults
  config.branch = config.branch || 'master';
  config.rootPath = config.rootPath || '/';
  config.assetPath = config.assetPath || '/';
  config.defaultPage = config.defaultPage || '/README';
  config.cachePrefix = config.cachePrefix || '__';
  if (typeof config.fileExt !== 'string') {
    config.fileExt = '.md';
  }

  if (config.cache) {
    config.cacheType = config.cache === 1 ? 'sessionStorage' : 'localStorage';
    config.cacheRoot = config.cachePrefix + config.branch + ':' + config.owner + '/' + config.repo;
  }

  var $content = document.getElementById('content');

  var curPage = '';
  var curAnchor = '';

  var isPageChange = false;

  function setAnchor() {
    if (config.noMenu) {
      return
    }

    var $navs = $menu.querySelectorAll('a');
    $navs.forEach(function (item) {
      var curHref = item.getAttribute('href');
      var isOn = false;
      if (
        curHref === '#' + curPage ||
        curHref === '#' + curPage + '#' + curAnchor ||
        (curPage === config.defaultPage && curHref === '#' + curAnchor)
      ) {
        isOn = true;
      }
      item.className = isOn ? 'on' : '';
      if (isOn && isPageChange) {
        isPageChange = false;
        item.scrollIntoView()
      }
    });

    $content.scrollTo(0, 0);

    if (windowWidth <= 800) {
      $menu.className = 'hide';
      window.scrollTo(0, 0);
    }

    if (curPage && curAnchor) {
      var $anchor = document.getElementById(curAnchor) || document.getElementsByName(curAnchor)[0];
      if ($anchor) {
        $anchor.scrollIntoView();
      }
    }
  }

  function hashChange() {
    var hash = window.location.hash.slice(1);
    if (!hash) {
      hash = config.defaultPage;
    }

    if (hash[0] === '/') {
      var temp = hash.split('#');
      var uri = temp[0];
      curAnchor = temp[1] || '';
    } else {
      uri = config.defaultPage;
      curAnchor = hash;
    }

    if (curPage && curPage === uri) {
      setAnchor();
      return;
    }

    isPageChange = true;

    curPage = uri;

    document.body.appendChild($loading);

    fetchContent(uri).then(function (content) {

      document.body.removeChild($loading);

      var raw = decodeURIComponent(escape(window.atob(content)));

      if (!config.keepFrontMatter) {
        // remove front-matter
        // https://github.com/jxson/front-matter/blob/master/index.js#L3
        raw = raw.replace(/^(\ufeff?(= yaml =|---)$([\s\S]*?)^(?:\2|\.\.\.)$(?:\n)?)/m, '');
      }

      if (config.filterRaw) {
        raw = config.filterRaw(raw, uri);
      }

      var html = marked(raw, config.markedOptions || {});

      if (config.filterHTML) {
        html = config.filterHTML(html, uri);
      }

      // replace asset path
      html = html.replace(/src="((?!https?:\/\/|ftp\:\/\/).+?)"/g, function (a, b) {
        var src = config.filterAsset && config.filterAsset(b, uri) || fetchAssets(b);
        return 'src="' + src + '"';
      });

      if (config.mapLink || config.filterLink) {
        html = html.replace(/href="(?!https?:\/\/|mailto)(.+?)"/g, function (a, b) {
          var link = config.mapLink && config.mapLink[b] || config.filterLink && config.filterLink(b, uri) || b;
          return 'href="' + link + '"';
        });
      }

      $content.innerHTML = html;

      if (config.onReady) {
        config.onReady(html, uri);
      }

      setAnchor();
    }).catch(function (error) {
      console.error(error);
      document.body.removeChild($loading);
    });

  }

  function fetchContent(filePath, force) {
    var url = 'https://api.github.com/repos/' + config.owner + '/' + config.repo + '/contents' + config.rootPath + filePath;
    if (!/\.\w+$/.test(url)) {
      url += config.fileExt;
    }
    url += '?ref=' + config.branch;

    if (config.cache && !force) {
      var cacheContent = window[config.cacheType].getItem(config.cacheRoot + filePath);
      if (cacheContent) {
        return Promise.resolve(cacheContent)
      }
    }

    return new Promise(function (resolve, reject) {

      fetch(url).then(function (res) {
        return res.json();
      }).then(function (data) {
        var content = data.content;

        if (config.cache && content) {
          window[config.cacheType].setItem(config.cacheRoot + filePath, content);
        }

        resolve(content);

      }).catch(function (error) {
        reject(error);
      });
    });
  }

  function fetchAssets(filePath) {
    return 'https://raw.githubusercontent.com/' + config.owner + '/' + config.repo + '/' + config.branch + config.assetPath + filePath;
  }

  window.addEventListener('hashchange', function (e) {
    e.preventDefault();
    hashChange();
  });

  hashChange();
})();
