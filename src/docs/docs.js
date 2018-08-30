;(function () {

  if (!window.config || !config.url) {
    throw new Error('`config.url` is required!')
  }

  var _repo = config.url.split('/');
  config.owner = _repo[3];
  config.repo = _repo[4];

  // defaults
  config.branch = config.branch || 'master';
  config.rootPath = config.rootPath || '/';
  config.assetPath = config.assetPath || '/';
  config.defaultPage = config.defaultPage || '/README';

  if (config.cache) {
    config.cacheType = config.cache === 1 ? 'sessionStorage' : 'localStorage';
    config.cacheRoot = '__' + config.owner + '/' + config.repo;
  }

  var $content = document.getElementById('content');
  var $navs = document.querySelectorAll('#menu a');
  var $head = document.getElementsByTagName('head')[0];

  var curPage = '';
  var curAnchor = '';

  function setAnchor() {
    $navs.forEach(function (item) {
      var curHref = item.getAttribute('href');
      var isOn = false;
      if (curHref === '#' + curPage || curHref === '#' + curPage + '#' + curAnchor) {
        isOn = true;
      }
      item.className = isOn ? 'on' : '';
    });

    window.scrollTo(0, 0);

    if (curPage && curAnchor) {
      var $anchor = document.getElementById(curAnchor);
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
    var temp = hash.split('#');
    var uri = temp[0];
    curAnchor = temp[1] || '';

    if (curPage && curPage === uri) {
      setAnchor();
      return;
    }

    curPage = uri;

    fetchContent(uri).then(function (content) {
      var raw = decodeURIComponent(escape(window.atob(content)));

      raw = raw.replace(/^(-+)(\n.+)+?(-+)/, ''); // remove front-matter

      var scriptInline = [];
      var scriptLink = [];

      // remove inline raw content
      raw = raw.replace(/\{% *raw *%\}(.+?)\{% *endraw *%\}/g, function (a, b, c) {
        return b + '\n';
      });
      // remove block raw content
      raw = raw.replace(/\{% *raw *%\} *\n((?:.*\n)+?)\ *{% *endraw *%\}/g, function (a, b, c) {
        if (config.scripts) {
          b = b.replace(/<script>\n(.+|\n)+?<\/script>/g, function (item) {
            scriptInline.push(item.replace('<script>', '').replace('</script>', ''));
            return '';
          });
          b = b.replace(/<script .*?src="(.+?)".*?><\/script>/g, function (a, b) {
            // Guarantee each scripts link is unique.
            if (scriptLink.indexOf(b) === -1) {
              scriptLink.push(b);
            }
            return '';
          });
        }
        return b + '\n';
      });

      if (config.filterRAW) {
        raw = config.filterRAW(raw, uri);
      }

      var html = marked(raw, config.markedOptions || {});

      // replace asset path
      html = html.replace(/src="((?!https?:\/\/).+?)"/g, function (a, b) {
        return 'src="' + fetchAssets(b) + '"';
      });

      if (config.filterHTML) {
        html = config.filterHTML(html, uri);
      }

      $content.innerHTML = html;

      if (config.highlight) {
        $content.querySelectorAll('pre code[class]').forEach(function (item) {
          hljs.highlightBlock(item);
        });
      }

      if (config.scripts) {
        console.log(scriptInline);
        console.log(scriptLink);
        if (scriptLink.length === 0) {
          _evalScripts();
        } else {
          var count = 0;
          scriptLink.forEach(function (src) {
            var $script = document.createElement('script');
            $script.src = src;
            $script.onload = function () {
              count++;
              if (count === scriptLink.length) {
                _evalScripts();
              }
            }
            $head.appendChild($script);
          });
        }

        function _evalScripts() {
          scriptInline.forEach(function (script) {
            try {
              eval(script); // WARNING, make sure you know what you do.
            } catch(e) {
              console.error(e);
            }
          });
        }
      }

      setAnchor();
    })

  }

  function fetchContent(filePath, force) {
    var url = 'https://api.github.com/repos/' + config.owner + '/' + config.repo + '/contents' + config.rootPath + filePath;
    if (url.slice(url.length - 3).toLowerCase() !== '.md') {
      url += '.md';
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
