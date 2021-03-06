// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: "C",
  url: "https://css-tricks.com"
}, {
  logo: "W",
  url: "https://www.w3schools.com"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); // 删除以 ’/‘ 开头的内容
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    console.log(index);
    var $li = $("<li>   \n    <div class=\"site\" id=\"touchArea\">\n      <div class=\"logo\">".concat(node.logo, "</div>\n      <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n      <button class='edit-menu'>\n        <svg class=\"icon\" >\n          <use xlink:href=\"#icon-shenglve\"></use>\n        </svg>\n      </button>\n    </div>    \n  </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      // 点击 li ，跳转到 url
      window.open(node.url, "_self");
    });
    $li.on("click", ".edit-menu", function (e) {
      // 点击 .close 区域，阻止冒泡（窗口跳转）
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1); //在 hashMap 内删掉 此条数据

      render(); //然后重新渲染页面
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入要添加的网址：");

  if (url.indexOf("http") === -1) {
    url = "https://" + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); // localStorage 只能存字符串，所以先将对象转化字符串

  window.localStorage.setItem("x", string);
}; //监听屏幕长按，显示删除按钮


var timeOutEvent = 0;
$(function () {
  $("#touchArea").on({
    touchstart: function touchstart(e) {
      timeOutEvent = setTimeout(longPress(), 500);
      e.preventDefault();
    },
    touchmove: function touchmove() {
      clearTimeout(timeOutEvent);
      timeOutEvent = 0;
    },
    touchend: function touchend() {
      clearTimeout(timeOutEvent);
    }
  });

  if (timeOutEvent >= 500) {
    $(".siteList .site .close").css({
      visibility: "visible"
    });
  }
}); //键盘监听

$(document).on("keypress", function (e) {
  var key = e.key; // 即 const key = e.key

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url, "_self");
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6b81c935.js.map