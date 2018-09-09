"format register";
System.register("github:webcomponents/webcomponentsjs@0.6.3/HTMLImports.min", [], !1, function(e, t, n) {
    return System.get("@@global-helpers").prepareGlobal(n.id, []),
    function() {
        "undefined" == typeof WeakMap && !function() {
            var e = Object.defineProperty
              , t = Date.now() % 1e9
              , n = function() {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + (t++ + "__")
            }
            ;
            n.prototype = {
                set: function(t, n) {
                    var r = t[this.name];
                    return r && r[0] === t ? r[1] = n : e(t, this.name, {
                        value: [t, n],
                        writable: !0
                    }),
                    this
                },
                get: function(e) {
                    var t;
                    return (t = e[this.name]) && t[0] === e ? t[1] : void 0
                },
                "delete": function(e) {
                    var t = e[this.name];
                    return t && t[0] === e ? (t[0] = t[1] = void 0,
                    !0) : !1
                },
                has: function(e) {
                    var t = e[this.name];
                    return t ? t[0] === e : !1
                }
            },
            window.WeakMap = n
        }(),
        function(e) {
            function t(e) {
                w.push(e),
                b || (b = !0,
                m(r))
            }
            function n(e) {
                return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e
            }
            function r() {
                b = !1;
                var e = w;
                w = [],
                e.sort(function(e, t) {
                    return e.uid_ - t.uid_
                });
                var t = !1;
                e.forEach(function(e) {
                    var n = e.takeRecords();
                    i(e),
                    n.length && (e.callback_(n, e),
                    t = !0)
                }),
                t && r()
            }
            function i(e) {
                e.nodes_.forEach(function(t) {
                    var n = g.get(t);
                    n && n.forEach(function(t) {
                        t.observer === e && t.removeTransientObservers()
                    })
                })
            }
            function o(e, t) {
                for (var n = e; n; n = n.parentNode) {
                    var r = g.get(n);
                    if (r)
                        for (var i = 0; i < r.length; i++) {
                            var o = r[i]
                              , s = o.options;
                            if (n === e || s.subtree) {
                                var a = t(s);
                                a && o.enqueue(a)
                            }
                        }
                }
            }
            function s(e) {
                this.callback_ = e,
                this.nodes_ = [],
                this.records_ = [],
                this.uid_ = ++x
            }
            function a(e, t) {
                this.type = e,
                this.target = t,
                this.addedNodes = [],
                this.removedNodes = [],
                this.previousSibling = null ,
                this.nextSibling = null ,
                this.attributeName = null ,
                this.attributeNamespace = null ,
                this.oldValue = null
            }
            function l(e) {
                var t = new a(e.type,e.target);
                return t.addedNodes = e.addedNodes.slice(),
                t.removedNodes = e.removedNodes.slice(),
                t.previousSibling = e.previousSibling,
                t.nextSibling = e.nextSibling,
                t.attributeName = e.attributeName,
                t.attributeNamespace = e.attributeNamespace,
                t.oldValue = e.oldValue,
                t
            }
            function u(e, t) {
                return k = new a(e,t)
            }
            function c(e) {
                return j ? j : (j = l(k),
                j.oldValue = e,
                j)
            }
            function d() {
                k = j = void 0
            }
            function h(e) {
                return e === j || e === k
            }
            function p(e, t) {
                return e === t ? e : j && h(e) ? j : null
            }
            function f(e, t, n) {
                this.observer = e,
                this.target = t,
                this.options = n,
                this.transientObservedNodes = []
            }
            var m, g = new WeakMap;
            if (/Trident|Edge/.test(navigator.userAgent))
                m = setTimeout;
            else if (window.setImmediate)
                m = window.setImmediate;
            else {
                var v = []
                  , y = String(Math.random());
                window.addEventListener("message", function(e) {
                    if (e.data === y) {
                        var t = v;
                        v = [],
                        t.forEach(function(e) {
                            e()
                        })
                    }
                }),
                m = function(e) {
                    v.push(e),
                    window.postMessage(y, "*")
                }
            }
            var b = !1
              , w = []
              , x = 0;
            s.prototype = {
                observe: function(e, t) {
                    if (e = n(e),
                    !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData)
                        throw new SyntaxError;
                    var r = g.get(e);
                    r || g.set(e, r = []);
                    for (var i, o = 0; o < r.length; o++)
                        if (r[o].observer === this) {
                            i = r[o],
                            i.removeListeners(),
                            i.options = t;
                            break
                        }
                    i || (i = new f(this,e,t),
                    r.push(i),
                    this.nodes_.push(e)),
                    i.addListeners()
                },
                disconnect: function() {
                    this.nodes_.forEach(function(e) {
                        for (var t = g.get(e), n = 0; n < t.length; n++) {
                            var r = t[n];
                            if (r.observer === this) {
                                r.removeListeners(),
                                t.splice(n, 1);
                                break
                            }
                        }
                    }, this),
                    this.records_ = []
                },
                takeRecords: function() {
                    var e = this.records_;
                    return this.records_ = [],
                    e
                }
            };
            var k, j;
            f.prototype = {
                enqueue: function(e) {
                    var n = this.observer.records_
                      , r = n.length;
                    if (n.length > 0) {
                        var i = n[r - 1]
                          , o = p(i, e);
                        if (o)
                            return void (n[r - 1] = o)
                    } else
                        t(this.observer);
                    n[r] = e
                },
                addListeners: function() {
                    this.addListeners_(this.target)
                },
                addListeners_: function(e) {
                    var t = this.options;
                    t.attributes && e.addEventListener("DOMAttrModified", this, !0),
                    t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0),
                    t.childList && e.addEventListener("DOMNodeInserted", this, !0),
                    (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0)
                },
                removeListeners: function() {
                    this.removeListeners_(this.target)
                },
                removeListeners_: function(e) {
                    var t = this.options;
                    t.attributes && e.removeEventListener("DOMAttrModified", this, !0),
                    t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0),
                    t.childList && e.removeEventListener("DOMNodeInserted", this, !0),
                    (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0)
                },
                addTransientObserver: function(e) {
                    if (e !== this.target) {
                        this.addListeners_(e),
                        this.transientObservedNodes.push(e);
                        var t = g.get(e);
                        t || g.set(e, t = []),
                        t.push(this)
                    }
                },
                removeTransientObservers: function() {
                    var e = this.transientObservedNodes;
                    this.transientObservedNodes = [],
                    e.forEach(function(e) {
                        this.removeListeners_(e);
                        for (var t = g.get(e), n = 0; n < t.length; n++)
                            if (t[n] === this) {
                                t.splice(n, 1);
                                break
                            }
                    }, this)
                },
                handleEvent: function(e) {
                    switch (e.stopImmediatePropagation(),
                    e.type) {
                    case "DOMAttrModified":
                        var t = e.attrName
                          , n = e.relatedNode.namespaceURI
                          , r = e.target
                          , i = new u("attributes",r);
                        i.attributeName = t,
                        i.attributeNamespace = n;
                        var s = e.attrChange === MutationEvent.ADDITION ? null  : e.prevValue;
                        o(r, function(e) {
                            return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? c(s) : i
                        });
                        break;
                    case "DOMCharacterDataModified":
                        var r = e.target
                          , i = u("characterData", r)
                          , s = e.prevValue;
                        o(r, function(e) {
                            return e.characterData ? e.characterDataOldValue ? c(s) : i : void 0
                        });
                        break;
                    case "DOMNodeRemoved":
                        this.addTransientObserver(e.target);
                    case "DOMNodeInserted":
                        var a, l, h = e.target;
                        "DOMNodeInserted" === e.type ? (a = [h],
                        l = []) : (a = [],
                        l = [h]);
                        var p = h.previousSibling
                          , f = h.nextSibling
                          , i = u("childList", e.target.parentNode);
                        i.addedNodes = a,
                        i.removedNodes = l,
                        i.previousSibling = p,
                        i.nextSibling = f,
                        o(e.relatedNode, function(e) {
                            return e.childList ? i : void 0
                        })
                    }
                    d()
                }
            },
            e.JsMutationObserver = s,
            e.MutationObserver || (e.MutationObserver = s)
        }(this),
        window.HTMLImports = window.HTMLImports || {
            flags: {}
        },
        function(e) {
            function t(e, t) {
                t = t || f,
                r(function() {
                    o(e, t)
                }, t)
            }
            function n(e) {
                return "complete" === e.readyState || e.readyState === v
            }
            function r(e, t) {
                if (n(t))
                    e && e();
                else {
                    var i = function() {
                        ("complete" === t.readyState || t.readyState === v) && (t.removeEventListener(y, i),
                        r(e, t))
                    }
                    ;
                    t.addEventListener(y, i)
                }
            }
            function i(e) {
                e.target.__loaded = !0
            }
            function o(e, t) {
                function n() {
                    l == u && e && e({
                        allImports: a,
                        loadedImports: c,
                        errorImports: d
                    })
                }
                function r(e) {
                    i(e),
                    c.push(this),
                    l++,
                    n()
                }
                function o(e) {
                    d.push(this),
                    l++,
                    n()
                }
                var a = t.querySelectorAll("link[rel=import]")
                  , l = 0
                  , u = a.length
                  , c = []
                  , d = [];
                if (u)
                    for (var h, p = 0; u > p && (h = a[p]); p++)
                        s(h) ? (l++,
                        n()) : (h.addEventListener("load", r),
                        h.addEventListener("error", o));
                else
                    n()
            }
            function s(e) {
                return d ? e.__loaded || e["import"] && "loading" !== e["import"].readyState : e.__importParsed
            }
            function a(e) {
                for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
                    l(t) && u(t)
            }
            function l(e) {
                return "link" === e.localName && "import" === e.rel
            }
            function u(e) {
                var t = e["import"];
                t ? i({
                    target: e
                }) : (e.addEventListener("load", i),
                e.addEventListener("error", i))
            }
            var c = "import"
              , d = Boolean(c in document.createElement("link"))
              , h = Boolean(window.ShadowDOMPolyfill)
              , p = function(e) {
                return h ? ShadowDOMPolyfill.wrapIfNeeded(e) : e
            }
              , f = p(document)
              , m = {
                get: function() {
                    var e = HTMLImports.currentScript || document.currentScript || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null );
                    return p(e)
                },
                configurable: !0
            };
            Object.defineProperty(document, "_currentScript", m),
            Object.defineProperty(f, "_currentScript", m);
            var g = /Trident|Edge/.test(navigator.userAgent)
              , v = g ? "complete" : "interactive"
              , y = "readystatechange";
            d && (new MutationObserver(function(e) {
                for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
                    t.addedNodes && a(t.addedNodes)
            }
            ).observe(document.head, {
                childList: !0
            }),
            function() {
                if ("loading" === document.readyState)
                    for (var e, t = document.querySelectorAll("link[rel=import]"), n = 0, r = t.length; r > n && (e = t[n]); n++)
                        u(e)
            }()),
            t(function(e) {
                HTMLImports.ready = !0,
                HTMLImports.readyTime = (new Date).getTime();
                var t = f.createEvent("CustomEvent");
                t.initCustomEvent("HTMLImportsLoaded", !0, !0, e),
                f.dispatchEvent(t)
            }),
            e.IMPORT_LINK_TYPE = c,
            e.useNative = d,
            e.rootDocument = f,
            e.whenReady = t,
            e.isIE = g
        }(HTMLImports),
        function(e) {
            var t = []
              , n = function(e) {
                t.push(e)
            }
              , r = function() {
                t.forEach(function(t) {
                    t(e)
                })
            }
            ;
            e.addModule = n,
            e.initializeModules = r
        }(HTMLImports),
        HTMLImports.addModule(function(e) {
            var t = /(url\()([^)]*)(\))/g
              , n = /(@import[\s]+(?!url\())([^;]*)(;)/g
              , r = {
                resolveUrlsInStyle: function(e, t) {
                    var n = e.ownerDocument
                      , r = n.createElement("a");
                    return e.textContent = this.resolveUrlsInCssText(e.textContent, t, r),
                    e
                },
                resolveUrlsInCssText: function(e, r, i) {
                    var o = this.replaceUrls(e, i, r, t);
                    return o = this.replaceUrls(o, i, r, n)
                },
                replaceUrls: function(e, t, n, r) {
                    return e.replace(r, function(e, r, i, o) {
                        var s = i.replace(/["']/g, "");
                        return n && (s = new URL(s,n).href),
                        t.href = s,
                        s = t.href,
                        r + "'" + s + "'" + o
                    })
                }
            };
            e.path = r
        }),
        HTMLImports.addModule(function(e) {
            var t = {
                async: !0,
                ok: function(e) {
                    return e.status >= 200 && e.status < 300 || 304 === e.status || 0 === e.status
                },
                load: function(n, r, i) {
                    var o = new XMLHttpRequest;
                    return (e.flags.debug || e.flags.bust) && (n += "?" + Math.random()),
                    o.open("GET", n, t.async),
                    o.addEventListener("readystatechange", function(e) {
                        if (4 === o.readyState) {
                            var n = o.getResponseHeader("Location")
                              , s = null ;
                            if (n)
                                var s = "/" === n.substr(0, 1) ? location.origin + n : n;
                            r.call(i, !t.ok(o) && o, o.response || o.responseText, s)
                        }
                    }),
                    o.send(),
                    o
                },
                loadDocument: function(e, t, n) {
                    this.load(e, t, n).responseType = "document"
                }
            };
            e.xhr = t
        }),
        HTMLImports.addModule(function(e) {
            var t = e.xhr
              , n = e.flags
              , r = function(e, t) {
                this.cache = {},
                this.onload = e,
                this.oncomplete = t,
                this.inflight = 0,
                this.pending = {}
            }
            ;
            r.prototype = {
                addNodes: function(e) {
                    this.inflight += e.length;
                    for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
                        this.require(t);
                    this.checkDone()
                },
                addNode: function(e) {
                    this.inflight++,
                    this.require(e),
                    this.checkDone()
                },
                require: function(e) {
                    var t = e.src || e.href;
                    e.__nodeUrl = t,
                    this.dedupe(t, e) || this.fetch(t, e)
                },
                dedupe: function(e, t) {
                    return this.pending[e] ? (this.pending[e].push(t),
                    !0) : this.cache[e] ? (this.onload(e, t, this.cache[e]),
                    this.tail(),
                    !0) : (this.pending[e] = [t],
                    !1)
                },
                fetch: function(e, r) {
                    if (n.load && console.log("fetch", e, r),
                    e)
                        if (e.match(/^data:/)) {
                            var i = e.split(",")
                              , o = i[0]
                              , s = i[1];
                            s = o.indexOf(";base64") > -1 ? atob(s) : decodeURIComponent(s),
                            setTimeout(function() {
                                this.receive(e, r, null , s)
                            }
                            .bind(this), 0)
                        } else {
                            var a = function(t, n, i) {
                                this.receive(e, r, t, n, i)
                            }
                            .bind(this);
                            t.load(e, a)
                        }
                    else
                        setTimeout(function() {
                            this.receive(e, r, {
                                error: "href must be specified"
                            }, null )
                        }
                        .bind(this), 0)
                },
                receive: function(e, t, n, r, i) {
                    this.cache[e] = r;
                    for (var o, s = this.pending[e], a = 0, l = s.length; l > a && (o = s[a]); a++)
                        this.onload(e, o, r, n, i),
                        this.tail();
                    this.pending[e] = null
                },
                tail: function() {
                    --this.inflight,
                    this.checkDone()
                },
                checkDone: function() {
                    this.inflight || this.oncomplete()
                }
            },
            e.Loader = r
        }),
        HTMLImports.addModule(function(e) {
            var t = function(e) {
                this.addCallback = e,
                this.mo = new MutationObserver(this.handler.bind(this))
            }
            ;
            t.prototype = {
                handler: function(e) {
                    for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
                        "childList" === t.type && t.addedNodes.length && this.addedNodes(t.addedNodes)
                },
                addedNodes: function(e) {
                    this.addCallback && this.addCallback(e);
                    for (var t, n = 0, r = e.length; r > n && (t = e[n]); n++)
                        t.children && t.children.length && this.addedNodes(t.children)
                },
                observe: function(e) {
                    this.mo.observe(e, {
                        childList: !0,
                        subtree: !0
                    })
                }
            },
            e.Observer = t
        }),
        HTMLImports.addModule(function(e) {
            function t(e) {
                return "link" === e.localName && e.rel === c
            }
            function n(e) {
                var t = r(e);
                return "data:text/javascript;charset=utf-8," + encodeURIComponent(t)
            }
            function r(e) {
                return e.textContent + i(e)
            }
            function i(e) {
                var t = e.ownerDocument;
                t.__importedScripts = t.__importedScripts || 0;
                var n = e.ownerDocument.baseURI
                  , r = t.__importedScripts ? "-" + t.__importedScripts : "";
                return t.__importedScripts++,
                "\n//# sourceURL=" + n + r + ".js\n"
            }
            function o(e) {
                var t = e.ownerDocument.createElement("style");
                return t.textContent = e.textContent,
                s.resolveUrlsInStyle(t),
                t
            }
            var s = e.path
              , a = e.rootDocument
              , l = e.flags
              , u = e.isIE
              , c = e.IMPORT_LINK_TYPE
              , d = "link[rel=" + c + "]"
              , h = {
                documentSelectors: d,
                importsSelectors: [d, "link[rel=stylesheet]", "style", "script:not([type])", 'script[type="text/javascript"]'].join(","),
                map: {
                    link: "parseLink",
                    script: "parseScript",
                    style: "parseStyle"
                },
                dynamicElements: [],
                parseNext: function() {
                    var e = this.nextToParse();
                    e && this.parse(e)
                },
                parse: function(e) {
                    if (this.isParsed(e))
                        return void (l.parse && console.log("[%s] is already parsed", e.localName));
                    var t = this[this.map[e.localName]];
                    t && (this.markParsing(e),
                    t.call(this, e))
                },
                parseDynamic: function(e, t) {
                    this.dynamicElements.push(e),
                    t || this.parseNext()
                },
                markParsing: function(e) {
                    l.parse && console.log("parsing", e),
                    this.parsingElement = e
                },
                markParsingComplete: function(e) {
                    e.__importParsed = !0,
                    this.markDynamicParsingComplete(e),
                    e.__importElement && (e.__importElement.__importParsed = !0,
                    this.markDynamicParsingComplete(e.__importElement)),
                    this.parsingElement = null ,
                    l.parse && console.log("completed", e)
                },
                markDynamicParsingComplete: function(e) {
                    var t = this.dynamicElements.indexOf(e);
                    t >= 0 && this.dynamicElements.splice(t, 1)
                },
                parseImport: function(e) {
                    if (HTMLImports.__importsParsingHook && HTMLImports.__importsParsingHook(e),
                    e["import"] && (e["import"].__importParsed = !0),
                    this.markParsingComplete(e),
                    e.dispatchEvent(e.__resource && !e.__error ? new CustomEvent("load",{
                        bubbles: !1
                    }) : new CustomEvent("error",{
                        bubbles: !1
                    })),
                    e.__pending)
                        for (var t; e.__pending.length; )
                            t = e.__pending.shift(),
                            t && t({
                                target: e
                            });
                    this.parseNext()
                },
                parseLink: function(e) {
                    t(e) ? this.parseImport(e) : (e.href = e.href,
                    this.parseGeneric(e))
                },
                parseStyle: function(e) {
                    var t = e;
                    e = o(e),
                    t.__appliedElement = e,
                    e.__importElement = t,
                    this.parseGeneric(e)
                },
                parseGeneric: function(e) {
                    this.trackElement(e),
                    this.addElementToDocument(e)
                },
                rootImportForElement: function(e) {
                    for (var t = e; t.ownerDocument.__importLink; )
                        t = t.ownerDocument.__importLink;
                    return t
                },
                addElementToDocument: function(e) {
                    var t = this.rootImportForElement(e.__importElement || e);
                    t.parentNode.insertBefore(e, t)
                },
                trackElement: function(e, t) {
                    var n = this
                      , r = function(r) {
                        t && t(r),
                        n.markParsingComplete(e),
                        n.parseNext()
                    }
                    ;
                    if (e.addEventListener("load", r),
                    e.addEventListener("error", r),
                    u && "style" === e.localName) {
                        var i = !1;
                        if (-1 == e.textContent.indexOf("@import"))
                            i = !0;
                        else if (e.sheet) {
                            i = !0;
                            for (var o, s = e.sheet.cssRules, a = s ? s.length : 0, l = 0; a > l && (o = s[l]); l++)
                                o.type === CSSRule.IMPORT_RULE && (i = i && Boolean(o.styleSheet))
                        }
                        i && e.dispatchEvent(new CustomEvent("load",{
                            bubbles: !1
                        }))
                    }
                },
                parseScript: function(t) {
                    var r = document.createElement("script");
                    r.__importElement = t,
                    r.src = t.src ? t.src : n(t),
                    e.currentScript = t,
                    this.trackElement(r, function(t) {
                        r.parentNode.removeChild(r),
                        e.currentScript = null
                    }),
                    this.addElementToDocument(r)
                },
                nextToParse: function() {
                    return this._mayParse = [],
                    !this.parsingElement && (this.nextToParseInDoc(a) || this.nextToParseDynamic())
                },
                nextToParseInDoc: function(e, n) {
                    if (e && this._mayParse.indexOf(e) < 0) {
                        this._mayParse.push(e);
                        for (var r, i = e.querySelectorAll(this.parseSelectorsForNode(e)), o = 0, s = i.length; s > o && (r = i[o]); o++)
                            if (!this.isParsed(r))
                                return this.hasResource(r) ? t(r) ? this.nextToParseInDoc(r["import"], r) : r : void 0
                    }
                    return n
                },
                nextToParseDynamic: function() {
                    return this.dynamicElements[0]
                },
                parseSelectorsForNode: function(e) {
                    var t = e.ownerDocument || e;
                    return t === a ? this.documentSelectors : this.importsSelectors
                },
                isParsed: function(e) {
                    return e.__importParsed
                },
                needsDynamicParsing: function(e) {
                    return this.dynamicElements.indexOf(e) >= 0
                },
                hasResource: function(e) {
                    return t(e) && void 0 === e["import"] ? !1 : !0
                }
            };
            e.parser = h,
            e.IMPORT_SELECTOR = d
        }),
        HTMLImports.addModule(function(e) {
            function t(e) {
                return n(e, s)
            }
            function n(e, t) {
                return "link" === e.localName && e.getAttribute("rel") === t
            }
            function r(e) {
                return !!Object.getOwnPropertyDescriptor(e, "baseURI")
            }
            function i(e, t) {
                var n = document.implementation.createHTMLDocument(s);
                n._URL = t;
                var i = n.createElement("base");
                i.setAttribute("href", t),
                n.baseURI || r(n) || Object.defineProperty(n, "baseURI", {
                    value: t
                });
                var o = n.createElement("meta");
                return o.setAttribute("charset", "utf-8"),
                n.head.appendChild(o),
                n.head.appendChild(i),
                n.body.innerHTML = e,
                window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(n),
                n
            }
            var o = e.flags
              , s = e.IMPORT_LINK_TYPE
              , a = e.IMPORT_SELECTOR
              , l = e.rootDocument
              , u = e.Loader
              , c = e.Observer
              , d = e.parser
              , h = {
                documents: {},
                documentPreloadSelectors: a,
                importsPreloadSelectors: [a].join(","),
                loadNode: function(e) {
                    p.addNode(e)
                },
                loadSubtree: function(e) {
                    var t = this.marshalNodes(e);
                    p.addNodes(t)
                },
                marshalNodes: function(e) {
                    return e.querySelectorAll(this.loadSelectorsForNode(e))
                },
                loadSelectorsForNode: function(e) {
                    var t = e.ownerDocument || e;
                    return t === l ? this.documentPreloadSelectors : this.importsPreloadSelectors
                },
                loaded: function(e, n, r, s, a) {
                    if (o.load && console.log("loaded", e, n),
                    n.__resource = r,
                    n.__error = s,
                    t(n)) {
                        var l = this.documents[e];
                        void 0 === l && (l = s ? null  : i(r, a || e),
                        l && (l.__importLink = n,
                        this.bootDocument(l)),
                        this.documents[e] = l),
                        n["import"] = l
                    }
                    d.parseNext()
                },
                bootDocument: function(e) {
                    this.loadSubtree(e),
                    this.observer.observe(e),
                    d.parseNext()
                },
                loadedAll: function() {
                    d.parseNext()
                }
            }
              , p = new u(h.loaded.bind(h),h.loadedAll.bind(h));
            if (h.observer = new c,
            !document.baseURI) {
                var f = {
                    get: function() {
                        var e = document.querySelector("base");
                        return e ? e.href : window.location.href
                    },
                    configurable: !0
                };
                Object.defineProperty(document, "baseURI", f),
                Object.defineProperty(l, "baseURI", f)
            }
            e.importer = h,
            e.importLoader = p
        }),
        HTMLImports.addModule(function(e) {
            var t = e.parser
              , n = e.importer
              , r = {
                added: function(e) {
                    for (var r, i, o, s, a = 0, l = e.length; l > a && (s = e[a]); a++)
                        r || (r = s.ownerDocument,
                        i = t.isParsed(r)),
                        o = this.shouldLoadNode(s),
                        o && n.loadNode(s),
                        this.shouldParseNode(s) && i && t.parseDynamic(s, o)
                },
                shouldLoadNode: function(e) {
                    return 1 === e.nodeType && i.call(e, n.loadSelectorsForNode(e))
                },
                shouldParseNode: function(e) {
                    return 1 === e.nodeType && i.call(e, t.parseSelectorsForNode(e))
                }
            };
            n.observer.addCallback = r.added.bind(r);
            var i = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector
        }),
        function(e) {
            function t() {
                HTMLImports.importer.bootDocument(i)
            }
            var n = e.initializeModules
              , r = e.isIE;
            if (!e.useNative) {
                r && "function" != typeof window.CustomEvent && (window.CustomEvent = function(e, t) {
                    t = t || {};
                    var n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail),
                    n
                }
                ,
                window.CustomEvent.prototype = window.Event.prototype),
                n();
                var i = e.rootDocument;
                "complete" === document.readyState || "interactive" === document.readyState && !window.attachEvent ? t() : document.addEventListener("DOMContentLoaded", t)
            }
        }(HTMLImports)
    }
    .call(System.global),
    System.get("@@global-helpers").retrieveGlobal(n.id, !1)
}),
System.register("github:polymer/mutationobservers@0.4.2/MutationObserver", [], !1, function(e, t, n) {
    return System.get("@@global-helpers").prepareGlobal(n.id, []),
    function() {
        !function(e) {
            function t(e) {
                w.push(e),
                b || (b = !0,
                g(r))
            }
            function n(e) {
                return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e
            }
            function r() {
                b = !1;
                var e = w;
                w = [],
                e.sort(function(e, t) {
                    return e.uid_ - t.uid_
                });
                var t = !1;
                e.forEach(function(e) {
                    var n = e.takeRecords();
                    i(e),
                    n.length && (e.callback_(n, e),
                    t = !0)
                }),
                t && r()
            }
            function i(e) {
                e.nodes_.forEach(function(t) {
                    var n = m.get(t);
                    n && n.forEach(function(t) {
                        t.observer === e && t.removeTransientObservers()
                    })
                })
            }
            function o(e, t) {
                for (var n = e; n; n = n.parentNode) {
                    var r = m.get(n);
                    if (r)
                        for (var i = 0; i < r.length; i++) {
                            var o = r[i]
                              , s = o.options;
                            if (n === e || s.subtree) {
                                var a = t(s);
                                a && o.enqueue(a)
                            }
                        }
                }
            }
            function s(e) {
                this.callback_ = e,
                this.nodes_ = [],
                this.records_ = [],
                this.uid_ = ++x
            }
            function a(e, t) {
                this.type = e,
                this.target = t,
                this.addedNodes = [],
                this.removedNodes = [],
                this.previousSibling = null ,
                this.nextSibling = null ,
                this.attributeName = null ,
                this.attributeNamespace = null ,
                this.oldValue = null
            }
            function l(e) {
                var t = new a(e.type,e.target);
                return t.addedNodes = e.addedNodes.slice(),
                t.removedNodes = e.removedNodes.slice(),
                t.previousSibling = e.previousSibling,
                t.nextSibling = e.nextSibling,
                t.attributeName = e.attributeName,
                t.attributeNamespace = e.attributeNamespace,
                t.oldValue = e.oldValue,
                t
            }
            function u(e, t) {
                return k = new a(e,t)
            }
            function c(e) {
                return j ? j : (j = l(k),
                j.oldValue = e,
                j)
            }
            function d() {
                k = j = void 0
            }
            function h(e) {
                return e === j || e === k
            }
            function p(e, t) {
                return e === t ? e : j && h(e) ? j : null
            }
            function f(e, t, n) {
                this.observer = e,
                this.target = t,
                this.options = n,
                this.transientObservedNodes = []
            }
            var m = new WeakMap
              , g = window.msSetImmediate;
            if (!g) {
                var v = []
                  , y = String(Math.random());
                window.addEventListener("message", function(e) {
                    if (e.data === y) {
                        var t = v;
                        v = [],
                        t.forEach(function(e) {
                            e()
                        })
                    }
                }),
                g = function(e) {
                    v.push(e),
                    window.postMessage(y, "*")
                }
            }
            var b = !1
              , w = []
              , x = 0;
            s.prototype = {
                observe: function(e, t) {
                    if (e = n(e),
                    !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData)
                        throw new SyntaxError;
                    var r = m.get(e);
                    r || m.set(e, r = []);
                    for (var i, o = 0; o < r.length; o++)
                        if (r[o].observer === this) {
                            i = r[o],
                            i.removeListeners(),
                            i.options = t;
                            break
                        }
                    i || (i = new f(this,e,t),
                    r.push(i),
                    this.nodes_.push(e)),
                    i.addListeners()
                },
                disconnect: function() {
                    this.nodes_.forEach(function(e) {
                        for (var t = m.get(e), n = 0; n < t.length; n++) {
                            var r = t[n];
                            if (r.observer === this) {
                                r.removeListeners(),
                                t.splice(n, 1);
                                break
                            }
                        }
                    }, this),
                    this.records_ = []
                },
                takeRecords: function() {
                    var e = this.records_;
                    return this.records_ = [],
                    e
                }
            };
            var k, j;
            f.prototype = {
                enqueue: function(e) {
                    var n = this.observer.records_
                      , r = n.length;
                    if (n.length > 0) {
                        var i = n[r - 1]
                          , o = p(i, e);
                        if (o)
                            return void (n[r - 1] = o)
                    } else
                        t(this.observer);
                    n[r] = e
                },
                addListeners: function() {
                    this.addListeners_(this.target)
                },
                addListeners_: function(e) {
                    var t = this.options;
                    t.attributes && e.addEventListener("DOMAttrModified", this, !0),
                    t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0),
                    t.childList && e.addEventListener("DOMNodeInserted", this, !0),
                    (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0)
                },
                removeListeners: function() {
                    this.removeListeners_(this.target)
                },
                removeListeners_: function(e) {
                    var t = this.options;
                    t.attributes && e.removeEventListener("DOMAttrModified", this, !0),
                    t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0),
                    t.childList && e.removeEventListener("DOMNodeInserted", this, !0),
                    (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0)
                },
                addTransientObserver: function(e) {
                    if (e !== this.target) {
                        this.addListeners_(e),
                        this.transientObservedNodes.push(e);
                        var t = m.get(e);
                        t || m.set(e, t = []),
                        t.push(this)
                    }
                },
                removeTransientObservers: function() {
                    var e = this.transientObservedNodes;
                    this.transientObservedNodes = [],
                    e.forEach(function(e) {
                        this.removeListeners_(e);
                        for (var t = m.get(e), n = 0; n < t.length; n++)
                            if (t[n] === this) {
                                t.splice(n, 1);
                                break
                            }
                    }, this)
                },
                handleEvent: function(e) {
                    switch (e.stopImmediatePropagation(),
                    e.type) {
                    case "DOMAttrModified":
                        var t = e.attrName
                          , n = e.relatedNode.namespaceURI
                          , r = e.target
                          , i = new u("attributes",r);
                        i.attributeName = t,
                        i.attributeNamespace = n;
                        var s = e.attrChange === MutationEvent.ADDITION ? null  : e.prevValue;
                        o(r, function(e) {
                            return !e.attributes || e.attributeFilter && e.attributeFilter.length && -1 === e.attributeFilter.indexOf(t) && -1 === e.attributeFilter.indexOf(n) ? void 0 : e.attributeOldValue ? c(s) : i
                        });
                        break;
                    case "DOMCharacterDataModified":
                        var r = e.target
                          , i = u("characterData", r)
                          , s = e.prevValue;
                        o(r, function(e) {
                            return e.characterData ? e.characterDataOldValue ? c(s) : i : void 0
                        });
                        break;
                    case "DOMNodeRemoved":
                        this.addTransientObserver(e.target);
                    case "DOMNodeInserted":
                        var a, l, r = e.relatedNode, h = e.target;
                        "DOMNodeInserted" === e.type ? (a = [h],
                        l = []) : (a = [],
                        l = [h]);
                        var p = h.previousSibling
                          , f = h.nextSibling
                          , i = u("childList", r);
                        i.addedNodes = a,
                        i.removedNodes = l,
                        i.previousSibling = p,
                        i.nextSibling = f,
                        o(r, function(e) {
                            return e.childList ? i : void 0
                        })
                    }
                    d()
                }
            },
            e.JsMutationObserver = s,
            e.MutationObserver || (e.MutationObserver = s)
        }(this)
    }
    .call(System.global),
    System.get("@@global-helpers").retrieveGlobal(n.id, !1)
}),
System.register("github:polymer/mutationobservers@0.4.2", ["github:polymer/mutationobservers@0.4.2/MutationObserver"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("github:polymer/mutationobservers@0.4.2/MutationObserver"),
    n.define = r,
    t.exports
}),
System.register("npm:process@0.10.1/browser", [], !0, function(require, e, t) {
    function n() {
        if (!l) {
            l = !0;
            for (var e, t = a.length; t; ) {
                e = a,
                a = [];
                for (var n = -1; ++n < t; )
                    e[n]();
                t = a.length
            }
            l = !1
        }
    }
    function r() {}
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = t.exports = {}
      , a = []
      , l = !1;
    return s.nextTick = function(e) {
        a.push(e),
        l || setTimeout(n, 0)
    }
    ,
    s.title = "browser",
    s.browser = !0,
    s.env = {},
    s.argv = [],
    s.version = "",
    s.versions = {},
    s.on = r,
    s.addListener = r,
    s.once = r,
    s.off = r,
    s.removeListener = r,
    s.removeAllListeners = r,
    s.emit = r,
    s.binding = function(e) {
        throw new Error("process.binding is not supported")
    }
    ,
    s.cwd = function() {
        return "/"
    }
    ,
    s.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }
    ,
    s.umask = function() {
        return 0
    }
    ,
    i.define = o,
    t.exports
}),
System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("npm:process@0.10.1/browser"),
    n.define = r,
    t.exports
}),
System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = System._nodeRequire ? process : require("npm:process@0.10.1"),
    n.define = r,
    t.exports
}),
System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("github:jspm/nodelibs-process@0.1.1/index"),
    n.define = r,
    t.exports
}),
System.register("npm:codemirror@5.3.0/lib/codemirror", ["github:jspm/nodelibs-process@0.1.1"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    function(n) {
        !function(n) {
            if ("object" == typeof e && "object" == typeof t)
                t.exports = n();
            else {
                if ("function" == typeof define && define.amd)
                    return define([], n);
                this.CodeMirror = n()
            }
        }(function() {
            "use strict";
            function e(n, r) {
                if (!(this instanceof e))
                    return new e(n,r);
                this.options = r = r ? Ni(r) : {},
                Ni(Go, r, !1),
                p(r);
                var i = r.value;
                "string" == typeof i && (i = new vs(i,r.mode)),
                this.doc = i;
                var o = new e.inputStyles[r.inputStyle](this)
                  , s = this.display = new t(n,i,o);
                s.wrapper.CodeMirror = this,
                u(this),
                a(this),
                r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
                r.autofocus && !jo && s.input.focus(),
                v(this),
                this.state = {
                    keyMaps: [],
                    overlays: [],
                    modeGen: 0,
                    overwrite: !1,
                    delayingBlurEvent: !1,
                    focused: !1,
                    suppressEdits: !1,
                    pasteIncoming: !1,
                    cutIncoming: !1,
                    draggingText: !1,
                    highlight: new Ci,
                    keySeq: null ,
                    specialChars: null
                };
                var l = this;
                po && 11 > fo && setTimeout(function() {
                    l.display.input.reset(!0)
                }, 20),
                zt(this),
                qi(),
                yt(this),
                this.curOp.forceUpdate = !0,
                Ur(this, i),
                r.autofocus && !jo || l.hasFocus() ? setTimeout(Di(pn, this), 20) : fn(this);
                for (var c in Ko)
                    Ko.hasOwnProperty(c) && Ko[c](this, r[c], Qo);
                k(this),
                r.finishInit && r.finishInit(this);
                for (var d = 0; d < Jo.length; ++d)
                    Jo[d](this);
                wt(this),
                mo && r.lineWrapping && "optimizelegibility" == getComputedStyle(s.lineDiv).textRendering && (s.lineDiv.style.textRendering = "auto")
            }
            function t(e, t, n) {
                var r = this;
                this.input = n,
                r.scrollbarFiller = _i("div", null , "CodeMirror-scrollbar-filler"),
                r.scrollbarFiller.setAttribute("cm-not-content", "true"),
                r.gutterFiller = _i("div", null , "CodeMirror-gutter-filler"),
                r.gutterFiller.setAttribute("cm-not-content", "true"),
                r.lineDiv = _i("div", null , "CodeMirror-code"),
                r.selectionDiv = _i("div", null , null , "position: relative; z-index: 1"),
                r.cursorDiv = _i("div", null , "CodeMirror-cursors"),
                r.measure = _i("div", null , "CodeMirror-measure"),
                r.lineMeasure = _i("div", null , "CodeMirror-measure"),
                r.lineSpace = _i("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null , "position: relative; outline: none"),
                r.mover = _i("div", [_i("div", [r.lineSpace], "CodeMirror-lines")], null , "position: relative"),
                r.sizer = _i("div", [r.mover], "CodeMirror-sizer"),
                r.sizerWidth = null ,
                r.heightForcer = _i("div", null , null , "position: absolute; height: " + Ms + "px; width: 1px;"),
                r.gutters = _i("div", null , "CodeMirror-gutters"),
                r.lineGutter = null ,
                r.scroller = _i("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll"),
                r.scroller.setAttribute("tabIndex", "-1"),
                r.wrapper = _i("div", [r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror"),
                po && 8 > fo && (r.gutters.style.zIndex = -1,
                r.scroller.style.paddingRight = 0),
                mo || uo && jo || (r.scroller.draggable = !0),
                e && (e.appendChild ? e.appendChild(r.wrapper) : e(r.wrapper)),
                r.viewFrom = r.viewTo = t.first,
                r.reportedViewFrom = r.reportedViewTo = t.first,
                r.view = [],
                r.renderedView = null ,
                r.externalMeasured = null ,
                r.viewOffset = 0,
                r.lastWrapHeight = r.lastWrapWidth = 0,
                r.updateLineNumbers = null ,
                r.nativeBarWidth = r.barHeight = r.barWidth = 0,
                r.scrollbarsClipped = !1,
                r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null ,
                r.alignWidgets = !1,
                r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null ,
                r.maxLine = null ,
                r.maxLineLength = 0,
                r.maxLineChanged = !1,
                r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null ,
                r.shift = !1,
                r.selForContextMenu = null ,
                r.activeTouch = null ,
                n.init(r)
            }
            function n(t) {
                t.doc.mode = e.getMode(t.options, t.doc.modeOption),
                r(t)
            }
            function r(e) {
                e.doc.iter(function(e) {
                    e.stateAfter && (e.stateAfter = null ),
                    e.styles && (e.styles = null )
                }),
                e.doc.frontier = e.doc.first,
                Re(e, 100),
                e.state.modeGen++,
                e.curOp && Nt(e)
            }
            function i(e) {
                e.options.lineWrapping ? (Bs(e.display.wrapper, "CodeMirror-wrap"),
                e.display.sizer.style.minWidth = "",
                e.display.sizerWidth = null ) : (Hs(e.display.wrapper, "CodeMirror-wrap"),
                h(e)),
                s(e),
                Nt(e),
                ot(e),
                setTimeout(function() {
                    y(e)
                }, 100)
            }
            function o(e) {
                var t = gt(e.display)
                  , n = e.options.lineWrapping
                  , r = n && Math.max(5, e.display.scroller.clientWidth / vt(e.display) - 3);
                return function(i) {
                    if (yr(e.doc, i))
                        return 0;
                    var o = 0;
                    if (i.widgets)
                        for (var s = 0; s < i.widgets.length; s++)
                            i.widgets[s].height && (o += i.widgets[s].height);
                    return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
                }
            }
            function s(e) {
                var t = e.doc
                  , n = o(e);
                t.iter(function(e) {
                    var t = n(e);
                    t != e.height && Yr(e, t)
                })
            }
            function a(e) {
                e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"),
                ot(e)
            }
            function l(e) {
                u(e),
                Nt(e),
                setTimeout(function() {
                    x(e)
                }, 20)
            }
            function u(e) {
                var t = e.display.gutters
                  , n = e.options.gutters;
                Fi(t);
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r]
                      , o = t.appendChild(_i("div", null , "CodeMirror-gutter " + i));
                    "CodeMirror-linenumbers" == i && (e.display.lineGutter = o,
                    o.style.width = (e.display.lineNumWidth || 1) + "px")
                }
                t.style.display = r ? "" : "none",
                c(e)
            }
            function c(e) {
                var t = e.display.gutters.offsetWidth;
                e.display.sizer.style.marginLeft = t + "px"
            }
            function d(e) {
                if (0 == e.height)
                    return 0;
                for (var t, n = e.text.length, r = e; t = dr(r); ) {
                    var i = t.find(0, !0);
                    r = i.from.line,
                    n += i.from.ch - i.to.ch
                }
                for (r = e; t = hr(r); ) {
                    var i = t.find(0, !0);
                    n -= r.text.length - i.from.ch,
                    r = i.to.line,
                    n += r.text.length - i.to.ch
                }
                return n
            }
            function h(e) {
                var t = e.display
                  , n = e.doc;
                t.maxLine = Gr(n, n.first),
                t.maxLineLength = d(t.maxLine),
                t.maxLineChanged = !0,
                n.iter(function(e) {
                    var n = d(e);
                    n > t.maxLineLength && (t.maxLineLength = n,
                    t.maxLine = e)
                })
            }
            function p(e) {
                var t = Ei(e.gutters, "CodeMirror-linenumbers");
                -1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0),
                e.gutters.splice(t, 1))
            }
            function f(e) {
                var t = e.display
                  , n = t.gutters.offsetWidth
                  , r = Math.round(e.doc.height + He(e.display));
                return {
                    clientHeight: t.scroller.clientHeight,
                    viewHeight: t.wrapper.clientHeight,
                    scrollWidth: t.scroller.scrollWidth,
                    clientWidth: t.scroller.clientWidth,
                    viewWidth: t.wrapper.clientWidth,
                    barLeft: e.options.fixedGutter ? n : 0,
                    docHeight: r,
                    scrollHeight: r + We(e) + t.barHeight,
                    nativeBarWidth: t.nativeBarWidth,
                    gutterWidth: n
                }
            }
            function m(e, t, n) {
                this.cm = n;
                var r = this.vert = _i("div", [_i("div", null , null , "min-width: 1px")], "CodeMirror-vscrollbar")
                  , i = this.horiz = _i("div", [_i("div", null , null , "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
                e(r),
                e(i),
                js(r, "scroll", function() {
                    r.clientHeight && t(r.scrollTop, "vertical")
                }),
                js(i, "scroll", function() {
                    i.clientWidth && t(i.scrollLeft, "horizontal")
                }),
                this.checkedOverlay = !1,
                po && 8 > fo && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
            }
            function g() {}
            function v(t) {
                t.display.scrollbars && (t.display.scrollbars.clear(),
                t.display.scrollbars.addClass && Hs(t.display.wrapper, t.display.scrollbars.addClass)),
                t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](function(e) {
                    t.display.wrapper.insertBefore(e, t.display.scrollbarFiller),
                    js(e, "mousedown", function() {
                        t.state.focused && setTimeout(function() {
                            t.display.input.focus()
                        }, 0)
                    }),
                    e.setAttribute("cm-not-content", "true")
                }
                ,function(e, n) {
                    "horizontal" == n ? en(t, e) : Jt(t, e)
                }
                ,t),
                t.display.scrollbars.addClass && Bs(t.display.wrapper, t.display.scrollbars.addClass)
            }
            function y(e, t) {
                t || (t = f(e));
                var n = e.display.barWidth
                  , r = e.display.barHeight;
                b(e, t);
                for (var i = 0; 4 > i && n != e.display.barWidth || r != e.display.barHeight; i++)
                    n != e.display.barWidth && e.options.lineWrapping && A(e),
                    b(e, f(e)),
                    n = e.display.barWidth,
                    r = e.display.barHeight
            }
            function b(e, t) {
                var n = e.display
                  , r = n.scrollbars.update(t);
                n.sizer.style.paddingRight = (n.barWidth = r.right) + "px",
                n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px",
                r.right && r.bottom ? (n.scrollbarFiller.style.display = "block",
                n.scrollbarFiller.style.height = r.bottom + "px",
                n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "",
                r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block",
                n.gutterFiller.style.height = r.bottom + "px",
                n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
            }
            function w(e, t, n) {
                var r = n && null  != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
                r = Math.floor(r - Ve(e));
                var i = n && null  != n.bottom ? n.bottom : r + e.wrapper.clientHeight
                  , o = Zr(t, r)
                  , s = Zr(t, i);
                if (n && n.ensure) {
                    var a = n.ensure.from.line
                      , l = n.ensure.to.line;
                    o > a ? (o = a,
                    s = Zr(t, Jr(Gr(t, a)) + e.wrapper.clientHeight)) : Math.min(l, t.lastLine()) >= s && (o = Zr(t, Jr(Gr(t, l)) - e.wrapper.clientHeight),
                    s = l)
                }
                return {
                    from: o,
                    to: Math.max(s, o + 1)
                }
            }
            function x(e) {
                var t = e.display
                  , n = t.view;
                if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                    for (var r = S(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", s = 0; s < n.length; s++)
                        if (!n[s].hidden) {
                            e.options.fixedGutter && n[s].gutter && (n[s].gutter.style.left = o);
                            var a = n[s].alignable;
                            if (a)
                                for (var l = 0; l < a.length; l++)
                                    a[l].style.left = o
                        }
                    e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
                }
            }
            function k(e) {
                if (!e.options.lineNumbers)
                    return !1;
                var t = e.doc
                  , n = j(e.options, t.first + t.size - 1)
                  , r = e.display;
                if (n.length != r.lineNumChars) {
                    var i = r.measure.appendChild(_i("div", [_i("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt"))
                      , o = i.firstChild.offsetWidth
                      , s = i.offsetWidth - o;
                    return r.lineGutter.style.width = "",
                    r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - s) + 1,
                    r.lineNumWidth = r.lineNumInnerWidth + s,
                    r.lineNumChars = r.lineNumInnerWidth ? n.length : -1,
                    r.lineGutter.style.width = r.lineNumWidth + "px",
                    c(e),
                    !0
                }
                return !1
            }
            function j(e, t) {
                return String(e.lineNumberFormatter(t + e.firstLineNumber))
            }
            function S(e) {
                return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
            }
            function C(e, t, n) {
                var r = e.display;
                this.viewport = t,
                this.visible = w(r, e.doc, t),
                this.editorIsHidden = !r.wrapper.offsetWidth,
                this.wrapperHeight = r.wrapper.clientHeight,
                this.wrapperWidth = r.wrapper.clientWidth,
                this.oldDisplayWidth = qe(e),
                this.force = n,
                this.dims = N(e),
                this.events = []
            }
            function L(e) {
                var t = e.display;
                !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth,
                t.heightForcer.style.height = We(e) + "px",
                t.sizer.style.marginBottom = -t.nativeBarWidth + "px",
                t.sizer.style.borderRightWidth = We(e) + "px",
                t.scrollbarsClipped = !0)
            }
            function M(e, t) {
                var n = e.display
                  , r = e.doc;
                if (t.editorIsHidden)
                    return Pt(e),
                    !1;
                if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null  == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == Ft(e))
                    return !1;
                k(e) && (Pt(e),
                t.dims = N(e));
                var i = r.first + r.size
                  , o = Math.max(t.visible.from - e.options.viewportMargin, r.first)
                  , s = Math.min(i, t.visible.to + e.options.viewportMargin);
                n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)),
                n.viewTo > s && n.viewTo - s < 20 && (s = Math.min(i, n.viewTo)),
                To && (o = gr(e.doc, o),
                s = vr(e.doc, s));
                var a = o != n.viewFrom || s != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
                _t(e, o, s),
                n.viewOffset = Jr(Gr(e.doc, n.viewFrom)),
                e.display.mover.style.top = n.viewOffset + "px";
                var l = Ft(e);
                if (!a && 0 == l && !t.force && n.renderedView == n.view && (null  == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo))
                    return !1;
                var u = Vi();
                return l > 4 && (n.lineDiv.style.display = "none"),
                D(e, n.updateLineNumbers, t.dims),
                l > 4 && (n.lineDiv.style.display = ""),
                n.renderedView = n.view,
                u && Vi() != u && u.offsetHeight && u.focus(),
                Fi(n.cursorDiv),
                Fi(n.selectionDiv),
                n.gutters.style.height = 0,
                a && (n.lastWrapHeight = t.wrapperHeight,
                n.lastWrapWidth = t.wrapperWidth,
                Re(e, 400)),
                n.updateLineNumbers = null ,
                !0
            }
            function O(e, t) {
                for (var n = t.viewport, r = !0; (r && e.options.lineWrapping && t.oldDisplayWidth != qe(e) || (n && null  != n.top && (n = {
                    top: Math.min(e.doc.height + He(e.display) - Ue(e), n.top)
                }),
                t.visible = w(e.display, e.doc, n),
                !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && M(e, t); r = !1) {
                    A(e);
                    var i = f(e);
                    $e(e),
                    T(e, i),
                    y(e, i)
                }
                t.signal(e, "update", e),
                (e.display.viewFrom != e.display.reportedViewFrom || e.display.viewTo != e.display.reportedViewTo) && (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo),
                e.display.reportedViewFrom = e.display.viewFrom,
                e.display.reportedViewTo = e.display.viewTo)
            }
            function E(e, t) {
                var n = new C(e,t);
                if (M(e, n)) {
                    A(e),
                    O(e, n);
                    var r = f(e);
                    $e(e),
                    T(e, r),
                    y(e, r),
                    n.finish()
                }
            }
            function T(e, t) {
                e.display.sizer.style.minHeight = t.docHeight + "px";
                var n = t.docHeight + e.display.barHeight;
                e.display.heightForcer.style.top = n + "px",
                e.display.gutters.style.height = Math.max(n + We(e), t.clientHeight) + "px"
            }
            function A(e) {
                for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
                    var i, o = t.view[r];
                    if (!o.hidden) {
                        if (po && 8 > fo) {
                            var s = o.node.offsetTop + o.node.offsetHeight;
                            i = s - n,
                            n = s
                        } else {
                            var a = o.node.getBoundingClientRect();
                            i = a.bottom - a.top
                        }
                        var l = o.line.height - i;
                        if (2 > i && (i = gt(t)),
                        (l > .001 || -.001 > l) && (Yr(o.line, i),
                        $(o.line),
                        o.rest))
                            for (var u = 0; u < o.rest.length; u++)
                                $(o.rest[u])
                    }
                }
            }
            function $(e) {
                if (e.widgets)
                    for (var t = 0; t < e.widgets.length; ++t)
                        e.widgets[t].height = e.widgets[t].node.offsetHeight
            }
            function N(e) {
                for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, s = 0; o; o = o.nextSibling,
                ++s)
                    n[e.options.gutters[s]] = o.offsetLeft + o.clientLeft + i,
                    r[e.options.gutters[s]] = o.clientWidth;
                return {
                    fixedPos: S(t),
                    gutterTotalWidth: t.gutters.offsetWidth,
                    gutterLeft: n,
                    gutterWidth: r,
                    wrapperWidth: t.wrapper.clientWidth
                }
            }
            function D(e, t, n) {
                function r(t) {
                    var n = t.nextSibling;
                    return mo && So && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t),
                    n
                }
                for (var i = e.display, o = e.options.lineNumbers, s = i.lineDiv, a = s.firstChild, l = i.view, u = i.viewFrom, c = 0; c < l.length; c++) {
                    var d = l[c];
                    if (d.hidden)
                        ;
                    else if (d.node && d.node.parentNode == s) {
                        for (; a != d.node; )
                            a = r(a);
                        var h = o && null  != t && u >= t && d.lineNumber;
                        d.changes && (Ei(d.changes, "gutter") > -1 && (h = !1),
                        P(e, d, u, n)),
                        h && (Fi(d.lineNumber),
                        d.lineNumber.appendChild(document.createTextNode(j(e.options, u)))),
                        a = d.node.nextSibling
                    } else {
                        var p = B(e, d, u, n);
                        s.insertBefore(p, a)
                    }
                    u += d.size
                }
                for (; a; )
                    a = r(a)
            }
            function P(e, t, n, r) {
                for (var i = 0; i < t.changes.length; i++) {
                    var o = t.changes[i];
                    "text" == o ? F(e, t) : "gutter" == o ? V(e, t, n, r) : "class" == o ? z(t) : "widget" == o && H(e, t, r)
                }
                t.changes = null
            }
            function I(e) {
                return e.node == e.text && (e.node = _i("div", null , null , "position: relative"),
                e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text),
                e.node.appendChild(e.text),
                po && 8 > fo && (e.node.style.zIndex = 2)),
                e.node
            }
            function R(e) {
                var t = e.bgClass ? e.bgClass + " " + (e.line.bgClass || "") : e.line.bgClass;
                if (t && (t += " CodeMirror-linebackground"),
                e.background)
                    t ? e.background.className = t : (e.background.parentNode.removeChild(e.background),
                    e.background = null );
                else if (t) {
                    var n = I(e);
                    e.background = n.insertBefore(_i("div", null , t), n.firstChild)
                }
            }
            function _(e, t) {
                var n = e.display.externalMeasured;
                return n && n.line == t.line ? (e.display.externalMeasured = null ,
                t.measure = n.measure,
                n.built) : Dr(e, t)
            }
            function F(e, t) {
                var n = t.text.className
                  , r = _(e, t);
                t.text == t.node && (t.node = r.pre),
                t.text.parentNode.replaceChild(r.pre, t.text),
                t.text = r.pre,
                r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass,
                t.textClass = r.textClass,
                z(t)) : n && (t.text.className = n)
            }
            function z(e) {
                R(e),
                e.line.wrapClass ? I(e).className = e.line.wrapClass : e.node != e.text && (e.node.className = "");
                var t = e.textClass ? e.textClass + " " + (e.line.textClass || "") : e.line.textClass;
                e.text.className = t || ""
            }
            function V(e, t, n, r) {
                t.gutter && (t.node.removeChild(t.gutter),
                t.gutter = null );
                var i = t.line.gutterMarkers;
                if (e.options.lineNumbers || i) {
                    var o = I(t)
                      , s = t.gutter = _i("div", null , "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px");
                    if (e.display.input.setUneditable(s),
                    o.insertBefore(s, t.text),
                    t.line.gutterClass && (s.className += " " + t.line.gutterClass),
                    !e.options.lineNumbers || i && i["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(_i("div", j(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))),
                    i)
                        for (var a = 0; a < e.options.gutters.length; ++a) {
                            var l = e.options.gutters[a]
                              , u = i.hasOwnProperty(l) && i[l];
                            u && s.appendChild(_i("div", [u], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[l] + "px; width: " + r.gutterWidth[l] + "px"))
                        }
                }
            }
            function H(e, t, n) {
                t.alignable && (t.alignable = null );
                for (var r, i = t.node.firstChild; i; i = r) {
                    var r = i.nextSibling;
                    "CodeMirror-linewidget" == i.className && t.node.removeChild(i)
                }
                W(e, t, n)
            }
            function B(e, t, n, r) {
                var i = _(e, t);
                return t.text = t.node = i.pre,
                i.bgClass && (t.bgClass = i.bgClass),
                i.textClass && (t.textClass = i.textClass),
                z(t),
                V(e, t, n, r),
                W(e, t, r),
                t.node
            }
            function W(e, t, n) {
                if (q(e, t.line, t, n, !0),
                t.rest)
                    for (var r = 0; r < t.rest.length; r++)
                        q(e, t.rest[r], t, n, !1)
            }
            function q(e, t, n, r, i) {
                if (t.widgets)
                    for (var o = I(n), s = 0, a = t.widgets; s < a.length; ++s) {
                        var l = a[s]
                          , u = _i("div", [l.node], "CodeMirror-linewidget");
                        l.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"),
                        U(l, u, n, r),
                        e.display.input.setUneditable(u),
                        i && l.above ? o.insertBefore(u, n.gutter || n.text) : o.appendChild(u),
                        bi(l, "redraw")
                    }
            }
            function U(e, t, n, r) {
                if (e.noHScroll) {
                    (n.alignable || (n.alignable = [])).push(t);
                    var i = r.wrapperWidth;
                    t.style.left = r.fixedPos + "px",
                    e.coverGutter || (i -= r.gutterTotalWidth,
                    t.style.paddingLeft = r.gutterTotalWidth + "px"),
                    t.style.width = i + "px"
                }
                e.coverGutter && (t.style.zIndex = 5,
                t.style.position = "relative",
                e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
            }
            function G(e) {
                return Ao(e.line, e.ch)
            }
            function K(e, t) {
                return $o(e, t) < 0 ? t : e
            }
            function Q(e, t) {
                return $o(e, t) < 0 ? e : t
            }
            function Y(e) {
                e.state.focused || (e.display.input.focus(),
                pn(e))
            }
            function X(e) {
                return e.options.readOnly || e.doc.cantEdit
            }
            function Z(e, t, n, r, i) {
                var o = e.doc;
                e.display.shift = !1,
                r || (r = o.sel);
                var s = Us(t)
                  , a = null ;
                e.state.pasteIncoming && r.ranges.length > 1 && (No && No.join("\n") == t ? a = r.ranges.length % No.length == 0 && Ti(No, Us) : s.length == r.ranges.length && (a = Ti(s, function(e) {
                    return [e]
                })));
                for (var l = r.ranges.length - 1; l >= 0; l--) {
                    var u = r.ranges[l]
                      , c = u.from()
                      , d = u.to();
                    u.empty() && (n && n > 0 ? c = Ao(c.line, c.ch - n) : e.state.overwrite && !e.state.pasteIncoming && (d = Ao(d.line, Math.min(Gr(o, d.line).text.length, d.ch + Oi(s).length))));
                    var h = e.curOp.updateInput
                      , p = {
                        from: c,
                        to: d,
                        text: a ? a[l % a.length] : s,
                        origin: i || (e.state.pasteIncoming ? "paste" : e.state.cutIncoming ? "cut" : "+input")
                    };
                    kn(e.doc, p),
                    bi(e, "inputRead", e, p)
                }
                t && !e.state.pasteIncoming && J(e, t),
                Dn(e),
                e.curOp.updateInput = h,
                e.curOp.typing = !0,
                e.state.pasteIncoming = e.state.cutIncoming = !1
            }
            function J(e, t) {
                if (e.options.electricChars && e.options.smartIndent)
                    for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                        var i = n.ranges[r];
                        if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                            var o = e.getModeAt(i.head)
                              , s = !1;
                            if (o.electricChars) {
                                for (var a = 0; a < o.electricChars.length; a++)
                                    if (t.indexOf(o.electricChars.charAt(a)) > -1) {
                                        s = In(e, i.head.line, "smart");
                                        break
                                    }
                            } else
                                o.electricInput && o.electricInput.test(Gr(e.doc, i.head.line).text.slice(0, i.head.ch)) && (s = In(e, i.head.line, "smart"));
                            s && bi(e, "electricInput", e, i.head.line)
                        }
                    }
            }
            function ee(e) {
                for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
                    var i = e.doc.sel.ranges[r].head.line
                      , o = {
                        anchor: Ao(i, 0),
                        head: Ao(i + 1, 0)
                    };
                    n.push(o),
                    t.push(e.getRange(o.anchor, o.head))
                }
                return {
                    text: t,
                    ranges: n
                }
            }
            function te(e) {
                e.setAttribute("autocorrect", "off"),
                e.setAttribute("autocapitalize", "off"),
                e.setAttribute("spellcheck", "false")
            }
            function ne(e) {
                this.cm = e,
                this.prevInput = "",
                this.pollingFast = !1,
                this.polling = new Ci,
                this.inaccurateSelection = !1,
                this.hasSelection = !1,
                this.composing = null
            }
            function re() {
                var e = _i("textarea", null , null , "position: absolute; padding: 0; width: 1px; height: 1em; outline: none")
                  , t = _i("div", [e], null , "overflow: hidden; position: relative; width: 3px; height: 0px;");
                return mo ? e.style.width = "1000px" : e.setAttribute("wrap", "off"),
                ko && (e.style.border = "1px solid black"),
                te(e),
                t
            }
            function ie(e) {
                this.cm = e,
                this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null ,
                this.polling = new Ci,
                this.gracePeriod = !1
            }
            function oe(e, t) {
                var n = Xe(e, t.line);
                if (!n || n.hidden)
                    return null ;
                var r = Gr(e.doc, t.line)
                  , i = Ke(n, r, t.line)
                  , o = ei(r)
                  , s = "left";
                if (o) {
                    var a = oo(o, t.ch);
                    s = a % 2 ? "right" : "left"
                }
                var l = et(i.map, t.ch, s);
                return l.offset = "right" == l.collapse ? l.end : l.start,
                l
            }
            function se(e, t) {
                return t && (e.bad = !0),
                e
            }
            function ae(e, t, n) {
                var r;
                if (t == e.display.lineDiv) {
                    if (r = e.display.lineDiv.childNodes[n],
                    !r)
                        return se(e.clipPos(Ao(e.display.viewTo - 1)), !0);
                    t = null ,
                    n = 0
                } else
                    for (r = t; ; r = r.parentNode) {
                        if (!r || r == e.display.lineDiv)
                            return null ;
                        if (r.parentNode && r.parentNode == e.display.lineDiv)
                            break
                    }
                for (var i = 0; i < e.display.view.length; i++) {
                    var o = e.display.view[i];
                    if (o.node == r)
                        return le(o, t, n)
                }
            }
            function le(e, t, n) {
                function r(t, n, r) {
                    for (var i = -1; i < (c ? c.length : 0); i++)
                        for (var o = 0 > i ? u.map : c[i], s = 0; s < o.length; s += 3) {
                            var a = o[s + 2];
                            if (a == t || a == n) {
                                var l = Xr(0 > i ? e.line : e.rest[i])
                                  , d = o[s] + r;
                                return (0 > r || a != t) && (d = o[s + (r ? 1 : 0)]),
                                Ao(l, d)
                            }
                        }
                }
                var i = e.text.firstChild
                  , o = !1;
                if (!t || !Fs(i, t))
                    return se(Ao(Xr(e.line), 0), !0);
                if (t == i && (o = !0,
                t = i.childNodes[n],
                n = 0,
                !t)) {
                    var s = e.rest ? Oi(e.rest) : e.line;
                    return se(Ao(Xr(s), s.text.length), o)
                }
                var a = 3 == t.nodeType ? t : null
                  , l = t;
                for (a || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (a = t.firstChild,
                n && (n = a.nodeValue.length)); l.parentNode != i; )
                    l = l.parentNode;
                var u = e.measure
                  , c = u.maps
                  , d = r(a, l, n);
                if (d)
                    return se(d, o);
                for (var h = l.nextSibling, p = a ? a.nodeValue.length - n : 0; h; h = h.nextSibling) {
                    if (d = r(h, h.firstChild, 0))
                        return se(Ao(d.line, d.ch - p), o);
                    p += h.textContent.length
                }
                for (var f = l.previousSibling, p = n; f; f = f.previousSibling) {
                    if (d = r(f, f.firstChild, -1))
                        return se(Ao(d.line, d.ch + p), o);
                    p += h.textContent.length
                }
            }
            function ue(e, t, n, r, i) {
                function o(e) {
                    return function(t) {
                        return t.id == e
                    }
                }
                function s(t) {
                    if (1 == t.nodeType) {
                        var n = t.getAttribute("cm-text");
                        if (null  != n)
                            return "" == n && (n = t.textContent.replace(/\u200b/g, "")),
                            void (a += n);
                        var u, c = t.getAttribute("cm-marker");
                        if (c) {
                            var d = e.findMarks(Ao(r, 0), Ao(i + 1, 0), o(+c));
                            return void (d.length && (u = d[0].find()) && (a += Kr(e.doc, u.from, u.to).join("\n")))
                        }
                        if ("false" == t.getAttribute("contenteditable"))
                            return;
                        for (var h = 0; h < t.childNodes.length; h++)
                            s(t.childNodes[h]);
                        /^(pre|div|p)$/i.test(t.nodeName) && (l = !0)
                    } else if (3 == t.nodeType) {
                        var p = t.nodeValue;
                        if (!p)
                            return;
                        l && (a += "\n",
                        l = !1),
                        a += p
                    }
                }
                for (var a = "", l = !1; s(t),
                t != n; )
                    t = t.nextSibling;
                return a
            }
            function ce(e, t) {
                this.ranges = e,
                this.primIndex = t
            }
            function de(e, t) {
                this.anchor = e,
                this.head = t
            }
            function he(e, t) {
                var n = e[t];
                e.sort(function(e, t) {
                    return $o(e.from(), t.from())
                }),
                t = Ei(e, n);
                for (var r = 1; r < e.length; r++) {
                    var i = e[r]
                      , o = e[r - 1];
                    if ($o(o.to(), i.from()) >= 0) {
                        var s = Q(o.from(), i.from())
                          , a = K(o.to(), i.to())
                          , l = o.empty() ? i.from() == i.head : o.from() == o.head;
                        t >= r && --t,
                        e.splice(--r, 2, new de(l ? a : s,l ? s : a))
                    }
                }
                return new ce(e,t)
            }
            function pe(e, t) {
                return new ce([new de(e,t || e)],0)
            }
            function fe(e, t) {
                return Math.max(e.first, Math.min(t, e.first + e.size - 1))
            }
            function me(e, t) {
                if (t.line < e.first)
                    return Ao(e.first, 0);
                var n = e.first + e.size - 1;
                return t.line > n ? Ao(n, Gr(e, n).text.length) : ge(t, Gr(e, t.line).text.length)
            }
            function ge(e, t) {
                var n = e.ch;
                return null  == n || n > t ? Ao(e.line, t) : 0 > n ? Ao(e.line, 0) : e
            }
            function ve(e, t) {
                return t >= e.first && t < e.first + e.size
            }
            function ye(e, t) {
                for (var n = [], r = 0; r < t.length; r++)
                    n[r] = me(e, t[r]);
                return n
            }
            function be(e, t, n, r) {
                if (e.cm && e.cm.display.shift || e.extend) {
                    var i = t.anchor;
                    if (r) {
                        var o = $o(n, i) < 0;
                        o != $o(r, i) < 0 ? (i = n,
                        n = r) : o != $o(n, r) < 0 && (n = r)
                    }
                    return new de(i,n)
                }
                return new de(r || n,n)
            }
            function we(e, t, n, r) {
                Le(e, new ce([be(e, e.sel.primary(), t, n)],0), r)
            }
            function xe(e, t, n) {
                for (var r = [], i = 0; i < e.sel.ranges.length; i++)
                    r[i] = be(e, e.sel.ranges[i], t[i], null );
                var o = he(r, e.sel.primIndex);
                Le(e, o, n)
            }
            function ke(e, t, n, r) {
                var i = e.sel.ranges.slice(0);
                i[t] = n,
                Le(e, he(i, e.sel.primIndex), r)
            }
            function je(e, t, n, r) {
                Le(e, pe(t, n), r)
            }
            function Se(e, t) {
                var n = {
                    ranges: t.ranges,
                    update: function(t) {
                        this.ranges = [];
                        for (var n = 0; n < t.length; n++)
                            this.ranges[n] = new de(me(e, t[n].anchor),me(e, t[n].head))
                    }
                };
                return Cs(e, "beforeSelectionChange", e, n),
                e.cm && Cs(e.cm, "beforeSelectionChange", e.cm, n),
                n.ranges != t.ranges ? he(n.ranges, n.ranges.length - 1) : t
            }
            function Ce(e, t, n) {
                var r = e.history.done
                  , i = Oi(r);
                i && i.ranges ? (r[r.length - 1] = t,
                Me(e, t, n)) : Le(e, t, n)
            }
            function Le(e, t, n) {
                Me(e, t, n),
                ai(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
            }
            function Me(e, t, n) {
                (ji(e, "beforeSelectionChange") || e.cm && ji(e.cm, "beforeSelectionChange")) && (t = Se(e, t));
                var r = n && n.bias || ($o(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
                Oe(e, Te(e, t, r, !0)),
                n && n.scroll === !1 || !e.cm || Dn(e.cm)
            }
            function Oe(e, t) {
                t.equals(e.sel) || (e.sel = t,
                e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0,
                ki(e.cm)),
                bi(e, "cursorActivity", e))
            }
            function Ee(e) {
                Oe(e, Te(e, e.sel, null , !1), Es)
            }
            function Te(e, t, n, r) {
                for (var i, o = 0; o < t.ranges.length; o++) {
                    var s = t.ranges[o]
                      , a = Ae(e, s.anchor, n, r)
                      , l = Ae(e, s.head, n, r);
                    (i || a != s.anchor || l != s.head) && (i || (i = t.ranges.slice(0, o)),
                    i[o] = new de(a,l))
                }
                return i ? he(i, t.primIndex) : t
            }
            function Ae(e, t, n, r) {
                var i = !1
                  , o = t
                  , s = n || 1;
                e.cantEdit = !1;
                e: for (; ; ) {
                    var a = Gr(e, o.line);
                    if (a.markedSpans)
                        for (var l = 0; l < a.markedSpans.length; ++l) {
                            var u = a.markedSpans[l]
                              , c = u.marker;
                            if ((null  == u.from || (c.inclusiveLeft ? u.from <= o.ch : u.from < o.ch)) && (null  == u.to || (c.inclusiveRight ? u.to >= o.ch : u.to > o.ch))) {
                                if (r && (Cs(c, "beforeCursorEnter"),
                                c.explicitlyCleared)) {
                                    if (a.markedSpans) {
                                        --l;
                                        continue
                                    }
                                    break
                                }
                                if (!c.atomic)
                                    continue;var d = c.find(0 > s ? -1 : 1);
                                if (0 == $o(d, o) && (d.ch += s,
                                d.ch < 0 ? d = d.line > e.first ? me(e, Ao(d.line - 1)) : null  : d.ch > a.text.length && (d = d.line < e.first + e.size - 1 ? Ao(d.line + 1, 0) : null ),
                                !d)) {
                                    if (i)
                                        return r ? (e.cantEdit = !0,
                                        Ao(e.first, 0)) : Ae(e, t, n, !0);
                                    i = !0,
                                    d = t,
                                    s = -s
                                }
                                o = d;
                                continue e
                            }
                        }
                    return o
                }
            }
            function $e(e) {
                e.display.input.showSelection(e.display.input.prepareSelection())
            }
            function Ne(e, t) {
                for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), s = 0; s < n.sel.ranges.length; s++)
                    if (t !== !1 || s != n.sel.primIndex) {
                        var a = n.sel.ranges[s]
                          , l = a.empty();
                        (l || e.options.showCursorWhenSelecting) && De(e, a, i),
                        l || Pe(e, a, o)
                    }
                return r
            }
            function De(e, t, n) {
                var r = dt(e, t.head, "div", null , null , !e.options.singleCursorHeightPerLine)
                  , i = n.appendChild(_i("div", "\xa0", "CodeMirror-cursor"));
                if (i.style.left = r.left + "px",
                i.style.top = r.top + "px",
                i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px",
                r.other) {
                    var o = n.appendChild(_i("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
                    o.style.display = "",
                    o.style.left = r.other.left + "px",
                    o.style.top = r.other.top + "px",
                    o.style.height = .85 * (r.other.bottom - r.other.top) + "px"
                }
            }
            function Pe(e, t, n) {
                function r(e, t, n, r) {
                    0 > t && (t = 0),
                    t = Math.round(t),
                    r = Math.round(r),
                    a.appendChild(_i("div", null , "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null  == n ? c - e : n) + "px; height: " + (r - t) + "px"))
                }
                function i(t, n, i) {
                    function o(n, r) {
                        return ct(e, Ao(t, n), "div", d, r)
                    }
                    var a, l, d = Gr(s, t), h = d.text.length;
                    return Yi(ei(d), n || 0, null  == i ? h : i, function(e, t, s) {
                        var d, p, f, m = o(e, "left");
                        if (e == t)
                            d = m,
                            p = f = m.left;
                        else {
                            if (d = o(t - 1, "right"),
                            "rtl" == s) {
                                var g = m;
                                m = d,
                                d = g
                            }
                            p = m.left,
                            f = d.right
                        }
                        null  == n && 0 == e && (p = u),
                        d.top - m.top > 3 && (r(p, m.top, null , m.bottom),
                        p = u,
                        m.bottom < d.top && r(p, m.bottom, null , d.top)),
                        null  == i && t == h && (f = c),
                        (!a || m.top < a.top || m.top == a.top && m.left < a.left) && (a = m),
                        (!l || d.bottom > l.bottom || d.bottom == l.bottom && d.right > l.right) && (l = d),
                        u + 1 > p && (p = u),
                        r(p, d.top, f - p, d.bottom)
                    }),
                    {
                        start: a,
                        end: l
                    }
                }
                var o = e.display
                  , s = e.doc
                  , a = document.createDocumentFragment()
                  , l = Be(e.display)
                  , u = l.left
                  , c = Math.max(o.sizerWidth, qe(e) - o.sizer.offsetLeft) - l.right
                  , d = t.from()
                  , h = t.to();
                if (d.line == h.line)
                    i(d.line, d.ch, h.ch);
                else {
                    var p = Gr(s, d.line)
                      , f = Gr(s, h.line)
                      , m = fr(p) == fr(f)
                      , g = i(d.line, d.ch, m ? p.text.length + 1 : null ).end
                      , v = i(h.line, m ? 0 : null , h.ch).start;
                    m && (g.top < v.top - 2 ? (r(g.right, g.top, null , g.bottom),
                    r(u, v.top, v.left, v.bottom)) : r(g.right, g.top, v.left - g.right, g.bottom)),
                    g.bottom < v.top && r(u, g.bottom, null , v.top)
                }
                n.appendChild(a)
            }
            function Ie(e) {
                if (e.state.focused) {
                    var t = e.display;
                    clearInterval(t.blinker);
                    var n = !0;
                    t.cursorDiv.style.visibility = "",
                    e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                        t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
                    }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
                }
            }
            function Re(e, t) {
                e.doc.mode.startState && e.doc.frontier < e.display.viewTo && e.state.highlight.set(t, Di(_e, e))
            }
            function _e(e) {
                var t = e.doc;
                if (t.frontier < t.first && (t.frontier = t.first),
                !(t.frontier >= e.display.viewTo)) {
                    var n = +new Date + e.options.workTime
                      , r = ts(t.mode, ze(e, t.frontier))
                      , i = [];
                    t.iter(t.frontier, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
                        if (t.frontier >= e.display.viewFrom) {
                            var s = o.styles
                              , a = Tr(e, o, r, !0);
                            o.styles = a.styles;
                            var l = o.styleClasses
                              , u = a.classes;
                            u ? o.styleClasses = u : l && (o.styleClasses = null );
                            for (var c = !s || s.length != o.styles.length || l != u && (!l || !u || l.bgClass != u.bgClass || l.textClass != u.textClass), d = 0; !c && d < s.length; ++d)
                                c = s[d] != o.styles[d];
                            c && i.push(t.frontier),
                            o.stateAfter = ts(t.mode, r)
                        } else
                            $r(e, o.text, r),
                            o.stateAfter = t.frontier % 5 == 0 ? ts(t.mode, r) : null ;
                        return ++t.frontier,
                        +new Date > n ? (Re(e, e.options.workDelay),
                        !0) : void 0
                    }),
                    i.length && Mt(e, function() {
                        for (var t = 0; t < i.length; t++)
                            Dt(e, i[t], "text")
                    })
                }
            }
            function Fe(e, t, n) {
                for (var r, i, o = e.doc, s = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; a > s; --a) {
                    if (a <= o.first)
                        return o.first;
                    var l = Gr(o, a - 1);
                    if (l.stateAfter && (!n || a <= o.frontier))
                        return a;
                    var u = $s(l.text, null , e.options.tabSize);
                    (null  == i || r > u) && (i = a - 1,
                    r = u)
                }
                return i
            }
            function ze(e, t, n) {
                var r = e.doc
                  , i = e.display;
                if (!r.mode.startState)
                    return !0;
                var o = Fe(e, t, n)
                  , s = o > r.first && Gr(r, o - 1).stateAfter;
                return s = s ? ts(r.mode, s) : ns(r.mode),
                r.iter(o, t, function(n) {
                    $r(e, n.text, s);
                    var a = o == t - 1 || o % 5 == 0 || o >= i.viewFrom && o < i.viewTo;
                    n.stateAfter = a ? ts(r.mode, s) : null ,
                    ++o
                }),
                n && (r.frontier = o),
                s
            }
            function Ve(e) {
                return e.lineSpace.offsetTop
            }
            function He(e) {
                return e.mover.offsetHeight - e.lineSpace.offsetHeight
            }
            function Be(e) {
                if (e.cachedPaddingH)
                    return e.cachedPaddingH;
                var t = zi(e.measure, _i("pre", "x"))
                  , n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle
                  , r = {
                    left: parseInt(n.paddingLeft),
                    right: parseInt(n.paddingRight)
                };
                return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r),
                r
            }
            function We(e) {
                return Ms - e.display.nativeBarWidth
            }
            function qe(e) {
                return e.display.scroller.clientWidth - We(e) - e.display.barWidth
            }
            function Ue(e) {
                return e.display.scroller.clientHeight - We(e) - e.display.barHeight
            }
            function Ge(e, t, n) {
                var r = e.options.lineWrapping
                  , i = r && qe(e);
                if (!t.measure.heights || r && t.measure.width != i) {
                    var o = t.measure.heights = [];
                    if (r) {
                        t.measure.width = i;
                        for (var s = t.text.firstChild.getClientRects(), a = 0; a < s.length - 1; a++) {
                            var l = s[a]
                              , u = s[a + 1];
                            Math.abs(l.bottom - u.bottom) > 2 && o.push((l.bottom + u.top) / 2 - n.top)
                        }
                    }
                    o.push(n.bottom - n.top)
                }
            }
            function Ke(e, t, n) {
                if (e.line == t)
                    return {
                        map: e.measure.map,
                        cache: e.measure.cache
                    };
                for (var r = 0; r < e.rest.length; r++)
                    if (e.rest[r] == t)
                        return {
                            map: e.measure.maps[r],
                            cache: e.measure.caches[r]
                        };
                for (var r = 0; r < e.rest.length; r++)
                    if (Xr(e.rest[r]) > n)
                        return {
                            map: e.measure.maps[r],
                            cache: e.measure.caches[r],
                            before: !0
                        }
            }
            function Qe(e, t) {
                t = fr(t);
                var n = Xr(t)
                  , r = e.display.externalMeasured = new At(e.doc,t,n);
                r.lineN = n;
                var i = r.built = Dr(e, r);
                return r.text = i.pre,
                zi(e.display.lineMeasure, i.pre),
                r
            }
            function Ye(e, t, n, r) {
                return Je(e, Ze(e, t), n, r)
            }
            function Xe(e, t) {
                if (t >= e.display.viewFrom && t < e.display.viewTo)
                    return e.display.view[It(e, t)];
                var n = e.display.externalMeasured;
                return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
            }
            function Ze(e, t) {
                var n = Xr(t)
                  , r = Xe(e, n);
                r && !r.text ? r = null  : r && r.changes && P(e, r, n, N(e)),
                r || (r = Qe(e, t));
                var i = Ke(r, t, n);
                return {
                    line: t,
                    view: r,
                    rect: null ,
                    map: i.map,
                    cache: i.cache,
                    before: i.before,
                    hasHeights: !1
                }
            }
            function Je(e, t, n, r, i) {
                t.before && (n = -1);
                var o, s = n + (r || "");
                return t.cache.hasOwnProperty(s) ? o = t.cache[s] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
                t.hasHeights || (Ge(e, t.view, t.rect),
                t.hasHeights = !0),
                o = tt(e, t, n, r),
                o.bogus || (t.cache[s] = o)),
                {
                    left: o.left,
                    right: o.right,
                    top: i ? o.rtop : o.top,
                    bottom: i ? o.rbottom : o.bottom
                }
            }
            function et(e, t, n) {
                for (var r, i, o, s, a = 0; a < e.length; a += 3) {
                    var l = e[a]
                      , u = e[a + 1];
                    if (l > t ? (i = 0,
                    o = 1,
                    s = "left") : u > t ? (i = t - l,
                    o = i + 1) : (a == e.length - 3 || t == u && e[a + 3] > t) && (o = u - l,
                    i = o - 1,
                    t >= u && (s = "right")),
                    null  != i) {
                        if (r = e[a + 2],
                        l == u && n == (r.insertLeft ? "left" : "right") && (s = n),
                        "left" == n && 0 == i)
                            for (; a && e[a - 2] == e[a - 3] && e[a - 1].insertLeft; )
                                r = e[(a -= 3) + 2],
                                s = "left";
                        if ("right" == n && i == u - l)
                            for (; a < e.length - 3 && e[a + 3] == e[a + 4] && !e[a + 5].insertLeft; )
                                r = e[(a += 3) + 2],
                                s = "right";
                        break
                    }
                }
                return {
                    node: r,
                    start: i,
                    end: o,
                    collapse: s,
                    coverStart: l,
                    coverEnd: u
                }
            }
            function tt(e, t, n, r) {
                var i, o = et(t.map, n, r), s = o.node, a = o.start, l = o.end, u = o.collapse;
                if (3 == s.nodeType) {
                    for (var c = 0; 4 > c; c++) {
                        for (; a && Ri(t.line.text.charAt(o.coverStart + a)); )
                            --a;
                        for (; o.coverStart + l < o.coverEnd && Ri(t.line.text.charAt(o.coverStart + l)); )
                            ++l;
                        if (po && 9 > fo && 0 == a && l == o.coverEnd - o.coverStart)
                            i = s.parentNode.getBoundingClientRect();
                        else if (po && e.options.lineWrapping) {
                            var d = Ps(s, a, l).getClientRects();
                            i = d.length ? d["right" == r ? d.length - 1 : 0] : Ro
                        } else
                            i = Ps(s, a, l).getBoundingClientRect() || Ro;
                        if (i.left || i.right || 0 == a)
                            break;
                        l = a,
                        a -= 1,
                        u = "right"
                    }
                    po && 11 > fo && (i = nt(e.display.measure, i))
                } else {
                    a > 0 && (u = r = "right");
                    var d;
                    i = e.options.lineWrapping && (d = s.getClientRects()).length > 1 ? d["right" == r ? d.length - 1 : 0] : s.getBoundingClientRect()
                }
                if (po && 9 > fo && !a && (!i || !i.left && !i.right)) {
                    var h = s.parentNode.getClientRects()[0];
                    i = h ? {
                        left: h.left,
                        right: h.left + vt(e.display),
                        top: h.top,
                        bottom: h.bottom
                    } : Ro
                }
                for (var p = i.top - t.rect.top, f = i.bottom - t.rect.top, m = (p + f) / 2, g = t.view.measure.heights, c = 0; c < g.length - 1 && !(m < g[c]); c++)
                    ;
                var v = c ? g[c - 1] : 0
                  , y = g[c]
                  , b = {
                    left: ("right" == u ? i.right : i.left) - t.rect.left,
                    right: ("left" == u ? i.left : i.right) - t.rect.left,
                    top: v,
                    bottom: y
                };
                return i.left || i.right || (b.bogus = !0),
                e.options.singleCursorHeightPerLine || (b.rtop = p,
                b.rbottom = f),
                b
            }
            function nt(e, t) {
                if (!window.screen || null  == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Qi(e))
                    return t;
                var n = screen.logicalXDPI / screen.deviceXDPI
                  , r = screen.logicalYDPI / screen.deviceYDPI;
                return {
                    left: t.left * n,
                    right: t.right * n,
                    top: t.top * r,
                    bottom: t.bottom * r
                }
            }
            function rt(e) {
                if (e.measure && (e.measure.cache = {},
                e.measure.heights = null ,
                e.rest))
                    for (var t = 0; t < e.rest.length; t++)
                        e.measure.caches[t] = {}
            }
            function it(e) {
                e.display.externalMeasure = null ,
                Fi(e.display.lineMeasure);
                for (var t = 0; t < e.display.view.length; t++)
                    rt(e.display.view[t])
            }
            function ot(e) {
                it(e),
                e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null ,
                e.options.lineWrapping || (e.display.maxLineChanged = !0),
                e.display.lineNumChars = null
            }
            function st() {
                return window.pageXOffset || (document.documentElement || document.body).scrollLeft
            }
            function at() {
                return window.pageYOffset || (document.documentElement || document.body).scrollTop
            }
            function lt(e, t, n, r) {
                if (t.widgets)
                    for (var i = 0; i < t.widgets.length; ++i)
                        if (t.widgets[i].above) {
                            var o = xr(t.widgets[i]);
                            n.top += o,
                            n.bottom += o
                        }
                if ("line" == r)
                    return n;
                r || (r = "local");
                var s = Jr(t);
                if ("local" == r ? s += Ve(e.display) : s -= e.display.viewOffset,
                "page" == r || "window" == r) {
                    var a = e.display.lineSpace.getBoundingClientRect();
                    s += a.top + ("window" == r ? 0 : at());
                    var l = a.left + ("window" == r ? 0 : st());
                    n.left += l,
                    n.right += l
                }
                return n.top += s,
                n.bottom += s,
                n
            }
            function ut(e, t, n) {
                if ("div" == n)
                    return t;
                var r = t.left
                  , i = t.top;
                if ("page" == n)
                    r -= st(),
                    i -= at();
                else if ("local" == n || !n) {
                    var o = e.display.sizer.getBoundingClientRect();
                    r += o.left,
                    i += o.top
                }
                var s = e.display.lineSpace.getBoundingClientRect();
                return {
                    left: r - s.left,
                    top: i - s.top
                }
            }
            function ct(e, t, n, r, i) {
                return r || (r = Gr(e.doc, t.line)),
                lt(e, r, Ye(e, r, t.ch, i), n)
            }
            function dt(e, t, n, r, i, o) {
                function s(t, s) {
                    var a = Je(e, i, t, s ? "right" : "left", o);
                    return s ? a.left = a.right : a.right = a.left,
                    lt(e, r, a, n)
                }
                function a(e, t) {
                    var n = l[t]
                      , r = n.level % 2;
                    return e == Xi(n) && t && n.level < l[t - 1].level ? (n = l[--t],
                    e = Zi(n) - (n.level % 2 ? 0 : 1),
                    r = !0) : e == Zi(n) && t < l.length - 1 && n.level < l[t + 1].level && (n = l[++t],
                    e = Xi(n) - n.level % 2,
                    r = !1),
                    r && e == n.to && e > n.from ? s(e - 1) : s(e, r)
                }
                r = r || Gr(e.doc, t.line),
                i || (i = Ze(e, r));
                var l = ei(r)
                  , u = t.ch;
                if (!l)
                    return s(u);
                var c = oo(l, u)
                  , d = a(u, c);
                return null  != Xs && (d.other = a(u, Xs)),
                d
            }
            function ht(e, t) {
                var n = 0
                  , t = me(e.doc, t);
                e.options.lineWrapping || (n = vt(e.display) * t.ch);
                var r = Gr(e.doc, t.line)
                  , i = Jr(r) + Ve(e.display);
                return {
                    left: n,
                    right: n,
                    top: i,
                    bottom: i + r.height
                }
            }
            function pt(e, t, n, r) {
                var i = Ao(e, t);
                return i.xRel = r,
                n && (i.outside = !0),
                i
            }
            function ft(e, t, n) {
                var r = e.doc;
                if (n += e.display.viewOffset,
                0 > n)
                    return pt(r.first, 0, !0, -1);
                var i = Zr(r, n)
                  , o = r.first + r.size - 1;
                if (i > o)
                    return pt(r.first + r.size - 1, Gr(r, o).text.length, !0, 1);
                0 > t && (t = 0);
                for (var s = Gr(r, i); ; ) {
                    var a = mt(e, s, i, t, n)
                      , l = hr(s)
                      , u = l && l.find(0, !0);
                    if (!l || !(a.ch > u.from.ch || a.ch == u.from.ch && a.xRel > 0))
                        return a;
                    i = Xr(s = u.to.line)
                }
            }
            function mt(e, t, n, r, i) {
                function o(r) {
                    var i = dt(e, Ao(n, r), "line", t, u);
                    return a = !0,
                    s > i.bottom ? i.left - l : s < i.top ? i.left + l : (a = !1,
                    i.left)
                }
                var s = i - Jr(t)
                  , a = !1
                  , l = 2 * e.display.wrapper.clientWidth
                  , u = Ze(e, t)
                  , c = ei(t)
                  , d = t.text.length
                  , h = Ji(t)
                  , p = eo(t)
                  , f = o(h)
                  , m = a
                  , g = o(p)
                  , v = a;
                if (r > g)
                    return pt(n, p, v, 1);
                for (; ; ) {
                    if (c ? p == h || p == ao(t, h, 1) : 1 >= p - h) {
                        for (var y = f > r || g - r >= r - f ? h : p, b = r - (y == h ? f : g); Ri(t.text.charAt(y)); )
                            ++y;
                        var w = pt(n, y, y == h ? m : v, -1 > b ? -1 : b > 1 ? 1 : 0);
                        return w
                    }
                    var x = Math.ceil(d / 2)
                      , k = h + x;
                    if (c) {
                        k = h;
                        for (var j = 0; x > j; ++j)
                            k = ao(t, k, 1)
                    }
                    var S = o(k);
                    S > r ? (p = k,
                    g = S,
                    (v = a) && (g += 1e3),
                    d = x) : (h = k,
                    f = S,
                    m = a,
                    d -= x)
                }
            }
            function gt(e) {
                if (null  != e.cachedTextHeight)
                    return e.cachedTextHeight;
                if (null  == Do) {
                    Do = _i("pre");
                    for (var t = 0; 49 > t; ++t)
                        Do.appendChild(document.createTextNode("x")),
                        Do.appendChild(_i("br"));
                    Do.appendChild(document.createTextNode("x"))
                }
                zi(e.measure, Do);
                var n = Do.offsetHeight / 50;
                return n > 3 && (e.cachedTextHeight = n),
                Fi(e.measure),
                n || 1
            }
            function vt(e) {
                if (null  != e.cachedCharWidth)
                    return e.cachedCharWidth;
                var t = _i("span", "xxxxxxxxxx")
                  , n = _i("pre", [t]);
                zi(e.measure, n);
                var r = t.getBoundingClientRect()
                  , i = (r.right - r.left) / 10;
                return i > 2 && (e.cachedCharWidth = i),
                i || 10
            }
            function yt(e) {
                e.curOp = {
                    cm: e,
                    viewChanged: !1,
                    startHeight: e.doc.height,
                    forceUpdate: !1,
                    updateInput: null ,
                    typing: !1,
                    changeObjs: null ,
                    cursorActivityHandlers: null ,
                    cursorActivityCalled: 0,
                    selectionChanged: !1,
                    updateMaxLine: !1,
                    scrollLeft: null ,
                    scrollTop: null ,
                    scrollToPos: null ,
                    focus: !1,
                    id: ++Fo
                },
                _o ? _o.ops.push(e.curOp) : e.curOp.ownsGroup = _o = {
                    ops: [e.curOp],
                    delayedCallbacks: []
                }
            }
            function bt(e) {
                var t = e.delayedCallbacks
                  , n = 0;
                do {
                    for (; n < t.length; n++)
                        t[n]();
                    for (var r = 0; r < e.ops.length; r++) {
                        var i = e.ops[r];
                        if (i.cursorActivityHandlers)
                            for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                                i.cursorActivityHandlers[i.cursorActivityCalled++](i.cm)
                    }
                } while (n < t.length)
            }
            function wt(e) {
                var t = e.curOp
                  , n = t.ownsGroup;
                if (n)
                    try {
                        bt(n)
                    } finally {
                        _o = null ;
                        for (var r = 0; r < n.ops.length; r++)
                            n.ops[r].cm.curOp = null ;
                        xt(n)
                    }
            }
            function xt(e) {
                for (var t = e.ops, n = 0; n < t.length; n++)
                    kt(t[n]);
                for (var n = 0; n < t.length; n++)
                    jt(t[n]);
                for (var n = 0; n < t.length; n++)
                    St(t[n]);
                for (var n = 0; n < t.length; n++)
                    Ct(t[n]);
                for (var n = 0; n < t.length; n++)
                    Lt(t[n])
            }
            function kt(e) {
                var t = e.cm
                  , n = t.display;
                L(t),
                e.updateMaxLine && h(t),
                e.mustUpdate = e.viewChanged || e.forceUpdate || null  != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping,
                e.update = e.mustUpdate && new C(t,e.mustUpdate && {
                    top: e.scrollTop,
                    ensure: e.scrollToPos
                },e.forceUpdate)
            }
            function jt(e) {
                e.updatedDisplay = e.mustUpdate && M(e.cm, e.update)
            }
            function St(e) {
                var t = e.cm
                  , n = t.display;
                e.updatedDisplay && A(t),
                e.barMeasure = f(t),
                n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Ye(t, n.maxLine, n.maxLine.text.length).left + 3,
                t.display.sizerWidth = e.adjustWidthTo,
                e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + We(t) + t.display.barWidth),
                e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - qe(t))),
                (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
            }
            function Ct(e) {
                var t = e.cm;
                null  != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px",
                e.maxScrollLeft < t.doc.scrollLeft && en(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
                t.display.maxLineChanged = !1),
                e.preparedSelection && t.display.input.showSelection(e.preparedSelection),
                e.updatedDisplay && T(t, e.barMeasure),
                (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure),
                e.selectionChanged && Ie(t),
                t.state.focused && e.updateInput && t.display.input.reset(e.typing),
                e.focus && e.focus == Vi() && Y(e.cm)
            }
            function Lt(e) {
                var t = e.cm
                  , n = t.display
                  , r = t.doc;
                if (e.updatedDisplay && O(t, e.update),
                null  == n.wheelStartX || null  == e.scrollTop && null  == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null ),
                null  == e.scrollTop || n.scroller.scrollTop == e.scrollTop && !e.forceScroll || (r.scrollTop = Math.max(0, Math.min(n.scroller.scrollHeight - n.scroller.clientHeight, e.scrollTop)),
                n.scrollbars.setScrollTop(r.scrollTop),
                n.scroller.scrollTop = r.scrollTop),
                null  == e.scrollLeft || n.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (r.scrollLeft = Math.max(0, Math.min(n.scroller.scrollWidth - qe(t), e.scrollLeft)),
                n.scrollbars.setScrollLeft(r.scrollLeft),
                n.scroller.scrollLeft = r.scrollLeft,
                x(t)),
                e.scrollToPos) {
                    var i = Tn(t, me(r, e.scrollToPos.from), me(r, e.scrollToPos.to), e.scrollToPos.margin);
                    e.scrollToPos.isCursor && t.state.focused && En(t, i)
                }
                var o = e.maybeHiddenMarkers
                  , s = e.maybeUnhiddenMarkers;
                if (o)
                    for (var a = 0; a < o.length; ++a)
                        o[a].lines.length || Cs(o[a], "hide");
                if (s)
                    for (var a = 0; a < s.length; ++a)
                        s[a].lines.length && Cs(s[a], "unhide");
                n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop),
                e.changeObjs && Cs(t, "changes", t, e.changeObjs),
                e.update && e.update.finish()
            }
            function Mt(e, t) {
                if (e.curOp)
                    return t();
                yt(e);
                try {
                    return t()
                } finally {
                    wt(e)
                }
            }
            function Ot(e, t) {
                return function() {
                    if (e.curOp)
                        return t.apply(e, arguments);
                    yt(e);
                    try {
                        return t.apply(e, arguments)
                    } finally {
                        wt(e)
                    }
                }
            }
            function Et(e) {
                return function() {
                    if (this.curOp)
                        return e.apply(this, arguments);
                    yt(this);
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        wt(this)
                    }
                }
            }
            function Tt(e) {
                return function() {
                    var t = this.cm;
                    if (!t || t.curOp)
                        return e.apply(this, arguments);
                    yt(t);
                    try {
                        return e.apply(this, arguments)
                    } finally {
                        wt(t)
                    }
                }
            }
            function At(e, t, n) {
                this.line = t,
                this.rest = mr(t),
                this.size = this.rest ? Xr(Oi(this.rest)) - n + 1 : 1,
                this.node = this.text = null ,
                this.hidden = yr(e, t)
            }
            function $t(e, t, n) {
                for (var r, i = [], o = t; n > o; o = r) {
                    var s = new At(e.doc,Gr(e.doc, o),o);
                    r = o + s.size,
                    i.push(s)
                }
                return i
            }
            function Nt(e, t, n, r) {
                null  == t && (t = e.doc.first),
                null  == n && (n = e.doc.first + e.doc.size),
                r || (r = 0);
                var i = e.display;
                if (r && n < i.viewTo && (null  == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t),
                e.curOp.viewChanged = !0,
                t >= i.viewTo)
                    To && gr(e.doc, t) < i.viewTo && Pt(e);
                else if (n <= i.viewFrom)
                    To && vr(e.doc, n + r) > i.viewFrom ? Pt(e) : (i.viewFrom += r,
                    i.viewTo += r);
                else if (t <= i.viewFrom && n >= i.viewTo)
                    Pt(e);
                else if (t <= i.viewFrom) {
                    var o = Rt(e, n, n + r, 1);
                    o ? (i.view = i.view.slice(o.index),
                    i.viewFrom = o.lineN,
                    i.viewTo += r) : Pt(e)
                } else if (n >= i.viewTo) {
                    var o = Rt(e, t, t, -1);
                    o ? (i.view = i.view.slice(0, o.index),
                    i.viewTo = o.lineN) : Pt(e)
                } else {
                    var s = Rt(e, t, t, -1)
                      , a = Rt(e, n, n + r, 1);
                    s && a ? (i.view = i.view.slice(0, s.index).concat($t(e, s.lineN, a.lineN)).concat(i.view.slice(a.index)),
                    i.viewTo += r) : Pt(e)
                }
                var l = i.externalMeasured;
                l && (n < l.lineN ? l.lineN += r : t < l.lineN + l.size && (i.externalMeasured = null ))
            }
            function Dt(e, t, n) {
                e.curOp.viewChanged = !0;
                var r = e.display
                  , i = e.display.externalMeasured;
                if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null ),
                !(t < r.viewFrom || t >= r.viewTo)) {
                    var o = r.view[It(e, t)];
                    if (null  != o.node) {
                        var s = o.changes || (o.changes = []);
                        -1 == Ei(s, n) && s.push(n)
                    }
                }
            }
            function Pt(e) {
                e.display.viewFrom = e.display.viewTo = e.doc.first,
                e.display.view = [],
                e.display.viewOffset = 0
            }
            function It(e, t) {
                if (t >= e.display.viewTo)
                    return null ;
                if (t -= e.display.viewFrom,
                0 > t)
                    return null ;
                for (var n = e.display.view, r = 0; r < n.length; r++)
                    if (t -= n[r].size,
                    0 > t)
                        return r
            }
            function Rt(e, t, n, r) {
                var i, o = It(e, t), s = e.display.view;
                if (!To || n == e.doc.first + e.doc.size)
                    return {
                        index: o,
                        lineN: n
                    };
                for (var a = 0, l = e.display.viewFrom; o > a; a++)
                    l += s[a].size;
                if (l != t) {
                    if (r > 0) {
                        if (o == s.length - 1)
                            return null ;
                        i = l + s[o].size - t,
                        o++
                    } else
                        i = l - t;
                    t += i,
                    n += i
                }
                for (; gr(e.doc, n) != n; ) {
                    if (o == (0 > r ? 0 : s.length - 1))
                        return null ;
                    n += r * s[o - (0 > r ? 1 : 0)].size,
                    o += r
                }
                return {
                    index: o,
                    lineN: n
                }
            }
            function _t(e, t, n) {
                var r = e.display
                  , i = r.view;
                0 == i.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = $t(e, t, n),
                r.viewFrom = t) : (r.viewFrom > t ? r.view = $t(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(It(e, t))),
                r.viewFrom = t,
                r.viewTo < n ? r.view = r.view.concat($t(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, It(e, n)))),
                r.viewTo = n
            }
            function Ft(e) {
                for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
                    var i = t[r];
                    i.hidden || i.node && !i.changes || ++n
                }
                return n
            }
            function zt(e) {
                function t() {
                    i.activeTouch && (o = setTimeout(function() {
                        i.activeTouch = null
                    }, 1e3),
                    s = i.activeTouch,
                    s.end = +new Date)
                }
                function n(e) {
                    if (1 != e.touches.length)
                        return !1;
                    var t = e.touches[0];
                    return t.radiusX <= 1 && t.radiusY <= 1
                }
                function r(e, t) {
                    if (null  == t.left)
                        return !0;
                    var n = t.left - e.left
                      , r = t.top - e.top;
                    return n * n + r * r > 400
                }
                var i = e.display;
                js(i.scroller, "mousedown", Ot(e, qt)),
                po && 11 > fo ? js(i.scroller, "dblclick", Ot(e, function(t) {
                    if (!xi(e, t)) {
                        var n = Wt(e, t);
                        if (n && !Yt(e, t) && !Bt(e.display, t)) {
                            ws(t);
                            var r = e.findWordAt(n);
                            we(e.doc, r.anchor, r.head)
                        }
                    }
                })) : js(i.scroller, "dblclick", function(t) {
                    xi(e, t) || ws(t)
                }),
                Oo || js(i.scroller, "contextmenu", function(t) {
                    mn(e, t)
                });
                var o, s = {
                    end: 0
                };
                js(i.scroller, "touchstart", function(e) {
                    if (!n(e)) {
                        clearTimeout(o);
                        var t = +new Date;
                        i.activeTouch = {
                            start: t,
                            moved: !1,
                            prev: t - s.end <= 300 ? s : null
                        },
                        1 == e.touches.length && (i.activeTouch.left = e.touches[0].pageX,
                        i.activeTouch.top = e.touches[0].pageY)
                    }
                }),
                js(i.scroller, "touchmove", function() {
                    i.activeTouch && (i.activeTouch.moved = !0)
                }),
                js(i.scroller, "touchend", function(n) {
                    var o = i.activeTouch;
                    if (o && !Bt(i, n) && null  != o.left && !o.moved && new Date - o.start < 300) {
                        var s, a = e.coordsChar(i.activeTouch, "page");
                        s = !o.prev || r(o, o.prev) ? new de(a,a) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(a) : new de(Ao(a.line, 0),me(e.doc, Ao(a.line + 1, 0))),
                        e.setSelection(s.anchor, s.head),
                        e.focus(),
                        ws(n)
                    }
                    t()
                }),
                js(i.scroller, "touchcancel", t),
                js(i.scroller, "scroll", function() {
                    i.scroller.clientHeight && (Jt(e, i.scroller.scrollTop),
                    en(e, i.scroller.scrollLeft, !0),
                    Cs(e, "scroll", e))
                }),
                js(i.scroller, "mousewheel", function(t) {
                    tn(e, t)
                }),
                js(i.scroller, "DOMMouseScroll", function(t) {
                    tn(e, t)
                }),
                js(i.wrapper, "scroll", function() {
                    i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
                }),
                i.dragFunctions = {
                    simple: function(t) {
                        xi(e, t) || ks(t)
                    },
                    start: function(t) {
                        Zt(e, t)
                    },
                    drop: Ot(e, Xt)
                };
                var a = i.input.getField();
                js(a, "keyup", function(t) {
                    cn.call(e, t)
                }),
                js(a, "keydown", Ot(e, ln)),
                js(a, "keypress", Ot(e, dn)),
                js(a, "focus", Di(pn, e)),
                js(a, "blur", Di(fn, e))
            }
            function Vt(t, n, r) {
                var i = r && r != e.Init;
                if (!n != !i) {
                    var o = t.display.dragFunctions
                      , s = n ? js : Ss;
                    s(t.display.scroller, "dragstart", o.start),
                    s(t.display.scroller, "dragenter", o.simple),
                    s(t.display.scroller, "dragover", o.simple),
                    s(t.display.scroller, "drop", o.drop)
                }
            }
            function Ht(e) {
                var t = e.display;
                (t.lastWrapHeight != t.wrapper.clientHeight || t.lastWrapWidth != t.wrapper.clientWidth) && (t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null ,
                t.scrollbarsClipped = !1,
                e.setSize())
            }
            function Bt(e, t) {
                for (var n = vi(t); n != e.wrapper; n = n.parentNode)
                    if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover)
                        return !0
            }
            function Wt(e, t, n, r) {
                var i = e.display;
                if (!n && "true" == vi(t).getAttribute("cm-not-content"))
                    return null ;
                var o, s, a = i.lineSpace.getBoundingClientRect();
                try {
                    o = t.clientX - a.left,
                    s = t.clientY - a.top
                } catch (t) {
                    return null
                }
                var l, u = ft(e, o, s);
                if (r && 1 == u.xRel && (l = Gr(e.doc, u.line).text).length == u.ch) {
                    var c = $s(l, l.length, e.options.tabSize) - l.length;
                    u = Ao(u.line, Math.max(0, Math.round((o - Be(e.display).left) / vt(e.display)) - c))
                }
                return u
            }
            function qt(e) {
                var t = this
                  , n = t.display;
                if (!(n.activeTouch && n.input.supportsTouch() || xi(t, e))) {
                    if (n.shift = e.shiftKey,
                    Bt(n, e))
                        return void (mo || (n.scroller.draggable = !1,
                        setTimeout(function() {
                            n.scroller.draggable = !0
                        }, 100)));
                    if (!Yt(t, e)) {
                        var r = Wt(t, e);
                        switch (window.focus(),
                        yi(e)) {
                        case 1:
                            r ? Ut(t, e, r) : vi(e) == n.scroller && ws(e);
                            break;
                        case 2:
                            mo && (t.state.lastMiddleDown = +new Date),
                            r && we(t.doc, r),
                            setTimeout(function() {
                                n.input.focus()
                            }, 20),
                            ws(e);
                            break;
                        case 3:
                            Oo ? mn(t, e) : hn(t)
                        }
                    }
                }
            }
            function Ut(e, t, n) {
                po ? setTimeout(Di(Y, e), 0) : e.curOp.focus = Vi();
                var r, i = +new Date;
                Io && Io.time > i - 400 && 0 == $o(Io.pos, n) ? r = "triple" : Po && Po.time > i - 400 && 0 == $o(Po.pos, n) ? (r = "double",
                Io = {
                    time: i,
                    pos: n
                }) : (r = "single",
                Po = {
                    time: i,
                    pos: n
                });
                var o, s = e.doc.sel, a = So ? t.metaKey : t.ctrlKey;
                e.options.dragDrop && qs && !X(e) && "single" == r && (o = s.contains(n)) > -1 && !s.ranges[o].empty() ? Gt(e, t, n, a) : Kt(e, t, n, r, a)
            }
            function Gt(e, t, n, r) {
                var i = e.display
                  , o = +new Date
                  , s = Ot(e, function(a) {
                    mo && (i.scroller.draggable = !1),
                    e.state.draggingText = !1,
                    Ss(document, "mouseup", s),
                    Ss(i.scroller, "drop", s),
                    Math.abs(t.clientX - a.clientX) + Math.abs(t.clientY - a.clientY) < 10 && (ws(a),
                    !r && +new Date - 200 < o && we(e.doc, n),
                    mo || po && 9 == fo ? setTimeout(function() {
                        document.body.focus(),
                        i.input.focus()
                    }, 20) : i.input.focus())
                });
                mo && (i.scroller.draggable = !0),
                e.state.draggingText = s,
                i.scroller.dragDrop && i.scroller.dragDrop(),
                js(document, "mouseup", s),
                js(i.scroller, "drop", s)
            }
            function Kt(e, t, n, r, i) {
                function o(t) {
                    if (0 != $o(g, t))
                        if (g = t,
                        "rect" == r) {
                            for (var i = [], o = e.options.tabSize, s = $s(Gr(u, n.line).text, n.ch, o), a = $s(Gr(u, t.line).text, t.ch, o), l = Math.min(s, a), p = Math.max(s, a), f = Math.min(n.line, t.line), m = Math.min(e.lastLine(), Math.max(n.line, t.line)); m >= f; f++) {
                                var v = Gr(u, f).text
                                  , y = Li(v, l, o);
                                l == p ? i.push(new de(Ao(f, y),Ao(f, y))) : v.length > y && i.push(new de(Ao(f, y),Ao(f, Li(v, p, o))))
                            }
                            i.length || i.push(new de(n,n)),
                            Le(u, he(h.ranges.slice(0, d).concat(i), d), {
                                origin: "*mouse",
                                scroll: !1
                            }),
                            e.scrollIntoView(t)
                        } else {
                            var b = c
                              , w = b.anchor
                              , x = t;
                            if ("single" != r) {
                                if ("double" == r)
                                    var k = e.findWordAt(t);
                                else
                                    var k = new de(Ao(t.line, 0),me(u, Ao(t.line + 1, 0)));
                                $o(k.anchor, w) > 0 ? (x = k.head,
                                w = Q(b.from(), k.anchor)) : (x = k.anchor,
                                w = K(b.to(), k.head))
                            }
                            var i = h.ranges.slice(0);
                            i[d] = new de(me(u, w),x),
                            Le(u, he(i, d), Ts)
                        }
                }
                function s(t) {
                    var n = ++y
                      , i = Wt(e, t, !0, "rect" == r);
                    if (i)
                        if (0 != $o(i, g)) {
                            e.curOp.focus = Vi(),
                            o(i);
                            var a = w(l, u);
                            (i.line >= a.to || i.line < a.from) && setTimeout(Ot(e, function() {
                                y == n && s(t)
                            }), 150)
                        } else {
                            var c = t.clientY < v.top ? -20 : t.clientY > v.bottom ? 20 : 0;
                            c && setTimeout(Ot(e, function() {
                                y == n && (l.scroller.scrollTop += c,
                                s(t))
                            }), 50)
                        }
                }
                function a(e) {
                    y = 1 / 0,
                    ws(e),
                    l.input.focus(),
                    Ss(document, "mousemove", b),
                    Ss(document, "mouseup", x),
                    u.history.lastSelOrigin = null
                }
                var l = e.display
                  , u = e.doc;
                ws(t);
                var c, d, h = u.sel, p = h.ranges;
                if (i && !t.shiftKey ? (d = u.sel.contains(n),
                c = d > -1 ? p[d] : new de(n,n)) : (c = u.sel.primary(),
                d = u.sel.primIndex),
                t.altKey)
                    r = "rect",
                    i || (c = new de(n,n)),
                    n = Wt(e, t, !0, !0),
                    d = -1;
                else if ("double" == r) {
                    var f = e.findWordAt(n);
                    c = e.display.shift || u.extend ? be(u, c, f.anchor, f.head) : f
                } else if ("triple" == r) {
                    var m = new de(Ao(n.line, 0),me(u, Ao(n.line + 1, 0)));
                    c = e.display.shift || u.extend ? be(u, c, m.anchor, m.head) : m
                } else
                    c = be(u, c, n);
                i ? -1 == d ? (d = p.length,
                Le(u, he(p.concat([c]), d), {
                    scroll: !1,
                    origin: "*mouse"
                })) : p.length > 1 && p[d].empty() && "single" == r && !t.shiftKey ? (Le(u, he(p.slice(0, d).concat(p.slice(d + 1)), 0)),
                h = u.sel) : ke(u, d, c, Ts) : (d = 0,
                Le(u, new ce([c],0), Ts),
                h = u.sel);
                var g = n
                  , v = l.wrapper.getBoundingClientRect()
                  , y = 0
                  , b = Ot(e, function(e) {
                    yi(e) ? s(e) : a(e)
                })
                  , x = Ot(e, a);
                js(document, "mousemove", b),
                js(document, "mouseup", x)
            }
            function Qt(e, t, n, r, i) {
                try {
                    var o = t.clientX
                      , s = t.clientY
                } catch (t) {
                    return !1
                }
                if (o >= Math.floor(e.display.gutters.getBoundingClientRect().right))
                    return !1;
                r && ws(t);
                var a = e.display
                  , l = a.lineDiv.getBoundingClientRect();
                if (s > l.bottom || !ji(e, n))
                    return gi(t);
                s -= l.top - a.viewOffset;
                for (var u = 0; u < e.options.gutters.length; ++u) {
                    var c = a.gutters.childNodes[u];
                    if (c && c.getBoundingClientRect().right >= o) {
                        var d = Zr(e.doc, s)
                          , h = e.options.gutters[u];
                        return i(e, n, e, d, h, t),
                        gi(t)
                    }
                }
            }
            function Yt(e, t) {
                return Qt(e, t, "gutterClick", !0, bi)
            }
            function Xt(e) {
                var t = this;
                if (!xi(t, e) && !Bt(t.display, e)) {
                    ws(e),
                    po && (zo = +new Date);
                    var n = Wt(t, e, !0)
                      , r = e.dataTransfer.files;
                    if (n && !X(t))
                        if (r && r.length && window.FileReader && window.File)
                            for (var i = r.length, o = Array(i), s = 0, a = function(e, r) {
                                var a = new FileReader;
                                a.onload = Ot(t, function() {
                                    if (o[r] = a.result,
                                    ++s == i) {
                                        n = me(t.doc, n);
                                        var e = {
                                            from: n,
                                            to: n,
                                            text: Us(o.join("\n")),
                                            origin: "paste"
                                        };
                                        kn(t.doc, e),
                                        Ce(t.doc, pe(n, Uo(e)))
                                    }
                                }),
                                a.readAsText(e)
                            }
                            , l = 0; i > l; ++l)
                                a(r[l], l);
                        else {
                            if (t.state.draggingText && t.doc.sel.contains(n) > -1)
                                return t.state.draggingText(e),
                                void setTimeout(function() {
                                    t.display.input.focus()
                                }, 20);
                            try {
                                var o = e.dataTransfer.getData("Text");
                                if (o) {
                                    if (t.state.draggingText && !(So ? e.altKey : e.ctrlKey))
                                        var u = t.listSelections();
                                    if (Me(t.doc, pe(n, n)),
                                    u)
                                        for (var l = 0; l < u.length; ++l)
                                            On(t.doc, "", u[l].anchor, u[l].head, "drag");
                                    t.replaceSelection(o, "around", "paste"),
                                    t.display.input.focus()
                                }
                            } catch (e) {}
                        }
                }
            }
            function Zt(e, t) {
                if (po && (!e.state.draggingText || +new Date - zo < 100))
                    return void ks(t);
                if (!xi(e, t) && !Bt(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()),
                t.dataTransfer.setDragImage && !bo)) {
                    var n = _i("img", null , null , "position: fixed; left: 0; top: 0;");
                    n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                    yo && (n.width = n.height = 1,
                    e.display.wrapper.appendChild(n),
                    n._top = n.offsetTop),
                    t.dataTransfer.setDragImage(n, 0, 0),
                    yo && n.parentNode.removeChild(n)
                }
            }
            function Jt(e, t) {
                Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t,
                uo || E(e, {
                    top: t
                }),
                e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t),
                e.display.scrollbars.setScrollTop(t),
                uo && E(e),
                Re(e, 100))
            }
            function en(e, t, n) {
                (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth),
                e.doc.scrollLeft = t,
                x(e),
                e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t),
                e.display.scrollbars.setScrollLeft(t))
            }
            function tn(e, t) {
                var n = Bo(t)
                  , r = n.x
                  , i = n.y
                  , o = e.display
                  , s = o.scroller;
                if (r && s.scrollWidth > s.clientWidth || i && s.scrollHeight > s.clientHeight) {
                    if (i && So && mo)
                        e: for (var a = t.target, l = o.view; a != s; a = a.parentNode)
                            for (var u = 0; u < l.length; u++)
                                if (l[u].node == a) {
                                    e.display.currentWheelTarget = a;
                                    break e
                                }
                    if (r && !uo && !yo && null  != Ho)
                        return i && Jt(e, Math.max(0, Math.min(s.scrollTop + i * Ho, s.scrollHeight - s.clientHeight))),
                        en(e, Math.max(0, Math.min(s.scrollLeft + r * Ho, s.scrollWidth - s.clientWidth))),
                        ws(t),
                        void (o.wheelStartX = null );
                    if (i && null  != Ho) {
                        var c = i * Ho
                          , d = e.doc.scrollTop
                          , h = d + o.wrapper.clientHeight;
                        0 > c ? d = Math.max(0, d + c - 50) : h = Math.min(e.doc.height, h + c + 50),
                        E(e, {
                            top: d,
                            bottom: h
                        })
                    }
                    20 > Vo && (null  == o.wheelStartX ? (o.wheelStartX = s.scrollLeft,
                    o.wheelStartY = s.scrollTop,
                    o.wheelDX = r,
                    o.wheelDY = i,
                    setTimeout(function() {
                        if (null  != o.wheelStartX) {
                            var e = s.scrollLeft - o.wheelStartX
                              , t = s.scrollTop - o.wheelStartY
                              , n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                            o.wheelStartX = o.wheelStartY = null ,
                            n && (Ho = (Ho * Vo + n) / (Vo + 1),
                            ++Vo)
                        }
                    }, 200)) : (o.wheelDX += r,
                    o.wheelDY += i))
                }
            }
            function nn(e, t, n) {
                if ("string" == typeof t && (t = rs[t],
                !t))
                    return !1;
                e.display.input.ensurePolled();
                var r = e.display.shift
                  , i = !1;
                try {
                    X(e) && (e.state.suppressEdits = !0),
                    n && (e.display.shift = !1),
                    i = t(e) != Os
                } finally {
                    e.display.shift = r,
                    e.state.suppressEdits = !1
                }
                return i
            }
            function rn(e, t, n) {
                for (var r = 0; r < e.state.keyMaps.length; r++) {
                    var i = os(t, e.state.keyMaps[r], n, e);
                    if (i)
                        return i
                }
                return e.options.extraKeys && os(t, e.options.extraKeys, n, e) || os(t, e.options.keyMap, n, e)
            }
            function on(e, t, n, r) {
                var i = e.state.keySeq;
                if (i) {
                    if (ss(t))
                        return "handled";
                    Wo.set(50, function() {
                        e.state.keySeq == i && (e.state.keySeq = null ,
                        e.display.input.reset())
                    }),
                    t = i + " " + t
                }
                var o = rn(e, t, r);
                return "multi" == o && (e.state.keySeq = t),
                "handled" == o && bi(e, "keyHandled", e, t, n),
                ("handled" == o || "multi" == o) && (ws(n),
                Ie(e)),
                i && !o && /\'$/.test(t) ? (ws(n),
                !0) : !!o
            }
            function sn(e, t) {
                var n = as(t, !0);
                return n ? t.shiftKey && !e.state.keySeq ? on(e, "Shift-" + n, t, function(t) {
                    return nn(e, t, !0)
                }) || on(e, n, t, function(t) {
                    return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) ? nn(e, t) : void 0
                }) : on(e, n, t, function(t) {
                    return nn(e, t)
                }) : !1
            }
            function an(e, t, n) {
                return on(e, "'" + n + "'", t, function(t) {
                    return nn(e, t, !0)
                })
            }
            function ln(e) {
                var t = this;
                if (t.curOp.focus = Vi(),
                !xi(t, e)) {
                    po && 11 > fo && 27 == e.keyCode && (e.returnValue = !1);
                    var n = e.keyCode;
                    t.display.shift = 16 == n || e.shiftKey;
                    var r = sn(t, e);
                    yo && (qo = r ? n : null ,
                    !r && 88 == n && !Ks && (So ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null , "cut")),
                    18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || un(t)
                }
            }
            function un(e) {
                function t(e) {
                    18 != e.keyCode && e.altKey || (Hs(n, "CodeMirror-crosshair"),
                    Ss(document, "keyup", t),
                    Ss(document, "mouseover", t))
                }
                var n = e.display.lineDiv;
                Bs(n, "CodeMirror-crosshair"),
                js(document, "keyup", t),
                js(document, "mouseover", t)
            }
            function cn(e) {
                16 == e.keyCode && (this.doc.sel.shift = !1),
                xi(this, e)
            }
            function dn(e) {
                var t = this;
                if (!(Bt(t.display, e) || xi(t, e) || e.ctrlKey && !e.altKey || So && e.metaKey)) {
                    var n = e.keyCode
                      , r = e.charCode;
                    if (yo && n == qo)
                        return qo = null ,
                        void ws(e);
                    if (!yo || e.which && !(e.which < 10) || !sn(t, e)) {
                        var i = String.fromCharCode(null  == r ? n : r);
                        an(t, e, i) || t.display.input.onKeyPress(e)
                    }
                }
            }
            function hn(e) {
                e.state.delayingBlurEvent = !0,
                setTimeout(function() {
                    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1,
                    fn(e))
                }, 100)
            }
            function pn(e) {
                e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1),
                "nocursor" != e.options.readOnly && (e.state.focused || (Cs(e, "focus", e),
                e.state.focused = !0,
                Bs(e.display.wrapper, "CodeMirror-focused"),
                e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(),
                mo && setTimeout(function() {
                    e.display.input.reset(!0)
                }, 20)),
                e.display.input.receivedFocus()),
                Ie(e))
            }
            function fn(e) {
                e.state.delayingBlurEvent || (e.state.focused && (Cs(e, "blur", e),
                e.state.focused = !1,
                Hs(e.display.wrapper, "CodeMirror-focused")),
                clearInterval(e.display.blinker),
                setTimeout(function() {
                    e.state.focused || (e.display.shift = !1)
                }, 150))
            }
            function mn(e, t) {
                Bt(e.display, t) || gn(e, t) || e.display.input.onContextMenu(t)
            }
            function gn(e, t) {
                return ji(e, "gutterContextMenu") ? Qt(e, t, "gutterContextMenu", !1, Cs) : !1
            }
            function vn(e, t) {
                if ($o(e, t.from) < 0)
                    return e;
                if ($o(e, t.to) <= 0)
                    return Uo(t);
                var n = e.line + t.text.length - (t.to.line - t.from.line) - 1
                  , r = e.ch;
                return e.line == t.to.line && (r += Uo(t).ch - t.to.ch),
                Ao(n, r)
            }
            function yn(e, t) {
                for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
                    var i = e.sel.ranges[r];
                    n.push(new de(vn(i.anchor, t),vn(i.head, t)))
                }
                return he(n, e.sel.primIndex)
            }
            function bn(e, t, n) {
                return e.line == t.line ? Ao(n.line, e.ch - t.ch + n.ch) : Ao(n.line + (e.line - t.line), e.ch)
            }
            function wn(e, t, n) {
                for (var r = [], i = Ao(e.first, 0), o = i, s = 0; s < t.length; s++) {
                    var a = t[s]
                      , l = bn(a.from, i, o)
                      , u = bn(Uo(a), i, o);
                    if (i = a.to,
                    o = u,
                    "around" == n) {
                        var c = e.sel.ranges[s]
                          , d = $o(c.head, c.anchor) < 0;
                        r[s] = new de(d ? u : l,d ? l : u)
                    } else
                        r[s] = new de(l,l)
                }
                return new ce(r,e.sel.primIndex)
            }
            function xn(e, t, n) {
                var r = {
                    canceled: !1,
                    from: t.from,
                    to: t.to,
                    text: t.text,
                    origin: t.origin,
                    cancel: function() {
                        this.canceled = !0
                    }
                };
                return n && (r.update = function(t, n, r, i) {
                    t && (this.from = me(e, t)),
                    n && (this.to = me(e, n)),
                    r && (this.text = r),
                    void 0 !== i && (this.origin = i)
                }
                ),
                Cs(e, "beforeChange", e, r),
                e.cm && Cs(e.cm, "beforeChange", e.cm, r),
                r.canceled ? null  : {
                    from: r.from,
                    to: r.to,
                    text: r.text,
                    origin: r.origin
                }
            }
            function kn(e, t, n) {
                if (e.cm) {
                    if (!e.cm.curOp)
                        return Ot(e.cm, kn)(e, t, n);
                    if (e.cm.state.suppressEdits)
                        return
                }
                if (!(ji(e, "beforeChange") || e.cm && ji(e.cm, "beforeChange")) || (t = xn(e, t, !0))) {
                    var r = Eo && !n && ir(e, t.from, t.to);
                    if (r)
                        for (var i = r.length - 1; i >= 0; --i)
                            jn(e, {
                                from: r[i].from,
                                to: r[i].to,
                                text: i ? [""] : t.text
                            });
                    else
                        jn(e, t)
                }
            }
            function jn(e, t) {
                if (1 != t.text.length || "" != t.text[0] || 0 != $o(t.from, t.to)) {
                    var n = yn(e, t);
                    oi(e, t, n, e.cm ? e.cm.curOp.id : NaN),
                    Ln(e, t, n, tr(e, t));
                    var r = [];
                    qr(e, function(e, n) {
                        n || -1 != Ei(r, e.history) || (mi(e.history, t),
                        r.push(e.history)),
                        Ln(e, t, null , tr(e, t))
                    })
                }
            }
            function Sn(e, t, n) {
                if (!e.cm || !e.cm.state.suppressEdits) {
                    for (var r, i = e.history, o = e.sel, s = "undo" == t ? i.done : i.undone, a = "undo" == t ? i.undone : i.done, l = 0; l < s.length && (r = s[l],
                    n ? !r.ranges || r.equals(e.sel) : r.ranges); l++)
                        ;
                    if (l != s.length) {
                        for (i.lastOrigin = i.lastSelOrigin = null ; r = s.pop(),
                        r.ranges; ) {
                            if (li(r, a),
                            n && !r.equals(e.sel))
                                return void Le(e, r, {
                                    clearRedo: !1
                                });
                            o = r
                        }
                        var u = [];
                        li(o, a),
                        a.push({
                            changes: u,
                            generation: i.generation
                        }),
                        i.generation = r.generation || ++i.maxGeneration;
                        for (var c = ji(e, "beforeChange") || e.cm && ji(e.cm, "beforeChange"), l = r.changes.length - 1; l >= 0; --l) {
                            var d = r.changes[l];
                            if (d.origin = t,
                            c && !xn(e, d, !1))
                                return void (s.length = 0);
                            u.push(ni(e, d));
                            var h = l ? yn(e, d) : Oi(s);
                            Ln(e, d, h, rr(e, d)),
                            !l && e.cm && e.cm.scrollIntoView({
                                from: d.from,
                                to: Uo(d)
                            });
                            var p = [];
                            qr(e, function(e, t) {
                                t || -1 != Ei(p, e.history) || (mi(e.history, d),
                                p.push(e.history)),
                                Ln(e, d, null , rr(e, d))
                            })
                        }
                    }
                }
            }
            function Cn(e, t) {
                if (0 != t && (e.first += t,
                e.sel = new ce(Ti(e.sel.ranges, function(e) {
                    return new de(Ao(e.anchor.line + t, e.anchor.ch),Ao(e.head.line + t, e.head.ch))
                }),e.sel.primIndex),
                e.cm)) {
                    Nt(e.cm, e.first, e.first - t, t);
                    for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++)
                        Dt(e.cm, r, "gutter")
                }
            }
            function Ln(e, t, n, r) {
                if (e.cm && !e.cm.curOp)
                    return Ot(e.cm, Ln)(e, t, n, r);
                if (t.to.line < e.first)
                    return void Cn(e, t.text.length - 1 - (t.to.line - t.from.line));
                if (!(t.from.line > e.lastLine())) {
                    if (t.from.line < e.first) {
                        var i = t.text.length - 1 - (e.first - t.from.line);
                        Cn(e, i),
                        t = {
                            from: Ao(e.first, 0),
                            to: Ao(t.to.line + i, t.to.ch),
                            text: [Oi(t.text)],
                            origin: t.origin
                        }
                    }
                    var o = e.lastLine();
                    t.to.line > o && (t = {
                        from: t.from,
                        to: Ao(o, Gr(e, o).text.length),
                        text: [t.text[0]],
                        origin: t.origin
                    }),
                    t.removed = Kr(e, t.from, t.to),
                    n || (n = yn(e, t)),
                    e.cm ? Mn(e.cm, t, r) : Hr(e, t, r),
                    Me(e, n, Es)
                }
            }
            function Mn(e, t, n) {
                var r = e.doc
                  , i = e.display
                  , s = t.from
                  , a = t.to
                  , l = !1
                  , u = s.line;
                e.options.lineWrapping || (u = Xr(fr(Gr(r, s.line))),
                r.iter(u, a.line + 1, function(e) {
                    return e == i.maxLine ? (l = !0,
                    !0) : void 0
                })),
                r.sel.contains(t.from, t.to) > -1 && ki(e),
                Hr(r, t, n, o(e)),
                e.options.lineWrapping || (r.iter(u, s.line + t.text.length, function(e) {
                    var t = d(e);
                    t > i.maxLineLength && (i.maxLine = e,
                    i.maxLineLength = t,
                    i.maxLineChanged = !0,
                    l = !1)
                }),
                l && (e.curOp.updateMaxLine = !0)),
                r.frontier = Math.min(r.frontier, s.line),
                Re(e, 400);
                var c = t.text.length - (a.line - s.line) - 1;
                t.full ? Nt(e) : s.line != a.line || 1 != t.text.length || Vr(e.doc, t) ? Nt(e, s.line, a.line + 1, c) : Dt(e, s.line, "text");
                var h = ji(e, "changes")
                  , p = ji(e, "change");
                if (p || h) {
                    var f = {
                        from: s,
                        to: a,
                        text: t.text,
                        removed: t.removed,
                        origin: t.origin
                    };
                    p && bi(e, "change", e, f),
                    h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(f)
                }
                e.display.selForContextMenu = null
            }
            function On(e, t, n, r, i) {
                if (r || (r = n),
                $o(r, n) < 0) {
                    var o = r;
                    r = n,
                    n = o
                }
                "string" == typeof t && (t = Us(t)),
                kn(e, {
                    from: n,
                    to: r,
                    text: t,
                    origin: i
                })
            }
            function En(e, t) {
                if (!xi(e, "scrollCursorIntoView")) {
                    var n = e.display
                      , r = n.sizer.getBoundingClientRect()
                      , i = null ;
                    if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1),
                    null  != i && !xo) {
                        var o = _i("div", "\u200b", null , "position: absolute; top: " + (t.top - n.viewOffset - Ve(e.display)) + "px; height: " + (t.bottom - t.top + We(e) + n.barHeight) + "px; left: " + t.left + "px; width: 2px;");
                        e.display.lineSpace.appendChild(o),
                        o.scrollIntoView(i),
                        e.display.lineSpace.removeChild(o)
                    }
                }
            }
            function Tn(e, t, n, r) {
                null  == r && (r = 0);
                for (var i = 0; 5 > i; i++) {
                    var o = !1
                      , s = dt(e, t)
                      , a = n && n != t ? dt(e, n) : s
                      , l = $n(e, Math.min(s.left, a.left), Math.min(s.top, a.top) - r, Math.max(s.left, a.left), Math.max(s.bottom, a.bottom) + r)
                      , u = e.doc.scrollTop
                      , c = e.doc.scrollLeft;
                    if (null  != l.scrollTop && (Jt(e, l.scrollTop),
                    Math.abs(e.doc.scrollTop - u) > 1 && (o = !0)),
                    null  != l.scrollLeft && (en(e, l.scrollLeft),
                    Math.abs(e.doc.scrollLeft - c) > 1 && (o = !0)),
                    !o)
                        break
                }
                return s
            }
            function An(e, t, n, r, i) {
                var o = $n(e, t, n, r, i);
                null  != o.scrollTop && Jt(e, o.scrollTop),
                null  != o.scrollLeft && en(e, o.scrollLeft)
            }
            function $n(e, t, n, r, i) {
                var o = e.display
                  , s = gt(e.display);
                0 > n && (n = 0);
                var a = e.curOp && null  != e.curOp.scrollTop ? e.curOp.scrollTop : o.scroller.scrollTop
                  , l = Ue(e)
                  , u = {};
                i - n > l && (i = n + l);
                var c = e.doc.height + He(o)
                  , d = s > n
                  , h = i > c - s;
                if (a > n)
                    u.scrollTop = d ? 0 : n;
                else if (i > a + l) {
                    var p = Math.min(n, (h ? c : i) - l);
                    p != a && (u.scrollTop = p)
                }
                var f = e.curOp && null  != e.curOp.scrollLeft ? e.curOp.scrollLeft : o.scroller.scrollLeft
                  , m = qe(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0)
                  , g = r - t > m;
                return g && (r = t + m),
                10 > t ? u.scrollLeft = 0 : f > t ? u.scrollLeft = Math.max(0, t - (g ? 0 : 10)) : r > m + f - 3 && (u.scrollLeft = r + (g ? 0 : 10) - m),
                u
            }
            function Nn(e, t, n) {
                (null  != t || null  != n) && Pn(e),
                null  != t && (e.curOp.scrollLeft = (null  == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) + t),
                null  != n && (e.curOp.scrollTop = (null  == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + n)
            }
            function Dn(e) {
                Pn(e);
                var t = e.getCursor()
                  , n = t
                  , r = t;
                e.options.lineWrapping || (n = t.ch ? Ao(t.line, t.ch - 1) : t,
                r = Ao(t.line, t.ch + 1)),
                e.curOp.scrollToPos = {
                    from: n,
                    to: r,
                    margin: e.options.cursorScrollMargin,
                    isCursor: !0
                }
            }
            function Pn(e) {
                var t = e.curOp.scrollToPos;
                if (t) {
                    e.curOp.scrollToPos = null ;
                    var n = ht(e, t.from)
                      , r = ht(e, t.to)
                      , i = $n(e, Math.min(n.left, r.left), Math.min(n.top, r.top) - t.margin, Math.max(n.right, r.right), Math.max(n.bottom, r.bottom) + t.margin);
                    e.scrollTo(i.scrollLeft, i.scrollTop)
                }
            }
            function In(e, t, n, r) {
                var i, o = e.doc;
                null  == n && (n = "add"),
                "smart" == n && (o.mode.indent ? i = ze(e, t) : n = "prev");
                var s = e.options.tabSize
                  , a = Gr(o, t)
                  , l = $s(a.text, null , s);
                a.stateAfter && (a.stateAfter = null );
                var u, c = a.text.match(/^\s*/)[0];
                if (r || /\S/.test(a.text)) {
                    if ("smart" == n && (u = o.mode.indent(i, a.text.slice(c.length), a.text),
                    u == Os || u > 150)) {
                        if (!r)
                            return;
                        n = "prev"
                    }
                } else
                    u = 0,
                    n = "not";
                "prev" == n ? u = t > o.first ? $s(Gr(o, t - 1).text, null , s) : 0 : "add" == n ? u = l + e.options.indentUnit : "subtract" == n ? u = l - e.options.indentUnit : "number" == typeof n && (u = l + n),
                u = Math.max(0, u);
                var d = ""
                  , h = 0;
                if (e.options.indentWithTabs)
                    for (var p = Math.floor(u / s); p; --p)
                        h += s,
                        d += "  ";
                if (u > h && (d += Mi(u - h)),
                d != c)
                    return On(o, d, Ao(t, 0), Ao(t, c.length), "+input"),
                    a.stateAfter = null ,
                    !0;
                for (var p = 0; p < o.sel.ranges.length; p++) {
                    var f = o.sel.ranges[p];
                    if (f.head.line == t && f.head.ch < c.length) {
                        var h = Ao(t, c.length);
                        ke(o, p, new de(h,h));
                        break
                    }
                }
            }
            function Rn(e, t, n, r) {
                var i = t
                  , o = t;
                return "number" == typeof t ? o = Gr(e, fe(e, t)) : i = Xr(t),
                null  == i ? null  : (r(o, i) && e.cm && Dt(e.cm, i, n),
                o)
            }
            function _n(e, t) {
                for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
                    for (var o = t(n[i]); r.length && $o(o.from, Oi(r).to) <= 0; ) {
                        var s = r.pop();
                        if ($o(s.from, o.from) < 0) {
                            o.from = s.from;
                            break
                        }
                    }
                    r.push(o)
                }
                Mt(e, function() {
                    for (var t = r.length - 1; t >= 0; t--)
                        On(e.doc, "", r[t].from, r[t].to, "+delete");
                    Dn(e)
                })
            }
            function Fn(e, t, n, r, i) {
                function o() {
                    var t = a + n;
                    return t < e.first || t >= e.first + e.size ? d = !1 : (a = t,
                    c = Gr(e, t))
                }
                function s(e) {
                    var t = (i ? ao : lo)(c, l, n, !0);
                    if (null  == t) {
                        if (e || !o())
                            return d = !1;
                        l = i ? (0 > n ? eo : Ji)(c) : 0 > n ? c.text.length : 0
                    } else
                        l = t;
                    return !0
                }
                var a = t.line
                  , l = t.ch
                  , u = n
                  , c = Gr(e, a)
                  , d = !0;
                if ("char" == r)
                    s();
                else if ("column" == r)
                    s(!0);
                else if ("word" == r || "group" == r)
                    for (var h = null , p = "group" == r, f = e.cm && e.cm.getHelper(t, "wordChars"), m = !0; !(0 > n) || s(!m); m = !1) {
                        var g = c.text.charAt(l) || "\n"
                          , v = Pi(g, f) ? "w" : p && "\n" == g ? "n" : !p || /\s/.test(g) ? null  : "p";
                        if (!p || m || v || (v = "s"),
                        h && h != v) {
                            0 > n && (n = 1,
                            s());
                            break
                        }
                        if (v && (h = v),
                        n > 0 && !s(!m))
                            break
                    }
                var y = Ae(e, Ao(a, l), u, !0);
                return d || (y.hitSide = !0),
                y
            }
            function zn(e, t, n, r) {
                var i, o = e.doc, s = t.left;
                if ("page" == r) {
                    var a = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                    i = t.top + n * (a - (0 > n ? 1.5 : .5) * gt(e.display))
                } else
                    "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
                for (; ; ) {
                    var l = ft(e, s, i);
                    if (!l.outside)
                        break;
                    if (0 > n ? 0 >= i : i >= o.height) {
                        l.hitSide = !0;
                        break
                    }
                    i += 5 * n
                }
                return l
            }
            function Vn(t, n, r, i) {
                e.defaults[t] = n,
                r && (Ko[t] = i ? function(e, t, n) {
                    n != Qo && r(e, t, n)
                }
                 : r)
            }
            function Hn(e) {
                for (var t, n, r, i, o = e.split(/-(?!$)/), e = o[o.length - 1], s = 0; s < o.length - 1; s++) {
                    var a = o[s];
                    if (/^(cmd|meta|m)$/i.test(a))
                        i = !0;
                    else if (/^a(lt)?$/i.test(a))
                        t = !0;
                    else if (/^(c|ctrl|control)$/i.test(a))
                        n = !0;
                    else {
                        if (!/^s(hift)$/i.test(a))
                            throw new Error("Unrecognized modifier name: " + a);
                        r = !0
                    }
                }
                return t && (e = "Alt-" + e),
                n && (e = "Ctrl-" + e),
                i && (e = "Cmd-" + e),
                r && (e = "Shift-" + e),
                e
            }
            function Bn(e) {
                return "string" == typeof e ? is[e] : e
            }
            function Wn(e, t, n, r, i) {
                if (r && r.shared)
                    return qn(e, t, n, r, i);
                if (e.cm && !e.cm.curOp)
                    return Ot(e.cm, Wn)(e, t, n, r, i);
                var o = new cs(e,i)
                  , s = $o(t, n);
                if (r && Ni(r, o, !1),
                s > 0 || 0 == s && o.clearWhenEmpty !== !1)
                    return o;
                if (o.replacedWith && (o.collapsed = !0,
                o.widgetNode = _i("span", [o.replacedWith], "CodeMirror-widget"),
                r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"),
                r.insertLeft && (o.widgetNode.insertLeft = !0)),
                o.collapsed) {
                    if (pr(e, t.line, t, n, o) || t.line != n.line && pr(e, n.line, t, n, o))
                        throw new Error("Inserting collapsed marker partially overlapping an existing one");
                    To = !0
                }
                o.addToHistory && oi(e, {
                    from: t,
                    to: n,
                    origin: "markText"
                }, e.sel, NaN);
                var a, l = t.line, u = e.cm;
                if (e.iter(l, n.line + 1, function(e) {
                    u && o.collapsed && !u.options.lineWrapping && fr(e) == u.display.maxLine && (a = !0),
                    o.collapsed && l != t.line && Yr(e, 0),
                    Zn(e, new Qn(o,l == t.line ? t.ch : null ,l == n.line ? n.ch : null )),
                    ++l
                }),
                o.collapsed && e.iter(t.line, n.line + 1, function(t) {
                    yr(e, t) && Yr(t, 0)
                }),
                o.clearOnEnter && js(o, "beforeCursorEnter", function() {
                    o.clear()
                }),
                o.readOnly && (Eo = !0,
                (e.history.done.length || e.history.undone.length) && e.clearHistory()),
                o.collapsed && (o.id = ++us,
                o.atomic = !0),
                u) {
                    if (a && (u.curOp.updateMaxLine = !0),
                    o.collapsed)
                        Nt(u, t.line, n.line + 1);
                    else if (o.className || o.title || o.startStyle || o.endStyle || o.css)
                        for (var c = t.line; c <= n.line; c++)
                            Dt(u, c, "text");
                    o.atomic && Ee(u.doc),
                    bi(u, "markerAdded", u, o)
                }
                return o
            }
            function qn(e, t, n, r, i) {
                r = Ni(r),
                r.shared = !1;
                var o = [Wn(e, t, n, r, i)]
                  , s = o[0]
                  , a = r.widgetNode;
                return qr(e, function(e) {
                    a && (r.widgetNode = a.cloneNode(!0)),
                    o.push(Wn(e, me(e, t), me(e, n), r, i));
                    for (var l = 0; l < e.linked.length; ++l)
                        if (e.linked[l].isParent)
                            return;
                    s = Oi(o)
                }),
                new ds(o,s)
            }
            function Un(e) {
                return e.findMarks(Ao(e.first, 0), e.clipPos(Ao(e.lastLine())), function(e) {
                    return e.parent
                })
            }
            function Gn(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n]
                      , i = r.find()
                      , o = e.clipPos(i.from)
                      , s = e.clipPos(i.to);
                    if ($o(o, s)) {
                        var a = Wn(e, o, s, r.primary, r.primary.type);
                        r.markers.push(a),
                        a.parent = r
                    }
                }
            }
            function Kn(e) {
                for (var t = 0; t < e.length; t++) {
                    var n = e[t]
                      , r = [n.primary.doc];
                    qr(n.primary.doc, function(e) {
                        r.push(e)
                    });
                    for (var i = 0; i < n.markers.length; i++) {
                        var o = n.markers[i];
                        -1 == Ei(r, o.doc) && (o.parent = null ,
                        n.markers.splice(i--, 1))
                    }
                }
            }
            function Qn(e, t, n) {
                this.marker = e,
                this.from = t,
                this.to = n
            }
            function Yn(e, t) {
                if (e)
                    for (var n = 0; n < e.length; ++n) {
                        var r = e[n];
                        if (r.marker == t)
                            return r
                    }
            }
            function Xn(e, t) {
                for (var n, r = 0; r < e.length; ++r)
                    e[r] != t && (n || (n = [])).push(e[r]);
                return n
            }
            function Zn(e, t) {
                e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t],
                t.marker.attachLine(e)
            }
            function Jn(e, t, n) {
                if (e)
                    for (var r, i = 0; i < e.length; ++i) {
                        var o = e[i]
                          , s = o.marker
                          , a = null  == o.from || (s.inclusiveLeft ? o.from <= t : o.from < t);
                        if (a || o.from == t && "bookmark" == s.type && (!n || !o.marker.insertLeft)) {
                            var l = null  == o.to || (s.inclusiveRight ? o.to >= t : o.to > t);
                            (r || (r = [])).push(new Qn(s,o.from,l ? null  : o.to))
                        }
                    }
                return r
            }
            function er(e, t, n) {
                if (e)
                    for (var r, i = 0; i < e.length; ++i) {
                        var o = e[i]
                          , s = o.marker
                          , a = null  == o.to || (s.inclusiveRight ? o.to >= t : o.to > t);
                        if (a || o.from == t && "bookmark" == s.type && (!n || o.marker.insertLeft)) {
                            var l = null  == o.from || (s.inclusiveLeft ? o.from <= t : o.from < t);
                            (r || (r = [])).push(new Qn(s,l ? null  : o.from - t,null  == o.to ? null  : o.to - t))
                        }
                    }
                return r
            }
            function tr(e, t) {
                if (t.full)
                    return null ;
                var n = ve(e, t.from.line) && Gr(e, t.from.line).markedSpans
                  , r = ve(e, t.to.line) && Gr(e, t.to.line).markedSpans;
                if (!n && !r)
                    return null ;
                var i = t.from.ch
                  , o = t.to.ch
                  , s = 0 == $o(t.from, t.to)
                  , a = Jn(n, i, s)
                  , l = er(r, o, s)
                  , u = 1 == t.text.length
                  , c = Oi(t.text).length + (u ? i : 0);
                if (a)
                    for (var d = 0; d < a.length; ++d) {
                        var h = a[d];
                        if (null  == h.to) {
                            var p = Yn(l, h.marker);
                            p ? u && (h.to = null  == p.to ? null  : p.to + c) : h.to = i
                        }
                    }
                if (l)
                    for (var d = 0; d < l.length; ++d) {
                        var h = l[d];
                        if (null  != h.to && (h.to += c),
                        null  == h.from) {
                            var p = Yn(a, h.marker);
                            p || (h.from = c,
                            u && (a || (a = [])).push(h))
                        } else
                            h.from += c,
                            u && (a || (a = [])).push(h)
                    }
                a && (a = nr(a)),
                l && l != a && (l = nr(l));
                var f = [a];
                if (!u) {
                    var m, g = t.text.length - 2;
                    if (g > 0 && a)
                        for (var d = 0; d < a.length; ++d)
                            null  == a[d].to && (m || (m = [])).push(new Qn(a[d].marker,null ,null ));
                    for (var d = 0; g > d; ++d)
                        f.push(m);
                    f.push(l)
                }
                return f
            }
            function nr(e) {
                for (var t = 0; t < e.length; ++t) {
                    var n = e[t];
                    null  != n.from && n.from == n.to && n.marker.clearWhenEmpty !== !1 && e.splice(t--, 1)
                }
                return e.length ? e : null
            }
            function rr(e, t) {
                var n = di(e, t)
                  , r = tr(e, t);
                if (!n)
                    return r;
                if (!r)
                    return n;
                for (var i = 0; i < n.length; ++i) {
                    var o = n[i]
                      , s = r[i];
                    if (o && s)
                        e: for (var a = 0; a < s.length; ++a) {
                            for (var l = s[a], u = 0; u < o.length; ++u)
                                if (o[u].marker == l.marker)
                                    continue e;
                            o.push(l)
                        }
                    else
                        s && (n[i] = s)
                }
                return n
            }
            function ir(e, t, n) {
                var r = null ;
                if (e.iter(t.line, n.line + 1, function(e) {
                    if (e.markedSpans)
                        for (var t = 0; t < e.markedSpans.length; ++t) {
                            var n = e.markedSpans[t].marker;
                            !n.readOnly || r && -1 != Ei(r, n) || (r || (r = [])).push(n)
                        }
                }),
                !r)
                    return null ;
                for (var i = [{
                    from: t,
                    to: n
                }], o = 0; o < r.length; ++o)
                    for (var s = r[o], a = s.find(0), l = 0; l < i.length; ++l) {
                        var u = i[l];
                        if (!($o(u.to, a.from) < 0 || $o(u.from, a.to) > 0)) {
                            var c = [l, 1]
                              , d = $o(u.from, a.from)
                              , h = $o(u.to, a.to);
                            (0 > d || !s.inclusiveLeft && !d) && c.push({
                                from: u.from,
                                to: a.from
                            }),
                            (h > 0 || !s.inclusiveRight && !h) && c.push({
                                from: a.to,
                                to: u.to
                            }),
                            i.splice.apply(i, c),
                            l += c.length - 1
                        }
                    }
                return i
            }
            function or(e) {
                var t = e.markedSpans;
                if (t) {
                    for (var n = 0; n < t.length; ++n)
                        t[n].marker.detachLine(e);
                    e.markedSpans = null
                }
            }
            function sr(e, t) {
                if (t) {
                    for (var n = 0; n < t.length; ++n)
                        t[n].marker.attachLine(e);
                    e.markedSpans = t
                }
            }
            function ar(e) {
                return e.inclusiveLeft ? -1 : 0
            }
            function lr(e) {
                return e.inclusiveRight ? 1 : 0
            }
            function ur(e, t) {
                var n = e.lines.length - t.lines.length;
                if (0 != n)
                    return n;
                var r = e.find()
                  , i = t.find()
                  , o = $o(r.from, i.from) || ar(e) - ar(t);
                if (o)
                    return -o;
                var s = $o(r.to, i.to) || lr(e) - lr(t);
                return s ? s : t.id - e.id
            }
            function cr(e, t) {
                var n, r = To && e.markedSpans;
                if (r)
                    for (var i, o = 0; o < r.length; ++o)
                        i = r[o],
                        i.marker.collapsed && null  == (t ? i.from : i.to) && (!n || ur(n, i.marker) < 0) && (n = i.marker);
                return n
            }
            function dr(e) {
                return cr(e, !0)
            }
            function hr(e) {
                return cr(e, !1)
            }
            function pr(e, t, n, r, i) {
                var o = Gr(e, t)
                  , s = To && o.markedSpans;
                if (s)
                    for (var a = 0; a < s.length; ++a) {
                        var l = s[a];
                        if (l.marker.collapsed) {
                            var u = l.marker.find(0)
                              , c = $o(u.from, n) || ar(l.marker) - ar(i)
                              , d = $o(u.to, r) || lr(l.marker) - lr(i);
                            if (!(c >= 0 && 0 >= d || 0 >= c && d >= 0) && (0 >= c && ($o(u.to, n) > 0 || l.marker.inclusiveRight && i.inclusiveLeft) || c >= 0 && ($o(u.from, r) < 0 || l.marker.inclusiveLeft && i.inclusiveRight)))
                                return !0
                        }
                    }
            }
            function fr(e) {
                for (var t; t = dr(e); )
                    e = t.find(-1, !0).line;
                return e
            }
            function mr(e) {
                for (var t, n; t = hr(e); )
                    e = t.find(1, !0).line,
                    (n || (n = [])).push(e);
                return n
            }
            function gr(e, t) {
                var n = Gr(e, t)
                  , r = fr(n);
                return n == r ? t : Xr(r)
            }
            function vr(e, t) {
                if (t > e.lastLine())
                    return t;
                var n, r = Gr(e, t);
                if (!yr(e, r))
                    return t;
                for (; n = hr(r); )
                    r = n.find(1, !0).line;
                return Xr(r) + 1
            }
            function yr(e, t) {
                var n = To && t.markedSpans;
                if (n)
                    for (var r, i = 0; i < n.length; ++i)
                        if (r = n[i],
                        r.marker.collapsed) {
                            if (null  == r.from)
                                return !0;
                            if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && br(e, t, r))
                                return !0
                        }
            }
            function br(e, t, n) {
                if (null  == n.to) {
                    var r = n.marker.find(1, !0);
                    return br(e, r.line, Yn(r.line.markedSpans, n.marker))
                }
                if (n.marker.inclusiveRight && n.to == t.text.length)
                    return !0;
                for (var i, o = 0; o < t.markedSpans.length; ++o)
                    if (i = t.markedSpans[o],
                    i.marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null  == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && br(e, t, i))
                        return !0
            }
            function wr(e, t, n) {
                Jr(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Nn(e, null , n)
            }
            function xr(e) {
                if (null  != e.height)
                    return e.height;
                var t = e.doc.cm;
                if (!t)
                    return 0;
                if (!Fs(document.body, e.node)) {
                    var n = "position: relative;";
                    e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
                    e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"),
                    zi(t.display.measure, _i("div", [e.node], null , n))
                }
                return e.height = e.node.offsetHeight
            }
            function kr(e, t, n, r) {
                var i = new hs(e,n,r)
                  , o = e.cm;
                return o && i.noHScroll && (o.display.alignWidgets = !0),
                Rn(e, t, "widget", function(t) {
                    var n = t.widgets || (t.widgets = []);
                    if (null  == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i),
                    i.line = t,
                    o && !yr(e, t)) {
                        var r = Jr(t) < e.scrollTop;
                        Yr(t, t.height + xr(i)),
                        r && Nn(o, null , i.height),
                        o.curOp.forceUpdate = !0
                    }
                    return !0
                }),
                i
            }
            function jr(e, t, n, r) {
                e.text = t,
                e.stateAfter && (e.stateAfter = null ),
                e.styles && (e.styles = null ),
                null  != e.order && (e.order = null ),
                or(e),
                sr(e, n);
                var i = r ? r(e) : 1;
                i != e.height && Yr(e, i)
            }
            function Sr(e) {
                e.parent = null ,
                or(e)
            }
            function Cr(e, t) {
                if (e)
                    for (; ; ) {
                        var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                        if (!n)
                            break;
                        e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                        var r = n[1] ? "bgClass" : "textClass";
                        null  == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2])
                    }
                return e
            }
            function Lr(t, n) {
                if (t.blankLine)
                    return t.blankLine(n);
                if (t.innerMode) {
                    var r = e.innerMode(t, n);
                    return r.mode.blankLine ? r.mode.blankLine(r.state) : void 0
                }
            }
            function Mr(t, n, r, i) {
                for (var o = 0; 10 > o; o++) {
                    i && (i[0] = e.innerMode(t, r).mode);
                    var s = t.token(n, r);
                    if (n.pos > n.start)
                        return s
                }
                throw new Error("Mode " + t.name + " failed to advance stream.")
            }
            function Or(e, t, n, r) {
                function i(e) {
                    return {
                        start: d.start,
                        end: d.pos,
                        string: d.current(),
                        type: o || null ,
                        state: e ? ts(s.mode, c) : c
                    }
                }
                var o, s = e.doc, a = s.mode;
                t = me(s, t);
                var l, u = Gr(s, t.line), c = ze(e, t.line, n), d = new ls(u.text,e.options.tabSize);
                for (r && (l = []); (r || d.pos < t.ch) && !d.eol(); )
                    d.start = d.pos,
                    o = Mr(a, d, c),
                    r && l.push(i(!0));
                return r ? l : i()
            }
            function Er(e, t, n, r, i, o, s) {
                var a = n.flattenSpans;
                null  == a && (a = e.options.flattenSpans);
                var l, u = 0, c = null , d = new ls(t,e.options.tabSize), h = e.options.addModeClass && [null ];
                for ("" == t && Cr(Lr(n, r), o); !d.eol(); ) {
                    if (d.pos > e.options.maxHighlightLength ? (a = !1,
                    s && $r(e, t, r, d.pos),
                    d.pos = t.length,
                    l = null ) : l = Cr(Mr(n, d, r, h), o),
                    h) {
                        var p = h[0].name;
                        p && (l = "m-" + (l ? p + " " + l : p))
                    }
                    if (!a || c != l) {
                        for (; u < d.start; )
                            u = Math.min(d.start, u + 5e4),
                            i(u, c);
                        c = l
                    }
                    d.start = d.pos
                }
                for (; u < d.pos; ) {
                    var f = Math.min(d.pos, u + 5e4);
                    i(f, c),
                    u = f
                }
            }
            function Tr(e, t, n, r) {
                var i = [e.state.modeGen]
                  , o = {};
                Er(e, t.text, e.doc.mode, n, function(e, t) {
                    i.push(e, t)
                }, o, r);
                for (var s = 0; s < e.state.overlays.length; ++s) {
                    var a = e.state.overlays[s]
                      , l = 1
                      , u = 0;
                    Er(e, t.text, a.mode, !0, function(e, t) {
                        for (var n = l; e > u; ) {
                            var r = i[l];
                            r > e && i.splice(l, 1, e, i[l + 1], r),
                            l += 2,
                            u = Math.min(e, r)
                        }
                        if (t)
                            if (a.opaque)
                                i.splice(n, l - n, e, "cm-overlay " + t),
                                l = n + 2;
                            else
                                for (; l > n; n += 2) {
                                    var o = i[n + 1];
                                    i[n + 1] = (o ? o + " " : "") + "cm-overlay " + t
                                }
                    }, o)
                }
                return {
                    styles: i,
                    classes: o.bgClass || o.textClass ? o : null
                }
            }
            function Ar(e, t, n) {
                if (!t.styles || t.styles[0] != e.state.modeGen) {
                    var r = Tr(e, t, t.stateAfter = ze(e, Xr(t)));
                    t.styles = r.styles,
                    r.classes ? t.styleClasses = r.classes : t.styleClasses && (t.styleClasses = null ),
                    n === e.doc.frontier && e.doc.frontier++
                }
                return t.styles
            }
            function $r(e, t, n, r) {
                var i = e.doc.mode
                  , o = new ls(t,e.options.tabSize);
                for (o.start = o.pos = r || 0,
                "" == t && Lr(i, n); !o.eol() && o.pos <= e.options.maxHighlightLength; )
                    Mr(i, o, n),
                    o.start = o.pos
            }
            function Nr(e, t) {
                if (!e || /^\s*$/.test(e))
                    return null ;
                var n = t.addModeClass ? ms : fs;
                return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
            }
            function Dr(e, t) {
                var n = _i("span", null , null , mo ? "padding-right: .1px" : null )
                  , r = {
                    pre: _i("pre", [n]),
                    content: n,
                    col: 0,
                    pos: 0,
                    cm: e,
                    splitSpaces: (po || mo) && e.getOption("lineWrapping")
                };
                t.measure = {};
                for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                    var o, s = i ? t.rest[i - 1] : t.line;
                    r.pos = 0,
                    r.addToken = Ir,
                    Ki(e.display.measure) && (o = ei(s)) && (r.addToken = _r(r.addToken, o)),
                    r.map = [];
                    var a = t != e.display.externalMeasured && Xr(s);
                    zr(s, r, Ar(e, s, a)),
                    s.styleClasses && (s.styleClasses.bgClass && (r.bgClass = Bi(s.styleClasses.bgClass, r.bgClass || "")),
                    s.styleClasses.textClass && (r.textClass = Bi(s.styleClasses.textClass, r.textClass || ""))),
                    0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Gi(e.display.measure))),
                    0 == i ? (t.measure.map = r.map,
                    t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map),
                    (t.measure.caches || (t.measure.caches = [])).push({}))
                }
                return mo && /\bcm-tab\b/.test(r.content.lastChild.className) && (r.content.className = "cm-tab-wrap-hack"),
                Cs(e, "renderLine", e, t.line, r.pre),
                r.pre.className && (r.textClass = Bi(r.pre.className, r.textClass || "")),
                r
            }
            function Pr(e) {
                var t = _i("span", "\u2022", "cm-invalidchar");
                return t.title = "\\u" + e.charCodeAt(0).toString(16),
                t.setAttribute("aria-label", t.title),
                t
            }
            function Ir(e, t, n, r, i, o, s) {
                if (t) {
                    var a = e.splitSpaces ? t.replace(/ {3,}/g, Rr) : t
                      , l = e.cm.state.specialChars
                      , u = !1;
                    if (l.test(t))
                        for (var c = document.createDocumentFragment(), d = 0; ; ) {
                            l.lastIndex = d;
                            var h = l.exec(t)
                              , p = h ? h.index - d : t.length - d;
                            if (p) {
                                var f = document.createTextNode(a.slice(d, d + p));
                                po && 9 > fo ? c.appendChild(_i("span", [f])) : c.appendChild(f),
                                e.map.push(e.pos, e.pos + p, f),
                                e.col += p,
                                e.pos += p
                            }
                            if (!h)
                                break;
                            if (d += p + 1,
                            "   " == h[0]) {
                                var m = e.cm.options.tabSize
                                  , g = m - e.col % m
                                  , f = c.appendChild(_i("span", Mi(g), "cm-tab"));
                                f.setAttribute("role", "presentation"),
                                f.setAttribute("cm-text", " "),
                                e.col += g
                            } else {
                                var f = e.cm.options.specialCharPlaceholder(h[0]);
                                f.setAttribute("cm-text", h[0]),
                                po && 9 > fo ? c.appendChild(_i("span", [f])) : c.appendChild(f),
                                e.col += 1
                            }
                            e.map.push(e.pos, e.pos + 1, f),
                            e.pos++
                        }
                    else {
                        e.col += t.length;
                        var c = document.createTextNode(a);
                        e.map.push(e.pos, e.pos + t.length, c),
                        po && 9 > fo && (u = !0),
                        e.pos += t.length
                    }
                    if (n || r || i || u || s) {
                        var v = n || "";
                        r && (v += r),
                        i && (v += i);
                        var y = _i("span", [c], v, s);
                        return o && (y.title = o),
                        e.content.appendChild(y)
                    }
                    e.content.appendChild(c)
                }
            }
            function Rr(e) {
                for (var t = " ", n = 0; n < e.length - 2; ++n)
                    t += n % 2 ? " " : "\xa0";
                return t += " "
            }
            function _r(e, t) {
                return function(n, r, i, o, s, a, l) {
                    i = i ? i + " cm-force-border" : "cm-force-border";
                    for (var u = n.pos, c = u + r.length; ; ) {
                        for (var d = 0; d < t.length; d++) {
                            var h = t[d];
                            if (h.to > u && h.from <= u)
                                break
                        }
                        if (h.to >= c)
                            return e(n, r, i, o, s, a, l);
                        e(n, r.slice(0, h.to - u), i, o, null , a, l),
                        o = null ,
                        r = r.slice(h.to - u),
                        u = h.to
                    }
                }
            }
            function Fr(e, t, n, r) {
                var i = !r && n.widgetNode;
                i && e.map.push(e.pos, e.pos + t, i),
                !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))),
                i.setAttribute("cm-marker", n.id)),
                i && (e.cm.display.input.setUneditable(i),
                e.content.appendChild(i)),
                e.pos += t
            }
            function zr(e, t, n) {
                var r = e.markedSpans
                  , i = e.text
                  , o = 0;
                if (r)
                    for (var s, a, l, u, c, d, h, p = i.length, f = 0, m = 1, g = "", v = 0; ; ) {
                        if (v == f) {
                            l = u = c = d = a = "",
                            h = null ,
                            v = 1 / 0;
                            for (var y = [], b = 0; b < r.length; ++b) {
                                var w = r[b]
                                  , x = w.marker;
                                "bookmark" == x.type && w.from == f && x.widgetNode ? y.push(x) : w.from <= f && (null  == w.to || w.to > f || x.collapsed && w.to == f && w.from == f) ? (null  != w.to && w.to != f && v > w.to && (v = w.to,
                                u = ""),
                                x.className && (l += " " + x.className),
                                x.css && (a = x.css),
                                x.startStyle && w.from == f && (c += " " + x.startStyle),
                                x.endStyle && w.to == v && (u += " " + x.endStyle),
                                x.title && !d && (d = x.title),
                                x.collapsed && (!h || ur(h.marker, x) < 0) && (h = w)) : w.from > f && v > w.from && (v = w.from)
                            }
                            if (h && (h.from || 0) == f) {
                                if (Fr(t, (null  == h.to ? p + 1 : h.to) - f, h.marker, null  == h.from),
                                null  == h.to)
                                    return;
                                h.to == f && (h = !1)
                            }
                            if (!h && y.length)
                                for (var b = 0; b < y.length; ++b)
                                    Fr(t, 0, y[b])
                        }
                        if (f >= p)
                            break;
                        for (var k = Math.min(p, v); ; ) {
                            if (g) {
                                var j = f + g.length;
                                if (!h) {
                                    var S = j > k ? g.slice(0, k - f) : g;
                                    t.addToken(t, S, s ? s + l : l, c, f + S.length == v ? u : "", d, a)
                                }
                                if (j >= k) {
                                    g = g.slice(k - f),
                                    f = k;
                                    break
                                }
                                f = j,
                                c = ""
                            }
                            g = i.slice(o, o = n[m++]),
                            s = Nr(n[m++], t.cm.options)
                        }
                    }
                else
                    for (var m = 1; m < n.length; m += 2)
                        t.addToken(t, i.slice(o, o = n[m]), Nr(n[m + 1], t.cm.options))
            }
            function Vr(e, t) {
                return 0 == t.from.ch && 0 == t.to.ch && "" == Oi(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
            }
            function Hr(e, t, n, r) {
                function i(e) {
                    return n ? n[e] : null
                }
                function o(e, n, i) {
                    jr(e, n, i, r),
                    bi(e, "change", e, t)
                }
                function s(e, t) {
                    for (var n = e, o = []; t > n; ++n)
                        o.push(new ps(u[n],i(n),r));
                    return o
                }
                var a = t.from
                  , l = t.to
                  , u = t.text
                  , c = Gr(e, a.line)
                  , d = Gr(e, l.line)
                  , h = Oi(u)
                  , p = i(u.length - 1)
                  , f = l.line - a.line;
                if (t.full)
                    e.insert(0, s(0, u.length)),
                    e.remove(u.length, e.size - u.length);
                else if (Vr(e, t)) {
                    var m = s(0, u.length - 1);
                    o(d, d.text, p),
                    f && e.remove(a.line, f),
                    m.length && e.insert(a.line, m)
                } else if (c == d)
                    if (1 == u.length)
                        o(c, c.text.slice(0, a.ch) + h + c.text.slice(l.ch), p);
                    else {
                        var m = s(1, u.length - 1);
                        m.push(new ps(h + c.text.slice(l.ch),p,r)),
                        o(c, c.text.slice(0, a.ch) + u[0], i(0)),
                        e.insert(a.line + 1, m)
                    }
                else if (1 == u.length)
                    o(c, c.text.slice(0, a.ch) + u[0] + d.text.slice(l.ch), i(0)),
                    e.remove(a.line + 1, f);
                else {
                    o(c, c.text.slice(0, a.ch) + u[0], i(0)),
                    o(d, h + d.text.slice(l.ch), p);
                    var m = s(1, u.length - 1);
                    f > 1 && e.remove(a.line + 1, f - 1),
                    e.insert(a.line + 1, m)
                }
                bi(e, "change", e, t)
            }
            function Br(e) {
                this.lines = e,
                this.parent = null ;
                for (var t = 0, n = 0; t < e.length; ++t)
                    e[t].parent = this,
                    n += e[t].height;
                this.height = n
            }
            function Wr(e) {
                this.children = e;
                for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
                    var i = e[r];
                    t += i.chunkSize(),
                    n += i.height,
                    i.parent = this
                }
                this.size = t,
                this.height = n,
                this.parent = null
            }
            function qr(e, t, n) {
                function r(e, i, o) {
                    if (e.linked)
                        for (var s = 0; s < e.linked.length; ++s) {
                            var a = e.linked[s];
                            if (a.doc != i) {
                                var l = o && a.sharedHist;
                                (!n || l) && (t(a.doc, l),
                                r(a.doc, e, l))
                            }
                        }
                }
                r(e, null , !0)
            }
            function Ur(e, t) {
                if (t.cm)
                    throw new Error("This document is already in use.");
                e.doc = t,
                t.cm = e,
                s(e),
                n(e),
                e.options.lineWrapping || h(e),
                e.options.mode = t.modeOption,
                Nt(e)
            }
            function Gr(e, t) {
                if (t -= e.first,
                0 > t || t >= e.size)
                    throw new Error("There is no line " + (t + e.first) + " in the document.");
                for (var n = e; !n.lines; )
                    for (var r = 0; ; ++r) {
                        var i = n.children[r]
                          , o = i.chunkSize();
                        if (o > t) {
                            n = i;
                            break
                        }
                        t -= o
                    }
                return n.lines[t]
            }
            function Kr(e, t, n) {
                var r = []
                  , i = t.line;
                return e.iter(t.line, n.line + 1, function(e) {
                    var o = e.text;
                    i == n.line && (o = o.slice(0, n.ch)),
                    i == t.line && (o = o.slice(t.ch)),
                    r.push(o),
                    ++i
                }),
                r
            }
            function Qr(e, t, n) {
                var r = [];
                return e.iter(t, n, function(e) {
                    r.push(e.text)
                }),
                r
            }
            function Yr(e, t) {
                var n = t - e.height;
                if (n)
                    for (var r = e; r; r = r.parent)
                        r.height += n
            }
            function Xr(e) {
                if (null  == e.parent)
                    return null ;
                for (var t = e.parent, n = Ei(t.lines, e), r = t.parent; r; t = r,
                r = r.parent)
                    for (var i = 0; r.children[i] != t; ++i)
                        n += r.children[i].chunkSize();
                return n + t.first
            }
            function Zr(e, t) {
                var n = e.first;
                e: do {
                    for (var r = 0; r < e.children.length; ++r) {
                        var i = e.children[r]
                          , o = i.height;
                        if (o > t) {
                            e = i;
                            continue e
                        }
                        t -= o,
                        n += i.chunkSize()
                    }
                    return n
                } while (!e.lines);for (var r = 0; r < e.lines.length; ++r) {
                    var s = e.lines[r]
                      , a = s.height;
                    if (a > t)
                        break;
                    t -= a
                }
                return n + r
            }
            function Jr(e) {
                e = fr(e);
                for (var t = 0, n = e.parent, r = 0; r < n.lines.length; ++r) {
                    var i = n.lines[r];
                    if (i == e)
                        break;
                    t += i.height
                }
                for (var o = n.parent; o; n = o,
                o = n.parent)
                    for (var r = 0; r < o.children.length; ++r) {
                        var s = o.children[r];
                        if (s == n)
                            break;
                        t += s.height
                    }
                return t
            }
            function ei(e) {
                var t = e.order;
                return null  == t && (t = e.order = Zs(e.text)),
                t
            }
            function ti(e) {
                this.done = [],
                this.undone = [],
                this.undoDepth = 1 / 0,
                this.lastModTime = this.lastSelTime = 0,
                this.lastOp = this.lastSelOp = null ,
                this.lastOrigin = this.lastSelOrigin = null ,
                this.generation = this.maxGeneration = e || 1
            }
            function ni(e, t) {
                var n = {
                    from: G(t.from),
                    to: Uo(t),
                    text: Kr(e, t.from, t.to)
                };
                return ui(e, n, t.from.line, t.to.line + 1),
                qr(e, function(e) {
                    ui(e, n, t.from.line, t.to.line + 1)
                }, !0),
                n
            }
            function ri(e) {
                for (; e.length; ) {
                    var t = Oi(e);
                    if (!t.ranges)
                        break;
                    e.pop()
                }
            }
            function ii(e, t) {
                return t ? (ri(e.done),
                Oi(e.done)) : e.done.length && !Oi(e.done).ranges ? Oi(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(),
                Oi(e.done)) : void 0
            }
            function oi(e, t, n, r) {
                var i = e.history;
                i.undone.length = 0;
                var o, s = +new Date;
                if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && e.cm && i.lastModTime > s - e.cm.options.historyEventDelay || "*" == t.origin.charAt(0))) && (o = ii(i, i.lastOp == r))) {
                    var a = Oi(o.changes);
                    0 == $o(t.from, t.to) && 0 == $o(t.from, a.to) ? a.to = Uo(t) : o.changes.push(ni(e, t))
                } else {
                    var l = Oi(i.done);
                    for (l && l.ranges || li(e.sel, i.done),
                    o = {
                        changes: [ni(e, t)],
                        generation: i.generation
                    },
                    i.done.push(o); i.done.length > i.undoDepth; )
                        i.done.shift(),
                        i.done[0].ranges || i.done.shift()
                }
                i.done.push(n),
                i.generation = ++i.maxGeneration,
                i.lastModTime = i.lastSelTime = s,
                i.lastOp = i.lastSelOp = r,
                i.lastOrigin = i.lastSelOrigin = t.origin,
                a || Cs(e, "historyAdded")
            }
            function si(e, t, n, r) {
                var i = t.charAt(0);
                return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
            }
            function ai(e, t, n, r) {
                var i = e.history
                  , o = r && r.origin;
                n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || si(e, o, Oi(i.done), t)) ? i.done[i.done.length - 1] = t : li(t, i.done),
                i.lastSelTime = +new Date,
                i.lastSelOrigin = o,
                i.lastSelOp = n,
                r && r.clearRedo !== !1 && ri(i.undone)
            }
            function li(e, t) {
                var n = Oi(t);
                n && n.ranges && n.equals(e) || t.push(e)
            }
            function ui(e, t, n, r) {
                var i = t["spans_" + e.id]
                  , o = 0;
                e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
                    n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans),
                    ++o
                })
            }
            function ci(e) {
                if (!e)
                    return null ;
                for (var t, n = 0; n < e.length; ++n)
                    e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
                return t ? t.length ? t : null  : e
            }
            function di(e, t) {
                var n = t["spans_" + e.id];
                if (!n)
                    return null ;
                for (var r = 0, i = []; r < t.text.length; ++r)
                    i.push(ci(n[r]));
                return i
            }
            function hi(e, t, n) {
                for (var r = 0, i = []; r < e.length; ++r) {
                    var o = e[r];
                    if (o.ranges)
                        i.push(n ? ce.prototype.deepCopy.call(o) : o);
                    else {
                        var s = o.changes
                          , a = [];
                        i.push({
                            changes: a
                        });
                        for (var l = 0; l < s.length; ++l) {
                            var u, c = s[l];
                            if (a.push({
                                from: c.from,
                                to: c.to,
                                text: c.text
                            }),
                            t)
                                for (var d in c)
                                    (u = d.match(/^spans_(\d+)$/)) && Ei(t, Number(u[1])) > -1 && (Oi(a)[d] = c[d],
                                    delete c[d])
                        }
                    }
                }
                return i
            }
            function pi(e, t, n, r) {
                n < e.line ? e.line += r : t < e.line && (e.line = t,
                e.ch = 0)
            }
            function fi(e, t, n, r) {
                for (var i = 0; i < e.length; ++i) {
                    var o = e[i]
                      , s = !0;
                    if (o.ranges) {
                        o.copied || (o = e[i] = o.deepCopy(),
                        o.copied = !0);
                        for (var a = 0; a < o.ranges.length; a++)
                            pi(o.ranges[a].anchor, t, n, r),
                            pi(o.ranges[a].head, t, n, r)
                    } else {
                        for (var a = 0; a < o.changes.length; ++a) {
                            var l = o.changes[a];
                            if (n < l.from.line)
                                l.from = Ao(l.from.line + r, l.from.ch),
                                l.to = Ao(l.to.line + r, l.to.ch);
                            else if (t <= l.to.line) {
                                s = !1;
                                break
                            }
                        }
                        s || (e.splice(0, i + 1),
                        i = 0)
                    }
                }
            }
            function mi(e, t) {
                var n = t.from.line
                  , r = t.to.line
                  , i = t.text.length - (r - n) - 1;
                fi(e.done, n, r, i),
                fi(e.undone, n, r, i)
            }
            function gi(e) {
                return null  != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
            }
            function vi(e) {
                return e.target || e.srcElement
            }
            function yi(e) {
                var t = e.which;
                return null  == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)),
                So && e.ctrlKey && 1 == t && (t = 3),
                t
            }
            function bi(e, t) {
                function n(e) {
                    return function() {
                        e.apply(null , o)
                    }
                }
                var r = e._handlers && e._handlers[t];
                if (r) {
                    var i, o = Array.prototype.slice.call(arguments, 2);
                    _o ? i = _o.delayedCallbacks : Ls ? i = Ls : (i = Ls = [],
                    setTimeout(wi, 0));
                    for (var s = 0; s < r.length; ++s)
                        i.push(n(r[s]))
                }
            }
            function wi() {
                var e = Ls;
                Ls = null ;
                for (var t = 0; t < e.length; ++t)
                    e[t]()
            }
            function xi(e, t, n) {
                return "string" == typeof t && (t = {
                    type: t,
                    preventDefault: function() {
                        this.defaultPrevented = !0
                    }
                }),
                Cs(e, n || t.type, e, t),
                gi(t) || t.codemirrorIgnore
            }
            function ki(e) {
                var t = e._handlers && e._handlers.cursorActivity;
                if (t)
                    for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r)
                        -1 == Ei(n, t[r]) && n.push(t[r])
            }
            function ji(e, t) {
                var n = e._handlers && e._handlers[t];
                return n && n.length > 0
            }
            function Si(e) {
                e.prototype.on = function(e, t) {
                    js(this, e, t)
                }
                ,
                e.prototype.off = function(e, t) {
                    Ss(this, e, t)
                }
            }
            function Ci() {
                this.id = null
            }
            function Li(e, t, n) {
                for (var r = 0, i = 0; ; ) {
                    var o = e.indexOf(" ", r);
                    -1 == o && (o = e.length);
                    var s = o - r;
                    if (o == e.length || i + s >= t)
                        return r + Math.min(s, t - i);
                    if (i += o - r,
                    i += n - i % n,
                    r = o + 1,
                    i >= t)
                        return r
                }
            }
            function Mi(e) {
                for (; Ns.length <= e; )
                    Ns.push(Oi(Ns) + " ");
                return Ns[e]
            }
            function Oi(e) {
                return e[e.length - 1]
            }
            function Ei(e, t) {
                for (var n = 0; n < e.length; ++n)
                    if (e[n] == t)
                        return n;
                return -1
            }
            function Ti(e, t) {
                for (var n = [], r = 0; r < e.length; r++)
                    n[r] = t(e[r], r);
                return n
            }
            function Ai() {}
            function $i(e, t) {
                var n;
                return Object.create ? n = Object.create(e) : (Ai.prototype = e,
                n = new Ai),
                t && Ni(t, n),
                n
            }
            function Ni(e, t, n) {
                t || (t = {});
                for (var r in e)
                    !e.hasOwnProperty(r) || n === !1 && t.hasOwnProperty(r) || (t[r] = e[r]);
                return t
            }
            function Di(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return function() {
                    return e.apply(null , t)
                }
            }
            function Pi(e, t) {
                return t ? t.source.indexOf("\\w") > -1 && Rs(e) ? !0 : t.test(e) : Rs(e)
            }
            function Ii(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t) && e[t])
                        return !1;
                return !0
            }
            function Ri(e) {
                return e.charCodeAt(0) >= 768 && _s.test(e)
            }
            function _i(e, t, n, r) {
                var i = document.createElement(e);
                if (n && (i.className = n),
                r && (i.style.cssText = r),
                "string" == typeof t)
                    i.appendChild(document.createTextNode(t));
                else if (t)
                    for (var o = 0; o < t.length; ++o)
                        i.appendChild(t[o]);
                return i
            }
            function Fi(e) {
                for (var t = e.childNodes.length; t > 0; --t)
                    e.removeChild(e.firstChild);
                return e
            }
            function zi(e, t) {
                return Fi(e).appendChild(t)
            }
            function Vi() {
                return document.activeElement
            }
            function Hi(e) {
                return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
            }
            function Bi(e, t) {
                for (var n = e.split(" "), r = 0; r < n.length; r++)
                    n[r] && !Hi(n[r]).test(t) && (t += " " + n[r]);
                return t
            }
            function Wi(e) {
                if (document.body.getElementsByClassName)
                    for (var t = document.body.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                        var r = t[n].CodeMirror;
                        r && e(r)
                    }
            }
            function qi() {
                Ws || (Ui(),
                Ws = !0)
            }
            function Ui() {
                var e;
                js(window, "resize", function() {
                    null  == e && (e = setTimeout(function() {
                        e = null ,
                        Wi(Ht)
                    }, 100))
                }),
                js(window, "blur", function() {
                    Wi(fn)
                })
            }
            function Gi(e) {
                if (null  == zs) {
                    var t = _i("span", "\u200b");
                    zi(e, _i("span", [t, document.createTextNode("x")])),
                    0 != e.firstChild.offsetHeight && (zs = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(po && 8 > fo))
                }
                var n = zs ? _i("span", "\u200b") : _i("span", "\xa0", null , "display: inline-block; width: 1px; margin-right: -1px");
                return n.setAttribute("cm-text", ""),
                n
            }
            function Ki(e) {
                if (null  != Vs)
                    return Vs;
                var t = zi(e, document.createTextNode("A\u062eA"))
                  , n = Ps(t, 0, 1).getBoundingClientRect();
                if (!n || n.left == n.right)
                    return !1;
                var r = Ps(t, 1, 2).getBoundingClientRect();
                return Vs = r.right - n.right < 3
            }
            function Qi(e) {
                if (null  != Qs)
                    return Qs;
                var t = zi(e, _i("span", "x"))
                  , n = t.getBoundingClientRect()
                  , r = Ps(t, 0, 1).getBoundingClientRect();
                return Qs = Math.abs(n.left - r.left) > 1
            }
            function Yi(e, t, n, r) {
                if (!e)
                    return r(t, n, "ltr");
                for (var i = !1, o = 0; o < e.length; ++o) {
                    var s = e[o];
                    (s.from < n && s.to > t || t == n && s.to == t) && (r(Math.max(s.from, t), Math.min(s.to, n), 1 == s.level ? "rtl" : "ltr"),
                    i = !0)
                }
                i || r(t, n, "ltr")
            }
            function Xi(e) {
                return e.level % 2 ? e.to : e.from
            }
            function Zi(e) {
                return e.level % 2 ? e.from : e.to
            }
            function Ji(e) {
                var t = ei(e);
                return t ? Xi(t[0]) : 0
            }
            function eo(e) {
                var t = ei(e);
                return t ? Zi(Oi(t)) : e.text.length
            }
            function to(e, t) {
                var n = Gr(e.doc, t)
                  , r = fr(n);
                r != n && (t = Xr(r));
                var i = ei(r)
                  , o = i ? i[0].level % 2 ? eo(r) : Ji(r) : 0;
                return Ao(t, o)
            }
            function no(e, t) {
                for (var n, r = Gr(e.doc, t); n = hr(r); )
                    r = n.find(1, !0).line,
                    t = null ;
                var i = ei(r)
                  , o = i ? i[0].level % 2 ? Ji(r) : eo(r) : r.text.length;
                return Ao(null  == t ? Xr(r) : t, o)
            }
            function ro(e, t) {
                var n = to(e, t.line)
                  , r = Gr(e.doc, n.line)
                  , i = ei(r);
                if (!i || 0 == i[0].level) {
                    var o = Math.max(0, r.text.search(/\S/))
                      , s = t.line == n.line && t.ch <= o && t.ch;
                    return Ao(n.line, s ? 0 : o)
                }
                return n
            }
            function io(e, t, n) {
                var r = e[0].level;
                return t == r ? !0 : n == r ? !1 : n > t
            }
            function oo(e, t) {
                Xs = null ;
                for (var n, r = 0; r < e.length; ++r) {
                    var i = e[r];
                    if (i.from < t && i.to > t)
                        return r;
                    if (i.from == t || i.to == t) {
                        if (null  != n)
                            return io(e, i.level, e[n].level) ? (i.from != i.to && (Xs = n),
                            r) : (i.from != i.to && (Xs = r),
                            n);
                        n = r
                    }
                }
                return n
            }
            function so(e, t, n, r) {
                if (!r)
                    return t + n;
                do
                    t += n;
                while (t > 0 && Ri(e.text.charAt(t)));return t
            }
            function ao(e, t, n, r) {
                var i = ei(e);
                if (!i)
                    return lo(e, t, n, r);
                for (var o = oo(i, t), s = i[o], a = so(e, t, s.level % 2 ? -n : n, r); ; ) {
                    if (a > s.from && a < s.to)
                        return a;
                    if (a == s.from || a == s.to)
                        return oo(i, a) == o ? a : (s = i[o += n],
                        n > 0 == s.level % 2 ? s.to : s.from);
                    if (s = i[o += n],
                    !s)
                        return null ;
                    a = n > 0 == s.level % 2 ? so(e, s.to, -1, r) : so(e, s.from, 1, r)
                }
            }
            function lo(e, t, n, r) {
                var i = t + n;
                if (r)
                    for (; i > 0 && Ri(e.text.charAt(i)); )
                        i += n;
                return 0 > i || i > e.text.length ? null  : i
            }
            var uo = /gecko\/\d/i.test(navigator.userAgent)
              , co = /MSIE \d/.test(navigator.userAgent)
              , ho = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
              , po = co || ho
              , fo = po && (co ? document.documentMode || 6 : ho[1])
              , mo = /WebKit\//.test(navigator.userAgent)
              , go = mo && /Qt\/\d+\.\d+/.test(navigator.userAgent)
              , vo = /Chrome\//.test(navigator.userAgent)
              , yo = /Opera\//.test(navigator.userAgent)
              , bo = /Apple Computer/.test(navigator.vendor)
              , wo = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent)
              , xo = /PhantomJS/.test(navigator.userAgent)
              , ko = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)
              , jo = ko || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent)
              , So = ko || /Mac/.test(navigator.platform)
              , Co = /win/i.test(navigator.platform)
              , Lo = yo && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
            Lo && (Lo = Number(Lo[1])),
            Lo && Lo >= 15 && (yo = !1,
            mo = !0);
            var Mo = So && (go || yo && (null  == Lo || 12.11 > Lo))
              , Oo = uo || po && fo >= 9
              , Eo = !1
              , To = !1;
            m.prototype = Ni({
                update: function(e) {
                    var t = e.scrollWidth > e.clientWidth + 1
                      , n = e.scrollHeight > e.clientHeight + 1
                      , r = e.nativeBarWidth;
                    if (n) {
                        this.vert.style.display = "block",
                        this.vert.style.bottom = t ? r + "px" : "0";
                        var i = e.viewHeight - (t ? r : 0);
                        this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
                    } else
                        this.vert.style.display = "",
                        this.vert.firstChild.style.height = "0";
                    if (t) {
                        this.horiz.style.display = "block",
                        this.horiz.style.right = n ? r + "px" : "0",
                        this.horiz.style.left = e.barLeft + "px";
                        var o = e.viewWidth - e.barLeft - (n ? r : 0);
                        this.horiz.firstChild.style.width = e.scrollWidth - e.clientWidth + o + "px"
                    } else
                        this.horiz.style.display = "",
                        this.horiz.firstChild.style.width = "0";
                    return !this.checkedOverlay && e.clientHeight > 0 && (0 == r && this.overlayHack(),
                    this.checkedOverlay = !0),
                    {
                        right: n ? r : 0,
                        bottom: t ? r : 0
                    }
                },
                setScrollLeft: function(e) {
                    this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e)
                },
                setScrollTop: function(e) {
                    this.vert.scrollTop != e && (this.vert.scrollTop = e)
                },
                overlayHack: function() {
                    var e = So && !wo ? "12px" : "18px";
                    this.horiz.style.minHeight = this.vert.style.minWidth = e;
                    var t = this
                      , n = function(e) {
                        vi(e) != t.vert && vi(e) != t.horiz && Ot(t.cm, qt)(e)
                    }
                    ;
                    js(this.vert, "mousedown", n),
                    js(this.horiz, "mousedown", n)
                },
                clear: function() {
                    var e = this.horiz.parentNode;
                    e.removeChild(this.horiz),
                    e.removeChild(this.vert)
                }
            }, m.prototype),
            g.prototype = Ni({
                update: function() {
                    return {
                        bottom: 0,
                        right: 0
                    }
                },
                setScrollLeft: function() {},
                setScrollTop: function() {},
                clear: function() {}
            }, g.prototype),
            e.scrollbarModel = {
                "native": m,
                "null": g
            },
            C.prototype.signal = function(e, t) {
                ji(e, t) && this.events.push(arguments)
            }
            ,
            C.prototype.finish = function() {
                for (var e = 0; e < this.events.length; e++)
                    Cs.apply(null , this.events[e])
            }
            ;
            var Ao = e.Pos = function(e, t) {
                return this instanceof Ao ? (this.line = e,
                void (this.ch = t)) : new Ao(e,t)
            }
              , $o = e.cmpPos = function(e, t) {
                return e.line - t.line || e.ch - t.ch
            }
              , No = null ;
            ne.prototype = Ni({
                init: function(e) {
                    function t(e) {
                        if (r.somethingSelected())
                            No = r.getSelections(),
                            n.inaccurateSelection && (n.prevInput = "",
                            n.inaccurateSelection = !1,
                            o.value = No.join("\n"),
                            Ds(o));
                        else {
                            if (!r.options.lineWiseCopyCut)
                                return;
                            var t = ee(r);
                            No = t.text,
                            "cut" == e.type ? r.setSelections(t.ranges, null , Es) : (n.prevInput = "",
                            o.value = t.text.join("\n"),
                            Ds(o))
                        }
                        "cut" == e.type && (r.state.cutIncoming = !0)
                    }
                    var n = this
                      , r = this.cm
                      , i = this.wrapper = re()
                      , o = this.textarea = i.firstChild;
                    e.wrapper.insertBefore(i, e.wrapper.firstChild),
                    ko && (o.style.width = "0px"),
                    js(o, "input", function() {
                        po && fo >= 9 && n.hasSelection && (n.hasSelection = null ),
                        n.poll()
                    }),
                    js(o, "paste", function() {
                        if (mo && !r.state.fakedLastChar && !(new Date - r.state.lastMiddleDown < 200)) {
                            var e = o.selectionStart
                              , t = o.selectionEnd;
                            o.value += "$",
                            o.selectionEnd = t,
                            o.selectionStart = e,
                            r.state.fakedLastChar = !0
                        }
                        r.state.pasteIncoming = !0,
                        n.fastPoll()
                    }),
                    js(o, "cut", t),
                    js(o, "copy", t),
                    js(e.scroller, "paste", function(t) {
                        Bt(e, t) || (r.state.pasteIncoming = !0,
                        n.focus())
                    }),
                    js(e.lineSpace, "selectstart", function(t) {
                        Bt(e, t) || ws(t)
                    }),
                    js(o, "compositionstart", function() {
                        var e = r.getCursor("from");
                        n.composing = {
                            start: e,
                            range: r.markText(e, r.getCursor("to"), {
                                className: "CodeMirror-composing"
                            })
                        }
                    }),
                    js(o, "compositionend", function() {
                        n.composing && (n.poll(),
                        n.composing.range.clear(),
                        n.composing = null )
                    })
                },
                prepareSelection: function() {
                    var e = this.cm
                      , t = e.display
                      , n = e.doc
                      , r = Ne(e);
                    if (e.options.moveInputWithCursor) {
                        var i = dt(e, n.sel.primary().head, "div")
                          , o = t.wrapper.getBoundingClientRect()
                          , s = t.lineDiv.getBoundingClientRect();
                        r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + s.top - o.top)),
                        r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + s.left - o.left))
                    }
                    return r
                },
                showSelection: function(e) {
                    var t = this.cm
                      , n = t.display;
                    zi(n.cursorDiv, e.cursors),
                    zi(n.selectionDiv, e.selection),
                    null  != e.teTop && (this.wrapper.style.top = e.teTop + "px",
                    this.wrapper.style.left = e.teLeft + "px")
                },
                reset: function(e) {
                    if (!this.contextMenuPending) {
                        var t, n, r = this.cm, i = r.doc;
                        if (r.somethingSelected()) {
                            this.prevInput = "";
                            var o = i.sel.primary();
                            t = Ks && (o.to().line - o.from().line > 100 || (n = r.getSelection()).length > 1e3);
                            var s = t ? "-" : n || r.getSelection();
                            this.textarea.value = s,
                            r.state.focused && Ds(this.textarea),
                            po && fo >= 9 && (this.hasSelection = s)
                        } else
                            e || (this.prevInput = this.textarea.value = "",
                            po && fo >= 9 && (this.hasSelection = null ));
                        this.inaccurateSelection = t
                    }
                },
                getField: function() {
                    return this.textarea
                },
                supportsTouch: function() {
                    return !1
                },
                focus: function() {
                    if ("nocursor" != this.cm.options.readOnly && (!jo || Vi() != this.textarea))
                        try {
                            this.textarea.focus()
                        } catch (e) {}
                },
                blur: function() {
                    this.textarea.blur()
                },
                resetPosition: function() {
                    this.wrapper.style.top = this.wrapper.style.left = 0
                },
                receivedFocus: function() {
                    this.slowPoll()
                },
                slowPoll: function() {
                    var e = this;
                    e.pollingFast || e.polling.set(this.cm.options.pollInterval, function() {
                        e.poll(),
                        e.cm.state.focused && e.slowPoll()
                    })
                },
                fastPoll: function() {
                    function e() {
                        var r = n.poll();
                        r || t ? (n.pollingFast = !1,
                        n.slowPoll()) : (t = !0,
                        n.polling.set(60, e))
                    }
                    var t = !1
                      , n = this;
                    n.pollingFast = !0,
                    n.polling.set(20, e)
                },
                poll: function() {
                    var e = this.cm
                      , t = this.textarea
                      , n = this.prevInput;
                    if (!e.state.focused || Gs(t) && !n || X(e) || e.options.disableInput || e.state.keySeq)
                        return !1;
                    e.state.pasteIncoming && e.state.fakedLastChar && (t.value = t.value.substring(0, t.value.length - 1),
                    e.state.fakedLastChar = !1);
                    var r = t.value;
                    if (r == n && !e.somethingSelected())
                        return !1;
                    if (po && fo >= 9 && this.hasSelection === r || So && /[\uf700-\uf7ff]/.test(r))
                        return e.display.input.reset(),
                        !1;
                    if (e.doc.sel == e.display.selForContextMenu) {
                        var i = r.charCodeAt(0);
                        if (8203 != i || n || (n = "\u200b"),
                        8666 == i)
                            return this.reset(),
                            this.cm.execCommand("undo")
                    }
                    for (var o = 0, s = Math.min(n.length, r.length); s > o && n.charCodeAt(o) == r.charCodeAt(o); )
                        ++o;
                    var a = this;
                    return Mt(e, function() {
                        Z(e, r.slice(o), n.length - o, null , a.composing ? "*compose" : null ),
                        r.length > 1e3 || r.indexOf("\n") > -1 ? t.value = a.prevInput = "" : a.prevInput = r,
                        a.composing && (a.composing.range.clear(),
                        a.composing.range = e.markText(a.composing.start, e.getCursor("to"), {
                            className: "CodeMirror-composing"
                        }))
                    }),
                    !0
                },
                ensurePolled: function() {
                    this.pollingFast && this.poll() && (this.pollingFast = !1)
                },
                onKeyPress: function() {
                    po && fo >= 9 && (this.hasSelection = null ),
                    this.fastPoll()
                },
                onContextMenu: function(e) {
                    function t() {
                        if (null  != s.selectionStart) {
                            var e = i.somethingSelected()
                              , t = "\u200b" + (e ? s.value : "");
                            s.value = "\u21da",
                            s.value = t,
                            r.prevInput = e ? "" : "\u200b",
                            s.selectionStart = 1,
                            s.selectionEnd = t.length,
                            o.selForContextMenu = i.doc.sel
                        }
                    }
                    function n() {
                        if (r.contextMenuPending = !1,
                        r.wrapper.style.position = "relative",
                        s.style.cssText = c,
                        po && 9 > fo && o.scrollbars.setScrollTop(o.scroller.scrollTop = l),
                        null  != s.selectionStart) {
                            (!po || po && 9 > fo) && t();
                            var e = 0
                              , n = function() {
                                o.selForContextMenu == i.doc.sel && 0 == s.selectionStart && s.selectionEnd > 0 && "\u200b" == r.prevInput ? Ot(i, rs.selectAll)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : o.input.reset()
                            }
                            ;
                            o.detectingSelectAll = setTimeout(n, 200)
                        }
                    }
                    var r = this
                      , i = r.cm
                      , o = i.display
                      , s = r.textarea
                      , a = Wt(i, e)
                      , l = o.scroller.scrollTop;
                    if (a && !yo) {
                        var u = i.options.resetSelectionOnContextMenu;
                        u && -1 == i.doc.sel.contains(a) && Ot(i, Le)(i.doc, pe(a), Es);
                        var c = s.style.cssText;
                        if (r.wrapper.style.position = "absolute",
                        s.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " + (po ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",
                        mo)
                            var d = window.scrollY;
                        if (o.input.focus(),
                        mo && window.scrollTo(null , d),
                        o.input.reset(),
                        i.somethingSelected() || (s.value = r.prevInput = " "),
                        r.contextMenuPending = !0,
                        o.selForContextMenu = i.doc.sel,
                        clearTimeout(o.detectingSelectAll),
                        po && fo >= 9 && t(),
                        Oo) {
                            ks(e);
                            var h = function() {
                                Ss(window, "mouseup", h),
                                setTimeout(n, 20)
                            }
                            ;
                            js(window, "mouseup", h)
                        } else
                            setTimeout(n, 50)
                    }
                },
                setUneditable: Ai,
                needsContentAttribute: !1
            }, ne.prototype),
            ie.prototype = Ni({
                init: function(e) {
                    function t(e) {
                        if (r.somethingSelected())
                            No = r.getSelections(),
                            "cut" == e.type && r.replaceSelection("", null , "cut");
                        else {
                            if (!r.options.lineWiseCopyCut)
                                return;
                            var t = ee(r);
                            No = t.text,
                            "cut" == e.type && r.operation(function() {
                                r.setSelections(t.ranges, 0, Es),
                                r.replaceSelection("", null , "cut")
                            })
                        }
                        if (e.clipboardData && !ko)
                            e.preventDefault(),
                            e.clipboardData.clearData(),
                            e.clipboardData.setData("text/plain", No.join("\n"));
                        else {
                            var n = re()
                              , i = n.firstChild;
                            r.display.lineSpace.insertBefore(n, r.display.lineSpace.firstChild),
                            i.value = No.join("\n");
                            var o = document.activeElement;
                            Ds(i),
                            setTimeout(function() {
                                r.display.lineSpace.removeChild(n),
                                o.focus()
                            }, 50)
                        }
                    }
                    var n = this
                      , r = n.cm
                      , i = n.div = e.lineDiv;
                    i.contentEditable = "true",
                    te(i),
                    js(i, "paste", function(e) {
                        var t = e.clipboardData && e.clipboardData.getData("text/plain");
                        t && (e.preventDefault(),
                        r.replaceSelection(t, null , "paste"))
                    }),
                    js(i, "compositionstart", function(e) {
                        var t = e.data;
                        if (n.composing = {
                            sel: r.doc.sel,
                            data: t,
                            startData: t
                        },
                        t) {
                            var i = r.doc.sel.primary()
                              , o = r.getLine(i.head.line)
                              , s = o.indexOf(t, Math.max(0, i.head.ch - t.length));
                            s > -1 && s <= i.head.ch && (n.composing.sel = pe(Ao(i.head.line, s), Ao(i.head.line, s + t.length)))
                        }
                    }),
                    js(i, "compositionupdate", function(e) {
                        n.composing.data = e.data
                    }),
                    js(i, "compositionend", function(e) {
                        var t = n.composing;
                        t && (e.data == t.startData || /\u200b/.test(e.data) || (t.data = e.data),
                        setTimeout(function() {
                            t.handled || n.applyComposition(t),
                            n.composing == t && (n.composing = null )
                        }, 50))
                    }),
                    js(i, "touchstart", function() {
                        n.forceCompositionEnd()
                    }),
                    js(i, "input", function() {
                        n.composing || n.pollContent() || Mt(n.cm, function() {
                            Nt(r)
                        })
                    }),
                    js(i, "copy", t),
                    js(i, "cut", t)
                },
                prepareSelection: function() {
                    var e = Ne(this.cm, !1);
                    return e.focus = this.cm.state.focused,
                    e
                },
                showSelection: function(e) {
                    e && this.cm.display.view.length && (e.focus && this.showPrimarySelection(),
                    this.showMultipleSelections(e))
                },
                showPrimarySelection: function() {
                    var e = window.getSelection()
                      , t = this.cm.doc.sel.primary()
                      , n = ae(this.cm, e.anchorNode, e.anchorOffset)
                      , r = ae(this.cm, e.focusNode, e.focusOffset);
                    if (!n || n.bad || !r || r.bad || 0 != $o(Q(n, r), t.from()) || 0 != $o(K(n, r), t.to())) {
                        var i = oe(this.cm, t.from())
                          , o = oe(this.cm, t.to());
                        if (i || o) {
                            var s = this.cm.display.view
                              , a = e.rangeCount && e.getRangeAt(0);
                            if (i) {
                                if (!o) {
                                    var l = s[s.length - 1].measure
                                      , u = l.maps ? l.maps[l.maps.length - 1] : l.map;
                                    o = {
                                        node: u[u.length - 1],
                                        offset: u[u.length - 2] - u[u.length - 3]
                                    }
                                }
                            } else
                                i = {
                                    node: s[0].measure.map[2],
                                    offset: 0
                                };
                            try {
                                var c = Ps(i.node, i.offset, o.offset, o.node)
                            } catch (d) {}
                            c && (e.removeAllRanges(),
                            e.addRange(c),
                            a && null  == e.anchorNode ? e.addRange(a) : uo && this.startGracePeriod()),
                            this.rememberSelection()
                        }
                    }
                },
                startGracePeriod: function() {
                    var e = this;
                    clearTimeout(this.gracePeriod),
                    this.gracePeriod = setTimeout(function() {
                        e.gracePeriod = !1,
                        e.selectionChanged() && e.cm.operation(function() {
                            e.cm.curOp.selectionChanged = !0
                        })
                    }, 20)
                },
                showMultipleSelections: function(e) {
                    zi(this.cm.display.cursorDiv, e.cursors),
                    zi(this.cm.display.selectionDiv, e.selection)
                },
                rememberSelection: function() {
                    var e = window.getSelection();
                    this.lastAnchorNode = e.anchorNode,
                    this.lastAnchorOffset = e.anchorOffset,
                    this.lastFocusNode = e.focusNode,
                    this.lastFocusOffset = e.focusOffset
                },
                selectionInEditor: function() {
                    var e = window.getSelection();
                    if (!e.rangeCount)
                        return !1;
                    var t = e.getRangeAt(0).commonAncestorContainer;
                    return Fs(this.div, t)
                },
                focus: function() {
                    "nocursor" != this.cm.options.readOnly && this.div.focus()
                },
                blur: function() {
                    this.div.blur()
                },
                getField: function() {
                    return this.div
                },
                supportsTouch: function() {
                    return !0
                },
                receivedFocus: function() {
                    function e() {
                        t.cm.state.focused && (t.pollSelection(),
                        t.polling.set(t.cm.options.pollInterval, e))
                    }
                    var t = this;
                    this.selectionInEditor() ? this.pollSelection() : Mt(this.cm, function() {
                        t.cm.curOp.selectionChanged = !0
                    }),
                    this.polling.set(this.cm.options.pollInterval, e)
                },
                selectionChanged: function() {
                    var e = window.getSelection();
                    return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
                },
                pollSelection: function() {
                    if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                        var e = window.getSelection()
                          , t = this.cm;
                        this.rememberSelection();
                        var n = ae(t, e.anchorNode, e.anchorOffset)
                          , r = ae(t, e.focusNode, e.focusOffset);
                        n && r && Mt(t, function() {
                            Le(t.doc, pe(n, r), Es),
                            (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                        })
                    }
                },
                pollContent: function() {
                    var e = this.cm
                      , t = e.display
                      , n = e.doc.sel.primary()
                      , r = n.from()
                      , i = n.to();
                    if (r.line < t.viewFrom || i.line > t.viewTo - 1)
                        return !1;
                    var o;
                    if (r.line == t.viewFrom || 0 == (o = It(e, r.line)))
                        var s = Xr(t.view[0].line)
                          , a = t.view[0].node;
                    else
                        var s = Xr(t.view[o].line)
                          , a = t.view[o - 1].node.nextSibling;
                    var l = It(e, i.line);
                    if (l == t.view.length - 1)
                        var u = t.viewTo - 1
                          , c = t.view[l].node;
                    else
                        var u = Xr(t.view[l + 1].line) - 1
                          , c = t.view[l + 1].node.previousSibling;
                    for (var d = Us(ue(e, a, c, s, u)), h = Kr(e.doc, Ao(s, 0), Ao(u, Gr(e.doc, u).text.length)); d.length > 1 && h.length > 1; )
                        if (Oi(d) == Oi(h))
                            d.pop(),
                            h.pop(),
                            u--;
                        else {
                            if (d[0] != h[0])
                                break;
                            d.shift(),
                            h.shift(),
                            s++
                        }
                    for (var p = 0, f = 0, m = d[0], g = h[0], v = Math.min(m.length, g.length); v > p && m.charCodeAt(p) == g.charCodeAt(p); )
                        ++p;
                    for (var y = Oi(d), b = Oi(h), w = Math.min(y.length - (1 == d.length ? p : 0), b.length - (1 == h.length ? p : 0)); w > f && y.charCodeAt(y.length - f - 1) == b.charCodeAt(b.length - f - 1); )
                        ++f;
                    d[d.length - 1] = y.slice(0, y.length - f),
                    d[0] = d[0].slice(p);
                    var x = Ao(s, p)
                      , k = Ao(u, h.length ? Oi(h).length - f : 0);
                    return d.length > 1 || d[0] || $o(x, k) ? (On(e.doc, d, x, k, "+input"),
                    !0) : void 0
                },
                ensurePolled: function() {
                    this.forceCompositionEnd()
                },
                reset: function() {
                    this.forceCompositionEnd()
                },
                forceCompositionEnd: function() {
                    this.composing && !this.composing.handled && (this.applyComposition(this.composing),
                    this.composing.handled = !0,
                    this.div.blur(),
                    this.div.focus())
                },
                applyComposition: function(e) {
                    e.data && e.data != e.startData && Ot(this.cm, Z)(this.cm, e.data, 0, e.sel)
                },
                setUneditable: function(e) {
                    e.setAttribute("contenteditable", "false")
                },
                onKeyPress: function(e) {
                    e.preventDefault(),
                    Ot(this.cm, Z)(this.cm, String.fromCharCode(null  == e.charCode ? e.keyCode : e.charCode), 0)
                },
                onContextMenu: Ai,
                resetPosition: Ai,
                needsContentAttribute: !0
            }, ie.prototype),
            e.inputStyles = {
                textarea: ne,
                contenteditable: ie
            },
            ce.prototype = {
                primary: function() {
                    return this.ranges[this.primIndex]
                },
                equals: function(e) {
                    if (e == this)
                        return !0;
                    if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length)
                        return !1;
                    for (var t = 0; t < this.ranges.length; t++) {
                        var n = this.ranges[t]
                          , r = e.ranges[t];
                        if (0 != $o(n.anchor, r.anchor) || 0 != $o(n.head, r.head))
                            return !1
                    }
                    return !0
                },
                deepCopy: function() {
                    for (var e = [], t = 0; t < this.ranges.length; t++)
                        e[t] = new de(G(this.ranges[t].anchor),G(this.ranges[t].head));
                    return new ce(e,this.primIndex)
                },
                somethingSelected: function() {
                    for (var e = 0; e < this.ranges.length; e++)
                        if (!this.ranges[e].empty())
                            return !0;
                    return !1
                },
                contains: function(e, t) {
                    t || (t = e);
                    for (var n = 0; n < this.ranges.length; n++) {
                        var r = this.ranges[n];
                        if ($o(t, r.from()) >= 0 && $o(e, r.to()) <= 0)
                            return n
                    }
                    return -1
                }
            },
            de.prototype = {
                from: function() {
                    return Q(this.anchor, this.head)
                },
                to: function() {
                    return K(this.anchor, this.head)
                },
                empty: function() {
                    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
                }
            };
            var Do, Po, Io, Ro = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, _o = null , Fo = 0, zo = 0, Vo = 0, Ho = null ;
            po ? Ho = -.53 : uo ? Ho = 15 : vo ? Ho = -.7 : bo && (Ho = -1 / 3);
            var Bo = function(e) {
                var t = e.wheelDeltaX
                  , n = e.wheelDeltaY;
                return null  == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
                null  == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null  == n && (n = e.wheelDelta),
                {
                    x: t,
                    y: n
                }
            }
            ;
            e.wheelEventPixels = function(e) {
                var t = Bo(e);
                return t.x *= Ho,
                t.y *= Ho,
                t
            }
            ;
            var Wo = new Ci
              , qo = null
              , Uo = e.changeEnd = function(e) {
                return e.text ? Ao(e.from.line + e.text.length - 1, Oi(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
            }
            ;
            e.prototype = {
                constructor: e,
                focus: function() {
                    window.focus(),
                    this.display.input.focus()
                },
                setOption: function(e, t) {
                    var n = this.options
                      , r = n[e];
                    (n[e] != t || "mode" == e) && (n[e] = t,
                    Ko.hasOwnProperty(e) && Ot(this, Ko[e])(this, t, r))
                },
                getOption: function(e) {
                    return this.options[e]
                },
                getDoc: function() {
                    return this.doc
                },
                addKeyMap: function(e, t) {
                    this.state.keyMaps[t ? "push" : "unshift"](Bn(e))
                },
                removeKeyMap: function(e) {
                    for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                        if (t[n] == e || t[n].name == e)
                            return t.splice(n, 1),
                            !0
                },
                addOverlay: Et(function(t, n) {
                    var r = t.token ? t : e.getMode(this.options, t);
                    if (r.startState)
                        throw new Error("Overlays may not be stateful.");
                    this.state.overlays.push({
                        mode: r,
                        modeSpec: t,
                        opaque: n && n.opaque
                    }),
                    this.state.modeGen++,
                    Nt(this)
                }),
                removeOverlay: Et(function(e) {
                    for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                        var r = t[n].modeSpec;
                        if (r == e || "string" == typeof e && r.name == e)
                            return t.splice(n, 1),
                            this.state.modeGen++,
                            void Nt(this)
                    }
                }),
                indentLine: Et(function(e, t, n) {
                    "string" != typeof t && "number" != typeof t && (t = null  == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"),
                    ve(this.doc, e) && In(this, e, t, n)
                }),
                indentSelection: Et(function(e) {
                    for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                        var i = t[r];
                        if (i.empty())
                            i.head.line > n && (In(this, i.head.line, e, !0),
                            n = i.head.line,
                            r == this.doc.sel.primIndex && Dn(this));
                        else {
                            var o = i.from()
                              , s = i.to()
                              , a = Math.max(n, o.line);
                            n = Math.min(this.lastLine(), s.line - (s.ch ? 0 : 1)) + 1;
                            for (var l = a; n > l; ++l)
                                In(this, l, e);
                            var u = this.doc.sel.ranges;
                            0 == o.ch && t.length == u.length && u[r].from().ch > 0 && ke(this.doc, r, new de(o,u[r].to()), Es)
                        }
                    }
                }),
                getTokenAt: function(e, t) {
                    return Or(this, e, t)
                },
                getLineTokens: function(e, t) {
                    return Or(this, Ao(e), t, !0)
                },
                getTokenTypeAt: function(e) {
                    e = me(this.doc, e);
                    var t, n = Ar(this, Gr(this.doc, e.line)), r = 0, i = (n.length - 1) / 2, o = e.ch;
                    if (0 == o)
                        t = n[2];
                    else
                        for (; ; ) {
                            var s = r + i >> 1;
                            if ((s ? n[2 * s - 1] : 0) >= o)
                                i = s;
                            else {
                                if (!(n[2 * s + 1] < o)) {
                                    t = n[2 * s + 2];
                                    break
                                }
                                r = s + 1
                            }
                        }
                    var a = t ? t.indexOf("cm-overlay ") : -1;
                    return 0 > a ? t : 0 == a ? null  : t.slice(0, a - 1)
                },
                getModeAt: function(t) {
                    var n = this.doc.mode;
                    return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
                },
                getHelper: function(e, t) {
                    return this.getHelpers(e, t)[0]
                },
                getHelpers: function(e, t) {
                    var n = [];
                    if (!es.hasOwnProperty(t))
                        return n;
                    var r = es[t]
                      , i = this.getModeAt(e);
                    if ("string" == typeof i[t])
                        r[i[t]] && n.push(r[i[t]]);
                    else if (i[t])
                        for (var o = 0; o < i[t].length; o++) {
                            var s = r[i[t][o]];
                            s && n.push(s)
                        }
                    else
                        i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
                    for (var o = 0; o < r._global.length; o++) {
                        var a = r._global[o];
                        a.pred(i, this) && -1 == Ei(n, a.val) && n.push(a.val)
                    }
                    return n
                },
                getStateAfter: function(e, t) {
                    var n = this.doc;
                    return e = fe(n, null  == e ? n.first + n.size - 1 : e),
                    ze(this, e + 1, t)
                },
                cursorCoords: function(e, t) {
                    var n, r = this.doc.sel.primary();
                    return n = null  == e ? r.head : "object" == typeof e ? me(this.doc, e) : e ? r.from() : r.to(),
                    dt(this, n, t || "page")
                },
                charCoords: function(e, t) {
                    return ct(this, me(this.doc, e), t || "page")
                },
                coordsChar: function(e, t) {
                    return e = ut(this, e, t || "page"),
                    ft(this, e.left, e.top)
                },
                lineAtHeight: function(e, t) {
                    return e = ut(this, {
                        top: e,
                        left: 0
                    }, t || "page").top,
                    Zr(this.doc, e + this.display.viewOffset)
                },
                heightAtLine: function(e, t) {
                    var n, r = !1;
                    if ("number" == typeof e) {
                        var i = this.doc.first + this.doc.size - 1;
                        e < this.doc.first ? e = this.doc.first : e > i && (e = i,
                        r = !0),
                        n = Gr(this.doc, e)
                    } else
                        n = e;
                    return lt(this, n, {
                        top: 0,
                        left: 0
                    }, t || "page").top + (r ? this.doc.height - Jr(n) : 0)
                },
                defaultTextHeight: function() {
                    return gt(this.display)
                },
                defaultCharWidth: function() {
                    return vt(this.display)
                },
                setGutterMarker: Et(function(e, t, n) {
                    return Rn(this.doc, e, "gutter", function(e) {
                        var r = e.gutterMarkers || (e.gutterMarkers = {});
                        return r[t] = n,
                        !n && Ii(r) && (e.gutterMarkers = null ),
                        !0
                    })
                }),
                clearGutter: Et(function(e) {
                    var t = this
                      , n = t.doc
                      , r = n.first;
                    n.iter(function(n) {
                        n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null ,
                        Dt(t, r, "gutter"),
                        Ii(n.gutterMarkers) && (n.gutterMarkers = null )),
                        ++r
                    })
                }),
                lineInfo: function(e) {
                    if ("number" == typeof e) {
                        if (!ve(this.doc, e))
                            return null ;
                        var t = e;
                        if (e = Gr(this.doc, e),
                        !e)
                            return null
                    } else {
                        var t = Xr(e);
                        if (null  == t)
                            return null
                    }
                    return {
                        line: t,
                        handle: e,
                        text: e.text,
                        gutterMarkers: e.gutterMarkers,
                        textClass: e.textClass,
                        bgClass: e.bgClass,
                        wrapClass: e.wrapClass,
                        widgets: e.widgets
                    }
                },
                getViewport: function() {
                    return {
                        from: this.display.viewFrom,
                        to: this.display.viewTo
                    }
                },
                addWidget: function(e, t, n, r, i) {
                    var o = this.display;
                    e = dt(this, me(this.doc, e));
                    var s = e.bottom
                      , a = e.left;
                    if (t.style.position = "absolute",
                    t.setAttribute("cm-ignore-events", "true"),
                    this.display.input.setUneditable(t),
                    o.sizer.appendChild(t),
                    "over" == r)
                        s = e.top;
                    else if ("above" == r || "near" == r) {
                        var l = Math.max(o.wrapper.clientHeight, this.doc.height)
                          , u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                        ("above" == r || e.bottom + t.offsetHeight > l) && e.top > t.offsetHeight ? s = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= l && (s = e.bottom),
                        a + t.offsetWidth > u && (a = u - t.offsetWidth)
                    }
                    t.style.top = s + "px",
                    t.style.left = t.style.right = "",
                    "right" == i ? (a = o.sizer.clientWidth - t.offsetWidth,
                    t.style.right = "0px") : ("left" == i ? a = 0 : "middle" == i && (a = (o.sizer.clientWidth - t.offsetWidth) / 2),
                    t.style.left = a + "px"),
                    n && An(this, a, s, a + t.offsetWidth, s + t.offsetHeight)
                },
                triggerOnKeyDown: Et(ln),
                triggerOnKeyPress: Et(dn),
                triggerOnKeyUp: cn,
                execCommand: function(e) {
                    return rs.hasOwnProperty(e) ? rs[e](this) : void 0
                },
                triggerElectric: Et(function(e) {
                    J(this, e)
                }),
                findPosH: function(e, t, n, r) {
                    var i = 1;
                    0 > t && (i = -1,
                    t = -t);
                    for (var o = 0, s = me(this.doc, e); t > o && (s = Fn(this.doc, s, i, n, r),
                    !s.hitSide); ++o)
                        ;
                    return s
                },
                moveH: Et(function(e, t) {
                    var n = this;
                    n.extendSelectionsBy(function(r) {
                        return n.display.shift || n.doc.extend || r.empty() ? Fn(n.doc, r.head, e, t, n.options.rtlMoveVisually) : 0 > e ? r.from() : r.to()
                    }, As)
                }),
                deleteH: Et(function(e, t) {
                    var n = this.doc.sel
                      , r = this.doc;
                    n.somethingSelected() ? r.replaceSelection("", null , "+delete") : _n(this, function(n) {
                        var i = Fn(r, n.head, e, t, !1);
                        return 0 > e ? {
                            from: i,
                            to: n.head
                        } : {
                            from: n.head,
                            to: i
                        }
                    })
                }),
                findPosV: function(e, t, n, r) {
                    var i = 1
                      , o = r;
                    0 > t && (i = -1,
                    t = -t);
                    for (var s = 0, a = me(this.doc, e); t > s; ++s) {
                        var l = dt(this, a, "div");
                        if (null  == o ? o = l.left : l.left = o,
                        a = zn(this, l, i, n),
                        a.hitSide)
                            break
                    }
                    return a
                },
                moveV: Et(function(e, t) {
                    var n = this
                      , r = this.doc
                      , i = []
                      , o = !n.display.shift && !r.extend && r.sel.somethingSelected();
                    if (r.extendSelectionsBy(function(s) {
                        if (o)
                            return 0 > e ? s.from() : s.to();
                        var a = dt(n, s.head, "div");
                        null  != s.goalColumn && (a.left = s.goalColumn),
                        i.push(a.left);
                        var l = zn(n, a, e, t);
                        return "page" == t && s == r.sel.primary() && Nn(n, null , ct(n, l, "div").top - a.top),
                        l
                    }, As),
                    i.length)
                        for (var s = 0; s < r.sel.ranges.length; s++)
                            r.sel.ranges[s].goalColumn = i[s]
                }),
                findWordAt: function(e) {
                    var t = this.doc
                      , n = Gr(t, e.line).text
                      , r = e.ch
                      , i = e.ch;
                    if (n) {
                        var o = this.getHelper(e, "wordChars");
                        (e.xRel < 0 || i == n.length) && r ? --r : ++i;
                        for (var s = n.charAt(r), a = Pi(s, o) ? function(e) {
                            return Pi(e, o)
                        }
                         : /\s/.test(s) ? function(e) {
                            return /\s/.test(e)
                        }
                         : function(e) {
                            return !/\s/.test(e) && !Pi(e)
                        }
                        ; r > 0 && a(n.charAt(r - 1)); )
                            --r;
                        for (; i < n.length && a(n.charAt(i)); )
                            ++i
                    }
                    return new de(Ao(e.line, r),Ao(e.line, i))
                },
                toggleOverwrite: function(e) {
                    (null  == e || e != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? Bs(this.display.cursorDiv, "CodeMirror-overwrite") : Hs(this.display.cursorDiv, "CodeMirror-overwrite"),
                    Cs(this, "overwriteToggle", this, this.state.overwrite))
                },
                hasFocus: function() {
                    return this.display.input.getField() == Vi()
                },
                scrollTo: Et(function(e, t) {
                    (null  != e || null  != t) && Pn(this),
                    null  != e && (this.curOp.scrollLeft = e),
                    null  != t && (this.curOp.scrollTop = t)
                }),
                getScrollInfo: function() {
                    var e = this.display.scroller;
                    return {
                        left: e.scrollLeft,
                        top: e.scrollTop,
                        height: e.scrollHeight - We(this) - this.display.barHeight,
                        width: e.scrollWidth - We(this) - this.display.barWidth,
                        clientHeight: Ue(this),
                        clientWidth: qe(this)
                    }
                },
                scrollIntoView: Et(function(e, t) {
                    if (null  == e ? (e = {
                        from: this.doc.sel.primary().head,
                        to: null
                    },
                    null  == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                        from: Ao(e, 0),
                        to: null
                    } : null  == e.from && (e = {
                        from: e,
                        to: null
                    }),
                    e.to || (e.to = e.from),
                    e.margin = t || 0,
                    null  != e.from.line)
                        Pn(this),
                        this.curOp.scrollToPos = e;
                    else {
                        var n = $n(this, Math.min(e.from.left, e.to.left), Math.min(e.from.top, e.to.top) - e.margin, Math.max(e.from.right, e.to.right), Math.max(e.from.bottom, e.to.bottom) + e.margin);
                        this.scrollTo(n.scrollLeft, n.scrollTop)
                    }
                }),
                setSize: Et(function(e, t) {
                    function n(e) {
                        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                    }
                    var r = this;
                    null  != e && (r.display.wrapper.style.width = n(e)),
                    null  != t && (r.display.wrapper.style.height = n(t)),
                    r.options.lineWrapping && it(this);
                    var i = r.display.viewFrom;
                    r.doc.iter(i, r.display.viewTo, function(e) {
                        if (e.widgets)
                            for (var t = 0; t < e.widgets.length; t++)
                                if (e.widgets[t].noHScroll) {
                                    Dt(r, i, "widget");
                                    break
                                }
                        ++i
                    }),
                    r.curOp.forceUpdate = !0,
                    Cs(r, "refresh", this)
                }),
                operation: function(e) {
                    return Mt(this, e)
                },
                refresh: Et(function() {
                    var e = this.display.cachedTextHeight;
                    Nt(this),
                    this.curOp.forceUpdate = !0,
                    ot(this),
                    this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop),
                    c(this),
                    (null  == e || Math.abs(e - gt(this.display)) > .5) && s(this),
                    Cs(this, "refresh", this)
                }),
                swapDoc: Et(function(e) {
                    var t = this.doc;
                    return t.cm = null ,
                    Ur(this, e),
                    ot(this),
                    this.display.input.reset(),
                    this.scrollTo(e.scrollLeft, e.scrollTop),
                    this.curOp.forceScroll = !0,
                    bi(this, "swapDoc", this, t),
                    t
                }),
                getInputField: function() {
                    return this.display.input.getField()
                },
                getWrapperElement: function() {
                    return this.display.wrapper
                },
                getScrollerElement: function() {
                    return this.display.scroller
                },
                getGutterElement: function() {
                    return this.display.gutters
                }
            },
            Si(e);
            var Go = e.defaults = {}
              , Ko = e.optionHandlers = {}
              , Qo = e.Init = {
                toString: function() {
                    return "CodeMirror.Init"
                }
            };
            Vn("value", "", function(e, t) {
                e.setValue(t)
            }, !0),
            Vn("mode", null , function(e, t) {
                e.doc.modeOption = t,
                n(e)
            }, !0),
            Vn("indentUnit", 2, n, !0),
            Vn("indentWithTabs", !1),
            Vn("smartIndent", !0),
            Vn("tabSize", 4, function(e) {
                r(e),
                ot(e),
                Nt(e)
            }, !0),
            Vn("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(t, n, r) {
                t.state.specialChars = new RegExp(n.source + (n.test("  ") ? "" : "|    "),"g"),
                r != e.Init && t.refresh()
            }),
            Vn("specialCharPlaceholder", Pr, function(e) {
                e.refresh()
            }, !0),
            Vn("electricChars", !0),
            Vn("inputStyle", jo ? "contenteditable" : "textarea", function() {
                throw new Error("inputStyle can not (yet) be changed in a running editor")
            }, !0),
            Vn("rtlMoveVisually", !Co),
            Vn("wholeLineUpdateBefore", !0),
            Vn("theme", "default", function(e) {
                a(e),
                l(e)
            }, !0),
            Vn("keyMap", "default", function(t, n, r) {
                var i = Bn(n)
                  , o = r != e.Init && Bn(r);
                o && o.detach && o.detach(t, i),
                i.attach && i.attach(t, o || null )
            }),
            Vn("extraKeys", null ),
            Vn("lineWrapping", !1, i, !0),
            Vn("gutters", [], function(e) {
                p(e.options),
                l(e)
            }, !0),
            Vn("fixedGutter", !0, function(e, t) {
                e.display.gutters.style.left = t ? S(e.display) + "px" : "0",
                e.refresh()
            }, !0),
            Vn("coverGutterNextToScrollbar", !1, function(e) {
                y(e)
            }, !0),
            Vn("scrollbarStyle", "native", function(e) {
                v(e),
                y(e),
                e.display.scrollbars.setScrollTop(e.doc.scrollTop),
                e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
            }, !0),
            Vn("lineNumbers", !1, function(e) {
                p(e.options),
                l(e)
            }, !0),
            Vn("firstLineNumber", 1, l, !0),
            Vn("lineNumberFormatter", function(e) {
                return e
            }, l, !0),
            Vn("showCursorWhenSelecting", !1, $e, !0),
            Vn("resetSelectionOnContextMenu", !0),
            Vn("lineWiseCopyCut", !0),
            Vn("readOnly", !1, function(e, t) {
                "nocursor" == t ? (fn(e),
                e.display.input.blur(),
                e.display.disabled = !0) : (e.display.disabled = !1,
                t || e.display.input.reset())
            }),
            Vn("disableInput", !1, function(e, t) {
                t || e.display.input.reset()
            }, !0),
            Vn("dragDrop", !0, Vt),
            Vn("cursorBlinkRate", 530),
            Vn("cursorScrollMargin", 0),
            Vn("cursorHeight", 1, $e, !0),
            Vn("singleCursorHeightPerLine", !0, $e, !0),
            Vn("workTime", 100),
            Vn("workDelay", 100),
            Vn("flattenSpans", !0, r, !0),
            Vn("addModeClass", !1, r, !0),
            Vn("pollInterval", 100),
            Vn("undoDepth", 200, function(e, t) {
                e.doc.history.undoDepth = t
            }),
            Vn("historyEventDelay", 1250),
            Vn("viewportMargin", 10, function(e) {
                e.refresh()
            }, !0),
            Vn("maxHighlightLength", 1e4, r, !0),
            Vn("moveInputWithCursor", !0, function(e, t) {
                t || e.display.input.resetPosition()
            }),
            Vn("tabindex", null , function(e, t) {
                e.display.input.getField().tabIndex = t || ""
            }),
            Vn("autofocus", null );
            var Yo = e.modes = {}
              , Xo = e.mimeModes = {};
            e.defineMode = function(t, n) {
                e.defaults.mode || "null" == t || (e.defaults.mode = t),
                arguments.length > 2 && (n.dependencies = Array.prototype.slice.call(arguments, 2)),
                Yo[t] = n
            }
            ,
            e.defineMIME = function(e, t) {
                Xo[e] = t
            }
            ,
            e.resolveMode = function(t) {
                if ("string" == typeof t && Xo.hasOwnProperty(t))
                    t = Xo[t];
                else if (t && "string" == typeof t.name && Xo.hasOwnProperty(t.name)) {
                    var n = Xo[t.name];
                    "string" == typeof n && (n = {
                        name: n
                    }),
                    t = $i(n, t),
                    t.name = n.name
                } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t))
                    return e.resolveMode("application/xml");
                return "string" == typeof t ? {
                    name: t
                } : t || {
                    name: "null"
                }
            }
            ,
            e.getMode = function(t, n) {
                var n = e.resolveMode(n)
                  , r = Yo[n.name];
                if (!r)
                    return e.getMode(t, "text/plain");
                var i = r(t, n);
                if (Zo.hasOwnProperty(n.name)) {
                    var o = Zo[n.name];
                    for (var s in o)
                        o.hasOwnProperty(s) && (i.hasOwnProperty(s) && (i["_" + s] = i[s]),
                        i[s] = o[s])
                }
                if (i.name = n.name,
                n.helperType && (i.helperType = n.helperType),
                n.modeProps)
                    for (var s in n.modeProps)
                        i[s] = n.modeProps[s];
                return i
            }
            ,
            e.defineMode("null", function() {
                return {
                    token: function(e) {
                        e.skipToEnd()
                    }
                }
            }),
            e.defineMIME("text/plain", "null");
            var Zo = e.modeExtensions = {};
            e.extendMode = function(e, t) {
                var n = Zo.hasOwnProperty(e) ? Zo[e] : Zo[e] = {};
                Ni(t, n)
            }
            ,
            e.defineExtension = function(t, n) {
                e.prototype[t] = n
            }
            ,
            e.defineDocExtension = function(e, t) {
                vs.prototype[e] = t
            }
            ,
            e.defineOption = Vn;
            var Jo = [];
            e.defineInitHook = function(e) {
                Jo.push(e)
            }
            ;
            var es = e.helpers = {};
            e.registerHelper = function(t, n, r) {
                es.hasOwnProperty(t) || (es[t] = e[t] = {
                    _global: []
                }),
                es[t][n] = r
            }
            ,
            e.registerGlobalHelper = function(t, n, r, i) {
                e.registerHelper(t, n, i),
                es[t]._global.push({
                    pred: r,
                    val: i
                })
            }
            ;
            var ts = e.copyState = function(e, t) {
                if (t === !0)
                    return t;
                if (e.copyState)
                    return e.copyState(t);
                var n = {};
                for (var r in t) {
                    var i = t[r];
                    i instanceof Array && (i = i.concat([])),
                    n[r] = i
                }
                return n
            }
              , ns = e.startState = function(e, t, n) {
                return e.startState ? e.startState(t, n) : !0
            }
            ;
            e.innerMode = function(e, t) {
                for (; e.innerMode; ) {
                    var n = e.innerMode(t);
                    if (!n || n.mode == e)
                        break;
                    t = n.state,
                    e = n.mode
                }
                return n || {
                    mode: e,
                    state: t
                }
            }
            ;
            var rs = e.commands = {
                selectAll: function(e) {
                    e.setSelection(Ao(e.firstLine(), 0), Ao(e.lastLine()), Es)
                },
                singleSelection: function(e) {
                    e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Es)
                },
                killLine: function(e) {
                    _n(e, function(t) {
                        if (t.empty()) {
                            var n = Gr(e.doc, t.head.line).text.length;
                            return t.head.ch == n && t.head.line < e.lastLine() ? {
                                from: t.head,
                                to: Ao(t.head.line + 1, 0)
                            } : {
                                from: t.head,
                                to: Ao(t.head.line, n)
                            }
                        }
                        return {
                            from: t.from(),
                            to: t.to()
                        }
                    })
                },
                deleteLine: function(e) {
                    _n(e, function(t) {
                        return {
                            from: Ao(t.from().line, 0),
                            to: me(e.doc, Ao(t.to().line + 1, 0))
                        }
                    })
                },
                delLineLeft: function(e) {
                    _n(e, function(e) {
                        return {
                            from: Ao(e.from().line, 0),
                            to: e.from()
                        }
                    })
                },
                delWrappedLineLeft: function(e) {
                    _n(e, function(t) {
                        var n = e.charCoords(t.head, "div").top + 5
                          , r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                        return {
                            from: r,
                            to: t.from()
                        }
                    })
                },
                delWrappedLineRight: function(e) {
                    _n(e, function(t) {
                        var n = e.charCoords(t.head, "div").top + 5
                          , r = e.coordsChar({
                            left: e.display.lineDiv.offsetWidth + 100,
                            top: n
                        }, "div");
                        return {
                            from: t.from(),
                            to: r
                        }
                    })
                },
                undo: function(e) {
                    e.undo()
                },
                redo: function(e) {
                    e.redo()
                },
                undoSelection: function(e) {
                    e.undoSelection()
                },
                redoSelection: function(e) {
                    e.redoSelection()
                },
                goDocStart: function(e) {
                    e.extendSelection(Ao(e.firstLine(), 0))
                },
                goDocEnd: function(e) {
                    e.extendSelection(Ao(e.lastLine()))
                },
                goLineStart: function(e) {
                    e.extendSelectionsBy(function(t) {
                        return to(e, t.head.line)
                    }, {
                        origin: "+move",
                        bias: 1
                    })
                },
                goLineStartSmart: function(e) {
                    e.extendSelectionsBy(function(t) {
                        return ro(e, t.head)
                    }, {
                        origin: "+move",
                        bias: 1
                    })
                },
                goLineEnd: function(e) {
                    e.extendSelectionsBy(function(t) {
                        return no(e, t.head.line)
                    }, {
                        origin: "+move",
                        bias: -1
                    })
                },
                goLineRight: function(e) {
                    e.extendSelectionsBy(function(t) {
                        var n = e.charCoords(t.head, "div").top + 5;
                        return e.coordsChar({
                            left: e.display.lineDiv.offsetWidth + 100,
                            top: n
                        }, "div")
                    }, As)
                },
                goLineLeft: function(e) {
                    e.extendSelectionsBy(function(t) {
                        var n = e.charCoords(t.head, "div").top + 5;
                        return e.coordsChar({
                            left: 0,
                            top: n
                        }, "div")
                    }, As)
                },
                goLineLeftSmart: function(e) {
                    e.extendSelectionsBy(function(t) {
                        var n = e.charCoords(t.head, "div").top + 5
                          , r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                        return r.ch < e.getLine(r.line).search(/\S/) ? ro(e, t.head) : r
                    }, As)
                },
                goLineUp: function(e) {
                    e.moveV(-1, "line")
                },
                goLineDown: function(e) {
                    e.moveV(1, "line")
                },
                goPageUp: function(e) {
                    e.moveV(-1, "page")
                },
                goPageDown: function(e) {
                    e.moveV(1, "page")
                },
                goCharLeft: function(e) {
                    e.moveH(-1, "char")
                },
                goCharRight: function(e) {
                    e.moveH(1, "char")
                },
                goColumnLeft: function(e) {
                    e.moveH(-1, "column")
                },
                goColumnRight: function(e) {
                    e.moveH(1, "column")
                },
                goWordLeft: function(e) {
                    e.moveH(-1, "word")
                },
                goGroupRight: function(e) {
                    e.moveH(1, "group")
                },
                goGroupLeft: function(e) {
                    e.moveH(-1, "group")
                },
                goWordRight: function(e) {
                    e.moveH(1, "word")
                },
                delCharBefore: function(e) {
                    e.deleteH(-1, "char")
                },
                delCharAfter: function(e) {
                    e.deleteH(1, "char")
                },
                delWordBefore: function(e) {
                    e.deleteH(-1, "word")
                },
                delWordAfter: function(e) {
                    e.deleteH(1, "word")
                },
                delGroupBefore: function(e) {
                    e.deleteH(-1, "group")
                },
                delGroupAfter: function(e) {
                    e.deleteH(1, "group")
                },
                indentAuto: function(e) {
                    e.indentSelection("smart")
                },
                indentMore: function(e) {
                    e.indentSelection("add")
                },
                indentLess: function(e) {
                    e.indentSelection("subtract")
                },
                insertTab: function(e) {
                    e.replaceSelection("    ")
                },
                insertSoftTab: function(e) {
                    for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                        var o = n[i].from()
                          , s = $s(e.getLine(o.line), o.ch, r);
                        t.push(new Array(r - s % r + 1).join(" "))
                    }
                    e.replaceSelections(t)
                },
                defaultTab: function(e) {
                    e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
                },
                transposeChars: function(e) {
                    Mt(e, function() {
                        for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                            var i = t[r].head
                              , o = Gr(e.doc, i.line).text;
                            if (o)
                                if (i.ch == o.length && (i = new Ao(i.line,i.ch - 1)),
                                i.ch > 0)
                                    i = new Ao(i.line,i.ch + 1),
                                    e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), Ao(i.line, i.ch - 2), i, "+transpose");
                                else if (i.line > e.doc.first) {
                                    var s = Gr(e.doc, i.line - 1).text;
                                    s && e.replaceRange(o.charAt(0) + "\n" + s.charAt(s.length - 1), Ao(i.line - 1, s.length - 1), Ao(i.line, 1), "+transpose")
                                }
                            n.push(new de(i,i))
                        }
                        e.setSelections(n)
                    })
                },
                newlineAndIndent: function(e) {
                    Mt(e, function() {
                        for (var t = e.listSelections().length, n = 0; t > n; n++) {
                            var r = e.listSelections()[n];
                            e.replaceRange("\n", r.anchor, r.head, "+input"),
                            e.indentLine(r.from().line + 1, null , !0),
                            Dn(e)
                        }
                    })
                },
                toggleOverwrite: function(e) {
                    e.toggleOverwrite()
                }
            }
              , is = e.keyMap = {};
            is.basic = {
                Left: "goCharLeft",
                Right: "goCharRight",
                Up: "goLineUp",
                Down: "goLineDown",
                End: "goLineEnd",
                Home: "goLineStartSmart",
                PageUp: "goPageUp",
                PageDown: "goPageDown",
                Delete: "delCharAfter",
                Backspace: "delCharBefore",
                "Shift-Backspace": "delCharBefore",
                Tab: "defaultTab",
                "Shift-Tab": "indentAuto",
                Enter: "newlineAndIndent",
                Insert: "toggleOverwrite",
                Esc: "singleSelection"
            },
            is.pcDefault = {
                "Ctrl-A": "selectAll",
                "Ctrl-D": "deleteLine",
                "Ctrl-Z": "undo",
                "Shift-Ctrl-Z": "redo",
                "Ctrl-Y": "redo",
                "Ctrl-Home": "goDocStart",
                "Ctrl-End": "goDocEnd",
                "Ctrl-Up": "goLineUp",
                "Ctrl-Down": "goLineDown",
                "Ctrl-Left": "goGroupLeft",
                "Ctrl-Right": "goGroupRight",
                "Alt-Left": "goLineStart",
                "Alt-Right": "goLineEnd",
                "Ctrl-Backspace": "delGroupBefore",
                "Ctrl-Delete": "delGroupAfter",
                "Ctrl-S": "save",
                "Ctrl-F": "find",
                "Ctrl-G": "findNext",
                "Shift-Ctrl-G": "findPrev",
                "Shift-Ctrl-F": "replace",
                "Shift-Ctrl-R": "replaceAll",
                "Ctrl-[": "indentLess",
                "Ctrl-]": "indentMore",
                "Ctrl-U": "undoSelection",
                "Shift-Ctrl-U": "redoSelection",
                "Alt-U": "redoSelection",
                fallthrough: "basic"
            },
            is.emacsy = {
                "Ctrl-F": "goCharRight",
                "Ctrl-B": "goCharLeft",
                "Ctrl-P": "goLineUp",
                "Ctrl-N": "goLineDown",
                "Alt-F": "goWordRight",
                "Alt-B": "goWordLeft",
                "Ctrl-A": "goLineStart",
                "Ctrl-E": "goLineEnd",
                "Ctrl-V": "goPageDown",
                "Shift-Ctrl-V": "goPageUp",
                "Ctrl-D": "delCharAfter",
                "Ctrl-H": "delCharBefore",
                "Alt-D": "delWordAfter",
                "Alt-Backspace": "delWordBefore",
                "Ctrl-K": "killLine",
                "Ctrl-T": "transposeChars"
            },
            is.macDefault = {
                "Cmd-A": "selectAll",
                "Cmd-D": "deleteLine",
                "Cmd-Z": "undo",
                "Shift-Cmd-Z": "redo",
                "Cmd-Y": "redo",
                "Cmd-Home": "goDocStart",
                "Cmd-Up": "goDocStart",
                "Cmd-End": "goDocEnd",
                "Cmd-Down": "goDocEnd",
                "Alt-Left": "goGroupLeft",
                "Alt-Right": "goGroupRight",
                "Cmd-Left": "goLineLeft",
                "Cmd-Right": "goLineRight",
                "Alt-Backspace": "delGroupBefore",
                "Ctrl-Alt-Backspace": "delGroupAfter",
                "Alt-Delete": "delGroupAfter",
                "Cmd-S": "save",
                "Cmd-F": "find",
                "Cmd-G": "findNext",
                "Shift-Cmd-G": "findPrev",
                "Cmd-Alt-F": "replace",
                "Shift-Cmd-Alt-F": "replaceAll",
                "Cmd-[": "indentLess",
                "Cmd-]": "indentMore",
                "Cmd-Backspace": "delWrappedLineLeft",
                "Cmd-Delete": "delWrappedLineRight",
                "Cmd-U": "undoSelection",
                "Shift-Cmd-U": "redoSelection",
                "Ctrl-Up": "goDocStart",
                "Ctrl-Down": "goDocEnd",
                fallthrough: ["basic", "emacsy"]
            },
            is["default"] = So ? is.macDefault : is.pcDefault,
            e.normalizeKeyMap = function(e) {
                var t = {};
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var r = e[n];
                        if (/^(name|fallthrough|(de|at)tach)$/.test(n))
                            continue;if ("..." == r) {
                            delete e[n];
                            continue
                        }
                        for (var i = Ti(n.split(" "), Hn), o = 0; o < i.length; o++) {
                            var s, a;
                            o == i.length - 1 ? (a = i.join(" "),
                            s = r) : (a = i.slice(0, o + 1).join(" "),
                            s = "...");
                            var l = t[a];
                            if (l) {
                                if (l != s)
                                    throw new Error("Inconsistent bindings for " + a)
                            } else
                                t[a] = s
                        }
                        delete e[n]
                    }
                for (var u in t)
                    e[u] = t[u];
                return e
            }
            ;
            var os = e.lookupKey = function(e, t, n, r) {
                t = Bn(t);
                var i = t.call ? t.call(e, r) : t[e];
                if (i === !1)
                    return "nothing";
                if ("..." === i)
                    return "multi";
                if (null  != i && n(i))
                    return "handled";
                if (t.fallthrough) {
                    if ("[object Array]" != Object.prototype.toString.call(t.fallthrough))
                        return os(e, t.fallthrough, n, r);
                    for (var o = 0; o < t.fallthrough.length; o++) {
                        var s = os(e, t.fallthrough[o], n, r);
                        if (s)
                            return s
                    }
                }
            }
              , ss = e.isModifierKey = function(e) {
                var t = "string" == typeof e ? e : Ys[e.keyCode];
                return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
            }
              , as = e.keyName = function(e, t) {
                if (yo && 34 == e.keyCode && e["char"])
                    return !1;
                var n = Ys[e.keyCode]
                  , r = n;
                return null  == r || e.altGraphKey ? !1 : (e.altKey && "Alt" != n && (r = "Alt-" + r),
                (Mo ? e.metaKey : e.ctrlKey) && "Ctrl" != n && (r = "Ctrl-" + r),
                (Mo ? e.ctrlKey : e.metaKey) && "Cmd" != n && (r = "Cmd-" + r),
                !t && e.shiftKey && "Shift" != n && (r = "Shift-" + r),
                r)
            }
            ;
            e.fromTextArea = function(t, n) {
                function r() {
                    t.value = u.getValue()
                }
                if (n = n ? Ni(n) : {},
                n.value = t.value,
                !n.tabindex && t.tabIndex && (n.tabindex = t.tabIndex),
                !n.placeholder && t.placeholder && (n.placeholder = t.placeholder),
                null  == n.autofocus) {
                    var i = Vi();
                    n.autofocus = i == t || null  != t.getAttribute("autofocus") && i == document.body
                }
                if (t.form && (js(t.form, "submit", r),
                !n.leaveSubmitMethodAlone)) {
                    var o = t.form
                      , s = o.submit;
                    try {
                        var a = o.submit = function() {
                            r(),
                            o.submit = s,
                            o.submit(),
                            o.submit = a
                        }
                    } catch (l) {}
                }
                n.finishInit = function(e) {
                    e.save = r,
                    e.getTextArea = function() {
                        return t
                    }
                    ,
                    e.toTextArea = function() {
                        e.toTextArea = isNaN,
                        r(),
                        t.parentNode.removeChild(e.getWrapperElement()),
                        t.style.display = "",
                        t.form && (Ss(t.form, "submit", r),
                        "function" == typeof t.form.submit && (t.form.submit = s))
                    }
                }
                ,
                t.style.display = "none";
                var u = e(function(e) {
                    t.parentNode.insertBefore(e, t.nextSibling)
                }, n);
                return u
            }
            ;
            var ls = e.StringStream = function(e, t) {
                this.pos = this.start = 0,
                this.string = e,
                this.tabSize = t || 8,
                this.lastColumnPos = this.lastColumnValue = 0,
                this.lineStart = 0
            }
            ;
            ls.prototype = {
                eol: function() {
                    return this.pos >= this.string.length
                },
                sol: function() {
                    return this.pos == this.lineStart
                },
                peek: function() {
                    return this.string.charAt(this.pos) || void 0
                },
                next: function() {
                    return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
                },
                eat: function(e) {
                    var t = this.string.charAt(this.pos);
                    if ("string" == typeof e)
                        var n = t == e;
                    else
                        var n = t && (e.test ? e.test(t) : e(t));
                    return n ? (++this.pos,
                    t) : void 0
                },
                eatWhile: function(e) {
                    for (var t = this.pos; this.eat(e); )
                        ;
                    return this.pos > t
                },
                eatSpace: function() {
                    for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
                        ++this.pos;
                    return this.pos > e
                },
                skipToEnd: function() {
                    this.pos = this.string.length
                },
                skipTo: function(e) {
                    var t = this.string.indexOf(e, this.pos);
                    return t > -1 ? (this.pos = t,
                    !0) : void 0
                },
                backUp: function(e) {
                    this.pos -= e
                },
                column: function() {
                    return this.lastColumnPos < this.start && (this.lastColumnValue = $s(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue),
                    this.lastColumnPos = this.start),
                    this.lastColumnValue - (this.lineStart ? $s(this.string, this.lineStart, this.tabSize) : 0)
                },
                indentation: function() {
                    return $s(this.string, null , this.tabSize) - (this.lineStart ? $s(this.string, this.lineStart, this.tabSize) : 0)
                },
                match: function(e, t, n) {
                    if ("string" != typeof e) {
                        var r = this.string.slice(this.pos).match(e);
                        return r && r.index > 0 ? null  : (r && t !== !1 && (this.pos += r[0].length),
                        r)
                    }
                    var i = function(e) {
                        return n ? e.toLowerCase() : e
                    }
                      , o = this.string.substr(this.pos, e.length);
                    return i(o) == i(e) ? (t !== !1 && (this.pos += e.length),
                    !0) : void 0
                },
                current: function() {
                    return this.string.slice(this.start, this.pos)
                },
                hideFirstChars: function(e, t) {
                    this.lineStart += e;
                    try {
                        return t()
                    } finally {
                        this.lineStart -= e
                    }
                }
            };
            var us = 0
              , cs = e.TextMarker = function(e, t) {
                this.lines = [],
                this.type = t,
                this.doc = e,
                this.id = ++us
            }
            ;
            Si(cs),
            cs.prototype.clear = function() {
                if (!this.explicitlyCleared) {
                    var e = this.doc.cm
                      , t = e && !e.curOp;
                    if (t && yt(e),
                    ji(this, "clear")) {
                        var n = this.find();
                        n && bi(this, "clear", n.from, n.to)
                    }
                    for (var r = null , i = null , o = 0; o < this.lines.length; ++o) {
                        var s = this.lines[o]
                          , a = Yn(s.markedSpans, this);
                        e && !this.collapsed ? Dt(e, Xr(s), "text") : e && (null  != a.to && (i = Xr(s)),
                        null  != a.from && (r = Xr(s))),
                        s.markedSpans = Xn(s.markedSpans, a),
                        null  == a.from && this.collapsed && !yr(this.doc, s) && e && Yr(s, gt(e.display))
                    }
                    if (e && this.collapsed && !e.options.lineWrapping)
                        for (var o = 0; o < this.lines.length; ++o) {
                            var l = fr(this.lines[o])
                              , u = d(l);
                            u > e.display.maxLineLength && (e.display.maxLine = l,
                            e.display.maxLineLength = u,
                            e.display.maxLineChanged = !0)
                        }
                    null  != r && e && this.collapsed && Nt(e, r, i + 1),
                    this.lines.length = 0,
                    this.explicitlyCleared = !0,
                    this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1,
                    e && Ee(e.doc)),
                    e && bi(e, "markerCleared", e, this),
                    t && wt(e),
                    this.parent && this.parent.clear()
                }
            }
            ,
            cs.prototype.find = function(e, t) {
                null  == e && "bookmark" == this.type && (e = 1);
                for (var n, r, i = 0; i < this.lines.length; ++i) {
                    var o = this.lines[i]
                      , s = Yn(o.markedSpans, this);
                    if (null  != s.from && (n = Ao(t ? o : Xr(o), s.from),
                    -1 == e))
                        return n;
                    if (null  != s.to && (r = Ao(t ? o : Xr(o), s.to),
                    1 == e))
                        return r
                }
                return n && {
                    from: n,
                    to: r
                }
            }
            ,
            cs.prototype.changed = function() {
                var e = this.find(-1, !0)
                  , t = this
                  , n = this.doc.cm;
                e && n && Mt(n, function() {
                    var r = e.line
                      , i = Xr(e.line)
                      , o = Xe(n, i);
                    if (o && (rt(o),
                    n.curOp.selectionChanged = n.curOp.forceUpdate = !0),
                    n.curOp.updateMaxLine = !0,
                    !yr(t.doc, r) && null  != t.height) {
                        var s = t.height;
                        t.height = null ;
                        var a = xr(t) - s;
                        a && Yr(r, r.height + a)
                    }
                })
            }
            ,
            cs.prototype.attachLine = function(e) {
                if (!this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    t.maybeHiddenMarkers && -1 != Ei(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
                }
                this.lines.push(e)
            }
            ,
            cs.prototype.detachLine = function(e) {
                if (this.lines.splice(Ei(this.lines, e), 1),
                !this.lines.length && this.doc.cm) {
                    var t = this.doc.cm.curOp;
                    (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
                }
            }
            ;
            var us = 0
              , ds = e.SharedTextMarker = function(e, t) {
                this.markers = e,
                this.primary = t;
                for (var n = 0; n < e.length; ++n)
                    e[n].parent = this
            }
            ;
            Si(ds),
            ds.prototype.clear = function() {
                if (!this.explicitlyCleared) {
                    this.explicitlyCleared = !0;
                    for (var e = 0; e < this.markers.length; ++e)
                        this.markers[e].clear();
                    bi(this, "clear")
                }
            }
            ,
            ds.prototype.find = function(e, t) {
                return this.primary.find(e, t)
            }
            ;
            var hs = e.LineWidget = function(e, t, n) {
                if (n)
                    for (var r in n)
                        n.hasOwnProperty(r) && (this[r] = n[r]);
                this.doc = e,
                this.node = t
            }
            ;
            Si(hs),
            hs.prototype.clear = function() {
                var e = this.doc.cm
                  , t = this.line.widgets
                  , n = this.line
                  , r = Xr(n);
                if (null  != r && t) {
                    for (var i = 0; i < t.length; ++i)
                        t[i] == this && t.splice(i--, 1);
                    t.length || (n.widgets = null );
                    var o = xr(this);
                    Yr(n, Math.max(0, n.height - o)),
                    e && Mt(e, function() {
                        wr(e, n, -o),
                        Dt(e, r, "widget")
                    })
                }
            }
            ,
            hs.prototype.changed = function() {
                var e = this.height
                  , t = this.doc.cm
                  , n = this.line;
                this.height = null ;
                var r = xr(this) - e;
                r && (Yr(n, n.height + r),
                t && Mt(t, function() {
                    t.curOp.forceUpdate = !0,
                    wr(t, n, r)
                }))
            }
            ;
            var ps = e.Line = function(e, t, n) {
                this.text = e,
                sr(this, t),
                this.height = n ? n(this) : 1
            }
            ;
            Si(ps),
            ps.prototype.lineNo = function() {
                return Xr(this)
            }
            ;
            var fs = {}
              , ms = {};
            Br.prototype = {
                chunkSize: function() {
                    return this.lines.length
                },
                removeInner: function(e, t) {
                    for (var n = e, r = e + t; r > n; ++n) {
                        var i = this.lines[n];
                        this.height -= i.height,
                        Sr(i),
                        bi(i, "delete")
                    }
                    this.lines.splice(e, t)
                },
                collapse: function(e) {
                    e.push.apply(e, this.lines)
                },
                insertInner: function(e, t, n) {
                    this.height += n,
                    this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                    for (var r = 0; r < t.length; ++r)
                        t[r].parent = this
                },
                iterN: function(e, t, n) {
                    for (var r = e + t; r > e; ++e)
                        if (n(this.lines[e]))
                            return !0
                }
            },
            Wr.prototype = {
                chunkSize: function() {
                    return this.size
                },
                removeInner: function(e, t) {
                    this.size -= t;
                    for (var n = 0; n < this.children.length; ++n) {
                        var r = this.children[n]
                          , i = r.chunkSize();
                        if (i > e) {
                            var o = Math.min(t, i - e)
                              , s = r.height;
                            if (r.removeInner(e, o),
                            this.height -= s - r.height,
                            i == o && (this.children.splice(n--, 1),
                            r.parent = null ),
                            0 == (t -= o))
                                break;
                            e = 0
                        } else
                            e -= i
                    }
                    if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Br))) {
                        var a = [];
                        this.collapse(a),
                        this.children = [new Br(a)],
                        this.children[0].parent = this
                    }
                },
                collapse: function(e) {
                    for (var t = 0; t < this.children.length; ++t)
                        this.children[t].collapse(e)
                },
                insertInner: function(e, t, n) {
                    this.size += t.length,
                    this.height += n;
                    for (var r = 0; r < this.children.length; ++r) {
                        var i = this.children[r]
                          , o = i.chunkSize();
                        if (o >= e) {
                            if (i.insertInner(e, t, n),
                            i.lines && i.lines.length > 50) {
                                for (; i.lines.length > 50; ) {
                                    var s = i.lines.splice(i.lines.length - 25, 25)
                                      , a = new Br(s);
                                    i.height -= a.height,
                                    this.children.splice(r + 1, 0, a),
                                    a.parent = this
                                }
                                this.maybeSpill()
                            }
                            break
                        }
                        e -= o
                    }
                },
                maybeSpill: function() {
                    if (!(this.children.length <= 10)) {
                        var e = this;
                        do {
                            var t = e.children.splice(e.children.length - 5, 5)
                              , n = new Wr(t);
                            if (e.parent) {
                                e.size -= n.size,
                                e.height -= n.height;
                                var r = Ei(e.parent.children, e);
                                e.parent.children.splice(r + 1, 0, n)
                            } else {
                                var i = new Wr(e.children);
                                i.parent = e,
                                e.children = [i, n],
                                e = i
                            }
                            n.parent = e.parent
                        } while (e.children.length > 10);e.parent.maybeSpill()
                    }
                },
                iterN: function(e, t, n) {
                    for (var r = 0; r < this.children.length; ++r) {
                        var i = this.children[r]
                          , o = i.chunkSize();
                        if (o > e) {
                            var s = Math.min(t, o - e);
                            if (i.iterN(e, s, n))
                                return !0;
                            if (0 == (t -= s))
                                break;
                            e = 0
                        } else
                            e -= o
                    }
                }
            };
            var gs = 0
              , vs = e.Doc = function(e, t, n) {
                if (!(this instanceof vs))
                    return new vs(e,t,n);
                null  == n && (n = 0),
                Wr.call(this, [new Br([new ps("",null )])]),
                this.first = n,
                this.scrollTop = this.scrollLeft = 0,
                this.cantEdit = !1,
                this.cleanGeneration = 1,
                this.frontier = n;
                var r = Ao(n, 0);
                this.sel = pe(r),
                this.history = new ti(null ),
                this.id = ++gs,
                this.modeOption = t,
                "string" == typeof e && (e = Us(e)),
                Hr(this, {
                    from: r,
                    to: r,
                    text: e
                }),
                Le(this, pe(r), Es)
            }
            ;
            vs.prototype = $i(Wr.prototype, {
                constructor: vs,
                iter: function(e, t, n) {
                    n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
                },
                insert: function(e, t) {
                    for (var n = 0, r = 0; r < t.length; ++r)
                        n += t[r].height;
                    this.insertInner(e - this.first, t, n)
                },
                remove: function(e, t) {
                    this.removeInner(e - this.first, t)
                },
                getValue: function(e) {
                    var t = Qr(this, this.first, this.first + this.size);
                    return e === !1 ? t : t.join(e || "\n")
                },
                setValue: Tt(function(e) {
                    var t = Ao(this.first, 0)
                      , n = this.first + this.size - 1;
                    kn(this, {
                        from: t,
                        to: Ao(n, Gr(this, n).text.length),
                        text: Us(e),
                        origin: "setValue",
                        full: !0
                    }, !0),
                    Le(this, pe(t))
                }),
                replaceRange: function(e, t, n, r) {
                    t = me(this, t),
                    n = n ? me(this, n) : t,
                    On(this, e, t, n, r)
                },
                getRange: function(e, t, n) {
                    var r = Kr(this, me(this, e), me(this, t));
                    return n === !1 ? r : r.join(n || "\n")
                },
                getLine: function(e) {
                    var t = this.getLineHandle(e);
                    return t && t.text
                },
                getLineHandle: function(e) {
                    return ve(this, e) ? Gr(this, e) : void 0
                },
                getLineNumber: function(e) {
                    return Xr(e)
                },
                getLineHandleVisualStart: function(e) {
                    return "number" == typeof e && (e = Gr(this, e)),
                    fr(e)
                },
                lineCount: function() {
                    return this.size
                },
                firstLine: function() {
                    return this.first
                },
                lastLine: function() {
                    return this.first + this.size - 1
                },
                clipPos: function(e) {
                    return me(this, e)
                },
                getCursor: function(e) {
                    var t, n = this.sel.primary();
                    return t = null  == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || "to" == e || e === !1 ? n.to() : n.from()
                },
                listSelections: function() {
                    return this.sel.ranges
                },
                somethingSelected: function() {
                    return this.sel.somethingSelected()
                },
                setCursor: Tt(function(e, t, n) {
                    je(this, me(this, "number" == typeof e ? Ao(e, t || 0) : e), null , n)
                }),
                setSelection: Tt(function(e, t, n) {
                    je(this, me(this, e), me(this, t || e), n)
                }),
                extendSelection: Tt(function(e, t, n) {
                    we(this, me(this, e), t && me(this, t), n)
                }),
                extendSelections: Tt(function(e, t) {
                    xe(this, ye(this, e, t))
                }),
                extendSelectionsBy: Tt(function(e, t) {
                    xe(this, Ti(this.sel.ranges, e), t)
                }),
                setSelections: Tt(function(e, t, n) {
                    if (e.length) {
                        for (var r = 0, i = []; r < e.length; r++)
                            i[r] = new de(me(this, e[r].anchor),me(this, e[r].head));
                        null  == t && (t = Math.min(e.length - 1, this.sel.primIndex)),
                        Le(this, he(i, t), n)
                    }
                }),
                addSelection: Tt(function(e, t, n) {
                    var r = this.sel.ranges.slice(0);
                    r.push(new de(me(this, e),me(this, t || e))),
                    Le(this, he(r, r.length - 1), n)
                }),
                getSelection: function(e) {
                    for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                        var i = Kr(this, n[r].from(), n[r].to());
                        t = t ? t.concat(i) : i
                    }
                    return e === !1 ? t : t.join(e || "\n")
                },
                getSelections: function(e) {
                    for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                        var i = Kr(this, n[r].from(), n[r].to());
                        e !== !1 && (i = i.join(e || "\n")),
                        t[r] = i
                    }
                    return t
                },
                replaceSelection: function(e, t, n) {
                    for (var r = [], i = 0; i < this.sel.ranges.length; i++)
                        r[i] = e;
                    this.replaceSelections(r, t, n || "+input")
                },
                replaceSelections: Tt(function(e, t, n) {
                    for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                        var s = i.ranges[o];
                        r[o] = {
                            from: s.from(),
                            to: s.to(),
                            text: Us(e[o]),
                            origin: n
                        }
                    }
                    for (var a = t && "end" != t && wn(this, r, t), o = r.length - 1; o >= 0; o--)
                        kn(this, r[o]);
                    a ? Ce(this, a) : this.cm && Dn(this.cm)
                }),
                undo: Tt(function() {
                    Sn(this, "undo")
                }),
                redo: Tt(function() {
                    Sn(this, "redo")
                }),
                undoSelection: Tt(function() {
                    Sn(this, "undo", !0)
                }),
                redoSelection: Tt(function() {
                    Sn(this, "redo", !0)
                }),
                setExtending: function(e) {
                    this.extend = e
                },
                getExtending: function() {
                    return this.extend
                },
                historySize: function() {
                    for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++)
                        e.done[r].ranges || ++t;
                    for (var r = 0; r < e.undone.length; r++)
                        e.undone[r].ranges || ++n;
                    return {
                        undo: t,
                        redo: n
                    }
                },
                clearHistory: function() {
                    this.history = new ti(this.history.maxGeneration)
                },
                markClean: function() {
                    this.cleanGeneration = this.changeGeneration(!0)
                },
                changeGeneration: function(e) {
                    return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null ),
                    this.history.generation
                },
                isClean: function(e) {
                    return this.history.generation == (e || this.cleanGeneration)
                },
                getHistory: function() {
                    return {
                        done: hi(this.history.done),
                        undone: hi(this.history.undone)
                    }
                },
                setHistory: function(e) {
                    var t = this.history = new ti(this.history.maxGeneration);
                    t.done = hi(e.done.slice(0), null , !0),
                    t.undone = hi(e.undone.slice(0), null , !0)
                },
                addLineClass: Tt(function(e, t, n) {
                    return Rn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                        var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
                        if (e[r]) {
                            if (Hi(n).test(e[r]))
                                return !1;
                            e[r] += " " + n
                        } else
                            e[r] = n;
                        return !0
                    })
                }),
                removeLineClass: Tt(function(e, t, n) {
                    return Rn(this, e, "gutter" == t ? "gutter" : "class", function(e) {
                        var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass"
                          , i = e[r];
                        if (!i)
                            return !1;
                        if (null  == n)
                            e[r] = null ;
                        else {
                            var o = i.match(Hi(n));
                            if (!o)
                                return !1;
                            var s = o.index + o[0].length;
                            e[r] = i.slice(0, o.index) + (o.index && s != i.length ? " " : "") + i.slice(s) || null
                        }
                        return !0
                    })
                }),
                addLineWidget: Tt(function(e, t, n) {
                    return kr(this, e, t, n)
                }),
                removeLineWidget: function(e) {
                    e.clear()
                },
                markText: function(e, t, n) {
                    return Wn(this, me(this, e), me(this, t), n, "range")
                },
                setBookmark: function(e, t) {
                    var n = {
                        replacedWith: t && (null  == t.nodeType ? t.widget : t),
                        insertLeft: t && t.insertLeft,
                        clearWhenEmpty: !1,
                        shared: t && t.shared,
                        handleMouseEvents: t && t.handleMouseEvents
                    };
                    return e = me(this, e),
                    Wn(this, e, e, n, "bookmark")
                },
                findMarksAt: function(e) {
                    e = me(this, e);
                    var t = []
                      , n = Gr(this, e.line).markedSpans;
                    if (n)
                        for (var r = 0; r < n.length; ++r) {
                            var i = n[r];
                            (null  == i.from || i.from <= e.ch) && (null  == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                        }
                    return t
                },
                findMarks: function(e, t, n) {
                    e = me(this, e),
                    t = me(this, t);
                    var r = []
                      , i = e.line;
                    return this.iter(e.line, t.line + 1, function(o) {
                        var s = o.markedSpans;
                        if (s)
                            for (var a = 0; a < s.length; a++) {
                                var l = s[a];
                                i == e.line && e.ch > l.to || null  == l.from && i != e.line || i == t.line && l.from > t.ch || n && !n(l.marker) || r.push(l.marker.parent || l.marker)
                            }
                        ++i
                    }),
                    r
                },
                getAllMarks: function() {
                    var e = [];
                    return this.iter(function(t) {
                        var n = t.markedSpans;
                        if (n)
                            for (var r = 0; r < n.length; ++r)
                                null  != n[r].from && e.push(n[r].marker)
                    }),
                    e
                },
                posFromIndex: function(e) {
                    var t, n = this.first;
                    return this.iter(function(r) {
                        var i = r.text.length + 1;
                        return i > e ? (t = e,
                        !0) : (e -= i,
                        void ++n)
                    }),
                    me(this, Ao(n, t))
                },
                indexFromPos: function(e) {
                    e = me(this, e);
                    var t = e.ch;
                    return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function(e) {
                        t += e.text.length + 1
                    }),
                    t)
                },
                copy: function(e) {
                    var t = new vs(Qr(this, this.first, this.first + this.size),this.modeOption,this.first);
                    return t.scrollTop = this.scrollTop,
                    t.scrollLeft = this.scrollLeft,
                    t.sel = this.sel,
                    t.extend = !1,
                    e && (t.history.undoDepth = this.history.undoDepth,
                    t.setHistory(this.getHistory())),
                    t
                },
                linkedDoc: function(e) {
                    e || (e = {});
                    var t = this.first
                      , n = this.first + this.size;
                    null  != e.from && e.from > t && (t = e.from),
                    null  != e.to && e.to < n && (n = e.to);
                    var r = new vs(Qr(this, t, n),e.mode || this.modeOption,t);
                    return e.sharedHist && (r.history = this.history),
                    (this.linked || (this.linked = [])).push({
                        doc: r,
                        sharedHist: e.sharedHist
                    }),
                    r.linked = [{
                        doc: this,
                        isParent: !0,
                        sharedHist: e.sharedHist
                    }],
                    Gn(r, Un(this)),
                    r
                },
                unlinkDoc: function(t) {
                    if (t instanceof e && (t = t.doc),
                    this.linked)
                        for (var n = 0; n < this.linked.length; ++n) {
                            var r = this.linked[n];
                            if (r.doc == t) {
                                this.linked.splice(n, 1),
                                t.unlinkDoc(this),
                                Kn(Un(this));
                                break
                            }
                        }
                    if (t.history == this.history) {
                        var i = [t.id];
                        qr(t, function(e) {
                            i.push(e.id)
                        }, !0),
                        t.history = new ti(null ),
                        t.history.done = hi(this.history.done, i),
                        t.history.undone = hi(this.history.undone, i)
                    }
                },
                iterLinkedDocs: function(e) {
                    qr(this, e)
                },
                getMode: function() {
                    return this.mode
                },
                getEditor: function() {
                    return this.cm
                }
            }),
            vs.prototype.eachLine = vs.prototype.iter;
            var ys = "iter insert remove copy getEditor".split(" ");
            for (var bs in vs.prototype)
                vs.prototype.hasOwnProperty(bs) && Ei(ys, bs) < 0 && (e.prototype[bs] = function(e) {
                    return function() {
                        return e.apply(this.doc, arguments)
                    }
                }(vs.prototype[bs]));
            Si(vs);
            var ws = e.e_preventDefault = function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }
              , xs = e.e_stopPropagation = function(e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }
              , ks = e.e_stop = function(e) {
                ws(e),
                xs(e)
            }
              , js = e.on = function(e, t, n) {
                if (e.addEventListener)
                    e.addEventListener(t, n, !1);
                else if (e.attachEvent)
                    e.attachEvent("on" + t, n);
                else {
                    var r = e._handlers || (e._handlers = {})
                      , i = r[t] || (r[t] = []);
                    i.push(n)
                }
            }
              , Ss = e.off = function(e, t, n) {
                if (e.removeEventListener)
                    e.removeEventListener(t, n, !1);
                else if (e.detachEvent)
                    e.detachEvent("on" + t, n);
                else {
                    var r = e._handlers && e._handlers[t];
                    if (!r)
                        return;
                    for (var i = 0; i < r.length; ++i)
                        if (r[i] == n) {
                            r.splice(i, 1);
                            break
                        }
                }
            }
              , Cs = e.signal = function(e, t) {
                var n = e._handlers && e._handlers[t];
                if (n)
                    for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i)
                        n[i].apply(null , r)
            }
              , Ls = null
              , Ms = 30
              , Os = e.Pass = {
                toString: function() {
                    return "CodeMirror.Pass"
                }
            }
              , Es = {
                scroll: !1
            }
              , Ts = {
                origin: "*mouse"
            }
              , As = {
                origin: "+move"
            };
            Ci.prototype.set = function(e, t) {
                clearTimeout(this.id),
                this.id = setTimeout(t, e)
            }
            ;
            var $s = e.countColumn = function(e, t, n, r, i) {
                null  == t && (t = e.search(/[^\s\u00a0]/),
                -1 == t && (t = e.length));
                for (var o = r || 0, s = i || 0; ; ) {
                    var a = e.indexOf(" ", o);
                    if (0 > a || a >= t)
                        return s + (t - o);
                    s += a - o,
                    s += n - s % n,
                    o = a + 1
                }
            }
              , Ns = [""]
              , Ds = function(e) {
                e.select()
            }
            ;
            ko ? Ds = function(e) {
                e.selectionStart = 0,
                e.selectionEnd = e.value.length
            }
             : po && (Ds = function(e) {
                try {
                    e.select()
                } catch (t) {}
            }
            );
            var Ps, Is = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Rs = e.isWordChar = function(e) {
                return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Is.test(e))
            }
            , _s = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
            Ps = document.createRange ? function(e, t, n, r) {
                var i = document.createRange();
                return i.setEnd(r || e, n),
                i.setStart(e, t),
                i
            }
             : function(e, t, n) {
                var r = document.body.createTextRange();
                try {
                    r.moveToElementText(e.parentNode)
                } catch (i) {
                    return r
                }
                return r.collapse(!0),
                r.moveEnd("character", n),
                r.moveStart("character", t),
                r
            }
            ;
            var Fs = e.contains = function(e, t) {
                if (3 == t.nodeType && (t = t.parentNode),
                e.contains)
                    return e.contains(t);
                do
                    if (11 == t.nodeType && (t = t.host),
                    t == e)
                        return !0;
                while (t = t.parentNode)
            }
            ;
            po && 11 > fo && (Vi = function() {
                try {
                    return document.activeElement
                } catch (e) {
                    return document.body
                }
            }
            );
            var zs, Vs, Hs = e.rmClass = function(e, t) {
                var n = e.className
                  , r = Hi(t).exec(n);
                if (r) {
                    var i = n.slice(r.index + r[0].length);
                    e.className = n.slice(0, r.index) + (i ? r[1] + i : "")
                }
            }
            , Bs = e.addClass = function(e, t) {
                var n = e.className;
                Hi(t).test(n) || (e.className += (n ? " " : "") + t)
            }
            , Ws = !1, qs = function() {
                if (po && 9 > fo)
                    return !1;
                var e = _i("div");
                return "draggable" in e || "dragDrop" in e
            }(), Us = e.splitLines = 3 != "\n\nb".split(/\n/).length ? function(e) {
                for (var t = 0, n = [], r = e.length; r >= t; ) {
                    var i = e.indexOf("\n", t);
                    -1 == i && (i = e.length);
                    var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i)
                      , s = o.indexOf("\r");
                    -1 != s ? (n.push(o.slice(0, s)),
                    t += s + 1) : (n.push(o),
                    t = i + 1)
                }
                return n
            }
             : function(e) {
                return e.split(/\r\n?|\n/)
            }
            , Gs = window.getSelection ? function(e) {
                try {
                    return e.selectionStart != e.selectionEnd
                } catch (t) {
                    return !1
                }
            }
             : function(e) {
                try {
                    var t = e.ownerDocument.selection.createRange()
                } catch (n) {}
                return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1
            }
            , Ks = function() {
                var e = _i("div");
                return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"),
                "function" == typeof e.oncopy)
            }(), Qs = null , Ys = {
                3: "Enter",
                8: "Backspace",
                9: "Tab",
                13: "Enter",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                19: "Pause",
                20: "CapsLock",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "PrintScrn",
                45: "Insert",
                46: "Delete",
                59: ";",
                61: "=",
                91: "Mod",
                92: "Mod",
                93: "Mod",
                107: "=",
                109: "-",
                127: "Delete",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                63232: "Up",
                63233: "Down",
                63234: "Left",
                63235: "Right",
                63272: "Delete",
                63273: "Home",
                63275: "End",
                63276: "PageUp",
                63277: "PageDown",
                63302: "Insert"
            };
            e.keyNames = Ys,
            function() {
                for (var e = 0; 10 > e; e++)
                    Ys[e + 48] = Ys[e + 96] = String(e);
                for (var e = 65; 90 >= e; e++)
                    Ys[e] = String.fromCharCode(e);
                for (var e = 1; 12 >= e; e++)
                    Ys[e + 111] = Ys[e + 63235] = "F" + e
            }();
            var Xs, Zs = function() {
                function e(e) {
                    return 247 >= e ? n.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1773 >= e ? r.charAt(e - 1536) : e >= 1774 && 2220 >= e ? "r" : e >= 8192 && 8203 >= e ? "w" : 8204 == e ? "b" : "L"
                }
                function t(e, t, n) {
                    this.level = e,
                    this.from = t,
                    this.to = n
                }
                var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN"
                  , r = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm"
                  , i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/
                  , o = /[stwN]/
                  , s = /[LRr]/
                  , a = /[Lb1n]/
                  , l = /[1n]/
                  , u = "L";
                return function(n) {
                    if (!i.test(n))
                        return !1;
                    for (var r, c = n.length, d = [], h = 0; c > h; ++h)
                        d.push(r = e(n.charCodeAt(h)));
                    for (var h = 0, p = u; c > h; ++h) {
                        var r = d[h];
                        "m" == r ? d[h] = p : p = r
                    }
                    for (var h = 0, f = u; c > h; ++h) {
                        var r = d[h];
                        "1" == r && "r" == f ? d[h] = "n" : s.test(r) && (f = r,
                        "r" == r && (d[h] = "R"))
                    }
                    for (var h = 1, p = d[0]; c - 1 > h; ++h) {
                        var r = d[h];
                        "+" == r && "1" == p && "1" == d[h + 1] ? d[h] = "1" : "," != r || p != d[h + 1] || "1" != p && "n" != p || (d[h] = p),
                        p = r
                    }
                    for (var h = 0; c > h; ++h) {
                        var r = d[h];
                        if ("," == r)
                            d[h] = "N";
                        else if ("%" == r) {
                            for (var m = h + 1; c > m && "%" == d[m]; ++m)
                                ;
                            for (var g = h && "!" == d[h - 1] || c > m && "1" == d[m] ? "1" : "N", v = h; m > v; ++v)
                                d[v] = g;
                            h = m - 1
                        }
                    }
                    for (var h = 0, f = u; c > h; ++h) {
                        var r = d[h];
                        "L" == f && "1" == r ? d[h] = "L" : s.test(r) && (f = r)
                    }
                    for (var h = 0; c > h; ++h)
                        if (o.test(d[h])) {
                            for (var m = h + 1; c > m && o.test(d[m]); ++m)
                                ;
                            for (var y = "L" == (h ? d[h - 1] : u), b = "L" == (c > m ? d[m] : u), g = y || b ? "L" : "R", v = h; m > v; ++v)
                                d[v] = g;
                            h = m - 1
                        }
                    for (var w, x = [], h = 0; c > h; )
                        if (a.test(d[h])) {
                            var k = h;
                            for (++h; c > h && a.test(d[h]); ++h)
                                ;
                            x.push(new t(0,k,h))
                        } else {
                            var j = h
                              , S = x.length;
                            for (++h; c > h && "L" != d[h]; ++h)
                                ;
                            for (var v = j; h > v; )
                                if (l.test(d[v])) {
                                    v > j && x.splice(S, 0, new t(1,j,v));
                                    var C = v;
                                    for (++v; h > v && l.test(d[v]); ++v)
                                        ;
                                    x.splice(S, 0, new t(2,C,v)),
                                    j = v
                                } else
                                    ++v;
                            h > j && x.splice(S, 0, new t(1,j,h))
                        }
                    return 1 == x[0].level && (w = n.match(/^\s+/)) && (x[0].from = w[0].length,
                    x.unshift(new t(0,0,w[0].length))),
                    1 == Oi(x).level && (w = n.match(/\s+$/)) && (Oi(x).to -= w[0].length,
                    x.push(new t(0,c - w[0].length,c))),
                    2 == x[0].level && x.unshift(new t(1,x[0].to,x[0].to)),
                    x[0].level != Oi(x).level && x.push(new t(x[0].level,c,c)),
                    x
                }
            }();
            return e.version = "5.3.0",
            e
        })
    }(require("github:jspm/nodelibs-process@0.1.1")),
    n.define = r,
    t.exports
}),
System.register("npm:codemirror@5.3.0", ["npm:codemirror@5.3.0/lib/codemirror"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("npm:codemirror@5.3.0/lib/codemirror"),
    n.define = r,
    t.exports
}),
System.register("github:aurelia/html-template-element@0.2.0/HTMLTemplateElement.min", [], !1, function(e, t, n) {
    return System.get("@@global-helpers").prepareGlobal(n.id, []),
    function() {
        !function(e) {
            function t(e) {
                return "template" == e.tagName && "http://www.w3.org/2000/svg" == e.namespaceURI
            }
            function n(e) {
                return "TEMPLATE" == e.tagName && "http://www.w3.org/1999/xhtml" == e.namespaceURI
            }
            function r(e) {
                return void 0 === e.isTemplate_ && (e.isTemplate_ = "TEMPLATE" == e.tagName),
                e.isTemplate_
            }
            function i(e) {
                var t = e.ownerDocument.createElement("template");
                e.parentNode.insertBefore(t, e);
                for (var n = e.attributes, r = n.length; r-- > 0; ) {
                    var i = n[r];
                    t.setAttribute(i.name, i.value),
                    e.removeAttribute(i.name)
                }
                return e.parentNode.removeChild(e),
                t
            }
            function o(e, t) {
                var n = e.querySelectorAll("template");
                r(e) && t(e),
                d(n, t)
            }
            function s(e) {
                function t(e) {
                    HTMLTemplateElement.decorate(e) || s(e.content)
                }
                o(e, t)
            }
            function a(e) {
                var t = e.ownerDocument;
                if (!t.defaultView)
                    return t;
                var n = t.templateContentsOwner_;
                if (!n) {
                    for (n = t.implementation.createHTMLDocument(""); n.lastChild; )
                        n.removeChild(n.lastChild);
                    t.templateContentsOwner_ = n
                }
                return n
            }
            function l(e, t, n) {
                var r = e.content;
                if (n)
                    return void r.appendChild(t);
                for (var i; i = t.firstChild; )
                    r.appendChild(i)
            }
            function u(e, t) {
                Object.getOwnPropertyNames(t).forEach(function(n) {
                    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                })
            }
            function c(e) {
                p ? e.__proto__ = HTMLTemplateElement.prototype : u(e, HTMLTemplateElement.prototype)
            }
            var d = Array.prototype.forEach.call.bind(Array.prototype.forEach)
              , h = "undefined" != typeof HTMLTemplateElement;
            h || (e.HTMLTemplateElement = function() {
                throw TypeError("Illegal constructor")
            }
            );
            var p = "__proto__" in {};
            HTMLTemplateElement.decorate = function(e, r) {
                if (e.templateIsDecorated_)
                    return !1;
                var o = e;
                o.templateIsDecorated_ = !0;
                var u = n(o) && h
                  , d = u
                  , p = !u
                  , f = !1;
                if (u || t(o) && (o = i(e),
                o.templateIsDecorated_ = !0,
                u = h),
                !u) {
                    c(o);
                    var m = a(o);
                    o.content_ = m.createDocumentFragment()
                }
                return r ? o.instanceRef_ = r : p ? l(o, e, f) : d && s(o.content),
                !0
            }
            ;
            var f = e.HTMLUnknownElement || HTMLElement
              , m = {
                get: function() {
                    return this.content_
                },
                enumerable: !0,
                configurable: !0
            };
            h || (HTMLTemplateElement.prototype = Object.create(f.prototype),
            Object.defineProperty(HTMLTemplateElement.prototype, "content", m)),
            HTMLTemplateElement.bootstrap = s
        }(window)
    }
    .call(System.global),
    System.get("@@global-helpers").retrieveGlobal(n.id, !1)
}),
System.register("github:aurelia/html-template-element@0.2.0", ["github:aurelia/html-template-element@0.2.0/HTMLTemplateElement.min"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("github:aurelia/html-template-element@0.2.0/HTMLTemplateElement.min"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.fw", [], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = function(e) {
        return e.FW = !0,
        e.path = e.g,
        e
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.dom-create", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = i.g.document
      , s = i.isObject
      , a = s(o) && s(o.createElement);
    return t.exports = function(e) {
        return a ? o.createElement(e) : {}
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.shared", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = "__core-js_shared__"
      , s = i.g[o] || (i.g[o] = {});
    return t.exports = function(e) {
        return s[e] || (s[e] = {})
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.uid", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    function n(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++o + Math.random()).toString(36))
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = 0;
    return n.safe = require("npm:core-js@0.9.18/modules/$").g.Symbol || n,
    t.exports = n,
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.redef", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid"], !0, function(require, e, t) {
    function n(e, t, n, r) {
        if (o.isFunction(n)) {
            var i = e[t];
            o.hide(n, a, i ? String(i) : s.replace(/hasOwnProperty/, String(t))),
            "name" in n || (n.name = t)
        }
        e === o.g ? e[t] = n : (r || delete e[t],
        o.hide(e, t, n))
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = String({}.hasOwnProperty)
      , a = require("npm:core-js@0.9.18/modules/$.uid").safe("src")
      , l = Function.toString;
    return n(Function.prototype, "toString", function() {
        return o.has(this, a) ? this[a] : l.call(this)
    }),
    o.core.inspectSource = function(e) {
        return l.call(e)
    }
    ,
    t.exports = n,
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.invoke", [], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = function(e, t, n) {
        var r = void 0 === n;
        switch (t.length) {
        case 0:
            return r ? e() : e.call(n);
        case 1:
            return r ? e(t[0]) : e.call(n, t[0]);
        case 2:
            return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
        case 3:
            return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
        case 4:
            return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
        case 5:
            return r ? e(t[0], t[1], t[2], t[3], t[4]) : e.call(n, t[0], t[1], t[2], t[3], t[4])
        }
        return e.apply(n, t)
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.assert", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    function n(e, t, n) {
        if (!e)
            throw TypeError(n ? t + n : t)
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$");
    return n.def = o.assertDefined,
    n.fn = function(e) {
        if (!o.isFunction(e))
            throw TypeError(e + " is not a function!");
        return e
    }
    ,
    n.obj = function(e) {
        if (!o.isObject(e))
            throw TypeError(e + " is not an object!");
        return e
    }
    ,
    n.inst = function(e, t, n) {
        if (!(e instanceof t))
            throw TypeError(n + ": use the 'new' operator!");
        return e
    }
    ,
    t.exports = n,
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.array-includes", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$");
    return t.exports = function(e) {
        return function(t, n, r) {
            var o, s = i.toObject(t), a = i.toLength(s.length), l = i.toIndex(r, a);
            if (e && n != n) {
                for (; a > l; )
                    if (o = s[l++],
                    o != o)
                        return !0
            } else
                for (; a > l; l++)
                    if ((e || l in s) && s[l] === n)
                        return e || l;
            return !e && -1
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.replacer", [], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = function(e, t, n) {
        var r = t === Object(t) ? function(e) {
            return t[e]
        }
         : t;
        return function(t) {
            return String(n ? t : this).replace(e, r)
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.throws", [], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = function(e) {
        try {
            return e(),
            !1
        } catch (t) {
            return !0
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.keyof", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$");
    return t.exports = function(e, t) {
        for (var n, r = i.toObject(e), o = i.getKeys(r), s = o.length, a = 0; s > a; )
            if (r[n = o[a++]] === t)
                return n
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.enum-keys", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$");
    return t.exports = function(e) {
        var t = i.getKeys(e)
          , n = i.getDesc
          , r = i.getSymbols;
        return r && i.each.call(r(e), function(r) {
            n(e, r).enumerable && t.push(r)
        }),
        t
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.get-names", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    function n(e) {
        try {
            return a(e)
        } catch (t) {
            return l.slice()
        }
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = {}.toString
      , a = o.getNames
      , l = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    return t.exports.get = function(e) {
        return l && "[object Window]" == s.call(e) ? n(e) : a(o.toObject(e))
    }
    ,
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.assign", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.enum-keys"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.enum-keys");
    return t.exports = Object.assign || function(e, t) {
        for (var n = Object(i.assertDefined(e)), r = arguments.length, s = 1; r > s; )
            for (var a, l = i.ES5Object(arguments[s++]), u = o(l), c = u.length, d = 0; c > d; )
                n[a = u[d++]] = l[a];
        return n
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.same", [], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = Object.is || function(e, t) {
        return e === t ? 0 !== e || 1 / e === 1 / t : e != e && t != t
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.set-proto", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.ctx"], !0, function(require, e, t) {
    function n(e, t) {
        s.obj(e),
        s(null  === t || o.isObject(t), t, ": can't set as prototype!")
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.assert");
    return t.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t) {
            try {
                t = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, o.getDesc(Object.prototype, "__proto__").set, 2),
                t({}, [])
            } catch (r) {
                e = !0
            }
            return function(r, i) {
                return n(r, i),
                e ? r.__proto__ = i : t(r, i),
                r
            }
        }() : void 0),
        check: n
    },
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.object.to-string", ["npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.cof")
      , o = {};
    return o[require("npm:core-js@0.9.18/modules/$.wks")("toStringTag")] = "z",
    require("npm:core-js@0.9.18/modules/$").FW && "z" != i(o) && require("npm:core-js@0.9.18/modules/$.redef")(Object.prototype, "toString", function() {
        return "[object " + i.classof(this) + "]"
    }, !0),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.get-names"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = i.isObject
      , a = i.toObject;
    return i.each.call("freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames".split(","), function(e, t) {
        var n = (i.core.Object || {})[e] || Object[e]
          , r = 0
          , l = {};
        l[e] = 0 == t ? function(e) {
            return s(e) ? n(e) : e
        }
         : 1 == t ? function(e) {
            return s(e) ? n(e) : e
        }
         : 2 == t ? function(e) {
            return s(e) ? n(e) : e
        }
         : 3 == t ? function(e) {
            return s(e) ? n(e) : !0
        }
         : 4 == t ? function(e) {
            return s(e) ? n(e) : !0
        }
         : 5 == t ? function(e) {
            return s(e) ? n(e) : !1
        }
         : 6 == t ? function(e, t) {
            return n(a(e), t)
        }
         : 7 == t ? function(e) {
            return n(Object(i.assertDefined(e)))
        }
         : 8 == t ? function(e) {
            return n(a(e))
        }
         : require("npm:core-js@0.9.18/modules/$.get-names").get;
        try {
            n("z")
        } catch (u) {
            r = 1
        }
        o(o.S + o.F * r, "Object", l)
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.function.name", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = "name"
      , s = i.setDesc
      , a = Function.prototype;
    return o in a || i.FW && i.DESC && s(a, o, {
        configurable: !0,
        get: function() {
            var e = String(this).match(/^\s*function ([^ (]*)/)
              , t = e ? e[1] : "";
            return i.has(this, o) || s(this, o, i.desc(5, t)),
            t
        },
        set: function(e) {
            i.has(this, o) || s(this, o, i.desc(0, e))
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.function.has-instance", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.wks")("hasInstance")
      , s = Function.prototype;
    return o in s || i.setDesc(s, o, {
        value: function(e) {
            if (!i.isFunction(this) || !i.isObject(e))
                return !1;
            if (!i.isObject(this.prototype))
                return e instanceof this;
            for (; e = i.getProto(e); )
                if (this.prototype === e)
                    return !0;
            return !1
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.number.constructor", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], !0, function(require, e, t) {
    function n(e) {
        var t, n;
        if (l(t = e.valueOf) && !a(n = t.call(e)))
            return n;
        if (l(t = e.toString) && !a(n = t.call(e)))
            return n;
        throw TypeError("Can't convert object to number")
    }
    function r(e) {
        if (a(e) && (e = n(e)),
        "string" == typeof e && e.length > 2 && 48 == e.charCodeAt(0)) {
            var t = !1;
            switch (e.charCodeAt(1)) {
            case 66:
            case 98:
                t = !0;
            case 79:
            case 111:
                return parseInt(e.slice(2), t ? 2 : 8)
            }
        }
        return +e
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$")
      , a = s.isObject
      , l = s.isFunction
      , u = "Number"
      , c = s.g[u]
      , d = c
      , h = c.prototype;
    return !s.FW || c("0o1") && c("0b1") || (c = function(e) {
        return this instanceof c ? new d(r(e)) : r(e)
    }
    ,
    s.each.call(s.DESC ? s.getNames(d) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), function(e) {
        s.has(d, e) && !s.has(c, e) && s.setDesc(c, e, s.getDesc(d, e))
    }),
    c.prototype = h,
    h.constructor = c,
    require("npm:core-js@0.9.18/modules/$.redef")(s.g, u, c)),
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.number.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    function n(e) {
        return !o.isObject(e) && u(e) && l(e) === e
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = Math.abs
      , l = Math.floor
      , u = o.g.isFinite
      , c = 9007199254740991;
    return s(s.S, "Number", {
        EPSILON: Math.pow(2, -52),
        isFinite: function(e) {
            return "number" == typeof e && u(e)
        },
        isInteger: n,
        isNaN: function(e) {
            return e != e
        },
        isSafeInteger: function(e) {
            return n(e) && a(e) <= c
        },
        MAX_SAFE_INTEGER: c,
        MIN_SAFE_INTEGER: -c,
        parseFloat: parseFloat,
        parseInt: parseInt
    }),
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.math", ["npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    function n(e) {
        return e + 1 / y - 1 / y
    }
    function r(e) {
        return 0 == (e = +e) || e != e ? e : 0 > e ? -1 : 1
    }
    function i(e) {
        return isFinite(e = +e) && 0 != e ? 0 > e ? -i(-e) : f(e + m(e * e + 1)) : e
    }
    function o(e) {
        return 0 == (e = +e) ? e : e > -1e-6 && 1e-6 > e ? e + e * e / 2 : p(e) - 1
    }
    var s = System.global
      , a = s.define;
    s.define = void 0;
    var l = 1 / 0
      , u = require("npm:core-js@0.9.18/modules/$.def")
      , c = Math.E
      , d = Math.pow
      , h = Math.abs
      , p = Math.exp
      , f = Math.log
      , m = Math.sqrt
      , g = Math.ceil
      , v = Math.floor
      , y = d(2, -52)
      , b = d(2, -23)
      , w = d(2, 127) * (2 - b)
      , x = d(2, -126);
    return u(u.S, "Math", {
        acosh: function(e) {
            return (e = +e) < 1 ? NaN : isFinite(e) ? f(e / c + m(e + 1) * m(e - 1) / c) + 1 : e
        },
        asinh: i,
        atanh: function(e) {
            return 0 == (e = +e) ? e : f((1 + e) / (1 - e)) / 2
        },
        cbrt: function(e) {
            return r(e = +e) * d(h(e), 1 / 3)
        },
        clz32: function(e) {
            return (e >>>= 0) ? 31 - v(f(e + .5) * Math.LOG2E) : 32
        },
        cosh: function(e) {
            return (p(e = +e) + p(-e)) / 2
        },
        expm1: o,
        fround: function(e) {
            var t, i, o = h(e), s = r(e);
            return x > o ? s * n(o / x / b) * x * b : (t = (1 + b / y) * o,
            i = t - (t - o),
            i > w || i != i ? s * l : s * i)
        },
        hypot: function(e, t) {
            for (var n, r, i = 0, o = 0, s = arguments.length, a = 0; s > o; )
                n = h(arguments[o++]),
                n > a ? (r = a / n,
                i = i * r * r + 1,
                a = n) : n > 0 ? (r = n / a,
                i += r * r) : i += n;
            return a === l ? l : a * m(i)
        },
        imul: function(e, t) {
            var n = 65535
              , r = +e
              , i = +t
              , o = n & r
              , s = n & i;
            return 0 | o * s + ((n & r >>> 16) * s + o * (n & i >>> 16) << 16 >>> 0)
        },
        log1p: function(e) {
            return (e = +e) > -1e-8 && 1e-8 > e ? e - e * e / 2 : f(1 + e)
        },
        log10: function(e) {
            return f(e) / Math.LN10
        },
        log2: function(e) {
            return f(e) / Math.LN2
        },
        sign: r,
        sinh: function(e) {
            return h(e = +e) < 1 ? (o(e) - o(-e)) / 2 : (p(e - 1) - p(-e - 1)) * (c / 2)
        },
        tanh: function(e) {
            var t = o(e = +e)
              , n = o(-e);
            return t == l ? 1 : n == l ? -1 : (t - n) / (p(e) + p(-e))
        },
        trunc: function(e) {
            return (e > 0 ? v : g)(e)
        }
    }),
    s.define = a,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.from-code-point", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$").toIndex
      , s = String.fromCharCode
      , a = String.fromCodePoint;
    return i(i.S + i.F * (!!a && 1 != a.length), "String", {
        fromCodePoint: function(e) {
            for (var t, n = [], r = arguments.length, i = 0; r > i; ) {
                if (t = +arguments[i++],
                o(t, 1114111) !== t)
                    throw RangeError(t + " is not a valid code point");
                n.push(65536 > t ? s(t) : s(((t -= 65536) >> 10) + 55296, t % 1024 + 56320))
            }
            return n.join("")
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.raw", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def");
    return o(o.S, "String", {
        raw: function(e) {
            for (var t = i.toObject(e.raw), n = i.toLength(t.length), r = arguments.length, o = [], s = 0; n > s; )
                o.push(String(t[s++])),
                r > s && o.push(String(arguments[s]));
            return o.join("")
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.string-at", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$");
    return t.exports = function(e) {
        return function(t, n) {
            var r, o, s = String(i.assertDefined(t)), a = i.toInteger(n), l = s.length;
            return 0 > a || a >= l ? e ? "" : void 0 : (r = s.charCodeAt(a),
            55296 > r || r > 56319 || a + 1 === l || (o = s.charCodeAt(a + 1)) < 56320 || o > 57343 ? e ? s.charAt(a) : r : e ? s.slice(a, a + 2) : (r - 55296 << 10) + (o - 56320) + 65536)
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.iter", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.shared"], !0, function(require, e, t) {
    function n(e, t) {
        o.hide(e, c, t),
        d in [] && o.hide(e, d, t)
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.cof")
      , a = s.classof
      , l = require("npm:core-js@0.9.18/modules/$.assert")
      , u = l.obj
      , c = require("npm:core-js@0.9.18/modules/$.wks")("iterator")
      , d = "@@iterator"
      , h = require("npm:core-js@0.9.18/modules/$.shared")("iterators")
      , p = {};
    return n(p, o.that),
    t.exports = {
        BUGGY: "keys" in [] && !("next" in [].keys()),
        Iterators: h,
        step: function(e, t) {
            return {
                value: t,
                done: !!e
            }
        },
        is: function(e) {
            var t = Object(e)
              , n = o.g.Symbol;
            return (n && n.iterator || d) in t || c in t || o.has(h, a(t))
        },
        get: function(e) {
            var t, n = o.g.Symbol;
            return void 0 != e && (t = e[n && n.iterator || d] || e[c] || h[a(e)]),
            l(o.isFunction(t), e, " is not iterable!"),
            u(t.call(e))
        },
        set: n,
        create: function(e, t, n, r) {
            e.prototype = o.create(r || p, {
                next: o.desc(1, n)
            }),
            s.set(e, t + " Iterator")
        }
    },
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.iter-define", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.redef")
      , s = require("npm:core-js@0.9.18/modules/$")
      , a = require("npm:core-js@0.9.18/modules/$.cof")
      , l = require("npm:core-js@0.9.18/modules/$.iter")
      , u = require("npm:core-js@0.9.18/modules/$.wks")("iterator")
      , c = "@@iterator"
      , d = "keys"
      , h = "values"
      , p = l.Iterators;
    return t.exports = function(e, t, n, r, f, m, g) {
        function v(e) {
            function t(t) {
                return new n(t,e)
            }
            switch (e) {
            case d:
                return function() {
                    return t(this)
                }
                ;
            case h:
                return function() {
                    return t(this)
                }
            }
            return function() {
                return t(this)
            }
        }
        l.create(n, t, r);
        var y, b, w = t + " Iterator", x = e.prototype, k = x[u] || x[c] || f && x[f], j = k || v(f);
        if (k) {
            var S = s.getProto(j.call(new e));
            a.set(S, w, !0),
            s.FW && s.has(x, c) && l.set(S, s.that)
        }
        if ((s.FW || g) && l.set(x, j),
        p[t] = j,
        p[w] = s.that,
        f)
            if (y = {
                keys: m ? j : v(d),
                values: f == h ? j : v(h),
                entries: f != h ? j : v("entries")
            },
            g)
                for (b in y)
                    b in x || o(x, b, y[b]);
            else
                i(i.P + i.F * l.BUGGY, t, y)
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.code-point-at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.string-at")(!1);
    return i(i.P, "String", {
        codePointAt: function(e) {
            return o(this, e)
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.ends-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.cof")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = i.toLength;
    return s(s.P + s.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
        "q".endsWith(/./)
    }), "String", {
        endsWith: function(e) {
            if ("RegExp" == o(e))
                throw TypeError();
            var t = String(i.assertDefined(this))
              , n = arguments[1]
              , r = a(t.length)
              , s = void 0 === n ? r : Math.min(a(n), r);
            return e += "",
            t.slice(s - e.length, s) === e
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.includes", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.cof")
      , s = require("npm:core-js@0.9.18/modules/$.def");
    return s(s.P, "String", {
        includes: function(e) {
            if ("RegExp" == o(e))
                throw TypeError();
            return !!~String(i.assertDefined(this)).indexOf(e, arguments[1])
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.string-repeat", ["npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$");
    return t.exports = function(e) {
        var t = String(i.assertDefined(this))
          , n = ""
          , r = i.toInteger(e);
        if (0 > r || r == 1 / 0)
            throw RangeError("Count can't be negative");
        for (; r > 0; (r >>>= 1) && (t += t))
            1 & r && (n += t);
        return n
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.starts-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.cof")
      , s = require("npm:core-js@0.9.18/modules/$.def");
    return s(s.P + s.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
        "q".startsWith(/./)
    }), "String", {
        startsWith: function(e) {
            if ("RegExp" == o(e))
                throw TypeError();
            var t = String(i.assertDefined(this))
              , n = i.toLength(Math.min(arguments[1], t.length));
            return e += "",
            t.slice(n, n + e.length) === e
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.iter-call", ["npm:core-js@0.9.18/modules/$.assert"], !0, function(require, e, t) {
    function n(e) {
        var t = e["return"];
        void 0 !== t && s(t.call(e))
    }
    function r(e, t, r, i) {
        try {
            return i ? t(s(r)[0], r[1]) : t(r)
        } catch (o) {
            throw n(e),
            o
        }
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$.assert").obj;
    return r.close = n,
    t.exports = r,
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.iter-detect", ["npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.wks")("iterator")
      , o = !1;
    try {
        var s = [7][i]();
        s["return"] = function() {
            o = !0
        }
        ,
        Array.from(s, function() {
            throw 2
        })
    } catch (a) {}
    return t.exports = function(e) {
        if (!o)
            return !1;
        var t = !1;
        try {
            var n = [7]
              , r = n[i]();
            r.next = function() {
                t = !0
            }
            ,
            n[i] = function() {
                return r
            }
            ,
            e(n)
        } catch (s) {}
        return t
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.of", ["npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.S, "Array", {
        of: function() {
            for (var e = 0, t = arguments.length, n = new ("function" == typeof this ? this : Array)(t); t > e; )
                n[e] = arguments[e++];
            return n.length = t,
            n
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.unscope", ["npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.wks")("unscopables");
    return i in [] || require("npm:core-js@0.9.18/modules/$").hide(Array.prototype, i, {}),
    t.exports = function(e) {
        [][i][e] = !0
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.species", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.wks")("species");
    return t.exports = function(e) {
        !i.DESC || o in e || i.setDesc(e, o, {
            configurable: !0,
            get: i.that
        })
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.copy-within", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = i.toIndex;
    return o(o.P, "Array", {
        copyWithin: function(e, t) {
            var n = Object(i.assertDefined(this))
              , r = i.toLength(n.length)
              , o = s(e, r)
              , a = s(t, r)
              , l = arguments[2]
              , u = void 0 === l ? r : s(l, r)
              , c = Math.min(u - a, r - o)
              , d = 1;
            for (o > a && a + c > o && (d = -1,
            a = a + c - 1,
            o = o + c - 1); c-- > 0; )
                a in n ? n[o] = n[a] : delete n[o],
                o += d,
                a += d;
            return n
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")("copyWithin"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.fill", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = i.toIndex;
    return o(o.P, "Array", {
        fill: function(e) {
            for (var t = Object(i.assertDefined(this)), n = i.toLength(t.length), r = s(arguments[1], n), o = arguments[2], a = void 0 === o ? n : s(o, n); a > r; )
                t[r++] = e;
            return t
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")("fill"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.find", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = "find"
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = !0
      , a = require("npm:core-js@0.9.18/modules/$.array-methods")(5);
    return i in [] && Array(1)[i](function() {
        s = !1
    }),
    o(o.P + o.F * s, "Array", {
        find: function(e) {
            return a(this, e, arguments[1])
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")(i),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.find-index", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = "findIndex"
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = !0
      , a = require("npm:core-js@0.9.18/modules/$.array-methods")(6);
    return i in [] && Array(1)[i](function() {
        s = !1
    }),
    o(o.P + o.F * s, "Array", {
        findIndex: function(e) {
            return a(this, e, arguments[1])
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")(i),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.regexp", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.species"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.cof")
      , s = i.g.RegExp
      , a = s
      , l = s.prototype
      , u = /a/g
      , c = new s(u) !== u
      , d = function() {
        try {
            return "/a/i" == s(u, "i")
        } catch (e) {}
    }();
    return i.FW && i.DESC && (c && d || (s = function(e, t) {
        var n = "RegExp" == o(e)
          , r = void 0 === t;
        return this instanceof s || !n || !r ? c ? new a(n && !r ? e.source : e,t) : new a(n ? e.source : e,n && r ? e.flags : t) : e
    }
    ,
    i.each.call(i.getNames(a), function(e) {
        e in s || i.setDesc(s, e, {
            configurable: !0,
            get: function() {
                return a[e]
            },
            set: function(t) {
                a[e] = t
            }
        })
    }),
    l.constructor = s,
    s.prototype = l,
    require("npm:core-js@0.9.18/modules/$.redef")(i.g, "RegExp", s)),
    "g" != /./g.flags && i.setDesc(l, "flags", {
        configurable: !0,
        get: require("npm:core-js@0.9.18/modules/$.replacer")(/^.*\/(\w*)$/, "$1")
    })),
    require("npm:core-js@0.9.18/modules/$.species")(s),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.for-of", ["npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.ctx")
      , o = require("npm:core-js@0.9.18/modules/$.iter").get
      , s = require("npm:core-js@0.9.18/modules/$.iter-call");
    return t.exports = function(e, t, n, r) {
        for (var a, l = o(e), u = i(n, r, t ? 2 : 1); !(a = l.next()).done; )
            if (s(l, u, a.value, t) === !1)
                return s.close(l)
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.mix", ["npm:core-js@0.9.18/modules/$.redef"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.redef");
    return t.exports = function(e, t) {
        for (var n in t)
            i(e, n, t[n]);
        return e
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.collection-strong", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-define"], !0, function(require, e, t) {
    function n(e, t) {
        if (!f(e))
            return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
        if (!h(e, v)) {
            if (!g(e))
                return "F";
            if (!t)
                return "E";
            m(e, v, ++j)
        }
        return "O" + e[v]
    }
    function r(e, t) {
        var r, i = n(t);
        if ("F" !== i)
            return e[y][i];
        for (r = e[w]; r; r = r.n)
            if (r.k == t)
                return r
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$")
      , a = require("npm:core-js@0.9.18/modules/$.ctx")
      , l = require("npm:core-js@0.9.18/modules/$.uid").safe
      , u = require("npm:core-js@0.9.18/modules/$.assert")
      , c = require("npm:core-js@0.9.18/modules/$.for-of")
      , d = require("npm:core-js@0.9.18/modules/$.iter").step
      , h = s.has
      , p = s.set
      , f = s.isObject
      , m = s.hide
      , g = Object.isExtensible || f
      , v = l("id")
      , y = l("O1")
      , b = l("last")
      , w = l("first")
      , x = l("iter")
      , k = s.DESC ? l("size") : "size"
      , j = 0;
    return t.exports = {
        getConstructor: function(e, t, n, i) {
            var o = e(function(e, r) {
                u.inst(e, o, t),
                p(e, y, s.create(null )),
                p(e, k, 0),
                p(e, b, void 0),
                p(e, w, void 0),
                void 0 != r && c(r, n, e[i], e)
            });
            return require("npm:core-js@0.9.18/modules/$.mix")(o.prototype, {
                clear: function() {
                    for (var e = this, t = e[y], n = e[w]; n; n = n.n)
                        n.r = !0,
                        n.p && (n.p = n.p.n = void 0),
                        delete t[n.i];
                    e[w] = e[b] = void 0,
                    e[k] = 0
                },
                "delete": function(e) {
                    var t = this
                      , n = r(t, e);
                    if (n) {
                        var i = n.n
                          , o = n.p;
                        delete t[y][n.i],
                        n.r = !0,
                        o && (o.n = i),
                        i && (i.p = o),
                        t[w] == n && (t[w] = i),
                        t[b] == n && (t[b] = o),
                        t[k]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    for (var t, n = a(e, arguments[1], 3); t = t ? t.n : this[w]; )
                        for (n(t.v, t.k, this); t && t.r; )
                            t = t.p
                },
                has: function(e) {
                    return !!r(this, e)
                }
            }),
            s.DESC && s.setDesc(o.prototype, "size", {
                get: function() {
                    return u.def(this[k])
                }
            }),
            o
        },
        def: function(e, t, i) {
            var o, s, a = r(e, t);
            return a ? a.v = i : (e[b] = a = {
                i: s = n(t, !0),
                k: t,
                v: i,
                p: o = e[b],
                n: void 0,
                r: !1
            },
            e[w] || (e[w] = a),
            o && (o.n = a),
            e[k]++,
            "F" !== s && (e[y][s] = a)),
            e
        },
        getEntry: r,
        setIter: function(e, t, n) {
            require("npm:core-js@0.9.18/modules/$.iter-define")(e, t, function(e, t) {
                p(this, x, {
                    o: e,
                    k: t
                })
            }, function() {
                for (var e = this[x], t = e.k, n = e.l; n && n.r; )
                    n = n.p;
                return e.o && (e.l = n = n ? n.n : e.o[w]) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [n.k, n.v]) : (e.o = void 0,
                d(1))
            }, n ? "entries" : "values", !n, !0)
        }
    },
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.collection", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "npm:core-js@0.9.18/modules/$.cof"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = require("npm:core-js@0.9.18/modules/$.iter").BUGGY
      , a = require("npm:core-js@0.9.18/modules/$.for-of")
      , l = require("npm:core-js@0.9.18/modules/$.species")
      , u = require("npm:core-js@0.9.18/modules/$.assert").inst;
    return t.exports = function(e, t, n, r, c, d) {
        function h(e) {
            var t = g[e];
            require("npm:core-js@0.9.18/modules/$.redef")(g, e, "delete" == e ? function(e) {
                return t.call(this, 0 === e ? 0 : e)
            }
             : "has" == e ? function(e) {
                return t.call(this, 0 === e ? 0 : e)
            }
             : "get" == e ? function(e) {
                return t.call(this, 0 === e ? 0 : e)
            }
             : "add" == e ? function(e) {
                return t.call(this, 0 === e ? 0 : e),
                this
            }
             : function(e, n) {
                return t.call(this, 0 === e ? 0 : e, n),
                this
            }
            )
        }
        var p = i.g[e]
          , f = p
          , m = c ? "set" : "add"
          , g = f && f.prototype
          , v = {};
        if (i.isFunction(f) && (d || !s && g.forEach && g.entries)) {
            var y, b = new f, w = b[m](d ? {} : -0, 1);
            require("npm:core-js@0.9.18/modules/$.iter-detect")(function(e) {
                new f(e)
            }) || (f = t(function(t, n) {
                u(t, f, e);
                var r = new p;
                return void 0 != n && a(n, c, r[m], r),
                r
            }),
            f.prototype = g,
            g.constructor = f),
            d || b.forEach(function(e, t) {
                y = 1 / t === -(1 / 0)
            }),
            y && (h("delete"),
            h("has"),
            c && h("get")),
            (y || w !== b) && h(m)
        } else
            f = r.getConstructor(t, e, c, m),
            require("npm:core-js@0.9.18/modules/$.mix")(f.prototype, n);
        return require("npm:core-js@0.9.18/modules/$.cof").set(f, e),
        v[e] = f,
        o(o.G + o.W + o.F * (f != p), v),
        l(f),
        l(i.core[e]),
        d || r.setIter(f, e, c),
        f
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.set", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.collection-strong");
    return require("npm:core-js@0.9.18/modules/$.collection")("Set", function(e) {
        return function() {
            return e(this, arguments[0])
        }
    }, {
        add: function(e) {
            return i.def(this, e = 0 === e ? 0 : e, e)
        }
    }, i),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.collection-weak", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.mix"], !0, function(require, e, t) {
    function n(e, t) {
        return b(e.array, function(e) {
            return e[0] === t
        })
    }
    function r(e) {
        return e[v] || h(e, v, {
            array: [],
            get: function(e) {
                var t = n(this, e);
                return t ? t[1] : void 0
            },
            has: function(e) {
                return !!n(this, e)
            },
            set: function(e, t) {
                var r = n(this, e);
                r ? r[1] = t : this.array.push([e, t])
            },
            "delete": function(e) {
                var t = w(this.array, function(t) {
                    return t[0] === e
                });
                return ~t && this.array.splice(t, 1),
                !!~t
            }
        })[v]
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$")
      , a = require("npm:core-js@0.9.18/modules/$.uid").safe
      , l = require("npm:core-js@0.9.18/modules/$.assert")
      , u = require("npm:core-js@0.9.18/modules/$.for-of")
      , c = s.has
      , d = s.isObject
      , h = s.hide
      , p = Object.isExtensible || d
      , f = 0
      , m = a("id")
      , g = a("weak")
      , v = a("leak")
      , y = require("npm:core-js@0.9.18/modules/$.array-methods")
      , b = y(5)
      , w = y(6);
    return t.exports = {
        getConstructor: function(e, t, n, i) {
            var o = e(function(e, r) {
                s.set(l.inst(e, o, t), m, f++),
                void 0 != r && u(r, n, e[i], e)
            });
            return require("npm:core-js@0.9.18/modules/$.mix")(o.prototype, {
                "delete": function(e) {
                    return d(e) ? p(e) ? c(e, g) && c(e[g], this[m]) && delete e[g][this[m]] : r(this)["delete"](e) : !1
                },
                has: function(e) {
                    return d(e) ? p(e) ? c(e, g) && c(e[g], this[m]) : r(this).has(e) : !1
                }
            }),
            o
        },
        def: function(e, t, n) {
            return p(l.obj(t)) ? (c(t, g) || h(t, g, {}),
            t[g][e[m]] = n) : r(e).set(t, n),
            e
        },
        leakStore: r,
        WEAK: g,
        ID: m
    },
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.weak-set", ["npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.collection-weak");
    return require("npm:core-js@0.9.18/modules/$.collection")("WeakSet", function(e) {
        return function() {
            return e(this, arguments[0])
        }
    }, {
        add: function(e) {
            return i.def(this, e, !0)
        }
    }, i, !1, !0),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.own-keys", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.assert").obj;
    return t.exports = function(e) {
        o(e);
        var t = i.getNames(e)
          , n = i.getSymbols;
        return n ? t.concat(n(e)) : t
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.array.includes", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.array-includes")(!0);
    return i(i.P, "Array", {
        includes: function(e) {
            return o(this, e, arguments[1])
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")("includes"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.string.at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.string-at")(!0);
    return i(i.P, "String", {
        at: function(e) {
            return o(this, e)
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.string-pad", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-repeat"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.string-repeat");
    return t.exports = function(e, t, n, r) {
        var s = String(i.assertDefined(e));
        if (void 0 === t)
            return s;
        var a = i.toInteger(t)
          , l = a - s.length;
        if (0 > l || l === 1 / 0)
            throw new RangeError("Cannot satisfy string length " + t + " for string: " + s);
        var u = void 0 === n ? " " : String(n)
          , c = o.call(u, Math.ceil(l / u.length));
        return c.length > l && (c = r ? c.slice(c.length - l) : c.slice(0, l)),
        r ? c.concat(s) : s.concat(c)
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.string.rpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.string-pad");
    return i(i.P, "String", {
        rpad: function(e) {
            return o(this, e, arguments[1], !1)
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.regexp.escape", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.S, "RegExp", {
        escape: require("npm:core-js@0.9.18/modules/$.replacer")(/[\\^$*+?.()|[\]{}]/g, "\\$&", !0)
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = require("npm:core-js@0.9.18/modules/$.own-keys");
    return o(o.S, "Object", {
        getOwnPropertyDescriptors: function(e) {
            var t = i.toObject(e)
              , n = {};
            return i.each.call(s(t), function(e) {
                i.setDesc(n, e, i.desc(0, i.getDesc(t, e)))
            }),
            n
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.object.to-array", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    function n(e) {
        return function(t) {
            var n, r = o.toObject(t), i = o.getKeys(r), s = i.length, a = 0, l = Array(s);
            if (e)
                for (; s > a; )
                    l[a] = [n = i[a++], r[n]];
            else
                for (; s > a; )
                    l[a] = r[i[a++]];
            return l
        }
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def");
    return s(s.S, "Object", {
        values: n(!1),
        entries: n(!0)
    }),
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.collection-to-json", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.for-of"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.for-of");
    return t.exports = function(e) {
        i(i.P, e, {
            toJSON: function() {
                var e = [];
                return o(this, !1, e.push, e),
                e
            }
        })
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.set.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    require("npm:core-js@0.9.18/modules/$.collection-to-json")("Set"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/js.array.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.ctx"], !0, function(require, e, t) {
    function n(e, t) {
        o.each.call(e.split(","), function(e) {
            void 0 == t && e in a ? l[e] = a[e] : e in [] && (l[e] = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, [][e], t))
        })
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = o.core.Array || Array
      , l = {};
    return n("pop,reverse,shift,keys,values,entries", 1),
    n("indexOf,every,some,forEach,map,filter,find,findIndex,includes", 3),
    n("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill,turn"),
    s(s.S, "Array", l),
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.partial", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.assert"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.invoke")
      , s = require("npm:core-js@0.9.18/modules/$.assert").fn;
    return t.exports = function() {
        for (var e = s(this), t = arguments.length, n = Array(t), r = 0, a = i.path._, l = !1; t > r; )
            (n[r] = arguments[r++]) === a && (l = !0);
        return function() {
            var r, i = this, s = arguments.length, u = 0, c = 0;
            if (!l && !s)
                return o(e, n, i);
            if (r = n.slice(),
            l)
                for (; t > u; u++)
                    r[u] === a && (r[u] = arguments[c++]);
            for (; s > c; )
                r.push(arguments[c++]);
            return o(e, r, i)
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/web.immediate", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.task"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.task");
    return i(i.G + i.B, {
        setImmediate: o.set,
        clearImmediate: o.clear
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/web.dom.iterable", ["npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0,
    require("npm:core-js@0.9.18/modules/es6.array.iterator");
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.iter").Iterators
      , s = require("npm:core-js@0.9.18/modules/$.wks")("iterator")
      , a = o.Array
      , l = i.g.NodeList
      , u = i.g.HTMLCollection
      , c = l && l.prototype
      , d = u && u.prototype;
    return i.FW && (!l || s in c || i.hide(c, s, a),
    !u || s in d || i.hide(d, s, a)),
    o.NodeList = o.HTMLCollection = a,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.dict", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of"], !0, function(require, e, t) {
    function n(e) {
        var t = c.create(null );
        return void 0 != e && (v.is(e) ? y(e, !0, function(e, n) {
            t[e] = n
        }) : p(t, e)),
        t
    }
    function r(e, t) {
        c.set(this, m, {
            o: x(e),
            a: w(e),
            i: 0,
            k: t
        })
    }
    function i(e) {
        return function(t) {
            return new r(t,e)
        }
    }
    function o(e, t) {
        return "function" == typeof e ? e : t
    }
    function s(e) {
        var t = 1 == e
          , r = 4 == e;
        return function(i, s, a) {
            var l, u, c, h = d(s, a, 3), p = x(i), f = t || 7 == e || 2 == e ? new (o(this, n)) : void 0;
            for (l in p)
                if (k(p, l) && (u = p[l],
                c = h(u, l, i),
                e))
                    if (t)
                        f[l] = c;
                    else if (c)
                        switch (e) {
                        case 2:
                            f[l] = u;
                            break;
                        case 3:
                            return !0;
                        case 5:
                            return u;
                        case 6:
                            return l;
                        case 7:
                            f[c[0]] = c[1]
                        }
                    else if (r)
                        return !1;
            return 3 == e || r ? r : f
        }
    }
    function a(e) {
        return function(t, r, i) {
            g.fn(r);
            var s, a, l, u = x(t), c = w(u), d = c.length, h = 0;
            for (e ? s = void 0 == i ? new (o(this, n)) : Object(i) : arguments.length < 3 ? (g(d, "Reduce of empty object with no initial value"),
            s = u[c[h++]]) : s = Object(i); d > h; )
                if (k(u, a = c[h++]))
                    if (l = r(s, u[a], a, t),
                    e) {
                        if (l === !1)
                            break
                    } else
                        s = l;
            return s
        }
    }
    var l = System.global
      , u = l.define;
    l.define = void 0;
    var c = require("npm:core-js@0.9.18/modules/$")
      , d = require("npm:core-js@0.9.18/modules/$.ctx")
      , h = require("npm:core-js@0.9.18/modules/$.def")
      , p = require("npm:core-js@0.9.18/modules/$.assign")
      , f = require("npm:core-js@0.9.18/modules/$.keyof")
      , m = require("npm:core-js@0.9.18/modules/$.uid").safe("iter")
      , g = require("npm:core-js@0.9.18/modules/$.assert")
      , v = require("npm:core-js@0.9.18/modules/$.iter")
      , y = require("npm:core-js@0.9.18/modules/$.for-of")
      , b = v.step
      , w = c.getKeys
      , x = c.toObject
      , k = c.has;
    n.prototype = null ,
    v.create(r, "Dict", function() {
        var e, t = this[m], n = t.o, r = t.a, i = t.k;
        do
            if (t.i >= r.length)
                return t.o = void 0,
                b(1);
        while (!k(n, e = r[t.i++]));return "keys" == i ? b(0, e) : "values" == i ? b(0, n[e]) : b(0, [e, n[e]])
    });
    var j = s(6);
    return h(h.G + h.F, {
        Dict: n
    }),
    h(h.S, "Dict", {
        keys: i("keys"),
        values: i("values"),
        entries: i("entries"),
        forEach: s(0),
        map: s(1),
        filter: s(2),
        some: s(3),
        every: s(4),
        find: s(5),
        findKey: j,
        mapPairs: s(7),
        reduce: a(!1),
        turn: a(!0),
        keyOf: f,
        includes: function(e, t) {
            return void 0 !== (t == t ? f(e, t) : j(e, function(e) {
                return e != e
            }))
        },
        has: k,
        get: function(e, t) {
            return k(e, t) ? e[t] : void 0
        },
        set: c.def,
        isDict: function(e) {
            return c.isObject(e) && c.getProto(e) === n.prototype
        }
    }),
    l.define = u,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.iter-helpers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$").core
      , o = require("npm:core-js@0.9.18/modules/$.iter");
    return i.isIterable = o.is,
    i.getIterator = o.get,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.$for", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.mix"], !0, function(require, e, t) {
    function n(e, t) {
        return this instanceof n ? (this[f] = g(e),
        void (this[h] = !!t)) : new n(e,t)
    }
    function r(e) {
        function t(e, t, n) {
            this[f] = g(e),
            this[h] = e[h],
            this[p] = a(t, n, e[h] ? 2 : 1)
        }
        return y(t, "Chain", e, b),
        v(t.prototype, s.that),
        t
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$")
      , a = require("npm:core-js@0.9.18/modules/$.ctx")
      , l = require("npm:core-js@0.9.18/modules/$.uid").safe
      , u = require("npm:core-js@0.9.18/modules/$.def")
      , c = require("npm:core-js@0.9.18/modules/$.iter")
      , d = require("npm:core-js@0.9.18/modules/$.for-of")
      , h = l("entries")
      , p = l("fn")
      , f = l("iter")
      , m = require("npm:core-js@0.9.18/modules/$.iter-call")
      , g = c.get
      , v = c.set
      , y = c.create;
    y(n, "Wrapper", function() {
        return this[f].next()
    });
    var b = n.prototype;
    v(b, function() {
        return this[f]
    });
    var w = r(function() {
        var e = this[f].next();
        return e.done ? e : c.step(0, m(this[f], this[p], e.value, this[h]))
    })
      , x = r(function() {
        for (; ; ) {
            var e = this[f].next();
            if (e.done || m(this[f], this[p], e.value, this[h]))
                return e
        }
    });
    return require("npm:core-js@0.9.18/modules/$.mix")(b, {
        of: function(e, t) {
            d(this, this[h], e, t)
        },
        array: function(e, t) {
            var n = [];
            return d(void 0 != e ? this.map(e, t) : this, !1, n.push, n),
            n
        },
        filter: function(e, t) {
            return new x(this,e,t)
        },
        map: function(e, t) {
            return new w(this,e,t)
        }
    }),
    n.isIterable = c.is,
    n.getIterator = g,
    u(u.G + u.F, {
        $for: n
    }),
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.delay", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = require("npm:core-js@0.9.18/modules/$.partial");
    return o(o.G + o.F, {
        delay: function(e) {
            return new (i.core.Promise || i.g.Promise)(function(t) {
                setTimeout(s.call(t, !0), e)
            }
            )
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.function.part", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def");
    return i.core._ = i.path._ = i.path._ || {},
    o(o.P + o.F, "Function", {
        part: require("npm:core-js@0.9.18/modules/$.partial")
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.object", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys", "npm:core-js@0.9.18/modules/$.cof"], !0, function(require, e, t) {
    function n(e, t) {
        for (var n, r = a(o.toObject(t)), i = r.length, s = 0; i > s; )
            o.setDesc(e, n = r[s++], o.getDesc(t, n));
        return e
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = require("npm:core-js@0.9.18/modules/$.own-keys");
    return s(s.S + s.F, "Object", {
        isObject: o.isObject,
        classof: require("npm:core-js@0.9.18/modules/$.cof").classof,
        define: n,
        make: function(e, t) {
            return n(o.create(e), t)
        }
    }),
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.array.turn", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.unscope"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = require("npm:core-js@0.9.18/modules/$.assert").fn;
    return o(o.P + o.F, "Array", {
        turn: function(e, t) {
            s(e);
            for (var n = void 0 == t ? [] : Object(t), r = i.ES5Object(this), o = i.toLength(r.length), a = 0; o > a && e(n, r[a], a++, this) !== !1; )
                ;
            return n
        }
    }),
    require("npm:core-js@0.9.18/modules/$.unscope")("turn"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.number.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter-define"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.uid").safe("iter");
    return require("npm:core-js@0.9.18/modules/$.iter-define")(Number, "Number", function(e) {
        i.set(this, o, {
            l: i.toLength(e),
            i: 0
        })
    }, function() {
        var e = this[o]
          , t = e.i++
          , n = t >= e.l;
        return {
            done: n,
            value: n ? void 0 : t
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.number.math", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = require("npm:core-js@0.9.18/modules/$.invoke")
      , a = {};
    return a.random = function(e) {
        var t = +this
          , n = void 0 == e ? 0 : +e
          , r = Math.min(t, n);
        return Math.random() * (Math.max(t, n) - r) + r
    }
    ,
    i.FW && i.each.call("round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc".split(","), function(e) {
        var t = Math[e];
        t && (a[e] = function() {
            for (var e = [+this], n = 0; arguments.length > n; )
                e.push(arguments[n++]);
            return s(t, e)
        }
        )
    }),
    o(o.P + o.F, "Number", a),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.string.escape-html", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i, o = require("npm:core-js@0.9.18/modules/$.def"), s = require("npm:core-js@0.9.18/modules/$.replacer"), a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    }, l = {};
    for (i in a)
        l[a[i]] = i;
    return o(o.P + o.F, "String", {
        escapeHTML: s(/[&<>"']/g, a),
        unescapeHTML: s(/&(?:amp|lt|gt|quot|apos);/g, l)
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.date", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], !0, function(require, e, t) {
    function n(e) {
        return e > 9 ? e : "0" + e
    }
    function r(e) {
        return function(t, r) {
            function i(t) {
                return o[e + t]()
            }
            var o = this
              , s = h[a.has(h, r) ? r : p];
            return String(t).replace(c, function(e) {
                switch (e) {
                case "s":
                    return i(f);
                case "ss":
                    return n(i(f));
                case "m":
                    return i(m);
                case "mm":
                    return n(i(m));
                case "h":
                    return i(g);
                case "hh":
                    return n(i(g));
                case "D":
                    return i(v);
                case "DD":
                    return n(i(v));
                case "W":
                    return s[0][i("Day")];
                case "N":
                    return i(y) + 1;
                case "NN":
                    return n(i(y) + 1);
                case "M":
                    return s[2][i(y)];
                case "MM":
                    return s[1][i(y)];
                case "Y":
                    return i(b);
                case "YY":
                    return n(i(b) % 100)
                }
                return e
            })
        }
    }
    function i(e, t) {
        function n(e) {
            var n = [];
            return a.each.call(t.months.split(","), function(t) {
                n.push(t.replace(d, "$" + e))
            }),
            n
        }
        return h[e] = [t.weekdays.split(","), n(1), n(2)],
        u
    }
    var o = System.global
      , s = o.define;
    o.define = void 0;
    var a = require("npm:core-js@0.9.18/modules/$")
      , l = require("npm:core-js@0.9.18/modules/$.def")
      , u = a.core
      , c = /\b\w\w?\b/g
      , d = /:(.*)\|(.*)$/
      , h = {}
      , p = "en"
      , f = "Seconds"
      , m = "Minutes"
      , g = "Hours"
      , v = "Date"
      , y = "Month"
      , b = "FullYear";
    return l(l.P + l.F, v, {
        format: r("get"),
        formatUTC: r("getUTC")
    }),
    i(p, {
        weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        months: "January,February,March,April,May,June,July,August,September,October,November,December"
    }),
    i("ru", {
        weekdays: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435,\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a,\u0412\u0442\u043e\u0440\u043d\u0438\u043a,\u0421\u0440\u0435\u0434\u0430,\u0427\u0435\u0442\u0432\u0435\u0440\u0433,\u041f\u044f\u0442\u043d\u0438\u0446\u0430,\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
        months: "\u042f\u043d\u0432\u0430\u0440:\u044f|\u044c,\u0424\u0435\u0432\u0440\u0430\u043b:\u044f|\u044c,\u041c\u0430\u0440\u0442:\u0430|,\u0410\u043f\u0440\u0435\u043b:\u044f|\u044c,\u041c\u0430:\u044f|\u0439,\u0418\u044e\u043d:\u044f|\u044c,\u0418\u044e\u043b:\u044f|\u044c,\u0410\u0432\u0433\u0443\u0441\u0442:\u0430|,\u0421\u0435\u043d\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041e\u043a\u0442\u044f\u0431\u0440:\u044f|\u044c,\u041d\u043e\u044f\u0431\u0440:\u044f|\u044c,\u0414\u0435\u043a\u0430\u0431\u0440:\u044f|\u044c"
    }),
    u.locale = function(e) {
        return a.has(h, e) ? p = e : p
    }
    ,
    u.addLocale = i,
    o.define = s,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.global", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.G + i.F, {
        global: require("npm:core-js@0.9.18/modules/$").g
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/core.log", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.def")
      , s = {}
      , a = !0;
    return i.each.call("assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,markTimeline,profile,profileEnd,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","), function(e) {
        s[e] = function() {
            return a && i.g.console && i.isFunction(console[e]) ? Function.apply.call(console[e], console, arguments) : void 0
        }
    }),
    o(o.G + o.F, {
        log: require("npm:core-js@0.9.18/modules/$.assign")(s.log, s, {
            enable: function() {
                a = !0
            },
            disable: function() {
                a = !1
            }
        })
    }),
    n.define = r,
    t.exports
}),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/metadata@0.7.0/index", ["npm:core-js@0.9.18"], !1, function(e, t, n) {
        return function(e, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function i(e) {
                var t;
                if (t = "function" == typeof e.decorators ? e.decorators() : e.decorators,
                "function" != typeof t._decorate)
                    throw new Error("The return value of your decorator's method was not valid.");
                delete e.decorators,
                t._decorate(e)
            }
            e.__esModule = !0;
            var o = (n(t),
            function() {
                return "undefined" != typeof self ? self : "undefined" != typeof global ? global : new Function("return this")()
            }())
              , s = Object.freeze({})
              , a = "__metadata__";
            "undefined" == typeof o.System && (o.System = {
                isFake: !0
            }),
            "undefined" == typeof System.forEachModule && (System.forEachModule = function() {}
            ),
            "undefined" == typeof o.Reflect && (o.Reflect = {}),
            "undefined" == typeof Reflect.getOwnMetadata && (Reflect.getOwnMetadata = function(e, t, n) {
                return ((t[a] || s)[n] || s)[e]
            }
            ),
            "undefined" == typeof Reflect.defineMetadata && (Reflect.defineMetadata = function(e, t, n, r) {
                var i = n[a] || (n[a] = {})
                  , o = i[r] || (i[r] = {});
                o[e] = t
            }
            ),
            "undefined" == typeof Reflect.metadata && (Reflect.metadata = function(e, t) {
                return function(n, r) {
                    Reflect.defineMetadata(e, t, n, r)
                }
            }
            );
            var l = {
                global: o,
                resource: "aurelia:resource",
                paramTypes: "design:paramtypes",
                properties: "design:properties",
                get: function(e, t, n) {
                    if (!t)
                        return void 0;
                    var r = l.getOwn(e, t, n);
                    return void 0 === r ? l.get(e, Object.getPrototypeOf(t), n) : r
                },
                getOwn: function(e, t, n) {
                    return t ? (t.hasOwnProperty("decorators") && i(t),
                    Reflect.getOwnMetadata(e, t, n)) : void 0
                },
                define: function(e, t, n, r) {
                    Reflect.defineMetadata(e, t, n, r)
                },
                getOrCreateOwn: function(e, t, n, r) {
                    var i = l.getOwn(e, n, r);
                    return void 0 === i && (i = new t,
                    Reflect.defineMetadata(e, i, n, r)),
                    i
                }
            };
            e.Metadata = l;
            var u = new Map
              , c = Object.freeze({
                moduleId: void 0,
                moduleMember: void 0
            })
              , d = function() {
                function e(t, n) {
                    r(this, e),
                    this.moduleId = t,
                    this.moduleMember = n
                }
                return e.get = function(t) {
                    var n = u.get(t);
                    return void 0 === n && System.forEachModule(function(r, i) {
                        for (var o in i) {
                            var s = i[o];
                            if (s === t)
                                return u.set(t, n = new e(r,o)),
                                !0
                        }
                        return i === t ? (u.set(t, n = new e(r,"default")),
                        !0) : void 0
                    }),
                    n || c
                }
                ,
                e.set = function(e, t) {
                    u.set(e, t)
                }
                ,
                e
            }();
            e.Origin = d;
            var h = function() {
                function e() {
                    r(this, e),
                    this._first = null ,
                    this._second = null ,
                    this._third = null ,
                    this._rest = null
                }
                return e.prototype.decorator = function(e) {
                    return null  === this._first ? (this._first = e,
                    this) : null  === this._second ? (this._second = e,
                    this) : null  === this._third ? (this._third = e,
                    this) : (null  === this._rest && (this._rest = []),
                    this._rest.push(e),
                    this)
                }
                ,
                e.prototype._decorate = function(e) {
                    var t, n, r;
                    if (null  !== this._first && this._first(e),
                    null  !== this._second && this._second(e),
                    null  !== this._third && this._third(e),
                    r = this._rest,
                    null  !== r)
                        for (t = 0,
                        n = r.length; n > t; ++t)
                            r[t](e)
                }
                ,
                e
            }();
            e.DecoratorApplicator = h;
            var p = {
                configure: {
                    parameterizedDecorator: function(e, t) {
                        p[e] = function() {
                            var t = new h;
                            return t[e].apply(t, arguments)
                        }
                        ,
                        h.prototype[e] = function() {
                            var e = t.apply(null , arguments);
                            return this.decorator(e)
                        }
                    },
                    simpleDecorator: function(e, t) {
                        p[e] = function() {
                            return (new h).decorator(t)
                        }
                        ,
                        h.prototype[e] = function() {
                            return this.decorator(t)
                        }
                    }
                }
            };
            e.Decorators = p
        }
        .call(t, t, e("npm:core-js@0.9.18"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/logging@0.6.0/index", [], !1, function(e, t, n) {
        return function(e) {
            "use strict";
            function t(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t, n) {
                if (t) {
                    if (t.innerError && n)
                        return t;
                    t.stack && (e += "\n------------------------------------------------\ninner error: " + t.stack)
                }
                var r = new Error(e);
                return t && (r.innerError = t),
                r
            }
            function r(e, t, n) {
                var r, i = g.length;
                for (n = v.call(n),
                n.unshift(e); i--; )
                    r = g[i],
                    r[t].apply(r, n)
            }
            function i() {
                4 > m || r(this, "debug", arguments)
            }
            function o() {
                3 > m || r(this, "info", arguments)
            }
            function s() {
                2 > m || r(this, "warn", arguments)
            }
            function a() {
                1 > m || r(this, "error", arguments)
            }
            function l(e) {
                e.debug = i,
                e.info = o,
                e.warn = s,
                e.error = a
            }
            function u(e) {
                var t = new b(e,y);
                return g.length && l(t),
                t
            }
            function c(e) {
                return f[e] || (f[e] = u(e))
            }
            function d(e) {
                if (g.push(e),
                1 === g.length)
                    for (var t in f)
                        l(f[t])
            }
            function h(e) {
                m = e
            }
            e.__esModule = !0,
            e.AggregateError = n,
            e.getLogger = c,
            e.addAppender = d,
            e.setLevel = h;
            var p = {
                none: 0,
                error: 1,
                warn: 2,
                info: 3,
                debug: 4
            };
            e.logLevel = p;
            var f = {}
              , m = p.none
              , g = []
              , v = Array.prototype.slice
              , y = {}
              , b = function() {
                function e(n, r) {
                    if (t(this, e),
                    r !== y)
                        throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
                    this.id = n
                }
                return e.prototype.debug = function(e) {}
                ,
                e.prototype.info = function(e) {}
                ,
                e.prototype.warn = function(e) {}
                ,
                e.prototype.error = function(e) {}
                ,
                e
            }();
            e.Logger = b
        }
        .call(t, t)
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/task-queue@0.6.0/index", [], !1, function(e, t, n) {
        return function(e) {
            "use strict";
            function t(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e) {
                var t = 1
                  , n = new i(e)
                  , r = document.createTextNode("");
                return n.observe(r, {
                    characterData: !0
                }),
                function() {
                    t = -t,
                    r.data = t
                }
            }
            function r(e) {
                return function() {
                    function t() {
                        clearTimeout(n),
                        clearInterval(r),
                        e()
                    }
                    var n = setTimeout(t, 0)
                      , r = setInterval(t, 50)
                }
            }
            e.__esModule = !0;
            var i = window.MutationObserver || window.WebKitMutationObserver
              , o = "function" == typeof setImmediate
              , s = function() {
                function e() {
                    var o = this;
                    t(this, e),
                    this.microTaskQueue = [],
                    this.microTaskQueueCapacity = 1024,
                    this.taskQueue = [],
                    "function" == typeof i ? this.requestFlushMicroTaskQueue = n(function() {
                        return o.flushMicroTaskQueue()
                    }) : this.requestFlushMicroTaskQueue = r(function() {
                        return o.flushMicroTaskQueue()
                    }),
                    this.requestFlushTaskQueue = r(function() {
                        return o.flushTaskQueue()
                    })
                }
                return e.prototype.queueMicroTask = function(e) {
                    this.microTaskQueue.length < 1 && this.requestFlushMicroTaskQueue(),
                    this.microTaskQueue.push(e)
                }
                ,
                e.prototype.queueTask = function(e) {
                    this.taskQueue.length < 1 && this.requestFlushTaskQueue(),
                    this.taskQueue.push(e)
                }
                ,
                e.prototype.flushTaskQueue = function() {
                    var e, t = this.taskQueue, n = 0;
                    for (this.taskQueue = []; n < t.length; ) {
                        e = t[n];
                        try {
                            e.call()
                        } catch (r) {
                            this.onError(r, e)
                        }
                        n++
                    }
                }
                ,
                e.prototype.flushMicroTaskQueue = function() {
                    for (var e, t = this.microTaskQueue, n = this.microTaskQueueCapacity, r = 0; r < t.length; ) {
                        e = t[r];
                        try {
                            e.call()
                        } catch (i) {
                            this.onError(i, e)
                        }
                        if (r++,
                        r > n) {
                            for (var o = 0; r > o; o++)
                                t[o] = t[o + r];
                            t.length -= r,
                            r = 0
                        }
                    }
                    t.length = 0
                }
                ,
                e.prototype.onError = function(e, t) {
                    "onError" in t ? t.onError(e) : o ? setImmediate(function() {
                        throw e
                    }) : setTimeout(function() {
                        throw e
                    }, 0)
                }
                ,
                e
            }();
            e.TaskQueue = s
        }
        .call(t, t)
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/path@0.8.0/index", [], !1, function(e, t, n) {
        return function(e) {
            "use strict";
            function t(e) {
                var t, n;
                for (t = 0; t < e.length; ++t)
                    if (n = e[t],
                    "." === n)
                        e.splice(t, 1),
                        t -= 1;
                    else if (".." === n) {
                        if (0 === t || 1 == t && ".." === e[2] || ".." === e[t - 1])
                            continue;t > 0 && (e.splice(t - 1, 2),
                        t -= 2)
                    }
            }
            function n(e, n) {
                var r, i = n && n.split("/"), o = e.trim().split("/");
                return "." === o[0].charAt(0) && i && (r = i.slice(0, i.length - 1),
                o = r.concat(o)),
                t(o),
                o.join("/")
            }
            function r(e, t) {
                var n, r, i, o, s, a, l;
                if (!e)
                    return t;
                if (!t)
                    return e;
                for (a = 0 === e.indexOf("//") ? "//" : 0 === e.indexOf("/") ? "/" : "",
                l = "/" == t.slice(-1) ? "/" : "",
                n = e.split("/"),
                r = t.split("/"),
                i = [],
                o = 0,
                s = n.length; s > o; ++o)
                    if (".." == n[o])
                        i.pop();
                    else {
                        if ("." == n[o] || "" == n[o])
                            continue;i.push(n[o])
                    }
                for (o = 0,
                s = r.length; s > o; ++o)
                    if (".." == r[o])
                        i.pop();
                    else {
                        if ("." == r[o] || "" == r[o])
                            continue;i.push(r[o])
                    }
                return a + i.join("/").replace(/\:\//g, "://") + l
            }
            function i(e) {
                return null  == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[toString.call(e)] || "object" : typeof e
            }
            function o(e, t) {
                var n = []
                  , r = function(e, t) {
                    t = "function" == typeof t ? t() : null  == t ? "" : t,
                    n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }
                ;
                for (var i in e)
                    s(i, e[i], t, r);
                return n.join("&").replace(a, "+")
            }
            function s(e, t, n, r) {
                if (Array.isArray(t))
                    t.forEach(function(t, i) {
                        n || l.test(e) ? r(e, t) : s(e + "[" + ("object" == typeof t ? i : "") + "]", t, n, r)
                    });
                else if (n || "object" !== i(t))
                    r(e, t);
                else
                    for (var o in t)
                        s(e + "[" + o + "]", t[o], n, r)
            }
            e.__esModule = !0,
            e.relativeToFile = n,
            e.join = r,
            e.buildQueryString = o;
            var a = /%20/g
              , l = /\[\]$/
              , u = {};
            "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, t) {
                u["[object " + e + "]"] = e.toLowerCase()
            })
        }
        .call(t, t)
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/loader@0.8.0/index", ["npm:core-js@0.9.18", "github:aurelia/path@0.8.0"], !1, function(e, t, n) {
        return function(e, t, n) {
            "use strict";
            function r(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function o(e, t, n) {
                e && document.head.appendChild(e),
                window.Polymer && Polymer.whenReady ? Polymer.whenReady(n) : t.addEventListener("load", n)
            }
            e.__esModule = !0;
            var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }()
              , a = (r(t),
            function d(e, t) {
                i(this, d),
                this.src = e,
                this.name = t
            }
            );
            e.TemplateDependency = a;
            var l = function() {
                function e(t) {
                    i(this, e),
                    this.id = t,
                    this.template = null ,
                    this.dependencies = null ,
                    this.resources = null ,
                    this.factory = null
                }
                return e.prototype.setTemplate = function(e) {
                    var t, r, i, o, s, l = this.id;
                    if (this.template = e,
                    t = e.content.querySelectorAll("require"),
                    this.dependencies = new Array(t.length),
                    0 !== t.length)
                        for (r = 0,
                        i = t.length; i > r; ++r) {
                            if (o = t[r],
                            s = o.getAttribute("from"),
                            !s)
                                throw new Error("<require> element in " + this.id + ' has no "from" attribute.');
                            this.dependencies[r] = new a(n.relativeToFile(s, l),o.getAttribute("as")),
                            o.parentNode && o.parentNode.removeChild(o)
                        }
                }
                ,
                e.prototype.setResources = function(e) {
                    this.resources = e
                }
                ,
                e.prototype.setFactory = function(e) {
                    this.factory = e
                }
                ,
                s(e, [{
                    key: "templateIsLoaded",
                    get: function() {
                        return null  !== this.template
                    }
                }, {
                    key: "isReady",
                    get: function() {
                        return null  !== this.factory
                    }
                }]),
                e
            }();
            e.TemplateRegistryEntry = l;
            var u = "content" in document.createElement("template")
              , c = function() {
                function e() {
                    i(this, e),
                    this.templateRegistry = {}
                }
                return e.prototype.loadModule = function(e) {
                    throw new Error("Loaders must implement loadModule(id).")
                }
                ,
                e.prototype.loadAllModules = function(e) {
                    throw new Error("Loader must implement loadAllModules(ids).")
                }
                ,
                e.prototype.loadTemplate = function(e) {
                    throw new Error("Loader must implement loadTemplate(url).")
                }
                ,
                e.prototype.loadText = function(e) {
                    throw new Error("Loader must implement loadText(url).")
                }
                ,
                e.prototype.getOrCreateTemplateRegistryEntry = function(e) {
                    var t = this.templateRegistry[e];
                    return void 0 === t && (this.templateRegistry[e] = t = new l(e)),
                    t
                }
                ,
                e.prototype.importDocument = function(e) {
                    return new Promise(function(t, n) {
                        var r = document.createDocumentFragment()
                          , i = document.createElement("link");
                        i.rel = "import",
                        i.href = e,
                        r.appendChild(i),
                        o(r, i, function() {
                            return t(i["import"])
                        })
                    }
                    )
                }
                ,
                e.prototype.importBundle = function(e) {
                    return new Promise(function(t, n) {
                        e["import"] ? (u || HTMLTemplateElement.bootstrap(e["import"]),
                        t(e["import"])) : o(null , e, function() {
                            u || HTMLTemplateElement.bootstrap(e["import"]),
                            t(e["import"])
                        })
                    }
                    )
                }
                ,
                e.prototype.importTemplate = function(e) {
                    var t = this;
                    return this.importDocument(e).then(function(n) {
                        return t.findTemplate(n, e)
                    })
                }
                ,
                e.prototype.findTemplate = function(e, t) {
                    u || HTMLTemplateElement.bootstrap(e);
                    var n = e.getElementsByTagName("template")[0];
                    if (!n)
                        throw new Error("There was no template element found in '" + t + "'.");
                    return n
                }
                ,
                e.prototype.findBundledTemplate = function(e, t) {
                    var n = this;
                    if (this.bundle) {
                        var r = this.bundle.getElementById(e);
                        if (r)
                            return t.setTemplate(r),
                            Promise.resolve(!0)
                    } else if (!this.bundleChecked) {
                        this.bundleChecked = !0;
                        var i = document.querySelector("link[aurelia-view-bundle]");
                        if (i)
                            return this.importBundle(i).then(function(r) {
                                n.bundle = r;
                                var i = n.bundle.getElementById(e);
                                return i ? (t.setTemplate(i),
                                Promise.resolve(!0)) : void 0
                            })
                    }
                    return Promise.resolve(!1)
                }
                ,
                e
            }();
            e.Loader = c
        }
        .call(t, t, e("npm:core-js@0.9.18"), e("github:aurelia/path@0.8.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/binding@0.8.1/index", ["npm:core-js@0.9.18", "github:aurelia/task-queue@0.6.0", "github:aurelia/dependency-injection@0.9.0", "github:aurelia/metadata@0.7.0"], !1, function(e, t, n) {
        return function(e, t, n, r, i) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function s(e, t) {
                if ("function" != typeof t && null  !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (e.__proto__ = t)
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function l(e) {
                return +e === e >>> 0
            }
            function u(e) {
                return +e
            }
            function c(e, t, n) {
                return {
                    index: e,
                    removed: t,
                    addedCount: n
                }
            }
            function d() {}
            function h(e, t, n, r, i, o) {
                return G.calcSplices(e, t, n, r, i, o)
            }
            function p(e, t, n, r) {
                return n > t || e > r ? -1 : t == n || r == e ? 0 : n > e ? r > t ? t - n : r - n : t > r ? r - e : t - e
            }
            function f(e, t, n, r) {
                for (var i = c(t, n, r), o = !1, s = 0, a = 0; a < e.length; a++) {
                    var l = e[a];
                    if (l.index += s,
                    !o) {
                        var u = p(i.index, i.index + i.removed.length, l.index, l.index + l.addedCount);
                        if (u >= 0) {
                            e.splice(a, 1),
                            a--,
                            s -= l.addedCount - l.removed.length,
                            i.addedCount += l.addedCount - u;
                            var d = i.removed.length + l.removed.length - u;
                            if (i.addedCount || d) {
                                var n = l.removed;
                                if (i.index < l.index) {
                                    var h = i.removed.slice(0, l.index - i.index);
                                    Array.prototype.push.apply(h, n),
                                    n = h
                                }
                                if (i.index + i.removed.length > l.index + l.addedCount) {
                                    var f = i.removed.slice(l.index + l.addedCount - i.index);
                                    Array.prototype.push.apply(n, f)
                                }
                                i.removed = n,
                                l.index < i.index && (i.index = l.index)
                            } else
                                o = !0
                        } else if (i.index < l.index) {
                            o = !0,
                            e.splice(a, 0, i),
                            a++;
                            var m = i.addedCount - i.removed.length;
                            l.index += m,
                            s += m
                        }
                    }
                }
                o || e.push(i)
            }
            function m(e, t) {
                for (var n = [], r = 0; r < t.length; r++) {
                    var i = t[r];
                    switch (i.type) {
                    case "splice":
                        f(n, i.index, i.removed.slice(), i.addedCount);
                        break;
                    case "add":
                    case "update":
                    case "delete":
                        if (!l(i.name))
                            continue;var o = u(i.name);
                        if (0 > o)
                            continue;f(n, o, [i.oldValue], "delete" === i.type ? 0 : 1);
                        break;
                    default:
                        console.error("Unexpected record type: " + JSON.stringify(i))
                    }
                }
                return n
            }
            function g(e, t) {
                var n = [];
                return m(e, t).forEach(function(t) {
                    return 1 == t.addedCount && 1 == t.removed.length ? void (t.removed[0] !== e[t.index] && n.push(t)) : void (n = n.concat(h(e, t.index, t.index + t.addedCount, t.removed, 0, t.removed.length)))
                }),
                n
            }
            function v(e, t, n, r) {
                return {
                    type: e,
                    object: t,
                    key: n,
                    oldValue: r
                }
            }
            function y(e) {
                for (var t = [], n = e.keys(), r = Array.isArray(n), i = 0, n = r ? n : n[Symbol.iterator](); ; ) {
                    var o;
                    if (r) {
                        if (i >= n.length)
                            break;
                        o = n[i++]
                    } else {
                        if (i = n.next(),
                        i.done)
                            break;
                        o = i.value
                    }
                    var s = o;
                    t.push(v("added", e, s))
                }
                return t
            }
            function b(e, t) {
                return Q ? new ee(t) : J.create(e, t)
            }
            function w(e, t, n) {
                var r, i, o = t.length;
                for (r = xe.length; o >= r; ++r)
                    xe.push([]);
                var s = xe[o];
                for (i = 0; o > i; ++i)
                    s[i] = t[i].evaluate(e, n);
                return s
            }
            function x(e, t) {
                return null  != e && null  != t ? "string" == typeof e && "string" != typeof t ? e + t.toString() : "string" != typeof e && "string" == typeof t ? e.toString() + t : e + t : null  != e ? e : null  != t ? t : 0
            }
            function k(e, t) {
                var n = e[t];
                if ("function" == typeof n)
                    return n;
                throw null  === n ? new Error("Undefined function " + t) : new Error(t + " is not a function")
            }
            function j(e, t) {
                if (Array.isArray(e))
                    return e[parseInt(t)];
                if (e)
                    return e[t];
                if (null  === e)
                    throw new Error("Accessing null object");
                return e[t]
            }
            function S(e, t, n) {
                if (Array.isArray(e)) {
                    var r = parseInt(t);
                    e.length <= r && (e.length = r + 1),
                    e[r] = n
                } else
                    e[t] = n;
                return n
            }
            function C(e) {
                return e >= Oe && Ee >= e || e === pt
            }
            function L(e) {
                return e >= st && ut >= e || e >= Ze && et >= e || e === ot || e === $e
            }
            function M(e) {
                return e >= st && ut >= e || e >= Ze && et >= e || e >= Ye && Xe >= e || e === ot || e === $e
            }
            function O(e) {
                return e >= Ye && Xe >= e
            }
            function E(e) {
                return e === at || e === Je
            }
            function T(e) {
                return e === Ve || e === Fe
            }
            function A(e, t) {
                if (!e)
                    throw t || "Assertion failed"
            }
            function $(e, t) {
                return yt.create(e, t)
            }
            function N(e) {
                return e && e.get && !e.set && e.get.dependencies && e.get.dependencies.length
            }
            function D(e, t, n) {
                var r = Object.getOwnPropertyDescriptor(e.prototype, t);
                if (r.set)
                    throw new Error("The property cannot have a setter function.");
                r.get.dependencies = n
            }
            function P(e, t) {
                return It[e] && Rt[t] || Pt[e] && -1 !== Pt[e].indexOf(t)
            }
            function I(e) {
                var t = document.createElement("div");
                return t.innerHTML = e,
                t.firstChild
            }
            function R(e, t) {
                var n = new Ct(e,t);
                try {
                    Object.defineProperty(e, "__observer__", {
                        enumerable: !1,
                        configurable: !1,
                        writable: !1,
                        value: n
                    })
                } catch (r) {}
                return n
            }
            function _(e) {
                return e.charAt(0).toLowerCase() + e.slice(1)
            }
            function F(e) {
                return void 0 === e || "string" == typeof e ? function(t) {
                    i.Metadata.define(i.Metadata.resource, new Wt(e), t)
                }
                 : void i.Metadata.define(i.Metadata.resource, new Wt, e)
            }
            function z() {
                for (var e = arguments.length, t = Array(e), n = 0; e > n; n++)
                    t[n] = arguments[n];
                return function(e, n, r) {
                    if (r.set)
                        throw new Error('The computed property "' + n + '" cannot have a setter function.');
                    return r.get.dependencies = t,
                    r
                }
            }
            e.__esModule = !0;
            var V = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }();
            e.calcSplices = h,
            e.projectArraySplices = g,
            e.getChangeRecords = y,
            e.getArrayObserver = b,
            e.getMapObserver = $,
            e.hasDeclaredDependencies = N,
            e.declarePropertyDependencies = D,
            e.isStandardSvgAttribute = P,
            e.valueConverter = F,
            e.computedFrom = z;
            var H = (o(t),
            function() {
                function e(t, n, r, i) {
                    var o = this;
                    a(this, e),
                    this.objectInfo = t,
                    this.keyInfo = n,
                    this.evaluate = i,
                    this.observerLocator = r,
                    n.observer && (this.disposeKey = n.observer.subscribe(function(e) {
                        return o.objectOrKeyChanged(void 0, e)
                    })),
                    t.observer && (this.disposeObject = t.observer.subscribe(function(e) {
                        return o.objectOrKeyChanged(e)
                    })),
                    this.updatePropertySubscription(t.value, n.value)
                }
                return e.prototype.updatePropertySubscription = function(e, t) {
                    var n = this;
                    this.disposeProperty && (this.disposeProperty(),
                    this.disposeProperty = null ),
                    e instanceof Object && (this.disposeProperty = this.observerLocator.getObserver(e, t).subscribe(function() {
                        return n.notify()
                    }))
                }
                ,
                e.prototype.objectOrKeyChanged = function(e, t) {
                    var n, r;
                    e = e || ((n = this.objectInfo.observer) && n.getValue ? n.getValue() : this.objectInfo.value),
                    t = t || ((r = this.keyInfo.observer) && r.getValue ? r.getValue() : this.keyInfo.value),
                    this.updatePropertySubscription(e, t),
                    this.notify()
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this;
                    return t.callback = e,
                    function() {
                        t.callback = null
                    }
                }
                ,
                e.prototype.notify = function() {
                    var e = this.callback;
                    e && e(this.evaluate())
                }
                ,
                e.prototype.dispose = function() {
                    this.objectInfo = null ,
                    this.keyInfo = null ,
                    this.evaluate = null ,
                    this.observerLocator = null ,
                    this.disposeObject && this.disposeObject(),
                    this.disposeKey && this.disposeKey(),
                    this.disposeProperty && this.disposeProperty()
                }
                ,
                e
            }());
            e.AccessKeyedObserver = H;
            var B = 0
              , W = 1
              , q = 2
              , U = 3;
            d.prototype = {
                calcEditDistances: function(e, t, n, r, i, o) {
                    var s, a, l, u, c = o - i + 1, d = n - t + 1, h = new Array(c);
                    for (s = 0; c > s; ++s)
                        h[s] = new Array(d),
                        h[s][0] = s;
                    for (a = 0; d > a; ++a)
                        h[0][a] = a;
                    for (s = 1; c > s; ++s)
                        for (a = 1; d > a; ++a)
                            this.equals(e[t + a - 1], r[i + s - 1]) ? h[s][a] = h[s - 1][a - 1] : (l = h[s - 1][a] + 1,
                            u = h[s][a - 1] + 1,
                            h[s][a] = u > l ? l : u);
                    return h
                },
                spliceOperationsFromEditDistances: function(e) {
                    for (var t = e.length - 1, n = e[0].length - 1, r = e[t][n], i = []; t > 0 || n > 0; )
                        if (0 != t)
                            if (0 != n) {
                                var o, s = e[t - 1][n - 1], a = e[t - 1][n], l = e[t][n - 1];
                                o = l > a ? s > a ? a : s : s > l ? l : s,
                                o == s ? (s == r ? i.push(B) : (i.push(W),
                                r = s),
                                t--,
                                n--) : o == a ? (i.push(U),
                                t--,
                                r = a) : (i.push(q),
                                n--,
                                r = l)
                            } else
                                i.push(U),
                                t--;
                        else
                            i.push(q),
                            n--;
                    return i.reverse(),
                    i
                },
                calcSplices: function(e, t, n, r, i, o) {
                    var s = 0
                      , a = 0
                      , l = Math.min(n - t, o - i);
                    if (0 == t && 0 == i && (s = this.sharedPrefix(e, r, l)),
                    n == e.length && o == r.length && (a = this.sharedSuffix(e, r, l - s)),
                    t += s,
                    i += s,
                    n -= a,
                    o -= a,
                    n - t == 0 && o - i == 0)
                        return [];
                    if (t == n) {
                        for (var u = c(t, [], 0); o > i; )
                            u.removed.push(r[i++]);
                        return [u]
                    }
                    if (i == o)
                        return [c(t, [], n - t)];
                    for (var d = this.spliceOperationsFromEditDistances(this.calcEditDistances(e, t, n, r, i, o)), u = void 0, h = [], p = t, f = i, m = 0; m < d.length; ++m)
                        switch (d[m]) {
                        case B:
                            u && (h.push(u),
                            u = void 0),
                            p++,
                            f++;
                            break;
                        case W:
                            u || (u = c(p, [], 0)),
                            u.addedCount++,
                            p++,
                            u.removed.push(r[f]),
                            f++;
                            break;
                        case q:
                            u || (u = c(p, [], 0)),
                            u.addedCount++,
                            p++;
                            break;
                        case U:
                            u || (u = c(p, [], 0)),
                            u.removed.push(r[f]),
                            f++
                        }
                    return u && h.push(u),
                    h
                },
                sharedPrefix: function(e, t, n) {
                    for (var r = 0; n > r; ++r)
                        if (!this.equals(e[r], t[r]))
                            return r;
                    return n
                },
                sharedSuffix: function(e, t, n) {
                    for (var r = e.length, i = t.length, o = 0; n > o && this.equals(e[--r], t[--i]); )
                        o++;
                    return o
                },
                calculateSplices: function(e, t) {
                    return this.calcSplices(e, 0, e.length, t, 0, t.length)
                },
                equals: function(e, t) {
                    return e === t
                }
            };
            var G = new d
              , K = function() {
                function e(e) {
                    t = e
                }
                if ("function" != typeof Object.observe)
                    return !1;
                var t = []
                  , n = {};
                return Object.observe(n, e),
                n.id = 1,
                n.id = 2,
                delete n.id,
                Object.deliverChangeRecords(e),
                3 !== t.length ? !1 : "add" != t[0].type || "update" != t[1].type || "delete" != t[2].type ? !1 : (Object.unobserve(n, e),
                !0)
            }();
            e.hasObjectObserve = K;
            var Q = function() {
                function e(e) {
                    t = e
                }
                if ("function" != typeof Array.observe)
                    return !1;
                var t = []
                  , n = [];
                return Array.observe(n, e),
                n.push(1, 2),
                n.length = 0,
                Object.deliverChangeRecords(e),
                2 !== t.length ? !1 : "splice" != t[0].type || "splice" != t[1].type ? !1 : (Array.unobserve(n, e),
                !0)
            }();
            e.hasArrayObserve = Q;
            var Y = function() {
                function e(t, n) {
                    a(this, e),
                    this.taskQueue = t,
                    this.queued = !1,
                    this.callbacks = [],
                    this.changeRecords = [],
                    this.oldCollection = null ,
                    this.collection = n,
                    this.lengthPropertyName = n instanceof Map ? "size" : "length"
                }
                return e.prototype.subscribe = function(e) {
                    var t = this.callbacks;
                    return t.push(e),
                    function() {
                        t.splice(t.indexOf(e), 1)
                    }
                }
                ,
                e.prototype.addChangeRecord = function(e) {
                    (0 !== this.callbacks.length || this.lengthObserver) && (this.changeRecords.push(e),
                    this.queued || (this.queued = !0,
                    this.taskQueue.queueMicroTask(this)))
                }
                ,
                e.prototype.reset = function(e) {
                    this.callbacks.length && (this.oldCollection = e,
                    this.queued || (this.queued = !0,
                    this.taskQueue.queueMicroTask(this)))
                }
                ,
                e.prototype.getLengthObserver = function() {
                    return this.lengthObserver || (this.lengthObserver = new X(this.collection))
                }
                ,
                e.prototype.call = function() {
                    var e, t = this.callbacks, n = t.length, r = this.changeRecords, i = this.oldCollection;
                    if (this.queued = !1,
                    this.changeRecords = [],
                    this.oldCollection = null ,
                    n)
                        for (e = i ? this.collection instanceof Map ? y(i) : h(this.collection, 0, this.collection.length, i, 0, i.length) : this.collection instanceof Map ? r : g(this.collection, r); n--; )
                            t[n](e);
                    this.lengthObserver && this.lengthObserver.call(this.collection[this.lengthPropertyName])
                }
                ,
                e
            }();
            e.ModifyCollectionObserver = Y;
            var X = function() {
                function e(t) {
                    a(this, e),
                    this.collection = t,
                    this.callbacks = [],
                    this.lengthPropertyName = t instanceof Map ? "size" : "length",
                    this.currentValue = t[this.lengthPropertyName]
                }
                return e.prototype.getValue = function() {
                    return this.collection[this.lengthPropertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    this.collection[this.lengthPropertyName] = e
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this.callbacks;
                    return t.push(e),
                    function() {
                        t.splice(t.indexOf(e), 1)
                    }
                }
                ,
                e.prototype.call = function(e) {
                    for (var t = this.callbacks, n = t.length, r = this.currentValue; n--; )
                        t[n](e, r);
                    this.currentValue = e
                }
                ,
                e
            }();
            e.CollectionLengthObserver = X;
            var Z = Array.prototype
              , J = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this, n, r)
                }
                return s(t, e),
                t.create = function(e, n) {
                    var r = new t(e,n);
                    return n.pop = function() {
                        var e = Z.pop.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "delete",
                            object: n,
                            name: n.length,
                            oldValue: e
                        }),
                        e
                    }
                    ,
                    n.push = function() {
                        var e = Z.push.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "splice",
                            object: n,
                            index: n.length - arguments.length,
                            removed: [],
                            addedCount: arguments.length
                        }),
                        e
                    }
                    ,
                    n.reverse = function() {
                        var e = n.slice()
                          , t = Z.reverse.apply(n, arguments);
                        return r.reset(e),
                        t
                    }
                    ,
                    n.shift = function() {
                        var e = Z.shift.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "delete",
                            object: n,
                            name: 0,
                            oldValue: e
                        }),
                        e
                    }
                    ,
                    n.sort = function() {
                        var e = n.slice()
                          , t = Z.sort.apply(n, arguments);
                        return r.reset(e),
                        t
                    }
                    ,
                    n.splice = function() {
                        var e = Z.splice.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "splice",
                            object: n,
                            index: arguments[0],
                            removed: e,
                            addedCount: arguments.length > 2 ? arguments.length - 2 : 0
                        }),
                        e
                    }
                    ,
                    n.unshift = function() {
                        var e = Z.unshift.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "splice",
                            object: n,
                            index: 0,
                            removed: [],
                            addedCount: arguments.length
                        }),
                        e
                    }
                    ,
                    r
                }
                ,
                t
            }(Y)
              , ee = function() {
                function e(t) {
                    a(this, e),
                    this.array = t,
                    this.callbacks = []
                }
                return e.prototype.subscribe = function(e) {
                    var t = this
                      , n = this.callbacks;
                    return 0 === n.length && (this.handler = this.handleChanges.bind(this),
                    Array.observe(this.array, this.handler)),
                    n.push(e),
                    function() {
                        n.splice(n.indexOf(e), 1),
                        0 === n.length && Array.unobserve(t.array, t.handler)
                    }
                }
                ,
                e.prototype.getLengthObserver = function() {
                    return this.lengthObserver || (this.lengthObserver = new X(this.array))
                }
                ,
                e.prototype.handleChanges = function(e) {
                    var t, n = this.callbacks, r = n.length;
                    if (r)
                        for (t = g(this.array, e); r--; )
                            n[r](t);
                    this.lengthObserver && this.lengthObserver.call(this.array.length)
                }
                ,
                e
            }()
              , te = function() {
                function e(t, n, r) {
                    var i = this;
                    a(this, e),
                    this.leftObserver = t,
                    this.disposeLeft = t.subscribe(function(e) {
                        var t = i.updateRight(n(e));
                        i.notify(t)
                    }),
                    this.updateRight(n(r))
                }
                return e.prototype.updateRight = function(e) {
                    var t = this;
                    return this.rightObserver = e,
                    this.disposeRight && this.disposeRight(),
                    e ? (this.disposeRight = e.subscribe(function(e) {
                        return t.notify(e)
                    }),
                    e.getValue()) : null
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this;
                    return t.callback = e,
                    function() {
                        t.callback = null
                    }
                }
                ,
                e.prototype.notify = function(e) {
                    var t = this.callback;
                    t && t(e)
                }
                ,
                e.prototype.dispose = function() {
                    this.disposeLeft && this.disposeLeft(),
                    this.disposeRight && this.disposeRight()
                }
                ,
                e
            }();
            e.PathObserver = te;
            var ne = function() {
                function e(t, n) {
                    var r = this;
                    a(this, e),
                    this.subscriptions = new Array(t.length),
                    this.evaluate = n;
                    for (var i = 0, o = t.length; o > i; i++)
                        this.subscriptions[i] = t[i].subscribe(function(e) {
                            r.notify(r.evaluate())
                        })
                }
                return e.prototype.subscribe = function(e) {
                    var t = this;
                    return t.callback = e,
                    function() {
                        t.callback = null
                    }
                }
                ,
                e.prototype.notify = function(e) {
                    var t = this.callback;
                    t && t(e)
                }
                ,
                e.prototype.dispose = function() {
                    for (var e = this.subscriptions, t = e.length; t--; )
                        e[t]()
                }
                ,
                e
            }();
            e.CompositeObserver = ne;
            var re = function() {
                function e() {
                    a(this, e),
                    this.isChain = !1,
                    this.isAssignable = !1
                }
                return e.prototype.evaluate = function(e, t, n) {
                    throw new Error("Cannot evaluate " + this)
                }
                ,
                e.prototype.assign = function(e, t, n) {
                    throw new Error("Cannot assign to " + this)
                }
                ,
                e.prototype.toString = function() {
                    return we.unparse(this)
                }
                ,
                e
            }();
            e.Expression = re;
            var ie = function(e) {
                function t(n) {
                    a(this, t),
                    e.call(this),
                    this.expressions = n,
                    this.isChain = !0
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n, r, i, o = this.expressions, s = o.length;
                    for (r = 0; s > r; ++r)
                        i = o[r].evaluate(e, t),
                        null  !== i && (n = i);
                    return n
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitChain(this)
                }
                ,
                t
            }(re);
            e.Chain = ie;
            var oe = function(e) {
                function t(n, r, i, o) {
                    a(this, t),
                    e.call(this),
                    this.expression = n,
                    this.name = r,
                    this.args = i,
                    this.allArgs = o
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n = t(this.name);
                    if (!n)
                        throw new Error('No ValueConverter named "' + this.name + '" was found!');
                    return "toView" in n ? n.toView.apply(n, w(e, this.allArgs, t)) : this.allArgs[0].evaluate(e, t)
                }
                ,
                t.prototype.assign = function(e, t, n) {
                    var r = n(this.name);
                    if (!r)
                        throw new Error('No ValueConverter named "' + this.name + '" was found!');
                    return "fromView" in r && (t = r.fromView.apply(r, [t].concat(w(e, this.args, n)))),
                    this.allArgs[0].assign(e, t, n)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitValueConverter(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o, s, a = this, l = [];
                    for (r = 0,
                    i = this.allArgs.length; i > r; ++r)
                        o = this.allArgs[r],
                        s = o.connect(e, t),
                        s.observer && l.push(s.observer);
                    return l.length && (n = new ne(l,function() {
                        return a.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.ValueConverter = oe;
            var se = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.target = n,
                    this.value = r
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return this.target.assign(e, this.value.evaluate(e, t))
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitAssign(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    return {
                        value: this.evaluate(t, e.valueConverterLookupFunction)
                    }
                }
                ,
                t
            }(re);
            e.Assign = se;
            var ae = function(e) {
                function t(n, r, i) {
                    a(this, t),
                    e.call(this),
                    this.condition = n,
                    this.yes = r,
                    this.no = i
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return this.condition.evaluate(e) ? this.yes.evaluate(e) : this.no.evaluate(e)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitConditional(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r = this, i = this.condition.connect(e, t), o = this.yes.connect(e, t), s = this.no.connect(e, t), a = [];
                    return i.observer && a.push(i.observer),
                    o.observer && a.push(o.observer),
                    s.observer && a.push(s.observer),
                    a.length && (n = new ne(a,function() {
                        return r.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: i.value ? o.value : s.value,
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.Conditional = ae;
            var le = function(e) {
                function t(n) {
                    a(this, t),
                    e.call(this),
                    this.name = n,
                    this.isAssignable = !0
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return e[this.name]
                }
                ,
                t.prototype.assign = function(e, t) {
                    return e[this.name] = t
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitAccessScope(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n = e.getObserver(t, this.name);
                    return {
                        value: n.getValue(),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.AccessScope = le;
            var ue = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.object = n,
                    this.name = r,
                    this.isAssignable = !0
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n = this.object.evaluate(e, t);
                    return null  === n || void 0 === n ? n : n[this.name]
                }
                ,
                t.prototype.assign = function(e, t) {
                    var n = this.object.evaluate(e);
                    return (null  === n || void 0 === n) && (n = {},
                    this.object.assign(e, n)),
                    n[this.name] = t
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitAccessMember(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r = this, i = this.object.connect(e, t), o = i.value, s = i.observer;
                    return n = s ? new te(s,function(t) {
                        return null  == t || void 0 == t ? t : e.getObserver(t, r.name)
                    }
                    ,o) : e.getObserver(o, this.name),
                    {
                        value: null  == o ? null  : o[this.name],
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.AccessMember = ue;
            var ce = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.object = n,
                    this.key = r,
                    this.isAssignable = !0
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n = this.object.evaluate(e, t)
                      , r = this.key.evaluate(e, t);
                    return j(n, r)
                }
                ,
                t.prototype.assign = function(e, t) {
                    var n = this.object.evaluate(e)
                      , r = this.key.evaluate(e);
                    return S(n, r, t)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitAccessKeyed(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n = this
                      , r = this.object.connect(e, t)
                      , i = this.key.connect(e, t)
                      , o = new H(r,i,e.observerLocator,function() {
                        return n.evaluate(t, e.valueConverterLookupFunction)
                    }
                    );
                    return {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: o
                    }
                }
                ,
                t
            }(re);
            e.AccessKeyed = ce;
            var de = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.name = n,
                    this.args = r
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t, n) {
                    return n = n || w(e, this.args, t),
                    k(e, this.name).apply(e, n)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitCallScope(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o, s, a = this, l = [];
                    for (r = 0,
                    i = this.args.length; i > r; ++r)
                        o = this.args[r],
                        s = o.connect(e, t),
                        s.observer && l.push(s.observer);
                    return l.length && (n = new ne(l,function() {
                        return a.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.CallScope = de;
            var he = function(e) {
                function t(n, r, i) {
                    a(this, t),
                    e.call(this),
                    this.object = n,
                    this.name = r,
                    this.args = i
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t, n) {
                    var r = this.object.evaluate(e, t);
                    return n = n || w(e, this.args, t),
                    k(r, this.name).apply(r, n)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitCallMember(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o, s, a = this, l = this.object.connect(e, t), u = [];
                    for (l.observer && u.push(l.observer),
                    r = 0,
                    i = this.args.length; i > r; ++r)
                        o = this.args[r],
                        s = o.connect(e, t),
                        s.observer && u.push(s.observer);
                    return u.length && (n = new ne(u,function() {
                        return a.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.CallMember = he;
            var pe = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.func = n,
                    this.args = r
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t, n) {
                    var r = this.func.evaluate(e, t);
                    if ("function" != typeof r)
                        throw new Error(this.func + " is not a function");
                    return r.apply(null , n || w(e, this.args, t))
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitCallFunction(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o, s, a = this, l = this.func.connect(e, t), u = [];
                    for (l.observer && u.push(l.observer),
                    r = 0,
                    i = this.args.length; i > r; ++r)
                        o = this.args[r],
                        s = o.connect(e, t),
                        s.observer && u.push(s.observer);
                    return u.length && (n = new ne(u,function() {
                        return a.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.CallFunction = pe;
            var fe = function(e) {
                function t(n, r, i) {
                    a(this, t),
                    e.call(this),
                    this.operation = n,
                    this.left = r,
                    this.right = i
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n = this.left.evaluate(e);
                    switch (this.operation) {
                    case "&&":
                        return n && this.right.evaluate(e);
                    case "||":
                        return n || this.right.evaluate(e)
                    }
                    var r = this.right.evaluate(e);
                    switch (this.operation) {
                    case "==":
                        return n == r;
                    case "===":
                        return n === r;
                    case "!=":
                        return n != r;
                    case "!==":
                        return n !== r
                    }
                    if (null  === n || null  === r) {
                        switch (this.operation) {
                        case "+":
                            return null  != n ? n : null  != r ? r : 0;
                        case "-":
                            return null  != n ? n : null  != r ? 0 - r : 0
                        }
                        return null
                    }
                    switch (this.operation) {
                    case "+":
                        return x(n, r);
                    case "-":
                        return n - r;
                    case "*":
                        return n * r;
                    case "/":
                        return n / r;
                    case "%":
                        return n % r;
                    case "<":
                        return r > n;
                    case ">":
                        return n > r;
                    case "<=":
                        return r >= n;
                    case ">=":
                        return n >= r;
                    case "^":
                        return n ^ r;
                    case "&":
                        return n & r
                    }
                    throw new Error("Internal error [" + this.operation + "] not handled")
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitBinary(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r = this, i = this.left.connect(e, t), o = this.right.connect(e, t), s = [];
                    return i.observer && s.push(i.observer),
                    o.observer && s.push(o.observer),
                    s.length && (n = new ne(s,function() {
                        return r.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: this.evaluate(t, e.valueConverterLookupFunction),
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.Binary = fe;
            var me = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.operation = n,
                    this.expression = r
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return !this.expression.evaluate(e)
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitPrefix(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r = this, i = this.expression.connect(e, t);
                    return i.observer && (n = new ne([i.observer],function() {
                        return r.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: !i.value,
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.PrefixNot = me;
            var ge = function(e) {
                function t(n) {
                    a(this, t),
                    e.call(this),
                    this.value = n
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return this.value
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitLiteralPrimitive(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    return {
                        value: this.value
                    }
                }
                ,
                t
            }(re);
            e.LiteralPrimitive = ge;
            var ve = function(e) {
                function t(n) {
                    a(this, t),
                    e.call(this),
                    this.value = n
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    return this.value
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitLiteralString(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    return {
                        value: this.value
                    }
                }
                ,
                t
            }(re);
            e.LiteralString = ve;
            var ye = function(e) {
                function t(n) {
                    a(this, t),
                    e.call(this),
                    this.elements = n
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n, r = this.elements, i = r.length, o = [];
                    for (n = 0; i > n; ++n)
                        o[n] = r[n].evaluate(e, t);
                    return o
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitLiteralArray(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o, s, a = this, l = [], u = [];
                    for (r = 0,
                    i = this.elements.length; i > r; ++r)
                        o = this.elements[r],
                        s = o.connect(e, t),
                        s.observer && l.push(s.observer),
                        u[r] = s.value;
                    return l.length && (n = new ne(l,function() {
                        return a.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: u,
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.LiteralArray = ye;
            var be = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this),
                    this.keys = n,
                    this.values = r
                }
                return s(t, e),
                t.prototype.evaluate = function(e, t) {
                    var n, r = {}, i = this.keys, o = this.values, s = i.length;
                    for (n = 0; s > n; ++n)
                        r[i[n]] = o[n].evaluate(e, t);
                    return r
                }
                ,
                t.prototype.accept = function(e) {
                    e.visitLiteralObject(this)
                }
                ,
                t.prototype.connect = function(e, t) {
                    var n, r, i, o = this, s = [], a = {}, l = this.keys, u = this.values, c = l.length;
                    for (r = 0; c > r; ++r)
                        i = u[r].connect(e, t),
                        i.observer && s.push(i.observer),
                        a[l[r]] = i.value;
                    return s.length && (n = new ne(s,function() {
                        return o.evaluate(t, e.valueConverterLookupFunction)
                    }
                    )),
                    {
                        value: a,
                        observer: n
                    }
                }
                ,
                t
            }(re);
            e.LiteralObject = be;
            var we = function() {
                function e(t) {
                    a(this, e),
                    this.buffer = t
                }
                return e.unparse = function(t) {
                    var n = []
                      , r = new e(n);
                    return t.accept(r),
                    n.join("")
                }
                ,
                e.prototype.write = function(e) {
                    this.buffer.push(e)
                }
                ,
                e.prototype.writeArgs = function(e) {
                    var t, n;
                    for (this.write("("),
                    t = 0,
                    n = e.length; n > t; ++t)
                        0 !== t && this.write(","),
                        e[t].accept(this);
                    this.write(")")
                }
                ,
                e.prototype.visitChain = function(e) {
                    var t, n = e.expressions, r = n.length;
                    for (t = 0; r > t; ++t)
                        0 !== t && this.write(";"),
                        n[t].accept(this)
                }
                ,
                e.prototype.visitValueConverter = function(e) {
                    var t, n = e.args, r = n.length;
                    for (this.write("("),
                    e.expression.accept(this),
                    this.write("|" + e.name),
                    t = 0; r > t; ++t)
                        this.write(" :"),
                        n[t].accept(this);
                    this.write(")")
                }
                ,
                e.prototype.visitAssign = function(e) {
                    e.target.accept(this),
                    this.write("="),
                    e.value.accept(this)
                }
                ,
                e.prototype.visitConditional = function(e) {
                    e.condition.accept(this),
                    this.write("?"),
                    e.yes.accept(this),
                    this.write(":"),
                    e.no.accept(this)
                }
                ,
                e.prototype.visitAccessScope = function(e) {
                    this.write(e.name)
                }
                ,
                e.prototype.visitAccessMember = function(e) {
                    e.object.accept(this),
                    this.write("." + e.name)
                }
                ,
                e.prototype.visitAccessKeyed = function(e) {
                    e.object.accept(this),
                    this.write("["),
                    e.key.accept(this),
                    this.write("]")
                }
                ,
                e.prototype.visitCallScope = function(e) {
                    this.write(e.name),
                    this.writeArgs(e.args)
                }
                ,
                e.prototype.visitCallFunction = function(e) {
                    e.func.accept(this),
                    this.writeArgs(e.args)
                }
                ,
                e.prototype.visitCallMember = function(e) {
                    e.object.accept(this),
                    this.write("." + e.name),
                    this.writeArgs(e.args)
                }
                ,
                e.prototype.visitPrefix = function(e) {
                    this.write("(" + e.operation),
                    e.expression.accept(this),
                    this.write(")")
                }
                ,
                e.prototype.visitBinary = function(e) {
                    this.write("("),
                    e.left.accept(this),
                    this.write(e.operation),
                    e.right.accept(this),
                    this.write(")")
                }
                ,
                e.prototype.visitLiteralPrimitive = function(e) {
                    this.write("" + e.value)
                }
                ,
                e.prototype.visitLiteralArray = function(e) {
                    var t, n = e.elements, r = n.length;
                    for (this.write("["),
                    t = 0; r > t; ++t)
                        0 !== t && this.write(","),
                        n[t].accept(this);
                    this.write("]")
                }
                ,
                e.prototype.visitLiteralObject = function(e) {
                    var t, n = e.keys, r = e.values, i = n.length;
                    for (this.write("{"),
                    t = 0; i > t; ++t)
                        0 !== t && this.write(","),
                        this.write("'" + n[t] + "':"),
                        r[t].accept(this);
                    this.write("}")
                }
                ,
                e.prototype.visitLiteralString = function(e) {
                    var t = e.value.replace(/'/g, "'");
                    this.write("'" + t + "'")
                }
                ,
                e
            }();
            e.Unparser = we;
            var xe = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]]
              , ke = {
                oneTime: 0,
                oneWay: 1,
                twoWay: 2
            };
            e.bindingMode = ke;
            var je = function() {
                function e(t, n) {
                    a(this, e),
                    this.index = t,
                    this.text = n
                }
                return e.prototype.withOp = function(e) {
                    return this.opKey = e,
                    this
                }
                ,
                e.prototype.withGetterSetter = function(e) {
                    return this.key = e,
                    this
                }
                ,
                e.prototype.withValue = function(e) {
                    return this.value = e,
                    this
                }
                ,
                e.prototype.toString = function() {
                    return "Token(" + this.text + ")"
                }
                ,
                e
            }();
            e.Token = je;
            var Se = function() {
                function e() {
                    a(this, e)
                }
                return e.prototype.lex = function(e) {
                    for (var t = new Ce(e), n = [], r = t.scanToken(); r; )
                        n.push(r),
                        r = t.scanToken();
                    return n
                }
                ,
                e
            }();
            e.Lexer = Se;
            var Ce = function() {
                function e(t) {
                    a(this, e),
                    this.input = t,
                    this.length = t.length,
                    this.peek = 0,
                    this.index = -1,
                    this.advance()
                }
                return e.prototype.scanToken = function() {
                    for (; this.peek <= Ee; ) {
                        if (++this.index >= this.length)
                            return this.peek = Me,
                            null ;
                        this.peek = this.input.charCodeAt(this.index)
                    }
                    if (L(this.peek))
                        return this.scanIdentifier();
                    if (O(this.peek))
                        return this.scanNumber(this.index);
                    var e = this.index;
                    switch (this.peek) {
                    case He:
                        return this.advance(),
                        O(this.peek) ? this.scanNumber(e) : new je(e,".");
                    case Ie:
                    case Re:
                    case ct:
                    case ht:
                    case tt:
                    case rt:
                    case ze:
                    case We:
                    case qe:
                        return this.scanCharacter(e, String.fromCharCode(this.peek));
                    case Pe:
                    case Ae:
                        return this.scanString();
                    case Fe:
                    case Ve:
                    case _e:
                    case Be:
                    case Ne:
                    case it:
                    case Qe:
                        return this.scanOperator(e, String.fromCharCode(this.peek));
                    case Ue:
                    case Ke:
                    case Te:
                    case Ge:
                        return this.scanComplexOperator(e, Ge, String.fromCharCode(this.peek), "=");
                    case De:
                        return this.scanComplexOperator(e, De, "&", "&");
                    case dt:
                        return this.scanComplexOperator(e, dt, "|", "|");
                    case pt:
                        for (; C(this.peek); )
                            this.advance();
                        return this.scanToken()
                    }
                    var t = String.fromCharCode(this.peek);
                    return this.error("Unexpected character [" + t + "]"),
                    null
                }
                ,
                e.prototype.scanCharacter = function(e, t) {
                    return A(this.peek === t.charCodeAt(0)),
                    this.advance(),
                    new je(e,t)
                }
                ,
                e.prototype.scanOperator = function(e, t) {
                    return A(this.peek === t.charCodeAt(0)),
                    A(-1 !== Le.indexOf(t)),
                    this.advance(),
                    new je(e,t).withOp(t)
                }
                ,
                e.prototype.scanComplexOperator = function(e, t, n, r) {
                    A(this.peek === n.charCodeAt(0)),
                    this.advance();
                    var i = n;
                    return this.peek === t && (this.advance(),
                    i += r),
                    this.peek === t && (this.advance(),
                    i += r),
                    A(-1 != Le.indexOf(i)),
                    new je(e,i).withOp(i)
                }
                ,
                e.prototype.scanIdentifier = function() {
                    A(L(this.peek));
                    var e = this.index;
                    for (this.advance(); M(this.peek); )
                        this.advance();
                    var t = this.input.substring(e, this.index)
                      , n = new je(e,t);
                    return -1 !== Le.indexOf(t) ? n.withOp(t) : n.withGetterSetter(t),
                    n
                }
                ,
                e.prototype.scanNumber = function(e) {
                    A(O(this.peek));
                    var t = this.index === e;
                    for (this.advance(); ; ) {
                        if (O(this.peek))
                            ;
                        else if (this.peek === He)
                            t = !1;
                        else {
                            if (!E(this.peek))
                                break;
                            this.advance(),
                            T(this.peek) && this.advance(),
                            O(this.peek) || this.error("Invalid exponent", -1),
                            t = !1
                        }
                        this.advance()
                    }
                    var n = this.input.substring(e, this.index)
                      , r = t ? parseInt(n) : parseFloat(n);
                    return new je(e,n).withValue(r)
                }
                ,
                e.prototype.scanString = function() {
                    A(this.peek === Pe || this.peek === Ae);
                    var e = this.index
                      , t = this.peek;
                    this.advance();
                    for (var n, r = this.index; this.peek !== t; )
                        if (this.peek === nt) {
                            null  === n && (n = []),
                            n.push(this.input.substring(r, this.index)),
                            this.advance();
                            var i;
                            if (this.peek === lt) {
                                var o = this.input.substring(this.index + 1, this.index + 5);
                                /[A-Z0-9]{4}/.test(o) || this.error("Invalid unicode escape [\\u" + o + "]"),
                                i = parseInt(o, 16);
                                for (var s = 0; 5 > s; ++s)
                                    this.advance()
                            } else
                                i = decodeURIComponent(this.peek),
                                this.advance();
                            n.push(String.fromCharCode(i)),
                            r = this.index
                        } else
                            this.peek === Me ? this.error("Unterminated quote") : this.advance();
                    var a = this.input.substring(r, this.index);
                    this.advance();
                    var l = this.input.substring(e, this.index)
                      , i = a;
                    return null  != n && (n.push(a),
                    i = n.join("")),
                    new je(e,l).withValue(i)
                }
                ,
                e.prototype.advance = function() {
                    ++this.index >= this.length ? this.peek = Me : this.peek = this.input.charCodeAt(this.index)
                }
                ,
                e.prototype.error = function(e) {
                    var t = void 0 === arguments[1] ? 0 : arguments[1]
                      , n = this.index + t;
                    throw new Error("Lexer Error: " + e + " at column " + n + " in expression [" + this.input + "]")
                }
                ,
                e
            }();
            e.Scanner = Ce;
            var Le = ["undefined", "null", "true", "false", "+", "-", "*", "/", "%", "^", "=", "==", "===", "!=", "!==", "<", ">", "<=", ">=", "&&", "||", "&", "|", "!", "?"]
              , Me = 0
              , Oe = 9
              , Ee = 32
              , Te = 33
              , Ae = 34
              , $e = 36
              , Ne = 37
              , De = 38
              , Pe = 39
              , Ie = 40
              , Re = 41
              , _e = 42
              , Fe = 43
              , ze = 44
              , Ve = 45
              , He = 46
              , Be = 47
              , We = 58
              , qe = 59
              , Ue = 60
              , Ge = 61
              , Ke = 62
              , Qe = 63
              , Ye = 48
              , Xe = 57
              , Ze = 65
              , Je = 69
              , et = 90
              , tt = 91
              , nt = 92
              , rt = 93
              , it = 94
              , ot = 95
              , st = 97
              , at = 101
              , lt = 117
              , ut = 122
              , ct = 123
              , dt = 124
              , ht = 125
              , pt = 160
              , ft = new je(-1,null )
              , mt = function() {
                function e() {
                    a(this, e),
                    this.cache = {},
                    this.lexer = new Se
                }
                return e.prototype.parse = function(e) {
                    return e = e || "",
                    this.cache[e] || (this.cache[e] = new gt(this.lexer,e).parseChain())
                }
                ,
                e
            }();
            e.Parser = mt;
            var gt = function() {
                function e(t, n) {
                    a(this, e),
                    this.index = 0,
                    this.input = n,
                    this.tokens = t.lex(n)
                }
                return e.prototype.parseChain = function() {
                    for (var e = !1, t = []; this.optional(";"); )
                        e = !0;
                    for (; this.index < this.tokens.length; ) {
                        (")" === this.peek.text || "}" === this.peek.text || "]" === this.peek.text) && this.error("Unconsumed token " + this.peek.text);
                        var n = this.parseValueConverter();
                        for (t.push(n); this.optional(";"); )
                            e = !0;
                        e && n instanceof oe && this.error("cannot have a value converter in a chain")
                    }
                    return 1 === t.length ? t[0] : new ie(t)
                }
                ,
                e.prototype.parseValueConverter = function() {
                    for (var e = this.parseExpression(); this.optional("|"); ) {
                        var t = this.peek.text
                          , n = [];
                        for (this.advance(); this.optional(":"); )
                            n.push(this.parseExpression());
                        e = new oe(e,t,n,[e].concat(n))
                    }
                    return e
                }
                ,
                e.prototype.parseExpression = function() {
                    for (var e = this.peek.index, t = this.parseConditional(); "=" === this.peek.text; ) {
                        if (!t.isAssignable) {
                            var n = this.index < this.tokens.length ? this.peek.index : this.input.length
                              , r = this.input.substring(e, n);
                            this.error("Expression " + r + " is not assignable")
                        }
                        this.expect("="),
                        t = new se(t,this.parseConditional())
                    }
                    return t
                }
                ,
                e.prototype.parseConditional = function() {
                    var e = this.peek.index
                      , t = this.parseLogicalOr();
                    if (this.optional("?")) {
                        var n = this.parseExpression();
                        if (!this.optional(":")) {
                            var r = this.index < this.tokens.length ? this.peek.index : this.input.length
                              , i = this.input.substring(e, r);
                            this.error("Conditional expression " + i + " requires all 3 expressions")
                        }
                        var o = this.parseExpression();
                        t = new ae(t,n,o)
                    }
                    return t
                }
                ,
                e.prototype.parseLogicalOr = function() {
                    for (var e = this.parseLogicalAnd(); this.optional("||"); )
                        e = new fe("||",e,this.parseLogicalAnd());
                    return e
                }
                ,
                e.prototype.parseLogicalAnd = function() {
                    for (var e = this.parseEquality(); this.optional("&&"); )
                        e = new fe("&&",e,this.parseEquality());
                    return e
                }
                ,
                e.prototype.parseEquality = function() {
                    for (var e = this.parseRelational(); ; )
                        if (this.optional("=="))
                            e = new fe("==",e,this.parseRelational());
                        else if (this.optional("!="))
                            e = new fe("!=",e,this.parseRelational());
                        else if (this.optional("==="))
                            e = new fe("===",e,this.parseRelational());
                        else {
                            if (!this.optional("!=="))
                                return e;
                            e = new fe("!==",e,this.parseRelational())
                        }
                }
                ,
                e.prototype.parseRelational = function() {
                    for (var e = this.parseAdditive(); ; )
                        if (this.optional("<"))
                            e = new fe("<",e,this.parseAdditive());
                        else if (this.optional(">"))
                            e = new fe(">",e,this.parseAdditive());
                        else if (this.optional("<="))
                            e = new fe("<=",e,this.parseAdditive());
                        else {
                            if (!this.optional(">="))
                                return e;
                            e = new fe(">=",e,this.parseAdditive())
                        }
                }
                ,
                e.prototype.parseAdditive = function() {
                    for (var e = this.parseMultiplicative(); ; )
                        if (this.optional("+"))
                            e = new fe("+",e,this.parseMultiplicative());
                        else {
                            if (!this.optional("-"))
                                return e;
                            e = new fe("-",e,this.parseMultiplicative())
                        }
                }
                ,
                e.prototype.parseMultiplicative = function() {
                    for (var e = this.parsePrefix(); ; )
                        if (this.optional("*"))
                            e = new fe("*",e,this.parsePrefix());
                        else if (this.optional("%"))
                            e = new fe("%",e,this.parsePrefix());
                        else {
                            if (!this.optional("/"))
                                return e;
                            e = new fe("/",e,this.parsePrefix())
                        }
                }
                ,
                e.prototype.parsePrefix = function() {
                    return this.optional("+") ? this.parsePrefix() : this.optional("-") ? new fe("-",new ge(0),this.parsePrefix()) : this.optional("!") ? new me("!",this.parsePrefix()) : this.parseAccessOrCallMember()
                }
                ,
                e.prototype.parseAccessOrCallMember = function() {
                    for (var e = this.parsePrimary(); ; )
                        if (this.optional(".")) {
                            var t = this.peek.text;
                            if (this.advance(),
                            this.optional("(")) {
                                var n = this.parseExpressionList(")");
                                this.expect(")"),
                                e = new he(e,t,n)
                            } else
                                e = new ue(e,t)
                        } else if (this.optional("[")) {
                            var r = this.parseExpression();
                            this.expect("]"),
                            e = new ce(e,r)
                        } else {
                            if (!this.optional("("))
                                return e;
                            var n = this.parseExpressionList(")");
                            this.expect(")"),
                            e = new pe(e,n)
                        }
                }
                ,
                e.prototype.parsePrimary = function() {
                    if (this.optional("(")) {
                        var e = this.parseExpression();
                        return this.expect(")"),
                        e
                    }
                    if (this.optional("null") || this.optional("undefined"))
                        return new ge(null );
                    if (this.optional("true"))
                        return new ge(!0);
                    if (this.optional("false"))
                        return new ge(!1);
                    if (this.optional("[")) {
                        var t = this.parseExpressionList("]");
                        return this.expect("]"),
                        new ye(t)
                    }
                    if ("{" == this.peek.text)
                        return this.parseObject();
                    if (null  != this.peek.key)
                        return this.parseAccessOrCallScope();
                    if (null  != this.peek.value) {
                        var n = this.peek.value;
                        return this.advance(),
                        isNaN(n) ? new ve(n) : new ge(n)
                    }
                    if (this.index >= this.tokens.length)
                        throw new Error("Unexpected end of expression: " + this.input);
                    this.error("Unexpected token " + this.peek.text)
                }
                ,
                e.prototype.parseAccessOrCallScope = function() {
                    var e = this.peek.key;
                    if (this.advance(),
                    !this.optional("("))
                        return new le(e);
                    var t = this.parseExpressionList(")");
                    return this.expect(")"),
                    new de(e,t)
                }
                ,
                e.prototype.parseObject = function() {
                    var e = []
                      , t = [];
                    if (this.expect("{"),
                    "}" !== this.peek.text)
                        do {
                            var n = this.peek.value;
                            e.push("string" == typeof n ? n : this.peek.text),
                            this.advance(),
                            this.expect(":"),
                            t.push(this.parseExpression())
                        } while (this.optional(","));return this.expect("}"),
                    new be(e,t)
                }
                ,
                e.prototype.parseExpressionList = function(e) {
                    var t = [];
                    if (this.peek.text != e)
                        do
                            t.push(this.parseExpression());
                        while (this.optional(","));return t
                }
                ,
                e.prototype.optional = function(e) {
                    return this.peek.text === e ? (this.advance(),
                    !0) : !1
                }
                ,
                e.prototype.expect = function(e) {
                    this.peek.text === e ? this.advance() : this.error("Missing expected " + e)
                }
                ,
                e.prototype.advance = function() {
                    this.index++
                }
                ,
                e.prototype.error = function(e) {
                    var t = this.index < this.tokens.length ? "at column " + (this.tokens[this.index].index + 1) + " in" : "at the end of the expression";
                    throw new Error("Parser Error: " + e + " " + t + " [" + this.input + "]")
                }
                ,
                V(e, [{
                    key: "peek",
                    get: function() {
                        return this.index < this.tokens.length ? this.tokens[this.index] : ft
                    }
                }]),
                e
            }();
            e.ParserImplementation = gt;
            var vt = Map.prototype
              , yt = function(e) {
                function t(n, r) {
                    a(this, t),
                    e.call(this, n, r)
                }
                return s(t, e),
                t.create = function(e, n) {
                    var r = new t(e,n);
                    return n.set = function() {
                        var e = n.get(arguments[0])
                          , t = e ? "update" : "add"
                          , i = vt.set.apply(n, arguments);
                        return r.addChangeRecord({
                            type: t,
                            object: n,
                            key: arguments[0],
                            oldValue: e
                        }),
                        i
                    }
                    ,
                    n["delete"] = function() {
                        var e = n.get(arguments[0])
                          , t = vt["delete"].apply(n, arguments);
                        return r.addChangeRecord({
                            type: "delete",
                            object: n,
                            key: arguments[0],
                            oldValue: e
                        }),
                        t
                    }
                    ,
                    n.clear = function() {
                        var e = vt.clear.apply(n, arguments);
                        return r.addChangeRecord({
                            type: "clear",
                            object: n
                        }),
                        e
                    }
                    ,
                    r
                }
                ,
                t
            }(Y)
              , bt = function() {
                function e() {
                    a(this, e),
                    this.delegatedEvents = {}
                }
                return e.prototype.ensureDelegatedEvent = function(e) {
                    this.delegatedEvents[e] || (this.delegatedEvents[e] = !0,
                    document.addEventListener(e, this.handleDelegatedEvent.bind(this), !1))
                }
                ,
                e.prototype.handleCallbackResult = function(e) {}
                ,
                e.prototype.handleDelegatedEvent = function(e) {
                    e = e || window.event;
                    for (var t, n = e.target || e.srcElement; n && !t; )
                        n.delegatedEvents && (t = n.delegatedEvents[e.type]),
                        t || (n = n.parentNode);
                    t && this.handleCallbackResult(t(e))
                }
                ,
                e.prototype.createDirectEventCallback = function(e) {
                    var t = this;
                    return function(n) {
                        t.handleCallbackResult(e(n))
                    }
                }
                ,
                e.prototype.subscribeToDelegatedEvent = function(e, t, n) {
                    var r = e.delegatedEvents || (e.delegatedEvents = {});
                    return this.ensureDelegatedEvent(t),
                    r[t] = n,
                    function() {
                        r[t] = null
                    }
                }
                ,
                e.prototype.subscribeToDirectEvent = function(e, t, n) {
                    var r = this.createDirectEventCallback(n);
                    return e.addEventListener(t, r, !1),
                    function() {
                        e.removeEventListener(t, r)
                    }
                }
                ,
                e.prototype.subscribe = function(e, t, n, r) {
                    return r ? this.subscribeToDelegatedEvent(e, t, n) : this.subscribeToDirectEvent(e, t, n)
                }
                ,
                e
            }()
              , wt = function() {
                function e() {
                    a(this, e),
                    this.elementHandlerLookup = {},
                    this.eventStrategyLookup = {},
                    this.registerElementConfig({
                        tagName: "input",
                        properties: {
                            value: ["change", "input"],
                            checked: ["change", "input"]
                        }
                    }),
                    this.registerElementConfig({
                        tagName: "textarea",
                        properties: {
                            value: ["change", "input"]
                        }
                    }),
                    this.registerElementConfig({
                        tagName: "select",
                        properties: {
                            value: ["change"]
                        }
                    }),
                    this.registerElementConfig({
                        tagName: "content editable",
                        properties: {
                            value: ["change", "input", "blur", "keyup", "paste"]
                        }
                    }),
                    this.registerElementConfig({
                        tagName: "scrollable element",
                        properties: {
                            scrollTop: ["scroll"],
                            scrollLeft: ["scroll"]
                        }
                    }),
                    this.defaultEventStrategy = new bt
                }
                return e.prototype.registerElementConfig = function(e) {
                    var t, n = e.tagName.toLowerCase(), r = e.properties;
                    this.elementHandlerLookup[n] = {};
                    for (t in r)
                        r.hasOwnProperty(t) && this.registerElementPropertyConfig(n, t, r[t])
                }
                ,
                e.prototype.registerElementPropertyConfig = function(e, t, n) {
                    this.elementHandlerLookup[e][t] = {
                        subscribe: function(e, t) {
                            return n.forEach(function(n) {
                                e.addEventListener(n, t, !1)
                            }),
                            function() {
                                n.forEach(function(n) {
                                    e.removeEventListener(n, t)
                                })
                            }
                        }
                    }
                }
                ,
                e.prototype.registerElementHandler = function(e, t) {
                    this.elementHandlerLookup[e.toLowerCase()] = t
                }
                ,
                e.prototype.registerEventStrategy = function(e, t) {
                    this.eventStrategyLookup[e] = t
                }
                ,
                e.prototype.getElementHandler = function(e, t) {
                    var n, r = this.elementHandlerLookup;
                    if (e.tagName) {
                        if (n = e.tagName.toLowerCase(),
                        r[n] && r[n][t])
                            return r[n][t];
                        if ("textContent" === t || "innerHTML" === t)
                            return r["content editable"].value;
                        if ("scrollTop" === t || "scrollLeft" === t)
                            return r["scrollable element"][t]
                    }
                    return null
                }
                ,
                e.prototype.addEventListener = function(e, t, n, r) {
                    return (this.eventStrategyLookup[t] || this.defaultEventStrategy).subscribe(e, t, n, r)
                }
                ,
                e
            }();
            e.EventManager = wt;
            var xt = function() {
                function e() {
                    a(this, e),
                    this.tracked = [],
                    this.checkDelay = 120
                }
                return e.prototype.addProperty = function(e) {
                    var t = this.tracked;
                    t.push(e),
                    1 === t.length && this.scheduleDirtyCheck()
                }
                ,
                e.prototype.removeProperty = function(e) {
                    var t = this.tracked;
                    t.splice(t.indexOf(e), 1)
                }
                ,
                e.prototype.scheduleDirtyCheck = function() {
                    var e = this;
                    setTimeout(function() {
                        return e.check()
                    }, this.checkDelay)
                }
                ,
                e.prototype.check = function() {
                    for (var e = this.tracked, t = e.length; t--; ) {
                        var n = e[t];
                        n.isDirty() && n.call()
                    }
                    e.length && this.scheduleDirtyCheck()
                }
                ,
                e
            }();
            e.DirtyChecker = xt;
            var kt = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.dirtyChecker = t,
                    this.obj = n,
                    this.propertyName = r,
                    this.callbacks = [],
                    this.isSVG = n instanceof SVGElement
                }
                return e.prototype.getValue = function() {
                    return this.obj[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    this.isSVG ? this.obj.setAttributeNS(null , this.propertyName, e) : this.obj[this.propertyName] = e
                }
                ,
                e.prototype.call = function() {
                    for (var e = this.callbacks, t = e.length, n = this.oldValue, r = this.getValue(); t--; )
                        e[t](r, n);
                    this.oldValue = r
                }
                ,
                e.prototype.isDirty = function() {
                    return this.oldValue !== this.getValue()
                }
                ,
                e.prototype.beginTracking = function() {
                    this.tracking = !0,
                    this.oldValue = this.newValue = this.getValue(),
                    this.dirtyChecker.addProperty(this)
                }
                ,
                e.prototype.endTracking = function() {
                    this.tracking = !1,
                    this.dirtyChecker.removeProperty(this)
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this.callbacks
                      , n = this;
                    return t.push(e),
                    this.tracking || this.beginTracking(),
                    function() {
                        t.splice(t.indexOf(e), 1),
                        0 === t.length && n.endTracking()
                    }
                }
                ,
                e
            }();
            e.DirtyCheckProperty = kt;
            var jt = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.taskQueue = t,
                    this.obj = n,
                    this.propertyName = r,
                    this.callbacks = [],
                    this.queued = !1,
                    this.observing = !1
                }
                return e.prototype.getValue = function() {
                    return this.obj[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    this.obj[this.propertyName] = e
                }
                ,
                e.prototype.getterValue = function() {
                    return this.currentValue
                }
                ,
                e.prototype.setterValue = function(e) {
                    var t = this.currentValue;
                    t !== e && (this.queued || (this.oldValue = t,
                    this.queued = !0,
                    this.taskQueue.queueMicroTask(this)),
                    this.currentValue = e)
                }
                ,
                e.prototype.call = function() {
                    var e = this.callbacks
                      , t = e.length
                      , n = this.oldValue
                      , r = this.currentValue;
                    for (this.queued = !1; t--; )
                        e[t](r, n)
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this.callbacks;
                    return t.push(e),
                    this.observing || this.convertProperty(),
                    function() {
                        t.splice(t.indexOf(e), 1)
                    }
                }
                ,
                e.prototype.convertProperty = function() {
                    this.observing = !0,
                    this.currentValue = this.obj[this.propertyName],
                    this.setValue = this.setterValue,
                    this.getValue = this.getterValue;
                    try {
                        Object.defineProperty(this.obj, this.propertyName, {
                            configurable: !0,
                            enumerable: !0,
                            get: this.getValue.bind(this),
                            set: this.setValue.bind(this)
                        })
                    } catch (e) {}
                }
                ,
                e
            }();
            e.SetterObserver = jt;
            var St = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.obj = t,
                    this.propertyName = n,
                    this.subscribe = r
                }
                return e.prototype.getValue = function() {
                    return this.obj[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    this.obj[this.propertyName] = e
                }
                ,
                e
            }();
            e.OoPropertyObserver = St;
            var Ct = function() {
                function e(t, n) {
                    a(this, e),
                    this.obj = t,
                    this.observerLocator = n,
                    this.observers = {},
                    this.callbacks = {},
                    this.callbackCount = 0
                }
                return e.prototype.subscribe = function(e, t) {
                    if (this.callbacks[e] ? this.callbacks[e].push(t) : (this.callbacks[e] = [t],
                    this.callbacks[e].oldValue = this.obj[e]),
                    0 === this.callbackCount) {
                        this.handler = this.handleChanges.bind(this);
                        try {
                            Object.observe(this.obj, this.handler, ["update", "add"])
                        } catch (n) {}
                    }
                    return this.callbackCount++,
                    this.unsubscribe.bind(this, e, t)
                }
                ,
                e.prototype.unsubscribe = function(e, t) {
                    var n = this.callbacks[e]
                      , r = n.indexOf(t);
                    if (-1 !== r && (n.splice(r, 1),
                    (n.count = 0) && (n.oldValue = null ,
                    this.callbacks[e] = null ),
                    this.callbackCount--,
                    0 === this.callbackCount))
                        try {
                            Object.unobserve(this.obj, this.handler)
                        } catch (i) {}
                }
                ,
                e.prototype.getObserver = function(e, t) {
                    var n = this.observers[e];
                    return n || (n = t ? this.observers[e] = new St(this.obj,e,this.subscribe.bind(this, e)) : this.observers[e] = new Lt(this,this.obj,e)),
                    n
                }
                ,
                e.prototype.handleChanges = function(e) {
                    var t, n, r, i, o, s, a = {};
                    for (t = 0,
                    n = e.length; n > t; t++)
                        r = e[t],
                        a[r.name] = r;
                    for (name in a)
                        if (s = this.callbacks[name])
                            for (r = a[name],
                            o = r.object[name],
                            i = r.oldValue,
                            t = 0,
                            n = s.length; n > t; t++)
                                s[t](o, i)
                }
                ,
                e
            }();
            e.OoObjectObserver = Ct;
            var Lt = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.owner = t,
                    this.obj = n,
                    this.propertyName = r,
                    this.callbackMap = new Map
                }
                return e.prototype.getValue = function() {
                    return this.actual ? this.actual.getValue() : this.obj[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    return this.actual ? void this.actual.setValue(e) : (this.obj[this.propertyName] = e,
                    void this.trigger(e, void 0))
                }
                ,
                e.prototype.trigger = function(e, t) {
                    var n;
                    this.subscription && this.subscription(),
                    this.getObserver();
                    for (var r = this.callbackMap.keys(), i = Array.isArray(r), o = 0, r = i ? r : r[Symbol.iterator](); ; ) {
                        if (i) {
                            if (o >= r.length)
                                break;
                            n = r[o++]
                        } else {
                            if (o = r.next(),
                            o.done)
                                break;
                            n = o.value
                        }
                        n(e, t)
                    }
                }
                ,
                e.prototype.getObserver = function() {
                    var e, t;
                    if (Object.getOwnPropertyDescriptor(this.obj, this.propertyName)) {
                        t = this.owner.observerLocator,
                        delete this.owner.observers[this.propertyName],
                        delete t.getOrCreateObserversLookup(this.obj, t)[this.propertyName],
                        this.actual = t.getObserver(this.obj, this.propertyName);
                        for (var n = this.callbackMap.keys(), r = Array.isArray(n), i = 0, n = r ? n : n[Symbol.iterator](); ; ) {
                            if (r) {
                                if (i >= n.length)
                                    break;
                                e = n[i++]
                            } else {
                                if (i = n.next(),
                                i.done)
                                    break;
                                e = i.value
                            }
                            this.callbackMap.set(e, this.actual.subscribe(e))
                        }
                    }
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this;
                    return this.actual || this.getObserver(),
                    this.actual ? this.actual.subscribe(e) : (this.subscription || (this.subscription = this.owner.subscribe(this.propertyName, this.trigger.bind(this))),
                    this.callbackMap.set(e, null ),
                    function() {
                        var n = t.callbackMap.get(e);
                        n && n(),
                        t.callbackMap["delete"](e)
                    }
                    )
                }
                ,
                e
            }();
            e.UndefinedPropertyObserver = Lt;
            var Mt = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.element = t,
                    this.propertyName = n,
                    this.attributeName = r
                }
                return e.prototype.getValue = function() {
                    return this.element.getAttributeNS("http://www.w3.org/1999/xlink", this.attributeName)
                }
                ,
                e.prototype.setValue = function(e) {
                    return this.element.setAttributeNS("http://www.w3.org/1999/xlink", this.attributeName, e)
                }
                ,
                e.prototype.subscribe = function(e) {
                    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.')
                }
                ,
                e
            }();
            e.XLinkAttributeObserver = Mt;
            var Ot = function() {
                function e(t, n) {
                    a(this, e),
                    this.element = t,
                    this.propertyName = n
                }
                return e.prototype.getValue = function() {
                    return this.element.getAttribute(this.propertyName)
                }
                ,
                e.prototype.setValue = function(e) {
                    return this.element.setAttribute(this.propertyName, e)
                }
                ,
                e.prototype.subscribe = function(e) {
                    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.')
                }
                ,
                e
            }();
            e.DataAttributeObserver = Ot;
            var Et = function() {
                function e(t, n) {
                    a(this, e),
                    this.element = t,
                    this.propertyName = n
                }
                return e.prototype.getValue = function() {
                    return this.element.style.cssText
                }
                ,
                e.prototype.setValue = function(e) {
                    e instanceof Object && (e = this.flattenCss(e)),
                    this.element.style.cssText = e
                }
                ,
                e.prototype.subscribe = function(e) {
                    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.')
                }
                ,
                e.prototype.flattenCss = function(e) {
                    var t = "";
                    for (var n in e)
                        e.hasOwnProperty(n) && (t += n + ": " + e[n] + "; ");
                    return t
                }
                ,
                e
            }();
            e.StyleObserver = Et;
            var Tt = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.element = t,
                    this.propertyName = n,
                    this.handler = r,
                    this.callbacks = []
                }
                return e.prototype.getValue = function() {
                    return this.element[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    this.element[this.propertyName] = e,
                    this.call()
                }
                ,
                e.prototype.call = function() {
                    for (var e = this.callbacks, t = e.length, n = this.oldValue, r = this.getValue(); t--; )
                        e[t](r, n);
                    this.oldValue = r
                }
                ,
                e.prototype.subscribe = function(e) {
                    return this.disposeHandler || (this.oldValue = this.getValue(),
                    this.disposeHandler = this.handler.subscribe(this.element, this.call.bind(this))),
                    this.callbacks.push(e),
                    this.unsubscribe.bind(this, e)
                }
                ,
                e.prototype.unsubscribe = function(e) {
                    var t = this.callbacks;
                    t.splice(t.indexOf(e), 1),
                    0 === t.length && (this.disposeHandler(),
                    this.disposeHandler = null )
                }
                ,
                e
            }();
            e.ValueAttributeObserver = Tt;
            var At = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.element = t,
                    this.handler = n,
                    this.observerLocator = r
                }
                return e.prototype.getValue = function() {
                    return this.value
                }
                ,
                e.prototype.setValue = function(e) {
                    var t = this;
                    if (null  !== e && void 0 !== e && this.element.multiple && !Array.isArray(e))
                        throw new Error("Only null or Array instances can be bound to a multi-select.");
                    this.value !== e && (this.arraySubscription && (this.arraySubscription(),
                    this.arraySubscription = null ),
                    Array.isArray(e) && (this.arraySubscription = this.observerLocator.getArrayObserver(e).subscribe(this.synchronizeOptions.bind(this))),
                    this.value = e,
                    this.synchronizeOptions(),
                    this.element.options.length > 0 && !this.initialSync && (this.initialSync = !0,
                    this.observerLocator.taskQueue.queueMicroTask({
                        call: function() {
                            return t.synchronizeOptions()
                        }
                    })))
                }
                ,
                e.prototype.synchronizeOptions = function() {
                    var e, t, n, r, i, o, s = this.value;
                    for (null  === s || void 0 === s ? i = !0 : Array.isArray(s) && (o = !0),
                    t = this.element.options,
                    e = t.length; e--; )
                        n = t.item(e),
                        i ? n.selected = !1 : (r = n.hasOwnProperty("model") ? n.model : n.value,
                        o ? n.selected = -1 !== s.indexOf(r) : n.selected = s === r)
                }
                ,
                e.prototype.synchronizeValue = function() {
                    var e, t, n, r = this.element.options, i = 0, o = [];
                    for (t = 0,
                    n = r.length; n > t; t++)
                        e = r.item(t),
                        e.selected && (o[i] = e.hasOwnProperty("model") ? e.model : e.value,
                        i++);
                    this.element.multiple || (o = 0 === i ? null  : o[0]),
                    this.oldValue = this.value,
                    this.value = o,
                    this.call()
                }
                ,
                e.prototype.call = function() {
                    for (var e = this.callbacks, t = e.length, n = this.oldValue, r = this.value; t--; )
                        e[t](r, n)
                }
                ,
                e.prototype.subscribe = function(e) {
                    return this.callbacks || (this.callbacks = [],
                    this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, !1))),
                    this.callbacks.push(e),
                    this.unsubscribe.bind(this, e)
                }
                ,
                e.prototype.unsubscribe = function(e) {
                    var t = this.callbacks;
                    t.splice(t.indexOf(e), 1),
                    0 === t.length && (this.disposeHandler(),
                    this.disposeHandler = null ,
                    this.callbacks = null )
                }
                ,
                e.prototype.bind = function() {
                    var e = this;
                    this.domObserver = new MutationObserver(function() {
                        e.synchronizeOptions(),
                        e.synchronizeValue()
                    }
                    ),
                    this.domObserver.observe(this.element, {
                        childList: !0,
                        subtree: !0
                    })
                }
                ,
                e.prototype.unbind = function() {
                    this.domObserver.disconnect(),
                    this.domObserver = null ,
                    this.arraySubscription && (this.arraySubscription(),
                    this.arraySubscription = null )
                }
                ,
                e
            }();
            e.SelectValueObserver = At;
            var $t = function() {
                function e(t, n, r) {
                    a(this, e),
                    this.element = t,
                    this.handler = n,
                    this.observerLocator = r
                }
                return e.prototype.getValue = function() {
                    return this.value
                }
                ,
                e.prototype.setValue = function(e) {
                    var t = this;
                    this.value !== e && (this.arraySubscription && (this.arraySubscription(),
                    this.arraySubscription = null ),
                    "checkbox" === this.element.type && Array.isArray(e) && (this.arraySubscription = this.observerLocator.getArrayObserver(e).subscribe(this.synchronizeElement.bind(this))),
                    this.value = e,
                    this.synchronizeElement(),
                    this.element.hasOwnProperty("model") || this.initialSync || (this.initialSync = !0,
                    this.observerLocator.taskQueue.queueMicroTask({
                        call: function() {
                            return t.synchronizeElement()
                        }
                    })))
                }
                ,
                e.prototype.synchronizeElement = function() {
                    var e = this.value
                      , t = this.element
                      , n = t.hasOwnProperty("model") ? t.model : t.value
                      , r = "radio" === t.type;
                    t.checked = r && e === n || !r && e === !0 || !r && Array.isArray(e) && -1 !== e.indexOf(n)
                }
                ,
                e.prototype.synchronizeValue = function() {
                    var e, t = this.value, n = this.element, r = n.hasOwnProperty("model") ? n.model : n.value;
                    if ("checkbox" === n.type) {
                        if (Array.isArray(t))
                            return e = t.indexOf(r),
                            void (n.checked && -1 === e ? t.push(r) : n.checked || -1 === e || t.splice(e, 1));
                        t = n.checked
                    } else {
                        if (!n.checked)
                            return;
                        t = r
                    }
                    this.oldValue = this.value,
                    this.value = t,
                    this.call()
                }
                ,
                e.prototype.call = function() {
                    for (var e = this.callbacks, t = e.length, n = this.oldValue, r = this.value; t--; )
                        e[t](r, n)
                }
                ,
                e.prototype.subscribe = function(e) {
                    return this.callbacks || (this.callbacks = [],
                    this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, !1))),
                    this.callbacks.push(e),
                    this.unsubscribe.bind(this, e)
                }
                ,
                e.prototype.unsubscribe = function(e) {
                    var t = this.callbacks;
                    t.splice(t.indexOf(e), 1),
                    0 === t.length && (this.disposeHandler(),
                    this.disposeHandler = null ,
                    this.callbacks = null )
                }
                ,
                e.prototype.unbind = function() {
                    this.arraySubscription && (this.arraySubscription(),
                    this.arraySubscription = null )
                }
                ,
                e
            }();
            e.CheckedObserver = $t;
            var Nt = function() {
                function e(t) {
                    a(this, e),
                    this.element = t,
                    this.doNotCache = !0,
                    this.value = "",
                    this.version = 0
                }
                return e.prototype.getValue = function() {
                    return this.value
                }
                ,
                e.prototype.setValue = function(e) {
                    var t, n, r, i = this.nameIndex || {}, o = this.version;
                    if (null  !== e && void 0 !== e && e.length)
                        for (t = e.split(" "),
                        r = t.length; r--; )
                            n = t[r],
                            "" !== n && (i[n] = o,
                            this.element.classList.add(n));
                    if (this.value = e,
                    this.nameIndex = i,
                    this.version += 1,
                    0 !== o) {
                        o -= 1;
                        for (n in i)
                            i.hasOwnProperty(n) && i[n] === o && this.element.classList.remove(n)
                    }
                }
                ,
                e.prototype.subscribe = function(e) {
                    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.')
                }
                ,
                e
            }();
            e.ClassObserver = Nt;
            var Dt = function() {
                function e(t, n, r, i) {
                    a(this, e),
                    this.obj = t,
                    this.propertyName = n,
                    this.descriptor = r,
                    this.observerLocator = i,
                    this.callbacks = []
                }
                return e.prototype.getValue = function() {
                    return this.obj[this.propertyName]
                }
                ,
                e.prototype.setValue = function(e) {
                    throw new Error("Computed properties cannot be assigned.")
                }
                ,
                e.prototype.trigger = function(e, t) {
                    for (var n = this.callbacks, r = n.length; r--; )
                        n[r](e, t)
                }
                ,
                e.prototype.evaluate = function() {
                    var e = this.getValue();
                    this.oldValue !== e && (this.trigger(e, this.oldValue),
                    this.oldValue = e)
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t, n, r, i = this;
                    if (this.callbacks.push(e),
                    void 0 === this.oldValue)
                        for (this.oldValue = this.getValue(),
                        this.subscriptions = [],
                        t = this.descriptor.get.dependencies,
                        n = 0,
                        r = t.length; r > n; n++)
                            this.subscriptions.push(this.observerLocator.getObserver(this.obj, t[n]).subscribe(function() {
                                return i.evaluate()
                            }));
                    return function() {
                        if (i.callbacks.splice(i.callbacks.indexOf(e), 1),
                        !(i.callbacks.length > 0)) {
                            for (; i.subscriptions.length; )
                                i.subscriptions.pop()();
                            i.oldValue = void 0
                        }
                    }
                }
                ,
                e
            }();
            e.ComputedPropertyObserver = Dt;
            var Pt = {
                a: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "target", "transform", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                altGlyph: ["class", "dx", "dy", "externalResourcesRequired", "format", "glyphRef", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                altGlyphDef: ["id", "xml:base", "xml:lang", "xml:space"],
                altGlyphItem: ["id", "xml:base", "xml:lang", "xml:space"],
                animate: ["accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                animateColor: ["accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                animateMotion: ["accumulate", "additive", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keyPoints", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "origin", "path", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "rotate", "systemLanguage", "to", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                animateTransform: ["accumulate", "additive", "attributeName", "attributeType", "begin", "by", "calcMode", "dur", "end", "externalResourcesRequired", "fill", "from", "id", "keySplines", "keyTimes", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "type", "values", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                circle: ["class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "r", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                clipPath: ["class", "clipPathUnits", "externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                "color-profile": ["id", "local", "name", "rendering-intent", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                cursor: ["externalResourcesRequired", "id", "requiredExtensions", "requiredFeatures", "systemLanguage", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                defs: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                desc: ["class", "id", "style", "xml:base", "xml:lang", "xml:space"],
                ellipse: ["class", "cx", "cy", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                feBlend: ["class", "height", "id", "in", "in2", "mode", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feColorMatrix: ["class", "height", "id", "in", "result", "style", "type", "values", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feComponentTransfer: ["class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feComposite: ["class", "height", "id", "in", "in2", "k1", "k2", "k3", "k4", "operator", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feConvolveMatrix: ["bias", "class", "divisor", "edgeMode", "height", "id", "in", "kernelMatrix", "kernelUnitLength", "order", "preserveAlpha", "result", "style", "targetX", "targetY", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feDiffuseLighting: ["class", "diffuseConstant", "height", "id", "in", "kernelUnitLength", "result", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feDisplacementMap: ["class", "height", "id", "in", "in2", "result", "scale", "style", "width", "x", "xChannelSelector", "xml:base", "xml:lang", "xml:space", "y", "yChannelSelector"],
                feDistantLight: ["azimuth", "elevation", "id", "xml:base", "xml:lang", "xml:space"],
                feFlood: ["class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feFuncA: ["amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space"],
                feFuncB: ["amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space"],
                feFuncG: ["amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space"],
                feFuncR: ["amplitude", "exponent", "id", "intercept", "offset", "slope", "tableValues", "type", "xml:base", "xml:lang", "xml:space"],
                feGaussianBlur: ["class", "height", "id", "in", "result", "stdDeviation", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feImage: ["class", "externalResourcesRequired", "height", "id", "preserveAspectRatio", "result", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                feMerge: ["class", "height", "id", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feMergeNode: ["id", "xml:base", "xml:lang", "xml:space"],
                feMorphology: ["class", "height", "id", "in", "operator", "radius", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feOffset: ["class", "dx", "dy", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                fePointLight: ["id", "x", "xml:base", "xml:lang", "xml:space", "y", "z"],
                feSpecularLighting: ["class", "height", "id", "in", "kernelUnitLength", "result", "specularConstant", "specularExponent", "style", "surfaceScale", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feSpotLight: ["id", "limitingConeAngle", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "x", "xml:base", "xml:lang", "xml:space", "y", "z"],
                feTile: ["class", "height", "id", "in", "result", "style", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                feTurbulence: ["baseFrequency", "class", "height", "id", "numOctaves", "result", "seed", "stitchTiles", "style", "type", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                filter: ["class", "externalResourcesRequired", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "style", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                font: ["class", "externalResourcesRequired", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space"],
                "font-face": ["accent-height", "alphabetic", "ascent", "bbox", "cap-height", "descent", "font-family", "font-size", "font-stretch", "font-style", "font-variant", "font-weight", "hanging", "id", "ideographic", "mathematical", "overline-position", "overline-thickness", "panose-1", "slope", "stemh", "stemv", "strikethrough-position", "strikethrough-thickness", "underline-position", "underline-thickness", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "widths", "x-height", "xml:base", "xml:lang", "xml:space"],
                "font-face-format": ["id", "string", "xml:base", "xml:lang", "xml:space"],
                "font-face-name": ["id", "name", "xml:base", "xml:lang", "xml:space"],
                "font-face-src": ["id", "xml:base", "xml:lang", "xml:space"],
                "font-face-uri": ["id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                foreignObject: ["class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                g: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                glyph: ["arabic-form", "class", "d", "glyph-name", "horiz-adv-x", "id", "lang", "orientation", "style", "unicode", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space"],
                glyphRef: ["class", "dx", "dy", "format", "glyphRef", "id", "style", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                hkern: ["g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space"],
                image: ["class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                line: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "x1", "x2", "xml:base", "xml:lang", "xml:space", "y1", "y2"],
                linearGradient: ["class", "externalResourcesRequired", "gradientTransform", "gradientUnits", "id", "spreadMethod", "style", "x1", "x2", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y1", "y2"],
                marker: ["class", "externalResourcesRequired", "id", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "style", "viewBox", "xml:base", "xml:lang", "xml:space"],
                mask: ["class", "externalResourcesRequired", "height", "id", "maskContentUnits", "maskUnits", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                metadata: ["id", "xml:base", "xml:lang", "xml:space"],
                "missing-glyph": ["class", "d", "horiz-adv-x", "id", "style", "vert-adv-y", "vert-origin-x", "vert-origin-y", "xml:base", "xml:lang", "xml:space"],
                mpath: ["externalResourcesRequired", "id", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                path: ["class", "d", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "pathLength", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                pattern: ["class", "externalResourcesRequired", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                polygon: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                polyline: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "points", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                radialGradient: ["class", "cx", "cy", "externalResourcesRequired", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "spreadMethod", "style", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                rect: ["class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rx", "ry", "style", "systemLanguage", "transform", "width", "x", "xml:base", "xml:lang", "xml:space", "y"],
                script: ["externalResourcesRequired", "id", "type", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                set: ["attributeName", "attributeType", "begin", "dur", "end", "externalResourcesRequired", "fill", "id", "max", "min", "onbegin", "onend", "onload", "onrepeat", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "restart", "systemLanguage", "to", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                stop: ["class", "id", "offset", "style", "xml:base", "xml:lang", "xml:space"],
                style: ["id", "media", "title", "type", "xml:base", "xml:lang", "xml:space"],
                svg: ["baseProfile", "class", "contentScriptType", "contentStyleType", "externalResourcesRequired", "height", "id", "onabort", "onactivate", "onclick", "onerror", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onresize", "onscroll", "onunload", "onzoom", "preserveAspectRatio", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "version", "viewBox", "width", "x", "xml:base", "xml:lang", "xml:space", "y", "zoomAndPan"],
                "switch": ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "xml:base", "xml:lang", "xml:space"],
                symbol: ["class", "externalResourcesRequired", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "preserveAspectRatio", "style", "viewBox", "xml:base", "xml:lang", "xml:space"],
                text: ["class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "transform", "x", "xml:base", "xml:lang", "xml:space", "y"],
                textPath: ["class", "externalResourcesRequired", "id", "lengthAdjust", "method", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "textLength", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space"],
                title: ["class", "id", "style", "xml:base", "xml:lang", "xml:space"],
                tref: ["class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                tspan: ["class", "dx", "dy", "externalResourcesRequired", "id", "lengthAdjust", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "rotate", "style", "systemLanguage", "textLength", "x", "xml:base", "xml:lang", "xml:space", "y"],
                use: ["class", "externalResourcesRequired", "height", "id", "onactivate", "onclick", "onfocusin", "onfocusout", "onload", "onmousedown", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "requiredExtensions", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type", "xml:base", "xml:lang", "xml:space", "y"],
                view: ["externalResourcesRequired", "id", "preserveAspectRatio", "viewBox", "viewTarget", "xml:base", "xml:lang", "xml:space", "zoomAndPan"],
                vkern: ["g1", "g2", "id", "k", "u1", "u2", "xml:base", "xml:lang", "xml:space"]
            };
            e.elements = Pt;
            var It = {
                a: !0,
                altGlyph: !0,
                animate: !0,
                animateColor: !0,
                circle: !0,
                clipPath: !0,
                defs: !0,
                ellipse: !0,
                feBlend: !0,
                feColorMatrix: !0,
                feComponentTransfer: !0,
                feComposite: !0,
                feConvolveMatrix: !0,
                feDiffuseLighting: !0,
                feDisplacementMap: !0,
                feFlood: !0,
                feGaussianBlur: !0,
                feImage: !0,
                feMerge: !0,
                feMorphology: !0,
                feOffset: !0,
                feSpecularLighting: !0,
                feTile: !0,
                feTurbulence: !0,
                filter: !0,
                font: !0,
                foreignObject: !0,
                g: !0,
                glyph: !0,
                glyphRef: !0,
                image: !0,
                line: !0,
                linearGradient: !0,
                marker: !0,
                mask: !0,
                "missing-glyph": !0,
                path: !0,
                pattern: !0,
                polygon: !0,
                polyline: !0,
                radialGradient: !0,
                rect: !0,
                stop: !0,
                svg: !0,
                "switch": !0,
                symbol: !0,
                text: !0,
                textPath: !0,
                tref: !0,
                tspan: !0,
                use: !0
            };
            e.presentationElements = It;
            var Rt = {
                "alignment-baseline": !0,
                "baseline-shift": !0,
                "clip-path": !0,
                "clip-rule": !0,
                clip: !0,
                "color-interpolation-filters": !0,
                "color-interpolation": !0,
                "color-profile": !0,
                "color-rendering": !0,
                color: !0,
                cursor: !0,
                direction: !0,
                display: !0,
                "dominant-baseline": !0,
                "enable-background": !0,
                "fill-opacity": !0,
                "fill-rule": !0,
                fill: !0,
                filter: !0,
                "flood-color": !0,
                "flood-opacity": !0,
                "font-family": !0,
                "font-size-adjust": !0,
                "font-size": !0,
                "font-stretch": !0,
                "font-style": !0,
                "font-variant": !0,
                "font-weight": !0,
                "glyph-orientation-horizontal": !0,
                "glyph-orientation-vertical": !0,
                "image-rendering": !0,
                kerning: !0,
                "letter-spacing": !0,
                "lighting-color": !0,
                "marker-end": !0,
                "marker-mid": !0,
                "marker-start": !0,
                mask: !0,
                opacity: !0,
                overflow: !0,
                "pointer-events": !0,
                "shape-rendering": !0,
                "stop-color": !0,
                "stop-opacity": !0,
                "stroke-dasharray": !0,
                "stroke-dashoffset": !0,
                "stroke-linecap": !0,
                "stroke-linejoin": !0,
                "stroke-miterlimit": !0,
                "stroke-opacity": !0,
                "stroke-width": !0,
                stroke: !0,
                "text-anchor": !0,
                "text-decoration": !0,
                "text-rendering": !0,
                "unicode-bidi": !0,
                visibility: !0,
                "word-spacing": !0,
                "writing-mode": !0
            };
            e.presentationAttributes = Rt,
            "altglyph" === I("<svg><altGlyph /></svg>").firstElementChild.nodeName && (Pt.altglyph = Pt.altGlyph,
            delete Pt.altGlyph,
            Pt.altglyphdef = Pt.altGlyphDef,
            delete Pt.altGlyphDef,
            Pt.altglyphitem = Pt.altGlyphItem,
            delete Pt.altGlyphItem,
            Pt.glyphref = Pt.glyphRef,
            delete Pt.glyphRef),
            "function" != typeof Object.getPropertyDescriptor && (Object.getPropertyDescriptor = function(e, t) {
                for (var n = Object.getOwnPropertyDescriptor(e, t), r = Object.getPrototypeOf(e); "undefined" == typeof n && null  !== r; )
                    n = Object.getOwnPropertyDescriptor(r, t),
                    r = Object.getPrototypeOf(r);
                return n
            }
            );
            var _t = function() {
                function e(t, n, r, i) {
                    a(this, e),
                    this.taskQueue = t,
                    this.eventManager = n,
                    this.dirtyChecker = r,
                    this.observationAdapters = i
                }
                return e.inject = function() {
                    return [n.TaskQueue, wt, xt, r.All.of(Ft)]
                }
                ,
                e.prototype.getObserver = function(e, t) {
                    var n, r = e.__observers__;
                    return r && t in r ? r[t] : (n = this.createPropertyObserver(e, t),
                    n.doNotCache || (void 0 === r && (r = this.getOrCreateObserversLookup(e)),
                    r[t] = n),
                    n)
                }
                ,
                e.prototype.getOrCreateObserversLookup = function(e) {
                    return e.__observers__ || this.createObserversLookup(e)
                }
                ,
                e.prototype.createObserversLookup = function(e) {
                    var t = {};
                    try {
                        Object.defineProperty(e, "__observers__", {
                            enumerable: !1,
                            configurable: !1,
                            writable: !1,
                            value: t
                        })
                    } catch (n) {}
                    return t
                }
                ,
                e.prototype.getObservationAdapter = function(e, t, n) {
                    var r, i, o;
                    for (r = 0,
                    i = this.observationAdapters.length; i > r; r++)
                        if (o = this.observationAdapters[r],
                        o.handlesProperty(e, t, n))
                            return o;
                    return null
                }
                ,
                e.prototype.createPropertyObserver = function(e, t) {
                    var n, r, i, o, s;
                    if (e instanceof Element) {
                        if ("class" === t)
                            return new Nt(e);
                        if ("style" === t || "css" === t)
                            return new Et(e,t);
                        if (i = this.eventManager.getElementHandler(e, t),
                        "value" === t && "select" === e.tagName.toLowerCase())
                            return new At(e,i,this);
                        if ("checked" === t && "input" === e.tagName.toLowerCase())
                            return new $t(e,i,this);
                        if (i)
                            return new Tt(e,t,i);
                        if (s = /^xlink:(.+)$/.exec(t))
                            return new Mt(e,t,s[1]);
                        if (/^\w+:|^data-|^aria-/.test(t) || e instanceof SVGElement && P(e.nodeName, t))
                            return new Ot(e,t)
                    }
                    if (r = Object.getPropertyDescriptor(e, t),
                    N(r))
                        return new Dt(e,t,r,this);
                    var a = void 0;
                    return r && (a = r.get || r.set) ? a.getObserver ? a.getObserver(e) : (o = this.getObservationAdapter(e, t, r),
                    o ? o.getObserver(e, t, r) : new kt(this.dirtyChecker,e,t)) : K ? (n = e.__observer__ || R(e, this),
                    n.getObserver(t, r)) : e instanceof Array ? "length" === t ? this.getArrayObserver(e).getLengthObserver() : new kt(this.dirtyChecker,e,t) : e instanceof Map ? "size" === t ? this.getMapObserver(e).getLengthObserver() : new kt(this.dirtyChecker,e,t) : new jt(this.taskQueue,e,t)
                }
                ,
                e.prototype.getArrayObserver = function(e) {
                    return "__array_observer__" in e ? e.__array_observer__ : e.__array_observer__ = b(this.taskQueue, e)
                }
                ,
                e.prototype.getMapObserver = function(e) {
                    return "__map_observer__" in e ? e.__map_observer__ : e.__map_observer__ = $(this.taskQueue, e)
                }
                ,
                e
            }();
            e.ObserverLocator = _t;
            var Ft = function() {
                function e() {
                    a(this, e)
                }
                return e.prototype.handlesProperty = function(e, t, n) {
                    throw new Error("BindingAdapters must implement handlesProperty(object, propertyName).")
                }
                ,
                e.prototype.getObserver = function(e, t, n) {
                    throw new Error("BindingAdapters must implement createObserver(object, propertyName).")
                }
                ,
                e
            }();
            e.ObjectObservationAdapter = Ft;
            var zt = function() {
                function e(t, n, r, i, o, s) {
                    a(this, e),
                    this.observerLocator = t,
                    this.targetProperty = n,
                    this.sourceExpression = r,
                    this.mode = i,
                    this.valueConverterLookupFunction = o,
                    this.attribute = s,
                    this.discrete = !1
                }
                return e.prototype.createBinding = function(e) {
                    return new Vt(this.observerLocator,this.sourceExpression,e,this.targetProperty,this.mode,this.valueConverterLookupFunction)
                }
                ,
                e.create = function(t, n) {
                    var i = void 0 === arguments[2] ? ke.oneWay : arguments[2]
                      , o = r.Container.instance.get(mt)
                      , s = r.Container.instance.get(_t);
                    return new e(s,t,o.parse(n),i)
                }
                ,
                e
            }();
            e.BindingExpression = zt;
            var Vt = function() {
                function e(t, n, r, i, o, s) {
                    a(this, e),
                    this.observerLocator = t,
                    this.sourceExpression = n,
                    this.targetProperty = t.getObserver(r, i),
                    this.mode = o,
                    this.valueConverterLookupFunction = s
                }
                return e.prototype.getObserver = function(e, t) {
                    return this.observerLocator.getObserver(e, t)
                }
                ,
                e.prototype.bind = function(e) {
                    var t, n = this, r = this.targetProperty;
                    if ("bind" in r && r.bind(),
                    this.mode == ke.oneWay || this.mode == ke.twoWay) {
                        if (this._disposeObserver) {
                            if (this.source === e)
                                return;
                            this.unbind()
                        }
                        t = this.sourceExpression.connect(this, e),
                        t.observer && (this._disposeObserver = t.observer.subscribe(function(e) {
                            var t = r.getValue();
                            e !== t && r.setValue(e)
                        })),
                        void 0 !== t.value && r.setValue(t.value),
                        this.mode == ke.twoWay && (this._disposeListener = r.subscribe(function(t) {
                            n.sourceExpression.assign(e, t, n.valueConverterLookupFunction)
                        })),
                        this.source = e
                    } else {
                        var i = this.sourceExpression.evaluate(e, this.valueConverterLookupFunction);
                        void 0 !== i && r.setValue(i)
                    }
                }
                ,
                e.prototype.unbind = function() {
                    "unbind" in this.targetProperty && this.targetProperty.unbind(),
                    this._disposeObserver && (this._disposeObserver(),
                    this._disposeObserver = null ),
                    this._disposeListener && (this._disposeListener(),
                    this._disposeListener = null )
                }
                ,
                e
            }()
              , Ht = function() {
                function e(t, n, r, i) {
                    a(this, e),
                    this.observerLocator = t,
                    this.targetProperty = n,
                    this.sourceExpression = r,
                    this.valueConverterLookupFunction = i
                }
                return e.prototype.createBinding = function(e) {
                    return new Bt(this.observerLocator,this.sourceExpression,e,this.targetProperty,this.valueConverterLookupFunction)
                }
                ,
                e
            }();
            e.CallExpression = Ht;
            var Bt = function() {
                function e(t, n, r, i, o) {
                    a(this, e),
                    this.sourceExpression = n,
                    this.target = r,
                    this.targetProperty = t.getObserver(r, i),
                    this.valueConverterLookupFunction = o
                }
                return e.prototype.bind = function(e) {
                    var t = this;
                    this.source !== e && (this.source && this.unbind(),
                    this.source = e,
                    this.targetProperty.setValue(function(n) {
                        var r, i = e.$event;
                        return e.$event = n,
                        r = t.sourceExpression.evaluate(e, t.valueConverterLookupFunction),
                        e.$event = i,
                        r
                    }))
                }
                ,
                e.prototype.unbind = function() {
                    this.targetProperty.setValue(null )
                }
                ,
                e
            }();
            "classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) ? !function() {
                var e = document.createElement("_");
                if (e.classList.add("c1", "c2"),
                !e.classList.contains("c2")) {
                    var t = function(e) {
                        var t = DOMTokenList.prototype[e];
                        DOMTokenList.prototype[e] = function(e) {
                            var n, r = arguments.length;
                            for (n = 0; r > n; n++)
                                e = arguments[n],
                                t.call(this, e)
                        }
                    }
                    ;
                    t("add"),
                    t("remove")
                }
                if (e.classList.toggle("c3", !1),
                e.classList.contains("c3")) {
                    var n = DOMTokenList.prototype.toggle;
                    DOMTokenList.prototype.toggle = function(e, t) {
                        return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
                    }
                }
                e = null
            }() : !function(e) {
                if ("Element" in e) {
                    var t = "classList"
                      , n = "prototype"
                      , r = e.Element[n]
                      , i = Object
                      , o = String[n].trim || function() {
                        return this.replace(/^\s+|\s+$/g, "")
                    }
                      , s = Array[n].indexOf || function(e) {
                        for (var t = 0, n = this.length; n > t; t++)
                            if (t in this && this[t] === e)
                                return t;
                        return -1
                    }
                      , a = function(e, t) {
                        this.name = e,
                        this.code = DOMException[e],
                        this.message = t
                    }
                      , l = function(e, t) {
                        if ("" === t)
                            throw new a("SYNTAX_ERR","An invalid or illegal string was specified");
                        if (/\s/.test(t))
                            throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");
                        return s.call(e, t)
                    }
                      , u = function(e) {
                        for (var t = o.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length; i > r; r++)
                            this.push(n[r]);
                        this._updateClassName = function() {
                            e.setAttribute("class", this.toString())
                        }
                    }
                      , c = u[n] = []
                      , d = function() {
                        return new u(this)
                    }
                    ;
                    if (a[n] = Error[n],
                    c.item = function(e) {
                        return this[e] || null
                    }
                    ,
                    c.contains = function(e) {
                        return e += "",
                        -1 !== l(this, e)
                    }
                    ,
                    c.add = function() {
                        var e, t = arguments, n = 0, r = t.length, i = !1;
                        do
                            e = t[n] + "",
                            -1 === l(this, e) && (this.push(e),
                            i = !0);
                        while (++n < r);i && this._updateClassName()
                    }
                    ,
                    c.remove = function() {
                        var e, t, n = arguments, r = 0, i = n.length, o = !1;
                        do
                            for (e = n[r] + "",
                            t = l(this, e); -1 !== t; )
                                this.splice(t, 1),
                                o = !0,
                                t = l(this, e);
                        while (++r < i);o && this._updateClassName()
                    }
                    ,
                    c.toggle = function(e, t) {
                        e += "";
                        var n = this.contains(e)
                          , r = n ? t !== !0 && "remove" : t !== !1 && "add";
                        return r && this[r](e),
                        t === !0 || t === !1 ? t : !n
                    }
                    ,
                    c.toString = function() {
                        return this.join(" ")
                    }
                    ,
                    i.defineProperty) {
                        var h = {
                            get: d,
                            enumerable: !0,
                            configurable: !0
                        };
                        try {
                            i.defineProperty(r, t, h)
                        } catch (p) {
                            -2146823252 === p.number && (h.enumerable = !1,
                            i.defineProperty(r, t, h))
                        }
                    } else
                        i[n].__defineGetter__ && r.__defineGetter__(t, d)
                }
            }(self);
            var Wt = function() {
                function e(t) {
                    a(this, e),
                    this.name = t
                }
                return e.convention = function(t) {
                    return t.endsWith("ValueConverter") ? new e(_(t.substring(0, t.length - 14))) : void 0
                }
                ,
                e.prototype.analyze = function(e, t) {
                    this.instance = e.get(t)
                }
                ,
                e.prototype.register = function(e, t) {
                    e.registerValueConverter(t || this.name, this.instance)
                }
                ,
                e.prototype.load = function(e, t) {
                    return Promise.resolve(this)
                }
                ,
                e
            }();
            e.ValueConverterResource = Wt,
            i.Decorators.configure.parameterizedDecorator("valueConverter", F);
            var qt = function() {
                function e(t, n, r, i, o) {
                    a(this, e),
                    this.eventManager = t,
                    this.targetEvent = n,
                    this.sourceExpression = r,
                    this.delegate = i,
                    this.discrete = !0,
                    this.preventDefault = o
                }
                return e.prototype.createBinding = function(e) {
                    return new Ut(this.eventManager,this.targetEvent,this.delegate,this.sourceExpression,e,this.preventDefault)
                }
                ,
                e
            }();
            e.ListenerExpression = qt;
            var Ut = function() {
                function e(t, n, r, i, o, s) {
                    a(this, e),
                    this.eventManager = t,
                    this.targetEvent = n,
                    this.delegate = r,
                    this.sourceExpression = i,
                    this.target = o,
                    this.preventDefault = s
                }
                return e.prototype.bind = function(e) {
                    var t = this;
                    if (this._disposeListener) {
                        if (this.source === e)
                            return;
                        this.unbind()
                    }
                    this.source = e,
                    this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function(n) {
                        var r = e.$event;
                        e.$event = n;
                        var i = t.sourceExpression.evaluate(e);
                        return e.$event = r,
                        i !== !0 && t.preventDefault && n.preventDefault(),
                        i
                    }, this.delegate)
                }
                ,
                e.prototype.unbind = function() {
                    this._disposeListener && (this._disposeListener(),
                    this._disposeListener = null )
                }
                ,
                e
            }()
              , Gt = function() {
                function e(t, n) {
                    a(this, e),
                    this.property = t,
                    this.discrete = !0,
                    this.mode = n
                }
                return e.prototype.createBinding = function(e) {
                    return new Kt(this.property,e,this.mode)
                }
                ,
                e
            }();
            e.NameExpression = Gt;
            var Kt = function() {
                function e(t, n, r) {
                    switch (a(this, e),
                    this.property = t,
                    r) {
                    case "element":
                        this.target = n;
                        break;
                    case "view-model":
                        this.target = n.primaryBehavior.executionContext;
                        break;
                    default:
                        if (this.target = n[r],
                        void 0 === this.target)
                            throw new Error('Attempted to reference "' + r + '", but it was not found on the target element.');
                        this.target = this.target.executionContext || this.target
                    }
                }
                return e.prototype.bind = function(e) {
                    if (this.source) {
                        if (this.source === e)
                            return;
                        this.unbind()
                    }
                    this.source = e,
                    e[this.property] = this.target
                }
                ,
                e.prototype.unbind = function() {
                    this.source[this.property] = null
                }
                ,
                e
            }()
        }
        .call(t, t, e("npm:core-js@0.9.18"), e("github:aurelia/task-queue@0.6.0"), e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/metadata@0.7.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/if", ["github:aurelia/templating@0.13.2", "github:aurelia/dependency-injection@0.9.0"], !1, function(e, t, n) {
        return function(e, t, n) {
            "use strict";
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    r(this, i),
                    this.viewFactory = e,
                    this.viewSlot = t,
                    this.showing = !1
                }
                var i = e;
                return i.prototype.bind = function(e) {
                    this.executionContext = e,
                    this.valueChanged(this.value)
                }
                ,
                i.prototype.valueChanged = function(e) {
                    return e ? (this.view || (this.view = this.viewFactory.create(this.executionContext)),
                    void (this.showing || (this.showing = !0,
                    this.view.isBound || this.view.bind(),
                    this.viewSlot.add(this.view)))) : (this.view && (this.viewSlot.remove(this.view),
                    this.view.unbind()),
                    void (this.showing = !1))
                }
                ,
                e = n.inject(t.BoundViewFactory, t.ViewSlot)(e) || e,
                e = t.templateController(e) || e,
                e = t.customAttribute("if")(e) || e
            }();
            e.If = i
        }
        .call(t, t, e("github:aurelia/templating@0.13.2"), e("github:aurelia/dependency-injection@0.9.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/with", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/templating@0.13.2"], !1, function(e, t, n) {
        return function(e, t, n) {
            "use strict";
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    r(this, i),
                    this.viewFactory = e,
                    this.viewSlot = t
                }
                var i = e;
                return i.prototype.valueChanged = function(e) {
                    this.view ? this.view.bind(e) : (this.view = this.viewFactory.create(e),
                    this.viewSlot.add(this.view))
                }
                ,
                e = t.inject(n.BoundViewFactory, n.ViewSlot)(e) || e,
                e = n.templateController(e) || e,
                e = n.customAttribute("with")(e) || e
            }();
            e.With = i
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/templating@0.13.2"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/repeat", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/binding@0.8.1", "github:aurelia/templating@0.13.2"], !1, function(e, t, n) {
        return function(e, t, n, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function o(e, t, n) {
                var r = n[t];
                if (r) {
                    var i = {};
                    for (var o in r)
                        i[o] = r[o];
                    i.value = i.initializer.call(e),
                    Object.defineProperty(e, t, i)
                }
            }
            e.__esModule = !0;
            var s = function() {
                function e(e, t, n) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r]
                          , o = i.decorators
                          , s = i.key;
                        if (delete i.key,
                        delete i.decorators,
                        i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                        ("value" in i || i.initializer) && (i.writable = !0),
                        o) {
                            for (var a = 0; a < o.length; a++) {
                                var l = o[a];
                                if ("function" != typeof l)
                                    throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                                i = l(e, s, i) || i
                            }
                            if (void 0 !== i.initializer) {
                                n[s] = i;
                                continue
                            }
                        }
                        Object.defineProperty(e, s, i)
                    }
                }
                return function(t, n, r, i, o) {
                    return n && e(t.prototype, n, i),
                    r && e(t, r, o),
                    t
                }
            }()
              , a = function() {
                function e(e, t, n) {
                    i(this, l),
                    o(this, "items", a),
                    o(this, "local", a),
                    o(this, "key", a),
                    o(this, "value", a),
                    this.viewFactory = e,
                    this.viewSlot = t,
                    this.observerLocator = n,
                    this.local = "item",
                    this.key = "key",
                    this.value = "value"
                }
                var a = {}
                  , l = e;
                return l.prototype.bind = function(e) {
                    var t, r = this, i = this.items;
                    if (this.executionContext = e,
                    !i)
                        return void (this.oldItems && this.removeAll());
                    if (this.oldItems === i) {
                        if (!(i instanceof Map)) {
                            var o = n.calcSplices(i, 0, i.length, this.lastBoundItems, 0, this.lastBoundItems.length);
                            return t = this.observerLocator.getArrayObserver(i),
                            this.handleSplices(i, o),
                            this.lastBoundItems = this.oldItems = null ,
                            void (this.disposeSubscription = t.subscribe(function(e) {
                                r.handleSplices(i, e)
                            }))
                        }
                        var s = n.getChangeRecords(i);
                        t = this.observerLocator.getMapObserver(i),
                        this.handleMapChangeRecords(i, s),
                        this.disposeSubscription = t.subscribe(function(e) {
                            r.handleMapChangeRecords(i, e)
                        })
                    } else
                        this.oldItems && this.removeAll();
                    this.processItems()
                }
                ,
                l.prototype.unbind = function() {
                    this.oldItems = this.items,
                    this.items instanceof Array && (this.lastBoundItems = this.items.slice(0)),
                    this.disposeSubscription && (this.disposeSubscription(),
                    this.disposeSubscription = null )
                }
                ,
                l.prototype.itemsChanged = function() {
                    this.processItems()
                }
                ,
                l.prototype.processItems = function() {
                    var e = this.items;
                    if (this.disposeSubscription && (this.disposeSubscription(),
                    this.removeAll()),
                    e)
                        if (e instanceof Array)
                            this.processArrayItems(e);
                        else if (e instanceof Map)
                            this.processMapEntries(e);
                        else {
                            if ("number" != typeof e)
                                throw new Error('Object in "repeat" must be of type Array, Map or Number');
                            this.processNumber(e)
                        }
                }
                ,
                l.prototype.processArrayItems = function(e) {
                    var t, n, r, i, o, s = this, a = this.viewFactory, l = this.viewSlot;
                    for (o = this.observerLocator.getArrayObserver(e),
                    t = 0,
                    n = e.length; n > t; ++t)
                        r = this.createFullExecutionContext(e[t], t, n),
                        i = a.create(r),
                        l.add(i);
                    this.disposeSubscription = o.subscribe(function(t) {
                        s.handleSplices(e, t)
                    })
                }
                ,
                l.prototype.processMapEntries = function(e) {
                    var t, n, r, i = this, o = this.viewFactory, s = this.viewSlot, a = 0;
                    r = this.observerLocator.getMapObserver(e),
                    e.forEach(function(r, l) {
                        t = i.createFullExecutionKvpContext(l, r, a, e.size),
                        n = o.create(t),
                        s.add(n),
                        ++a
                    }),
                    this.disposeSubscription = r.subscribe(function(t) {
                        i.handleMapChangeRecords(e, t)
                    })
                }
                ,
                l.prototype.processNumber = function(e) {
                    var t, n, r, i, o = this.viewFactory, s = this.viewSlot;
                    for (t = 0,
                    n = Math.floor(e); n > t; ++t)
                        r = this.createFullExecutionContext(t, t, n),
                        i = o.create(r),
                        s.add(i)
                }
                ,
                l.prototype.createBaseExecutionContext = function(e) {
                    var t = {};
                    return t[this.local] = e,
                    t.$parent = this.executionContext,
                    t
                }
                ,
                l.prototype.createBaseExecutionKvpContext = function(e, t) {
                    var n = {};
                    return n[this.key] = e,
                    n[this.value] = t,
                    n.$parent = this.executionContext,
                    n
                }
                ,
                l.prototype.createFullExecutionContext = function(e, t, n) {
                    var r = this.createBaseExecutionContext(e);
                    return this.updateExecutionContext(r, t, n)
                }
                ,
                l.prototype.createFullExecutionKvpContext = function(e, t, n, r) {
                    var i = this.createBaseExecutionKvpContext(e, t);
                    return this.updateExecutionContext(i, n, r)
                }
                ,
                l.prototype.updateExecutionContext = function(e, t, n) {
                    var r = 0 === t
                      , i = t === n - 1
                      , o = t % 2 === 0;
                    return e.$index = t,
                    e.$first = r,
                    e.$last = i,
                    e.$middle = !(r || i),
                    e.$odd = !o,
                    e.$even = o,
                    e
                }
                ,
                l.prototype.handleSplices = function(e, t) {
                    var n, r, i, o, s, a, l, u, c, d, h, p, f, m, g, v, y, b, w = new Map, x = this.viewSlot;
                    for (o = 0,
                    s = t.length; s > o; ++o) {
                        for (c = t[o],
                        d = b = c.index,
                        p = c.addedCount,
                        h = c.index + c.addedCount,
                        f = c.removed,
                        ("undefined" == typeof n || null  === n || n > c.index) && (n = b),
                        a = 0,
                        l = f.length; l > a; ++a)
                            p > 0 ? (i = x.children[b + a],
                            i.detached(),
                            y = this.createFullExecutionContext(e[d + a], b + a, e.length),
                            i.bind(y),
                            i.attached(),
                            --p) : (r = x.removeAt(d + c.addedCount),
                            r && w.set(f[a], r));
                        for (d += f.length; p > 0; ++d)
                            m = e[d],
                            r = w.get(m),
                            r instanceof Promise ? !function(e, t) {
                                r.then(function(n) {
                                    w["delete"](t),
                                    x.insert(e, n)
                                })
                            }(d, m) : r ? (w["delete"](m),
                            x.insert(d, r)) : (u = this.createBaseExecutionContext(m),
                            i = this.viewFactory.create(u),
                            x.insert(d, i)),
                            --p
                    }
                    for (g = this.viewSlot.children,
                    v = g.length,
                    n > 0 && (n -= 1); v > n; ++n)
                        this.updateExecutionContext(g[n].executionContext, n, v);
                    w.forEach(function(e) {
                        e instanceof Promise ? e.then(function(e) {
                            return e.unbind()
                        }) : e.unbind()
                    })
                }
                ,
                l.prototype.handleMapChangeRecords = function(e, t) {
                    var n, r, i, o, s, a, l, u, c, d = this.viewSlot;
                    for (r = 0,
                    i = t.length; i > r; ++r)
                        switch (c = t[r],
                        n = c.key,
                        c.type) {
                        case "update":
                            u = this.getViewIndexByKey(n),
                            d.removeAt(u),
                            l = this.createBaseExecutionKvpContext(n, e.get(n)),
                            o = this.viewFactory.create(l),
                            d.insert(u, o);
                            break;
                        case "add":
                            l = this.createBaseExecutionKvpContext(n, e.get(n)),
                            o = this.viewFactory.create(l),
                            d.insert(e.size, o);
                            break;
                        case "delete":
                            if (!c.oldValue)
                                return;
                            u = this.getViewIndexByKey(n),
                            d.removeAt(u);
                            break;
                        case "clear":
                            d.removeAll()
                        }
                    for (s = d.children,
                    a = s.length,
                    r = 0; a > r; r++)
                        this.updateExecutionContext(s[r].executionContext, r, a)
                }
                ,
                l.prototype.getViewIndexByKey = function(e) {
                    var t, n, r, i = this.viewSlot;
                    for (t = 0,
                    n = i.children.length; n > t; ++t)
                        if (r = i.children[t],
                        r.bindings[0].source[this.key] === e)
                            return t
                }
                ,
                l.prototype.removeAll = function() {
                    var e, t, n = this.viewSlot;
                    for (e = n.children,
                    n.removeAll(),
                    t = e.length; t--; )
                        e[t].unbind()
                }
                ,
                s(l, [{
                    key: "items",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "local",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "key",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "value",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }], null , a),
                e = t.inject(r.BoundViewFactory, r.ViewSlot, n.ObserverLocator)(e) || e,
                e = r.templateController(e) || e,
                e = r.customAttribute("repeat")(e) || e
            }();
            e.Repeat = a
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/binding@0.8.1"), e("github:aurelia/templating@0.13.2"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/show", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/templating@0.13.2"], !1, function(e, t, n) {
        return function(e, t, n) {
            "use strict";
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function i(e) {
                var t = document.createElement("style");
                t.innerHTML = e,
                t.type = "text/css",
                document.head.appendChild(t)
            }
            e.__esModule = !0,
            i(".aurelia-hide { display:none !important; }");
            var o = function() {
                function e(e) {
                    r(this, i),
                    this.element = e
                }
                var i = e;
                return i.prototype.valueChanged = function(e) {
                    e ? this.element.classList.remove("aurelia-hide") : this.element.classList.add("aurelia-hide")
                }
                ,
                i.prototype.bind = function(e) {
                    this.valueChanged(this.value)
                }
                ,
                e = t.inject(Element)(e) || e,
                e = n.customAttribute("show")(e) || e
            }();
            e.Show = o
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/templating@0.13.2"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/global-behavior", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/templating@0.13.2", "github:aurelia/logging@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var o = function() {
                function e(e) {
                    i(this, o),
                    this.element = e
                }
                var o = e;
                return o.prototype.bind = function() {
                    var t = e.handlers[this.aureliaAttrName];
                    if (!t)
                        throw new Error("Binding handler not found for '" + this.aureliaAttrName + "." + this.aureliaCommand + "'. Element:\n" + this.element.outerHTML + "\n");
                    try {
                        this.handler = t.bind(this, this.element, this.aureliaCommand) || t
                    } catch (n) {
                        throw r.AggregateError("Conventional binding handler failed.", n)
                    }
                }
                ,
                o.prototype.attached = function() {
                    this.handler && "attached" in this.handler && this.handler.attached(this, this.element)
                }
                ,
                o.prototype.detached = function() {
                    this.handler && "detached" in this.handler && this.handler.detached(this, this.element)
                }
                ,
                o.prototype.unbind = function() {
                    this.handler && "unbind" in this.handler && this.handler.unbind(this, this.element),
                    this.handler = null
                }
                ,
                e = t.inject(Element)(e) || e,
                e = n.dynamicOptions(e) || e,
                e = n.customAttribute("global-behavior")(e) || e
            }();
            e.GlobalBehavior = o,
            o.createSettingsFromBehavior = function(e) {
                var t = {};
                for (var n in e)
                    "aureliaAttrName" !== n && "aureliaCommand" !== n && e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
            }
            ,
            o.jQueryPlugins = {},
            o.handlers = {
                jquery: {
                    bind: function(e, t, n) {
                        var i = o.createSettingsFromBehavior(e)
                          , s = o.jQueryPlugins[n] || n
                          , a = window.jQuery(t);
                        if (!a[s]) {
                            r.getLogger("templating-resources").warn("Could not find the jQuery plugin " + s + ", possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.");
                            for (var l in a)
                                l.toLowerCase() === s && (s = l)
                        }
                        e.plugin = a[s](i)
                    },
                    unbind: function(e, t) {
                        "function" == typeof e.plugin.destroy && (e.plugin.destroy(),
                        e.plugin = null )
                    }
                }
            }
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/templating@0.13.2"), e("github:aurelia/logging@0.6.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/sanitize-html", ["github:aurelia/binding@0.8.1"], !1, function(e, t, n) {
        return function(e, t) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var r = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
              , i = function() {
                function e() {
                    n(this, i),
                    this.sanitizer = e.defaultSanitizer
                }
                var i = e;
                return i.defaultSanitizer = function(e) {
                    return e.replace(r, "")
                }
                ,
                i.prototype.toView = function(e) {
                    return null  === e ? null  : this.sanitizer(e)
                }
                ,
                e = t.valueConverter("sanitizeHtml")(e) || e
            }();
            e.SanitizeHtmlValueConverter = i
        }
        .call(t, t, e("github:aurelia/binding@0.8.1"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/replaceable", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/templating@0.13.2"], !1, function(e, t, n) {
        return function(e, t, n) {
            "use strict";
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var i = function() {
                function e(e, t) {
                    r(this, i),
                    t.add(e.create())
                }
                var i = e;
                return e = t.inject(n.BoundViewFactory, n.ViewSlot)(e) || e,
                e = n.templateController(e) || e,
                e = n.customAttribute("replaceable")(e) || e
            }();
            e.Replaceable = i
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/templating@0.13.2"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/focus", ["github:aurelia/templating@0.13.2", "github:aurelia/binding@0.8.1", "github:aurelia/dependency-injection@0.9.0", "github:aurelia/task-queue@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r, i) {
            "use strict";
            function o(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0;
            var s = function() {
                function e(e, t) {
                    var n = this;
                    o(this, s),
                    this.element = e,
                    this.taskQueue = t,
                    this.focusListener = function(e) {
                        n.value = !0
                    }
                    ,
                    this.blurListener = function(e) {
                        document.activeElement !== n.element && (n.value = !1)
                    }
                }
                var s = e;
                return s.prototype.valueChanged = function(e) {
                    e ? this.giveFocus() : this.element.blur()
                }
                ,
                s.prototype.giveFocus = function() {
                    var e = this;
                    this.taskQueue.queueMicroTask(function() {
                        e.value && e.element.focus()
                    })
                }
                ,
                s.prototype.attached = function() {
                    this.element.addEventListener("focus", this.focusListener),
                    this.element.addEventListener("blur", this.blurListener)
                }
                ,
                s.prototype.detached = function() {
                    this.element.removeEventListener("focus", this.focusListener),
                    this.element.removeEventListener("blur", this.blurListener)
                }
                ,
                e = r.inject(Element, i.TaskQueue)(e) || e,
                e = t.customAttribute("focus", n.bindingMode.twoWay)(e) || e
            }();
            e.Focus = s
        }
        .call(t, t, e("github:aurelia/templating@0.13.2"), e("github:aurelia/binding@0.8.1"), e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/task-queue@0.6.0"))
    })
}(),
System.register("npm:core-js@0.9.18/modules/$", ["npm:core-js@0.9.18/modules/$.fw"], !0, function(require, e, t) {
    function n(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? m : f)(e)
    }
    function r(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
    function i(e, t, n) {
        return e[t] = n,
        e
    }
    function o(e) {
        return y ? function(t, n, i) {
            return w.setDesc(t, n, r(e, i))
        }
         : i
    }
    function s(e) {
        return null  !== e && ("object" == typeof e || "function" == typeof e)
    }
    function a(e) {
        return "function" == typeof e
    }
    function l(e) {
        if (void 0 == e)
            throw TypeError("Can't call method on  " + e);
        return e
    }
    var u = System.global
      , c = u.define;
    u.define = void 0;
    var u = "undefined" != typeof self ? self : Function("return this")()
      , d = {}
      , h = Object.defineProperty
      , p = {}.hasOwnProperty
      , f = Math.ceil
      , m = Math.floor
      , g = Math.max
      , v = Math.min
      , y = !!function() {
        try {
            return 2 == h({}, "a", {
                get: function() {
                    return 2
                }
            }).a
        } catch (e) {}
    }()
      , b = o(1)
      , w = t.exports = require("npm:core-js@0.9.18/modules/$.fw")({
        g: u,
        core: d,
        html: u.document && document.documentElement,
        isObject: s,
        isFunction: a,
        that: function() {
            return this
        },
        toInteger: n,
        toLength: function(e) {
            return e > 0 ? v(n(e), 9007199254740991) : 0
        },
        toIndex: function(e, t) {
            return e = n(e),
            0 > e ? g(e + t, 0) : v(e, t)
        },
        has: function(e, t) {
            return p.call(e, t)
        },
        create: Object.create,
        getProto: Object.getPrototypeOf,
        DESC: y,
        desc: r,
        getDesc: Object.getOwnPropertyDescriptor,
        setDesc: h,
        setDescs: Object.defineProperties,
        getKeys: Object.keys,
        getNames: Object.getOwnPropertyNames,
        getSymbols: Object.getOwnPropertySymbols,
        assertDefined: l,
        ES5Object: Object,
        toObject: function(e) {
            return w.ES5Object(l(e))
        },
        hide: b,
        def: o(0),
        set: u.Symbol ? i : b,
        each: [].forEach
    });
    return "undefined" != typeof __e && (__e = d),
    "undefined" != typeof __g && (__g = u),
    u.define = c,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.wks", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.uid"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var n = require("npm:core-js@0.9.18/modules/$").g
      , i = require("npm:core-js@0.9.18/modules/$.shared")("wks");
    return t.exports = function(e) {
        return i[e] || (i[e] = n.Symbol && n.Symbol[e] || require("npm:core-js@0.9.18/modules/$.uid").safe("Symbol." + e))
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.def", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], !0, function(require, e, t) {
    function n(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    function r(e, t, o) {
        var c, d, h, p, f = e & r.G, m = e & r.P, g = f ? i : e & r.S ? i[t] : (i[t] || {}).prototype, v = f ? a : a[t] || (a[t] = {});
        f && (o = t);
        for (c in o)
            d = !(e & r.F) && g && c in g,
            h = (d ? g : o)[c],
            p = e & r.B && d ? n(h, i) : m && l(h) ? n(Function.call, h) : h,
            g && !d && u(g, c, h),
            v[c] != h && s.hide(v, c, p),
            m && ((v.prototype || (v.prototype = {}))[c] = h)
    }
    var i = System.global
      , o = i.define;
    i.define = void 0;
    var s = require("npm:core-js@0.9.18/modules/$")
      , i = s.g
      , a = s.core
      , l = s.isFunction
      , u = require("npm:core-js@0.9.18/modules/$.redef");
    return i.core = a,
    r.F = 1,
    r.G = 2,
    r.S = 4,
    r.P = 8,
    r.B = 16,
    r.W = 32,
    t.exports = r,
    i.define = o,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.ctx", ["npm:core-js@0.9.18/modules/$.assert"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.assert").fn;
    return t.exports = function(e, t, n) {
        if (i(e),
        ~n && void 0 === t)
            return e;
        switch (n) {
        case 1:
            return function(n) {
                return e.call(t, n)
            }
            ;
        case 2:
            return function(n, r) {
                return e.call(t, n, r)
            }
            ;
        case 3:
            return function(n, r, i) {
                return e.call(t, n, r, i)
            }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
    ,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.symbol", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.enum-keys", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.get-names", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    function n(e) {
        var t = R[e] = h.set(S(A.prototype), N, e);
        return k && $ && F(x, e, {
            configurable: !0,
            set: function(t) {
                j(this, D) && j(this[D], e) && (this[D][e] = !1),
                F(this, e, M(1, t))
            }
        }),
        t
    }
    function r(e, t, n) {
        return n && j(R, t) ? (n.enumerable ? (j(e, D) && e[D][t] && (e[D][t] = !1),
        n = S(n, {
            enumerable: M(0, !1)
        })) : (j(e, D) || L(e, D, M(1, {})),
        e[D][t] = !0),
        F(e, t, n)) : L(e, t, n)
    }
    function i(e, t) {
        w(e);
        for (var n, i = b(t = T(t)), o = 0, s = i.length; s > o; )
            r(e, n = i[o++], t[n]);
        return e
    }
    function o(e, t) {
        return void 0 === t ? S(e) : i(S(e), t)
    }
    function s(e) {
        var t = P.call(this, e);
        return t || !j(this, e) || !j(R, e) || j(this, D) && this[D][e] ? t : !0
    }
    function a(e, t) {
        var n = C(e = T(e), t);
        return !n || !j(R, t) || j(e, D) && e[D][t] || (n.enumerable = !0),
        n
    }
    function l(e) {
        for (var t, n = E(T(e)), r = [], i = 0; n.length > i; )
            j(R, t = n[i++]) || t == D || r.push(t);
        return r
    }
    function u(e) {
        for (var t, n = E(T(e)), r = [], i = 0; n.length > i; )
            j(R, t = n[i++]) && r.push(R[t]);
        return r
    }
    var c = System.global
      , d = c.define;
    c.define = void 0;
    var h = require("npm:core-js@0.9.18/modules/$")
      , p = require("npm:core-js@0.9.18/modules/$.cof").set
      , f = require("npm:core-js@0.9.18/modules/$.uid")
      , m = require("npm:core-js@0.9.18/modules/$.shared")
      , g = require("npm:core-js@0.9.18/modules/$.def")
      , v = require("npm:core-js@0.9.18/modules/$.redef")
      , y = require("npm:core-js@0.9.18/modules/$.keyof")
      , b = require("npm:core-js@0.9.18/modules/$.enum-keys")
      , w = require("npm:core-js@0.9.18/modules/$.assert").obj
      , x = Object.prototype
      , k = h.DESC
      , j = h.has
      , S = h.create
      , C = h.getDesc
      , L = h.setDesc
      , M = h.desc
      , O = require("npm:core-js@0.9.18/modules/$.get-names")
      , E = O.get
      , T = h.toObject
      , A = h.g.Symbol
      , $ = !1
      , N = f("tag")
      , D = f("hidden")
      , P = {}.propertyIsEnumerable
      , I = m("symbol-registry")
      , R = m("symbols")
      , _ = h.isFunction(A)
      , F = k ? function() {
        try {
            return S(L({}, D, {
                get: function() {
                    return L(this, D, {
                        value: !1
                    })[D]
                }
            }))[D] || L
        } catch (e) {
            return function(e, t, n) {
                var r = C(x, t);
                r && delete x[t],
                L(e, t, n),
                r && e !== x && L(x, t, r)
            }
        }
    }() : L;
    _ || (A = function() {
        if (this instanceof A)
            throw TypeError("Symbol is not a constructor");
        return n(f(arguments[0]))
    }
    ,
    v(A.prototype, "toString", function() {
        return this[N]
    }),
    h.create = o,
    h.setDesc = r,
    h.getDesc = a,
    h.setDescs = i,
    h.getNames = O.get = l,
    h.getSymbols = u,
    h.DESC && h.FW && v(x, "propertyIsEnumerable", s, !0));
    var z = {
        "for": function(e) {
            return j(I, e += "") ? I[e] : I[e] = A(e)
        },
        keyFor: function(e) {
            return y(I, e)
        },
        useSetter: function() {
            $ = !0
        },
        useSimple: function() {
            $ = !1
        }
    };
    return h.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(e) {
        var t = require("npm:core-js@0.9.18/modules/$.wks")(e);
        z[e] = _ ? t : n(t)
    }),
    $ = !0,
    g(g.G + g.W, {
        Symbol: A
    }),
    g(g.S, "Symbol", z),
    g(g.S + g.F * !_, "Object", {
        create: o,
        defineProperty: r,
        defineProperties: i,
        getOwnPropertyDescriptor: a,
        getOwnPropertyNames: l,
        getOwnPropertySymbols: u
    }),
    p(A, "Symbol"),
    p(Math, "Math", !0),
    p(h.g.JSON, "JSON", !0),
    c.define = d,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.object.assign", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.S, "Object", {
        assign: require("npm:core-js@0.9.18/modules/$.assign")
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.object.is", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.same"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.S, "Object", {
        is: require("npm:core-js@0.9.18/modules/$.same")
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.object.set-prototype-of", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.S, "Object", {
        setPrototypeOf: require("npm:core-js@0.9.18/modules/$.set-proto").set
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-at", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$").set
      , o = require("npm:core-js@0.9.18/modules/$.string-at")(!0)
      , s = require("npm:core-js@0.9.18/modules/$.uid").safe("iter")
      , a = require("npm:core-js@0.9.18/modules/$.iter")
      , l = a.step;
    return require("npm:core-js@0.9.18/modules/$.iter-define")(String, "String", function(e) {
        i(this, s, {
            o: String(e),
            i: 0
        })
    }, function() {
        var e, t = this[s], n = t.o, r = t.i;
        return r >= n.length ? l(1) : (e = o(n, r),
        t.i += e.length,
        l(0, e))
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.string.repeat", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-repeat"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def");
    return i(i.P, "String", {
        repeat: require("npm:core-js@0.9.18/modules/$.string-repeat")
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.from", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.iter-detect"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.ctx")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = require("npm:core-js@0.9.18/modules/$.iter")
      , l = require("npm:core-js@0.9.18/modules/$.iter-call");
    return s(s.S + s.F * !require("npm:core-js@0.9.18/modules/$.iter-detect")(function(e) {
        Array.from(e)
    }), "Array", {
        from: function(e) {
            var t, n, r, s, u = Object(i.assertDefined(e)), c = arguments[1], d = void 0 !== c, h = d ? o(c, arguments[2], 2) : void 0, p = 0;
            if (a.is(u))
                for (s = a.get(u),
                n = new ("function" == typeof this ? this : Array); !(r = s.next()).done; p++)
                    n[p] = d ? l(s, h, [r.value, p], !0) : r.value;
            else
                for (n = new ("function" == typeof this ? this : Array)(t = i.toLength(u.length)); t > p; p++)
                    n[p] = d ? h(u[p], p) : u[p];
            return n.length = p,
            n
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.unscope", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.unscope")
      , s = require("npm:core-js@0.9.18/modules/$.uid").safe("iter")
      , a = require("npm:core-js@0.9.18/modules/$.iter")
      , l = a.step
      , u = a.Iterators;
    return require("npm:core-js@0.9.18/modules/$.iter-define")(Array, "Array", function(e, t) {
        i.set(this, s, {
            o: i.toObject(e),
            i: 0,
            k: t
        })
    }, function() {
        var e = this[s]
          , t = e.o
          , n = e.k
          , r = e.i++;
        return !t || r >= t.length ? (e.o = void 0,
        l(1)) : "keys" == n ? l(0, r) : "values" == n ? l(0, t[r]) : l(0, [r, t[r]])
    }, "values"),
    u.Arguments = u.Array,
    o("keys"),
    o("values"),
    o("entries"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.array.species", ["npm:core-js@0.9.18/modules/$.species"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    require("npm:core-js@0.9.18/modules/$.species")(Array),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.map", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.collection-strong");
    return require("npm:core-js@0.9.18/modules/$.collection")("Map", function(e) {
        return function() {
            return e(this, arguments[0])
        }
    }, {
        get: function(e) {
            var t = i.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return i.def(this, 0 === e ? 0 : e, t)
        }
    }, i, !0),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.weak-map", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection", "npm:core-js@0.9.18/modules/$.redef"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.collection-weak")
      , s = o.leakStore
      , a = o.ID
      , l = o.WEAK
      , u = i.has
      , c = i.isObject
      , d = Object.isExtensible || c
      , h = {}
      , p = require("npm:core-js@0.9.18/modules/$.collection")("WeakMap", function(e) {
        return function() {
            return e(this, arguments[0])
        }
    }, {
        get: function(e) {
            if (c(e)) {
                if (!d(e))
                    return s(this).get(e);
                if (u(e, l))
                    return e[l][this[a]]
            }
        },
        set: function(e, t) {
            return o.def(this, e, t)
        }
    }, o, !0, !0);
    return 7 != (new p).set((Object.freeze || Object)(h), 7).get(h) && i.each.call(["delete", "has", "get", "set"], function(e) {
        var t = p.prototype
          , n = t[e];
        require("npm:core-js@0.9.18/modules/$.redef")(t, e, function(t, r) {
            if (c(t) && !d(t)) {
                var i = s(this)[e](t, r);
                return "set" == e ? this : i
            }
            return n.call(this, t, r)
        })
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.reflect", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.own-keys"], !0, function(require, e, t) {
    function n(e) {
        o.set(this, c, {
            o: e,
            k: void 0,
            i: 0
        })
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = require("npm:core-js@0.9.18/modules/$.set-proto")
      , l = require("npm:core-js@0.9.18/modules/$.iter")
      , u = require("npm:core-js@0.9.18/modules/$.wks")("iterator")
      , c = require("npm:core-js@0.9.18/modules/$.uid").safe("iter")
      , d = l.step
      , h = require("npm:core-js@0.9.18/modules/$.assert")
      , p = o.isObject
      , f = o.getProto
      , m = o.g.Reflect
      , g = Function.apply
      , v = h.obj
      , y = Object.isExtensible || p
      , b = Object.preventExtensions
      , w = !(m && m.enumerate && u in m.enumerate({}));
    l.create(n, "Object", function() {
        var e, t = this[c], n = t.k;
        if (void 0 == n) {
            t.k = n = [];
            for (e in t.o)
                n.push(e)
        }
        do
            if (t.i >= n.length)
                return d(1);
        while (!((e = n[t.i++]) in t.o));return d(0, e)
    });
    var x = {
        apply: function(e, t, n) {
            return g.call(e, t, n)
        },
        construct: function(e, t) {
            var n = h.fn(arguments.length < 3 ? e : arguments[2]).prototype
              , r = o.create(p(n) ? n : Object.prototype)
              , i = g.call(e, r, t);
            return p(i) ? i : r
        },
        defineProperty: function(e, t, n) {
            v(e);
            try {
                return o.setDesc(e, t, n),
                !0
            } catch (r) {
                return !1
            }
        },
        deleteProperty: function(e, t) {
            var n = o.getDesc(v(e), t);
            return n && !n.configurable ? !1 : delete e[t]
        },
        get: function k(e, t) {
            var n, r = arguments.length < 3 ? e : arguments[2], i = o.getDesc(v(e), t);
            return i ? o.has(i, "value") ? i.value : void 0 === i.get ? void 0 : i.get.call(r) : p(n = f(e)) ? k(n, t, r) : void 0
        },
        getOwnPropertyDescriptor: function(e, t) {
            return o.getDesc(v(e), t)
        },
        getPrototypeOf: function(e) {
            return f(v(e))
        },
        has: function(e, t) {
            return t in e
        },
        isExtensible: function(e) {
            return y(v(e))
        },
        ownKeys: require("npm:core-js@0.9.18/modules/$.own-keys"),
        preventExtensions: function(e) {
            v(e);
            try {
                return b && b(e),
                !0
            } catch (t) {
                return !1
            }
        },
        set: function j(e, t, n) {
            var r, i, s = arguments.length < 4 ? e : arguments[3], a = o.getDesc(v(e), t);
            if (!a) {
                if (p(i = f(e)))
                    return j(i, t, n, s);
                a = o.desc(0)
            }
            return o.has(a, "value") ? a.writable !== !1 && p(s) ? (r = o.getDesc(s, t) || o.desc(0),
            r.value = n,
            o.setDesc(s, t, r),
            !0) : !1 : void 0 === a.set ? !1 : (a.set.call(s, n),
            !0)
        }
    };
    return a && (x.setPrototypeOf = function(e, t) {
        a.check(e, t);
        try {
            return a.set(e, t),
            !0
        } catch (n) {
            return !1
        }
    }
    ),
    s(s.G, {
        Reflect: {}
    }),
    s(s.S + s.F * w, "Reflect", {
        enumerate: function(e) {
            return new n(v(e))
        }
    }),
    s(s.S, "Reflect", x),
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.string.lpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$.def")
      , o = require("npm:core-js@0.9.18/modules/$.string-pad");
    return i(i.P, "String", {
        lpad: function(e) {
            return o(this, e, arguments[1], !0)
        }
    }),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es7.map.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    require("npm:core-js@0.9.18/modules/$.collection-to-json")("Map"),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/web.timers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.partial"], !0, function(require, e, t) {
    function n(e) {
        return c ? function(t, n) {
            return e(a(l, [].slice.call(arguments, 2), o.isFunction(t) ? t : Function(t)), n)
        }
         : e
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.def")
      , a = require("npm:core-js@0.9.18/modules/$.invoke")
      , l = require("npm:core-js@0.9.18/modules/$.partial")
      , u = o.g.navigator
      , c = !!u && /MSIE .\./.test(u.userAgent);
    return s(s.G + s.B + s.F * c, {
        setTimeout: n(o.g.setTimeout),
        setInterval: n(o.g.setInterval)
    }),
    r.define = i,
    t.exports
}),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/metadata@0.7.0", ["github:aurelia/metadata@0.7.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/metadata@0.7.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/logging@0.6.0", ["github:aurelia/logging@0.6.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/logging@0.6.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/task-queue@0.6.0", ["github:aurelia/task-queue@0.6.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/task-queue@0.6.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/path@0.8.0", ["github:aurelia/path@0.8.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/path@0.8.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/loader@0.8.0", ["github:aurelia/loader@0.8.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/loader@0.8.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/binding@0.8.1", ["github:aurelia/binding@0.8.1/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/binding@0.8.1/index"))
    })
}(),
System.register("npm:core-js@0.9.18/modules/$.cof", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], !0, function(require, e, t) {
    function n(e) {
        return a.call(e).slice(8, -1)
    }
    var r = System.global
      , i = r.define;
    r.define = void 0;
    var o = require("npm:core-js@0.9.18/modules/$")
      , s = require("npm:core-js@0.9.18/modules/$.wks")("toStringTag")
      , a = {}.toString;
    return n.classof = function(e) {
        var t, r;
        return void 0 == e ? void 0 === e ? "Undefined" : "Null" : "string" == typeof (r = (t = Object(e))[s]) ? r : n(t)
    }
    ,
    n.set = function(e, t, n) {
        e && !o.has(e = n ? e : e.prototype, s) && o.hide(e, s, t)
    }
    ,
    t.exports = n,
    r.define = i,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/$.array-methods", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    n.define = void 0;
    var i = require("npm:core-js@0.9.18/modules/$")
      , o = require("npm:core-js@0.9.18/modules/$.ctx");
    return t.exports = function(e) {
        var t = 1 == e
          , n = 2 == e
          , r = 3 == e
          , s = 4 == e
          , a = 6 == e
          , l = 5 == e || a;
        return function(u, c, d) {
            for (var h, p, f = Object(i.assertDefined(u)), m = i.ES5Object(f), g = o(c, d, 3), v = i.toLength(m.length), y = 0, b = t ? Array(v) : n ? [] : void 0; v > y; y++)
                if ((l || y in m) && (h = m[y],
                p = g(h, y, f),
                e))
                    if (t)
                        b[y] = p;
                    else if (p)
                        switch (e) {
                        case 3:
                            return !0;
                        case 5:
                            return h;
                        case 6:
                            return y;
                        case 2:
                            b.push(h)
                        }
                    else if (s)
                        return !1;
            return a ? -1 : r || s ? s : b
        }
    }
    ,
    n.define = r,
    t.exports
}),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating@0.13.2/index", ["npm:core-js@0.9.18", "github:aurelia/metadata@0.7.0", "github:aurelia/path@0.8.0", "github:aurelia/dependency-injection@0.9.0", "github:aurelia/loader@0.8.0", "github:aurelia/binding@0.8.1", "github:aurelia/task-queue@0.6.0", "github:aurelia/logging@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r, i, o, s, a, l) {
            "use strict";
            function u(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function c(e, t) {
                if ("function" != typeof t && null  !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (e.__proto__ = t)
            }
            function d(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function h(e) {
                return "-" + e.toLowerCase()
            }
            function p(e) {
                return (e.charAt(0).toLowerCase() + e.slice(1)).replace(W, h)
            }
            function f(e) {
                if (e.nextElementSibling)
                    return e.nextElementSibling;
                do
                    e = e.nextSibling;
                while (e && 1 !== e.nodeType);return e
            }
            function m(e, t, n, r) {
                if (t) {
                    var i = e[t];
                    if (i) {
                        if (i != n)
                            throw new Error("Attempted to register " + r + " when one with the same name already exists. Name: " + t + ".")
                    } else
                        e[t] = n
                }
            }
            function g(e, t) {
                for (var n; !n && t >= 0; )
                    n = e[t][0],
                    t--;
                return n
            }
            function v(e) {
                if (e === Element)
                    return this.element;
                if (e === ie) {
                    if (this.boundViewFactory)
                        return this.boundViewFactory;
                    var t = this.instruction.viewFactory
                      , n = this.partReplacements;
                    return n && (t = n[t.part] || t),
                    t.partReplacements = n,
                    this.boundViewFactory = new ie(this,t,this.executionContext)
                }
                return e === re ? (void 0 === this.viewSlot && (this.viewSlot = new re(this.element,this.instruction.anchorIsContainer,this.executionContext),
                this.children.push(this.viewSlot)),
                this.viewSlot) : e === Z ? this.viewResources : this.superGet(e)
            }
            function y(e, t, n, r, i, o, s) {
                var a, l, u = e.createChild();
                for (u.element = t,
                u.instruction = n,
                u.executionContext = r,
                u.children = i,
                u.viewResources = s,
                u.partReplacements = o,
                a = n.providers,
                l = a.length; l--; )
                    u.registerSingleton(a[l]);
                return u.superGet = u.get,
                u.get = v,
                u
            }
            function b(e, t) {
                var n = document.createComment("anchor");
                return t && (n.attributes = e.attributes,
                n.hasAttribute = function(t) {
                    return e.hasAttribute(t)
                }
                ,
                n.getAttribute = function(t) {
                    return e.getAttribute(t)
                }
                ,
                n.setAttribute = function(t, n) {
                    e.setAttribute(t, n)
                }
                ),
                e.parentNode.replaceChild(n, e),
                n
            }
            function w(e, t, n, r, i, o, s, a, l, u) {
                var c, d, h, p, f, m = r.behaviorInstructions, g = r.expressions;
                if (r.contentExpression)
                    return o.push(r.contentExpression.createBinding(n.nextSibling)),
                    void n.parentNode.removeChild(n);
                if (r.contentSelector) {
                    var v = document.createComment("anchor");
                    return n.parentNode.replaceChild(v, n),
                    void a.push(new ne(v,r.selector))
                }
                if (m.length)
                    for (r.anchorIsContainer || (n = b(n, r.isCustomElement)),
                    e[r.injectorId] = c = y(e[r.parentInjectorId], n, r, t, s, l, u),
                    d = 0,
                    h = m.length; h > d; ++d)
                        p = m[d],
                        f = p.type.create(c, p, n, o, p.partReplacements),
                        f.contentView && s.push(f.contentView),
                        i.push(f);
                for (d = 0,
                h = g.length; h > d; ++d)
                    o.push(g[d].createBinding(n))
            }
            function x() {
                return ++ae
            }
            function k(e, t) {
                var n, r, i, o = e.type, s = e.attrName, a = e.attributes, l = t.mapAttribute(s);
                l && s in a && l !== s && (a[l] = a[s],
                delete a[s]);
                for (r in a)
                    i = a[r],
                    null  !== i && "object" == typeof i && (n = o.attributes[r],
                    void 0 !== n ? i.targetProperty = n.name : i.targetProperty = r)
            }
            function j(e) {
                var t = e.getAttribute("class");
                e.setAttribute("class", t ? t += " au-target" : "au-target")
            }
            function S(e, t) {
                return t instanceof o.TemplateRegistryEntry ? Promise.resolve(t) : e.loadTemplate(t)
            }
            function C(e, t, n) {
                var r = t.__observers__;
                return void 0 === r && (r = e.observerLocator.getOrCreateObserversLookup(t),
                e.ensurePropertiesDefined(t, r)),
                r[n]
            }
            function L(e, t) {
                if (/[A-Z]/.test(e))
                    throw new Error("'" + e + "' is not a valid " + t + " name.  Upper-case letters are not allowed because the DOM is not case-sensitive.")
            }
            function M(e) {
                return function(t) {
                    if (e instanceof be)
                        n.Metadata.define(n.Metadata.resource, e, t);
                    else {
                        var r = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, t);
                        Object.assign(r, e)
                    }
                }
            }
            function O(e) {
                return L(e, "custom element"),
                function(t) {
                    var r = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, t);
                    r.elementName = e
                }
            }
            function E(e, t) {
                return L(e, "custom attribute"),
                function(r) {
                    var i = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, r);
                    i.attributeName = e,
                    i.attributeDefaultBindingMode = t
                }
            }
            function T(e) {
                var t = function(e) {
                    var t = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, e);
                    t.liftsContent = !0
                }
                ;
                return e ? t(e) : t
            }
            function A(e, t, r) {
                var i = function(t, r, i) {
                    var o, s = r ? t.constructor : t, a = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, s);
                    return r && (e = e || {},
                    e.name = r),
                    o = new me(e),
                    o.registerWith(s, a, i)
                }
                ;
                if (!e)
                    return i;
                if (t) {
                    var o = e;
                    return e = null ,
                    i(o, t, r)
                }
                return i
            }
            function $(e) {
                var t = function(e) {
                    var t = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, e);
                    t.hasDynamicOptions = !0
                }
                ;
                return e ? t(e) : t
            }
            function N(e) {
                return function(t, r, i) {
                    var o = r ? t.constructor : t
                      , s = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, o);
                    "string" == typeof e && (e = {
                        selector: e,
                        name: r
                    }),
                    s.addChildBinding(new Se(e))
                }
            }
            function D(e) {
                var t = function(e) {
                    var t = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, e);
                    t.targetShadowDOM = !0
                }
                ;
                return e ? t(e) : t
            }
            function P(e) {
                var t = function(e) {
                    var t = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, e);
                    t.skipContentProcessing = !0
                }
                ;
                return e ? t(e) : t
            }
            function I(e) {
                var t = function(e) {
                    var t = n.Metadata.getOrCreateOwn(n.Metadata.resource, be, e);
                    t.containerless = !0
                }
                ;
                return e ? t(e) : t
            }
            function R(e) {
                return function(t) {
                    n.Metadata.define(q.metadataKey, e, t)
                }
            }
            function _(e) {
                return R(new U(e))
            }
            function F(e) {
                var t = function(e) {
                    n.Metadata.define(q.metadataKey, new K, e)
                }
                ;
                return e ? t(e) : t
            }
            function z(e) {
                var t = function(e) {
                    n.Metadata.define(n.Metadata.resource, new Me, e)
                }
                ;
                return e ? t(e) : t
            }
            e.__esModule = !0;
            var V = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }();
            e.hyphenate = p,
            e.nextElementSibling = f,
            e.behavior = M,
            e.customElement = O,
            e.customAttribute = E,
            e.templateController = T,
            e.bindable = A,
            e.dynamicOptions = $,
            e.sync = N,
            e.useShadowDOM = D,
            e.skipContentProcessing = P,
            e.containerless = I,
            e.viewStrategy = R,
            e.useView = _,
            e.noView = F,
            e.elementConfig = z;
            var H = (u(t),
            {
                enterBegin: "animation:enter:begin",
                enterActive: "animation:enter:active",
                enterDone: "animation:enter:done",
                enterTimeout: "animation:enter:timeout",
                leaveBegin: "animation:leave:begin",
                leaveActive: "animation:leave:active",
                leaveDone: "animation:leave:done",
                leaveTimeout: "animation:leave:timeout",
                staggerNext: "animation:stagger:next",
                removeClassBegin: "animation:remove-class:begin",
                removeClassActive: "animation:remove-class:active",
                removeClassDone: "animation:remove-class:done",
                removeClassTimeout: "animation:remove-class:timeout",
                addClassBegin: "animation:add-class:begin",
                addClassActive: "animation:add-class:active",
                addClassDone: "animation:add-class:done",
                addClassTimeout: "animation:add-class:timeout",
                animateBegin: "animation:animate:begin",
                animateActive: "animation:animate:active",
                animateDone: "animation:animate:done",
                animateTimeout: "animation:animate:timeout",
                sequenceBegin: "animation:sequence:begin",
                sequenceDone: "animation:sequence:done"
            });
            e.animationEvent = H;
            var B = function() {
                function e() {
                    d(this, e)
                }
                return e.configureDefault = function(t, n) {
                    t.registerInstance(e, e.instance = n || new e)
                }
                ,
                e.prototype.move = function() {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.enter = function(e) {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.leave = function(e) {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.removeClass = function(e, t) {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.addClass = function(e, t) {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.animate = function(e, t, n) {
                    return Promise.resolve(!1)
                }
                ,
                e.prototype.runSequence = function(e) {}
                ,
                e.prototype.registerEffect = function(e, t) {}
                ,
                e.prototype.unregisterEffect = function(e) {}
                ,
                e
            }();
            e.Animator = B;
            var W = /([A-Z])/g
              , q = function() {
                function e() {
                    d(this, e)
                }
                return e.prototype.makeRelativeTo = function(e) {}
                ,
                e.normalize = function(t) {
                    if ("string" == typeof t && (t = new U(t)),
                    t && !(t instanceof e))
                        throw new Error("The view must be a string or an instance of ViewStrategy.");
                    return t
                }
                ,
                e.getDefault = function(t) {
                    var r, i;
                    if ("function" != typeof t && (t = t.constructor),
                    i = n.Origin.get(t),
                    r = n.Metadata.get(e.metadataKey, t))
                        i && (r.moduleId = i.moduleId);
                    else {
                        if (!i)
                            throw new Error("Cannot determinte default view strategy for object.",t);
                        r = new G(i.moduleId)
                    }
                    return r
                }
                ,
                V(e, null , [{
                    key: "metadataKey",
                    value: "aurelia:view-strategy",
                    enumerable: !0
                }]),
                e
            }();
            e.ViewStrategy = q;
            var U = function(e) {
                function t(n) {
                    d(this, t),
                    e.call(this),
                    this.path = n
                }
                return c(t, e),
                t.prototype.loadViewFactory = function(e, t) {
                    return !this.absolutePath && this.moduleId && (this.absolutePath = r.relativeToFile(this.path, this.moduleId)),
                    e.loadViewFactory(this.absolutePath || this.path, t, this.moduleId)
                }
                ,
                t.prototype.makeRelativeTo = function(e) {
                    this.absolutePath = r.relativeToFile(this.path, e)
                }
                ,
                t
            }(q);
            e.UseViewStrategy = U;
            var G = function(e) {
                function t(n) {
                    d(this, t),
                    e.call(this),
                    this.moduleId = n,
                    this.viewUrl = t.convertModuleIdToViewUrl(n)
                }
                return c(t, e),
                t.prototype.loadViewFactory = function(e, t) {
                    return e.loadViewFactory(this.viewUrl, t, this.moduleId)
                }
                ,
                t.convertModuleIdToViewUrl = function(e) {
                    var t = e.endsWith(".js") || e.endsWith(".ts") ? e.substring(0, e.length - 3) : e;
                    return t + ".html"
                }
                ,
                t
            }(q);
            e.ConventionalViewStrategy = G;
            var K = function(e) {
                function t() {
                    d(this, t),
                    e.apply(this, arguments)
                }
                return c(t, e),
                t.prototype.loadViewFactory = function() {
                    return Promise.resolve(null )
                }
                ,
                t
            }(q);
            e.NoViewStrategy = K;
            var Q = function(e) {
                function t(n, r) {
                    d(this, t),
                    e.call(this),
                    this.moduleId = n,
                    this.registryEntry = r
                }
                return c(t, e),
                t.prototype.loadViewFactory = function(e, t) {
                    return this.registryEntry.isReady ? Promise.resolve(this.registryEntry.factory) : e.loadViewFactory(this.registryEntry, t, this.moduleId)
                }
                ,
                t
            }(q);
            e.TemplateRegistryViewStrategy = Q;
            var Y = function() {
                function e() {
                    d(this, e)
                }
                return e.prototype.inspectAttribute = function(e, t, n) {
                    throw new Error("A BindingLanguage must implement inspectAttribute(...)")
                }
                ,
                e.prototype.createAttributeInstruction = function(e, t, n, r) {
                    throw new Error("A BindingLanguage must implement createAttributeInstruction(...)")
                }
                ,
                e.prototype.parseText = function(e, t) {
                    throw new Error("A BindingLanguage must implement parseText(...)")
                }
                ,
                e
            }();
            e.BindingLanguage = Y;
            var X = function() {
                function e() {
                    d(this, e),
                    this.attributes = {},
                    this.elements = {},
                    this.valueConverters = {},
                    this.attributeMap = {},
                    this.baseResourceUrl = ""
                }
                return e.prototype.registerElement = function(e, t) {
                    m(this.elements, e, t, "an Element")
                }
                ,
                e.prototype.getElement = function(e) {
                    return this.elements[e]
                }
                ,
                e.prototype.registerAttribute = function(e, t, n) {
                    this.attributeMap[e] = n,
                    m(this.attributes, e, t, "an Attribute")
                }
                ,
                e.prototype.getAttribute = function(e) {
                    return this.attributes[e]
                }
                ,
                e.prototype.registerValueConverter = function(e, t) {
                    m(this.valueConverters, e, t, "a ValueConverter")
                }
                ,
                e.prototype.getValueConverter = function(e) {
                    return this.valueConverters[e]
                }
                ,
                e
            }();
            e.ResourceRegistry = X;
            var Z = function(e) {
                function t(n, r) {
                    d(this, t),
                    e.call(this),
                    this.parent = n,
                    this.viewUrl = r,
                    this.valueConverterLookupFunction = this.getValueConverter.bind(this)
                }
                return c(t, e),
                t.prototype.relativeToView = function(e) {
                    return r.relativeToFile(e, this.viewUrl)
                }
                ,
                t.prototype.getElement = function(e) {
                    return this.elements[e] || this.parent.getElement(e)
                }
                ,
                t.prototype.mapAttribute = function(e) {
                    return this.attributeMap[e] || this.parent.attributeMap[e]
                }
                ,
                t.prototype.getAttribute = function(e) {
                    return this.attributes[e] || this.parent.getAttribute(e)
                }
                ,
                t.prototype.getValueConverter = function(e) {
                    return this.valueConverters[e] || this.parent.getValueConverter(e)
                }
                ,
                t
            }(X);
            e.ViewResources = Z;
            var J = function() {
                function e(t, n, r, i, o, s) {
                    d(this, e),
                    this.fragment = t,
                    this.behaviors = n,
                    this.bindings = r,
                    this.children = i,
                    this.systemControlled = o,
                    this.contentSelectors = s,
                    this.firstChild = t.firstChild,
                    this.lastChild = t.lastChild,
                    this.isBound = !1,
                    this.isAttached = !1
                }
                return e.prototype.created = function(e) {
                    var t, n, r = this.behaviors;
                    for (t = 0,
                    n = r.length; n > t; ++t)
                        r[t].created(e)
                }
                ,
                e.prototype.bind = function(e, t) {
                    var n, r, i, o, s, a;
                    if (n = t && !this.systemControlled ? this.executionContext || e : e || this.executionContext,
                    this.isBound) {
                        if (this.executionContext === n)
                            return;
                        this.unbind()
                    }
                    for (this.isBound = !0,
                    this.executionContext = n,
                    this.owner && this.owner.bind(n),
                    i = this.bindings,
                    s = 0,
                    a = i.length; a > s; ++s)
                        i[s].bind(n);
                    for (r = this.behaviors,
                    s = 0,
                    a = r.length; a > s; ++s)
                        r[s].bind(n);
                    for (o = this.children,
                    s = 0,
                    a = o.length; a > s; ++s)
                        o[s].bind(n, !0)
                }
                ,
                e.prototype.addBinding = function(e) {
                    this.bindings.push(e),
                    this.isBound && e.bind(this.executionContext)
                }
                ,
                e.prototype.unbind = function() {
                    var e, t, n, r, i;
                    if (this.isBound) {
                        for (this.isBound = !1,
                        this.owner && this.owner.unbind(),
                        t = this.bindings,
                        r = 0,
                        i = t.length; i > r; ++r)
                            t[r].unbind();
                        for (e = this.behaviors,
                        r = 0,
                        i = e.length; i > r; ++r)
                            e[r].unbind();
                        for (n = this.children,
                        r = 0,
                        i = n.length; i > r; ++r)
                            n[r].unbind()
                    }
                }
                ,
                e.prototype.insertNodesBefore = function(e) {
                    var t = e.parentNode;
                    t.insertBefore(this.fragment, e)
                }
                ,
                e.prototype.appendNodesTo = function(e) {
                    e.appendChild(this.fragment)
                }
                ,
                e.prototype.removeNodes = function() {
                    for (var e, t = this.firstChild, n = this.lastChild, r = (this.fragment,
                    t), i = !0; i; )
                        r === n && (i = !1),
                        e = r.nextSibling,
                        this.fragment.appendChild(r),
                        r = e
                }
                ,
                e.prototype.attached = function() {
                    var e, t, n, r;
                    if (!this.isAttached) {
                        for (this.isAttached = !0,
                        this.owner && this.owner.attached(),
                        e = this.behaviors,
                        n = 0,
                        r = e.length; r > n; ++n)
                            e[n].attached();
                        for (t = this.children,
                        n = 0,
                        r = t.length; r > n; ++n)
                            t[n].attached()
                    }
                }
                ,
                e.prototype.detached = function() {
                    var e, t, n, r;
                    if (this.isAttached) {
                        for (this.isAttached = !1,
                        this.owner && this.owner.detached(),
                        e = this.behaviors,
                        n = 0,
                        r = e.length; r > n; ++n)
                            e[n].detached();
                        for (t = this.children,
                        n = 0,
                        r = t.length; r > n; ++n)
                            t[n].detached()
                    }
                }
                ,
                e
            }();
            if (e.View = J,
            Element && !Element.prototype.matches) {
                var ee = Element.prototype;
                ee.matches = ee.matchesSelector || ee.mozMatchesSelector || ee.msMatchesSelector || ee.oMatchesSelector || ee.webkitMatchesSelector
            }
            var te = []
              , ne = function() {
                function e(t, n) {
                    d(this, e),
                    this.anchor = t,
                    this.selector = n,
                    this.all = !this.selector,
                    this.groups = []
                }
                return e.applySelectors = function(e, t, n) {
                    for (var r, i, o, s, a = e.fragment.firstChild, l = new Map; a; ) {
                        if (r = a.nextSibling,
                        a.viewSlot) {
                            var u = t.map(function(e) {
                                return e.copyForViewSlot()
                            });
                            a.viewSlot.installContentSelectors(u)
                        } else
                            for (i = 0,
                            o = t.length; o > i; i++)
                                if (s = t[i],
                                s.matches(a)) {
                                    var c = l.get(s);
                                    c || (c = [],
                                    l.set(s, c)),
                                    c.push(a);
                                    break
                                }
                        a = r
                    }
                    for (i = 0,
                    o = t.length; o > i; ++i)
                        s = t[i],
                        n(s, l.get(s) || te)
                }
                ,
                e.prototype.copyForViewSlot = function() {
                    return new e(this.anchor,this.selector)
                }
                ,
                e.prototype.matches = function(e) {
                    return this.all || 1 === e.nodeType && e.matches(this.selector)
                }
                ,
                e.prototype.add = function(e) {
                    var t, n, r = this.anchor, i = r.parentNode;
                    for (t = 0,
                    n = e.length; n > t; ++t)
                        i.insertBefore(e[t], r);
                    this.groups.push(e)
                }
                ,
                e.prototype.insert = function(e, t) {
                    if (t.length) {
                        var n, r, i = g(this.groups, e) || this.anchor, o = i.parentNode;
                        for (n = 0,
                        r = t.length; r > n; ++n)
                            o.insertBefore(t[n], i)
                    }
                    this.groups.splice(e, 0, t)
                }
                ,
                e.prototype.removeAt = function(e, t) {
                    var n, r, i = this.groups[e];
                    for (n = 0,
                    r = i.length; r > n; ++n)
                        t.appendChild(i[n]);
                    this.groups.splice(e, 1)
                }
                ,
                e
            }();
            e.ContentSelector = ne;
            var re = function() {
                function e(t, n, r) {
                    var i = void 0 === arguments[3] ? B.instance : arguments[3];
                    d(this, e),
                    this.anchor = t,
                    this.viewAddMethod = n ? "appendNodesTo" : "insertNodesBefore",
                    this.executionContext = r,
                    this.animator = i,
                    this.children = [],
                    this.isBound = !1,
                    this.isAttached = !1,
                    t.viewSlot = this
                }
                return e.prototype.transformChildNodesIntoView = function() {
                    var e = this.anchor;
                    this.children.push({
                        fragment: e,
                        firstChild: e.firstChild,
                        lastChild: e.lastChild,
                        removeNodes: function() {
                            for (var t; t = e.lastChild; )
                                e.removeChild(t)
                        },
                        created: function() {},
                        bind: function() {},
                        unbind: function() {},
                        attached: function() {},
                        detached: function() {}
                    })
                }
                ,
                e.prototype.bind = function(e) {
                    var t, n, r;
                    if (this.isBound) {
                        if (this.executionContext === e)
                            return;
                        this.unbind()
                    }
                    for (this.isBound = !0,
                    this.executionContext = e = e || this.executionContext,
                    r = this.children,
                    t = 0,
                    n = r.length; n > t; ++t)
                        r[t].bind(e, !0)
                }
                ,
                e.prototype.unbind = function() {
                    var e, t, n = this.children;
                    for (this.isBound = !1,
                    e = 0,
                    t = n.length; t > e; ++e)
                        n[e].unbind()
                }
                ,
                e.prototype.add = function(e) {
                    if (e[this.viewAddMethod](this.anchor),
                    this.children.push(e),
                    this.isAttached) {
                        e.attached();
                        var t = e.firstChild ? f(e.firstChild) : null ;
                        e.firstChild && 8 === e.firstChild.nodeType && t && 1 === t.nodeType && t.classList.contains("au-animate") && this.animator.enter(t)
                    }
                }
                ,
                e.prototype.insert = function(e, t) {
                    0 === e && !this.children.length || e >= this.children.length ? this.add(t) : (t.insertNodesBefore(this.children[e].firstChild),
                    this.children.splice(e, 0, t),
                    this.isAttached && t.attached())
                }
                ,
                e.prototype.remove = function(e) {
                    e.removeNodes(),
                    this.children.splice(this.children.indexOf(e), 1),
                    this.isAttached && e.detached()
                }
                ,
                e.prototype.removeAt = function(e) {
                    var t = this
                      , n = this.children[e]
                      , r = function() {
                        return n.removeNodes(),
                        t.children.splice(e, 1),
                        t.isAttached && n.detached(),
                        n
                    }
                      , i = n.firstChild ? f(n.firstChild) : null ;
                    return n.firstChild && 8 === n.firstChild.nodeType && i && 1 === i.nodeType && i.classList.contains("au-animate") ? this.animator.leave(i).then(function() {
                        return r()
                    }) : r()
                }
                ,
                e.prototype.removeAll = function() {
                    var e, t = this, n = this.children, r = n.length, i = [];
                    n.forEach(function(e) {
                        var n = e.firstChild ? f(e.firstChild) : null ;
                        e.firstChild && 8 === e.firstChild.nodeType && n && 1 === n.nodeType && n.classList.contains("au-animate") ? i.push(t.animator.leave(n).then(function() {
                            e.removeNodes()
                        })) : e.removeNodes()
                    });
                    var o = function() {
                        if (t.isAttached)
                            for (e = 0; r > e; ++e)
                                n[e].detached();
                        t.children = []
                    }
                    ;
                    return i.length > 0 ? Promise.all(i).then(function() {
                        o()
                    }) : void o()
                }
                ,
                e.prototype.swap = function(e) {
                    var t = this
                      , n = this.removeAll();
                    void 0 !== n ? n.then(function() {
                        t.add(e)
                    }) : this.add(e)
                }
                ,
                e.prototype.attached = function() {
                    var e, t, n, r;
                    if (!this.isAttached)
                        for (this.isAttached = !0,
                        n = this.children,
                        e = 0,
                        t = n.length; t > e; ++e) {
                            r = n[e],
                            r.attached();
                            var i = r.firstChild ? f(r.firstChild) : null ;
                            r.firstChild && 8 === r.firstChild.nodeType && i && 1 === i.nodeType && i.classList.contains("au-animate") && this.animator.enter(i)
                        }
                }
                ,
                e.prototype.detached = function() {
                    var e, t, n;
                    if (this.isAttached)
                        for (this.isAttached = !1,
                        n = this.children,
                        e = 0,
                        t = n.length; t > e; ++e)
                            n[e].detached()
                }
                ,
                e.prototype.installContentSelectors = function(e) {
                    this.contentSelectors = e,
                    this.add = this.contentSelectorAdd,
                    this.insert = this.contentSelectorInsert,
                    this.remove = this.contentSelectorRemove,
                    this.removeAt = this.contentSelectorRemoveAt,
                    this.removeAll = this.contentSelectorRemoveAll
                }
                ,
                e.prototype.contentSelectorAdd = function(e) {
                    ne.applySelectors(e, this.contentSelectors, function(e, t) {
                        return e.add(t)
                    }),
                    this.children.push(e),
                    this.isAttached && e.attached()
                }
                ,
                e.prototype.contentSelectorInsert = function(e, t) {
                    0 === e && !this.children.length || e >= this.children.length ? this.add(t) : (ne.applySelectors(t, this.contentSelectors, function(t, n) {
                        return t.insert(e, n)
                    }),
                    this.children.splice(e, 0, t),
                    this.isAttached && t.attached())
                }
                ,
                e.prototype.contentSelectorRemove = function(e) {
                    var t, n, r = this.children.indexOf(e), i = this.contentSelectors;
                    for (t = 0,
                    n = i.length; n > t; ++t)
                        i[t].removeAt(r, e.fragment);
                    this.children.splice(r, 1),
                    this.isAttached && e.detached()
                }
                ,
                e.prototype.contentSelectorRemoveAt = function(e) {
                    var t, n, r = this.children[e], i = this.contentSelectors;
                    for (t = 0,
                    n = i.length; n > t; ++t)
                        i[t].removeAt(e, r.fragment);
                    return this.children.splice(e, 1),
                    this.isAttached && r.detached(),
                    r
                }
                ,
                e.prototype.contentSelectorRemoveAll = function() {
                    var e, t, n, r = this.children, i = this.contentSelectors, o = r.length, s = i.length;
                    for (e = 0; o > e; ++e)
                        for (n = r[e],
                        t = 0; s > t; ++t)
                            i[t].removeAt(e, n.fragment);
                    if (this.isAttached)
                        for (e = 0; o > e; ++e)
                            r[e].detached();
                    this.children = []
                }
                ,
                e
            }();
            e.ViewSlot = re;
            var ie = function() {
                function e(t, n, r) {
                    d(this, e),
                    this.parentContainer = t,
                    this.viewFactory = n,
                    this.executionContext = r,
                    this.factoryOptions = {
                        behaviorInstance: !1
                    }
                }
                return e.prototype.create = function(e) {
                    var t = this.parentContainer.createChild()
                      , n = e || this.executionContext;
                    return this.factoryOptions.systemControlled = !e,
                    this.viewFactory.create(t, n, this.factoryOptions)
                }
                ,
                e
            }();
            e.BoundViewFactory = ie;
            var oe = {
                systemControlled: !1,
                suppressBind: !1
            }
              , se = function() {
                function e(t, n, r) {
                    d(this, e),
                    this.template = t,
                    this.instructions = n,
                    this.resources = r
                }
                return e.prototype.create = function(e, t) {
                    var n, r, i, o = void 0 === arguments[2] ? oe : arguments[2], s = this.template.cloneNode(!0), a = s.querySelectorAll(".au-target"), l = this.instructions, u = this.resources, c = [], d = [], h = [], p = [], f = {
                        root: e
                    }, m = o.partReplacements || this.partReplacements;
                    for (n = 0,
                    r = a.length; r > n; ++n)
                        w(f, t, a[n], l[n], c, d, h, p, m, u);
                    return i = new J(s,c,d,h,o.systemControlled,p),
                    i.created(t),
                    o.suppressBind || i.bind(t),
                    i
                }
                ,
                e
            }();
            e.ViewFactory = se;
            var ae = 0
              , le = {
                targetShadowDOM: !1
            }
              , ue = !!HTMLElement.prototype.createShadowRoot
              , ce = !("content" in document.createElement("template"))
              , de = function() {
                function e(t) {
                    d(this, e),
                    this.bindingLanguage = t
                }
                return e.inject = function() {
                    return [Y]
                }
                ,
                e.prototype.compile = function(e, t) {
                    var n, r, i, o, s = void 0 === arguments[2] ? le : arguments[2], a = [], l = s.targetShadowDOM;
                    if (l = l && ue,
                    s.beforeCompile && s.beforeCompile(e),
                    "string" == typeof e) {
                        if (o = document.createElement("template"),
                        o.innerHTML = e,
                        ce)
                            for (o.content = document.createDocumentFragment(); o.firstChild; )
                                o.content.appendChild(o.firstChild);
                        e = o
                    }
                    e.content ? (r = e.getAttribute("part"),
                    n = document.adoptNode(e.content, !0)) : n = e,
                    this.compileNode(n, t, a, e, "root", !l),
                    n.insertBefore(document.createComment("<view>"), n.firstChild),
                    n.appendChild(document.createComment("</view>"));
                    var i = new se(n,a,t);
                    return r && (i.part = r),
                    i
                }
                ,
                e.prototype.compileNode = function(e, t, n, r, i, o) {
                    switch (e.nodeType) {
                    case 1:
                        return this.compileElement(e, t, n, r, i, o);
                    case 3:
                        var s = this.bindingLanguage.parseText(t, e.wholeText);
                        if (s) {
                            var a = document.createElement("au-marker");
                            for (a.className = "au-target",
                            (e.parentNode || r).insertBefore(a, e),
                            e.textContent = " ",
                            n.push({
                                contentExpression: s
                            }); e.nextSibling && 3 === e.nextSibling.nodeType; )
                                (e.parentNode || r).removeChild(e.nextSibling)
                        } else
                            for (; e.nextSibling && 3 === e.nextSibling.nodeType; )
                                e = e.nextSibling;
                        return e.nextSibling;
                    case 11:
                        for (var l = e.firstChild; l; )
                            l = this.compileNode(l, t, n, e, i, o)
                    }
                    return e.nextSibling
                }
                ,
                e.prototype.compileElement = function(e, t, n, r, i, o) {
                    var s, a, l, u, c, d, h, p, f, m, g, v, y, b, w, S = e.tagName.toLowerCase(), C = e.attributes, L = [], M = [], O = [], E = this.bindingLanguage;
                    if ("content" === S)
                        return o && (n.push({
                            parentInjectorId: i,
                            contentSelector: !0,
                            selector: e.getAttribute("select"),
                            suppressBind: !0
                        }),
                        j(e)),
                        e.nextSibling;
                    for ("template" === S ? (l = this.compile(e, t),
                    l.part = e.getAttribute("part")) : (u = t.getElement(S),
                    u && (c = {
                        type: u,
                        attributes: {}
                    },
                    c.anchorIsContainer = !e.hasAttribute("containerless") && !u.containerless,
                    M.push(c))),
                    h = 0,
                    p = C.length; p > h; ++h)
                        if (f = C[h],
                        m = f.name,
                        g = f.value,
                        y = E.inspectAttribute(t, m, g),
                        u = t.getAttribute(y.attrName),
                        d = null ,
                        u ? (w = t.mapAttribute(y.attrName),
                        w && (b = u.attributes[w],
                        b && (y.defaultBindingMode = b.defaultBindingMode,
                        y.command || y.expression || (y.command = b.hasOptions ? "options" : null )))) : c && (d = c.type.attributes[y.attrName],
                        d && (y.defaultBindingMode = d.defaultBindingMode,
                        y.command || y.expression || (y.command = d.hasOptions ? "options" : null ))),
                        v = d ? E.createAttributeInstruction(t, e, y, c) : E.createAttributeInstruction(t, e, y))
                            if (v.alteredAttr && (u = t.getAttribute(v.attrName)),
                            v.discrete)
                                L.push(v);
                            else if (u) {
                                if (v.type = u,
                                k(v, t),
                                u.liftsContent) {
                                    v.originalAttrName = m,
                                    a = v;
                                    break
                                }
                                M.push(v)
                            } else
                                d ? c.attributes[y.attrName].targetProperty = d.name : L.push(v.attributes[v.attrName]);
                        else if (u) {
                            if (v = {
                                attrName: m,
                                type: u,
                                attributes: {}
                            },
                            v.attributes[t.mapAttribute(m)] = g,
                            u.liftsContent) {
                                v.originalAttrName = m,
                                a = v;
                                break
                            }
                            M.push(v)
                        } else
                            d && (c.attributes[m] = g);
                    if (a)
                        a.viewFactory = l,
                        e = a.type.compile(this, t, e, a, r),
                        j(e),
                        n.push({
                            anchorIsContainer: !1,
                            parentInjectorId: i,
                            expressions: [],
                            behaviorInstructions: [a],
                            viewFactory: a.viewFactory,
                            providers: [a.type.target]
                        });
                    else {
                        var T = M.length ? x() : !1;
                        if (L.length || M.length) {
                            for (h = 0,
                            p = M.length; p > h; ++h)
                                v = M[h],
                                v.type.compile(this, t, e, v, r),
                                O.push(v.type.target);
                            for (h = 0,
                            p = L.length; p > h; ++h)
                                s = L[h],
                                void 0 !== s.attrToRemove && e.removeAttribute(s.attrToRemove);
                            j(e),
                            n.push({
                                anchorIsContainer: c ? c.anchorIsContainer : !0,
                                isCustomElement: !!c,
                                injectorId: T,
                                parentInjectorId: i,
                                expressions: L,
                                behaviorInstructions: M,
                                providers: O
                            })
                        }
                        if (c && c.type.skipContentProcessing)
                            return e.nextSibling;
                        for (var A = e.firstChild; A; )
                            A = this.compileNode(A, t, n, e, T || i, o)
                    }
                    return e.nextSibling
                }
                ,
                e
            }();
            e.ViewCompiler = de;
            var he = l.getLogger("templating")
              , pe = function() {
                function e(t, n, r, i, o) {
                    d(this, e),
                    this.loader = t,
                    this.container = n,
                    this.viewCompiler = r,
                    this.moduleAnalyzer = i,
                    this.appResources = o
                }
                return e.inject = function() {
                    return [o.Loader, i.Container, de, ke, X]
                }
                ,
                e.prototype.loadViewFactory = function(e, t, n) {
                    var r = this;
                    return S(this.loader, e).then(function(e) {
                        return e.onReady ? e.onReady : e.onReady = r.loadTemplateResources(e, n).then(function(n) {
                            e.setResources(n);
                            var i = r.viewCompiler.compile(e.template, n, t);
                            return e.setFactory(i),
                            i
                        })
                    })
                }
                ,
                e.prototype.loadTemplateResources = function(e, t) {
                    var n, r, i = new Z(this.appResources,e.id), o = e.dependencies;
                    return 0 !== o.length || t ? (n = o.map(function(e) {
                        return e.src
                    }),
                    r = o.map(function(e) {
                        return e.name
                    }),
                    he.debug("importing resources for " + e.id, n),
                    this.importViewResources(n, r, i, t)) : Promise.resolve(i)
                }
                ,
                e.prototype.importViewModelResource = function(e, t) {
                    var r = this;
                    return this.loader.loadModule(e).then(function(i) {
                        var o = n.Origin.get(i).moduleId
                          , s = r.moduleAnalyzer.analyze(o, i, t);
                        if (!s.mainResource)
                            throw new Error('No view model found in module "' + e + '".');
                        return s.analyze(r.container),
                        s.mainResource
                    })
                }
                ,
                e.prototype.importViewResources = function(e, t, r, i) {
                    var o = this;
                    return this.loader.loadAllModules(e).then(function(e) {
                        var s, a, l, u, c, d, h = o.container, p = o.moduleAnalyzer, f = new Array(e.length);
                        for (s = 0,
                        a = e.length; a > s; ++s)
                            c = e[s],
                            u = n.Origin.get(c).moduleId,
                            l = p.analyze(u, c),
                            l.analyze(h),
                            l.register(r, t[s]),
                            f[s] = l;
                        for (i && (d = p.getAnalysis(i),
                        d && d.register(r)),
                        s = 0,
                        a = f.length; a > s; ++s)
                            f[s] = f[s].load(h);
                        return Promise.all(f).then(function() {
                            return r
                        })
                    })
                }
                ,
                e
            }();
            e.ViewEngine = pe;
            var fe = function() {
                function e(t, n, r) {
                    d(this, e),
                    this.behavior = t,
                    this.executionContext = n,
                    this.isAttached = !1;
                    var i, o, s = t.observerLocator.getOrCreateObserversLookup(n), a = t.handlesBind, l = r.attributes, u = this.boundProperties = [], c = t.properties;
                    for (t.ensurePropertiesDefined(n, s),
                    i = 0,
                    o = c.length; o > i; ++i)
                        c[i].initialize(n, s, l, a, u)
                }
                return e.createForUnitTest = function(t, n, r) {
                    var o = xe.get(t);
                    o.analyze(i.Container.instance);
                    var s = i.Container.instance.get(t)
                      , a = new e(o.metadata,s,{
                        attributes: n || {}
                    });
                    return a.bind(r || {}),
                    s
                }
                ,
                e.prototype.created = function(e) {
                    this.behavior.handlesCreated && this.executionContext.created(e)
                }
                ,
                e.prototype.bind = function(e) {
                    var t, n, r, i, o, s = this.behavior.handlesBind, a = this.boundProperties;
                    for (t = 0,
                    n = a.length; n > t; ++t)
                        r = a[t],
                        i = r.observer,
                        o = i.selfSubscriber,
                        i.publishing = !1,
                        s && (i.selfSubscriber = null ),
                        r.binding.bind(e),
                        i.call(),
                        i.publishing = !0,
                        i.selfSubscriber = o;
                    s && this.executionContext.bind(e),
                    this.view && this.view.bind(this.executionContext)
                }
                ,
                e.prototype.unbind = function() {
                    var e, t, n = this.boundProperties;
                    for (this.view && this.view.unbind(),
                    this.behavior.handlesUnbind && this.executionContext.unbind(),
                    e = 0,
                    t = n.length; t > e; ++e)
                        n[e].binding.unbind()
                }
                ,
                e.prototype.attached = function() {
                    this.isAttached || (this.isAttached = !0,
                    this.behavior.handlesAttached && this.executionContext.attached(),
                    this.view && this.view.attached())
                }
                ,
                e.prototype.detached = function() {
                    this.isAttached && (this.isAttached = !1,
                    this.view && this.view.detached(),
                    this.behavior.handlesDetached && this.executionContext.detached())
                }
                ,
                e
            }();
            e.BehaviorInstance = fe;
            var me = function() {
                function e(t) {
                    d(this, e),
                    "string" == typeof t ? this.name = t : Object.assign(this, t),
                    this.attribute = this.attribute || p(this.name),
                    this.defaultBindingMode = this.defaultBindingMode || s.bindingMode.oneWay,
                    this.changeHandler = this.changeHandler || null ,
                    this.owner = null
                }
                return e.prototype.registerWith = function(e, t, n) {
                    return t.properties.push(this),
                    t.attributes[this.attribute] = this,
                    this.owner = t,
                    n ? (this.descriptor = n,
                    this.configureDescriptor(t, n)) : void 0
                }
                ,
                e.prototype.configureDescriptor = function(e, t) {
                    var n = this.name;
                    return t.configurable = !0,
                    t.enumerable = !0,
                    "initializer" in t && (this.defaultValue = t.initializer,
                    delete t.initializer,
                    delete t.writable),
                    "value" in t && (this.defaultValue = t.value,
                    delete t.value,
                    delete t.writable),
                    t.get = function() {
                        return C(e, this, n).getValue()
                    }
                    ,
                    t.set = function(t) {
                        C(e, this, n).setValue(t)
                    }
                    ,
                    t.get.getObserver = function(t) {
                        return C(e, t, n)
                    }
                    ,
                    t
                }
                ,
                e.prototype.defineOn = function(e, t) {
                    var n, r = this.name;
                    null  === this.changeHandler && (n = r + "Changed",
                    n in e.prototype && (this.changeHandler = n)),
                    this.descriptor || Object.defineProperty(e.prototype, r, this.configureDescriptor(t, {}))
                }
                ,
                e.prototype.createObserver = function(e) {
                    var t, n = null , r = this.defaultValue, i = this.changeHandler, o = this.name;
                    if (!this.hasOptions) {
                        if (i in e)
                            n = "propertyChanged" in e ? function(t, n) {
                                e[i](t, n),
                                e.propertyChanged(o, t, n)
                            }
                             : function(t, n) {
                                return e[i](t, n)
                            }
                            ;
                        else if ("propertyChanged" in e)
                            n = function(t, n) {
                                return e.propertyChanged(o, t, n)
                            }
                            ;
                        else if (null  !== i)
                            throw new Error("Change handler " + i + " was specified but not delcared on the class.");
                        return void 0 !== r && (t = "function" == typeof r ? r.call(e) : r),
                        new ge(this.owner.taskQueue,e,this.name,n,t)
                    }
                }
                ,
                e.prototype.initialize = function(e, t, n, r, i) {
                    var o, s, a, l = this.defaultValue;
                    if (this.isDynamic)
                        for (var u in n)
                            this.createDynamicProperty(e, t, r, u, n[u], i);
                    else
                        this.hasOptions || (s = t[this.name],
                        void 0 !== n && (o = s.selfSubscriber,
                        a = n[this.attribute],
                        r && (s.selfSubscriber = null ),
                        "string" == typeof a ? (e[this.name] = a,
                        s.call()) : a ? i.push({
                            observer: s,
                            binding: a.createBinding(e)
                        }) : void 0 !== l && s.call(),
                        s.selfSubscriber = o),
                        s.publishing = !0)
                }
                ,
                e.prototype.createDynamicProperty = function(e, t, n, r, i, o) {
                    var s, a, l = r + "Changed", u = null ;
                    l in e ? u = "propertyChanged" in e ? function(t, n) {
                        e[l](t, n),
                        e.propertyChanged(r, t, n)
                    }
                     : function(t, n) {
                        return e[l](t, n)
                    }
                     : "propertyChanged" in e && (u = function(t, n) {
                        return e.propertyChanged(r, t, n)
                    }
                    ),
                    s = t[r] = new ge(this.owner.taskQueue,e,r,u),
                    Object.defineProperty(e, r, {
                        configurable: !0,
                        enumerable: !0,
                        get: s.getValue.bind(s),
                        set: s.setValue.bind(s)
                    }),
                    n && (s.selfSubscriber = null ),
                    "string" == typeof i ? (e[r] = i,
                    s.call()) : i && (a = {
                        observer: s,
                        binding: i.createBinding(e)
                    },
                    o.push(a)),
                    s.publishing = !0,
                    s.selfSubscriber = u
                }
                ,
                e
            }();
            e.BindableProperty = me;
            var ge = function() {
                function e(t, n, r, i, o) {
                    d(this, e),
                    this.taskQueue = t,
                    this.obj = n,
                    this.propertyName = r,
                    this.callbacks = [],
                    this.notqueued = !0,
                    this.publishing = !1,
                    this.selfSubscriber = i,
                    this.currentValue = this.oldValue = o
                }
                return e.prototype.getValue = function() {
                    return this.currentValue
                }
                ,
                e.prototype.setValue = function(e) {
                    var t = this.currentValue;
                    t !== e && (this.publishing && this.notqueued && (this.notqueued = !1,
                    this.taskQueue.queueMicroTask(this)),
                    this.oldValue = t,
                    this.currentValue = e)
                }
                ,
                e.prototype.call = function() {
                    var e = this.callbacks
                      , t = e.length
                      , n = this.oldValue
                      , r = this.currentValue;
                    if (this.notqueued = !0,
                    r !== n) {
                        for (null  !== this.selfSubscriber && this.selfSubscriber(r, n); t--; )
                            e[t](r, n);
                        this.oldValue = r
                    }
                }
                ,
                e.prototype.subscribe = function(e) {
                    var t = this.callbacks;
                    return t.push(e),
                    function() {
                        t.splice(t.indexOf(e), 1)
                    }
                }
                ,
                e
            }()
              , ve = {
                suppressBind: !1
            }
              , ye = {
                suppressBind: !0
            }
              , ue = !!HTMLElement.prototype.createShadowRoot
              , be = function() {
                function e() {
                    d(this, e),
                    this.elementName = null ,
                    this.attributeName = null ,
                    this.attributeDefaultBindingMode = void 0,
                    this.liftsContent = !1,
                    this.targetShadowDOM = !1,
                    this.skipContentProcessing = !1,
                    this.usesShadowDOM = !1,
                    this.childBindings = null ,
                    this.hasDynamicOptions = !1,
                    this.containerless = !1,
                    this.properties = [],
                    this.attributes = {}
                }
                return e.convention = function(t, n) {
                    var r;
                    return t.endsWith("CustomAttribute") && (r = n || new e,
                    r.attributeName = p(t.substring(0, t.length - 15))),
                    t.endsWith("CustomElement") && (r = n || new e,
                    r.elementName = p(t.substring(0, t.length - 13))),
                    r
                }
                ,
                e.prototype.addChildBinding = function(e) {
                    null  === this.childBindings && (this.childBindings = []),
                    this.childBindings.push(e)
                }
                ,
                e.prototype.analyze = function(e, t) {
                    var n, r, i, o = t.prototype, l = this.properties, u = this.attributeName, c = this.attributeDefaultBindingMode;
                    if (this.observerLocator = e.get(s.ObserverLocator),
                    this.taskQueue = e.get(a.TaskQueue),
                    this.target = t,
                    this.usesShadowDOM = this.targetShadowDOM && ue,
                    this.handlesCreated = "created" in o,
                    this.handlesBind = "bind" in o,
                    this.handlesUnbind = "unbind" in o,
                    this.handlesAttached = "attached" in o,
                    this.handlesDetached = "detached" in o,
                    this.htmlName = this.elementName || this.attributeName,
                    this.apiName = this.htmlName.replace(/-([a-z])/g, function(e, t) {
                        return t.toUpperCase()
                    }),
                    null  !== u)
                        if (0 === l.length && new me({
                            name: "value",
                            changeHandler: "valueChanged" in o ? "valueChanged" : null ,
                            attribute: u,
                            defaultBindingMode: c
                        }).registerWith(t, this),
                        i = l[0],
                        1 === l.length && "value" === i.name)
                            i.isDynamic = i.hasOptions = this.hasDynamicOptions,
                            i.defineOn(t, this);
                        else {
                            for (n = 0,
                            r = l.length; r > n; ++n)
                                l[n].defineOn(t, this);
                            i = new me({
                                name: "value",
                                changeHandler: "valueChanged" in o ? "valueChanged" : null ,
                                attribute: u,
                                defaultBindingMode: c
                            }),
                            i.hasOptions = !0,
                            i.registerWith(t, this)
                        }
                    else
                        for (n = 0,
                        r = l.length; r > n; ++n)
                            l[n].defineOn(t, this)
                }
                ,
                e.prototype.load = function(e, t, r, i) {
                    var o, s = this;
                    return null  !== this.elementName ? (r = r || this.viewStrategy || q.getDefault(t),
                    o = {
                        targetShadowDOM: this.targetShadowDOM,
                        beforeCompile: t.beforeCompile
                    },
                    r.moduleId || (r.moduleId = n.Origin.get(t).moduleId),
                    r.loadViewFactory(e.get(pe), o).then(function(e) {
                        return i && s.viewFactory || (s.viewFactory = e),
                        e
                    })) : Promise.resolve(this)
                }
                ,
                e.prototype.register = function(e, t) {
                    null  !== this.attributeName && e.registerAttribute(t || this.attributeName, this, this.attributeName),
                    null  !== this.elementName && e.registerElement(t || this.elementName, this)
                }
                ,
                e.prototype.compile = function(e, t, n, r, i) {
                    if (this.liftsContent) {
                        if (!r.viewFactory) {
                            var o = document.createElement("template")
                              , s = document.createDocumentFragment()
                              , a = n.getAttribute("part");
                            n.removeAttribute(r.originalAttrName),
                            n.parentNode ? n.parentNode.replaceChild(o, n) : window.ShadowDOMPolyfill ? ShadowDOMPolyfill.unwrap(i).replaceChild(ShadowDOMPolyfill.unwrap(o), ShadowDOMPolyfill.unwrap(n)) : i.replaceChild(o, n),
                            s.appendChild(n),
                            r.viewFactory = e.compile(s, t),
                            a && (r.viewFactory.part = a,
                            n.removeAttribute("part")),
                            n = o
                        }
                    } else if (null  !== this.elementName) {
                        var l = {};
                        if (!this.skipContentProcessing && n.hasChildNodes())
                            if (this.usesShadowDOM)
                                for (var u, c, d = n.firstChild; d; )
                                    u = d.nextSibling,
                                    "TEMPLATE" === d.tagName && (c = d.getAttribute("replace-part")) && (l[c] = e.compile(d, t)),
                                    d = u;
                            else {
                                for (var u, s = document.createDocumentFragment(), d = n.firstChild; d; )
                                    u = d.nextSibling,
                                    "TEMPLATE" === d.tagName && (c = d.getAttribute("replace-part")) ? l[c] = e.compile(d, t) : s.appendChild(d),
                                    d = u;
                                r.contentFactory = e.compile(s, t)
                            }
                    }
                    return r.partReplacements = l,
                    r.suppressBind = !0,
                    n
                }
                ,
                e.prototype.create = function(e) {
                    var t, n, r = void 0 === arguments[1] ? ve : arguments[1], i = void 0 === arguments[2] ? null  : arguments[2], o = void 0 === arguments[3] ? null  : arguments[3], s = r.executionContext || e.get(this.target), a = new fe(this,s,r), l = this.childBindings;
                    if (this.liftsContent)
                        i.primaryBehavior = a;
                    else if (null  !== this.elementName) {
                        if (t = r.viewFactory || this.viewFactory,
                        t && (a.view = t.create(e, s, r)),
                        i) {
                            if (i.primaryBehavior = a,
                            n = this.usesShadowDOM ? i.createShadowRoot() : i,
                            a.view) {
                                if (!this.usesShadowDOM && r.contentFactory) {
                                    var u = r.contentFactory.create(e, null , ye);
                                    ne.applySelectors(u, a.view.contentSelectors, function(e, t) {
                                        return e.add(t)
                                    }),
                                    a.contentView = u
                                }
                                if (r.anchorIsContainer) {
                                    if (null  !== l)
                                        for (var c = 0, d = l.length; d > c; ++c)
                                            a.view.addBinding(l[c].create(n, s));
                                    a.view.appendNodesTo(n)
                                } else
                                    a.view.insertNodesBefore(n)
                            } else if (null  !== l)
                                for (var c = 0, d = l.length; d > c; ++c)
                                    o.push(l[c].create(i, s))
                        } else if (a.view) {
                            if (a.view.owner = a,
                            null  !== l)
                                for (var c = 0, d = l.length; d > c; ++c)
                                    a.view.addBinding(l[c].create(r.host, s))
                        } else if (null  !== l)
                            for (var c = 0, d = l.length; d > c; ++c)
                                o.push(l[c].create(r.host, s))
                    } else if (null  !== l)
                        for (var c = 0, d = l.length; d > c; ++c)
                            o.push(l[c].create(i, s));
                    return i && (this.apiName in i || (i[this.apiName] = s),
                    this.htmlName in i || (i[this.htmlName] = a)),
                    a
                }
                ,
                e.prototype.ensurePropertiesDefined = function(e, t) {
                    var n, r, i, o;
                    if (!("__propertiesDefined__" in t))
                        for (t.__propertiesDefined__ = !0,
                        n = this.properties,
                        r = 0,
                        i = n.length; i > r; ++r)
                            o = n[r].createObserver(e),
                            void 0 !== o && (t[o.propertyName] = o)
                }
                ,
                e
            }();
            e.HtmlBehaviorResource = be;
            var we = function() {
                function e(t) {
                    d(this, e),
                    this.id = t,
                    this.moduleInstance = null ,
                    this.mainResource = null ,
                    this.resources = null ,
                    this.viewStrategy = null ,
                    this.isAnalyzed = !1
                }
                return e.prototype.analyze = function(e) {
                    var t, n, r = this.mainResource, i = this.resources, o = this.viewStrategy;
                    if (!this.isAnalyzed)
                        for (this.isAnalyzed = !0,
                        r && (r.metadata.viewStrategy = o,
                        r.analyze(e)),
                        t = 0,
                        n = i.length; n > t; ++t)
                            r = i[t],
                            r.metadata.viewStrategy = o,
                            r.analyze(e)
                }
                ,
                e.prototype.register = function(e, t) {
                    var n, r, i = this.resources;
                    for (this.mainResource && (this.mainResource.register(e, t),
                    t = null ),
                    n = 0,
                    r = i.length; r > n; ++n)
                        i[n].register(e, t),
                        t = null
                }
                ,
                e.prototype.load = function(e) {
                    if (this.onLoaded)
                        return this.onLoaded;
                    var t, n, r = this.mainResource, i = this.resources, o = [];
                    for (r && o.push(r.load(e)),
                    t = 0,
                    n = i.length; n > t; ++t)
                        o.push(i[t].load(e));
                    return this.onLoaded = Promise.all(o),
                    this.onLoaded
                }
                ,
                e
            }();
            e.ResourceModule = we;
            var xe = function() {
                function e(t, r, i) {
                    d(this, e),
                    i || (i = n.Metadata.get(n.Metadata.resource, r),
                    i || (i = new be,
                    i.elementName = p(t),
                    n.Metadata.define(n.Metadata.resource, i, r))),
                    i instanceof be ? void 0 === i.elementName ? i.elementName = p(t) : void 0 === i.attributeName ? i.attributeName = p(t) : null  === i.attributeName && null  === i.elementName && be.convention(t, i) : i.name || (i.name = p(t)),
                    this.metadata = i,
                    this.value = r
                }
                return e.prototype.analyze = function(e) {
                    var t = this.metadata
                      , n = this.value;
                    "analyze" in t && t.analyze(e, n)
                }
                ,
                e.prototype.register = function(e, t) {
                    this.metadata.register(e, t)
                }
                ,
                e.prototype.load = function(e) {
                    var t = this.metadata
                      , n = this.value;
                    return "load" in t ? t.load(e, n) : void 0
                }
                ,
                e.get = function(t) {
                    var r, i = void 0 === arguments[1] ? "custom-resource" : arguments[1], o = n.Metadata.get(n.Metadata.resource, t);
                    return o ? (null  === o.attributeName && null  === o.elementName && be.convention(i, o),
                    null  === o.attributeName && null  === o.elementName && (o.elementName = p(i)),
                    r = new e(i,t,o)) : (o = be.convention(i)) ? (r = new e(i,t,o),
                    n.Metadata.define(n.Metadata.resource, o, t)) : (o = s.ValueConverterResource.convention(i)) && (r = new e(i,t,o),
                    n.Metadata.define(n.Metadata.resource, o, t)),
                    r
                }
                ,
                e
            }();
            e.ResourceDescription = xe;
            var ke = function() {
                function e() {
                    d(this, e),
                    this.cache = {}
                }
                return e.prototype.getAnalysis = function(e) {
                    return this.cache[e]
                }
                ,
                e.prototype.analyze = function(e, t, r) {
                    var i, a, l, u, c, d, h, f, m, g = [];
                    if (m = this.cache[e])
                        return m;
                    m = new we(e),
                    this.cache[e] = m,
                    "function" == typeof t && (t = {
                        "default": t
                    }),
                    r && (i = new xe(r,t[r]));
                    for (c in t)
                        d = t[c],
                        c !== r && "function" == typeof d && (u = n.Metadata.get(n.Metadata.resource, d),
                        u ? (null  === u.attributeName && null  === u.elementName && be.convention(c, u),
                        null  === u.attributeName && null  === u.elementName && (u.elementName = p(c)),
                        !i && u instanceof be && null  !== u.elementName ? i = new xe(c,d,u) : g.push(new xe(c,d,u))) : d instanceof q ? f = d : d instanceof o.TemplateRegistryEntry ? f = new Q(e,d) : (h = be.convention(c)) ? (null  === h.elementName || i ? g.push(new xe(c,d,h)) : i = new xe(c,d,h),
                        n.Metadata.define(n.Metadata.resource, h, d)) : (h = s.ValueConverterResource.convention(c)) ? (g.push(new xe(c,d,h)),
                        n.Metadata.define(n.Metadata.resource, h, d)) : a || (a = d,
                        l = c));
                    return !i && a && (i = new xe(l,a)),
                    m.moduleInstance = t,
                    m.mainResource = i,
                    m.resources = g,
                    m.viewStrategy = f,
                    m
                }
                ,
                e
            }();
            e.ModuleAnalyzer = ke;
            var je = []
              , Se = function() {
                function e(t) {
                    d(this, e),
                    this.name = t.name,
                    this.changeHandler = t.changeHandler || this.name + "Changed",
                    this.selector = t.selector
                }
                return e.prototype.create = function(e, t) {
                    return new Ce(this.selector,e,this.name,t,this.changeHandler)
                }
                ,
                e
            }();
            e.ChildObserver = Se;
            var Ce = function() {
                function e(t, n, r, i, o) {
                    d(this, e),
                    this.selector = t,
                    this.target = n,
                    this.property = r,
                    this.behavior = i,
                    this.changeHandler = o in i ? o : null ,
                    this.observer = new MutationObserver(this.onChange.bind(this))
                }
                return e.prototype.bind = function(e) {
                    var t, n, r, i, o, s = this.behavior;
                    for (this.observer.observe(this.target, {
                        childList: !0,
                        subtree: !0
                    }),
                    t = s[this.property],
                    t ? t.length = 0 : t = s[this.property] = [],
                    n = this.target.querySelectorAll(this.selector),
                    r = 0,
                    i = n.length; i > r; ++r)
                        o = n[r],
                        t.push(o.primaryBehavior ? o.primaryBehavior.executionContext : o);
                    null  !== this.changeHandler && this.behavior[this.changeHandler](je)
                }
                ,
                e.prototype.unbind = function() {
                    this.observer.disconnect()
                }
                ,
                e.prototype.onChange = function(e) {
                    var t = this.behavior[this.property]
                      , n = this.selector;
                    e.forEach(function(e) {
                        var r, i, o, s, a, l = e.addedNodes, u = e.removedNodes, c = e.previousSibling;
                        for (r = 0,
                        i = u.length; i > r; ++r)
                            a = u[r],
                            1 === a.nodeType && a.matches(n) && (o = a.primaryBehavior ? a.primaryBehavior.executionContext : a,
                            s = t.indexOf(o),
                            -1 != s && t.splice(s, 1));
                        for (r = 0,
                        i = l.length; i > r; ++r)
                            if (a = l[r],
                            1 === a.nodeType && a.matches(n)) {
                                for (o = a.primaryBehavior ? a.primaryBehavior.executionContext : a,
                                s = 0; c; )
                                    1 === c.nodeType && c.matches(n) && s++,
                                    c = c.previousSibling;
                                t.splice(s, 0, o)
                            }
                    }),
                    null  !== this.changeHandler && this.behavior[this.changeHandler](e)
                }
                ,
                e
            }();
            e.ChildObserverBinder = Ce;
            var Le = function() {
                function e(t) {
                    d(this, e),
                    this.viewEngine = t
                }
                return e.inject = function() {
                    return [pe]
                }
                ,
                e.prototype.activate = function(e) {
                    return e.skipActivation || "function" != typeof e.viewModel.activate ? Promise.resolve() : e.viewModel.activate(e.model) || Promise.resolve()
                }
                ,
                e.prototype.createBehaviorAndSwap = function(e) {
                    return this.createBehavior(e).then(function(t) {
                        return t.view.bind(t.executionContext),
                        e.viewSlot.swap(t.view),
                        e.currentBehavior && e.currentBehavior.unbind(),
                        t
                    })
                }
                ,
                e.prototype.createBehavior = function(e) {
                    var t, r = e.childContainer, i = e.viewModelResource, o = e.viewModel;
                    return this.activate(e).then(function() {
                        var s, a, l;
                        return "getViewStrategy" in o && !e.view && (a = !0,
                        e.view = q.normalize(o.getViewStrategy())),
                        e.view && (a ? (l = n.Origin.get(o.constructor),
                        l && e.view.makeRelativeTo(l.moduleId)) : e.viewResources && e.view.makeRelativeTo(e.viewResources.viewUrl)),
                        i ? (t = i.metadata,
                        s = t.load(r, i.value, e.view, !0)) : (t = new be,
                        t.elementName = "dynamic-element",
                        t.analyze(e.container || r, o.constructor),
                        s = t.load(r, o.constructor, e.view, !0).then(function(e) {
                            return e
                        })),
                        s.then(function(n) {
                            return t.create(r, {
                                executionContext: o,
                                viewFactory: n,
                                suppressBind: !0,
                                host: e.host
                            })
                        })
                    })
                }
                ,
                e.prototype.createViewModel = function(e) {
                    var t = e.childContainer || e.container.createChild();
                    return e.viewModel = e.viewResources ? e.viewResources.relativeToView(e.viewModel) : e.viewModel,
                    this.viewEngine.importViewModelResource(e.viewModel).then(function(n) {
                        return t.autoRegister(n.value),
                        e.host && t.registerInstance(Element, e.host),
                        e.viewModel = t.viewModel = t.get(n.value),
                        e.viewModelResource = n,
                        e
                    })
                }
                ,
                e.prototype.compose = function(e) {
                    var t = this;
                    return e.childContainer = e.childContainer || e.container.createChild(),
                    e.view = q.normalize(e.view),
                    e.viewModel ? "string" == typeof e.viewModel ? this.createViewModel(e).then(function(e) {
                        return t.createBehaviorAndSwap(e)
                    }) : this.createBehaviorAndSwap(e) : e.view ? (e.viewResources && e.view.makeRelativeTo(e.viewResources.viewUrl),
                    e.view.loadViewFactory(this.viewEngine).then(function(t) {
                        var n = t.create(e.childContainer, e.executionContext);
                        return e.viewSlot.swap(n),
                        n
                    })) : e.viewSlot ? (e.viewSlot.removeAll(),
                    Promise.resolve(null )) : void 0
                }
                ,
                e
            }();
            e.CompositionEngine = Le;
            var Me = function() {
                function e() {
                    d(this, e)
                }
                return e.prototype.load = function(e, t) {
                    var n = new t
                      , r = e.get(s.EventManager);
                    return r.registerElementConfig(n),
                    Promise.resolve(this)
                }
                ,
                e.prototype.register = function() {}
                ,
                e
            }();
            e.ElementConfigResource = Me,
            n.Decorators.configure.parameterizedDecorator("behavior", M),
            n.Decorators.configure.parameterizedDecorator("customElement", O),
            n.Decorators.configure.parameterizedDecorator("customAttribute", E),
            n.Decorators.configure.simpleDecorator("templateController", T),
            n.Decorators.configure.parameterizedDecorator("bindable", A),
            n.Decorators.configure.simpleDecorator("dynamicOptions", $),
            n.Decorators.configure.parameterizedDecorator("sync", N),
            n.Decorators.configure.simpleDecorator("useShadowDOM", D),
            n.Decorators.configure.simpleDecorator("skipContentProcessing", P),
            n.Decorators.configure.simpleDecorator("containerless", I),
            n.Decorators.configure.parameterizedDecorator("viewStrategy", _),
            n.Decorators.configure.parameterizedDecorator("useView", _),
            n.Decorators.configure.simpleDecorator("noView", F),
            n.Decorators.configure.simpleDecorator("elementConfig", z)
        }
        .call(t, t, e("npm:core-js@0.9.18"), e("github:aurelia/metadata@0.7.0"), e("github:aurelia/path@0.8.0"), e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/loader@0.8.0"), e("github:aurelia/binding@0.8.1"), e("github:aurelia/task-queue@0.6.0"), e("github:aurelia/logging@0.6.0"))
    })
}(),
System.register("npm:core-js@0.9.18/modules/es5", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.dom-create", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.throws"], !0, function(require, e, t) {
    function n(e, t) {
        return function(n) {
            var r, i = E(n), o = 0, s = [];
            for (r in i)
                r != f && j(i, r) && s.push(r);
            for (; t > o; )
                j(i, r = e[o++]) && (~N(s, r) || s.push(r));
            return s
        }
    }
    function r() {}
    function i(e) {
        return function(t, n) {
            m.fn(t);
            var r = E(this)
              , i = T(r.length)
              , o = e ? i - 1 : 0
              , s = e ? -1 : 1;
            if (arguments.length < 2)
                for (; ; ) {
                    if (o in r) {
                        n = r[o],
                        o += s;
                        break
                    }
                    o += s,
                    m(e ? o >= 0 : i > o, "Reduce of empty array with no initial value")
                }
            for (; e ? o >= 0 : i > o; o += s)
                o in r && (n = t(n, r[o], o, this));
            return n
        }
    }
    function o(e) {
        return e > 9 ? e : "0" + e
    }
    var s = System.global
      , a = s.define;
    s.define = void 0;
    var l = require("npm:core-js@0.9.18/modules/$")
      , u = require("npm:core-js@0.9.18/modules/$.dom-create")
      , c = require("npm:core-js@0.9.18/modules/$.cof")
      , d = require("npm:core-js@0.9.18/modules/$.def")
      , h = require("npm:core-js@0.9.18/modules/$.invoke")
      , p = require("npm:core-js@0.9.18/modules/$.array-methods")
      , f = require("npm:core-js@0.9.18/modules/$.uid").safe("__proto__")
      , m = require("npm:core-js@0.9.18/modules/$.assert")
      , g = m.obj
      , v = Object.prototype
      , y = l.html
      , b = []
      , w = b.slice
      , x = b.join
      , k = c.classof
      , j = l.has
      , S = l.setDesc
      , C = l.getDesc
      , L = l.setDescs
      , M = l.isFunction
      , O = l.isObject
      , E = l.toObject
      , T = l.toLength
      , A = l.toIndex
      , $ = !1
      , N = require("npm:core-js@0.9.18/modules/$.array-includes")(!1)
      , D = p(0)
      , P = p(1)
      , I = p(2)
      , R = p(3)
      , _ = p(4);
    if (!l.DESC) {
        try {
            $ = 8 == S(u("div"), "x", {
                get: function() {
                    return 8
                }
            }).x
        } catch (F) {}
        l.setDesc = function(e, t, n) {
            if ($)
                try {
                    return S(e, t, n)
                } catch (r) {}
            if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported!");
            return "value" in n && (g(e)[t] = n.value),
            e
        }
        ,
        l.getDesc = function(e, t) {
            if ($)
                try {
                    return C(e, t)
                } catch (n) {}
            return j(e, t) ? l.desc(!v.propertyIsEnumerable.call(e, t), e[t]) : void 0
        }
        ,
        l.setDescs = L = function(e, t) {
            g(e);
            for (var n, r = l.getKeys(t), i = r.length, o = 0; i > o; )
                l.setDesc(e, n = r[o++], t[n]);
            return e
        }
    }
    d(d.S + d.F * !l.DESC, "Object", {
        getOwnPropertyDescriptor: l.getDesc,
        defineProperty: l.setDesc,
        defineProperties: L
    });
    var z = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
      , V = z.concat("length", "prototype")
      , H = z.length
      , B = function() {
        var e, t = u("iframe"), n = H, r = ">";
        for (t.style.display = "none",
        y.appendChild(t),
        t.src = "javascript:",
        e = t.contentWindow.document,
        e.open(),
        e.write("<script>document.F=Object</script" + r),
        e.close(),
        B = e.F; n--; )
            delete B.prototype[z[n]];
        return B()
    }
    ;
    d(d.S, "Object", {
        getPrototypeOf: l.getProto = l.getProto || function(e) {
            return e = Object(m.def(e)),
            j(e, f) ? e[f] : M(e.constructor) && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? v : null
        }
        ,
        getOwnPropertyNames: l.getNames = l.getNames || n(V, V.length, !0),
        create: l.create = l.create || function(e, t) {
            var n;
            return null  !== e ? (r.prototype = g(e),
            n = new r,
            r.prototype = null ,
            n[f] = e) : n = B(),
            void 0 === t ? n : L(n, t)
        }
        ,
        keys: l.getKeys = l.getKeys || n(z, H, !1),
        seal: function(e) {
            return e
        },
        freeze: function(e) {
            return e
        },
        preventExtensions: function(e) {
            return e
        },
        isSealed: function(e) {
            return !O(e)
        },
        isFrozen: function(e) {
            return !O(e)
        },
        isExtensible: function(e) {
            return O(e)
        }
    }),
    d(d.P, "Function", {
        bind: function(e) {
            function t() {
                var i = r.concat(w.call(arguments))
                  , o = this instanceof t
                  , s = o ? l.create(n.prototype) : e
                  , a = h(n, i, s);
                return o ? s : a
            }
            var n = m.fn(this)
              , r = w.call(arguments, 1);
            return n.prototype && (t.prototype = n.prototype),
            t
        }
    }),
    0 in Object("z") && "z" == "z"[0] || (l.ES5Object = function(e) {
        return "String" == c(e) ? e.split("") : Object(e)
    }
    );
    var W = !0;
    try {
        y && w.call(y),
        W = !1
    } catch (F) {}
    d(d.P + d.F * W, "Array", {
        slice: function(e, t) {
            var n = T(this.length)
              , r = c(this);
            if (t = void 0 === t ? n : t,
            "Array" == r)
                return w.call(this, e, t);
            for (var i = A(e, n), o = A(t, n), s = T(o - i), a = Array(s), l = 0; s > l; l++)
                a[l] = "String" == r ? this.charAt(i + l) : this[i + l];
            return a
        }
    }),
    d(d.P + d.F * (l.ES5Object != Object), "Array", {
        join: function() {
            return x.apply(l.ES5Object(this), arguments)
        }
    }),
    d(d.S, "Array", {
        isArray: function(e) {
            return "Array" == c(e)
        }
    }),
    d(d.P, "Array", {
        forEach: l.each = l.each || function(e) {
            return D(this, e, arguments[1])
        }
        ,
        map: function(e) {
            return P(this, e, arguments[1])
        },
        filter: function(e) {
            return I(this, e, arguments[1])
        },
        some: function(e) {
            return R(this, e, arguments[1])
        },
        every: function(e) {
            return _(this, e, arguments[1])
        },
        reduce: i(!1),
        reduceRight: i(!0),
        indexOf: function(e) {
            return N(this, e, arguments[1])
        },
        lastIndexOf: function(e, t) {
            var n = E(this)
              , r = T(n.length)
              , i = r - 1;
            for (arguments.length > 1 && (i = Math.min(i, l.toInteger(t))),
            0 > i && (i = T(r + i)); i >= 0; i--)
                if (i in n && n[i] === e)
                    return i;
            return -1
        }
    }),
    d(d.P, "String", {
        trim: require("npm:core-js@0.9.18/modules/$.replacer")(/^\s*([\s\S]*\S)?\s*$/, "$1")
    }),
    d(d.S, "Date", {
        now: function() {
            return +new Date
        }
    });
    var q = new Date(-5e13 - 1)
      , U = !(q.toISOString && "0385-07-25T07:06:39.999Z" == q.toISOString() && require("npm:core-js@0.9.18/modules/$.throws")(function() {
        new Date(NaN).toISOString()
    }));
    return d(d.P + d.F * U, "Date", {
        toISOString: function() {
            if (!isFinite(this))
                throw RangeError("Invalid time value");
            var e = this
              , t = e.getUTCFullYear()
              , n = e.getUTCMilliseconds()
              , r = 0 > t ? "-" : t > 9999 ? "+" : "";
            return r + ("00000" + Math.abs(t)).slice(r ? -6 : -4) + "-" + o(e.getUTCMonth() + 1) + "-" + o(e.getUTCDate()) + "T" + o(e.getUTCHours()) + ":" + o(e.getUTCMinutes()) + ":" + o(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + o(n)) + "Z"
        }
    }),
    "Object" == k(function() {
        return arguments
    }()) && (c.classof = function(e) {
        var t = k(e);
        return "Object" == t && M(e.callee) ? "Arguments" : t
    }
    ),
    s.define = a,
    t.exports
}),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating@0.13.2", ["github:aurelia/templating@0.13.2/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/templating@0.13.2/index"))
    })
}(),
System.register("npm:core-js@0.9.18/modules/$.task", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.1"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    function(e) {
        "use strict";
        function n() {
            var e = +this;
            if (a.has(b, e)) {
                var t = b[e];
                delete b[e],
                t()
            }
        }
        function r(e) {
            n.call(e.data)
        }
        var i, o, s, a = require("npm:core-js@0.9.18/modules/$"), l = require("npm:core-js@0.9.18/modules/$.ctx"), u = require("npm:core-js@0.9.18/modules/$.cof"), c = require("npm:core-js@0.9.18/modules/$.invoke"), d = require("npm:core-js@0.9.18/modules/$.dom-create"), h = a.g, p = a.isFunction, f = a.html, e = h.process, m = h.setImmediate, g = h.clearImmediate, v = h.MessageChannel, y = 0, b = {}, w = "onreadystatechange";
        p(m) && p(g) || (m = function(e) {
            for (var t = [], n = 1; arguments.length > n; )
                t.push(arguments[n++]);
            return b[++y] = function() {
                c(p(e) ? e : Function(e), t)
            }
            ,
            i(y),
            y
        }
        ,
        g = function(e) {
            delete b[e]
        }
        ,
        "process" == u(e) ? i = function(t) {
            e.nextTick(l(n, t, 1))
        }
         : h.addEventListener && p(h.postMessage) && !h.importScripts ? (i = function(e) {
            h.postMessage(e, "*")
        }
        ,
        h.addEventListener("message", r, !1)) : p(v) ? (o = new v,
        s = o.port2,
        o.port1.onmessage = r,
        i = l(s.postMessage, s, 1)) : i = w in d("script") ? function(e) {
            f.appendChild(d("script"))[w] = function() {
                f.removeChild(this),
                n.call(e)
            }
        }
         : function(e) {
            setTimeout(l(n, e, 1), 0)
        }
        ),
        t.exports = {
            set: m,
            clear: g
        }
    }(require("github:jspm/nodelibs-process@0.1.1")),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/modules/es6.promise", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.same", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.task", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.1"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    function(e) {
        "use strict";
        function t(e) {
            var t = new L(function() {}
            );
            return e && (t.constructor = Object),
            L.resolve(t) === t
        }
        function n(e) {
            return O(e) && (A ? "Promise" == p.classof(e) : x in e)
        }
        function r(e, t) {
            return d.FW || e !== L || t !== c ? y(e, t) : !0
        }
        function i(e) {
            var t = T(e)[w];
            return void 0 != t ? t : e
        }
        function o(e) {
            var t;
            return O(e) && (t = e.then),
            M(t) ? t : !1
        }
        function s(e) {
            var t = e.c;
            t.length && C.call(j, function() {
                function n(t) {
                    var n, s, a = i ? t.ok : t.fail;
                    try {
                        a ? (i || (e.h = !0),
                        n = a === !0 ? r : a(r),
                        n === t.P ? t.rej(TypeError("Promise-chain cycle")) : (s = o(n)) ? s.call(n, t.res, t.rej) : t.res(n)) : t.rej(r)
                    } catch (l) {
                        t.rej(l)
                    }
                }
                for (var r = e.v, i = 1 == e.s, s = 0; t.length > s; )
                    n(t[s++]);
                t.length = 0
            })
        }
        function a(e) {
            var t, n = e[x], r = n.a || n.c, i = 0;
            if (n.h)
                return !1;
            for (; r.length > i; )
                if (t = r[i++],
                t.fail || !a(t.P))
                    return !1;
            return !0
        }
        function l(t) {
            var n, r = this;
            r.d || (r.d = !0,
            r = r.r || r,
            r.v = t,
            r.s = 2,
            r.a = r.c.slice(),
            setTimeout(function() {
                C.call(j, function() {
                    a(n = r.p) && (S ? e.emit("unhandledRejection", t, n) : j.console && console.error && console.error("Unhandled promise rejection", t)),
                    r.a = void 0
                })
            }, 1),
            s(r))
        }
        function u(e) {
            var t, n = this;
            if (!n.d) {
                n.d = !0,
                n = n.r || n;
                try {
                    (t = o(e)) ? C.call(j, function() {
                        var r = {
                            r: n,
                            d: !1
                        };
                        try {
                            t.call(e, h(u, r, 1), h(l, r, 1))
                        } catch (i) {
                            l.call(r, i)
                        }
                    }) : (n.v = e,
                    n.s = 1,
                    s(n))
                } catch (r) {
                    l.call({
                        r: n,
                        d: !1
                    }, r)
                }
            }
        }
        var c, d = require("npm:core-js@0.9.18/modules/$"), h = require("npm:core-js@0.9.18/modules/$.ctx"), p = require("npm:core-js@0.9.18/modules/$.cof"), f = require("npm:core-js@0.9.18/modules/$.def"), m = require("npm:core-js@0.9.18/modules/$.assert"), g = require("npm:core-js@0.9.18/modules/$.for-of"), v = require("npm:core-js@0.9.18/modules/$.set-proto").set, y = require("npm:core-js@0.9.18/modules/$.same"), b = require("npm:core-js@0.9.18/modules/$.species"), w = require("npm:core-js@0.9.18/modules/$.wks")("species"), x = require("npm:core-js@0.9.18/modules/$.uid").safe("record"), k = "Promise", j = d.g, e = j.process, S = "process" == p(e), C = e && e.nextTick || require("npm:core-js@0.9.18/modules/$.task").set, L = j[k], M = d.isFunction, O = d.isObject, E = m.fn, T = m.obj, A = function() {
            function e(t) {
                var n = new L(t);
                return v(n, e.prototype),
                n
            }
            var n = !1;
            try {
                if (n = M(L) && M(L.resolve) && t(),
                v(e, L),
                e.prototype = d.create(L.prototype, {
                    constructor: {
                        value: e
                    }
                }),
                e.resolve(5).then(function() {}) instanceof e || (n = !1),
                n && d.DESC) {
                    var r = !1;
                    L.resolve(d.setDesc({}, "then", {
                        get: function() {
                            r = !0
                        }
                    })),
                    n = r
                }
            } catch (i) {
                n = !1
            }
            return n
        }();
        A || (L = function(e) {
            E(e);
            var t = {
                p: m.inst(this, L, k),
                c: [],
                a: void 0,
                s: 0,
                d: !1,
                v: void 0,
                h: !1
            };
            d.hide(this, x, t);
            try {
                e(h(u, t, 1), h(l, t, 1))
            } catch (n) {
                l.call(t, n)
            }
        }
        ,
        require("npm:core-js@0.9.18/modules/$.mix")(L.prototype, {
            then: function(e, t) {
                var n = T(T(this).constructor)[w]
                  , r = {
                    ok: M(e) ? e : !0,
                    fail: M(t) ? t : !1
                }
                  , i = r.P = new (void 0 != n ? n : L)(function(e, t) {
                    r.res = E(e),
                    r.rej = E(t)
                }
                )
                  , o = this[x];
                return o.c.push(r),
                o.a && o.a.push(r),
                o.s && s(o),
                i
            },
            "catch": function(e) {
                return this.then(void 0, e)
            }
        })),
        f(f.G + f.W + f.F * !A, {
            Promise: L
        }),
        p.set(L, k),
        b(L),
        b(c = d.core[k]),
        f(f.S + f.F * !A, k, {
            reject: function(e) {
                return new (i(this))(function(t, n) {
                    n(e)
                }
                )
            }
        }),
        f(f.S + f.F * (!A || t(!0)), k, {
            resolve: function(e) {
                return n(e) && r(e.constructor, this) ? e : new this(function(t) {
                    t(e)
                }
                )
            }
        }),
        f(f.S + f.F * !(A && require("npm:core-js@0.9.18/modules/$.iter-detect")(function(e) {
            L.all(e)["catch"](function() {})
        })), k, {
            all: function(e) {
                var t = i(this)
                  , n = [];
                return new t(function(r, i) {
                    g(e, !1, n.push, n);
                    var o = n.length
                      , s = Array(o);
                    o ? d.each.call(n, function(e, n) {
                        t.resolve(e).then(function(e) {
                            s[n] = e,
                            --o || r(s)
                        }, i)
                    }) : r(s)
                }
                )
            },
            race: function(e) {
                var t = i(this);
                return new t(function(n, r) {
                    g(e, !1, function(e) {
                        t.resolve(e).then(n, r)
                    })
                }
                )
            }
        })
    }(require("github:jspm/nodelibs-process@0.1.1")),
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/shim", ["npm:core-js@0.9.18/modules/es5", "npm:core-js@0.9.18/modules/es6.symbol", "npm:core-js@0.9.18/modules/es6.object.assign", "npm:core-js@0.9.18/modules/es6.object.is", "npm:core-js@0.9.18/modules/es6.object.set-prototype-of", "npm:core-js@0.9.18/modules/es6.object.to-string", "npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", "npm:core-js@0.9.18/modules/es6.function.name", "npm:core-js@0.9.18/modules/es6.function.has-instance", "npm:core-js@0.9.18/modules/es6.number.constructor", "npm:core-js@0.9.18/modules/es6.number.statics", "npm:core-js@0.9.18/modules/es6.math", "npm:core-js@0.9.18/modules/es6.string.from-code-point", "npm:core-js@0.9.18/modules/es6.string.raw", "npm:core-js@0.9.18/modules/es6.string.iterator", "npm:core-js@0.9.18/modules/es6.string.code-point-at", "npm:core-js@0.9.18/modules/es6.string.ends-with", "npm:core-js@0.9.18/modules/es6.string.includes", "npm:core-js@0.9.18/modules/es6.string.repeat", "npm:core-js@0.9.18/modules/es6.string.starts-with", "npm:core-js@0.9.18/modules/es6.array.from", "npm:core-js@0.9.18/modules/es6.array.of", "npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/es6.array.species", "npm:core-js@0.9.18/modules/es6.array.copy-within", "npm:core-js@0.9.18/modules/es6.array.fill", "npm:core-js@0.9.18/modules/es6.array.find", "npm:core-js@0.9.18/modules/es6.array.find-index", "npm:core-js@0.9.18/modules/es6.regexp", "npm:core-js@0.9.18/modules/es6.promise", "npm:core-js@0.9.18/modules/es6.map", "npm:core-js@0.9.18/modules/es6.set", "npm:core-js@0.9.18/modules/es6.weak-map", "npm:core-js@0.9.18/modules/es6.weak-set", "npm:core-js@0.9.18/modules/es6.reflect", "npm:core-js@0.9.18/modules/es7.array.includes", "npm:core-js@0.9.18/modules/es7.string.at", "npm:core-js@0.9.18/modules/es7.string.lpad", "npm:core-js@0.9.18/modules/es7.string.rpad", "npm:core-js@0.9.18/modules/es7.regexp.escape", "npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", "npm:core-js@0.9.18/modules/es7.object.to-array", "npm:core-js@0.9.18/modules/es7.map.to-json", "npm:core-js@0.9.18/modules/es7.set.to-json", "npm:core-js@0.9.18/modules/js.array.statics", "npm:core-js@0.9.18/modules/web.timers", "npm:core-js@0.9.18/modules/web.immediate", "npm:core-js@0.9.18/modules/web.dom.iterable", "npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    require("npm:core-js@0.9.18/modules/es5"),
    require("npm:core-js@0.9.18/modules/es6.symbol"),
    require("npm:core-js@0.9.18/modules/es6.object.assign"),
    require("npm:core-js@0.9.18/modules/es6.object.is"),
    require("npm:core-js@0.9.18/modules/es6.object.set-prototype-of"),
    require("npm:core-js@0.9.18/modules/es6.object.to-string"),
    require("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives"),
    require("npm:core-js@0.9.18/modules/es6.function.name"),
    require("npm:core-js@0.9.18/modules/es6.function.has-instance"),
    require("npm:core-js@0.9.18/modules/es6.number.constructor"),
    require("npm:core-js@0.9.18/modules/es6.number.statics"),
    require("npm:core-js@0.9.18/modules/es6.math"),
    require("npm:core-js@0.9.18/modules/es6.string.from-code-point"),
    require("npm:core-js@0.9.18/modules/es6.string.raw"),
    require("npm:core-js@0.9.18/modules/es6.string.iterator"),
    require("npm:core-js@0.9.18/modules/es6.string.code-point-at"),
    require("npm:core-js@0.9.18/modules/es6.string.ends-with"),
    require("npm:core-js@0.9.18/modules/es6.string.includes"),
    require("npm:core-js@0.9.18/modules/es6.string.repeat"),
    require("npm:core-js@0.9.18/modules/es6.string.starts-with"),
    require("npm:core-js@0.9.18/modules/es6.array.from"),
    require("npm:core-js@0.9.18/modules/es6.array.of"),
    require("npm:core-js@0.9.18/modules/es6.array.iterator"),
    require("npm:core-js@0.9.18/modules/es6.array.species"),
    require("npm:core-js@0.9.18/modules/es6.array.copy-within"),
    require("npm:core-js@0.9.18/modules/es6.array.fill"),
    require("npm:core-js@0.9.18/modules/es6.array.find"),
    require("npm:core-js@0.9.18/modules/es6.array.find-index"),
    require("npm:core-js@0.9.18/modules/es6.regexp"),
    require("npm:core-js@0.9.18/modules/es6.promise"),
    require("npm:core-js@0.9.18/modules/es6.map"),
    require("npm:core-js@0.9.18/modules/es6.set"),
    require("npm:core-js@0.9.18/modules/es6.weak-map"),
    require("npm:core-js@0.9.18/modules/es6.weak-set"),
    require("npm:core-js@0.9.18/modules/es6.reflect"),
    require("npm:core-js@0.9.18/modules/es7.array.includes"),
    require("npm:core-js@0.9.18/modules/es7.string.at"),
    require("npm:core-js@0.9.18/modules/es7.string.lpad"),
    require("npm:core-js@0.9.18/modules/es7.string.rpad"),
    require("npm:core-js@0.9.18/modules/es7.regexp.escape"),
    require("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors"),
    require("npm:core-js@0.9.18/modules/es7.object.to-array"),
    require("npm:core-js@0.9.18/modules/es7.map.to-json"),
    require("npm:core-js@0.9.18/modules/es7.set.to-json"),
    require("npm:core-js@0.9.18/modules/js.array.statics"),
    require("npm:core-js@0.9.18/modules/web.timers"),
    require("npm:core-js@0.9.18/modules/web.immediate"),
    require("npm:core-js@0.9.18/modules/web.dom.iterable"),
    t.exports = require("npm:core-js@0.9.18/modules/$").core,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18/index", ["npm:core-js@0.9.18/shim", "npm:core-js@0.9.18/modules/core.dict", "npm:core-js@0.9.18/modules/core.iter-helpers", "npm:core-js@0.9.18/modules/core.$for", "npm:core-js@0.9.18/modules/core.delay", "npm:core-js@0.9.18/modules/core.function.part", "npm:core-js@0.9.18/modules/core.object", "npm:core-js@0.9.18/modules/core.array.turn", "npm:core-js@0.9.18/modules/core.number.iterator", "npm:core-js@0.9.18/modules/core.number.math", "npm:core-js@0.9.18/modules/core.string.escape-html", "npm:core-js@0.9.18/modules/core.date", "npm:core-js@0.9.18/modules/core.global", "npm:core-js@0.9.18/modules/core.log", "npm:core-js@0.9.18/modules/$"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    require("npm:core-js@0.9.18/shim"),
    require("npm:core-js@0.9.18/modules/core.dict"),
    require("npm:core-js@0.9.18/modules/core.iter-helpers"),
    require("npm:core-js@0.9.18/modules/core.$for"),
    require("npm:core-js@0.9.18/modules/core.delay"),
    require("npm:core-js@0.9.18/modules/core.function.part"),
    require("npm:core-js@0.9.18/modules/core.object"),
    require("npm:core-js@0.9.18/modules/core.array.turn"),
    require("npm:core-js@0.9.18/modules/core.number.iterator"),
    require("npm:core-js@0.9.18/modules/core.number.math"),
    require("npm:core-js@0.9.18/modules/core.string.escape-html"),
    require("npm:core-js@0.9.18/modules/core.date"),
    require("npm:core-js@0.9.18/modules/core.global"),
    require("npm:core-js@0.9.18/modules/core.log"),
    t.exports = require("npm:core-js@0.9.18/modules/$").core,
    n.define = r,
    t.exports
}),
System.register("npm:core-js@0.9.18", ["npm:core-js@0.9.18/index"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    t.exports = require("npm:core-js@0.9.18/index"),
    n.define = r,
    t.exports
}),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/dependency-injection@0.9.0/index", ["npm:core-js@0.9.18", "github:aurelia/metadata@0.7.0", "github:aurelia/logging@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function o(e, t) {
                if ("function" != typeof t && null  !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (e.__proto__ = t)
            }
            function s(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function a() {}
            function l(e) {
                var t = function(e) {
                    e.inject = n.Metadata.getOwn(n.Metadata.paramTypes, e) || L
                }
                ;
                return e ? t(e) : t
            }
            function u() {
                for (var e = arguments.length, t = Array(e), n = 0; e > n; n++)
                    t[n] = arguments[n];
                return function(e) {
                    e.inject = t
                }
            }
            function c(e) {
                return function(t) {
                    n.Metadata.define(n.Metadata.registration, e, t)
                }
            }
            function d(e) {
                return c(new g(e))
            }
            function h(e) {
                var t = void 0 === arguments[1] ? !1 : arguments[1];
                return c(new v(e,t))
            }
            function p(e) {
                return function(t) {
                    n.Metadata.define(n.Metadata.instanceActivator, e, t)
                }
            }
            function f() {
                return p(S.instance)
            }
            e.__esModule = !0;
            var m = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n),
                    r && e(t, r),
                    t
                }
            }();
            e.autoinject = l,
            e.inject = u,
            e.registration = c,
            e["transient"] = d,
            e.singleton = h,
            e.instanceActivator = p,
            e.factory = f;
            var g = (i(t),
            function() {
                function e(t) {
                    s(this, e),
                    this.key = t
                }
                return e.prototype.register = function(e, t, n) {
                    e.registerTransient(this.key || t, n)
                }
                ,
                e
            }());
            e.TransientRegistration = g;
            var v = function() {
                function e(t) {
                    var n = void 0 === arguments[1] ? !1 : arguments[1];
                    s(this, e),
                    "boolean" == typeof t ? this.registerInChild = t : (this.key = t,
                    this.registerInChild = n)
                }
                return e.prototype.register = function(e, t, n) {
                    var r = this.registerInChild ? e : e.root;
                    r.registerSingleton(this.key || t, n)
                }
                ,
                e
            }();
            e.SingletonRegistration = v;
            var y = function() {
                function e() {
                    s(this, e)
                }
                return e.prototype.get = function(e) {
                    throw new Error("A custom Resolver must implement get(container) and return the resolved instance(s).")
                }
                ,
                e
            }();
            e.Resolver = y;
            var b = function(e) {
                function t(n) {
                    s(this, t),
                    e.call(this),
                    this.key = n
                }
                return o(t, e),
                t.prototype.get = function(e) {
                    var t = this;
                    return function() {
                        return e.get(t.key)
                    }
                }
                ,
                t.of = function(e) {
                    return new t(e)
                }
                ,
                t
            }(y);
            e.Lazy = b;
            var w = function(e) {
                function t(n) {
                    s(this, t),
                    e.call(this),
                    this.key = n
                }
                return o(t, e),
                t.prototype.get = function(e) {
                    return e.getAll(this.key)
                }
                ,
                t.of = function(e) {
                    return new t(e)
                }
                ,
                t
            }(y);
            e.All = w;
            var x = function(e) {
                function t(n) {
                    var r = void 0 === arguments[1] ? !1 : arguments[1];
                    s(this, t),
                    e.call(this),
                    this.key = n,
                    this.checkParent = r
                }
                return o(t, e),
                t.prototype.get = function(e) {
                    return e.hasHandler(this.key, this.checkParent) ? e.get(this.key) : null
                }
                ,
                t.of = function(e) {
                    var n = void 0 === arguments[1] ? !1 : arguments[1];
                    return new t(e,n)
                }
                ,
                t
            }(y);
            e.Optional = x;
            var k = function(e) {
                function t(n) {
                    s(this, t),
                    e.call(this),
                    this.key = n
                }
                return o(t, e),
                t.prototype.get = function(e) {
                    return e.parent ? e.parent.get(this.key) : null
                }
                ,
                t.of = function(e) {
                    return new t(e)
                }
                ,
                t
            }(y);
            e.Parent = k;
            var j = function() {
                function e() {
                    s(this, e)
                }
                return e.prototype.invoke = function(e, t) {
                    return Reflect.construct(e, t)
                }
                ,
                m(e, null , [{
                    key: "instance",
                    value: new e,
                    enumerable: !0
                }]),
                e
            }();
            e.ClassActivator = j;
            var S = function() {
                function e() {
                    s(this, e)
                }
                return e.prototype.invoke = function(e, t) {
                    return e.apply(void 0, t)
                }
                ,
                m(e, null , [{
                    key: "instance",
                    value: new e,
                    enumerable: !0
                }]),
                e
            }();
            e.FactoryActivator = S;
            var C = "key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?";
            n.Metadata.registration = "aurelia:registration",
            n.Metadata.instanceActivator = "aurelia:instance-activator",
            a.name || Object.defineProperty(Function.prototype, "name", {
                get: function() {
                    var e = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
                    return Object.defineProperty(this, "name", {
                        value: e
                    }),
                    e
                }
            });
            var L = Object.freeze([]);
            e.emptyParameters = L;
            var M = function() {
                function e(t) {
                    s(this, e),
                    this.constructionInfo = t || new Map,
                    this.entries = new Map,
                    this.root = this
                }
                return e.prototype.makeGlobal = function() {
                    return e.instance = this,
                    this
                }
                ,
                e.prototype.registerInstance = function(e, t) {
                    this.registerHandler(e, function(e) {
                        return t
                    })
                }
                ,
                e.prototype.registerTransient = function(e, t) {
                    t = t || e,
                    this.registerHandler(e, function(e) {
                        return e.invoke(t)
                    })
                }
                ,
                e.prototype.registerSingleton = function(e, t) {
                    var n = null ;
                    t = t || e,
                    this.registerHandler(e, function(e) {
                        return n || (n = e.invoke(t))
                    })
                }
                ,
                e.prototype.autoRegister = function(e, t) {
                    var r;
                    if (null  === e || void 0 === e)
                        throw new Error(C);
                    "function" == typeof e ? (r = n.Metadata.get(n.Metadata.registration, e),
                    void 0 !== r ? r.register(this, t || e, e) : this.registerSingleton(t || e, e)) : this.registerInstance(e, e)
                }
                ,
                e.prototype.autoRegisterAll = function(e) {
                    for (var t = e.length; t--; )
                        this.autoRegister(e[t])
                }
                ,
                e.prototype.registerHandler = function(e, t) {
                    this._getOrCreateEntry(e).push(t)
                }
                ,
                e.prototype.unregister = function(e) {
                    this.entries["delete"](e)
                }
                ,
                e.prototype.get = function(t) {
                    var n;
                    if (null  === t || void 0 === t)
                        throw new Error(C);
                    return t === e ? this : t instanceof y ? t.get(this) : (n = this.entries.get(t),
                    void 0 !== n ? n[0](this) : this.parent ? this.parent.get(t) : (this.autoRegister(t),
                    n = this.entries.get(t),
                    n[0](this)))
                }
                ,
                e.prototype.getAll = function(e) {
                    var t, n = this;
                    if (null  === e || void 0 === e)
                        throw new Error(C);
                    return t = this.entries.get(e),
                    void 0 !== t ? t.map(function(e) {
                        return e(n)
                    }) : this.parent ? this.parent.getAll(e) : []
                }
                ,
                e.prototype.hasHandler = function(e) {
                    var t = void 0 === arguments[1] ? !1 : arguments[1];
                    if (null  === e || void 0 === e)
                        throw new Error(C);
                    return this.entries.has(e) || t && this.parent && this.parent.hasHandler(e, t)
                }
                ,
                e.prototype.createChild = function() {
                    var t = new e(this.constructionInfo);
                    return t.parent = this,
                    t.root = this.root,
                    t
                }
                ,
                e.prototype.invoke = function(e, t) {
                    try {
                        var n, i, o = this._getOrCreateConstructionInfo(e), s = o.keys, a = new Array(s.length);
                        for (n = 0,
                        i = s.length; i > n; ++n)
                            a[n] = this.get(s[n]);
                        return void 0 !== t && (a = a.concat(t)),
                        o.activator.invoke(e, a)
                    } catch (l) {
                        var u = o.activator instanceof j ? "instantiating" : "invoking"
                          , c = "Error " + u + " " + e.name + ".";
                        throw i > n && (c += " The argument at index " + n + " (key:" + s[n] + ") could not be satisfied."),
                        c += " Check the inner error for details.",
                        r.AggregateError(c, l, !0)
                    }
                }
                ,
                e.prototype._getOrCreateEntry = function(e) {
                    var t;
                    if (null  === e || void 0 === e)
                        throw new Error("key cannot be null or undefined.  (Are you trying to inject something that doesn't exist with DI?)");
                    return t = this.entries.get(e),
                    void 0 === t && (t = [],
                    this.entries.set(e, t)),
                    t
                }
                ,
                e.prototype._getOrCreateConstructionInfo = function(e) {
                    var t = this.constructionInfo.get(e);
                    return void 0 === t && (t = this._createConstructionInfo(e),
                    this.constructionInfo.set(e, t)),
                    t
                }
                ,
                e.prototype._createConstructionInfo = function(e) {
                    var t = {
                        activator: n.Metadata.getOwn(n.Metadata.instanceActivator, e) || j.instance
                    };
                    return void 0 !== e.inject ? ("function" == typeof e.inject ? t.keys = e.inject() : t.keys = e.inject,
                    t) : (t.keys = n.Metadata.getOwn(n.Metadata.paramTypes, e) || L,
                    t)
                }
                ,
                e
            }();
            e.Container = M,
            n.Decorators.configure.simpleDecorator("autoinject", l),
            n.Decorators.configure.parameterizedDecorator("inject", u),
            n.Decorators.configure.parameterizedDecorator("registration", c),
            n.Decorators.configure.parameterizedDecorator("transient", d),
            n.Decorators.configure.parameterizedDecorator("singleton", h),
            n.Decorators.configure.parameterizedDecorator("instanceActivator", p),
            n.Decorators.configure.parameterizedDecorator("factory", f)
        }
        .call(t, t, e("npm:core-js@0.9.18"), e("github:aurelia/metadata@0.7.0"), e("github:aurelia/logging@0.6.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/dependency-injection@0.9.0", ["github:aurelia/dependency-injection@0.9.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/dependency-injection@0.9.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/compose", ["github:aurelia/dependency-injection@0.9.0", "github:aurelia/task-queue@0.6.0", "github:aurelia/templating@0.13.2"], !1, function(e, t, n) {
        return function(e, t, n, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function o(e, t, n) {
                var r = n[t];
                if (r) {
                    var i = {};
                    for (var o in r)
                        i[o] = r[o];
                    i.value = i.initializer.call(e),
                    Object.defineProperty(e, t, i)
                }
            }
            function s(e, t) {
                return Object.assign(t, {
                    executionContext: e.executionContext,
                    container: e.container,
                    viewSlot: e.viewSlot,
                    viewResources: e.viewResources,
                    currentBehavior: e.currentBehavior,
                    host: e.element
                })
            }
            function a(e, t) {
                e.currentInstruction = null ,
                e.compositionEngine.compose(t).then(function(t) {
                    e.currentBehavior = t,
                    e.currentViewModel = t ? t.executionContext : null
                })
            }
            e.__esModule = !0;
            var l = function() {
                function e(e, t, n) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r]
                          , o = i.decorators
                          , s = i.key;
                        if (delete i.key,
                        delete i.decorators,
                        i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                        ("value" in i || i.initializer) && (i.writable = !0),
                        o) {
                            for (var a = 0; a < o.length; a++) {
                                var l = o[a];
                                if ("function" != typeof l)
                                    throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                                i = l(e, s, i) || i
                            }
                            if (void 0 !== i.initializer) {
                                n[s] = i;
                                continue
                            }
                        }
                        Object.defineProperty(e, s, i)
                    }
                }
                return function(t, n, r, i, o) {
                    return n && e(t.prototype, n, i),
                    r && e(t, r, o),
                    t
                }
            }()
              , u = function() {
                function e(e, t, n, r, s, a) {
                    i(this, c),
                    o(this, "model", u),
                    o(this, "view", u),
                    o(this, "viewModel", u),
                    this.element = e,
                    this.container = t,
                    this.compositionEngine = n,
                    this.viewSlot = r,
                    this.viewResources = s,
                    this.taskQueue = a
                }
                var u = {}
                  , c = e;
                return c.prototype.bind = function(e) {
                    this.executionContext = e,
                    a(this, s(this, {
                        view: this.view,
                        viewModel: this.viewModel,
                        model: this.model
                    }))
                }
                ,
                c.prototype.modelChanged = function(e, t) {
                    var n = this;
                    return this.currentInstruction ? void (this.currentInstruction.model = e) : void this.taskQueue.queueMicroTask(function() {
                        if (n.currentInstruction)
                            return void (n.currentInstruction.model = e);
                        var t = n.currentViewModel;
                        t && "function" == typeof t.activate && t.activate(e)
                    })
                }
                ,
                c.prototype.viewChanged = function(e, t) {
                    var n = this
                      , r = s(this, {
                        view: e,
                        viewModel: this.currentViewModel || this.viewModel,
                        model: this.model
                    });
                    return this.currentInstruction ? void (this.currentInstruction = r) : (this.currentInstruction = r,
                    void this.taskQueue.queueMicroTask(function() {
                        return a(n, n.currentInstruction)
                    }))
                }
                ,
                c.prototype.viewModelChanged = function(e, t) {
                    var n = this
                      , r = s(this, {
                        viewModel: e,
                        view: this.view,
                        model: this.model
                    });
                    return this.currentInstruction ? void (this.currentInstruction = r) : (this.currentInstruction = r,
                    void this.taskQueue.queueMicroTask(function() {
                        return a(n, n.currentInstruction)
                    }))
                }
                ,
                l(c, [{
                    key: "model",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "view",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "viewModel",
                    decorators: [r.bindable],
                    initializer: null ,
                    enumerable: !0
                }], null , u),
                e = t.inject(Element, t.Container, r.CompositionEngine, r.ViewSlot, r.ViewResources, n.TaskQueue)(e) || e,
                e = r.noView(e) || e,
                e = r.customElement("compose")(e) || e
            }();
            e.Compose = u
        }
        .call(t, t, e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/task-queue@0.6.0"), e("github:aurelia/templating@0.13.2"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0/index", ["github:aurelia/templating-resources@0.13.0/compose", "github:aurelia/templating-resources@0.13.0/if", "github:aurelia/templating-resources@0.13.0/with", "github:aurelia/templating-resources@0.13.0/repeat", "github:aurelia/templating-resources@0.13.0/show", "github:aurelia/templating-resources@0.13.0/global-behavior", "github:aurelia/templating-resources@0.13.0/sanitize-html", "github:aurelia/templating-resources@0.13.0/replaceable", "github:aurelia/templating-resources@0.13.0/focus"], !1, function(e, t, n) {
        return function(e, t, n, r, i, o, s, a, l, u) {
            "use strict";
            function c(e) {
                e.globalizeResources("./compose", "./if", "./with", "./repeat", "./show", "./replaceable", "./global-behavior", "./sanitize-html", "./focus")
            }
            e.__esModule = !0,
            e.Compose = t.Compose,
            e.If = n.If,
            e.With = r.With,
            e.Repeat = i.Repeat,
            e.Show = o.Show,
            e.SanitizeHtmlValueConverter = a.SanitizeHtmlValueConverter,
            e.GlobalBehavior = s.GlobalBehavior,
            e.Replaceable = l.Replaceable,
            e.Focus = u.Focus,
            e.configure = c
        }
        .call(t, t, e("github:aurelia/templating-resources@0.13.0/compose"), e("github:aurelia/templating-resources@0.13.0/if"), e("github:aurelia/templating-resources@0.13.0/with"), e("github:aurelia/templating-resources@0.13.0/repeat"), e("github:aurelia/templating-resources@0.13.0/show"), e("github:aurelia/templating-resources@0.13.0/global-behavior"), e("github:aurelia/templating-resources@0.13.0/sanitize-html"), e("github:aurelia/templating-resources@0.13.0/replaceable"), e("github:aurelia/templating-resources@0.13.0/focus"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-resources@0.13.0", ["github:aurelia/templating-resources@0.13.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/templating-resources@0.13.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-binding@0.13.0/index", ["github:aurelia/binding@0.8.1", "github:aurelia/templating@0.13.2", "github:aurelia/logging@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r) {
            "use strict";
            function i(e, t) {
                if ("function" != typeof t && null  !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (e.__proto__ = t)
            }
            function o(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function s(e) {
                var t, r = function(e) {
                    return t || (t = e.invoke(c))
                }
                ;
                e.container.hasHandler(c) ? t = e.container.get(c) : e.container.registerHandler(c, r),
                e.container.registerHandler(n.BindingLanguage, r)
            }
            e.__esModule = !0,
            e.configure = s;
            var a = function() {
                function e(t, n, r) {
                    o(this, e),
                    this.parser = t,
                    this.observerLocator = n,
                    this.eventManager = r
                }
                return e.inject = function() {
                    return [t.Parser, t.ObserverLocator, t.EventManager]
                }
                ,
                e.prototype.interpret = function(e, t, n, r) {
                    return n.command in this ? this[n.command](e, t, n, r) : this.handleUnknownCommand(e, t, n, r)
                }
                ,
                e.prototype.handleUnknownCommand = function(e, t, n, r) {
                    var i = n.attrName
                      , o = n.command
                      , s = this.options(e, t, n, r);
                    return s.alteredAttr = !0,
                    s.attrName = "global-behavior",
                    s.attributes.aureliaAttrName = i,
                    s.attributes.aureliaCommand = o,
                    s
                }
                ,
                e.prototype.determineDefaultBindingMode = function(e, n) {
                    var r = e.tagName.toLowerCase();
                    return "input" === r ? "value" === n || "checked" === n ? t.bindingMode.twoWay : t.bindingMode.oneWay : "textarea" == r || "select" == r ? "value" == n ? t.bindingMode.twoWay : t.bindingMode.oneWay : "textcontent" === n || "innerhtml" === n ? "true" === e.contentEditable ? t.bindingMode.twoWay : t.bindingMode.oneWay : "scrolltop" === n || "scrollleft" === n ? t.bindingMode.twoWay : t.bindingMode.oneWay
                }
                ,
                e.prototype.bind = function(e, n, r, i) {
                    var o = i || {
                        attrName: r.attrName,
                        attributes: {}
                    };
                    return o.attributes[r.attrName] = new t.BindingExpression(this.observerLocator,this.attributeMap[r.attrName] || r.attrName,this.parser.parse(r.attrValue),r.defaultBindingMode || this.determineDefaultBindingMode(n, r.attrName),e.valueConverterLookupFunction),
                    o
                }
                ,
                e.prototype.trigger = function(e, n, r) {
                    return new t.ListenerExpression(this.eventManager,r.attrName,this.parser.parse(r.attrValue),!1,!0)
                }
                ,
                e.prototype.delegate = function(e, n, r) {
                    return new t.ListenerExpression(this.eventManager,r.attrName,this.parser.parse(r.attrValue),!0,!0)
                }
                ,
                e.prototype.call = function(e, n, r, i) {
                    var o = i || {
                        attrName: r.attrName,
                        attributes: {}
                    };
                    return o.attributes[r.attrName] = new t.CallExpression(this.observerLocator,r.attrName,this.parser.parse(r.attrValue),e.valueConverterLookupFunction),
                    o
                }
                ,
                e.prototype.options = function(e, t, n, r) {
                    var i, o, s, a = r || {
                        attrName: n.attrName,
                        attributes: {}
                    }, l = n.attrValue, u = this.language, c = null , d = "";
                    for (o = 0,
                    s = l.length; s > o; ++o)
                        i = l[o],
                        ";" === i ? (n = u.inspectAttribute(e, c, d.trim()),
                        u.createAttributeInstruction(e, t, n, a),
                        a.attributes[n.attrName] || (a.attributes[n.attrName] = n.attrValue),
                        d = "",
                        c = null ) : ":" === i && null  === c ? (c = d.trim(),
                        d = "") : d += i;
                    return null  !== c && (n = u.inspectAttribute(e, c, d.trim()),
                    u.createAttributeInstruction(e, t, n, a),
                    a.attributes[n.attrName] || (a.attributes[n.attrName] = n.attrValue)),
                    a
                }
                ,
                e
            }();
            e.SyntaxInterpreter = a,
            a.prototype["for"] = function(e, n, r, i) {
                var o, s, a, l, u;
                if (l = r.attrValue,
                u = l.match(/[[].+[\]]/),
                o = u ? l.split("of ") : l.split(" of "),
                2 !== o.length)
                    throw new Error('Incorrect syntax for "for". The form is: "$local of $items" or "[$key, $value] of $items".');
                return a = i || {
                    attrName: r.attrName,
                    attributes: {}
                },
                u ? (s = o[0].replace(/[[\]]/g, "").replace(/,/g, " ").replace(/\s+/g, " ").trim().split(" "),
                a.attributes.key = s[0],
                a.attributes.value = s[1]) : a.attributes.local = o[0],
                a.attributes.items = new t.BindingExpression(this.observerLocator,"items",this.parser.parse(o[1]),t.bindingMode.oneWay,e.valueConverterLookupFunction),
                a
            }
            ,
            a.prototype["two-way"] = function(e, n, r, i) {
                var o = i || {
                    attrName: r.attrName,
                    attributes: {}
                };
                return o.attributes[r.attrName] = new t.BindingExpression(this.observerLocator,this.attributeMap[r.attrName] || r.attrName,this.parser.parse(r.attrValue),t.bindingMode.twoWay,e.valueConverterLookupFunction),
                o
            }
            ,
            a.prototype["one-way"] = function(e, n, r, i) {
                var o = i || {
                    attrName: r.attrName,
                    attributes: {}
                };
                return o.attributes[r.attrName] = new t.BindingExpression(this.observerLocator,this.attributeMap[r.attrName] || r.attrName,this.parser.parse(r.attrValue),t.bindingMode.oneWay,e.valueConverterLookupFunction),
                o
            }
            ,
            a.prototype["one-time"] = function(e, n, r, i) {
                var o = i || {
                    attrName: r.attrName,
                    attributes: {}
                };
                return o.attributes[r.attrName] = new t.BindingExpression(this.observerLocator,this.attributeMap[r.attrName] || r.attrName,this.parser.parse(r.attrValue),t.bindingMode.oneTime,e.valueConverterLookupFunction),
                o
            }
            ;
            var l = {}
              , u = r.getLogger("templating-binding")
              , c = function(e) {
                function n(t, r, i) {
                    o(this, n),
                    e.call(this),
                    this.parser = t,
                    this.observerLocator = r,
                    this.syntaxInterpreter = i,
                    this.emptyStringExpression = this.parser.parse("''"),
                    i.language = this,
                    this.attributeMap = i.attributeMap = {
                        contenteditable: "contentEditable",
                        "for": "htmlFor",
                        tabindex: "tabIndex",
                        textcontent: "textContent",
                        innerhtml: "innerHTML",
                        maxlength: "maxLength",
                        minlength: "minLength",
                        formaction: "formAction",
                        formenctype: "formEncType",
                        formmethod: "formMethod",
                        formnovalidate: "formNoValidate",
                        formtarget: "formTarget",
                        rowspan: "rowSpan",
                        colspan: "colSpan",
                        scrolltop: "scrollTop",
                        scrollleft: "scrollLeft"
                    }
                }
                return i(n, e),
                n.inject = function() {
                    return [t.Parser, t.ObserverLocator, a]
                }
                ,
                n.prototype.inspectAttribute = function(e, n, r) {
                    var i = n.split(".");
                    return l.defaultBindingMode = null ,
                    2 == i.length ? (l.attrName = i[0].trim(),
                    l.attrValue = r,
                    l.command = i[1].trim(),
                    "ref" === l.command ? (l.expression = new t.NameExpression(r,l.attrName),
                    l.command = null ,
                    l.attrName = "ref") : l.expression = null ) : "ref" == n ? (l.attrName = n,
                    l.attrValue = r,
                    l.command = null ,
                    l.expression = new t.NameExpression(r,"element")) : (l.attrName = n,
                    l.attrValue = r,
                    l.command = null ,
                    l.expression = this.parseContent(e, n, r)),
                    l
                }
                ,
                n.prototype.createAttributeInstruction = function(e, t, n, r) {
                    var i;
                    if (n.expression) {
                        if ("ref" === n.attrName)
                            return n.expression;
                        i = r || {
                            attrName: n.attrName,
                            attributes: {}
                        },
                        i.attributes[n.attrName] = n.expression
                    } else
                        n.command && (i = this.syntaxInterpreter.interpret(e, t, n, r));
                    return i
                }
                ,
                n.prototype.parseText = function(e, t) {
                    return this.parseContent(e, "textContent", t)
                }
                ,
                n.prototype.parseContent = function(e, n, r) {
                    for (var i, o, s, a = r.indexOf("${", 0), l = r.length, u = 0, c = 0, h = null , p = 0; a >= 0 && l - 2 > a; ) {
                        c = 1,
                        o = a,
                        a += 2;
                        do {
                            switch (i = r[a],
                            a++,
                            i) {
                            case "'":
                            case '"':
                                null  === h ? h = i : h === i && (h = null );
                                continue;
                            case "\\":
                                a++;
                                continue
                            }
                            null  === h && ("{" === i ? c++ : "}" === i && c--)
                        } while (c > 0 && l > a);if (0 !== c)
                            break;
                        s = s || [],
                        "\\" === r[o - 1] && "\\" !== r[o - 2] ? (s[p] = r.substring(u, o - 1) + r.substring(o, a),
                        p++,
                        s[p] = this.emptyStringExpression,
                        p++) : (s[p] = r.substring(u, o),
                        p++,
                        s[p] = this.parser.parse(r.substring(o + 2, a - 1)),
                        p++),
                        u = a,
                        a = r.indexOf("${", a)
                    }
                    return 0 === p ? null  : (s[p] = r.substr(u),
                    new d(this.observerLocator,this.attributeMap[n] || n,s,t.bindingMode.oneWay,e.valueConverterLookupFunction,n))
                }
                ,
                n
            }(n.BindingLanguage);
            e.TemplatingBindingLanguage = c;
            var d = function() {
                function e(t, n, r, i, s, a) {
                    o(this, e),
                    this.observerLocator = t,
                    this.targetProperty = n,
                    this.parts = r,
                    this.mode = i,
                    this.valueConverterLookupFunction = s,
                    this.attribute = this.attrToRemove = a,
                    this.discrete = !1
                }
                return e.prototype.createBinding = function(e) {
                    return new h(this.observerLocator,this.parts,e,this.targetProperty,this.mode,this.valueConverterLookupFunction)
                }
                ,
                e
            }();
            e.InterpolationBindingExpression = d;
            var h = function() {
                function e(t, n, r, i, s, a) {
                    if (o(this, e),
                    "style" === i)
                        u.info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
                    else if (r.parentElement && "TEXTAREA" === r.parentElement.nodeName && "textContent" === i)
                        throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
                    this.observerLocator = t,
                    this.parts = n,
                    this.targetProperty = t.getObserver(r, i),
                    this.mode = s,
                    this.valueConverterLookupFunction = a,
                    this.toDispose = []
                }
                return e.prototype.getObserver = function(e, t) {
                    return this.observerLocator.getObserver(e, t)
                }
                ,
                e.prototype.bind = function(e) {
                    this.source = e,
                    this.mode == t.bindingMode.oneWay ? (this.unbind(),
                    this.connect(),
                    this.setValue()) : this.setValue()
                }
                ,
                e.prototype.setValue = function() {
                    var e = this.interpolate();
                    this.targetProperty.setValue(e)
                }
                ,
                e.prototype.partChanged = function(e, t, n) {
                    var r, i, o = this;
                    n || this.setValue(),
                    t instanceof Array && (r = this.arrayPartMap,
                    i = r ? r.get(t) : null ,
                    i && (i.refs--,
                    0 === i.refs && (i.dispose(),
                    r["delete"](t)))),
                    e instanceof Array && (r = this.arrayPartMap || (this.arrayPartMap = new Map),
                    i = r.get(e),
                    i || (i = {
                        refs: 0,
                        dispose: this.observerLocator.getArrayObserver(e).subscribe(function() {
                            return o.setValue()
                        })
                    },
                    r.set(e, i)),
                    i.refs++)
                }
                ,
                e.prototype.connect = function() {
                    var e, t, n, r = this.parts, i = this.source, o = this.toDispose = [], s = this.partChanged.bind(this);
                    for (t = 0,
                    n = r.length; n > t; ++t)
                        t % 2 === 0 || (e = r[t].connect(this, i),
                        e.observer && o.push(e.observer.subscribe(s)),
                        e.value instanceof Array && s(e.value, void 0, !0))
                }
                ,
                e.prototype.interpolate = function() {
                    var e, t, n, r = "", i = this.parts, o = this.source, s = this.valueConverterLookupFunction;
                    for (e = 0,
                    t = i.length; t > e; ++e)
                        e % 2 === 0 ? r += i[e] : (n = i[e].evaluate(o, s),
                        r += "undefined" != typeof n && null  !== n ? n.toString() : "");
                    return r
                }
                ,
                e.prototype.unbind = function() {
                    var e, t, n = this.toDispose, r = this.arrayPartMap;
                    if (n)
                        for (e = 0,
                        t = n.length; t > e; ++e)
                            n[e]();
                    if (this.toDispose = null ,
                    r) {
                        for (var i = r.values(), o = Array.isArray(i), s = 0, i = o ? i : i[Symbol.iterator](); ; ) {
                            if (o) {
                                if (s >= i.length)
                                    break;
                                n = i[s++]
                            } else {
                                if (s = i.next(),
                                s.done)
                                    break;
                                n = s.value
                            }
                            n.dispose()
                        }
                        r.clear()
                    }
                    this.arrayPartMap = null
                }
                ,
                e
            }()
        }
        .call(t, t, e("github:aurelia/binding@0.8.1"), e("github:aurelia/templating@0.13.2"), e("github:aurelia/logging@0.6.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/templating-binding@0.13.0", ["github:aurelia/templating-binding@0.13.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/templating-binding@0.13.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/logging-console@0.6.0/index", [], !1, function(e, t, n) {
        return function(e) {
            "use strict";
            function t(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            e.__esModule = !0,
            function(e) {
                e.console = e.console || {};
                for (var t, n, r = e.console, i = {}, o = function() {}
                , s = "memory".split(","), a = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); t = s.pop(); )
                    r[t] || (r[t] = i);
                for (; n = a.pop(); )
                    r[n] || (r[n] = o)
            }("undefined" == typeof window ? void 0 : window),
            Function.prototype.bind && window.console && "object" == typeof console.log && ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function(e) {
                console[e] = this.bind(console[e], console)
            }, Function.prototype.call);
            var n = function() {
                function e() {
                    t(this, e)
                }
                return e.prototype.debug = function(e, t) {
                    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; n > i; i++)
                        r[i - 2] = arguments[i];
                    console.debug.apply(console, ["DEBUG [" + e.id + "] " + t].concat(r))
                }
                ,
                e.prototype.info = function(e, t) {
                    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; n > i; i++)
                        r[i - 2] = arguments[i];
                    console.info.apply(console, ["INFO [" + e.id + "] " + t].concat(r))
                }
                ,
                e.prototype.warn = function(e, t) {
                    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; n > i; i++)
                        r[i - 2] = arguments[i];
                    console.warn.apply(console, ["WARN [" + e.id + "] " + t].concat(r))
                }
                ,
                e.prototype.error = function(e, t) {
                    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; n > i; i++)
                        r[i - 2] = arguments[i];
                    console.error.apply(console, ["ERROR [" + e.id + "] " + t].concat(r))
                }
                ,
                e
            }();
            e.ConsoleAppender = n
        }
        .call(t, t)
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/logging-console@0.6.0", ["github:aurelia/logging-console@0.6.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/logging-console@0.6.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/loader-default@0.9.0/index", ["github:aurelia/metadata@0.7.0", "github:aurelia/loader@0.8.0"], !1, function(t, n, r) {
        return function(t, n, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function o(e, t) {
                if ("function" != typeof t && null  !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (e.__proto__ = t)
            }
            function s(e, t) {
                var r, i, o = e;
                o.__useDefault && (o = o["default"]),
                n.Origin.set(o, new n.Origin(t,"default"));
                for (r in o)
                    i = o[r],
                    "function" == typeof i && n.Origin.set(i, new n.Origin(t,r));
                return e
            }
            t.__esModule = !0;
            var a = !1;
            if (window.System && window.System["import"]) {
                var l = System._loader.modules;
                System.isFake = !1,
                System.forEachModule = function(e) {
                    for (var t in l)
                        if (e(t, l[t].module))
                            return
                }
            } else {
                var u = window.System = window.System || {};
                if (u.polyfilled = a = !0,
                u.isFake = !1,
                u.map = {},
                u["import"] = function(e) {
                    return new Promise(function(t, n) {
                        require([e], t, n)
                    }
                    )
                }
                ,
                u.normalize = function(e) {
                    return Promise.resolve(e)
                }
                ,
                window.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
                    var c = requirejs.s.contexts._.defined;
                    u.forEachModule = function(e) {
                        for (var t in c)
                            if (e(t, c[t]))
                                return
                    }
                } else
                    u.forEachModule = function(e) {}
            }
            var d = function(t) {
                function n() {
                    i(this, n),
                    t.call(this),
                    this.moduleRegistry = {};
                    var r = this;
                    a ? e("view", [], {
                        load: function(e, t, n, i) {
                            var o, s = r.getOrCreateTemplateRegistryEntry(e);
                            return s.templateIsLoaded ? void n(s) : void r.findBundledTemplate(e, s).then(function(i) {
                                i ? n(s) : (o = t.toUrl(e),
                                r.importTemplate(o).then(function(e) {
                                    s.setTemplate(e),
                                    n(s)
                                }))
                            })
                        }
                    }) : System.set("view", System.newModule({
                        fetch: function(e, t) {
                            var n = e.name.substring(0, e.name.indexOf("!"))
                              , i = e.metadata.templateRegistryEntry = r.getOrCreateTemplateRegistryEntry(n);
                            return i.templateIsLoaded ? "" : r.findBundledTemplate(e.name, i).then(function(t) {
                                return t ? "" : r.importTemplate(e.address).then(function(e) {
                                    return i.setTemplate(e),
                                    ""
                                })
                            })
                        },
                        instantiate: function(e) {
                            return e.metadata.templateRegistryEntry
                        }
                    }))
                }
                return o(n, t),
                n.prototype.loadModule = function(e) {
                    var t = this;
                    return System.normalize(e).then(function(e) {
                        var n = t.moduleRegistry[e];
                        return n ? n : System["import"](e).then(function(n) {
                            return t.moduleRegistry[e] = n,
                            s(n, e)
                        })
                    })
                }
                ,
                n.prototype.loadAllModules = function(e) {
                    for (var t = [], n = 0, r = e.length; r > n; ++n)
                        t.push(this.loadModule(e[n]));
                    return Promise.all(t)
                }
                ,
                n.prototype.loadTemplate = function(e) {
                    return a ? System["import"]("view!" + e) : System["import"](e + "!view")
                }
                ,
                n.prototype.loadText = function(e) {
                    return a ? System["import"]("text!" + e) : System["import"](e + "!text")
                }
                ,
                n
            }(r.Loader);
            t.DefaultLoader = d,
            window.AureliaLoader = d
        }
        .call(n, n, t("github:aurelia/metadata@0.7.0"), t("github:aurelia/loader@0.8.0"))
    });
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/loader-default@0.9.0", ["github:aurelia/loader-default@0.9.0/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/loader-default@0.9.0/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/framework@0.13.2/index", ["npm:core-js@0.9.18", "github:aurelia/logging@0.6.0", "github:aurelia/metadata@0.7.0", "github:aurelia/dependency-injection@0.9.0", "github:aurelia/loader@0.8.0", "github:aurelia/path@0.8.0", "github:aurelia/templating@0.13.2", "github:aurelia/binding@0.8.1", "github:aurelia/task-queue@0.6.0"], !1, function(e, t, n) {
        return function(e, t, n, r, i, o, s, a, l, u) {
            "use strict";
            function c(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null  != e)
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t["default"] = e,
                t
            }
            function d(e, t) {
                for (var n = Object.getOwnPropertyNames(t), r = 0; r < n.length; r++) {
                    var i = n[r]
                      , o = Object.getOwnPropertyDescriptor(t, i);
                    o && o.configurable && void 0 === e[i] && Object.defineProperty(e, i, o)
                }
                return e
            }
            function h(e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }
            function p(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function f(e, t, n) {
                return v.debug("Loading plugin " + n.moduleId + "."),
                e.currentPluginId = n.moduleId.endsWith(".js") || n.moduleId.endsWith(".ts") ? n.moduleId.substring(0, n.moduleId.length - 3) : n.moduleId,
                t.loadModule(n.moduleId).then(function(t) {
                    return "configure" in t ? Promise.resolve(t.configure(e, n.config || {})).then(function() {
                        e.currentPluginId = null ,
                        v.debug("Configured plugin " + n.moduleId + ".")
                    }) : (e.currentPluginId = null ,
                    void v.debug("Loaded plugin " + n.moduleId + "."))
                })
            }
            function m() {
                document.body.addEventListener("submit", function(e) {
                    var t = e.target
                      , n = t.action;
                    "form" !== t.tagName.toLowerCase() || n || e.preventDefault()
                })
            }
            function g(e, t, n) {
                var r, i, o = e.get(a.ViewEngine), s = Object.keys(t), l = new Array(s.length);
                for (r = 0,
                i = s.length; i > r; ++r)
                    l[r] = t[s[r]];
                return o.importViewResources(s, l, n)
            }
            e.__esModule = !0;
            var v = (h(t),
            n.getLogger("aurelia"))
              , y = function() {
                function e(t) {
                    p(this, e),
                    this.aurelia = t,
                    this.info = [],
                    this.processed = !1
                }
                return e.prototype.plugin = function t(e, n) {
                    var t = {
                        moduleId: e,
                        config: n || {}
                    };
                    return this.processed ? f(this.aurelia, this.aurelia.loader, t) : this.info.push(t),
                    this
                }
                ,
                e.prototype._process = function() {
                    var e, t = this, n = this.aurelia, r = n.loader, i = this.info;
                    if (!this.processed) {
                        var o = function s() {
                            return (e = i.shift()) ? f(n, r, e).then(s) : (t.processed = !0,
                            Promise.resolve())
                        }
                        ;
                        return o()
                    }
                }
                ,
                e
            }();
            e.Plugins = y;
            var v = n.getLogger("aurelia");
            Array.prototype.slice;
            if (!window.CustomEvent || "function" != typeof window.CustomEvent) {
                var b = function(e, t) {
                    var t = t || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }
                      , n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
                    n
                }
                ;
                b.prototype = window.Event.prototype,
                window.CustomEvent = b
            }
            var w = function() {
                function e(t, n, r) {
                    p(this, e),
                    this.loader = t || new window.AureliaLoader,
                    this.container = n || new i.Container,
                    this.resources = r || new a.ResourceRegistry,
                    this.use = new y(this),
                    this.resourcesToLoad = {},
                    this.withInstance(e, this),
                    this.withInstance(o.Loader, this.loader),
                    this.withInstance(a.ResourceRegistry, this.resources),
                    this.container.makeGlobal()
                }
                return e.prototype.withInstance = function(e, t) {
                    return this.container.registerInstance(e, t),
                    this
                }
                ,
                e.prototype.withSingleton = function(e, t) {
                    return this.container.registerSingleton(e, t),
                    this
                }
                ,
                e.prototype.globalizeResources = function(e) {
                    var t, n, r, i, o = Array.isArray(e) ? e : arguments, a = this.currentPluginId || "", l = a.startsWith("./");
                    for (t = 0,
                    n = o.length; n > t; ++t) {
                        if (r = o[t],
                        "string" != typeof r)
                            throw new Error("Invalid resource path [" + r + "]. Resources must be specified as relative module IDs.");
                        i = l ? s.relativeToFile(r, a) : s.join(a, r),
                        this.resourcesToLoad[i] = this.resourcesToLoad[i]
                    }
                    return this
                }
                ,
                e.prototype.renameGlobalResource = function(e, t) {
                    return this.resourcesToLoad[e] = t,
                    this
                }
                ,
                e.prototype.start = function() {
                    var e = this;
                    return this.started ? Promise.resolve(this) : (this.started = !0,
                    v.info("Aurelia Starting"),
                    m(),
                    this.use._process().then(function() {
                        if (!e.container.hasHandler(a.BindingLanguage)) {
                            var t = "You must configure Aurelia with a BindingLanguage implementation.";
                            throw v.error(t),
                            new Error(t)
                        }
                        return e.container.hasHandler(a.Animator) || a.Animator.configureDefault(e.container),
                        g(e.container, e.resourcesToLoad, e.resources).then(function() {
                            v.info("Aurelia Started");
                            var t = new window.CustomEvent("aurelia-started",{
                                bubbles: !0,
                                cancelable: !0
                            });
                            return document.dispatchEvent(t),
                            e
                        })
                    }))
                }
                ,
                e.prototype.setRoot = function() {
                    var e, t = this, n = void 0 === arguments[0] ? "app" : arguments[0], r = void 0 === arguments[1] ? null  : arguments[1], i = {};
                    return r = r || this.host,
                    r && "string" != typeof r ? this.host = r : this.host = document.getElementById(r || "applicationHost") || document.body,
                    this.host.aurelia = this,
                    e = this.container.get(a.CompositionEngine),
                    i.viewModel = n,
                    i.container = i.childContainer = this.container,
                    i.viewSlot = new a.ViewSlot(this.host,!0),
                    i.viewSlot.transformChildNodesIntoView(),
                    i.host = this.host,
                    e.compose(i).then(function(e) {
                        t.root = e,
                        i.viewSlot.attached();
                        var n = new window.CustomEvent("aurelia-composed",{
                            bubbles: !0,
                            cancelable: !0
                        });
                        return setTimeout(function() {
                            return document.dispatchEvent(n)
                        }, 1),
                        t
                    })
                }
                ,
                e
            }();
            e.Aurelia = w,
            d(e, c(i)),
            d(e, c(l)),
            d(e, c(r)),
            d(e, c(a)),
            d(e, c(o)),
            d(e, c(u)),
            d(e, c(s));
            var x = n;
            e.LogManager = x
        }
        .call(t, t, e("npm:core-js@0.9.18"), e("github:aurelia/logging@0.6.0"), e("github:aurelia/metadata@0.7.0"), e("github:aurelia/dependency-injection@0.9.0"), e("github:aurelia/loader@0.8.0"), e("github:aurelia/path@0.8.0"), e("github:aurelia/templating@0.13.2"), e("github:aurelia/binding@0.8.1"), e("github:aurelia/task-queue@0.6.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/framework@0.13.2", ["github:aurelia/framework@0.13.2/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/framework@0.13.2/index"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/event-aggregator@0.6.1/index", ["github:aurelia/logging@0.6.0"], !1, function(e, t, n) {
        return function(e, t) {
            "use strict";
            function n(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function r(e) {
                try {
                    e()
                } catch (t) {
                    s.error(t)
                }
            }
            function i(e) {
                var t = new l;
                return e.subscribeOnce = function(e, n) {
                    return t.subscribeOnce(e, n)
                }
                ,
                e.subscribe = function(e, n) {
                    return t.subscribe(e, n)
                }
                ,
                e.publish = function(e, n) {
                    t.publish(e, n)
                }
                ,
                t
            }
            function o(e) {
                e.withInstance(l, i(e))
            }
            e.__esModule = !0,
            e.includeEventsIn = i,
            e.configure = o;
            var s = t.getLogger("event-aggregator")
              , a = function() {
                function e(t, r) {
                    n(this, e),
                    this.messageType = t,
                    this.callback = r
                }
                return e.prototype.handle = function(e) {
                    var t = this;
                    e instanceof this.messageType && r(function() {
                        return t.callback.call(null , e)
                    })
                }
                ,
                e
            }()
              , l = function() {
                function e() {
                    n(this, e),
                    this.eventLookup = {},
                    this.messageHandlers = []
                }
                return e.prototype.publish = function(e, t) {
                    var n, i;
                    if ("string" == typeof e) {
                        if (n = this.eventLookup[e])
                            for (n = n.slice(),
                            i = n.length; i--; )
                                r(function() {
                                    return n[i](t, e)
                                })
                    } else
                        for (n = this.messageHandlers.slice(),
                        i = n.length; i--; )
                            n[i].handle(e)
                }
                ,
                e.prototype.subscribe = function(e, t) {
                    var n, r;
                    return "string" == typeof e ? (n = this.eventLookup[e] || (this.eventLookup[e] = []),
                    n.push(t),
                    function() {
                        var e = n.indexOf(t);
                        -1 != e && n.splice(e, 1)
                    }
                    ) : (r = new a(e,t),
                    n = this.messageHandlers,
                    n.push(r),
                    function() {
                        var e = n.indexOf(r);
                        -1 != e && n.splice(e, 1)
                    }
                    )
                }
                ,
                e.prototype.subscribeOnce = function(e, t) {
                    var n = this.subscribe(e, function(e, r) {
                        return n(),
                        t(e, r)
                    });
                    return n
                }
                ,
                e
            }();
            e.EventAggregator = l
        }
        .call(t, t, e("github:aurelia/logging@0.6.0"))
    })
}(),
function() {
    function e() {}
    e.amd = {},
    System.register("github:aurelia/event-aggregator@0.6.1", ["github:aurelia/event-aggregator@0.6.1/index"], !1, function(e, t, n) {
        return function(e) {
            return e
        }
        .call(this, e("github:aurelia/event-aggregator@0.6.1/index"))
    })
}(),
System.register("toggle-button", ["github:aurelia/framework@0.13.2"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(e, t, n) {
        var r = n[t];
        if (r) {
            var i = {};
            for (var o in r)
                i[o] = r[o];
            i.value = i.initializer.call(e),
            Object.defineProperty(e, t, i)
        }
    }
    var r, i, o, s = function() {
        function e(e, t, n) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r]
                  , o = i.decorators
                  , s = i.key;
                if (delete i.key,
                delete i.decorators,
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                ("value" in i || i.initializer) && (i.writable = !0),
                o) {
                    for (var a = 0; a < o.length; a++) {
                        var l = o[a];
                        if ("function" != typeof l)
                            throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                        i = l(e, s, i) || i
                    }
                    if (void 0 !== i.initializer) {
                        n[s] = i;
                        continue
                    }
                }
                Object.defineProperty(e, s, i)
            }
        }
        return function(t, n, r, i, o) {
            return n && e(t.prototype, n, i),
            r && e(t, r, o),
            t
        }
    }();
    return {
        setters: [function(e) {
            r = e.customElement,
            i = e.bindable
        }
        ],
        execute: function() {
            o = function() {
                function e() {
                    t(this, a),
                    n(this, "enabled", o)
                }
                var o = {}
                  , a = e;
                return s(a, [{
                    key: "toggle",
                    value: function() {
                        this.enabled ? this.enabled = !1 : this.enabled = !0
                    }
                }, {
                    key: "enabled",
                    decorators: [i],
                    initializer: null ,
                    enumerable: !0
                }], null , o),
                e = r("toggle-button")(e) || e
            }(),
            e("toggleButton", o)
        }
    }
}),
System.register("less-versions", [], function(e) {
    return {
        setters: [],
        execute: function() {
            e("default", ["1.0.5", "1.0.10", "1.0.11", "1.0.14", "1.0.18", "1.0.19", "1.0.21", "1.0.32", "1.0.36", "1.0.40", "1.0.41", "1.0.44", "1.1.0", "1.1.1", "1.1.2", "1.1.4", "1.1.5", "1.1.6", "1.2.0", "1.2.1", "1.2.2", "1.3.0", "1.3.1", "1.3.2", "1.3.3", "1.4.0-b1", "1.4.0-b2", "1.4.0-b3", "1.4.0-b4", "1.4.0", "1.4.1", "1.4.2", "1.5.0-b1", "1.5.0-b2", "1.5.0-b3", "1.5.0-b4", "1.5.0", "1.5.1", "1.6.0", "1.6.1", "1.6.2", "1.6.3", "1.7.0", "1.7.1", "1.7.3", "1.7.4", "1.7.5", "2.0.0-b1", "2.0.0-b2", "2.0.0-b3", "2.0.0", "2.1.0", "2.1.1", "2.1.2", "2.2.0", "2.3.0", "2.3.1", "2.4.0", "2.5.0", "2.5.1", "2.5.2", "2.5.3"])
        }
    }
}),
System.register("less-options", [], function(e) {
    "use strict";
    var t;
    return {
        setters: [],
        execute: function() {
            t = {
                version: "",
                dumpLineNumbers: !1
            },
            e("default", t)
        }
    }
}),
System.register("less-features", ["less-options"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(e, t) {
        e = e.split("."),
        t = t.split(".");
        for (var n = 0; n < t.length; n++) {
            var r = Number(t[n])
              , i = Number(e[n]);
            if (r !== i)
                return i > r
        }
        return !0
    }
    function r(e) {
        return n(i.version, e)
    }
    var i, o, s, a = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }();
    return {
        setters: [function(e) {
            i = e["default"]
        }
        ],
        execute: function() {
            o = {
                promises: "2.0.0",
                outputLineNumbers: "1.3.1",
                relativeUrls: "1.3.2",
                rootPath: "1.3.2",
                strictMath: "1.4.0",
                strictUnits: "1.4.0"
            },
            s = function() {
                function e() {
                    t(this, e)
                }
                return a(e, null , [{
                    key: "hasPromises",
                    value: function() {
                        return r(o.promises)
                    }
                }, {
                    key: "hasOutputLineNumbers",
                    value: function() {
                        return r(o.outputLineNumbers)
                    }
                }, {
                    key: "hasRelativeUrls",
                    value: function() {
                        return r(o.relativeUrls)
                    }
                }, {
                    key: "hasRootPath",
                    value: function() {
                        return r(o.rootPath)
                    }
                }, {
                    key: "hasStrictMath",
                    value: function() {
                        return r(o.strictMath)
                    }
                }, {
                    key: "hasStrictUnits",
                    value: function() {
                        return r(o.strictUnits)
                    }
                }]),
                e
            }(),
            e("default", s)
        }
    }
}),
System.register("insert-script", [], function(e) {
    "use strict";
    function t(e) {
        return new Promise(function(t, n) {
            var r = document.getElementsByTagName("head")[0] || document.documentElement
              , i = document.createElement("script");
            i.src = e,
            i.async = !0,
            i.onload = i.onerror = function(e) {
                "error" === e.type ? n() : t(),
                r && i.parentNode && r.removeChild(i)
            }
            ,
            r.appendChild(i)
        }
        )
    }
    return e("default", t),
    {
        setters: [],
        execute: function() {}
    }
}),
System.register("less", ["less-versions", "less-options", "less-features", "insert-script"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    var n, r, i, o, s, a, l = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }();
    return {
        setters: [function(e) {
            n = e["default"]
        }
        , function(e) {
            r = e["default"]
        }
        , function(e) {
            i = e["default"]
        }
        , function(e) {
            o = e["default"]
        }
        ],
        execute: function() {
            s = function() {
                function e() {
                    t(this, e)
                }
                return l(e, [{
                    key: "getVersions",
                    value: function() {
                        return n
                    }
                }, {
                    key: "loadVersion",
                    value: function(e) {
                        return delete window.less,
                        r.version = e,
                        this.lessPromise = o("assets/less/less.min.js").then(function() {
                            return window.less
                        }),
                        this.lessPromise
                    }
                }, {
                    key: "convert",
                    value: function(e) {
                        return this.lessPromise.then(function(t) {
                            return i.hasPromises() ? t.render(e, r) : new Promise(function(n, i) {
                                var o = new t.Parser(r);
                                o.parse(e, function(e, t) {
                                    if (!e && t)
                                        try {
                                            var o = t.toCSS(r);
                                            n({
                                                css: o
                                            })
                                        } catch (e) {
                                            i(e)
                                        }
                                    else
                                        i(e)
                                })
                            }
                            )
                        })
                    }
                }]),
                e
            }(),
            a = new s,
            e("default", a)
        }
    }
}),
System.register("options-draw", ["github:aurelia/framework@0.13.2", "less", "less-options", "less-features", "github:aurelia/event-aggregator@0.6.1"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(e, t, n) {
        var r = n[t];
        if (r) {
            var i = {};
            for (var o in r)
                i[o] = r[o];
            i.value = i.initializer.call(e),
            Object.defineProperty(e, t, i)
        }
    }
    var r, i, o, s, a, l, u, c = function() {
        function e(e, t, n) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r]
                  , o = i.decorators
                  , s = i.key;
                if (delete i.key,
                delete i.decorators,
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                ("value" in i || i.initializer) && (i.writable = !0),
                o) {
                    for (var a = 0; a < o.length; a++) {
                        var l = o[a];
                        if ("function" != typeof l)
                            throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                        i = l(e, s, i) || i
                    }
                    if (void 0 !== i.initializer) {
                        n[s] = i;
                        continue
                    }
                }
                Object.defineProperty(e, s, i)
            }
        }
        return function(t, n, r, i, o) {
            return n && e(t.prototype, n, i),
            r && e(t, r, o),
            t
        }
    }();
    return {
        setters: [function(e) {
            r = e.customElement,
            i = e.bindable
        }
        , function(e) {
            o = e["default"]
        }
        , function(e) {
            s = e["default"]
        }
        , function(e) {
            a = e["default"]
        }
        , function(e) {
            l = e.EventAggregator
        }
        ],
        execute: function() {
            u = function() {
                function e(e) {
                    t(this, d),
                    n(this, "visible", u),
                    this.lessVersions = o.getVersions(),
                    this.eventAggregator = e
                }
                var u = {}
                  , d = e;
                return c(d, [{
                    key: "attached",
                    value: function() {}
                }, {
                    key: "visibleChanged",
                    value: function(e) {
                        var t = this;
                        clearTimeout(this._timeout),
                        e ? (this.isDisplayed = !0,
                        this._timeout = setTimeout(function() {
                            return t.isVisible = !0
                        }, 0)) : (this.isVisible = !1,
                        this._timeout = setTimeout(function() {
                            return t.isDisplayed = !1
                        }, 1e3))
                    }
                }, {
                    key: "visible",
                    decorators: [i],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "selectedLessVersion",
                    get: function() {
                        return s.version
                    },
                    set: function(e) {
                        o.loadVersion(e),
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }, {
                    key: "outputLineNumbersType",
                    get: function() {
                        return s.dumpLineNumbers || null
                    },
                    set: function(e) {
                        s.dumpLineNumbers = e,
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }, {
                    key: "outputLineNumbers",
                    get: function() {
                        return Boolean(s.dumpLineNumbers)
                    },
                    set: function(e) {
                        e ? this.outputLineNumbersType = "comments" : this.outputLineNumbersType = !1
                    }
                }, {
                    key: "outputLineNumbersAvailable",
                    get: function() {
                        return a.hasOutputLineNumbers()
                    }
                }, {
                    key: "relativeUrlsAvailable",
                    get: function() {
                        return a.hasRelativeUrls()
                    }
                }, {
                    key: "relativeUrls",
                    get: function() {
                        return s.relativeUrls
                    },
                    set: function(e) {
                        s.relativeUrls = e,
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }, {
                    key: "rootPathAvailable",
                    get: function() {
                        return a.hasRootPath()
                    }
                }, {
                    key: "rootPath",
                    get: function() {
                        return s.rootpath
                    },
                    set: function(e) {
                        s.rootpath = e,
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }, {
                    key: "rootPathEnabled",
                    get: function() {
                        return Boolean(this.rootPath)
                    },
                    set: function(e) {
                        e ? this.rootPath = "/path/to/" : this.rootPath = ""
                    }
                }, {
                    key: "strictMathAvailable",
                    get: function() {
                        return a.hasStrictMath()
                    }
                }, {
                    key: "strictMath",
                    get: function() {
                        return s.strictMath
                    },
                    set: function(e) {
                        s.strictMath = e,
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }, {
                    key: "strictUnitsAvailable",
                    get: function() {
                        return a.hasStrictUnits()
                    }
                }, {
                    key: "strictUnits",
                    get: function() {
                        return s.strictUnits
                    },
                    set: function(e) {
                        s.strictUnits = e,
                        this.eventAggregator.publish("lessChanged", {})
                    }
                }], [{
                    key: "inject",
                    value: [l],
                    enumerable: !0
                }], u),
                e = r("options-draw")(e) || e
            }(),
            e("optionsDraw", u)
        }
    }
}),
System.register("main", [], function(e) {
    "use strict";
    function t(e) {
        e.use.standardConfiguration().developmentLogging(),
        e.start().then(function(e) {
            return e.setRoot()
        })
    }
    return e("configure", t),
    {
        setters: [],
        execute: function() {}
    }
}),
System.register("default-less-src", [], function(e) {
    "use strict";
    var t;
    return {
        setters: [],
        execute: function() {
            t = '.transition(@transition) {\n  -webkit-transition: @transition;\n-moz-transition: @transition;\n-o-transition: @transition;\ntransition: @transition;\n}\n.opacity(@opacity) {\n  opacity: @opacity / 100;\n  filter: ~"alpha(opacity=@{opacity})";\n}\n\na {\n.transition(all 0.4s);\n&:hover {\n  .opacity(70);\n  }\n}\n\n// Selector interpolation only works in 1.3.1+. Try it!\n@theGoodThings: ~".food, .beer, .sleep, .javascript";\n\n@{theGoodThings} {\n  font-weight: bold;\n}',
            e("default", t)
        }
    }
}),
System.register("npm:codemirror@5.3.0/mode/css/css", ["npm:codemirror@5.3.0/lib/codemirror"], !0, function(require, e, t) {
    var n = System.global
      , r = n.define;
    return n.define = void 0,
    function(n) {
        "object" == typeof e && "object" == typeof t ? n(require("npm:codemirror@5.3.0/lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            for (var t = {}, n = 0; n < e.length; ++n)
                t[e[n]] = !0;
            return t
        }
        function n(e, t) {
            for (var n, r = !1; null  != (n = e.next()); ) {
                if (r && "/" == n) {
                    t.tokenize = null ;
                    break
                }
                r = "*" == n
            }
            return ["comment", "comment"]
        }
        e.defineMode("css", function(t, n) {
            function r(e, t) {
                return p = t,
                e
            }
            function i(e, t) {
                var n = e.next();
                if (g[n]) {
                    var i = g[n](e, t);
                    if (i !== !1)
                        return i
                }
                return "@" == n ? (e.eatWhile(/[\w\\\-]/),
                r("def", e.current())) : "=" == n || ("~" == n || "|" == n) && e.eat("=") ? r(null , "compare") : '"' == n || "'" == n ? (t.tokenize = o(n),
                t.tokenize(e, t)) : "#" == n ? (e.eatWhile(/[\w\\\-]/),
                r("atom", "hash")) : "!" == n ? (e.match(/^\s*\w*/),
                r("keyword", "important")) : /\d/.test(n) || "." == n && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/),
                r("number", "unit")) : "-" !== n ? /[,+>*\/]/.test(n) ? r(null , "select-op") : "." == n && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? r("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(n) ? r(null , n) : "u" == n && e.match(/rl(-prefix)?\(/) || "d" == n && e.match("omain(") || "r" == n && e.match("egexp(") ? (e.backUp(1),
                t.tokenize = s,
                r("property", "word")) : /[\w\\\-]/.test(n) ? (e.eatWhile(/[\w\\\-]/),
                r("property", "word")) : r(null , null ) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/),
                r("number", "unit")) : e.match(/^-[\w\\\-]+/) ? (e.eatWhile(/[\w\\\-]/),
                e.match(/^\s*:/, !1) ? r("variable-2", "variable-definition") : r("variable-2", "variable")) : e.match(/^\w+-/) ? r("meta", "meta") : void 0
            }
            function o(e) {
                return function(t, n) {
                    for (var i, o = !1; null  != (i = t.next()); ) {
                        if (i == e && !o) {
                            ")" == e && t.backUp(1);
                            break
                        }
                        o = !o && "\\" == i
                    }
                    return (i == e || !o && ")" != e) && (n.tokenize = null ),
                    r("string", "string")
                }
            }
            function s(e, t) {
                return e.next(),
                e.match(/\s*[\"\')]/, !1) ? t.tokenize = null  : t.tokenize = o(")"),
                r(null , "(")
            }
            function a(e, t, n) {
                this.type = e,
                this.indent = t,
                this.prev = n
            }
            function l(e, t, n) {
                return e.context = new a(n,t.indentation() + m,e.context),
                n
            }
            function u(e) {
                return e.context = e.context.prev,
                e.context.type
            }
            function c(e, t, n) {
                return M[n.context.type](e, t, n)
            }
            function d(e, t, n, r) {
                for (var i = r || 1; i > 0; i--)
                    n.context = n.context.prev;
                return c(e, t, n)
            }
            function h(e) {
                var t = e.current().toLowerCase();
                f = C.hasOwnProperty(t) ? "atom" : S.hasOwnProperty(t) ? "keyword" : "variable"
            }
            n.propertyKeywords || (n = e.resolveMode("text/css"));
            var p, f, m = t.indentUnit, g = n.tokenHooks, v = n.documentTypes || {}, y = n.mediaTypes || {}, b = n.mediaFeatures || {}, w = n.propertyKeywords || {}, x = n.nonStandardPropertyKeywords || {}, k = n.fontProperties || {}, j = n.counterDescriptors || {}, S = n.colorKeywords || {}, C = n.valueKeywords || {}, L = n.allowNested, M = {};
            return M.top = function(e, t, n) {
                if ("{" == e)
                    return l(n, t, "block");
                if ("}" == e && n.context.prev)
                    return u(n);
                if (/@(media|supports|(-moz-)?document)/.test(e))
                    return l(n, t, "atBlock");
                if (/@(font-face|counter-style)/.test(e))
                    return n.stateArg = e,
                    "restricted_atBlock_before";
                if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e))
                    return "keyframes";
                if (e && "@" == e.charAt(0))
                    return l(n, t, "at");
                if ("hash" == e)
                    f = "builtin";
                else if ("word" == e)
                    f = "tag";
                else {
                    if ("variable-definition" == e)
                        return "maybeprop";
                    if ("interpolation" == e)
                        return l(n, t, "interpolation");
                    if (":" == e)
                        return "pseudo";
                    if (L && "(" == e)
                        return l(n, t, "parens")
                }
                return n.context.type
            }
            ,
            M.block = function(e, t, n) {
                if ("word" == e) {
                    var r = t.current().toLowerCase();
                    return w.hasOwnProperty(r) ? (f = "property",
                    "maybeprop") : x.hasOwnProperty(r) ? (f = "string-2",
                    "maybeprop") : L ? (f = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag",
                    "block") : (f += " error",
                    "maybeprop")
                }
                return "meta" == e ? "block" : L || "hash" != e && "qualifier" != e ? M.top(e, t, n) : (f = "error",
                "block")
            }
            ,
            M.maybeprop = function(e, t, n) {
                return ":" == e ? l(n, t, "prop") : c(e, t, n)
            }
            ,
            M.prop = function(e, t, n) {
                if (";" == e)
                    return u(n);
                if ("{" == e && L)
                    return l(n, t, "propBlock");
                if ("}" == e || "{" == e)
                    return d(e, t, n);
                if ("(" == e)
                    return l(n, t, "parens");
                if ("hash" != e || /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t.current())) {
                    if ("word" == e)
                        h(t);
                    else if ("interpolation" == e)
                        return l(n, t, "interpolation")
                } else
                    f += " error";
                return "prop"
            }
            ,
            M.propBlock = function(e, t, n) {
                return "}" == e ? u(n) : "word" == e ? (f = "property",
                "maybeprop") : n.context.type
            }
            ,
            M.parens = function(e, t, n) {
                return "{" == e || "}" == e ? d(e, t, n) : ")" == e ? u(n) : "(" == e ? l(n, t, "parens") : "interpolation" == e ? l(n, t, "interpolation") : ("word" == e && h(t),
                "parens")
            }
            ,
            M.pseudo = function(e, t, n) {
                return "word" == e ? (f = "variable-3",
                n.context.type) : c(e, t, n)
            }
            ,
            M.atBlock = function(e, t, n) {
                if ("(" == e)
                    return l(n, t, "atBlock_parens");
                if ("}" == e)
                    return d(e, t, n);
                if ("{" == e)
                    return u(n) && l(n, t, L ? "block" : "top");
                if ("word" == e) {
                    var r = t.current().toLowerCase();
                    f = "only" == r || "not" == r || "and" == r || "or" == r ? "keyword" : v.hasOwnProperty(r) ? "tag" : y.hasOwnProperty(r) ? "attribute" : b.hasOwnProperty(r) ? "property" : w.hasOwnProperty(r) ? "property" : x.hasOwnProperty(r) ? "string-2" : C.hasOwnProperty(r) ? "atom" : "error"
                }
                return n.context.type
            }
            ,
            M.atBlock_parens = function(e, t, n) {
                return ")" == e ? u(n) : "{" == e || "}" == e ? d(e, t, n, 2) : M.atBlock(e, t, n)
            }
            ,
            M.restricted_atBlock_before = function(e, t, n) {
                return "{" == e ? l(n, t, "restricted_atBlock") : "word" == e && "@counter-style" == n.stateArg ? (f = "variable",
                "restricted_atBlock_before") : c(e, t, n)
            }
            ,
            M.restricted_atBlock = function(e, t, n) {
                return "}" == e ? (n.stateArg = null ,
                u(n)) : "word" == e ? (f = "@font-face" == n.stateArg && !k.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == n.stateArg && !j.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property",
                "maybeprop") : "restricted_atBlock"
            }
            ,
            M.keyframes = function(e, t, n) {
                return "word" == e ? (f = "variable",
                "keyframes") : "{" == e ? l(n, t, "top") : c(e, t, n)
            }
            ,
            M.at = function(e, t, n) {
                return ";" == e ? u(n) : "{" == e || "}" == e ? d(e, t, n) : ("word" == e ? f = "tag" : "hash" == e && (f = "builtin"),
                "at")
            }
            ,
            M.interpolation = function(e, t, n) {
                return "}" == e ? u(n) : "{" == e || ";" == e ? d(e, t, n) : ("word" == e ? f = "variable" : "variable" != e && "(" != e && ")" != e && (f = "error"),
                "interpolation")
            }
            ,
            {
                startState: function(e) {
                    return {
                        tokenize: null ,
                        state: "top",
                        stateArg: null ,
                        context: new a("top",e || 0,null )
                    }
                },
                token: function(e, t) {
                    if (!t.tokenize && e.eatSpace())
                        return null ;
                    var n = (t.tokenize || i)(e, t);
                    return n && "object" == typeof n && (p = n[1],
                    n = n[0]),
                    f = n,
                    t.state = M[t.state](p, e, t),
                    f
                },
                indent: function(e, t) {
                    var n = e.context
                      , r = t && t.charAt(0)
                      , i = n.indent;
                    return "prop" != n.type || "}" != r && ")" != r || (n = n.prev),
                    !n.prev || ("}" != r || "block" != n.type && "top" != n.type && "interpolation" != n.type && "restricted_atBlock" != n.type) && (")" != r || "parens" != n.type && "atBlock_parens" != n.type) && ("{" != r || "at" != n.type && "atBlock" != n.type) || (i = n.indent - m,
                    n = n.prev),
                    i
                },
                electricChars: "}",
                blockCommentStart: "/*",
                blockCommentEnd: "*/",
                fold: "brace"
            }
        });
        var r = ["domain", "regexp", "url", "url-prefix"]
          , i = t(r)
          , o = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"]
          , s = t(o)
          , a = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"]
          , l = t(a)
          , u = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"]
          , c = t(u)
          , d = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"]
          , h = t(d)
          , p = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]
          , f = t(p)
          , m = ["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]
          , g = t(m)
          , v = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]
          , y = t(v)
          , b = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "x-large", "x-small", "xor", "xx-large", "xx-small"]
          , w = t(b)
          , x = r.concat(o).concat(a).concat(u).concat(d).concat(v).concat(b);
        e.registerHelper("hintWords", "css", x),
        e.defineMIME("text/css", {
            documentTypes: i,
            mediaTypes: s,
            mediaFeatures: l,
            propertyKeywords: c,
            nonStandardPropertyKeywords: h,
            fontProperties: f,
            counterDescriptors: g,
            colorKeywords: y,
            valueKeywords: w,
            tokenHooks: {
                "/": function(e, t) {
                    return e.eat("*") ? (t.tokenize = n,
                    n(e, t)) : !1
                }
            },
            name: "css"
        }),
        e.defineMIME("text/x-scss", {
            mediaTypes: s,
            mediaFeatures: l,
            propertyKeywords: c,
            nonStandardPropertyKeywords: h,
            colorKeywords: y,
            valueKeywords: w,
            fontProperties: f,
            allowNested: !0,
            tokenHooks: {
                "/": function(e, t) {
                    return e.eat("/") ? (e.skipToEnd(),
                    ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n,
                    n(e, t)) : ["operator", "operator"]
                },
                ":": function(e) {
                    return e.match(/\s*\{/) ? [null , "{"] : !1
                },
                $: function(e) {
                    return e.match(/^[\w-]+/),
                    e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
                },
                "#": function(e) {
                    return e.eat("{") ? [null , "interpolation"] : !1
                }
            },
            name: "css",
            helperType: "scss"
        }),
        e.defineMIME("text/x-less", {
            mediaTypes: s,
            mediaFeatures: l,
            propertyKeywords: c,
            nonStandardPropertyKeywords: h,
            colorKeywords: y,
            valueKeywords: w,
            fontProperties: f,
            allowNested: !0,
            tokenHooks: {
                "/": function(e, t) {
                    return e.eat("/") ? (e.skipToEnd(),
                    ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n,
                    n(e, t)) : ["operator", "operator"]
                },
                "@": function(e) {
                    return e.eat("{") ? [null , "interpolation"] : e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, !1) ? !1 : (e.eatWhile(/[\w\\\-]/),
                    e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
                },
                "&": function() {
                    return ["atom", "atom"]
                }
            },
            name: "css",
            helperType: "less"
        })
    }),
    n.define = r,
    t.exports
}),
System.register("cmeditor", ["github:aurelia/framework@0.13.2", "npm:codemirror@5.3.0", "npm:codemirror@5.3.0/mode/css/css"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function n(e, t, n) {
        var r = n[t];
        if (r) {
            var i = {};
            for (var o in r)
                i[o] = r[o];
            i.value = i.initializer.call(e),
            Object.defineProperty(e, t, i)
        }
    }
    var r, i, o, s, a = function() {
        function e(e, t, n) {
            for (var r = 0; r < t.length; r++) {
                var i = t[r]
                  , o = i.decorators
                  , s = i.key;
                if (delete i.key,
                delete i.decorators,
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                ("value" in i || i.initializer) && (i.writable = !0),
                o) {
                    for (var a = 0; a < o.length; a++) {
                        var l = o[a];
                        if ("function" != typeof l)
                            throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                        i = l(e, s, i) || i
                    }
                    if (void 0 !== i.initializer) {
                        n[s] = i;
                        continue
                    }
                }
                Object.defineProperty(e, s, i)
            }
        }
        return function(t, n, r, i, o) {
            return n && e(t.prototype, n, i),
            r && e(t, r, o),
            t
        }
    }();
    return {
        setters: [function(e) {
            r = e.customElement,
            i = e.bindable
        }
        , function(e) {
            o = e["default"]
        }
        , function(e) {}
        ],
        execute: function() {
            s = function() {
                function e() {
                    t(this, l),
                    n(this, "readonly", s),
                    n(this, "value", s)
                }
                var s = {}
                  , l = e;
                return a(l, [{
                    key: "attached",
                    value: function() {
                        var e = this;
                        this.codeMirror = o.fromTextArea(this.cmTextarea, {
                            lineNumbers: !0,
                            matchBrackets: !0,
                            mode: "text/x-less",
                            theme: "lesser-dark",
                            readOnly: this.readonly
                        }),
                        this.codeMirror.setValue(this.value || ""),
                        this.codeMirror.on("change", function(t, n) {
                            var r = t.getValue();
                            r !== e.value && (e.value = r)
                        })
                    }
                }, {
                    key: "valueChanged",
                    value: function(e, t) {
                        this.codeMirror && e !== this.codeMirror.getValue() && this.codeMirror.setValue(e)
                    }
                }, {
                    key: "readonly",
                    decorators: [i],
                    initializer: null ,
                    enumerable: !0
                }, {
                    key: "value",
                    decorators: [i],
                    initializer: null ,
                    enumerable: !0
                }], null , s),
                e = r("cmeditor")(e) || e
            }(),
            e("cmeditor", s)
        }
    }
}),
System.register("bootstrapper", ["npm:core-js@0.9.18", "github:aurelia/framework@0.13.2", "github:aurelia/logging-console@0.6.0"], function(e) {
    "use strict";
    function t(e) {
        return new Promise(function(t, n) {
            g ? t(e()) : m.push(function() {
                try {
                    t(e())
                } catch (r) {
                    n(r)
                }
            })
        }
        )
    }
    function n(e) {
        return t(function() {
            var t = new window.AureliaLoader
              , n = new d(t);
            return s(n).then(function() {
                return e(n)
            })
        })
    }
    function r(e) {
        return new Promise(function(t, n) {
            function r() {
                e.document.removeEventListener("DOMContentLoaded", r, !1),
                e.removeEventListener("load", r, !1),
                t(e.document)
            }
            "complete" === e.document.readyState ? t(e.document) : (e.document.addEventListener("DOMContentLoaded", r, !1),
            e.addEventListener("load", r, !1))
        }
        )
    }
    function i() {
        if (!window.AureliaLoader) {
            if (window.System)
                return System.normalize("bootstrapper").then(function(e) {
                    return System.normalize("aurelia-loader-default", e).then(function(e) {
                        return System["import"](e)
                    })
                });
            if (window.require)
                return new Promise(function(e, t) {
                    require(["aurelia-loader-default"], e, t)
                }
                );
            throw new Error("No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.")
        }
        return Promise.resolve()
    }
    function o() {
        return System.normalize("bootstrapper").then(function(e) {
            return System.normalize("aurelia-framework", e).then(function(t) {
                return System.map["aurelia-framework"] = t,
                System.normalize("aurelia-loader", t).then(function(n) {
                    var r = [];
                    return System.polyfilled || (f.debug("loading core-js"),
                    r.push(System.normalize("core-js", n).then(function(e) {
                        return System["import"](e)
                    }))),
                    r.push(System.normalize("aurelia-dependency-injection", t).then(function(e) {
                        System.map["aurelia-dependency-injection"] = e
                    })),
                    r.push(System.normalize("aurelia-logging-console", e).then(function(e) {
                        System.map["aurelia-logging-console"] = e
                    })),
                    "import" in document.createElement("link") || (f.debug("loading the HTMLImports polyfill"),
                    r.push(System.normalize("webcomponentsjs/HTMLImports.min", n).then(function(e) {
                        return System["import"](e)
                    }))),
                    "content" in document.createElement("template") || (f.debug("loading the HTMLTemplateElement polyfill"),
                    r.push(System.normalize("aurelia-html-template-element", n).then(function(e) {
                        return System["import"](e)
                    }))),
                    Promise.all(r)
                })
            })
        })
    }
    function s(e) {
        return System.normalize("bootstrapper").then(function(t) {
            var n = [];
            return n.push(System.normalize("aurelia-templating-binding", t).then(function(t) {
                e.use.defaultBindingLanguage = function() {
                    return e.use.plugin(t),
                    this
                }
            })),
            n.push(System.normalize("aurelia-templating-resources", t).then(function(t) {
                System.map["aurelia-templating-resources"] = t,
                e.use.defaultResources = function() {
                    return e.use.plugin(t),
                    this
                }
            })),
            n.push(System.normalize("aurelia-event-aggregator", t).then(function(t) {
                System.map["aurelia-event-aggregator"] = t,
                e.use.eventAggregator = function() {
                    return e.use.plugin(t),
                    this
                }
            })),
            e.use.standardConfiguration = function() {
                return e.use.defaultBindingLanguage().defaultResources().eventAggregator(),
                this
            }
            ,
            e.use.developmentLogging = function() {
                return v || (v = !0,
                h.addAppender(new p),
                h.setLevel(h.logLevel.debug)),
                this
            }
            ,
            Promise.all(n)
        })
    }
    function a() {
        return "http" !== window.location.protocol && "https" !== window.location.protocol
    }
    function l(e) {
        var t, n, r = e.getAttribute("aurelia-app");
        return r ? (n = new window.AureliaLoader,
        n.loadModule(r).then(function(r) {
            return t = new d(n),
            t.host = e,
            s(t).then(function() {
                return r.configure(t)
            })
        })) : (t = new d,
        t.host = e,
        s(t).then(function() {
            return a() && t.use.developmentLogging(),
            t.use.standardConfiguration(),
            t.start().then(function(e) {
                return e.setRoot()
            })
        }))
    }
    function u() {
        return r(window).then(function(e) {
            var t = e.querySelectorAll("[aurelia-app]");
            return i().then(function() {
                return o().then(function() {
                    var e, n;
                    for (e = 0,
                    n = t.length; n > e; ++e)
                        l(t[e]);
                    for (g = !0,
                    e = 0,
                    n = m.length; n > e; ++e)
                        m[e]();
                    m = []
                })
            })
        })
    }
    var c, d, h, p, f, m, g, v;
    return e("bootstrap", n),
    {
        setters: [function(e) {
            c = e["default"]
        }
        , function(e) {
            d = e.Aurelia,
            h = e.LogManager
        }
        , function(e) {
            p = e.ConsoleAppender
        }
        ],
        execute: function() {
            f = h.getLogger("bootstrapper"),
            m = [],
            g = !1,
            v = !1,
            u()
        }
    }
}),
System.register("app", ["less", "less-options", "default-less-src", "github:aurelia/event-aggregator@0.6.1"], function(e) {
    "use strict";
    function t(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    var n, r, i, o, s, a = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }();
    return {
        setters: [function(e) {
            n = e["default"]
        }
        , function(e) {
            r = e["default"]
        }
        , function(e) {
            i = e["default"]
        }
        , function(e) {
            o = e.EventAggregator
        }
        ],
        execute: function() {
            s = function() {
                function e(o) {
                    var s = this;
                    t(this, e);
                    var a = n.getVersions()
                      , l = a[a.length - 1];
                    n.loadVersion(l),
                    this.lessOptions = r;
                    var u = decodeURIComponent(window.location.hash.replace(/^#/, ""))
                      , c = !1;
                    if (u)
                        try {
                            var d = JSON.parse(u);
                            this.lessSrc = d.less,
                            c = !0
                        } catch (h) {}
                    c || (this.lessSrc = i),
                    o.subscribe("lessChanged", function() {
                        s.runLess()
                    })
                }
                return a(e, [{
                    key: "openDraw",
                    value: function() {
                        this.isDrawerOpen = !this.isDrawerOpen
                    }
                }, {
                    key: "runLess",
                    value: function() {
                        var e = this;
                        n.convert(this._lessSrc).then(function(t) {
                            e.css = t.css,
                            e.hasError = !1
                        })["catch"](function(t) {
                            e.css = e.convertError(t),
                            e.hasError = !0
                        })
                    }
                }, {
                    key: "convertError",
                    value: function(e) {
                        var t = ""
                          , n = e.extract
                          , r = [];
                        if (e.stack && !e.type)
                            return e.stack;
                        if (!e.hasOwnProperty("index") || !n)
                            return e.stack || e.message;
                        if ("string" == typeof n[0] && r.push(e.line - 1 + " " + n[0]),
                        "string" == typeof n[1]) {
                            var i = e.line + " ";
                            n[1] && (i += n[1].slice(0, e.column) + n[1].substr(e.column, 1) + n[1].slice(e.column + 1)),
                            r.push(i)
                        }
                        return "string" == typeof n[2] && r.push(e.line + 1 + " " + n[2]),
                        r = r.join("\n") + "\n",
                        t += e.type + "Error: " + e.message,
                        e.filename && (t += " on line " + e.line + ", column " + (e.column + 1) + ":"),
                        t += "\n\n" + r,
                        e.callLine && (t += "from " + e.callLine + " " + e.callExtract + "/n"),
                        t
                    }
                }, {
                    key: "lessSrc",
                    get: function() {
                        return this._lessSrc
                    },
                    set: function(e) {
                        this._lessSrc = e,
                        e !== i && (window.location.hash = "#" + encodeURIComponent(JSON.stringify({
                            less: e
                        }))),
                        this.runLess()
                    }
                }], [{
                    key: "inject",
                    value: [o],
                    enumerable: !0
                }]),
                e
            }(),
            e("App", s)
        }
    }
});
