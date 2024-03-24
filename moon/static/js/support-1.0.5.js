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

/*
 * jQuery pageSlide
 * Version 2.0
 * http://srobbin.com/jquery-pageslide/
 *
 * jQuery Javascript plugin which slides a webpage over to reveal an additional interaction pane.
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/
;(function(b){function j(e,a){if(0===e.indexOf("#"))b(e).clone(!0).appendTo(c.empty()).show();else{if(a){var d=b("<iframe />").attr({src:e,frameborder:0,hspace:0}).css({width:"100%",height:"100%"});c.html(d)}else c.load(e);c.data("localEl",!1)}}function k(b,a){var d=c.outerWidth(!0),f={},g={};if(!c.is(":visible")&&!h){h=!0;switch(b){case "left":c.css({left:"auto",right:"-"+d+"px"});f["margin-left"]="-="+d;g.right="+="+d;break;default:c.css({left:"-"+d+"px",right:"auto"}),f["margin-left"]="+="+d,g.left="+="+d}l.animate(f,a);c.show().animate(g,a,function(){h=!1})}}var l=b("body"),c=b("#pageslide"),h=!1,m;0==c.length&&(c=b("<div />").attr("id","pageslide").css("display","none").appendTo(b("body")));b.fn.pageslide=function(e){this.click(function(a){var d=b(this),f=b.extend({href:d.attr("href")},e);a.preventDefault();a.stopPropagation();c.is(":visible")&&d[0]==m?b.pageslide.close():(b.pageslide(f),m=d[0])})};b.fn.pageslide.defaults={speed:300,direction:"right",modal:!1,iframe:!0,href:null};b.pageslide=function(e){var a=b.extend({},b.fn.pageslide.defaults,e);c.is(":visible")&&c.data("direction")!=a.direction?b.pageslide.close(function(){j(a.href,a.iframe);k(a.direction,a.speed)}):(j(a.href,a.iframe),c.is(":hidden")&&k(a.direction,a.speed));c.data(a)};b.pageslide.close=function(c){var a=b("#pageslide"),d=a.outerWidth(!0),f=a.data("speed"),g={},i={};if(!a.is(":hidden")&&!h){h=!0;switch(a.data("direction")){case "left":g["margin-left"]="+="+d;i.right="-="+d;break;default:g["margin-left"]="-="+d,i.left="-="+d}a.animate(i,f);l.animate(g,f,function(){a.hide();h=!1;"undefined"!=typeof c&&c()})}};c.click(function(b){b.stopPropagation()});b(document).bind("click keyup",function(e){"keyup"==e.type&&27!=e.keyCode||c.is(":visible")&&!c.data("modal")&&b.pageslide.close()})})(jQuery);

/*!
 * headroom.js v0.9.1 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Headroom=b()}(this,function(){"use strict";function a(a){this.callback=a,this.ticking=!1}function b(a){return a&&"undefined"!=typeof window&&(a===window||a.nodeType)}function c(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var d,e,f=a||{};for(e=1;e<arguments.length;e++){var g=arguments[e]||{};for(d in g)"object"!=typeof f[d]||b(f[d])?f[d]=f[d]||g[d]:f[d]=c(f[d],g[d])}return f}function d(a){return a===Object(a)?a:{down:a,up:a}}function e(a,b){b=c(b,e.options),this.lastKnownScrollY=0,this.elem=a,this.tolerance=d(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop,this.onBottom=b.onBottom,this.onNotBottom=b.onNotBottom}var f={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};return window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,a.prototype={constructor:a,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},e.prototype={constructor:e,init:function(){return e.cutsTheMustard?(this.debouncer=new a(this.update.bind(this)),this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.notTop,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;!a.contains(b.pinned)&&a.contains(b.unpinned)||(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.bottom)||(a.add(b.bottom),a.remove(b.notBottom),this.onBottom&&this.onBottom.call(this))},notBottom:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notBottom)||(a.add(b.notBottom),a.remove(b.bottom),this.onNotBottom&&this.onNotBottom.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getElementPhysicalHeight:function(a){return Math.max(a.offsetHeight,a.clientHeight)},getScrollerPhysicalHeight:function(){return this.scroller===window||this.scroller===document.body?this.getViewportHeight():this.getElementPhysicalHeight(this.scroller)},getDocumentHeight:function(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,b.scrollHeight,a.offsetHeight,b.offsetHeight,a.clientHeight,b.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===window||this.scroller===document.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getScrollerPhysicalHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),a+this.getViewportHeight()>=this.getScrollerHeight()?this.bottom():this.notBottom(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},e.options={tolerance:{up:0,down:0},offset:0,scroller:window,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},e.cutsTheMustard="undefined"!=typeof f&&f.rAF&&f.bind&&f.classList,e});

$(window).load(function () {
	  $(".mobile-inner-header-icon").click(function(){
	  	$(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
	  	$(".mobile-inner-nav").slideToggle(250);
	  });
	  $(".mobile-inner-nav a").each(function( index ) {
	  	$( this ).css({'animation-delay': (index/10)+'s'});
	  });
	});
	
	

//滚动导航收缩
$(function(){	
    var cubuk_seviye = $(document).scrollTop();
    var header_yuksekligi = $('.show-bar').outerHeight();

    $(window).scroll(function() {
        var kaydirma_cubugu = $(document).scrollTop();

        if (kaydirma_cubugu > header_yuksekligi){$('.show-bar').addClass('hiddened');} 
        else {$('.show-bar').removeClass('hiddened');}

        if (kaydirma_cubugu > cubuk_seviye){$('.show-bar').removeClass('showed');} 
        else {$('.show-bar').addClass('showed');}				

        cubuk_seviye = $(document).scrollTop();	
     });
});







}
/*
     FILE ARCHIVED ON 19:22:55 Feb 13, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:51 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 185.219 (3)
  exclusion.robots.policy: 0.399
  captures_list: 225.48
  esindex: 0.016
  PetaboxLoader3.resolve: 138.554 (2)
  RedisCDXSource: 14.2
  PetaboxLoader3.datanode: 236.639 (5)
  CDXLines.iter: 21.793 (3)
  load_resource: 496.474 (2)
  exclusion.robots: 0.416
*/