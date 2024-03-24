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

$.module("Ttpod.common",
function() {
	function o() {
		var o = $.parseParam(location.search.replace(/\?/gi, "&")),
		n = o.from || o.source || $.store.get("from") || "dongting",
		t = JSON.parse($.store.get("client-" + n) || "{}");
		delete o.callback,
		Ttpod.config.from = n,
		Ttpod.config.client = $.extend(t, o),
		Ttpod.config.client.os = (Ttpod.config.client.os || Ttpod.config.client.device || "android").toString().toLowerCase(),
		$.store.set("client-" + n, JSON.stringify(Ttpod.config.client)),
		$.store.set("from", Ttpod.config.from);
		var e = Ttpod.core.store("isOpenSong");
		e && (Ttpod.config.isOpenSong = e)
	}
	return Ttpod.core.setErrorHandler({
		0: function() {},
		30305: function() {
			Ttpod.user.handleExpiredToken()
		}
	}),
	o(),
	{
		getPic: function(o, n) {
			var t = Math.floor(o / 255),
			e = Math.floor(o / 7);
			return "https://web.archive.org/web/20190615075516/http://pic.ttpod.cn/singerpic/" + t + "/" + e + "/" + o + "_" + n + ".jpg"
		},
		getSongList: function(o, n) {
			return $.isArray(o) && (o = o.join(",")),
			$.isEmptyObject(o) ? void($.isFunction(n) && n([])) : void Ttpod.core.getResult({
				action: "getSongResource",
				data: {
					song_id: o,
					code: $.CRC32(o)
				},
				jsonpCallback: "jsonp_ting",
				success: function(o) {
					for (var t = o.data, e = [], i = 0, c = t.length; c > i; i++) e.push({
						singer_id: t[i].song_id,
						song_id: t[i].song_id,
						song_name: t[i].song_name,
						album: t[i].album_name,
						singer_name: t[i].singer_name,
						pick_count: t[i].pick_count
					});
					$.isFunction(n) && n(e, t)
				},
				error: function() {
					n(null, null)
				}
			})
		},
		enableOpenSong: function() {
			Ttpod.core.store("isOpenSong", !0),
			Ttpod.config.isOpenSong = !0
		}
	}
});
$.module("Ttpod.ui",
function() {
	function a() {
		var a = $.parseParam(location.hash);
		return a.a = a.a || Ttpod.config.defaultNav,
		a.page = a.page || 1,
		a.size = Ttpod.config.defaultSize || 50,
		a.pnlId = a.a + "Panel",
		a
	}
	function t(t) {
		var i = a();
		if (i.a) {
			var e = l[i.a.toLowerCase()];
			if (e && $.isFunction(e.render)) {
				for (var o = 0; o < d.length; o++) d[o](i, t);
				e.render(i);
				for (var o = 0; o < c.length; o++) c[o](i, t);
				n(i)
			}
		}
	}
	function i() {
		Ttpod.ui.activePanel && ($.parseBoolean(Ttpod.ui.activePanel.attr("data-isLoadMore")) && Ttpod.ui.reachBottom(60, Ttpod.ui.content) && e(), clearTimeout(r), r = setTimeout(function() {
			$("img[data-original]", Ttpod.ui.activePanel).lazyload({
				container: Ttpod.ui.content
			})
		},
		500))
	}
	function e() {
		var t = a(),
		i = $("#" + t.pnlId),
		e = Ttpod.ui.getPnlPty(i);
		if (!e.loading && e.hasMore && t.a) {
			var n = l[t.a.toLowerCase()];
			n && $.isFunction(n.loadMore) && (t.page = e.page + 1, n.loadMore(t))
		}
	}
	function n(a) {
		a = $.extend({},
		a);
		for (var t in h.filterLogParams) delete a[h.filterLogParams[t]]; - 1 != h.chanel.indexOf("|" + a.a + "|") && (Ttpod.ui.curChannel = a.a),
		a.cid && (Ttpod.ui.curChannel = a.cid),
		$.store.set("curChannel", Ttpod.ui.curChannel);
		var i = Ttpod.config.page;
		a.cid = Ttpod.ui.curChannel + "_" + i,
		Ttpod.core.log(a),
		o = a.a
	}
	var o,
	s = !1,
	r = null,
	l = {},
	d = [],
	c = [],
	h = {
		page: "#page",
		nav: "#nav",
		content: "#main",
		panelExtra: ".appPanel",
		pageTitle: "#pageTitle",
		filterLogParams: [],
		chanel: ""
	};
	return {
		page: "",
		nav: "",
		content: "",
		activePanel: "",
		uiLoadTip: "",
		uiLoadMore: "",
		uiLoadError: "",
		pageTitle: "",
		docTitle: "",
		curChannel: "",
		params: {},
		init: function(a) {
			s || ($.extend(h, a || {}), this.page = $(h.page), this.nav = $(h.nav), this.content = $(h.content), this.activePanel = "", this.pageTitle = $(h.pageTitle), this.curChannel = $.store.get("curChannel"), this.page.append('<div id="uiLoadTip" class="uiLoadTip"><span class="icon"></span>正在加载中...</div>'), this.page.append('<div id="uiLoadError" class="uiLoadError">数据加载失败<br /><a class="refresh" href="javascript:;">点击此处刷新</a></div>'), this.uiLoadTip = $("#uiLoadTip"), this.uiLoadError = $("#uiLoadError"), this.availableTransitions = {
				"default": this.noTransition,
				none: this.noTransition
			},
			$(".btnBack", this.pageTitle).click(Ttpod.ui.goBack), this.content.bind("scroll", i), $.os.desktop || $(window).bind("orientationchange",
			function() {
				$(window).trigger("resize")
			}), $.history.registerAction(t), $(function() {
				$.history.initActionManager()
			}), s = !0)
		},
		registerRouter: function(a, t, i) {
			for (var e in a) e = e.toLowerCase(),
			a[e].pnlPty.id = e + "Panel",
			Ttpod.ui.addPanel(a[e].pnlPty);
			$.isFunction(t) && d.push(t),
			$.isFunction(i) && c.push(i),
			$.extend(l, a)
		},
		goBack: function() {
			window.history.back()
		},
		goForward: function() {
			window.history.forward()
		},
		setTitle: function(a) {
			Ttpod.config.name && (this.docTitle = a + " - " + Ttpod.config.name),
			$.startWith(document.title, "♬") || (document.title = this.docTitle),
			$(".pageTitle .title", this.pageTitle).html(a)
		},
		addPanel: function(a) {
			if (!$.isEmptyObject(a) && a.id && !($("#" + a.id).length > 0)) {
				var t = $('<div id="' + a.id + '" class="panel"><div class="appPanel"></div></div>');
				return a.status = "init",
				this.setPnlPty(t, a),
				a.isLoadMore && (t.append('<div class="uiLoadMore"><div class="icon"></div></div>'), t.append('<div class="panelLoadError"><div class="text">加载失败，<a class="refresh" href="javascript:Ttpod.ui.loadMoreFunc();">点击此处刷新</a></div></div></div>')),
				this.content.append(t),
				t
			}
		},
		updatePanel: function(a, t, i, e) {
			a = $(a),
			e = e || h.panelExtra;
			var n = $(e, a);
			0 == n.length && (n = a),
			i ? n.append(t) : n.html(t)
		},
		getPnlPty: function(a) {
			return a = a ? $(a) : this.activePanel,
			{
				id: a.attr("id"),
				title: a.attr("data-title") || "",
				tab: a.attr("data-tab") || "",
				hash: a.attr("data-hash") || "",
				pageStyle: a.attr("data-pageStyle") || "",
				transition: a.attr("data-transition") || "default",
				status: a.attr("data-status"),
				loading: $.parseBoolean(a.attr("data-loading")),
				resetScroller: $.parseBoolean(a.attr("data-resetScroller")),
				isLoadMore: $.parseBoolean(a.attr("data-isLoadMore")),
				isNoCache: $.parseBoolean(a.attr("data-isNoCache")),
				isKeepPanel: $.parseBoolean(a.attr("data-isKeepPanel")),
				hasMore: $.parseBoolean(a.attr("data-hasMore")),
				page: parseInt(a.attr("data-page")) || 1
			}
		},
		setPnlPty: function(a, t) {
			a = $(a);
			var i = {};
			for (var e in t)"id" != e && ($.startWith(e, "data-") ? i[e] = t[e] : i["data-" + e] = t[e]);
			a.attr(i)
		},
		gotoPanel: function(a, t, i, e) {
			if (a && !this.doingTransition) {
				var n = $(a);
				if (0 != n.length || (e = e || {},
				e.id || 0 != n.selector.indexOf("#") || (e.id = n.selector.replace(/^#*/, "")), n = this.addPanel(e), 0 != n.length)) {
					var o = this.activePanel,
					s = "" == o,
					r = s ? !0: n.attr("id") != o.attr("id");
					this.activePanel = n;
					var l = this.getPnlPty(n);
					if (l.isLoadMore && this.hideLoadMore(), this.hideLoadError(), this.hidePanelError(), t = t || l.title, this.setTitle(t), this.page.removeClass(), this.page.addClass(l.pageStyle), this.focusNav(l), r && (this.doingTransition = !0, l.transition && this.availableTransitions[l.transition] ? this.availableTransitions[l.transition].call(this, o, n) : this.availableTransitions["default"].call(this, o, n)), l.resetScroller && this.content.animate({
						scrollTop: 0
					}), l.loading) return void(("loaded" != l.status || l.isNoCache) && this.showLoading());
					var d = location.hash.replace(/^#*/, "");
					if ("failed" == l.status ? l.status = "init": "init" != l.status && (l.status = "" != d && d != l.hash ? "changing": "loaded"), "" != d && (l.hash = d), "loaded" != l.status || l.isNoCache) {
						if ($.isFunction(i)) return l.isKeepPanel || this.updatePanel(this.activePanel, ""),
						l.loading = !0,
						this.showLoading(),
						this.setPnlPty(n, l),
						void i.call(this, this.activePanel, l);
						"string" == $.type(i) && this.updatePanel(this.activePanel, i)
					}
					this.endPanelLoad(l)
				}
			}
		},
		refreshPanel: function(a, t) {
			a = a ? $(a) : this.activePanel,
			this.setPnlPty(a, {
				status: "init",
				hasMore: !0,
				page: 1
			}),
			a.length > 0 && a.attr("id") == this.activePanel.attr("id") ? $(window).trigger("hashchange") : t && (location.hash = t)
		},
		endPanelLoad: function(a, t) {
			a = a || {},
			a.status = "loaded",
			a.loading = !1,
			t = t || this.activePanel,
			this.setPnlPty(t, a),
			t.attr("id") == this.activePanel.attr("id") && this.hideLoading(),
			a.isLoadMore && a.hasMore ? this.showLoadMore(t) : this.hideLoadMore(t)
		},
		focusNav: function(a) {
			if (a.tab) {
				$("a", this.nav).removeClass("active"),
				$("li", this.nav).removeClass("itemActive hasSubActive");
				var t = $("a[data-tabkey=" + a.tab + "]", this.nav);
				t.addClass("active");
				var i = t.parents("li");
				i && i.addClass("itemActive"),
				t.parents(".hasSub").addClass("hasSubActive")
			}
		},
		showLoading: function() {
			this.uiLoadTip.show()
		},
		hideLoading: function() {
			this.uiLoadTip.hide()
		},
		showLoadMore: function(a) {
			a = a || this.activePanel,
			$(".uiLoadMore", a).show()
		},
		hideLoadMore: function(a) {
			a = a || this.activePanel,
			$(".uiLoadMore", a).hide()
		},
		showLoadError: function(a, t) {
			var i = this;
			a = $(a),
			this.activePanel && a.attr("id") != this.activePanel.attr("id") || (this.hideLoading(), this.uiLoadError.show()),
			this.setPnlPty(a, {
				status: "failed",
				loading: !1
			}),
			$.isFunction(t) || (t = function() {
				i.refreshPanel()
			}),
			$(".refresh", this.uiLoadError).unbind().click(t)
		},
		hideLoadError: function() {
			this.uiLoadError.hide()
		},
		showPanelError: function(a) {
			a = a || this.activePanel,
			$(".panelLoadError", a).show()
		},
		hidePanelError: function(a) {
			a = a || this.activePanel,
			$(".panelLoadError", a).hide()
		},
		reachBottom: function(a, t) {
			var i,
			e;
			if (t && $(t).length > 0) t = $(t),
			i = t[0].clientHeight,
			nScrollTop = t[0].scrollTop,
			e = t[0].scrollHeight;
			else {
				var n = document.documentElement,
				o = document.body,
				s = 0 == n.scrollTop;
				i = s ? o.clientHeight: n.clientHeight,
				nScrollTop = s ? o.scrollTop: n.scrollTop,
				e = s ? o.scrollHeight: n.scrollHeight
			}
			return nScrollTop + i >= e - (a || 0) ? !0: !1
		},
		noTransition: function(a, t) {
			a && $(".panel", this.content).hide(),
			t.length > 0 && t.show(),
			this.finishTransition(a)
		},
		finishTransition: function(a) {
			a && a.hide(),
			this.doingTransition = !1
		},
		getHashParams: a,
		renderCommon: function(a) {
			var t = $.extend({},
			a.params),
			i = Ttpod.ui;
			i.gotoPanel("#" + t.pnlId, a.title,
			function(e, n) {
				function o(o) {
					var s = !!(n.isLoadMore && o.data && t.size <= o.data.length);
					i.endPanelLoad({
						hasMore: s,
						page: t.page
					},
					e),
					i.updatePanel(e, $.template(a.tmpl, o)),
					$.isFunction(a.callback) && a.callback(e, n, o),
					$("img[data-original]", e).lazyload({
						container: i.content
					})
				}
				$.exists(a.result) ? o(a.result) : Ttpod.core.getResult({
					url: a.url,
					action: a.action,
					data: t,
					cache: a.cache,
					timeout: Ttpod.config.timeout,
					jsonpCallback: a.jsonpCallback,
					success: function(a) {
						o(a)
					},
					error: function() {
						i.showLoadError(e)
					}
				})
			},
			a.pnlPty)
		},
		loadMore: function(a) {
			var t,
			i = Ttpod.ui;
			a && a.params && (t = $.extend({},
			a.params));
			var e = $("#" + t.pnlId),
			n = i.getPnlPty(e); ! n.loading && n.hasMore && (i.hidePanelError(e), i.showLoadMore(e), i.setPnlPty(e, {
				loading: !0
			}), Ttpod.core.getResult({
				url: a.url,
				action: a.action,
				data: t,
				cache: a.cache,
				jsonpCallback: a.jsonpCallback,
				timeout: Ttpod.config.timeout,
				success: function(o) {
					var s = !!(o.data && t.size <= o.data.length);
					if ($.extend(n, {
						status: "loaded",
						loading: !1,
						page: t.page,
						hasMore: s
					}), i.setPnlPty(e, n), i.hideLoadMore(e), s || o.data || 1 == t.page) {
						if (a.extra) {
							var r = $("<div>" + $.template(a.tmpl, o) + "</div>");
							i.updatePanel(e, $(a.extra, r).html(), !0, a.extra)
						} else i.updatePanel(e, $.template(a.tmpl, o), !0);
						"function" == typeof a.callback && a.callback(e, n, o),
						$("img[data-original]", e).lazyload({
							container: i.content
						})
					}
				},
				error: function(a, t) {
					var i = Ttpod.ui;
					i.hideLoadMore(e),
					"service" == t ? ($.extend(n, {
						status: "loaded",
						loading: !1,
						hasMore: !1
					}), i.setPnlPty(e, n)) : (i.showPanelError(e), i.setPnlPty(e, {
						loading: !1
					}))
				}
			}))
		},
		renderPage: function(a) {
			var t = Ttpod.ui;
			t.gotoPanel("#" + a.params.pnlId, a.title,
			function(i, e) {
				Ttpod.core.getResult({
					url: a.url,
					data: a.params,
					timeout: Ttpod.config.timeout,
					dataType: "html",
					success: function(n) {
						t.endPanelLoad({},
						i),
						t.updatePanel(i, n),
						$.isFunction(a.callback) && a.callback(i, e),
						$("img[data-original]", i).lazyload({
							container: t.content
						})
					}
				})
			})
		},
		focusScroll: function(a, t, i) {
			if (a && 0 != a.length) {
				var e = a.offset().top - t.offset().top,
				n = t.height();
				_panelS = t.scrollTop(),
				e > 0 && n > e || (i ? t.stop().animate({
					scrollTop: _panelS + e
				},
				"slow") : t.scrollTop(_panelS + e))
			}
		},
		loadMoreFunc: e
	}
}); !
function(i) {
	i.ui = i.ui || {},
	i.ui.dialog = i.ui.dialog || {};
	document.documentElement;
	default_w = 400,
	default_h = 100;
	var n = {
		setStyle: function(i, n) {
			var i = i || {},
			t = parseInt(i.width),
			o = parseInt(i.height);
			i.width = t >= 0 ? t: default_w,
			i.height = o >= 0 ? o: default_h,
			i.top = i.top ? i.top: "50%",
			i.left = i.left ? i.left: "50%";
			var e = -i.width / 2,
			d = -i.height / 2;
			n.css({
				top: i.top,
				left: i.left,
				"margin-left": e,
				"margin-top": d,
				width: i.width,
				height: i.height
			})
		},
		callback: function(i, n) {
			"function" == typeof i && i(n)
		},
		isCreate: function(i, n) {
			return n.length > 0 ? !0: !1
		},
		render: function(i, n) {
			"show" === n ? i.show() : "hide" === n && i.hide()
		},
		init: function() {
			i("body").append('<div style="display:none;" id="shade"></div>'),
			i("body").delegate("#shade", "click touchstart",
			function() {
				return i.ui.dialog.close(),
				!1
			})
		}
	};
	i.extend(i.ui.dialog, {
		alert: function(t, o, e) {
			var o = o || {};
			o.oId = "alert";
			var d = "alertBtn",
			o = o || {},
			t = "<p>" + t + '</p><input value="确定" id="' + d + '" type="button">',
			l = this;
			this.open(t, o,
			function() {
				i("#" + d).unbind().bind("click",
				function() {
					n.callback(e),
					l.close()
				})
			})
		},
		confirm: function(t, o, e, d, l) {
			var e = e || {};
			e.oId = "confirm";
			var a = this,
			c = "d-confirmBtn",
			u = "d-cancelBtn",
			s = "d-closeBtn",
			r = '<h3 class="header">' + t + '</h3><p class="content">' + o + '</p><div class="footer"><input id="' + c + '" value="确定" type="button"><input id="' + u + '" type="button" value="取消"></div><div id="' + s + '">×</div>';
			this.open(r, e,
			function() {
				i("#" + c).unbind("click").bind("click",
				function() {
					n.callback(d),
					a.close()
				}),
				i("#" + u).unbind("click").bind("click",
				function() {
					n.callback(l),
					a.close()
				}),
				i("#" + s).unbind("click").bind("click",
				function() {
					n.callback(l),
					a.close()
				})
			},
			!0, "dialogConfirm")
		},
		timing: function(i, n, t) {
			var t = t || {};
			t.oId = "timing";
			var o = this,
			n = parseInt(n) || 1500,
			e = null,
			i = i || "loading...";
			i = "<p>" + i + "</p>",
			this.open(i, t,
			function() {
				clearTimeout(e),
				e = setTimeout(function() {
					o.close()
				},
				n)
			},
			!0, "dialogTiming")
		},
		open: function(t, o, e, d, l) {
			this.close(d);
			var o = o || {},
			a = o.shade || !1,
			c = null;
			return o.oId ? (c = i(".dialog[data-id=" + o.oId + "]"), n.isCreate(o, c) || (i("body").append('<div id="' + o.oId + 'Dialog" style="display:none" data-id="' + o.oId + '" class="dialog"></div>'), c = i(".dialog[data-id=" + o.oId + "]")), l && c.addClass(l), n.setStyle(o, c), c.html(t), c.find(".close").click(function() {
				i.ui.dialog.close()
			}), a || i("#shade").stop().fadeTo("500", .5), n.render(c, "show"), void n.callback(e, c)) : !1
		},
		openWindow: function(i, n, t) {
			var o = (window.screen.height - t) / 2,
			e = (window.screen.width - n) / 2;
			window.open(i, "Detail", "Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=" + n + " ,Height=" + t + ",top=" + o + ",left=" + e)
		},
		close: function(t) {
			n.render(i(".dialog"), "hide"),
			t && i(".dialog").remove(),
			i("#shade").fadeOut(500)
		}
	}),
	i(function() {
		n.init()
	})
} ($);
$.module("Ttpod.actions",
function() {
	var t = "https://web.archive.org/web/20190615075516/http://v1.ard.h.itlily.com/",
	e = "https://web.archive.org/web/20190615075516/http://ttus.ttpod.com/",
	o = "https://web.archive.org/web/20190615075516/http://fm.api.ttpod.com/",
	i = "https://web.archive.org/web/20190615075516/http://so.ard.iyyin.com/",
	s = "https://web.archive.org/web/20190615075516/http://ting.hotchanson.com/",
	a = "https://web.archive.org/web/20190615075516/http://advise.ttpod.cn/",
	d = "https://web.archive.org/web/20190615075516/http://lp.music.ttpod.com/",
	c = "play/ajax.php",
	n = {
		getitlily: c + "?type=album&id={channelid}&page={page}&size={size}",
		getposter: c + "?type=poster",
		search_filter: "./data/search_ids.php",
		getNewestPlaza: t + "plaza/newest/{size}/jsonp_plaza",
		getPlaza: t + "plaza/{version}/{page}/{size}/jsonp_plaza",
		searchSong: i + "v2/songs/search?q={q}&page={page}&size={size}",
		suggest: i + "suggest.do?q={q}&size={size}",
		taglist: "https://web.archive.org/web/20190615075516/http://fm.api.ttpod.com/taglist?image_type=180_90",
		getdtmusicsbytagid: "https://web.archive.org/web/20190615075516/http://fm.api.ttpod.com/songlist?tagid={tagid}&page={page}&size={size}&image_type=200_200",
		getdtmusicsbyid: o + "dyntags?tagtype=json",
		gettjdtmusicsbyid: o + "pbrpic/tjdt.json",
		pubradio: o + "pubradio?userid={userid}&tagid={tagid}&num={num}",
		getsongidlist: t + "favorites/song_ids/{access_token}/{callback}",
		savefavsong: t + "favorites/create/{access_token}/{song_ids}/{callback}",
		cancelfavsong: t + "favorites/destroy/{access_token}/{song_ids}/{callback}",
		fk: a + "advise_yyc/m.do?contactWay={contactWay}&s={s}&v={v}&proposalContent={proposalContent}&reason={reason}&mid={mid}",
		inv: a + "advise_yyc/s.do",
		getSongDs: s + "detail.do?neid={song_id}&size=0",
		getSongResource: s + "website/ting?song_id={song_id}&code={code}&from={from}",
		getSongLyric: d + "lrc/down?lrcid={lrcid}&artist={artist}&title={title}&song_id={song_id}&code={code}",
		getSingerPic: d + "pic/down?artist={artist}&rand={rand}&code={code}",
		getBgData: "./data/bg.php",
		checkSong: i + "check.do?song_id={song_id}",
		sendPicLyricError: "https://web.archive.org/web/20190615075516/http://admin.lrc.ttpod.com/ttuser/feed?level={level}&lptype={lptype}&lrcid={lrcid}&arpic={arpic}&title={title}&artist={artist}&songid={songid}",
		getUserInfo: e + "user/show?access_token={access_token}",
		register: e + "register?nick_name={nick_name}&user_name={user_name}&password={password}",
		localLogin: e + "login?user_name={user_name}&password={password}",
		checkname: e + "user/checkname?{type}={data}",
		sinaLogin: "https://web.archive.org/web/20190615075516/https://api.weibo.com/oauth2/authorize?scope=follow_app_official_microblog&forcelogin=true&client_id=3374293008&display=default",
		qqLogin: "https://web.archive.org/web/20190615075516/https://graph.qq.com/oauth2.0/authorize?scope=upload_pic,add_topic,get_user_info&client_id=100240447&response_type=code",
		top2013: {
			billboard: {
				domain: "top2013.itlily.com",
				path: "/billboard/{board_type}"
			},
			vote: {
				domain: "top2013.itlily.com",
				path: "/vote/{board_type}/{singer_id}/{access_token}"
			},
			singer: Ttpod.core.getURI("/data/top2013.php")
		}
	};
	return Ttpod.core.setAction(n),
	{
		get: function(t) {
			return n[t] || ""
		}
	}
});
$.module("Ttpod.tmpl",
function() {
	this.fixSingerImg = function(s, a) {
		s.src = a
	},
	this.outImgUrl = function(s, a) {
		if (a = a || Ttpod.config.path.singer, s) {
			if (s.indexOf("http") < 0 && (s = "https://web.archive.org/web/20190615075516/http://ayyc.ttpod.com/" + s), "true" == a) return ' src="' + s + '"'
		} else s = a;
		return " src=" + a + " data-original=" + s + " "
	},
	this.hasName = function(s) {
		return s || "未知"
	},
	this.redHeart = function(s) {
		return Ttpod.heart.synRedHeartList(s) ? "redHeart": "heart"
	},
	this.outTempTag = function(s) {
		return Ttpod.tempbox.isAdd(s) ? "added": "add"
	},
	this.outTempCheckTag = function(s) {
		return Ttpod.tempbox.isChecked(s) ? "checkState": ""
	},
	this.outListEmpty = function(s, a) {
		var i = {
			isEmpty: !1,
			text: ""
		};
		return $.isEmptyObject(s) && (i.isEmpty = !0, i.text = "<div class=listEmpty>" + a + "</div>"),
		i
	},
	this.getLevel = function(s) {
		s = s || 0;
		for (var a = !0, i = 0, t = 0, n = 0, e = 0, l = 1e3; a;) {
			if (t = s - i, n = ((e + 1) * (e + 1) + e) * l, i += n, i > s) {
				a = !1;
				break
			}
			e++
		}
		return {
			level: e,
			extraCoin: t,
			currLvCoin: n,
			percent: (t / n * 100).toFixed(1) + "%"
		}
	},
	this.time2now = function(s) {
		if (!s) return "";
		var a = (new Date().getTime() - s) / 1e3,
		i = this.lastTime(a, "str");
		return i + "前"
	},
	this.lastTime = function(s, a) {
		var i = {
			h: Math.floor(s / 3600),
			m: Math.floor(s % 3600 / 60),
			s: Math.floor(s % 60)
		},
		t = "";
		return "str" == a && (t = i.h > 0 ? i.h + "小时" + i.m + "分钟": i.m > 0 ? i.m + "分钟" + i.s + "秒": i.s + "秒"),
		"str" == a ? t: i
	},
	this.isOpenSong = function(s) {
		return ! Ttpod.config.isOpenSong && "out_list" in s ? !1: !0
	},
	this.bfItem = '<%for(var i=0;i<data.length;i++){var song=data[i];var order=(params.page - 1) * 20 + i + 1;%>    <%if(!Ttpod.tmpl.isOpenSong(song)){continue;}%>    <li class="J_songItem" data-song="<%="song_id="+song.song_id+"&song_name="+song.song_name+"&singer_name="+song.singer_name%>">        <a  class="fix">            <span class="status"></span>            <span class="group">                <span class="song text-overflow" title="<%=song.song_name%>"><%=song.song_name%></span>                <span class="singer text-overflow" title="<%=song.singer_name%>"><%=song.singer_name%></span>                <span class="heartNum"><%=song.pick_count%></span>            </span>             <%if(Ttpod.config.isredHeart){%><span data-songId="<%=song.song_id%>" class="<%=Ttpod.tmpl.redHeart(song.song_id)%>"></span><%}%>           <span class="<%=Ttpod.tmpl.outTempTag(song.song_id)%>"></span><%if(Ttpod.config.isDownload){%><span class="download"></span><%}%>        </a>    </li><%}%>',
	this.bflb = '<ul class="commonList fix">' + this.bfItem + "</ul>",
	this.bflbCompatible = '<ul class="commonList fix">    <%for(var i=0;i<data.length;i++){        var song=data[i];        if(params.filter && Ttpod.main.filterSongId(song.neid)){ continue; }        var order=(params.page - 1) * 20 + i + 1;%>        <li class="J_songItem" data-song="<%="song_id="+song.neid+"&song_name="+song.songName+"&singer_name="+song.singerName%>">            <a  class="fix">                <span class="status"></span>                <span class="group">                    <span class="song text-overflow" title="<%=song.songName%>"><%=song.songName%></span>                    <span class="singer text-overflow" title="<%=song.singerName%>"><%=song.singerName%></span>                    <span class="heartNum"><%=song.count%></span>                </span>            <%if(Ttpod.config.isredHeart){%><span data-songId="<%=song.neid%>" class="<%=Ttpod.tmpl.redHeart(song.neid)%>"></span><%}%>       <span class="<%=Ttpod.tmpl.outTempTag(song.neid)%>"></span>    <%if(Ttpod.config.isDownload){%><span class="download"></span><%}%>            </a>        </li>    <%}%>    </ul>',
	this.sslb = '<div class="searchPage">    <%if(Ttpod.config.page == "union"){%> <%:=Ttpod.tmpl.ads%> <%}%>    <% var q = (params.q+"").replace(/\'/g,"");%>    <%if($.isEmptyObject(data)){%>        <div class="listEmpty">很抱歉，没有找到与“<%:v=q%>”相关的结果!</div>    <%}else{%>    <p class="result hidden">包含"<span class="word"><%:v=params.q%></span>"关键词的结果<%=count%>个</p>' + this.bflb + "<%}%></div>",
	this.gqlb = '<div class="songListThree fix">        <div class="info">        <% var detail = detail || {}; var pic_url = params.pic_url || detail.pic_url;%>            <div class="singerBG"><img <%:v=Ttpod.tmpl.outImgUrl(pic_url)%> class="singerImg"></div>            <p class="account"><%=detail.details%></p>        </div>' + this.bflb + "</div>",
	this.singersongs = '<div class="songListThree fix"><div class="info"><div class="singerBG"><img src=<%=Ttpod.config.path.singer%> class="singerImg"></div><p class="account"></p></div>' + this.bflb + "</div>",
	this.plaza = '<div class="plaza">    <%if(Ttpod.config.page == "union"){%> <%:=Ttpod.tmpl.ads%> <%}%>    <ul class="commonList fix">    <%for(var i=0;i<data.length;i++){var item=data[i];%>        <li class="J_songItem" data-song="<%="song_id="+item.song_id+"&song_name="+item.song_name+"&singer_name="+item.singer_name%>">            <a  class="fix">                <span class="status"></span>                <span class="group">                    <span class="song text-overflow"><%=item.song_name%></span>                    <span class="singer text-overflow"><%=item.singer_name%></span>                    <span class="heartNum"><%=item.pick_count%></span>                </span>              <%if(Ttpod.config.isredHeart){%><span data-songId="<%=item.song_id%>"  class="<%=Ttpod.tmpl.redHeart(item.song_id)%>"></span><%}%>     <span class="<%=Ttpod.tmpl.outTempTag(item.song_id)%>"></span>                <%if(Ttpod.config.isDownload){%><span class="download"></span><%}%>            </a>        </li>    <%}%>    </ul></div>',
	this.ads = '<div id="ttxyBanner" class="ttxyBanner"><a class="banner" href="voice.html"></a></div>',
	this.gsfl = '<%if(Ttpod.config.page == "union"){%> <%:=Ttpod.tmpl.ads%> <%}%>    <ul class="picList fix">        <%for(var i=0;i<data.length;i++){var singer=data[i];%>            <li>                <a href="#a=singerlist&channelid=<%=singer.id%>&title=<%=encodeURIComponent(singer.title)%>" class="fix">                        <img width="180" height="150" src="<%=singer.pic_url%>" alt="<%=singer.title%>"/>                        <span class="text-overflow"><%=singer.title%></span>                </a>            </li>        <%}%></ul>',
	this.gsflgq = '<div class="songListThree fix">        <div class="info">            <div class="singerBG"><img <%:v=Ttpod.tmpl.outImgUrl(extra.pic_url_200_200)%> class="singerImg"></div>            <p class="account"><%=extra.details%></p>        </div>' + this.bflbCompatible + "</div>",
	this.gslb = '<ul class="singerTwo fix">            <%for(var i=0;i<data.length;i++){ var singer=data[i];%>            <li>                <a href="#a=singersongs&singername=<%=singer.singer_name%>" class="fix">                    <img width="50" height="50" class="lazy" <%:v=Ttpod.tmpl.outImgUrl(singer.pic_url)%> onerror="<%=Ttpod.tmpl.fixSingerImg(this,Ttpod.config.path.singer)%>"/>                    <span class="text-overflow"><%=singer.singer_name%></span>                </a>            </li>            <%}%></ul>',
	this.gdlb = '<%if(Ttpod.config.page == "union"){%> <%:=Ttpod.tmpl.ads%> <%}%>        <ul class="picList fix">        <%for(var i=0;i<data.length;i++){ var tag=data[i];%>            <li>                <a href="#a=tagsongs&tagid=<%=tag.id%>&title=<%=tag.title.replace("&","＆")%>" class="fix">                    <img width="180" height="90" src="<%=tag.pic_url_180_90%>" alt=""/>                    <span class="text-overflow"><%=tag.title%></span>                </a>            </li>        <%}%>        </ul>',
	this.phlb = '<%if(Ttpod.config.page == "union"){%> <%:=Ttpod.tmpl.ads%> <%}%>    <ul class="picList fix">        <%for(var i=0;i<data.length;i++){var rank=data[i];%>            <li>                <a href="#a=ranksongs&channelid=<%=rank.id%>&title=<%=(rank.title)%>&pic_url=<%=rank.pic_url%>" class="fix">                    <img width="180" height="150" src="<%=rank.pic_url%>" alt="<%=rank.title%>"/>                    <span class="text-overflow"><%=rank.title%></span>                </a>            </li>        <%}%>    </ul>',
	this.ztlb = '<%var type = type || "";if("recommend"!=type){%>            <div class="wrapBanner">            <div class="banner">                <ul class="fix">                </ul>                <span class="right"></span>                <span class="prev"></span>                <span class="next"></span>            </div>        </div>        <ul class="picList fix">        <%}%>        <%for(var i=0;i<data.length;i++){var album=data[i];%>            <li>                <a href="#a=albumsongs&channelid=<%=album.id%>&title=<%=(album.title)%>&t_type=list&pic_url=<%=album.pic_url%>" class="fix">                    <img width="180" height="84" src="<%=album.pic_url%>" alt="<%=album.title%>"/>                    <span class="text-overflow"><%=album.title%></span>                </a>            </li>        <%}%>        <%if("recommend"!=type){%></ul><%}%>',
	this.hxlb = '<%if(data.length==0){%><div class="hxEmpty"></div><%}else if(data.code==0){%><div class="empty"><p class="text">你收藏的歌曲将在这里显示</p><p><a href="javascript:;" class="dr J-login">马上登陆</a>或<a href="javascript:;" class="zc J-register">注册</a></p></div><%}else{%>    <%for(var i=0,j=data.length;i<j;i++){    Ttpod.heart.setRedHeartIds(data[i].song_id);    var index = (i<9)?"0"+(i+1):i+1;%>    <li class="J_songItem <%=i%2==0 ? "":"odd"%>" data-song="<%="song_id="+data[i].song_id+"&song_name="+data[i].song_name+"&singer_name="+data[i].singer_name%>">        <a href="javascript:;" class="fix">            <span class="num"><%=index%></span>            <span class="song text-overflow" title="<%=Ttpod.tmpl.hasName(data[i].song_name)%>"><%=Ttpod.tmpl.hasName(data[i].song_name)%></span>            <span class="singer text-overflow" title="<%=Ttpod.tmpl.hasName(data[i].singer_name)%>"><%=Ttpod.tmpl.hasName(data[i].singer_name)%></span>            <span data-songId="<%=data[i].song_id%>" class="redHeart"></span>        </a>    </li>    <%}%><%}%>',
	this.templb = '<%if(data.length==0){%><li class="lsEmpty"></li><%}else{%><%for(var i=0,j=data.length;i<j;i++){    var index = (i<9)?"0"+(i+1):i+1;var item = data[i];%>    <li class="J_songItem <%=i%2==0 ? "":"odd"%> <%=Ttpod.tmpl.outTempCheckTag(item.song_id)%>" data-song="<%="song_id="+item.song_id+"&song_name="+item.song_name+"&singer_name="+item.singer_name%>">        <a href="javascript:;" class="fix">            <span class="checkbox"></span>            <span class="group fix">                <span class="num"><%=index%></span>                <span class="song text-overflow" title="<%=Ttpod.tmpl.hasName(item.song_name)%>"><%=Ttpod.tmpl.hasName(item.song_name)%></span>            </span>            <span class="singer text-overflow" title="<%=Ttpod.tmpl.hasName(item.singer_name)%>"><%=Ttpod.tmpl.hasName(item.singer_name)%></span>            <span class="delete"></span>          <%if(Ttpod.config.isredHeart){%><span data-songId="<%=item.song_id%>" class="<%=Ttpod.tmpl.redHeart(item.song_id)%>"></span><%}%>     </a>    </li>    <%}%>    <%}%>',
	this.userInfo = '<%try{if(!data){%><div class="login">    <a href="javascript:;" class="J-login">登录</a>     </div>     <%}else{var name = data.nick_name || data.old_name;%>     <div class="loginActive" >    <img class="userHead" src="<%=data.pic%>">       <div class="info">           <span class="userName text-overflow"><%=name%></span>           <span class="num"></span>       </div>       <ul id="userMenu" class="menu">            <li class="exit J-logout">退出</li>       </ul>     </div><%}}catch(e){}%>',
	this.userInfoSimple = '<%if(data){%><%=data.nick_name%> , <a href="javascript:;" class="J-logout">退出</a><%}else{%><a href="javascript:;" class="login J-login">登录</a> <a href="javascript:;" class="register J-register">注册</a><%}%>',
	this.radio = '    <%for(var i=0;i<data.length;i++){var list = data[i].data;%>    <div class="radio">    <h2><%=data[i].title%></h2>    <ul class="fix dmonstroy">        <%for(var j=0;j<list.length;j++){%>        <li class="J_radioItem" data-title="<%=list[j].title%>" data-tagid="<%=list[j].id%>"><a href="javascript:;"><img src="<%=list[j].bgimgurl%>"/><span class="channel"><%=list[j].title%> MHz</span><span class="status"></span></a></li>        <%}%>    </ul>    </div><%}%>',
	this.backMsg = '<div class="feedbackLayer">        <h3 class="header">用户反馈<span class="close"></span></h3>        <div class="content">            <div class="contentView">                <span class="title">反馈内容</span>                <textarea class="view" type="text" placeholder="请将建议与意见告诉我们，天天有你更精彩！"></textarea>            </div>            <div class="email">                <span class="title">联系方式</span>                <input class="contact" type="text" value="" placeholder="请填写QQ/Email/手机号">            </div>            <p class="errormsg"></p>        </div>        <div class="footer">                <input type="button" class="submit" value="提交">        </div>    </div>',
	this.download = '<div class="songDownload">    <h3 class="header">歌曲下载<span class="close"></span></h3>    <p class="singer text-overflow"><%=singer_name%> - <%=song_name%></p>    <div class="ver">        <%if(url_list.length>=2){%>            <div>                <span class="pz">品质：</span>                <label><input type="radio" data-size="<%=url_list[0].size%>" data-bitrate="<%=url_list[0].bitrate%>" name="song" />                <span class="bzpz"><%=url_list[0].type_description%></span><%=url_list[0].size%> (<%=url_list[0].format.toUpperCase()%> <%=url_list[0].bitrate%>kbps)</label>            </div>            <div class="aac">                <label><input type="radio" data-size="<%=url_list[1].size%>" data-bitrate="<%=url_list[1].bitrate%>"  name="song" checked="checked" /><span class="gpz"><%=url_list[1].type_description%></span><%=url_list[1].size%> (<%=url_list[1].format.toUpperCase()%> <%=url_list[1].bitrate%>kbps)</label>            </div>        <%}else{%>            <div>                <span class="pz">品质：</span>                <label><input type="radio" data-size="<%=url_list[0].size%>" data-bitrate="<%=url_list[0].bitrate%>" name="song" checked="checked"/>                <span class="bzpz"><%=url_list[0].type_description%></span><%=url_list[0].size%> (<%=url_list[0].format.toUpperCase()%> <%=url_list[0].bitrate%>kbps)</label>            </div>             <%}%>        <p class="clientDown"><i>超高品质（mp3 320kbps)</i> 可通过 <a class="J_downMobile" data-ds="button" href="https://web.archive.org/web/20190615075516/http://www.ttpod.com/download" target="_blank" title="天天动听手机客户端"> 天天动听手机客户端</a> 获取</p>        <div class="button">            <a href="javascript:;" download="" class="submit" id="download">下载</a>        </div>    </div></div>',
	this.about = '<div class="aboutLayer">    <div class="wrap">    <h3 class="header">关于<span class="close"></span></h3>    <div class="content">        <div class="logo"><img src="https://web.archive.org/web/20190615075516/http://app.ttdtweb.com/dongting/styles/images/logo2-414d74.png" /></div>    </div></div><div class="footer">    <span class="version">版本：' + Ttpod.config.siteVersion + " Beta </span></div></div>",
	this.lyricSearch = '    <div class="lyricSearch">        <h3 class="header">搜索歌词<span class="close"></span></h3>        <div>            <div class="songname">                <p>歌曲名</p>                <input type="text" value="" placeholder="输入歌曲名">            </div>            <div class="singername">                <p>歌手名</p>                <input type="text" value="" placeholder="输入歌手名">            </div>            <div class="button">                <input type="button" class="submit" value="提交">            </div>        </div>    </div>',
	this.picLyricError = '    <div id="<%=data.id%>" class="picLyricError">        <h3 class="header"><%=data.text%><span class="close"></span></h3>        <div class="content">            <%for (var i=0; i < data.choice.length; i++) {%>                <p>                    <span></span>                    <span><%=data.choice[i]%></span>                </p>            <%}%>        </div>        <div class="footer">            <input type="button" class="submit" value="提交" data-type="<%=data.type%>">        </div>    </div>',
	this.hotSingerList = '<ul><%for(var i=0,m=data.length;i<m;i++){%><li><a href="#a=searchlist&q=<%=data[i].singer_name%>"><img src="<%=data[i].pic_url%>" alt="<%=data[i].singer_name%>" /><span class="name"><%=data[i].singer_name%></span></a></li><%}%></ul>',
	this.banner = '<%for(var i=0,m=data.length;i<m;i++){var obj = data[i];%>    <%if(obj.type==0){%>        <li> <a href="#a=albumsongs&channelid=<%=obj.id%>&title=<%=obj.title%>&type_flag=albumlist&t_type=poster&pic_url=<%=obj.pic_url%>"><img src="<%=obj.pic_url%>" /></a></li>    <%}%><%}%>',
	this.hotSongList = '<div class="song-list"><%var cnt = 0;for(var i=0; i<data.length; i++){var song=data[i];var order=(params.page - 1) * 20 + i + 1;%>    <% if((i+1)%8==1){cnt++;%>        <ul class="song-items" style="<%=i==0 ? "display:block":""%>">    <%}%>    <li class="J_songItem" data-song="<%="song_id="+song.song_id+"&song_name="+song.song_name+"&singer_name="+song.singer_name%>">        <a  class="fix">            <span class="status"></span>            <span class="group">                <span class="song text-overflow"><%=song.song_name%></span>                <span class="singer text-overflow"><%=song.singer_name%></span>                <span class="heartNum"><%=song.pick_count%></span>            </span>    <%if(Ttpod.config.isredHeart){%><span data-songId="<%=song.song_id%>" class="<%=Ttpod.tmpl.redHeart(song.song_id)%>"></span><%}%>     <span class="<%=Ttpod.tmpl.outTempTag(song.song_id)%>"></span>            <%if(Ttpod.config.isDownload){%><span class="download"></span><%}%>            <%if(song.hasOwnProperty("ll_list")){%><span data-size="<%=song.ll_list[0].size%>" data-type="<%=song.ll_list[0].format%>"class="lossLess">无损</span><%}%>        </a>        <ul class="down-list">               <%if(song.hasOwnProperty("url_list")){var urlList = song.url_list; for(var j = 0, len = urlList.length; j < len; ++j){%>                  <li><a class="J_DownloadMusic" data-song="<%="song_id="+song.song_id+"&song_name="+song.song_name+"&singer_name="+song.singer_name+"&size="+urlList[j].size%>" data-url="<%=urlList[j].url%>"><%=urlList[j].type_description%>(<%=urlList[j].size%>/<%=urlList[j].format%>)</a></li>                <%}%>               <%}%>               <%if(song.hasOwnProperty("ll_list")){%><li class="lossLess-song"><a href="javascript:;"><%=song.ll_list[0].type_description%>(<%=song.ll_list[0].size%>/<%=song.ll_list[0].format%>)</a></li><%}%>        </ul>    </li>    <%if((i+1)%8==0 || (i+1)==data.length){%></ul><%}%>    <%}%></div><div class="fix">    <span class="song-allPlay J_allPlay"></span>    <span class="song-allDown J_allDown"></span>    <p class="song-paging">    <%for(var i=0;i<cnt;i++){%>        <em data-index="<%=i%>" class="<%=i==0? "on":""%>"></em>    <%}%>    </p></div>',
	this.voiceSongList = '<%for(var i=0,m = data.length;i< m ;i++){var obj = data[i];%>        <%if(i % 2 == 0){%>            <li class="song-item even J_songItem" data-song="song_id=<%=data[i].song_id%>&song_name=<%=data[i].song_name%>&singer_name=<%=data[i].singer_name%>">            <span class="song-index"><%=i + 1%></span>            <span class="song-name"><%=data[i].song_name%></span>            <span class="singer-name"><%=data[i].singer_name%></span>            <a href="javascript:;" hidefocus="true" class="play-btn J-play" data-songid="<%=data[i].song_id%>"></a>            <a href="javascript:;" hidefocus="true" class="down-btn download"></a>            <a href="javascript:;" hidefocus="true" class="add-btn J-add add" data-songid="<%=data[i].song_id%>"></a>            </li>        <%}else{%>            <li class="song-item  J_songItem" data-song="song_id=<%=data[i].song_id%>&song_name=<%=data[i].song_name%>&singer_name=<%=data[i].singer_name%>">            <span class="song-index"><%=i + 1%></span>            <span class="song-name"><%=data[i].song_name%></span>            <span class="singer-name"><%=data[i].singer_name%></span>            <a href="javascript:;" hidefocus="true" class="play-btn J-play" data-songid="<%=data[i].song_id%>"></a>            <a  href="javascript:;" hidefocus="true" class="down-btn download"></a>            <a  href="javascript:;" hidefocus="true" class="add-btn J-add add" data-songid="<%=data[i].song_id%>"></a>            </li>        <%}%><%}%>',
	this.downVoiceTips = '       <div class="tips-title-wrap">            <div class="tips-title-box">               <span class="tips-title">下载提示</span>               <a class="close">X</a>           </div>           <div class="tips-msg">               <p>《中国好声音》独家歌曲，只在天天动听手机客户端</p>               <a href="https://web.archive.org/web/20190615075516/http://www.ttpod.com/download" target="_blank" data-ds="tip" class="down-btn J_downMobile">一键安装</a>            </div>       </div>    '
});
$.module("Ttpod.AudioPlayer",
function() {
	function e() {
		i = 0,
		r = 0,
		c = 0,
		s = 0,
		u = 0
	}
	function t(e) {
		return parseFloat(e.toFixed(3))
	}
	function a() {
		clearInterval(f),
		y = -1,
		p = 0,
		d = 0
	}
	function l(e) {
		a(),
		f = setInterval(function() {
			var t = "";
			p == y ? (d += P, d > m && h > d && (t = "min", b || c++), d > h && (t = "max")) : (d = 0, b = !1, y = p),
			"function" == typeof e && e(t, f)
		},
		P)
	}
	function o(e) {
		var t = null;
		return $("#" + e.id).jPlayer({
			swfPath: Ttpod.core.getURI("/base/scripts/ui/jPlayer/Jplayer.swf", "lib"),
			solution: e.solution,
			supplied: e.supplied,
			cssSelectorAncestor: e.cssSelectorAncestor,
			ready: function() {
				t = $(this).data("jPlayer").htmlElement[e.type],
				"function" == typeof e.callbackPool.readyCallback && e.callbackPool.readyCallback()
			},
			loadStart: function() {},
			progress: function(l) {
				var o = 0;
				if (0 == l.jPlayer.options.solution.indexOf("flash")) o = l.jPlayer.status.seekPercent;
				else if (t.buffered.length > 0) {
					for (var n = 0, i = 0; i < t.buffered.length; i++) n += t.buffered.end(i) - t.buffered.start(i);
					o = n / l.jPlayer.status.duration * 100
				}
				o >= 0 && (o >= 99 && (r = new Date() - s, u = 1, a()), p = o, o += "%", "function" == typeof e.callbackPool.progressCallback && e.callbackPool.progressCallback(o))
			},
			suspend: function() {},
			play: function() {
				"function" == typeof e.callbackPool.playCallback && e.callbackPool.playCallback()
			},
			pause: function() {},
			loadedmetadata: function() {},
			loadeddata: function() {
				i = new Date() - s
			},
			waiting: function() {},
			playing: function() {},
			timeupdate: function(t) {
				"function" == typeof e.callbackPool.timeupdateCallback && e.callbackPool.timeupdateCallback(t.jPlayer.status.currentTime)
			},
			ended: function() {
				"function" == typeof e.callbackPool.endedCallback && e.callbackPool.endedCallback()
			},
			error: function() {
				"function" == typeof e.callbackPool.failedCallback && e.callbackPool.failedCallback()
			}
		})
	}
	var n = {},
	i = 0,
	r = 0,
	c = 0,
	s = 0,
	u = 0,
	f = 0,
	y = -1,
	p = 0,
	d = 0,
	P = 500,
	m = 2e3,
	h = 2e4,
	b = !1,
	j = function(e) {
		var t = {
			id: "",
			type: "audio",
			callbackPool: {},
			supplied: "mp3,m4a",
			solution: "flash,html"
		};
		"chrome" == $.UA.shell.type && $.UA.shell.version > 20 && (t.solution = "html,flash"),
		this.options = $.extend(t, e),
		this.options.id && (this.$jPlayer = o(this.options), this.volume = 100, this.muted = !1)
	};
	j.prototype = {
		play: function() {
			this.$jPlayer.jPlayer("play")
		},
		pause: function() {
			this.$jPlayer.jPlayer("pause")
		},
		stop: function() {
			this.$jPlayer.jPlayer("stop")
		},
		playTo: function(e) {
			this.$jPlayer.jPlayer("play", e)
		},
		setVolume: function(e) {
			this.$jPlayer.jPlayer("volume", e)
		},
		toggleMute: function(e) {
			this.muted = e,
			this.$jPlayer.jPlayer("mute", e)
		},
		getPosition: function() {
			return this.$jPlayer.data("jPlayer").status.currentTime
		},
		getVolume: function() {
			return this.$jPlayer.data("jPlayer").options.volume
		},
		changeSong: function(t) {
			"chrome" == $.UA.shell.type && parseInt($.UA.shell.version) < 20 && (t = $.query.set("version", new Date().getTime(), t)),
			n = this.getLogParams(),
			l(this.options.callbackPool.stuckCallback),
			e(),
			this.$jPlayer.jPlayer("clearMedia");
			var a = {};
			a = /.mp3/.test(t) ? {
				mp3: t
			}: /.m4a/.test(t) ? {
				m4a: t
			}: {
				m4v: t
			},
			this.$jPlayer.jPlayer("setMedia", a),
			this.toggleMute(this.muted),
			this.play(),
			s = new Date()
		},
		getLogParams: function() {
			var e = {
				playtime: t(this.getPosition()),
				loadingtime: t(i),
				buffertime: t(r) || t(new Date() - s),
				buffercount: c,
				loadsuccess: u
			};
			return e.buffertime = e.buffertime > 10800 ? 10800: e.buffertime,
			e.buffertime = e.buffertime < 0 ? -1: e.buffertime,
			e
		},
		getPreLog: function() {
			return n
		},
		resetDetectVar: a,
		destroy: function() {
			this.$jPlayer.jPlayer("clearMedia")
		}
	},
	this.ModuleInit = {
		createPlayer: function(e) {
			return new j(e)
		}
	}
});
$.module(function() {
	function t() {
		s = [],
		g = -1,
		d = null,
		h = "",
		v = []
	}
	function n() {}
	function e(t, n) {
		if (!t || !t.song_id) return void("function" == typeof n && n(null));
		if (t && !t.song_id) return $.extend(t, song),
		t.duration = o(t.duration),
		data.lrc_id && (t.lrcid = data.lrc_id),
		data.album && (t.album = data.album),
		d = p,
		p = t,
		c[t.song_id] = t,
		void("function" == typeof n && n(t));
		if (c[t.song_id]) return d = p,
		p = c[t.song_id],
		void("function" == typeof n && n(p));
		var e = {
			song_id: t.song_id,
			code: $.CRC32(t.song_id),
			from: "search"
		};
		Ttpod.core.getResult({
			action: "getSongResource",
			data: e,
			success: function(e) {
				var r = e.data[0],
				i = r.url_list,
				a = u(i);
				a && ($.extend(t, a), t.duration = o(t.duration), r.lrc_id && (t.lrcid = r.lrc_id), r.album && (t.album = r.album), d = p, p = t, c[t.song_id] = t, "function" == typeof n && n(t))
			},
			error: function() {
				"function" == typeof y.getSongError && y.getSongError()
			}
		})
	}
	function r(t, n) {
		var e = n.length,
		r = [];
		if (1 == e) return t;
		for (var o = 0; e > o; o++) o != t && r.push(o);
		return r[Math.floor(Math.random() * r.length)]
	}
	function o(t) {
		for (var n = t.split(":"), e = 0, r = n.length, o = 0; r > e; e++) {
			var i = parseInt(n[e], 10),
			a = r - e - 1;
			i = 0 == a ? i: i * Math.pow(60, a),
			o += i
		}
		return o
	}
	function i(t, n, e) {
		for (var r = -1, o = 0; o < t.length; o++) {
			var i = t[o];
			if (i[n] == e) {
				r = o;
				break
			}
		}
		return r
	}
	function a() {
		var t = -1;
		$.isEmptyObject(p) || (t = i(s, "song_id", p.song_id)),
		g = t >= 0 ? t: g > s.length - 1 ? s.length - 1: g - 1
	}
	function u(t) {
		var n = null;
		if ($.os.ios) for (var e = t.length - 1; e >= 0; e--) {
			var r = t[e];
			if (r.url && r.url.indexOf(".mp3") >= 0) {
				n = r;
				break
			}
		} else {
			for (var o = !1, e = t.length - 1; e >= 0; e--) {
				var r = t[e];
				if (r.bitrate == b) {
					o = !0,
					n = r;
					break
				}
			}
			o || (n = t[1] ? t[1] : t[0])
		}
		return n
	}
	var c = {},
	f = {},
	s = [],
	l = 0,
	g = -1,
	d = null,
	p = null,
	h = "",
	v = [],
	b = 128,
	y = {};
	n.prototype = {
		getList: function(t) {
			var n = "string" == typeof t ? f[t] : s;
			return n ? n: []
		},
		setList: function(n, e, r, o) {
			"[object Array]" == Object.prototype.toString.call(e) && "string" == typeof n && (r = "boolean" == typeof r ? r: !1, o = "boolean" == typeof o ? o: !1, (n != h || r) && (t(), h = n), e = $.distinctArray(e, "song_id"), s = e, f[n] = e)
		},
		appendList: function(t, n, e) {
			if ("[object Array]" == Object.prototype.toString.call(n) && "string" == typeof t) {
				var r = f[t] || [];
				"top" == e ? (r = n.concat(r), t == h && (g += n.length)) : r = r.concat(n),
				r = $.distinctArray(r, "song_id"),
				f[t] = r,
				t == h && (s = r),
				"function" == typeof y.changeList && y.changeList()
			}
		},
		removeList: function(t, n) {
			if ("string" == typeof t) {
				if ("[object Array]" == Object.prototype.toString.call(n)) n = n;
				else {
					if (!$.isNumeric(n)) return;
					n = [n]
				}
				for (var e = f[t] || [], r = 0; r < n.length; r++) {
					var o = i(e, "song_id", n[r]);
					o >= 0 && e.splice(o, 1)
				}
				f[t] && (f[t] = e),
				t == h && (s = e),
				a(),
				"function" == typeof y.changeList && y.changeList()
			}
		},
		clearList: function(n) {
			f[n] && (f[n] = []),
			n == h && t(),
			"function" == typeof y.changeList && y.changeList()
		},
		setMode: function(t) {
			1 != t && (v = []),
			l = t
		},
		getMode: function() {
			return l
		},
		pre: function(t, n) {
			if ("radio" != h) {
				switch (n = "boolean" == typeof n ? n: !1, l) {
				case 0:
					var o = 0 > g ? s.length - 1: s.length + g - 1;
					g = o % s.length;
					break;
				case 1:
					n && (g = 0 >= g ? 0: g - 1);
					break;
				case 2:
					g = 0 >= g ? 0: g - 1;
					break;
				case 3:
				default:
					if (v.length > 1) {
						var i = v.pop();
						g = i == g ? v.pop() : i
					} else g = r(g, s),
					v = []
				}
				e(s[g], t)
			}
		},
		next: function(t, n) {
			if ("radio" != h) switch (l) {
			case 0:
				g = (g + 1) % s.length;
				break;
			case 1:
				n && (g = g == s.length - 1 ? g: g + 1);
				break;
			case 2:
				g = g == s.length - 1 ? g: g + 1;
				break;
			case 3:
			default:
				g = r(g, s),
				v.push(g)
			} else g = g == s.length - 1 ? g: g + 1;
			return "radio" == h || 1 != l || s[g] ? void e(s[g], t) : void e(p, t)
		},
		getDefaultSong: function(t) {
			e(s[0], t)
		},
		getPreSong: function() {
			return d
		},
		getCurrSong: function() {
			return p
		},
		isFirst: function() {
			return 0 == g
		},
		isLast: function() {
			return g == s.length - 1
		},
		getListType: function() {
			return h
		},
		insertAfterCur: function(t, n, e) {
			for (var r = this.getList(t), o = 0; o < r.length; o++) if (n == r[o].song_id) {
				r.splice(o, 0, e);
				break
			}
		},
		setBitrate: function(t) {
			$.isNumeric(t) && (b = t)
		},
		getBitrate: function() {
			return b
		},
		existsSong: function(t, n) {
			if (!f[t] || !$.isNumeric(n)) return ! 1;
			for (var e = f[t], r = 0; r < e.length; r++) if (n == e[r].song_id) return ! 0;
			return ! 1
		},
		getSong: function(n, r, o) {
			if (f[n]) {
				var i = f[n],
				a = null;
				if (n != h && (t(), h = n, s = i), $.isNumeric(r)) {
					for (var u = 0; u < i.length; u++) if (r == i[u].song_id) {
						a = i[u],
						g = u;
						break
					}
					a || (a = i[0], g = 0)
				} else a = i[0],
				g = 0;
				e(a, o)
			}
		},
		registerCallback: function(t, n) {
			"string" == typeof t && "function" == typeof n && (y[t] = n)
		}
	},
	Ttpod.AudioPlayer.ModuleInit.createListControl = function() {
		return new n()
	}
});
$.module(function() {
	function t(t) {
		function n() {
			e(),
			p.show(),
			$(window).resize(function() {
				e()
			})
		}
		function e() {
			var n = $(window).innerHeight(),
			e = n - R,
			r = n - S,
			i = 0;
			O >= r ? (m.hide(), i = n - F) : O >= e ? (m.addClass("smallWrap").show(), i = r) : (m.removeClass("smallWrap").show(), i = e),
			i = 0 > i ? 0: i,
			t.css("height", i + "px"),
			j = Math.round(i / 2) - 14,
			g.css("marginTop", j + 14 + "px"),
			p.css({
				height: i + "px",
				lineHeight: i + "px"
			}),
			Y > i ? y.hide() : y.css("top", 35 + (i - Y) / 2 + "px").show()
		}
		t = t,
		h = t.find("#lyricArea"),
		g = t.children("hr"),
		p = t.children("p"),
		m = t.parent().find(".wrap"),
		y = t.children("span"),
		this.kokMode = !0,
		this._reset = function() {
			v = null,
			w = null,
			C = null,
			_ = null,
			k = null,
			M = [],
			b = -1,
			L = -1,
			N = 0
		},
		this.resetCurrLrcIndex = function(t) {
			b = -1,
			H = t
		},
		this.registerDragLrc = function(t) {
			var n = 0,
			e = !1,
			r = 0,
			i = 0,
			o = !1;
			h.mousedown(function(t) {
				0 != M.length && (n = t.clientY, e = !0, r = b, i = parseInt(v.css("top").slice(0, -2)), I = !0)
			}).mousemove(function(t) {
				e && (o = !0, g.is(":visible") || g.show(), v.removeClass("transitionTop").css("top", i + t.clientY - n + "px"))
			}).bind("mouseup mouseleave",
			function(i) {
				if (e) {
					e = !1,
					I = !1;
					var s = n - i.clientY,
					a = r + Math.round(s / D),
					l = Math.abs(s) % D / D;
					a = 0 > a ? 0: a,
					a = a > M.length - 1 ? M.length - 1: a;
					var u = M[a],
					c = u.time + l * u.duration;
					v.addClass("transitionTop"),
					g.hide(),
					"function" == typeof t && o && (t(c), Ttpod.AudioPlayer.PlayerControl.play()),
					o = !1
				}
			})
		},
		n()
	}
	function n(t) {
		p.hide(),
		h.html(t),
		v = h.find("ul"),
		w = h.find(".normal"),
		C = h.find(".kok"),
		_ = w.find("li"),
		k = C.find("li"),
		v.css("top", j + "px")
	}
	function e(t, n, e) {
		var r = {};
		if (P = !1, t.new_song_name) P = !0,
		r = {
			artist: t.new_singer_name,
			title: t.new_song_name,
			song_id: t.song_id
		};
		else if (t.lrcid) r = {
			lrcid: t.lrcid,
			artist: t.singer_name,
			title: t.song_name,
			song_id: t.song_id
		};
		else {
			if (!t.song_name) return void p.text("好音质，" + Ttpod.config.name);
			r = {
				artist: t.singer_name,
				title: t.song_name,
				song_id: t.song_id
			}
		}
		var i = r.hasOwnProperty("lrcid") ? r.lrcid: "",
		o = r.title ? r.title: "",
		s = r.artist ? r.artist: "";
		r.code = $.CRC32(encodeURIComponent(i + o + s)),
		Ttpod.core.getResult({
			action: "getSongLyric",
			data: r,
			success: function(t) {
				"function" == typeof n && t.hasOwnProperty("data") && n(t.data.lrc)
			},
			error: function() {
				p.text(Ttpod.config.name + "，随心所动"),
				"function" == typeof e && e()
			}
		})
	}
	function r(t) {
		t = t.replace(/天天动听/g, Ttpod.config.name);
		t = t.replace("TTPOD", "DUDU");
		for (var n = $.trim(t).split(/\n+/), e = [], r = 0, i = n.length; i > r; r++) {
			var s = decodeURIComponent(n[r]),
			a = s.match(T);
			if (a && a.length > 0) for (var c = $.trim(s.replace(T, "")), d = 0; d < a.length; d++) {
				var f = a[d];
				f = f.slice(1, f.length - 1).split(":");
				var h = 0;
				2 == f.length ? h = 60 * parseInt(f[0], 10) + parseFloat(f[1]) : 3 == f.length && (h = 3600 * parseInt(f[0], 10) + 60 * parseInt(f[1], 10) + parseFloat(f[2])),
				e.push({
					time: h,
					lrc: c
				})
			}
		}
		return u(o(l(e, "time")))
	}
	function i(t) {
		var n = "",
		e = "",
		r = "";
		if ("[object Array]" === Object.prototype.toString.call(t)) for (var i = 0; i < t.length; i++) {
			var o = t[i];
			n += "<li><span>" + o.lrc + "</span></li>"
		}
		return e = '<ul class="normal transitionTop">' + n + "</ul>",
		r = '<ul class="kok transitionTop">' + n + "</ul>",
		e + r
	}
	function o(t) {
		if ("[object Array]" == Object.prototype.toString.call(t)) {
			for (var n = 0, e = t.length; e > n; n++) t[n].duration = n != e - 1 ? t[n + 1].time - t[n].time: 0;
			return t
		}
	}
	function s(t) {
		if (0 == M.length || 0 == t) return - 1;
		if ("number" == typeof H && !d(H, t)) return - 1;
		H = null;
		for (var n = b >= 0 ? b: 0, e = M.length; e > n; n++) {
			var r = M[n];
			if (t < r.time) {
				b = n - 1;
				break
			}
		}
		return 0 > b ? -1: "" == M[b].lrc ? L: b
	}
	function a(t) {
		for (var n = 0, e = _, r = 0; t > r; r++) n += parseInt($(e[r]).css("height").slice(0, -1));
		return j - n
	}
	function l(t, n) {
		return t.sort(function(t, e) {
			return t[n] - e[n]
		})
	}
	function u(t) {
		for (var n = [], e = 0; e < t.length; e++) {
			var r = t[e],
			i = r.lrc,
			o = i.replace(z.doubleBytes, "aa").length;
			if (W > o) n.push(r);
			else {
				for (var s = i.split(" "), a = s.length, l = 0, u = "", d = [], f = 0; a > f; f++) {
					var h = s[f],
					g = h.replace(z.doubleBytes, "aa").length,
					p = l + g + 1;
					if (W > p) u += (0 == f ? "": " ") + h,
					l = p;
					else {
						var m = d.length;
						if (l > 0 && d.push({
							time: 0 == m ? r.time: d[m - 1].time + d[m - 1].duration,
							lrc: u,
							duration: l / o * r.duration
						}), u = h, l = g, g >= W) {
							for (var v = c(h), w = 0, C = v.length; C > w; w++) {
								var _ = v[w],
								k = _.length,
								m = d.length;
								d.push({
									time: 0 == m ? r.time: d[m - 1].time + d[m - 1].duration,
									lrc: _,
									duration: k / o * r.duration
								})
							}
							u = "",
							l = 0
						}
					}
					if (f == a - 1 && W > g) {
						var x = d[d.length - 1];
						d.push({
							time: x.time + x.duration,
							lrc: u,
							duration: l / o * r.duration
						})
					}
				}
				n = n.concat(d)
			}
		}
		return n
	}
	function c(t) {
		if ("string" == typeof t && 0 != t.length) {
			for (var n = t.length, e = "", r = [], i = 0; n > i; i++) {
				var o = t.charAt(i),
				s = e + o;
				s && s.replace(z.doubleBytes, "aa").length <= W ? e = s: (r.push(e), e = o),
				i == n - 1 && e && e.length > 0 && r.push(e)
			}
			return r
		}
	}
	function d(t, n) {
		return t = Math.floor(t),
		n = Math.floor(n),
		t + 3 >= n && n >= t - 3
	}
	function f(t, n, e, r) {
		Ttpod.core.log({
			a: "lrc",
			cid: n && e ? 1: 0,
			loadtime: new Date() - r,
			songid: t.song_id,
			songname: t.song_name,
			singername: t.singer_name
		})
	}
	var h = null,
	g = null,
	p = null,
	m = null,
	v = null,
	w = null,
	C = null,
	_ = null,
	k = null,
	x = null,
	y = null,
	T = /\[\d*:\d*((\.|\:)\d*)*\]/g,
	M = [],
	b = -1,
	L = -1,
	A = !1,
	I = !1,
	P = !1,
	R = 475,
	S = 390,
	F = 290,
	O = 90,
	j = 150,
	B = 330,
	D = 28,
	Y = 175,
	H = null,
	N = 0;
	t.prototype = {
		renderLrc: function(t) {
			if (this._reset(), p.text("搜索歌词中...").show(), h.html(""), q.get(t.song_id)) return M = q.get(t.song_id),
			void n(i(M));
			var o = new Date();
			e(t,
			function(e) {
				var s = Ttpod.AudioPlayer.ListControl.getCurrSong();
				if (f(t, !!e, !0, o), t.lrcid == s.lrcid && t.song_name == s.song_name || P) {
					if (!e) return void p.text("好音质，" + Ttpod.config.name);
					M = r(e),
					n(i(M))
				}
			},
			function() {
				f(t, !1, !1, o)
			})
		},
		changeLrcTime: function(t) {
			if ($.isNumeric(t)) {
				for (var n = M.length, e = Ttpod.AudioPlayer.ListControl.getCurrSong(), r = 0; n > r; r++) M[r].time += t;
				N += t,
				q.set(e.song_id, M)
			}
		},
		resetLrcTime: function() {
			this.changeLrcTime( - N)
		},
		updateLrcPos: function(t) {
			var n = s(t);
			if (! (0 > n)) if (n == L) {
				if (I) return;
				if (this.kokMode) {
					var e = M[n],
					r = (t - e.time) / e.duration;
					r = 0 > r ? 0: r,
					r = r > .95 ? 1: r;
					var i = (100 * r).toFixed(2) + "%";
					if (r < x.width() / 330) {
						x.removeClass("widthTransition").css("width", i);
						var o = setTimeout(function() {
							x.hasClass("widthTransition") || x.addClass("widthTransition"),
							clearTimeout(o)
						},
						100);
						return
					}
					x.css("width", i)
				}
			} else {
				if (L = n, I) return;
				var l = $(_[n]);
				U(a(n));
				var u = A ? "curr": "kokCurr";
				if (w.find("." + u).removeClass(u), l.addClass(u), this.kokMode) {
					var c = l.find("span").width(),
					d = $(k[n]),
					e = M[n],
					r = ((t - e.time) / e.duration).toFixed(2),
					i = r >= .95 ? "100%": 100 * r + "%";
					x = d.find("span"),
					C.find(".show").removeClass().css("width", "0%"),
					x.addClass("show widthTransition").css({
						marginLeft: Math.ceil((B - c) / 2) + "px",
						width: i 
						
					})
				}
			}
		},
		toggleKokMode: function() {
			this.kokMode = !this.kokMode,
			A = !this.kokMode,
			C && (this.kokMode ? (w.find(".curr").removeClass("curr"), C.show()) : (C.find(".show").removeClass(), w.find(".kokCurr").removeClass("kokCurr"), C.hide()))
		},
		resetLrcPos: function() {
			v.css("top", j + "px")
		},
		detectTimeNear: d
	};
	var U = $.browser.msie ?
	function(t) {
		v.animate({
			top: t + "px"
		},
		200)
	}: function(t) {
		v.css("top", t + "px")
	},
	W = 30,
	z = {
		cn: /[\u4e00-\u9fa5\x3130-\x318F\xAC00-\xD7A3\u0800-\u4e00]+/g,
		en: /\w+/g,
		doubleBytes: /[^\x00-\xff]/g
	},
	E = "LRC_STORE",
	K = {},
	q = {
		set: function(t, n) {
			K[t] = n,
			$.store.set(E, K)
		},
		get: function(t) {
			if (K[t]) return K[t];
			var n = $.store.get(E);
			return n && n[t] ? n[t] : null
		}
	};
	Ttpod.AudioPlayer.ModuleInit.createLrcCon = function(n) {
		return new t(n)
	}
});
$.module("Ttpod.player",
function() {
	function e(e, t) {
		e = e || 0,
		t = t || 0;
		var o = C.getCurrSong();
		if (o) {
			var n = $.extend(b.getLogParams(), {
				song_name: o.song_name,
				singer_name: o.singer_name,
				songtime: o.duration,
				url: o.url,
				changeaction: e,
				changestatus: t,
				a: "listen",
				channel: Ttpod.ui.curChannel,
				title: $.query.getHash("title"),
				cid: Ttpod.config.page
			});
			Ttpod.core.log(n)
		}
	}
	function t(e) {
		Z = parseInt(e.slice(0, -1)) / 100,
		R.css("width", e)
	}
	function o(e) {
		if (U.html(m(e)), !et) {
			var t = e / C.getCurrSong().duration;
			t = t > 1 ? 1: t,
			F.css("width", 100 * t + "%")
		}
	}
	function n(e) {
		e = e || C.getCurrSong().duration,
		q.html(m(e))
	}
	function i(e) {
		M.html(e.song_name || "未知");
		var t = e.singer_name || "未知",
		o = e.album ? $.trim(e.album) : "";
		o && (t += " - " + e.album),
		I.html(t),
		n(e.duration),
		a(e)
	}
	function a(e, t) {
		var o = e.singer_name;
		return t || O.attr("src", Q),
		"string" == typeof o ? rt[o] && !t ? void r(rt[o], o) : void Ttpod.core.getResult({
			action: "getSingerPic",
			data: {
				artist: o,
				code: $.CRC32(o)
			},
			cache: !1,
			success: function(t) {
				var n = t.data.singerPic;
				return t.data.singerPic ? (r(n, o, e), void(rt[o] = n)) : void l(e, !1, !1, 0)
			}
		}) : void 0
	}
	function r(e, t, o) {
		var n = new Image(),
		i = new Date();
		n.onload = function() {
			if (l(o, !0, !0, i), C.getCurrSong().singer_name == t) {
				var n = O.clone();
				O.parent().append(n.css("display", "none").attr("src", e)),
				n.fadeIn(500,
				function() {
					O.remove(),
					O = n
				})
			}
		},
		n.onerror = function() {
			l(o, !0, !1, i)
		},
		n.src = e
	}
	function l(e, t, o, n) {
		e && Ttpod.core.log({
			a: "pic",
			songname: e.song_name,
			singername: e.singer_name,
			songid: e.song_id,
			exists: t ? 0: 1,
			loadtime: 0 == n ? 0: new Date() - n,
			success: o ? 0: 1,
			cid: Ttpod.config.page
		})
	}
	function s(e) {
		tt = !0,
		F.css("width", "0%"),
		U.html("00:00"),
		e = "boolean" == typeof e ? e: !0,
		e && (t("0%"), q.html("00:00")),
		bd = 0
	}
	function c() {
		0 == C.getList().length ? (it = !0, V.removeClass().addClass("playDisabled")) : (it = !1, V.removeClass("playDisabled"), "pause" == Ttpod.AudioPlayer.PlayerControl.playState && V.addClass("play")),
		"radio" == C.getListType() || C.isFirst() && (1 == C.getMode() || 2 == C.getMode()) || 0 == C.getList().length ? (ot = !0, K.removeClass().addClass("preDisabled")) : (ot = !1, K.removeClass().addClass("forward")),
		"radio" != C.getListType() && C.isLast() && (1 == C.getMode() || 2 == C.getMode()) || 0 == C.getList().length ? (nt = !0, H.removeClass().addClass("nextDisabled")) : (nt = !1, H.removeClass().addClass("back"))
	}
	function d(t) {
		switch (t) {
		case "":
			bb && (yt.hide(), bb = !1);
			break;
		case "min":
			p() && (bb = !0, yt.show("正在缓冲中...", !1));
			break;
		case "max":
			p() && "play" == Ttpod.AudioPlayer.PlayerControl.playState && (e(0, 2), u())
		}
	}
	function u() {
		if (C.getList().length > 1) {
			b.resetDetectVar(),
			Ttpod.AudioPlayer.PlayerControl.next(!0, !1, !0);
			try {
				yt.show("资源错误，自动切换下一首")
			} catch(e) {}
		} else try {
			yt.show("资源错误")
		} catch(e) {}
	}
	function p() {
		return b.getPosition() + 5 > Z * C.getCurrSong().duration
	}
	function f() {
		clearTimeout(ft),
		ft = setTimeout(function() {
			"play" == Ttpod.AudioPlayer.PlayerControl.playState && (bd += 2, D.css("-" + bc + "-transform", "rotate(" + bd + "deg)")),
			f()
		},
		30)
	}
	function g(e) {
		e = "boolean" == typeof e ? e: !1,
		e ? D.addClass("playCD") : D.removeClass("playCD")
	}
	function h(e) {
		return e.preventDefault(),
		e.stopPropagation && e.stopPropagation(),
		!1
	}
	function m(e) {
		if ("number" == typeof e) {
			var t = Math.floor(e / 60),
			o = Math.floor(e % 60),
			n = "";
			return t = 10 > t ? "0" + t: t,
			o = 10 > o ? "0" + o: o,
			n = t + ":" + o
		}
	}
	function y() {
		if (!gt) {
			gt = !0;
			var e = Ttpod.AudioPlayer.PlayerControl;
			$.extend(L, $.store.get(P)),
			j.find(".volumeFg").css("width", L.volume + "%"),
			e.setVolume(L.volume),
			e.setMode(null, L.mode, !0),
			e.muted = L.muted;
			var t = e.muted ? "mute": "horn";
			X.removeClass().addClass(t),
			e.toggleMute(e.muted);
			var t = L.kokMode ? "kokOn": "kokOff";
			z.removeClass().addClass(t),
			L.kokMode || e.toggleKokMode()
		}
	}
	var v = Ttpod.AudioPlayer.ModuleInit.createLrcCon($(".lyrics")),
	C = Ttpod.AudioPlayer.ModuleInit.createListControl(),
	T = 0,
	k = {
		progressCallback: function(e) {
			tt || t(e)
		},
		timeupdateCallback: function(e) {
			"number" == typeof at && (at = null),
			v.updateLrcPos(e),
			o(e)
		},
		endedCallback: function() {
			e(0),
			Ttpod.AudioPlayer.PlayerControl.next(!1, !0, !0)
		},
		failedCallback: function() {
			e(0, 1),
			++T <= 3 && u()
		},
		readyCallback: function() {
			w = !0,
			"function" == typeof S && S()
		},
		stuckCallback: function(e) {
			d(e)
		},
		playCallback: function() {
			T = 0
		}
	},
	b = Ttpod.AudioPlayer.ModuleInit.createPlayer({
		id: "audioPlayer",
		callbackPool: k
	}),
	w = !1,
	S = null,
	P = "PLAYER_STATUS",
	_ = "SONG_BITRATE",
	L = {
		volume: 100,
		muted: !1,
		mode: 0,
		kokMode: !0
	},
	x = null,
	M = null,
	A = null,
	I = null,
	O = null,
	D = null,
	E = null,
	K = null,
	V = null,
	H = null,
	B = null,
	R = null,
	F = null,
	U = null,
	q = null,
	N = null,
	z = null,
	X = null,
	j = null,
	G = null,
	J = null,
	W = null,
	Y = null,
	Q = "https://web.archive.org/web/20190615075516/http://app.ttdtweb.com/dongting/styles/images/defaultSinger-5d99da.jpg",
	Z = 0,
	et = !1,
	tt = !1,
	ot = !1,
	nt = !1,
	it = !1,
	at = null,
	rt = {},
	lt = [];
	v.registerDragLrc(function(e) {
		Ttpod.AudioPlayer.PlayerControl.playTo(e),
		Ttpod.core.log({
			a: "player",
			type: "lrc",
			cid: Ttpod.config.page
		})
	});
	var ba = {
		add: function(e) {
			"function" == typeof e && lt.push(e)
		},
		executeAll: function(e, t, o) {
			for (var n = 0, i = lt.length, a = {
				preSong: C.getPreSong(),
				last: C.isLast(),
				currSong: e || C.getCurrSong(),
				playState: t || Ttpod.AudioPlayer.PlayerControl.playState,
				songChange: o || !1,
				listType: C.getListType()
			}; i > n; n++) lt[n](a)
		}
	},
	ct = function(e) {
		function t() {
			x = e,
			M = x.find("#p_songName"),
			I = x.find("#p_singerName"),
			A = x.find(".picTools .wrap"),
			A.length < 1 && (A = x.find(".unionSingerPic")),
			O = A.children("img"),
			D = A.children(".dvd"),
			E = A.children("span"),
			K = x.find("#p_pre"),
			V = x.find("#p_play"),
			H = x.find("#p_next"),
			B = x.find(".progress"),
			R = B.find("#bufferBar"),
			F = B.find("#currTimeBar"),
			U = B.find("#currTime"),
			q = B.find("#totalTime"),
			N = B.find("#cursor"),
			W = B.children(".progressTip"),
			z = x.find("#p_kokSwitch"),
			X = x.find("#p_mute"),
			j = x.find("#p_volume"),
			G = x.find("#p_mode"),
			J = x.find(".lyrics"),
			Y = $(".search"),
			n.playState = "pause",
			n.muted = !1
		}
		function o() {
			function e(e) {
				return $.contains(Y[0], e.target) ? !0: vt && vt.length > 0 && $.contains(vt[0], e.target) ? !0: $(".feedbackLayer").length > 0 && $.contains($(".feedbackLayer")[0], e.target) ? !0: void 0
			}
			K.click(function() {
				n.pre(!0)
			}),
			H.click(function() {
				n.next(!0)
			}),
			V.click(function() {
				n.handlePlayPause()
			}),
			E.delegate("a", "click",
			function() {
				var e = $(this).attr("class");
				switch (e) {
				case "refreshPic":
					a(C.getCurrSong(), !0);
					break;
				case "picError":
					xt.show("pic")
				}
			}),
			G.click(function() {
				n.setMode($(this))
			});
			var t = !1;
			j.mousedown(function() {
				t = !0
			}).bind("mouseup mouseleave",
			function(e) {
				t = !1,
				h(e)
			}).mousemove(function(e) {
				if (t) {
					var o = $(this).find(".volumeBg"),
					i = o.width(),
					a = e.pageX - o.offset().left,
					r = a / i;
					r = r > 1 ? 1: r,
					r = 0 > r ? 0: r,
					r = 100 * r,
					o.find(".volumeFg").css("width", r + "%"),
					n.setVolume(r)
				}
			}),
			X.mouseup(function() {
				n.muted = !n.muted;
				var e = n.muted ? "mute": "horn";
				$(this).removeClass().addClass(e),
				n.toggleMute(n.muted)
			}),
			z.click(function() {
				var e = "kokOff",
				t = "卡拉OK已关闭";
				v.kokMode || (e = "kokOn", t = "卡拉OK已开启"),
				$(this).removeClass().addClass(e),
				yt.show(t),
				n.toggleKokMode(),
				L.kokMode = v.kokMode,
				$.store.set(P, L),
				Ttpod.core.log({
					a: "player",
					type: v.kokMode ? 4: 5,
					cid: Ttpod.config.page
				})
			}),
			R.click(function(e) {
				n.handleTimeChange($(this), e)
			}),
			F.click(function(e) {
				n.handleTimeChange($(this), e)
			});
			var o = !1;
			N.mousedown(function() {
				o = !0,
				et = !0
			}),
			$("body").mousemove(function(e) {
				o && n.handleTimeChange(F, e, !1, Z)
			}).mouseup(function(e) {
				o && (o = !1, et = !1, n.handleTimeChange(F, e, !0, Z))
			});
			var i = 0,
			r = function() {
				yt.show(i > 0 ? "歌词延后" + .5 * i + "秒": 0 > i ? "歌词提前" + .5 * -i + "秒": "歌词还原")
			};
			J.delegate("a", "click",
			function() {
				var e = $(this).attr("class");
				switch (e) {
				case "lyricSearchBtn":
					$t.show();
					break;
				case "lyricTimeUp":
					n.changeLrcTime(.5),
					i++,
					r();
					break;
				case "lyricTimeReset":
					i = 0,
					n.resetLrcTime(),
					yt.show("歌词重置");
					break;
				case "lyricTimeDown":
					n.changeLrcTime( - .5),
					i--,
					r();
					break;
				case "lyricErrorTip":
					xt.show()
				}
			}).mouseleave(function(e) {
				i = 0,
				h(e)
			}),
			C.setBitrate($.store.get(_)),
			$("#J_shareWrap").hover(function() {
				var e = C.getCurrSong(),
				t = Ttpod.config.name + "多曲风分类频道，个性化推荐，随时随地畅听好音乐。";
				if (e) {
					var o = Ttpod.config.url + "dt.html?song_id=" + e.song_id,
					n = "我在听《" + e.singer_name + " - " + e.song_name + "》，你也来听听吧！ (分享自@" + Ttpod.config.name + "，好音质 #" + Ttpod.config.name + "#)";
					Ttpod.share.setShareInfo({
						tag: "shareSong",
						bdText: n,
						bdDesc: t,
						bdUrl: o,
						bdPic: $("#p_singerPic").attr("src")
					})
				} else Ttpod.share.setShareInfo({
					tag: "shareSong",
					bdText: t + " (分享自@" + Ttpod.config.name + "，好音质 #" + Ttpod.config.name + "#)",
					bdDesc: t,
					bdUrl: Ttpod.config.url + "dt.html",
					bdPic: Ttpod.config.url + "/styles/images/logo.png"
				});
				$(this).find(".bdsharebuttonbox").slideDown(200)
			},
			function() {
				$(this).find(".bdsharebuttonbox").hide()
			});
			var l = !1,
			s = 0;
			$(document).keydown(function(t) {
				if (!e(t)) {
					var o = t.keyCode; ! t.ctrlKey || 38 != o && 40 != o || (l = !0, n.handleHotKeys(o), h(t)),
					32 == o && h(t)
				}
			}).keyup(function(t) {
				if (!e(t)) {
					var o = t.keyCode; (32 == o || t.ctrlKey && (37 == o || 39 == o)) && (n.handleHotKeys(o), h(t)),
					!t.ctrlKey || 38 != o && 40 != o || (l = !1, clearTimeout(s), s = setTimeout(function() {
						l || j.removeClass("showVolume")
					},
					1e3), h(t))
				}
			})
		}
		var n = this;
		t(),
		o(),
		c()
	};
	ct.prototype = {
		play: function(e) {
			if (e = "boolean" == typeof e ? e: !0, tt = !1, C.getCurrSong()) V.removeClass("play").addClass("pause").attr("title", "暂停(空格)"),
			b.play(),
			e && ba.executeAll(C.getCurrSong(), "play"),
			this.playState = "play",
			g(!0);
			else {
				var t = this;
				C.getDefaultSong(function(o) {
					o && (V.removeClass("play").addClass("pause").attr("title", "暂停(空格)"), t.changeSong(o), e && ba.executeAll(o, "play"))
				})
			}
			Ttpod.core.log({
				a: "player",
				type: "play",
				cid: Ttpod.config.page
			})
		},
		playTo: function(e) {
			e < b.getPosition() && v.resetCurrLrcIndex(e),
			at = e,
			b.playTo(e)
		},
		pause: function() {
			this.playState = "pause";
			var e = C.getCurrSong();
			e && (b.pause(), V.removeClass("pause").addClass("play").attr("title", "播放(空格)"), g(), ba.executeAll(C.getCurrSong(), "pause"), Ttpod.core.log({
				a: "player",
				type: "pause",
				cid: Ttpod.config.page
			}))
		},
		stop: function() {
			b.stop(),
			this.playState = "pause",
			at = 0,
			v.resetCurrLrcIndex(0),
			s(!1),
			v.resetLrcPos(),
			V.removeClass("pause").addClass("play"),
			g()
		},
		next: function(t, o, n) {
			if (nt) {
				if (t) return;
				if (2 == C.getMode() && o) return void this.stop()
			}
			n = "boolean" == typeof n ? n: !1,
			n || e(1);
			var i = this;
			C.next(function(e) {
				return e ? (s(), i.changeSong(e), void ba.executeAll(e, null, !0)) : void i.stop()
			},
			t),
			Ttpod.core.log({
				a: "player",
				type: "next",
				cid: Ttpod.config.page
			})
		},
		pre: function(t) {
			if (!ot) {
				e(1),
				s();
				var o = this;
				C.pre(function(e) {
					o.changeSong(e),
					ba.executeAll(e, null, !0)
				},
				t),
				Ttpod.core.log({
					a: "player",
					type: "prev",
					cid: Ttpod.config.page
				})
			}
		},
		setMode: function(e, t, o) {
			if ("radio" == C.getListType()) return void(o || yt.show("“随心听”不支持更换播放模式"));
			e = e || G,
			t = "number" == typeof t ? t: (parseInt(e.attr("data-mode")) + 1) % 4,
			o = "boolean" == typeof o ? o: !1;
			var n = "",
			i = "",
			a = 0;
			switch (t) {
			case 0:
				n = "repeat",
				i = "列表循环",
				a = 2;
				break;
			case 1:
				n = "repOne",
				i = "单曲循环",
				a = 0;
				break;
			case 2:
				n = "order",
				i = "顺序播放",
				a = 1;
				break;
			case 3:
			default:
				n = "random",
				i = "随机播放",
				a = 3
			}
			L.mode = t,
			$.store.set(P, L),
			C.setMode(t),
			e.attr({
				"data-mode": t,
				title: i
			}).removeClass().addClass(n),
			c(),
			o || yt.show(i),
			Ttpod.core.log({
				a: "player",
				type: a,
				cid: Ttpod.config.page
			})
		},
		setVolume: function(e) {
			L.volume = e,
			$.store.set(P, L),
			b.setVolume(e / 100)
		},
		toggleMute: function(e) {
			e = "boolean" == typeof e ? e: !1,
			L.muted = e,
			$.store.set(P, L),
			b.toggleMute(e)
		},
		changeSong: function(e) {
			e && e.url && (y(), forcePlay = "boolean" == typeof forcePlay ? forcePlay: !1, b.changeSong(e.url), this.play(!1), v.renderLrc(e), i(e), c(), f())
		},
		playSong: function(t, o) {
			s();
			var n = this;
			C.getSong(t, o,
			function(e) {
				n.changeSong(e),
				ba.executeAll(e, null, !0)
			}),
			g(!0),
			e(1)
		},
		toggleKokMode: function() {
			v.toggleKokMode()
		},
		changeLrcTime: function(e) {
			v.changeLrcTime(e)
		},
		resetLrcTime: function() {
			v.resetLrcTime()
		},
		handleTimeChange: function(e, t, o, n) {
			o = "boolean" == typeof o ? o: !0,
			n = "number" == typeof n ? n: 1;
			var i = B.width(),
			a = t.pageX - e.offset().left,
			r = a / i;
			r = r > n ? n: r;
			var l = C.getCurrSong();
			if (l) {
				var s = 100 * r + "%",
				c = l.duration;
				F.css("width", s),
				o && (this.playTo(r * c), Ttpod.core.log({
					a: "player",
					type: "process"
				}))
			}
		},
		handleHotKeys: function(e) {
			var t = "";
			switch (e) {
			case 37:
				this.pre(!0),
				t = "prev";
				break;
			case 39:
				this.next(!0),
				t = "next";
				break;
			case 32:
				this.handlePlayPause(!0);
				break;
			case 38:
				this.handleVolumeControl(!0),
				t = "volumePlus";
				break;
			case 40:
				this.handleVolumeControl(),
				t = "volumeMinus"
			}
			32 != e && Ttpod.core.log({
				a: "quick",
				title: t,
				cid: Ttpod.config.page
			})
		},
		handlePlayPause: function(e) {
			if (!it) {
				var t = "";
				"pause" == this.playState ? (this.play(), t = "play") : (this.pause(), t = "pause"),
				e && Ttpod.core.log({
					a: "quick",
					title: t,
					cid: Ttpod.config.page
				})
			}
		},
		handleVolumeControl: function(e, t) {
			e = "boolean" == typeof e ? e: !1,
			t = "boolean" == typeof t ? t: !1;
			var o = L.volume + (e ? 10: -10);
			o = 0 > o ? 0: o,
			o = o > 100 ? 100: o,
			L.volume = o,
			this.setVolume(o),
			j.addClass("showVolume").find(".volumeFg").css("width", o + "%"),
			t && setTimeout(function() {
				j.removeClass("showVolume")
			},
			1e3)
		},
		registerStatusChange: function(e) {
			ba.add(e)
		},
		ready: function(e) {
			w ? e() : S = e
		}
	},
	C.registerCallback("changeList", c);
	var bb = !1;
	C.registerCallback("getSongError", u);
	var bc = "webkit"; !
	function() {
		var e = $.browser;
		e.webkit ? bc = "webkit": e.msie ? bc = "ms": e.mozilla ? bc = "moz": e.opera && (bc = "o")
	} ();
	var bd = 0,
	ft = 0,
	gt = !1,
	ht = 0,
	mt = 0,
	yt = {
		show: function(e, t) {
			e = "string" == typeof e ? e: "提示",
			t = "boolean" == typeof t ? t: !0,
			W.text(e),
			mt++;
			var o = mt;
			W.is(":visible") ? this.deferHide() : W.fadeIn(500,
			function() {
				t && o == mt && yt.deferHide()
			})
		},
		hide: function() {
			W.fadeOut(500)
		},
		deferHide: function() {
			clearTimeout(ht),
			ht = setTimeout(function() {
				W.fadeOut(500)
			},
			1e3)
		}
	},
	vt = null,
	Ct = null,
	Tt = null,
	kt = null,
	bt = null,
	wt = $("#aside .asideShade"),
	$t = {
		inited: !1,
		init: function() {
			this.inited || (vt = $(".lyricSearch"), Ct = vt.find(".close"), Tt = vt.find(".submit"), kt = vt.find(".songname input"), bt = vt.find(".singername input"), this.register(), this.inited = !0)
		},
		show: function() {
			wt.fadeTo(500, .5),
			$.ui.dialog.open($.template(Ttpod.tmpl.lyricSearch), {
				oId: "lyricSearch",
				width: 260,
				height: 240,
				left: 164,
				shade: !0
			}),
			this.init(),
			kt.val(C.getCurrSong().song_name),
			bt.val(C.getCurrSong().singer_name)
		},
		register: function() {
			var e = this;
			Ct.live("click",
			function() {
				wt.fadeOut(500),
				$.ui.dialog.close()
			}),
			kt.live("focus",
			function() {
				kt.removeClass()
			}),
			Tt.live("click",
			function() {
				e.handleConfirm()
			}),
			kt.live("keyup",
			function(t) {
				13 == t.keyCode && e.handleConfirm()
			}),
			bt.live("keyup",
			function(t) {
				13 == t.keyCode && e.handleConfirm()
			}),
			wt.live("click",
			function() {
				wt.fadeOut(500),
				$.ui.dialog.close()
			})
		},
		handleConfirm: function() {
			var e = $.trim(kt.val()),
			t = $.trim(bt.val()),
			o = C.getCurrSong();
			return e ? (v.renderLrc($.extend(o, {
				new_song_name: e,
				new_singer_name: t
			})), wt.fadeOut(500), $.ui.dialog.close(), void Ttpod.core.log({
				a: "player",
				type: "searchlrc",
				cid: Ttpod.config.page
			})) : void kt.addClass("errorTip")
		}
	},
	St = {
		id: "lyricErrorArea",
		type: "lyric",
		text: "歌词报错",
		choice: ["下载不到", "与歌曲不符", "歌词不同步或有错字"]
	},
	Pt = {
		id: "picErrorArea",
		type: "pic",
		text: "歌手图片报错",
		choice: ["下载不到", "与歌曲不符", "显示效果差"]
	},
	_t = null,
	Lt = null,
	xt = {
		picInited: !1,
		lyricInited: !1,
		init: function(e) {
			"pic" != e || this.picInited ? "lyric" != e || this.lyricInited || (this.register($("#lyricErrorArea")), this.lyricInited = !0, _t = $("#lyricErrorArea p span:first-child")) : (this.register($("#picErrorArea")), this.picInited = !0, Lt = $("#picErrorArea p span:first-child"))
		},
		register: function(e) {
			var t = this;
			e.delegate("p", "click",
			function() {
				$(this).siblings().children("span:first-child").removeClass("choice"),
				$(this).children("span:first-child").addClass("choice")
			}).delegate(".close", "click",
			function() {
				wt.fadeOut(500),
				$.ui.dialog.close()
			}).delegate(".submit", "click",
			function() {
				t.handleConfirm($(this).attr("data-type"))
			}),
			wt.live("click",
			function() {
				wt.fadeOut(500),
				$.ui.dialog.close()
			})
		},
		show: function(e) {
			e = e || "lyric";
			var t = St,
			o = "lyricError";
			"pic" == e && (t = Pt, o = "picError"),
			wt.fadeTo(500, .5),
			$.ui.dialog.open($.template(Ttpod.tmpl.picLyricError, {
				data: t
			}), {
				oId: o,
				width: 260,
				height: 225,
				left: 164,
				shade: !0
			}),
			this.init(e)
		},
		handleConfirm: function(e) {
			var t = C.getCurrSong(),
			o = {
				level: 0,
				lptype: 1,
				lrcid: "",
				arpic: "",
				title: t.song_name,
				artist: t.singer_name,
				songid: t.song_id
			},
			n = null;
			if ("pic" == e) {
				n = Lt;
				var i = rt[o.artist];
				o.arpic = i ? i.substring(i.lastIndexOf("/") + 1, i.lastIndexOf(".")) : ""
			} else n = _t,
			o.lptype = 2,
			o.lrcid = t.lrcid ? t.lrcid: "";
			for (var a = !0, r = n.length - 1; r >= 0; r--) if ($(n[r]).hasClass("choice")) {
				o.level = r,
				a = !1;
				break
			}
			a ? wt.fadeOut(500) : (Ttpod.core.getResult({
				action: "sendPicLyricError",
				data: o,
				success: function() {}
			}), wt.fadeOut(500,
			function() {
				yt.show("报错提交成功")
			})),
			$.ui.dialog.close()
		}
	};
	return {
		init: function() {
			Ttpod.AudioPlayer.PlayerControl = new ct($(".player")),
			Ttpod.AudioPlayer.ListControl = C
		}
	}
});
$.module("Ttpod.heart",
function() {
	var e = "heart",
	t = null,
	a = null,
	n = "REDHEART",
	r = "TIMEOUT",
	s = 0,
	o = 1e3,
	i = 100,
	d = [],
	l = [],
	g = "TEMP_ADD",
	u = "TEMP_Del",
	c = null,
	h = null,
	p = {},
	f = null;
	_synFaild = null;
	var m = $("#redListContent"),
	_ = $("#aside .handle"),
	v = $("#tempListContent"),
	T = $("#aside .handle"),
	H = $("#redListContent"),
	R = $("#listNew"),
	S = $("#mainShade"),
	y = $("#redListFooter"),
	L = $(".numWrap span", y);
	$main = $("#main"),
	$redListNavItem = $(".redList", R);
	var C = {
		params: null,
		addHandle: function() {
			var e = this,
			n = Ttpod.playerManage;
			m.delegate(".J_songItem", "click",
			function() {
				var t = n.getSongInfo($(this));
				$(this).hasClass("playState") ? e._playSong(t, "pause") : e._playSong(t, "play")
			}),
			$(".redList", R).click(function() {
				Ttpod.playerManage.focusList("redList")
			}),
			R.delegate(".lbEmpty", "click",
			function() {
				location.hash = "#a=plaza",
				S.stop(),
				R.hide(),
				S.fadeOut()
			}),
			a.registerStatusChange(e._listenListChange),
			T.delegate("#heart", "click",
			function() {
				if ($(this).hasClass("heart")) {
					var a = t.getCurrSong();
					a && (C.params = {
						ds: 0,
						ht: 0,
						user: 5
					},
					C.checkRedHeart("add", a.song_id), e._addRedHeart($(this), a, C.params))
				} else $(this).hasClass("redHeart") && (C.params = {
					ds: 1,
					ht: 0
				},
				e._removeRedHeart(n.getSongInfo($(this)), C.params));
				return ! 1
			}),
			$main.delegate(".redHeart", "click",
			function() {
				return C.params = {
					title: Ttpod.ui.docTitle,
					channel: Ttpod.ui.curChannel,
					ds: 1,
					ht: 1
				},
				e._removeRedHeart(n.getSongInfo($(this).parents(".J_songItem")), C.params),
				!1
			}),
			v.delegate(".redHeart", "click",
			function() {
				return C.params = {
					channel: "tempbox",
					ds: 1,
					ht: 1
				},
				e._removeRedHeart(n.getSongInfo($(this).parents(".J_songItem")), C.params),
				!1
			}),
			H.delegate(".redHeart", "click",
			function() {
				return C.params = {
					channel: "heartlist",
					ds: 1,
					ht: 1
				},
				e._removeRedHeart(n.getSongInfo($(this).parents(".J_songItem")), C.params),
				!1
			}),
			$main.delegate(".heart", "click",
			function() {
				C.params = {
					title: Ttpod.ui.docTitle,
					channel: Ttpod.ui.curChannel,
					ds: 0,
					ht: 1,
					user: 2
				};
				var t = n.getSongInfo($(this).parents(".J_songItem"));
				return C.checkRedHeart("add", t.song_id),
				e._addRedHeart($(this), t, C.params),
				!1
			}),
			v.delegate(".heart", "click",
			function() {
				return C.params = {
					channel: "tempbox",
					ds: 0,
					ht: 1,
					user: 3
				},
				e._addRedHeart($(this), n.getSongInfo($(this).parents(".J_songItem")), C.params),
				!1
			})
		},
		changeRedHeartNum: function() {
			var e = this.getCount();
			L.html(e),
			0 == e ? y.addClass("emptyToolsBar") : y.removeClass("emptyToolsBar"),
			$(".userDataBox .info .num").html(e)
		},
		getCount: function() {
			return Ttpod.heart.getRedHeart().length
		},
		_log: function(e) {
			var t = $.extend(e, {
				a: "heart"
			});
			delete t.song_id,
			Ttpod.core.log(t),
			C.params = null
		},
		_synRedHeartList: function() {
			if (p) for (var e = Ttpod.heart.getRedHeart(), t = 0, a = e.length; a > t; t++) $(".commonList .heart[data-songid='" + e[t].song_id + "']").attr("class", "redHeart")
		},
		_getListElement: function(e) {
			return m.find(".J_songItem[data-song^='song_id=" + e + "']")
		},
		_playSong: function(t, n) {
			Ttpod.playerManage.logPlay(t, n, "heartlist"),
			"play" == n ? a.playSong(e, t.song_id) : a.pause()
		},
		_addRedHeart: function(a, n, r, s, o) {
			var i = this,
			d = n.length ? n: [n],
			l = {
				songList: d,
				callback: function(n) {
					t.appendList(e, [n], "top"),
					$(".heart[data-songid='" + n.song_id + "']").attr("class", "redHeart");
					try {
						n.song_id == t.getCurrSong().song_id && _.find(".heart").attr("class", "redHeart")
					} catch(s) {}
					i._render(),
					delete r.user,
					i._log($.extend(r, n)),
					a && $.fn.fly && $.fn.fly({
						startObj: a,
						endObj: $("#btnListNew"),
						flySrc: "https://web.archive.org/web/20190615075516/http://app.ttdtweb.com/dongting/styles/images/fly_icon-e832ea.png",
						endWidth: 40,
						endHeight: 25,
						x: -100,
						y: -50
					})
				},
				log: r.user,
				isDelay: s,
				success: o
			};
			Ttpod.heart.addRedHeart(l)
		},
		_removeRedHeart: function(a, n) {
			var r = this,
			s = a.length ? a: [a],
			o = {
				songList: s,
				callback: function(s) {
					t.removeList(e, parseInt(s));
					try {
						s == t.getCurrSong().song_id && _.find(".redHeart").attr("class", "heart")
					} catch(o) {}
					$(".redHeart[data-songid='" + s + "']").attr("class", "heart"),
					r._render(),
					r._log($.extend(n, a))
				}
			};
			Ttpod.heart.removeRedHeart(o)
		},
		_listenListChange: function(t) {
			if (!$.isEmptyObject(t.currSong)) {
				var a = t.currSong.song_id;
				_.find("#heart").attr("data-song", "song_id=" + a + "&song_name=" + t.currSong.song_name + "&singer_name=" + t.currSong.singer_name),
				p[a] ? _.find("#heart").attr("class", "redHeart") : _.find("#heart").attr("class", "heart")
			}
			if ($(".J_songItem.playState", H).removeClass("playState"), $(".J_songItem.pauseState", H).removeClass("pauseState"), $redListNavItem.removeClass("playState pauseState"), t.listType == e) {
				var n = $(".J_songItem[data-song^='song_id=" + t.currSong.song_id + "']", H);
				n.addClass(t.playState + "State"),
				C._getListElement(a).addClass(t.playState + "State"),
				$redListNavItem.addClass(t.playState + "State"),
				Ttpod.ui.focusScroll(n, $(".list", R))
			}
		},
		_render: function() {
			m.html($.template(Ttpod.tmpl.hxlb, {
				data: Ttpod.heart.getRedHeart()
			})),
			this.changeRedHeartNum();
			var n = t.getCurrSong(),
			r = n ? n.song_id: "",
			s = a.playState;
			r && t.getListType() == e && this._getListElement(r).addClass(s + "State")
		},
		_init: function() {
			var a = this;
			Ttpod.heart.reqRedHeart(function(n) {
				a.changeRedHeartNum(),
				_synFaild && (_synFaild = null, a._synRedHeartList()),
				m.html($.template(Ttpod.tmpl.hxlb, {
					data: n
				})),
				t.setList(e, Ttpod.heart.getRedHeart())
			})
		},
		_checkTimeout: function() {
			return C._nowTime() - ($.store.get(r) || 0) >= 60 * s * 1e3 ? !0: !1
		},
		_nowTime: function() {
			return new Date().getTime()
		},
		checkRedHeart: function(e, t, a) {
			if (t) {
				for (var n = !0, r = a || !0, s = "add" == e ? d: l, o = "add" == e ? g: u, i = 0; i < s.length; i++) if (s[i] == t) {
					n = !1;
					break
				}
				n && s.push(t);
				var c = s.join("_");
				return r && $.store.set(o, c),
				c
			}
		},
		getResult: function(e, t, a) {
			if (t) {
				var n = "add" == e ? "savefavsong": "cancelfavsong",
				r = "add" == e ? "jsonp_fav_create": "jsonp_fav_destroy";
				Ttpod.core.getResult({
					action: n,
					data: {
						song_ids: t
					},
					requireToken: !0,
					jsonpCallback: r + C._nowTime(),
					success: function(e) {
						$.isFunction(a) && a(e)
					}
				})
			}
		}
	};
	return {
		getTemp: function(e) {
			var t = "add" == e ? g: u;
			return $.store.get(t)
		},
		checkTemp: function() {
			return this.getTemp("add") || this.getTemp("del") ? !0: !1
		},
		init: function() {
			if (t = Ttpod.AudioPlayer.ListControl, a = Ttpod.AudioPlayer.PlayerControl, C.addHandle(), Ttpod.user && Ttpod.user.isLogin()) {
				var e = Ttpod.user.getUserInfo().tuid || "";
				g += e,
				u += e,
				n += e;
				var s = this.getRedHeart();
				if (this.checkTemp()) C.getResult("del", this.getTemp("del"),
				function() {
					$.Store.remove(u),
					C._init()
				}),
				C.getResult("add", this.getTemp("add"),
				function() {
					$.Store.remove(g),
					C._init()
				});
				else if (!s || C._checkTimeout()) {
					$.store.set(r, C._nowTime());
					var o = $.store.get("TEMP_ADD"),
					i = parseInt(o ? o: -1);
					i > 0 ? C.getResult("add", i,
					function() {
						$.Store.remove("TEMP_ADD"),
						C._init()
					}) : C._init()
				} else C._init()
			} else m.html($.template(Ttpod.tmpl.hxlb, {
				data: {
					code: 0
				}
			}))
		},
		removeStore: function() {
			$.Store.remove(n)
		},
		setStore: function(e, t) {
			if (Ttpod.user.isLogin()) {
				if (t) {
					var a = this.getRedHeart();
					$.isArray(a) && (e = a.concat(e))
				}
				f = e,
				$.store.set(n, encodeURIComponent(JSON.stringify(e)))
			}
		},
		getHeartList: function(e, t, a) {
			var n = this,
			r = e.splice(0, i);
			Ttpod.common.getSongList(r,
			function(r) {
				n.setStore(r, !a),
				0 != e.length ? n.getHeartList(e, t, !1) : $.isFunction(t) && t(n.getRedHeart())
			})
		},
		setRedHeartIds: function(e) {
			p.code = 1,
			p[e] = e
		},
		getRedHeartIds: function() {
			return p
		},
		reqRedHeart: function(e) {
			var t = this;
			Ttpod.core.getResult({
				action: "getsongidlist",
				jsonpCallback: "jsonp_fav_list" + C._nowTime(),
				requireToken: !0,
				success: function(a) {
					t.getHeartList(a.data[0].song_ids.slice(0), e, !0)
				}
			})
		},
		addRedHeart: function(e) {
			var t = e.songList;
			if (t && 0 != t.length) {
				if (!Ttpod.user.isLogin()) return void Ttpod.user.login();
				for (var a = e.isDelay || !1, n = null, r = (e.log ? {
					a: "loginbtn",
					ds: e.log
				}: null, 0), s = t.length; s > r; r++) n = C.checkRedHeart("add", t[r].song_id),
				this.refrushRedHeart(t[r], "add", e.callback);
				a ? (C.getResult("add", n, e.success), d = []) : (clearTimeout(c), c = setTimeout(function() {
					C.getResult("add", n,
					function() {
						$.Store.remove(g)
					}),
					d = []
				},
				o))
			}
		},
		addRedHearts: function(e, t) {
			C.params = {
				channel: "tempbox",
				ds: 0,
				ht: 1,
				user: 3
			},
			C._addRedHeart(null, e, C.params, !0, t)
		},
		removeRedHeart: function(e) {
			var t = e.songList;
			if (t && 0 != t.length) {
				for (var a = e.isDelay || !1, n = null, r = 0, s = t.length; s > r; r++) n = C.checkRedHeart("del", t[r].song_id),
				this.refrushRedHeart(t[r].song_id, "del", e.callback);
				a ? (C.getResult("del", n), l = []) : (clearTimeout(h), h = setTimeout(function() {
					C.getResult("del", n,
					function() {
						$.Store.remove(u)
					}),
					l = []
				},
				o))
			}
		},
		refrushRedHeart: function(e, t, a) {
			var n = null;
			if (p && e) {
				var r = t || "add",
				s = this.getRedHeart();
				if ("add" === r) {
					if (p[e.song_id]) return;
					s.unshift(e),
					this.setRedHeartIds(e.song_id),
					this.setStore(s),
					n = e
				}
				if ("del" === r) {
					if (!p[e]) return;
					for (var o = 0, i = s.length; i > o; o++) if (s[o].song_id == e) {
						s.splice(o, 1),
						n = e,
						this.setStore(s),
						p[e] = null;
						break
					}
				}
				$.isFunction(a) && a(n)
			}
		},
		synRedHeartList: function(e) {
			var t = this.getRedHeartIds();
			return t.code ? t[e] ? !0: !1: (_synFaild = !0, !1)
		},
		getRedHeart: function() {
			if (null == f) {
				var e = $.store.get(n);
				f = e ? JSON.parse(decodeURIComponent(e)) : []
			}
			return f
		},
		startup: function(e) {
			if (!Ttpod.user.isLogin() || !e || !p) return ! 1;
			var t = this.getRedHeart();
			if (t && t.length > 0) for (var a = 0, n = t.length; n > a; a++) if (t[a].song_id == e) return C._playSong(t[a], "play"),
			!0;
			return ! 1
		}
	}
});
$.module("Ttpod.menu",
function() {
	function e() {
		$.browser.msie && l.children(".menuTip").addClass("ieMenuTip"),
		i.bind("contextmenu",
		function(e) {
			if (Ttpod.core.isRelease() && (e.preventDefault(), $.contains(d[0], e.target))) {
				var o = e.pageX,
				t = e.pageY,
				n = $(window).innerWidth(),
				i = $(window).innerHeight();
				o = o > n - s ? o - s: o,
				o = 0 > o ? 0: o,
				t = t > i - c ? t - c: t,
				t = 0 > t ? 0: t,
				r.removeClass(),
				0 > n - o - s - u && r.addClass("leftUL"),
				i - e.pageY - 30 < 0 && r.addClass("topUL"),
				a(),
				l.css({
					top: t,
					left: o
				}).show()
			}
		}).click(function(e) {
			l.is(":visible") && !$.contains(l[0], e.target) && l.hide()
		}),
		l.delegate("a", "click",
		function() {
			var e = $(this).attr("data-choice");
			if (e) {
				switch (e) {
				case "play":
					Ttpod.AudioPlayer.PlayerControl.handlePlayPause();
					break;
				case "prev":
					Ttpod.AudioPlayer.PlayerControl.pre(!0);
					break;
				case "next":
					Ttpod.AudioPlayer.PlayerControl.next(!0);
					break;
				case "volumePlus":
					Ttpod.AudioPlayer.PlayerControl.handleVolumeControl(!0, !0);
					break;
				case "volumeMinus":
					Ttpod.AudioPlayer.PlayerControl.handleVolumeControl(!1, !0);
					break;
				case "repeat":
					o($(this), 0);
					break;
				case "random":
					o($(this), 3);
					break;
				case "repOne":
					o($(this), 1);
					break;
				case "order":
					o($(this), 2);
					break;
				case "feedback":
					Ttpod.feedback.show();
					break;
				case "about":
					t()
				}
				l.hide()
			}
		})
	}
	function o(e, o) {
		r.find(".choosed").removeClass(),
		e.prev().addClass("choosed"),
		Ttpod.AudioPlayer.PlayerControl.setMode(null, o)
	}
	function a() {
		r.find(".choosed").removeClass(),
		$(r.find("span")[Ttpod.AudioPlayer.ListControl.getMode()]).addClass("choosed")
	}
	function t() {
		$.ui.dialog.open(Ttpod.tmpl.about, {
			oId: "aboutUs",
			width: 400,
			height: 250
		},
		function(e) {
			e.find(".aboutLayer").delegate(".close", "click",
			function() {
				$.ui.dialog.close()
			})
		})
	}
	var n = !1,
	i = $("body"),
	d = $("#page"),
	l = $("#contextMenu"),
	r = l.find("div ul"),
	r = l.find(".menuContent>div ul"),
	s = l.width(),
	c = l.height(),
	u = r.width();
	return {
		init: function() {
			n || (e(), n = !0)
		}
	}
});
$.module("Ttpod.skin",
function() {
	function n() {
		$(window).bind("resize",
		function() {
			s()
		}),
		l.find("ul").addClass("ulBg"),
		c.hover(function() {
			return $(this).addClass("skinHover"),
			l.show(),
			l.find("li").length > 0 ? void i() : void $.get(Ttpod.actions.get("getBgData"), {
				assetVersion: Ttpod.config.assetVersion
			},
			function(n) {
				n = n.data ? n: $.parseJSON(n),
				p = n.data,
				e(p,
				function() {
					l.find("ul").removeClass().html(o(p)),
					g = l.find("ul a"),
					h = l.find("ul img"),
					i(),
					l.delegate("li", "click",
					function() {
						l.find(".skinSelect").removeClass();
						var n = $(this),
						i = parseInt(n.attr("data-index")),
						o = p[i].large;
						n.find("span").addClass("skinSelect"),
						t(o),
						Ttpod.core.log({
							a: "skin",
							cid: i + 1
						})
					})
				})
			})
		},
		function() {
			setTimeout(function() {
				u && (l.hide(), c.removeClass("skinHover"), i(!1))
			},
			200)
		}),
		l.hover(function() {
			u = !1
		},
		function() {
			u = !0,
			l.hide(),
			c.removeClass("skinHover"),
			i(!1)
		})
	}
	function i(n) {
		n = "boolean" == typeof n ? n: !0,
		n ? (g.show().animate({
			"margin-top": 0
		},
		300), h.show().animate({
			width: 120,
			height: 80
		},
		300)) : (g.css({
			"margin-top": 20
		}).hide(), h.css({
			width: 60,
			height: 40
		}).hide())
	}
	function t(n) {
		var i = new Image();
		i.onload = function() {
			if (n == v) {
				var i = f.clone();
				f.parent().append(i.css({
					display: "none",
					top: -f.height() + "px"
				}).attr("src", n)),
				i.fadeIn(500,
				function() {
					i.css("top", "0px"),
					f.remove(),
					f = i
				}),
				$.cookie(m, n, {
					expires: 100
				})
			}
		},
		i.src = n,
		v = n
	}
	function o(n) {
		n = n || a;
		for (var i = 0, t = n.length, o = "", e = $.cookie(m) || Ttpod.config.path.bg; t > i; i++) {
			var a = n[i],
			s = "<span></span>";
			a.large == e && (s = '<span class="skinSelect"></span>'),
			o += '<li data-index="' + i + '"><a href="javascript:void(0);"><img src="' + a.small + '"></a>' + s + "</li>"
		}
		return o
	}
	function e(n, i) {
		for (var t = n.length, o = t, e = 0, a = 0; t > a; a++) {
			var s = n[a],
			r = new Image();
			r.onload = function() {
				e++,
				e == o && "function" == typeof i && i()
			},
			r.onerror = function() {
				o--
			},
			r.src = s.small
		}
	}
	function a() {
		var n = $("#radiobgImg").attr("src");
		if (!$("#radiobgImg").attr("src")) {
			var n = $.cookie(m);
			n && t(n)
		}
		s(),
		$("#radiobgImg").show()
	}
	function s() {
		var n = 1920,
		i = 1080,
		t = $(window).width(),
		o = $(window).height(),
		e = $("#radiobg"),
		a = n / t,
		s = i / o,
		r = $("#radiobgImg");
		if (e.css({
			height: o,
			width: t
		}), a > s) {
			var d = parseInt(n / s),
			c = "-" + parseInt((d - t) / 2) + "px";
			r.css({
				height: o,
				width: d,
				left: c,
				top: "0"
			})
		} else {
			var l = parseInt(i / a),
			f = "-" + parseInt((l - o) / 2) + "px";
			r.css({
				width: t,
				height: l,
				left: "0",
				top: f
			})
		}
	}
	var r = !1,
	d = $("#skinTool"),
	c = d.find(".skin"),
	l = d.find(".skinList"),
	f = $("#radiobg img"),
	g = null,
	h = null,
	p = [],
	u = !0,
	v = "",
	m = "bgSrc";
	return {
		init: function() {
			r || (r = !0, f.length > 0 && (a(), n()))
		}
	}
});
$.module("Ttpod.feedback",
function() {
	var e,
	a = !1;
	return {
		init: function() {
			if (!a) {
				var c = this;
				a = !0,
				e = $("#btnFeedback"),
				e.live("click",
				function() {
					c.show()
				}),
				$(".feedbackLayer .close").live("click",
				function() {
					$(".feedbackLayer .contact").val(""),
					$(".feedbackLayer .view").val(""),
					$.ui.dialog.close()
				}),
				$(".feedbackLayer .view").live("blur",
				function() {
					Ttpod.config.defaultAdvice = "",
					$(".feedbackLayer .view").val().indexOf("请将建议与意见告诉我们") >= 0 && $(".feedbackLayer .view").val("")
				}),
				$(".feedbackLayer .contact").live("blur",
				function() {
					$(".feedbackLayer .contact").val().indexOf("请填写QQ/Email/手机号") >= 0 && $(".feedbackLayer .contact").val("")
				}),
				$(".feedbackLayer .submit").live("click",
				function() {
					if ($(".feedbackLayer .submit").val("提交中..."), "" == $(".feedbackLayer .view").val()) return $(".feedbackLayer .errormsg").html("<font color=red>反馈的内容不能为空哦^_^</font>").fadeIn(500),
					$(".feedbackLayer .submit").val("提交"),
					!1;
					if ("" == $(".feedbackLayer .contact").val()) return $(".feedbackLayer .errormsg").html("<font color=red>联系方式不能为空哦^_^</font>").fadeIn(500),
					$(".feedbackLayer .submit").val("提交"),
					!1;
					var e = $.UA,
					a = {
						contactWay: $(".feedbackLayer .contact").val(),
						proposalContent: $(".feedbackLayer .view").val(),
						s: e.shell.type + "-" + e.shell.version + "|" + e.engine.type + "-" + e.engine.version,
						v: Ttpod.config.site + Ttpod.config.assetVersion,
						mid: "",
						reason: ""
					};
					Ttpod.core.getResult({
						action: "fk",
						data: a,
						jsonpCallback: "_feedback"
					}),
					setTimeout(function() {
						$.ui.dialog.close(),
						$.ui.dialog.timing("<span class='prompt'>您的反馈已经提交成功!<br/>谢谢您的反馈," + Ttpod.config.name + "有你更精彩</span>", 2e3, {
							width: 250,
							height: 70,
							top: 40
						})
					},
					600)
				})
			}
		},
		show: function() {
			$.ui.dialog.open($.template(Ttpod.tmpl.backMsg), {
				oId: "feedbackLayer",
				width: 430,
				height: 260
			}),
			$(".feedbackLayer .contact").placeholder(),
			$(".feedbackLayer .view").placeholder(),
			Ttpod.core.log({
				a: "feedback"
			})
		}
	}
});
$.module("Ttpod.share",
function() {
	function _loadShareRes() {
		if (!b) {
			with(document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "https://web.archive.org/web/20190615075516/http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~ ( - new Date() / 36e5)];
			b = !0
		}
	}
	window._bd_share_config = {
		common: {
			bdSnsKey: {
				tsina: "3030775238",
				tqq: "801239984"
			},
			bdMini: "2",
			bdMiniList: !1,
			bdStyle: "1",
			bdSize: "32"
		},
		share: [{
			tag: "shareSong",
			bdMini: "2",
			bdMiniList: !1,
			bdStyle: "1",
			bdSize: "16"
		}]
	};
	var b = !1;
	return {
		setShareInfo: function(e) {
			_loadShareRes();
			for (var a, i = 0; i < _bd_share_config.share.length; i++) if (e.tag == _bd_share_config.share[i].tag) {
				a = _bd_share_config.share[i];
				break
			}
			a ? $.extend(a, e) : _bd_share_config.share.push(e)
		}
	}
});
$.module("Ttpod.radio",
function() {
	function t() {
		var t = Ttpod.user.getUserInfo();
		_userId = $.isEmptyObject(t) ? $.store.get("radio_userid") || "A" + Math.round(1e5 * Math.random()) + new Date().getTime() : t.tuid,
		$.store.set("radio_userid", _userId)
	}
	function a() {
		Ttpod.ui.content.delegate(".J_radioItem", "click",
		function() {
			var t = $(this),
			a = t.attr("data-tagid");
			if (t.hasClass("playState")) f.pause();
			else {
				if (g) return;
				_ = t,
				e(a)
			}
			Ttpod.core.log({
				a: "title",
				title: t.attr("data-title"),
				channel: "radio"
			})
		}),
		Ttpod.AudioPlayer.PlayerControl.registerStatusChange(n)
	}
	function e(t) {
		u != t ? (u = t, $.store.set("radio_tagid", u), o(t,
		function(t) {
			T.setList(m, t),
			f.playSong(m)
		})) : f.playSong(m)
	}
	function o(t, a) {
		g = !0,
		Ttpod.core.getResult({
			action: "pubradio",
			data: {
				tagid: t,
				num: y.size,
				userid: _userId
			},
			cache: !1,
			jsonpCallback: "jsonp_pubradio" + new Date().getTime(),
			success: function(t) {
				g = !1;
				var e = [];
				p && !$.isEmptyObject(c) && (e.push(c), p = !1);
				for (var o = 0; o < t.data.length; o++) {
					var i = t.data[o];
					e.push({
						song_id: i.neid,
						song_name: i.songName,
						singer_name: i.singerName
					})
				}
				a(e)
			},
			error: function() {
				g = !1
			}
		})
	}
	function i() {
		g || o(u,
		function(t) {
			T.appendList(m, t)
		})
	}
	function n(t) {
		$("#radioPanel .J_radioItem.playState").removeClass("playState"),
		$("#radioPanel .J_radioItem.pauseState").removeClass("pauseState"),
		"dynamicList" != t.listType && d.removeClass("playState pauseState"),
		t.listType == m && (t.last && i(), _.addClass(t.playState + "State"), s.addClass(t.playState + "State"))
	}
	var r,
	d,
	s,
	l = !1,
	u = "",
	p = !1,
	c = null,
	g = !1,
	m = "radio",
	y = {
		size: 10
	},
	f = null,
	T = null,
	S = !1,
	_ = null,
	C = {
		pnlPty: {
			title: "随心听",
			tab: "radio"
		},
		render: function(t) {
			Ttpod.ui.renderCommon({
				title: t.title,
				action: "getdtmusicsbyid",
				tmpl: Ttpod.tmpl.radio,
				params: t,
				cache: !1,
				jsonpCallback: "jsonp_dyntags",
				callback: function(t) {
					r = $("#radioPanel");
					var a = T.getListType();
					u && (S && "" == a || "" != a && a == m) && (_ = $(".J_radioItem[data-tagid=" + u + "]", t), _.addClass(f.playState + "State"), Ttpod.ui.focusScroll(_, Ttpod.ui.content))
				}
			})
		}
	};
	return {
		init: function() {
			l || (f = Ttpod.AudioPlayer.PlayerControl, T = Ttpod.AudioPlayer.ListControl, r = Ttpod.ui.content, d = $("#nav a"), s = $("#nav a[data-tabkey=radio]"), a(), t(), Ttpod.ui.registerRouter({
				radio: C
			}), l = !0)
		},
		startup: function(t) {
			if (l) {
				c = t,
				p = !0;
				var a = $.store.get("radio_tagid") || 1;
				return _ = $(".J_radioItem[data-tagid=" + a + "]", r),
				_.length > 0 ? (_.trigger("click"), Ttpod.ui.focusScroll(_, Ttpod.ui.content)) : (e(a), S = !0),
				!0
			}
			return ! 1
		}
	}
});
$.module("Ttpod.tempbox",
function() {
	function t() {
		var t = $.store.get(P);
		t = t ? JSON.parse(t) : [],
		$.isEmptyObject(t) || S.setList(O, t)
	}
	function e() {
		$(".close", T).click(function() {
			v.stop(),
			T.hide(),
			v.fadeOut()
		}),
		$("#btnListNew").click(function() {
			if (v.stop(), v.css("opacity", .5).fadeToggle(), Ttpod.core.log({
				a: "player",
				type: "listbtn",
				cid: Ttpod.config.page
			}), T.toggle(), T.is(":visible")) {
				var t = S.getListType();
				t == O ? T.find(".tempList").click() : "heart" == t ? T.find(".redList").click() : "localList" == t && T.find(".localList").click()
			}
			L.data("isInit") || (h(), L.data("isInit", !0))
		}),
		v.click(function() {
			v.stop(),
			T.hide(),
			v.fadeOut()
		}),
		$(".tempList", T).click(function() {
			Ttpod.playerManage.focusList("tempList")
		}),
		$(".redList", T).click(function() {
			Ttpod.playerManage.focusList("redList")
		}),
		Ttpod.playerManage.focusList("tempList"),
		Ttpod.ui.content.delegate(".J_songItem[data-song] .add", "click",
		function() {
			return c(Ttpod.playerManage.getSongInfo($(this).parents(".J_songItem"))),
			$(this).removeClass("add").addClass("added"),
			$.browser.msie && "7.0" == $.browser.version ? !1: ($.fn.fly && $.fn.fly({
				startObj: $(this),
				endObj: $("#btnListNew"),
				flySrc: "https://web.archive.org/web/20190615075516/http://app.ttdtweb.com/dongting/styles/images/fly_add-12f080.png",
				endWidth: 25,
				endHeight: 25,
				x: -25,
				y: -30
			}), !1)
		}),
		Ttpod.ui.content.delegate(".J_songItem[data-song] .added", "click",
		function() {
			return ! 1
		}),
		L.delegate(".J_songItem[data-song]", "click dblclick",
		function() {
			var t = $(this),
			e = Ttpod.playerManage.getSongInfo(t);
			return t.hasClass("playState") ? (y.pause(), Ttpod.playerManage.logPlay(e, "pause", O)) : (l(e), Ttpod.playerManage.logPlay(e, "play", O)),
			!1
		}),
		$(".tpl-song-items").delegate(".J-play", "click dblclick",
		function() {
			var t = $(this).parent(),
			e = Ttpod.playerManage.getSongInfo(t);
			return t.hasClass("playState") ? (y.pause(), Ttpod.playerManage.logPlay(e, "pause", O)) : (l(e), Ttpod.playerManage.logPlay(e, "play", O)),
			!1
		}),
		L.delegate(".J_songItem[data-song] .num", "click",
		function() {
			var t = $(this).parents(".J_songItem"),
			e = Ttpod.playerManage.getSongInfo(t);
			return t.hasClass("playState") ? (y.pause(), Ttpod.playerManage.logPlay(e, "pause", O)) : (play(e), Ttpod.playerManage.logPlay(e, "play", O)),
			!1
		}),
		L.delegate(".J_songItem[data-song] .delete", "click",
		function() {
			var t = $(this).parents(".J_songItem");
			return r(Ttpod.playerManage.getSongInfo(t)),
			!1
		}),
		L.delegate(".J_songItem[data-song] .checkbox", "click",
		function() {
			return $(this).parents(".J_songItem").toggleClass("checkState"),
			a(),
			!1
		}),
		k.click(function() {
			var t = $(this);
			t.toggleClass("checkState"),
			t.hasClass("checkState") ? $("#tempListContent li").addClass("checkState") : $("#tempListContent li").removeClass("checkState"),
			a()
		}),
		I.click(function() {
			var t = $(this),
			e = n();
			t.hasClass("disabled") || 0 == e.length || Ttpod.heart.addRedHearts(e,
			function() {
				m().show("收藏成功！")
			})
		}),
		b.click(function() {
			var t = $(this),
			e = s(),
			a = "删除歌曲",
			n = "确定要把这" + e.length + "首歌曲从临时列表移除吗？";
			t.hasClass("disabled") || 0 == e.length || $.ui.dialog.confirm(a, n, {
				width: 300,
				height: 180
			},
			function() {
				p(e),
				m().show("删除成功！")
			})
		}),
		Ttpod.AudioPlayer.PlayerControl.registerStatusChange(i)
	}
	function a() {
		var t = L.find(".checkState").length;
		0 == t || t < S.getList(O).length ? k.removeClass("checkState") : k.addClass("checkState"),
		0 == t ? (I.addClass("disabled"), b.addClass("disabled")) : (I.removeClass("disabled"), b.removeClass("disabled"))
	}
	function n() {
		var t = [];
		return L.find(".J_songItem[data-song].checkState").each(function(e, a) {
			t.push(Ttpod.playerManage.getSongInfo($(a)))
		}),
		t
	}
	function s() {
		var t = [];
		return L.find(".J_songItem[data-song].checkState").each(function(e, a) {
			t.push(Ttpod.playerManage.getSongInfo($(a)).song_id)
		}),
		t
	}
	function o() {
		var t = s();
		j = {};
		for (var e = 0; e < t.length; e++) j[t[e]] = t[e]
	}
	function i(t) {
		if (C.removeClass("pauseState playState"), t.listType != O) $(".J_songItem.playState", L).removeClass("playState"),
		$(".J_songItem.pauseState", L).removeClass("pauseState");
		else {
			if (!$.isEmptyObject(t.currSong)) {
				var e = $(".J_songItem[data-song^='song_id=" + t.currSong.song_id + "']", L);
				e.addClass(t.playState + "State"),
				C.addClass(t.playState + "State")
			}
			h(t.playState, !0)
		}
	}
	function l(t) {
		d([t])
	}
	function d(t) {
		$.isEmptyObject(t) || (S.appendList(O, t), y.playSong(O, t[0].song_id))
	}
	function c(t) {
		g([t])
	}
	function g(t) {
		$.isEmptyObject(t) || (S.appendList(O, t), h(), f(t[0], 1))
	}
	function r(t) {
		S.removeList(O, t.song_id),
		h(),
		u([t.song_id]),
		f(t, 0)
	}
	function p(t) {
		var e = S.getList(O);
		e.length == t.length ? S.clearList(O) : S.removeList(O, t),
		u(t),
		h()
	}
	function u(t) {
		for (var e = 0; e < t.length; e++) {
			var a = Ttpod.ui.content.find(".J_songItem[data-song^='song_id=" + t[e] + "'] .added");
			a.removeClass("added").addClass("add")
		}
	}
	function f(t, e) {
		var a = $.extend({
			a: "add_song",
			title: $.query.getHash("title") || "",
			channel: 1 == e ? Ttpod.ui.curChannel: O,
			cid: Ttpod.config.page
		},
		{
			song_name: t.song_name,
			singer_name: t.singer_name,
			ds: e
		});
		Ttpod.core.log(a)
	}
	function h(t, e) {
		var n = S.getList(O);
		o();
		for (var s = 0; s < n.length; s++) x[n[s].song_id] = n[s].song_id;
		L.html($.template(Ttpod.tmpl.templb, {
			data: n
		}));
		var i = S.getCurrSong(),
		l = i ? i.song_id: "",
		t = t || y.playState;
		if (l) {
			var d = $(".J_songItem[data-song^='song_id=" + l + "']", L);
			e && Ttpod.ui.focusScroll(d, $("#listNew .list")),
			S.getListType() == O && d.addClass(t + "State")
		}
		M.html(n.length),
		_[0 == n.length ? "addClass": "removeClass"]("emptyToolsBar"),
		a(),
		$.store.set(P, JSON.stringify(n))
	}
	function m() {
		var t = {
			show: function(e, a) {
				J.show().html(e),
				t.defaultHide(a)
			},
			hide: function() {
				J.hide()
			},
			defaultHide: function(e) {
				var a = e || 500;
				A && clearTimeout(A),
				A = setTimeout(function() {
					t.hide()
				},
				a)
			}
		};
		return t
	}
	var y,
	S,
	T,
	v,
	C,
	L,
	_,
	k,
	I,
	b,
	J,
	M,
	w = !1,
	O = "tempbox",
	P = "TEMPBOX_LIST",
	x = {},
	j = {},
	A = null;
	return {
		init: function() {
			w || (y = Ttpod.AudioPlayer.PlayerControl, S = Ttpod.AudioPlayer.ListControl, T = $("#listNew"), v = $("#mainShade"), C = $(".tempList", T), L = $("#tempListContent"), _ = $("#tempListFooter"), k = $(".toolCkeckAll", _), I = $(".toolAddItem", _), b = $(".toolDelItem", _), M = $(".numWrap span", _), J = $(".tempListTip"), t(), e(), w = !0)
		},
		isAdd: function(t) {
			return $.exists(x[t])
		},
		isChecked: function(t) {
			return $.exists(j[t])
		},
		add: c,
		addList: g,
		play: l,
		playList: d,
		startup: function(t) {
			if (w) {
				var e,
				a = S.getList(O);
				if ($.isEmptyObject(t) || (e = t.song_id, S.existsSong(O, e) || a.unshift(t)), a.length > 0) return S.setList(O, a),
				y.playSong(O, e),
				Ttpod.playerManage.focusList("tempList"),
				!0
			}
			return ! 1
		}
	}
});
$.module("Ttpod.dynamicList",
function() {
	function t() {
		var t = Ttpod.ui.activePanel.find(".J_songItem[data-song]:first");
		return 0 == t.length ? !1: (t.trigger("click"), !0)
	}
	function a() {
		p = $.store.get("dynamicList_curPlayChannel") || "",
		c = $.store.get("dynamicList_curPlayAction") || ""
	}
	function e() {
		Ttpod.ui.content.delegate(".J_songItem[data-song]", "click dblclick",
		function() {
			var t = $(this),
			a = Ttpod.playerManage.getSongInfo(t);
			return t.hasClass("playState") ? (i.pause(), Ttpod.playerManage.logPlay(a, "pause")) : (t.hasClass("pauseState") ? i.play() : o(a), Ttpod.playerManage.logPlay(a, "play")),
			!1
		})
	}
	function n(t) {
		if (!t) return [];
		var a = $("#" + t),
		e = [];
		return a.find(".J_songItem[data-song]").each(function(t, a) {
			e.push(Ttpod.playerManage.getSongInfo($(a)))
		}),
		e
	}
	function o(t) {
		var a = Ttpod.ui.getHashParams();
		c == a.a && r.existsSong(d, t.song_id) || r.setList(d, n(a.pnlId)),
		c = a.a,
		p = Ttpod.ui.curChannel,
		i.playSong(d, t.song_id)
	}
	function s(t) {
		if ($(".J_songItem.playState", Ttpod.ui.content).removeClass("playState"), $(".J_songItem.pauseState", Ttpod.ui.content).removeClass("pauseState"), "radio" != t.listType && u.removeClass("playState pauseState"), t.listType == d) {
			var a = Ttpod.ui.getHashParams();
			if (!$.isEmptyObject(t.currSong)) {
				var e = $(".J_songItem[data-song^='song_id=" + t.currSong.song_id + "']", Ttpod.ui.content);
				e.addClass(t.playState + "State"),
				$("#nav a[data-tabkey=" + p + "]").addClass(t.playState + "State"),
				a.a == c && Ttpod.ui.focusScroll(e, Ttpod.ui.content, !0)
			}
			$.store.set("dynamicList_curPlayChannel", p),
			$.store.set("dynamicList_curPlayAction", c),
			t.last && a.a == c && Ttpod.ui.loadMoreFunc()
		}
	}
	var i,
	r,
	u,
	l = !1,
	d = "dynamicList",
	p = "",
	c = "";
	return {
		init: function() {
			l || (i = Ttpod.AudioPlayer.PlayerControl, r = Ttpod.AudioPlayer.ListControl, u = $("#nav a"), a(), e(), i.registerStatusChange(s), l = !0)
		},
		startup: function(t) {
			var a = Ttpod.ui.getHashParams();
			if (a.a != c || $.isEmptyObject(t)) return ! 1;
			var e = n(c + "Panel"),
			o = !1;
			return $.each(e,
			function(a, e) {
				return e.song_id == t.song_id ? (o = !0, !1) : void 0
			}),
			o || (e = [t].concat(e)),
			r.setList(d, e),
			i.playSong(d, t.song_id),
			!0
		},
		playDefault: function(a) {
			var e = Ttpod.ui.getHashParams();
			a = $.exists(a) ? a: e.play === !0,
			a && t()
		},
		refresh: function(a, e, o) {
			a == c + "Panel" && r.getListType() == d && (r.setList(d, n(a), o), this.updataSongItemState("#" + a)),
			$.parseBoolean(e) && i.ready(t)
		},
		isPlayAction: function(t) {
			return r.getListType() == d && c == t
		},
		updataSongItemState: function(t) {
			t = $(t);
			var a = r.getCurrSong();
			if (!$.isEmptyObject(a)) {
				var e = $(".J_songItem[data-song^='song_id=" + a.song_id + "']", t);
				e.removeClass("playState pauseState"),
				e.addClass(i.playState + "State")
			}
		}
	}
});
$.module("Ttpod.playerManage",
function() {
	function e(e) {
		e.currSong ? (g = e.listType, i = {
			song_id: e.currSong.song_id,
			song_name: e.currSong.song_name,
			singer_name: e.currSong.singer_name
		},
		document.title = "♬" + e.currSong.song_name + "-" + e.currSong.singer_name + " - " + Ttpod.config.name) : (i = null, g = ""),
		$.store.set("playerManage_curListType", g),
		$.store.set("playerManage_curSong", JSON.stringify(i))
	}
	function t() {
		n() || o() || a()
	}
	function n() {
		return Ttpod.dynamicList.playDefault()
	}
	function a() {
		if (!Ttpod.unionApi.isUnion()) {
			var e = !1,
			t = "";
			g = $.store.get("playerManage_curListType") || "",
			i = $.store.get("playerManage_curSong") ? JSON.parse($.store.get("playerManage_curSong")) : {},
			$.isEmptyObject(i) || (t = i.song_id),
			e || "dynamicList" != g || (e = Ttpod.dynamicList.startup(i)),
			e || "heart" != g || (e = Ttpod.heart.startup(t)),
			e || "tempbox" != g || (e = Ttpod.tempbox.startup(i)),
			e || "radio" != g || (e = Ttpod.radio.startup(i)),
			e || (e = Ttpod.heart.startup(t)),
			e || (e = Ttpod.tempbox.startup(i)),
			r()
		}
	}
	function o() {
		var e = $.parseParam(location.hash.replace(/&amp;/g, "&").replace(/#/g, "&").replace(/\?/g, "&")),
		t = $.parseParam(location.search.replace(/&amp;/g, "&").replace(/#/g, "&").replace(/\?/g, "&"));
		if (t.song_id && (e = {
			song_id: t.song_id
		}), !$.isEmptyObject(e)) {
			if ($.isNumeric(e.song_id) && e.song_id > 0) return e.song_name ? Ttpod.tempbox.play(e) : Ttpod.core.getResult({
				async: !1,
				action: "checkSong",
				jsonpCallback: "jsonp_check",
				data: {
					song_id: e.song_id
				},
				success: function(t) {
					t.data && Ttpod.core.getResult({
						action: "getSongDs",
						data: {
							song_id: e.song_id
						},
						timeout: 3e3,
						jsonpCallback: "jsonp_detail",
						success: function(t) {
							Ttpod.tempbox.play({
								song_id: e.song_id,
								song_name: t.data.songName,
								singer_name: t.data.singerName
							})
						},
						error: function() {
							a()
						}
					})
				}
			}),
			!0;
			var n = "a=searchlist&play=true";
			if (e.song_name && (n += "&q=" + encodeURIComponent(e.song_name)), e.singer_name && (n += "&singer_name=" + encodeURIComponent(e.singer_name)), e.song_name || e.singer_name) return $.history.load(n),
			!0
		}
		return ! 1
	}
	function r() {
		setTimeout(function() {
			Ttpod.AudioPlayer.PlayerControl.pause()
		},
		500)
	}
	var s = !1,
	i = null,
	g = "";
	return {
		init: function() {
			s || (s = !0, Ttpod.AudioPlayer.PlayerControl.registerStatusChange(e), Ttpod.AudioPlayer.PlayerControl.ready(function() {
				var e = Ttpod.AudioPlayer.ListControl.getBitrate();
				$("#userMenu .bitrate[data-bitrate=" + e + "]").addClass("active"),
				t()
			}), $("#page").delegate(".J_pausePlayer", "click",
			function() {
				Ttpod.AudioPlayer.PlayerControl.pause()
			}))
		},
		getSongInfo: function(e) {
			var t,
			n = e.attr("data-song");
			if (n) try {
				t = $.parseParam(n)
			} catch(a) {}
			return t
		},
		focusList: function(e) {
			var t = $("#listNew"),
			n = $("#" + e + "Content");
			$(".list ul", t).hide(),
			$(".toolsBar", t).hide(),
			$("a:not(.close)", t).removeClass("active"),
			$("a." + e, t).addClass("active"),
			$("#" + e + "Footer").show(),
			n.show(),
			Ttpod.ui.focusScroll(n.find(".playState,.pauseState"), $("#listNew .list"))
		},
		logPlay: function(e, t, n) {
			var n = n || Ttpod.ui.curChannel,
			a = $.extend({
				a: "play_song",
				title: $.query.getHash("title") || "",
				cid: n + "_" + Ttpod.config.page
			},
			{
				song_name: e.song_name,
				singer_name: e.singer_name,
				status: t
			});
			Ttpod.core.log(a)
		}
	}
});
$.module("Ttpod.download",
function() {
	function n(n, o) {
		var t = {
			song_id: n.song_id,
			code: $.CRC32(n.song_id),
			from: Ttpod.config.cdnTest ? "search": ""
		};
		Ttpod.core.getResult({
			action: "getSongResource",
			data: t,
			jsonpCallback: "jsonp_ting",
			success: function(n) {
				var t = n.data[0],
				i = t.url_list;
				if (i) {
					for (var e = [], a = 0; 2 > a && a < i.length; a++) e.push(i[a]);
					n.data[0].url_list = e,
					"function" == typeof o && o(n.data[0])
				}
			},
			error: function() {
				o([])
			}
		})
	}
	function o(n, o, t) {
		var e,
		a;
		if ($.isNumeric(o)) {
			var d = i(n.url_list, o);
			e = d.url,
			a = d.size
		} else e = o,
		a = n.size;
		a = Math.round(1024 * parseFloat(a) * 1024);
		var r = e.substring(e.lastIndexOf("."), e.indexOf("?")),
		s = n.singer_name + "-" + n.song_name + r,
		l = e + "&n=" + s;
		if (!Ttpod.unionApi.isUnion() || Ttpod.unionApi.isUnion("zte")) if ($.os.webkit && t & t.length > 0) t.attr({
			href: l,
			download: l
		});
		else {
			var g = document.createElement("iframe");
			$("#framedown").html(g),
			$(g).attr("src", l)
		} else Ttpod.unionApi.musicDownload({
			id: n.song_id,
			song: n.song_name,
			name: n.singer_name + " - " + n.song_name,
			singer: n.singer_name,
			pic: Ttpod.common.getPic(n.singer_id, 76),
			album: "",
			url: Ttpod.unionApi.isUnion("91") ? l: e,
			from: Ttpod.config.from,
			os: Ttpod.config.client.os,
			ext: r,
			size: a
		});
		Ttpod.core.log({
			a: "download",
			cid: Ttpod.download.downType + "_" + Ttpod.config.page
		})
	}
	function t(n, o) {
		if (0 == n.lenth) return "";
		for (var t = 0; t < o.length; t++) for (var i = 0; i < n.length; i++) if (n[i].bitrate == o[t]) return n[i].url;
		return n[0].url
	}
	function i(n, o) {
		if (0 == n.lenth) return {};
		for (var t = 0; t < o.length; t++) for (var i = 0; i < n.length; i++) if (n[i].bitrate == o[t]) return n[i];
		return n[0]
	}
	var e = !1,
	a = null;
	return {
		songInfo: {},
		downType: "list",
		init: function() {
			e || (e = !0, a = a = Ttpod.AudioPlayer.ListControl, this.registerEvents())
		},
		registerEvents: function() {
			var n = this;
			$("#main").delegate(".download", "click",
			function() {
				var o = Ttpod.playerManage.getSongInfo($(this).parents(".J_songItem"));
				return Ttpod.download.downType = "list",
				n.openDown(o),
				!1
			}),
			$(".J_DownloadMusic[data-url]").live("click",
			function() {
				var n = $(this),
				t = n.data("url");
				if (t) {
					var i = Ttpod.playerManage.getSongInfo(n);
					return Ttpod.download.downType = "index",
					o(i, t, n)
				}
				return ! 1
			}),
			$("#p_download").bind("click",
			function() {
				var o = a.getCurrSong();
				return Ttpod.download.downType = "player",
				n.openDown(o),
				!1
			}),
			$("body").delegate(".songDownload .close", "click",
			function() {
				$.ui.dialog.close(!0)
			}),
			$("body").delegate("#download", "click",
			function() {
				var t = $(this),
				i = $(".songDownload input:radio:checked");
				Ttpod.download.downType = "dialog",
				o(n.songInfo, i.attr("data-bitrate"), t),
				$.ui.dialog.close(!0)
			})
		},
		openDown: function(t) {
			var i = this;
			Ttpod.config.isDownload && ("union" == Ttpod.config.page || "voice" == Ttpod.config.page || Ttpod.user.isLogin() ? ($.ui.dialog.close(!0), n(t,
			function(n) {
				i.songInfo = n,
				n.url_list.length ? !Ttpod.unionApi.isUnion() || Ttpod.unionApi.isUnion("zte") ? $.ui.dialog.open($.template(Ttpod.tmpl.download, n), {
					oId: "downloadLayer",
					width: 480,
					height: 300
				}) : o(i.songInfo, 96, null) : $.ui.dialog.timing("<span class='prompt'>资源下载出现错误,请您稍后再试</span>", 2e3, {
					width: 250,
					height: 70,
					top: 40
				})
			})) : Ttpod.user.login())
		},
		downloadBatch: function(n) {
			$.isArray(n) && (n = n.join(","));
			var o = {
				song_id: n,
				code: $.CRC32(n),
				from: Ttpod.config.cdnTest ? "search": ""
			};
			Ttpod.core.getResult({
				action: "getSongResource",
				data: o,
				jsonpCallback: "jsonp_ting",
				success: function(n) {
					for (var o = 0, i = n.data.length; i > o; o++) {
						var e = n.data[o],
						a = t(e.url_list, 96),
						d = a.substring(a.lastIndexOf("."), a.indexOf("?")),
						r = e.singer_name + " - " + e.song_name,
						s = a + "&n=" + r + d,
						l = {
							id: e.song_id,
							song: e.song_name,
							name: r,
							singer: e.singer_name,
							pic: Ttpod.common.getPic(e.singer_id, 76),
							album: "",
							url: Ttpod.unionApi.isUnion("91") ? s: a,
							from: Ttpod.config.from,
							os: Ttpod.config.client.os,
							ext: d,
							size: Math.round(1024 * parseFloat(e.size) * 1024)
						};
						Ttpod.unionApi.musicDownload(l)
					}
				}
			})
		}
	}
});
$.module("Ttpod.unionApi",
function() {
	function o(o) {
		var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		n = o;
		n = n.replace(/\r\n/g, "\n");
		for (var e = "", r = 0; r < n.length; r++) {
			var t = n.charCodeAt(r);
			128 > t ? e += String.fromCharCode(t) : t > 127 && 2048 > t ? (e += String.fromCharCode(t >> 6 | 192), e += String.fromCharCode(63 & t | 128)) : (e += String.fromCharCode(t >> 12 | 224), e += String.fromCharCode(t >> 6 & 63 | 128), e += String.fromCharCode(63 & t | 128))
		}
		o = e;
		var i,
		l,
		c,
		s,
		u,
		d = "",
		m = "",
		f = "",
		w = 0;
		do i = o.charCodeAt(w++),
		l = o.charCodeAt(w++),
		m = o.charCodeAt(w++),
		c = i >> 2,
		s = (3 & i) << 4 | l >> 4,
		u = (15 & l) << 2 | m >> 6,
		f = 63 & m,
		isNaN(l) ? u = f = 64: isNaN(m) && (f = 64),
		d = d + a.charAt(c) + a.charAt(s) + a.charAt(u) + a.charAt(f),
		i = l = m = "",
		c = s = u = f = "";
		while (w < o.length);
		return d
	}
	function a(o) {
		if ("android" == o.os) switch (o.from.toString()) {
		case "91":
			m.musicDownload(o);
			break;
		case "360":
			f.musicDownload(o);
			break;
		case "vivo":
			h.musicDownload(o);
			break;
		case "qq":
			w.musicDownload(o);
			break;
		case "wandoujia":
			p.musicDownload(o);
			break;
		case "baofeng":
			D.musicDownload(o);
			break;
		case "sogou":
			g.musicDownload(o);
			break;
		case "mopo":
			k.musicDownload(o);
			break;
		case "baidu":
			b.musicDownload(o);
			break;
		case "ali":
			y.musicDownload(o);
			break;
		case "lenovo":
			S.musicDownload(o);
			break;
		default:
			e(o.url)
		} else if ("ios" == o.os) switch (o.from.toString()) {
		case "itools":
			location.href = v.musicDownload(o);
			break;
		case "91":
			m.musicDownload(o);
			break;
		case "tb":
			C.musicDownload(o);
			break;
		default:
			e(o.url)
		} else e(o.url)
	}
	function n(o) {
		if ("android" == o.os) switch (o.from.toString()) {
		case "91":
			m.softwareDownload(o);
			break;
		case "360":
			f.softwareDownload(o);
			break;
		case "vivo":
			h.softwareDownload(o);
			break;
		case "qq":
			w.softwareDownload(o);
			break;
		case "wandoujia":
			p.softwareDownload(o);
			break;
		case "baofeng":
			D.softwareDownload(o);
			break;
		case "sogou":
			g.softwareDownload(o);
			break;
		case "mopo":
			k.softwareDownload(o);
			break;
		case "baidu":
			b.softwareDownload(o);
			break;
		case "ali":
			y.softwareDownload(o);
			break;
		case "lenovo":
			S.softwareDownload(o);
			break;
		default:
			e(o.url)
		} else if ("ios" == o.os) switch (o.from.toString()) {
		case "tb":
			C.softwareDownload(o);
			break;
		case "91":
			window.external.GoToModule("application", "appstore", "https://web.archive.org/web/20190615075516/http://itunesapp.sj.91.com/SoftDetail.aspx?platform=iPhone&ClientVer=5.0&fw=7.0&id=483336353");
			break;
		default:
			e(o.url)
		} else e(o.url)
	}
	function e(o) {
		location.href = o
	}
	function r(o) {
		var a = ("union" == Ttpod.config.page || "voice" == Ttpod.config.page) && !!t();
		return "undefined" == typeof o ? a: a && t(o) == t()
	}
	function t(o) {
		return l[o || Ttpod.config.from]
	}
	function i(o, a, n) {
		var e,
		r = [];
		for (e in a) r.push(n !== !1 ? e + "=" + encodeURIComponent(a[e]) : e + "=" + a[e]);
		var t = o;
		return t += -1 == t.indexOf("?") ? "?": "&",
		t += r.join("&")
	}
	var l = {
		360: "f568",
		91: "f666",
		ali: "f1139",
		baidu: "f861",
		baofeng: "f674",
		itools: "f844",
		lenovo: "f1693",
		mopo: "f776",
		qq: "f667",
		sogou: "f712",
		tb: "f0",
		vivo: "f668",
		wandoujia: "f669",
		zte: "f963"
	},
	c = "未知",
	s = null,
	u = "com.sds.android.ttpod",
	d = "佚名",
	m = {
		_styleSrc: "https://web.archive.org/web/20190615075516/http://www.dongting.com/",
		_musicDownloadSrc: "https://web.archive.org/web/20190615075516/http://www.dongting.com/",
		_softwareDownloadSrc: "ttpod.com",
		musicDownload: function(o) {
			var a = {
				url: o.url,
				name: o.name,
				singer: o.singer || d,
				album: o.album || c,
				module: "music",
				action: "download",
				identify: u,
				src: this._musicDownloadSrc
			};
			top.location.href = i(this._styleSrc, a)
		},
		softwareDownload: function(o) {
			var a = {
				url: o.url,
				name: o.name,
				vername: o.vername,
				icon: o.icon,
				module: "soft",
				action: "download",
				vercode: o.vername,
				identify: u,
				src: this._softwareDownloadSrc
			};
			top.location.href = i(this._styleSrc, a)
		}
	},
	f = {
		musicDownload: function(o) {
			var a = {
				name: o.name,
				"360ext": o.ext
			};
			top.location.href = i(o.url, a)
		},
		softwareDownload: function(o) {
			var a = {
				name: o.name,
				"360ext": "apk"
			};
			top.location.href = i(o.url, a)
		}
	},
	w = {
		musicDownload: function(a) {
			var n = {
				u: a.url,
				t: a.name,
				m: "music",
				tj: "49"
			};
			location.href = "qqpro://" + o(i("d/", n))
		},
		softwareDownload: function(a) {
			var n = {
				u: a.url,
				t: a.name,
				v: a.vername,
				i: a.icon,
				m: "application",
				p: u,
				tj: "49"
			};
			location.href = "qqpro://" + o(i("d/", n))
		}
	},
	p = {
		musicDownload: function(o) {
			var a = {
				url: o.url,
				title: o.name
			};
			parent.externalCall("portal", "-musicurlarray", JSON.stringify([a]))
		},
		softwareDownload: function(o) {
			parent.externalCall("portal", "appdownload", JSON.stringify([{
				url: o.url,
				title: o.name,
				icon: o.icon
			}]))
		}
	},
	h = {
		musicDownload: function(o) {
			var a = {
				downloadUrl: o.url,
				musicName: o.name
			};
			parent.downloadMusic(JSON.stringify([a]))
		},
		softwareDownload: function(o) {
			var a = {
				downloadUrl: o.url,
				appName: o.name,
				"package": u
			};
			parent.downloadApp(JSON.stringify([a]))
		}
	},
	D = {
		musicDownload: function(o) {
			var a = {
				downloadUrl: o.url,
				musicName: o.name
			};
			try {
				window.external.TT_DownloadMusic(JSON.stringify([a]))
			} catch(n) {}
		},
		softwareDownload: function(o) {
			var a = {
				downloadUrl: o.url,
				appName: o.name,
				"package": u
			};
			try {
				window.external.TT_DownloadApp(JSON.stringify([a]))
			} catch(n) {}
		}
	},
	g = {
		musicDownload: function(o) {
			var a = {
				name: encodeURIComponent(o.name),
				url: o.url,
				extension: o.ext.replace(".", ""),
				refer: "music_ttpod",
				type: "music"
			};
			window.external.DownloadRes(JSON.stringify(a), parseInt(o.id))
		},
		softwareDownload: function(o) {
			var a = {
				name: encodeURIComponent(o.name),
				url: o.url,
				type: "app",
				extension: "apk",
				iconurl: o.icon,
				refer: "music_ttpod",
				apkVersion: o.vername,
				packageName: u
			};
			window.external.DownloadRes(JSON.stringify(a), 999999)
		}
	},
	v = {
		musicDownload: function(a) {
			return "itools://" + o(encodeURIComponent(a.name) + "|" + a.url + "|type=music&action=import&bid=" + u)
		},
		softwareDownload: function(a) {
			return "itools://" + o(encodeURIComponent(a.name) + "|" + a.url + "|type=app")
		}
	},
	b = {
		musicDownload: function(o) {
			var a = {
				type: "music",
				id: o.id,
				url: o.url,
				name: o.name,
				size: o.size,
				icon: o.pic,
				other: {
					ext: o.ext.slice(1)
				}
			};
			return s.download(a)
		},
		softwareDownload: function(o) {
			var a = {
				type: "app",
				id: u,
				url: o.url,
				name: o.name,
				size: o.size,
				icon: o.icon,
				other: {
					versionCode: "100",
					versionName: o.vername
				}
			};
			return s.download(a)
		}
	},
	k = {
		musicDownload: function(o) {
			var a = {
				type: "music",
				name: o.name + o.ext
			};
			top.location.href = i(o.url, a)
		},
		softwareDownload: function(o) {
			var a = {
				type: "apk",
				name: o.name + ".apk",
				icon: o.icon,
				packagename: u
			};
			top.location.href = i(o.url, a)
		}
	},
	y = {
		musicDownload: function(o) { ({
				type: "music",
				id: o.id,
				url: o.url,
				name: o.name,
				size: o.size,
				icon: o.pic,
				other: {
					ext: o.ext.slice(1)
				}
			});
			return Ali.downloadMusic(o.url, o.name, o.name, window.location.href, null)
		},
		softwareDownload: function(o) { ({
				type: "app",
				id: u,
				url: o.url,
				name: o.name,
				size: o.size,
				icon: o.icon,
				other: {
					versionCode: "100",
					versionName: o.vername
				}
			});
			return Ali.downloadApp(o.url, o.name, o.name, window.location.href, null)
		}
	},
	S = {
		musicDownload: function(o) {
			var a = o.ext.replace(/^\./, ""),
			n = {
				contentType: a,
				title: o.name,
				url: o.url
			};
			return leplus.downloadMusic(JSON.stringify(n))
		},
		softwareDownload: function(o) {
			var a = o.url.split("/"),
			n = a[a.length - 1];
			n = n.replace(/\.apk$/, "");
			var e = {
				contentType: "apk",
				packageName: n,
				size: o.size,
				softName: o.name,
				iconUrl: o.icon,
				url: o.url
			};
			return leplus.downloadApp(JSON.stringify(e))
		}
	},
	C = {
		musicDownload: function(o) {
			var a = {
				from: "ttpod",
				name: o.name,
				singername: o.name,
				albumname: o.album,
				format: o.ext.slice(1),
				source: o.url
			};
			window.location.href = i("tongbu://music/download/", a, !1)
		},
		softwareDownload: function() {
			try {
				window.TBjumpApp()
			} catch(o) {
				window.location.href = "tongbu://jp?url=http://v2.tongbu.com/appshare/app/483336353"
			}
		}
	};
	return {
		init: function() {
			"baidu" == Ttpod.config.from ? $.getScript("https://web.archive.org/web/20190615075516/http://wap.baidu.com/static/as/bdsuite/js/BaiduExternal.js",
			function() {
				s = new BaiduExternal(),
				s.init("music", 2002)
			}) : "ali" == Ttpod.config.from ? $.getScript("https://web.archive.org/web/20190615075516/http://static01.zhushou.yunos.com/thirdparty/zhushou_api.js",
			function() {
				Ali.registerSearch(function(o) {
					location.href = "union.html#a=searchlist&q=" + o
				})
			}) : "lenovo" === Ttpod.config.from ? $.getScript("https://web.archive.org/web/20190615075516/http://app.sj.lenovomm.com/scripts/leplus-ao.js",
			function() {}) : "tb" === Ttpod.config.from && $.getScript("https://web.archive.org/web/20190615075516/http://v2.tongbu.com/appshare/api/partnersdownload?appleid=483336353")
		},
		openUrl: e,
		isUnion: r,
		getUnionF: t,
		musicDownload: a,
		softwareDownload: n
	}
});
$.module("Ttpod.main",
function() {
	function t() {
		p || (i(), Ttpod.ui.init({
			filterLogParams: ["size", "page", "r", "pnlId", "tabId", "r"],
			chanel: "|index|radio|plaza|albumlist|ranklist|taglist|singer|searchlist|annual|"
		}), n(), e(), a(), p = !0)
	}
	function i() {
		Ttpod.config.isOpen || $.cookie("authorize") || $.getScript("https://web.archive.org/web/20190615075516/http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
		function() {
			return "香港" == remote_ip_info.province || "台湾" == remote_ip_info.province ? ($.cookie("authorize", "false"), window.location = "/licence.html") : void $.cookie("authorize", "true")
		})
	}
	function n() {
		var t = {
			plaza: h,
			singer: b,
			singerlist: v,
			singersongs: T,
			taglist: y,
			ranklist: k,
			albumlist: P,
			ranksongs: w,
			tagsongs: _,
			albumsongs: x,
			searchlist: C,
			index: f
		};
		Ttpod.ui.registerRouter(t,
		function(t, i) {
			"searchlist" != t.a && (C.preNav = i)
		},
		function() {})
	}
	function e() {
		"union" == Ttpod.config.page && (Ttpod.config.defaultNav = "index"),
		Ttpod.skin.init(),
		Ttpod.player.init(),
		Ttpod.user.init({
			event: {
				change: function(t, i) {
					$("#userInfo").html(Ttpod.core.template(Ttpod.tmpl.userInfo, {
						data: i
					})),
					$("#userInfo .loginActive").hover(function() {
						$(this).addClass("loginActiveHover")
					},
					function() {
						$(this).removeClass("loginActiveHover")
					})
				}
			}
		}),
		Ttpod.heart.init(),
		Ttpod.radio.init(),
		Ttpod.tempbox.init(),
		Ttpod.dynamicList.init(),
		Ttpod.playerManage.init(),
		Ttpod.feedback.init(),
		Ttpod.menu.init(),
		Ttpod.download.init(),
		C.init(),
		Ttpod.unionApi.init()
	}
	function a() {
		var t = (new Date().getTime() - Ttpod.config.enterTime, Ttpod.config.from.toString()),
		i = -1 != t.indexOf("app"),
		n = -1 != t.indexOf("storm");
		if ($("body").addClass("page-" + t), l(), c(), r(), "index" == Ttpod.config.page && !i && !n) {
			var e = $('<a title="欢迎使用' + Ttpod.config.name + '，谢谢您的使用"></a>');
			$("#header .otherBar").prepend(e),
			e.click(function() {
				return o(2),
				!1
			})
		}
		Ttpod.unionApi.isUnion() && $("body").addClass("page-" + Ttpod.config.client.os),
		s(),
		$.query.get("q") && (location.href = "#a=searchlist&q=" + $.query.get("q"))
	}
	function o() {
		location.href = "files/ttpod-setup.exe?v=" + Ttpod.config.assetVersion
	}
	function s() {
		$("body").delegate(".J_downMobile", "click",
		function() {
			return Ttpod.unionApi.isUnion() ? (downUrl = Ttpod.unionApi.getUnionF() ? "android" == Ttpod.config.client.os ? "https://web.archive.org/web/20190615075516/http://d1.ttpod.com/download/android/" + Ttpod.unionApi.getUnionF() + "/TTPod_Android.apk": "ios" == Ttpod.config.client.os ? "https://web.archive.org/web/20190615075516/https://itunes.apple.com/cn/app/id483336353?mt=8": "https://web.archive.org/web/20190615075516/http://www.ttpod.com/download": "https://web.archive.org/web/20190615075516/http://www.ttpod.com/download", Ttpod.unionApi.softwareDownload({
				from: Ttpod.config.from,
				os: Ttpod.config.client.os,
				name: Ttpod.config.name,
				url: downUrl,
				vername: "7",
				size: 9961472,
				icon: "https://web.archive.org/web/20190615075516/http://app.ttdtweb.com/dongting/images/app-6374b8.png"
			}), Ttpod.core.log({
				a: "downApp",
				cid: $(this).data("ds") + "_" + Ttpod.config.page
			}), !1) : !0
		})
	}
	function l() {
		var t = Ttpod.ui.content,
		i = $("#anchorTop"),
		n = parseInt($("#anchorTop").css("bottom"));
		t.bind("scroll",
		function() {
			t.scrollTop() >= 500 ? i.show().stop().animate({
				bottom: n
			},
			{
				queue: !1,
				duration: 300
			}) : i.stop().animate({
				bottom: -n
			},
			{
				queue: !1,
				duration: 100
			})
		}),
		i.click(function() {
			t.animate({
				scrollTop: 0
			},
			{
				queue: !1,
				duration: 500
			})
		})
	}
	function r() {
		var t = $("#nav li");
		t.hover(function() {
			$(this).find(".subNav").stop().slideDown("fast"),
			$(this).find(".showBanner").stop().slideDown("fast"),
			$(this).find(".showBanner2").stop().slideDown("fast")
		},
		function() {
			$(this).find(".subNav").stop().hide(),
			$(this).find(".showBanner").stop().hide(),
			$(this).find(".showBanner2").stop().hide()
		})
	}
	function c() {
		$(window).bind("resize",
		function() {
			var t = $(window).width(),
			i = "";
			i = 1380 >= t ? "page-1024": t > 1380 && 1680 > t ? "page-1440": "page-1920",
			$("body").removeClass("page-1024 page-1440 page-1920").addClass(i)
		}),
		$(window).trigger("resize")
	}
	function d(t, i) {
		var n = new Array();
		for (var e in t) n.push(t[e]);
		for (var a = new Array(), o = 0; i > o && n.length > 0; o++) {
			var s = Math.floor(Math.random() * n.length);
			a[o] = n[s],
			n.splice(s, 1)
		}
		return a
	}
	var p = !1,
	u = Ttpod.ui.renderCommon,
	g = Ttpod.ui.loadMore,
	m = (Ttpod.ui.renderPage, {
		data: {},
		idKeys: {
			banner: 492,
			albumlist: 280,
			ranklist: 281,
			singer: 46,
			hots: 111,
			news: 112,
			hotSearch: 969
		},
		list: function(t, i) {
			if ($.exists(t) && !$.isNumeric(t) && (t = this.idKeys[t]), !$.isNumeric(t)) return null;
			var n = this.data[t];
			$.exists(n) && $.isFunction(i) && i.call(this, n),
			Ttpod.core.getResult({
				action: "getitlily",
				data: {
					channelid: t
				},
				success: function(n) {
					$.isFunction(i) && (this.data[t] = n, i.call(this, n))
				}
			})
		}
	}),
	f = {
		pnlPty: {
			title: "首页",
			tab: "index"
		},
		render: function(t) {
			var i = this;
			Ttpod.ui.renderPage({
				url: "tmpl/index.html",
				params: t,
				title: "",
				callback: function(t) {
					i.panel = t,
					i.initBanner(),
					i.initSong(),
					i.initSinger(),
					i.initAlbumlist()
				}
			})
		},
		initBanner: function() {
			var t = this;
			Ttpod.core.getResult({
				action: "getposter",
				success: function(i) {
					function n(t) {
						var i = d + t;
						0 > i ? i = 0: i > c - 3 && (i = c - 3),
						o.animate({
							left: -(i * r)
						},
						{
							queue: !1,
							duration: 200
						}),
						d = i
					}
					var e = i.data,
					a = $(".slideBanner", t.panel),
					o = $("ul", a),
					s = $(".prev", a),
					l = $(".next", a),
					r = 252,
					c = e.length;
					if ($.isEmptyObject(e)) a.remove();
					else {
						o.html($.template(Ttpod.tmpl.banner, i)),
						o.css({
							width: r * c
						});
						var d = 0;
						a.hover(function() {
							$(this).addClass("slideBanner-hover")
						},
						function() {
							$(this).removeClass("slideBanner-hover")
						}),
						s.on("click",
						function() {
							n( - 1)
						}),
						l.on("click",
						function() {
							n(1)
						})
					}
				}
			})
		},
		initSong: function() {
			var t = $("#hotSongList"),
			i = $(".tag", t),
			n = $(".hot-song-c", t),
			e = $(".lossLess-tips"),
			a = $(".down-list-box");
			i.on("mouseover",
			function() {
				var t = $(this).attr("data-tag");
				i.removeClass("active"),
				$(this).addClass("active"),
				n.hide();
				var e = n.filter("[data-tag=" + t + "]");
				e.show(),
				e.data("data-isloaded") || m.list(t,
				function(t) {
					e.html($.template(Ttpod.tmpl.hotSongList, t)),
					e.data("data-isloaded", !0)
				})
			}),
			t.delegate(".song-paging [data-index]", "mouseover",
			function() {
				var t = $(this),
				i = t.data("index"),
				n = t.parents(".hot-song-c[data-tag]");
				n.find(".song-paging em").removeClass("on"),
				t.addClass("on");
				var e = $(".song-items", n);
				e.hide(),
				e.eq(i).show(),
				n.attr("data-active", i)
			}),
			t.delegate(".J_allPlay", "click",
			function() {
				var t = $(this).parents(".hot-song-c[data-tag]"),
				i = t.attr("data-active"),
				n = t.find("ul[class='song-items']:eq(" + i + ")"),
				e = [];
				$(".J_songItem[data-song]", n).each(function(t) {
					var i = $(this);
					0 == t && i.trigger("click"),
					e.push(Ttpod.playerManage.getSongInfo(i)),
					i.find(".add").removeClass("add").addClass("added")
				}),
				Ttpod.tempbox.addList(e)
			}),
			t.delegate(".J_allDown", "click",
			function() {
				var t = $(this).parents(".hot-song-c[data-tag]"),
				i = t.attr("data-active"),
				n = t.find("ul[class='song-items']:eq(" + i + ")"),
				e = [];
				$(".J_songItem[data-song]", n).each(function() {
					e.push(Ttpod.playerManage.getSongInfo($(this)).song_id)
				}),
				Ttpod.download.downloadBatch(e)
			}),
			t.delegate(".lossLess", "mouseover",
			function() {
				var t = $(this).data(),
				i = t.size || "",
				n = t.type || "";
				$(".song-info", e).html(i + "/" + n);
				var a = $(this).position(),
				o = a.left - e.width() + 24,
				s = a.top + e.height() / 2 + $(this).height() / 2;
				e.css({
					left: o,
					top: s,
					display: "block"
				})
			}),
			e.bind("mouseover",
			function() {
				$(this).show()
			}),
			e.bind("mouseleave",
			function() {
				$(this).hide()
			}),
			t.delegate(".lossLess", "mouseleave",
			function() {
				e.hide()
			}),
			t.delegate(".download", "mouseover",
			function() {
				var t = $(this).parent().next(),
				i = t.html();
				$(".down-list", a).html(i).show();
				var n = $(this).position(),
				e = n.left,
				o = 146 == a.height() ? a.height() : 146,
				s = n.top + o / 2;
				a.css({
					left: e,
					top: s,
					display: "block"
				})
			}),
			t.delegate(".download", "mouseleave",
			function() {
				a.hide()
			}),
			a.bind("mouseover",
			function() {
				a.show()
			}),
			a.bind("mouseleave",
			function() {
				a.hide()
			}),
			$(".down-list-box").delegate(".lossLess-song", "click",
			function() {
				$.ui.dialog.open(t, {
					oId: "downloadLayer",
					width: 360,
					height: 200
				})
			}),
			i.first().trigger("mouseover")
		},
		initSinger: function() {
			Ttpod.core.getResult({
				action: "getitlily",
				data: {
					channelid: 110,
					page: 1,
					size: 50
				},
				success: function(t) {
					$.isEmptyObject(t.data) || $("#hotSingerList").html($.template(Ttpod.tmpl.hotSingerList, {
						data: d(t.data, 6)
					}))
				}
			})
		},
		initAlbumlist: function() {
			Ttpod.core.getResult({
				action: "getitlily",
				data: {
					channelid: m.idKeys.albumlist
				},
				success: function(t) {
					$("#recommendSongList").html($.template(Ttpod.tmpl.ztlb, {
						data: t.data.slice(0, 12),
						type: "recommend"
					}))
				}
			})
		}
	},
	h = {
		version: 0,
		pnlPty: {
			title: "广场",
			tab: "plaza",
			isLoadMore: !0,
			isKeepPanel: !0
		},
		render: function(t) {
			var i = this;
			u({
				action: "getNewestPlaza",
				jsonpCallback: "jsonp_plaza",
				tmpl: Ttpod.tmpl.plaza,
				params: t,
				callback: function(n, e, a) {
					i.version = a.extra.version,
					Ttpod.dynamicList.refresh(e.id, t.play, !0)
				}
			})
		},
		loadMore: function(t) {
			t.version = this.version,
			g({
				action: "getPlaza",
				jsonpCallback: "jsonp_plaza",
				tmpl: Ttpod.tmpl.plaza,
				params: t,
				extra: ".commonList",
				callback: function(t, i, n) {
					n.extra.all_page == n.extra.curr_page && Ttpod.ui.setPnlPty(t, {
						hasMore: !1
					}),
					Ttpod.dynamicList.refresh(i.id)
				}
			})
		}
	},
	b = {
		pnlPty: {
			title: "歌手",
			tab: "singer"
		},
		render: function(t) {
			t.channelid = m.idKeys.singer,
			t.detail = !1,
			u({
				action: "getitlily",
				tmpl: Ttpod.tmpl.gsfl,
				params: t,
				jsonpCallback: "jsonp_singer"
			})
		}
	},
	v = {
		pnlPty: {
			title: "歌手列表",
			pageStyle: "subPage",
			tab: "singer",
			isLoadMore: !0
		},
		render: function(t) {
			t.detail = !1,
			u({
				title: t.title,
				action: "getitlily",
				tmpl: Ttpod.tmpl.gslb,
				params: t,
				jsonpCallback: "jsonp_singerlist"
			})
		},
		loadMore: function(t) {
			t.detail = !1,
			g({
				action: "getitlily",
				tmpl: Ttpod.tmpl.gslb,
				jsonpCallback: "jsonp_singerlist",
				params: t,
				extra: ".singerTwo"
			})
		}
	},
	T = {
		pnlPty: {
			title: "歌手歌曲",
			pageStyle: "subPage",
			tab: "singer",
			isLoadMore: !0
		},
		render: function(t) {
			t.q = t.singername,
			u({
				title: t.singername,
				action: "searchSong",
				tmpl: Ttpod.tmpl.singersongs,
				params: t,
				jsonpCallback: "jsonp_search",
				callback: function(i, n) {
					Ttpod.core.getResult({
						action: "getSingerPic",
						data: {
							artist: t.singername,
							rand: !0,
							code: $.CRC32(t.singername)
						},
						jsonpCallback: "jsonp_singerpic",
						success: function(t) {
							t.data.singerPic && $("#singersongsPanel .info img:first-child").attr("src", t.data.singerPic)
						}
					}),
					Ttpod.dynamicList.refresh(n.id, t.play)
				}
			})
		},
		loadMore: function(t) {
			t.q = t.singername,
			g({
				action: "searchSong",
				tmpl: Ttpod.tmpl.bflb,
				params: t,
				jsonpCallback: "jsonp_search",
				extra: ".commonList",
				callback: function(t, i) {
					Ttpod.dynamicList.refresh(i.id)
				}
			})
		}
	},
	y = {
		pnlPty: {
			title: "分类",
			tab: "taglist"
		},
		render: function(t) {
			u({
				action: "taglist",
				tmpl: Ttpod.tmpl.gdlb,
				params: t,
				jsonpCallback: "jsonp_taglist"
			})
		}
	},
	k = {
		pnlPty: {
			title: "排行",
			tab: "ranklist"
		},
		render: function(t) {
			t.detail = !1,
			t.channelid = m.idKeys.ranklist,
			u({
				action: "getitlily",
				tmpl: Ttpod.tmpl.phlb,
				params: t,
				jsonpCallback: "jsonp_ranklist"
			})
		}
	},
	w = {
		pnlPty: {
			title: "排行歌曲",
			pageStyle: "subPage",
			tab: "ranklist",
			isLoadMore: !0
		},
		render: function(t) {
			t.detail = !0,
			u({
				title: t.title,
				action: "getitlily",
				tmpl: Ttpod.tmpl.gqlb,
				params: t,
				jsonpCallback: "jsonp_ranksongs",
				callback: function(i, n) {
					Ttpod.dynamicList.refresh(n.id, t.play)
				}
			})
		},
		loadMore: function(t) {
			t.detail = !1,
			g({
				action: "getitlily",
				tmpl: Ttpod.tmpl.gqlb,
				params: t,
				jsonpCallback: "jsonp_ranksongs",
				extra: ".commonList",
				callback: function(t, i) {
					Ttpod.dynamicList.refresh(i.id)
				}
			})
		}
	},
	P = {
		pnlPty: {
			title: "专题",
			tab: "albumlist"
		},
		render: function(t) {
			var i = this;
			t.channelid = m.idKeys.albumlist,
			t.detail = !1,
			u({
				action: "getitlily",
				tmpl: Ttpod.tmpl.ztlb,
				params: t,
				jsonpCallback: "jsonp_albumlist",
				callback: function() {
					t.channelid = m.idKeys.banner,
					t.detail = !1,
					Ttpod.core.getResult({
						action: "getposter",
						data: t,
						success: function(t) {
							for (var n = "", e = 0; e < t.data.length; e++) {
								var a = t.data[e];
								0 == a.type && (n += "<li> <a href='#a=albumsongs&channelid=" + a.id + "&title=" + a.title + "&type_flag=albumlist&t_type=poster&pic_url=" + a.pic_url + "'><img src='" + a.pic_url + "'/></a></li>")
							}
							$("#albumlistPanel .banner ul").html(n),
							i.bindEvent()
						}
					})
				}
			})
		},
		resizeBanner: function() {
			var t = $("#main").width();
			if (0 == t) {
				var i = document.body.clientWidth;
				t = i - 338
			}
			var n,
			e = parseInt(t / 215),
			a = 215 * e - 20 - 15;
			e > 2 ? ($("#albumlistPanel .wrapBanner").css("width", a), n = a) : ($("#albumlistPanel .wrapBanner").css("width", 395), n = 395),
			$("#albumlistPanel .right").css(640 >= n ? {
				width: 0
			}: {
				width: n - 640
			})
		},
		bindEvent: function() {
			function t() {
				e.prevPage.die("click"),
				e.contain.css({
					left: -a
				}).find("li:last").insertBefore(e.contain.find("li")[0]),
				e.contain.animate({
					left: 0
				},
				300,
				function() {
					e.prevPage.live("click",
					function() {
						t()
					})
				})
			}
			function i() {
				e.nextPage.die("click"),
				e.contain.animate({
					left: -a
				},
				300,
				function() {
					e.contain.css({
						left: 0
					}).find("li:first").appendTo(e.contain),
					e.nextPage.live("click",
					function() {
						i()
					})
				})
			}
			var n = this;
			"index" == Ttpod.config.page && (n.resizeBanner(), $(window).bind("resize",
			function() {
				n.resizeBanner()
			}));
			var e = {
				intervalId: 0,
				nextPage: $("#albumlistPanel .next"),
				prevPage: $("#albumlistPanel .prev"),
				wrap: $("#albumlistPanel .banner"),
				contain: $("#albumlistPanel .banner>ul")
			},
			a = "index" == Ttpod.config.page ? 640: e.wrap.innerWidth();
			e.wrap.find("li").width(a),
			$("#albumlistPanel .wrapBanner").hover(function() {
				e.prevPage.show().animate({
					bottom: 10
				},
				{
					queue: !1,
					duration: 200
				}),
				e.nextPage.show().animate({
					bottom: 10
				},
				{
					queue: !1,
					duration: 300
				})
			},
			function() {
				e.prevPage.animate({
					bottom: -60
				},
				{
					queue: !1,
					duration: 200
				}),
				e.nextPage.animate({
					bottom: -60
				},
				{
					queue: !1,
					duration: 300
				})
			}),
			e.nextPage.live("click",
			function() {
				i()
			}),
			e.prevPage.live("click",
			function() {
				t()
			})
		}
	},
	x = {
		pnlPty: {
			title: "专题歌曲",
			pageStyle: "subPage",
			tab: "albumlist",
			isLoadMore: !0
		},
		render: function(t) {
			t.detail = !0,
			u({
				title: t.title,
				action: "getitlily",
				tmpl: Ttpod.tmpl.gqlb,
				params: t,
				jsonpCallback: "jsonp_albumsongs",
				callback: function(i, n) {
					Ttpod.dynamicList.refresh(n.id, t.play)
				}
			})
		},
		loadMore: function(t) {
			t.detail = !1,
			g({
				action: "getitlily",
				tmpl: Ttpod.tmpl.gqlb,
				params: t,
				jsonpCallback: "jsonp_albumsongs",
				extra: ".commonList",
				callback: function(t, i) {
					Ttpod.dynamicList.refresh(i.id)
				}
			})
		}
	},
	_ = {
		pnlPty: {
			title: "歌单歌曲",
			pageStyle: "subPage",
			tab: "taglist",
			isLoadMore: !0
		},
		render: function(t) {
			u({
				title: t.title,
				action: "getdtmusicsbytagid",
				tmpl: Ttpod.tmpl.gsflgq,
				params: t,
				jsonpCallback: "jsonp_tagsongs",
				callback: function(i, n, e) {
					Ttpod.dynamicList.refresh(n.id, t.play),
					Ttpod.ui.endPanelLoad({
						hasMore: t.page <= e.allPage
					},
					i)
				}
			})
		},
		loadMore: function(t) {
			g({
				action: "getdtmusicsbytagid",
				tmpl: Ttpod.tmpl.gsflgq,
				params: t,
				jsonpCallback: "jsonp_tagsongs",
				extra: ".commonList",
				callback: function(i, n, e) {
					Ttpod.dynamicList.refresh(n.id),
					Ttpod.ui.endPanelLoad({
						hasMore: t.page <= e.allPage
					},
					i)
				}
			})
		}
	},
	C = {
		preNav: "",
		pnlPty: {
			title: "搜索结果",
			pageStyle: "searchPage",
			isLoadMore: !0
		},
		filterIds: null,
		init: function() {
			var t = this,
			i = Ttpod.ui.getHashParams();
			i.q = i.keyword || i.q;
			var n = -1;
			if (i.q || "0" == i.q) {
				var e = i.q.toString();
				e = e.replace(/\'/g, ""),
				$(".promptText").hide(),
				$(".searchBox").val(e)
			} else $(".searchBox").val() ? $(".promptText").hide() : $(".promptText").show();
			var a = $("#searchBar"),
			o = $(".missWord", a),
			s = $(".searchBox", a);
			a.click(function() {
				$(".searchBox").focus()
			}),
			s.focus(function() {
				a.addClass("searchActive")
			}),
			s.blur(function() {
				a.removeClass("searchActive")
			}),
			s.placeholder(),
			$("body").bind("click",
			function() {
				o.hide()
			}),
			$("#page").delegate(".searchButton", "click",
			function() {
				C.search()
			}),
			$(".searchBox").bind("keyup",
			function(t) {
				var i = $.trim($(".searchBox").val());
				if ("" == i ? $(".promptText").show() : $(".promptText").hide(), 13 == t.keyCode) {
					if ("" != i) {
						$(".missWord").empty();
						for (var e = 0; e < i.length; e++) {
							var a = i.charAt(e);
							if (("a" > a || a > "z") && ("A" > a || a > "Z")) return $.history.setActions({
								a: "searchlist",
								q: i,
								play: null
							}),
							!0
						}
						return $.history.setActions({
							a: "searchlist",
							q: "'" + i + "'",
							play: "",
							singer_name: ""
						})
					}
					$(this).focus()
				}
				var s = $(this).attr("dele");
				s != i && 38 != t.keyCode && 40 != t.keyCode && "" != i && 13 != t.keyCode && (n = -1, Ttpod.core.getResult({
					action: "suggest",
					data: {
						size: 5,
						q: i
					},
					success: function(t) {
						var i = "";
						$.each(t.data,
						function(t, n) {
							"存在" != n && (i += "<li>" + n + "</li>")
						}),
						o.html(i),
						o[i ? "show": "hide"]()
					},
					error: function() {
						return ! 0
					}
				})),
				$(this).attr("dele", i)
			}),
			$(".searchBox").bind("keydown",
			function(t) {
				var i = t.keyCode;
				if (38 == i || 40 == i) {
					38 == i && (n--, ( - 1 == n || -2 == n) && (n = 4)),
					40 == i && (n++, 5 == n && (n = 0));
					var e = $(".missWord").find("li:eq(" + n + ")");
					$(".missWord li").attr("class", ""),
					e.attr("class", "on");
					var a = $.trim(e.text());
					$(this).val(a)
				}
			}),
			$(".missWord").delegate("li", "mouseover",
			function() {
				$(".missWord li").attr("class", ""),
				$(this).attr("class", "on"),
				n = $(this).index()
			}),
			$(".missWord").delegate("li", "mouseout",
			function() {
				$(".missWord li").attr("class", "")
			}),
			$(".missWord").delegate("li", "click touchstart",
			function() {
				var t = $.trim($(this).text());
				$(".searchBox").focus().val(t),
				C.search()
			}),
			$("#searchTitle .btnBack").unbind("click").click(function() {
				"" != t.preNav ? $.history.load(t.preNav) : history.back()
			})
		},
		render: function(t) {
			this.resoverParam(t),
			$(".searchBox").val(t.q),
			u({
				action: "searchSong",
				tmpl: Ttpod.tmpl.sslb,
				params: t,
				title: t.q + "-搜索结果",
				jsonpCallback: "jsonp_search",
				callback: function(i, n) {
					Ttpod.dynamicList.refresh(n.id, t.play, !0)
				}
			})
		},
		loadMore: function(t) {
			this.resoverParam(t),
			g({
				action: "searchSong",
				tmpl: Ttpod.tmpl.bflb,
				params: t,
				extra: ".commonList",
				jsonpCallback: "jsonp_search",
				callback: function(t, i) {
					Ttpod.dynamicList.refresh(i.id)
				}
			})
		},
		resoverParam: function(t) {
			t.singer_name ? t.q += " " + t.singer_name: t.singer_name = null,
			t.filter = !0,
			t.q = t.keyword || t.q
		},
		filterSongId: function(t) {
			if (!$.exists(this.filterIds)) {
				var i = {};
				Ttpod.core.getResult({
					action: "search_filter",
					async: !1,
					success: function(t) {
						for (var n = 0; n < t.data.length; n++) i[t.data[n]] = t.data[n]
					}
				}),
				this.filterIds = i
			}
			return !! this.filterIds[t]
		},
		search: function() {
			var t = $.trim($(".searchBox").val());
			if ($(".missWord").hide(), "" != t) {
				for (var i = 0; i < t.length; i++) {
					var n = t.charAt(i);
					if (("a" > n || n > "z") && ("A" > n || n > "Z")) return $.history.setActions({
						a: "searchlist",
						q: t,
						play: "",
						singer_name: ""
					}),
					!0
				}
				return $.history.setActions({
					a: "searchlist",
					q: "'" + t + "'",
					play: "",
					singer_name: ""
				})
			}
			$(".searchBox").focus()
		}
	};
	return {
		init: t,
		filterSongId: C.filterSongId
	}
});

}
/*
     FILE ARCHIVED ON 07:55:16 Jun 15, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:18:29 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.017
  PetaboxLoader3.resolve: 85.006
  CDXLines.iter: 25.694 (3)
  exclusion.robots.policy: 0.265
  RedisCDXSource: 1.81
  load_resource: 146.902
  captures_list: 120.692
  LoadShardBlock: 90.179 (3)
  PetaboxLoader3.datanode: 89.875 (4)
  exclusion.robots: 0.279
*/