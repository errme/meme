var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function() {
  var wxapi = "//web.archive.org/web/20190108203039/http://res.wx.qq.com/open/js/jweixin-1.0.0.js", qqapi = "//web.archive.org/web/20190108203039/http://open.mobile.qq.com/sdk/qqapi.js?_bid=152", qzapi = "//web.archive.org/web/20190108203039/http://qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339";
  var require;
  function _require(url, onload) {
    var doc = document;
    var head = doc.head || (doc.getElementsByTagName("head")[0] || doc.documentElement);
    var node = doc.createElement("script");
    node.onload = onload;
    node.onerror = function() {
    };
    node.async = true;
    node.src = url[0];
    head.appendChild(node);
  }
  function _initWX(data) {
    if (!data.WXconfig) {
      return;
    }
    require([wxapi], function(wx) {
      if (!wx.config) {
        wx = window.wx;
      }
      var conf = data.WXconfig;
      wx.config({debug:false, appId:conf.appId, timestamp:conf.timestamp, nonceStr:conf.nonceStr, signature:conf.signature, jsApiList:["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone"]});
      wx.error(function(res) {
      });
      wx.ready(function() {
        var config = {title:data.title, desc:data.summary, link:data.url, imgUrl:data.pic, type:"", dataUrl:"", success:function() {
          data.callback && data.callback();
        }, cancel:function() {
        }};
        wx.onMenuShareAppMessage(config);
        wx.onMenuShareQQ(config);
        wx.onMenuShareQZone(config);
        if (conf.swapTitleInWX) {
          wx.onMenuShareTimeline({title:data.summary, desc:data.title, link:data.url, imgUrl:data.pic, type:"", dataUrl:"", success:function() {
            data.callback && data.callback();
          }, cancel:function() {
          }});
        } else {
          wx.onMenuShareTimeline(config);
        }
      });
    });
  }
  function _initQQ(data) {
    var info = {title:data.title, desc:data.summary, share_url:data.url, image_url:data.pic};
    function doQQShare() {
      try {
        if (data.callback) {
          window.mqq.ui.setOnShareHandler(function(type) {
            if (type == 3 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
              info.title = data.summary;
            } else {
              info.title = data.title;
            }
            info.share_type = type;
            info.back = true;
            window.mqq.ui.shareMessage(info, function(result) {
              if (result.retCode === 0) {
                data.callback && data.callback.call(this, result);
              }
            });
          });
        } else {
          window.mqq.data.setShareInfo(info);
        }
      } catch (e) {
      }
    }
    if (window.mqq) {
      doQQShare();
    } else {
      require([qqapi], function() {
        doQQShare();
      });
    }
  }
  function _initQZ(data) {
    function doQZShare() {
      if (QZAppExternal && QZAppExternal.setShare) {
        var imageArr = [], titleArr = [], summaryArr = [], shareURLArr = [];
        for (var i = 0;i < 5;i++) {
          imageArr.push(data.pic);
          shareURLArr.push(data.url);
          if (i === 4 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
            titleArr.push(data.summary);
            summaryArr.push(data.title);
          } else {
            titleArr.push(data.title);
            summaryArr.push(data.summary);
          }
        }
        QZAppExternal.setShare(function(data) {
        }, {"type":"share", "image":imageArr, "title":titleArr, "summary":summaryArr, "shareURL":shareURLArr});
      }
    }
    if (window.QZAppExternal) {
      doQZShare();
    } else {
      require([qzapi], function() {
        doQZShare();
      });
    }
  }
  function init(opts) {
    var ua = navigator.userAgent;
    var isWX = ua.match(/MicroMessenger\/([\d\.]+)/), isQQ = ua.match(/QQ\/([\d\.]+)/), isQZ = ua.indexOf("Qzone/") !== -1;
    isWX && _initWX(opts);
    isQQ && _initQQ(opts);
    isQZ && _initQZ(opts);
  }
  if (typeof define === "function" && (define.cmd || define.amd)) {
    if (define.cmd) {
      require = seajs.use;
    } else {
      if (define.amd) {
        require = window.require;
      }
    }
    define(function() {
      return init;
    });
  } else {
    require = _require;
    window.setShareInfo = init;
  }
})();



}
/*
     FILE ARCHIVED ON 20:30:39 Jan 08, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:35 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 206.559 (5)
  captures_list: 223.793
  exclusion.robots.policy: 0.422
  LoadShardBlock: 201.227 (3)
  CDXLines.iter: 15.523 (3)
  esindex: 0.015
  exclusion.robots: 0.444
  RedisCDXSource: 3.083
  PetaboxLoader3.resolve: 134.432 (3)
  load_resource: 220.393 (2)
*/