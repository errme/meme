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

/*!
 * Masonry v2 shim
 * to maintain backwards compatibility
 * as of Masonry v3.1.2
 *
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
!function(a){"use strict";var b=a.Masonry;b.prototype._remapV2Options=function(){this._remapOption("gutterWidth","gutter"),this._remapOption("isResizable","isResizeBound"),this._remapOption("isRTL","isOriginLeft",function(a){return!a});var a=this.options.isAnimated;if(void 0!==a&&(this.options.transitionDuration=a?this.options.transitionDuration:0),void 0===a||a){var b=this.options.animationOptions,c=b&&b.duration;c&&(this.options.transitionDuration="string"==typeof c?c:c+"ms")}},b.prototype._remapOption=function(a,b,c){var d=this.options[a];void 0!==d&&(this.options[b]=c?c(d):d)};var c=b.prototype._create;b.prototype._create=function(){var a=this;this._remapV2Options(),c.apply(this,arguments),setTimeout(function(){jQuery(a.element).addClass("masonry")},0)};var d=b.prototype.layout;b.prototype.layout=function(){this._remapV2Options(),d.apply(this,arguments)};var e=b.prototype.option;b.prototype.option=function(){e.apply(this,arguments),this._remapV2Options()};var f=b.prototype._itemize;b.prototype._itemize=function(a){var b=f.apply(this,arguments);return jQuery(a).addClass("masonry-brick"),b};var g=b.prototype.measureColumns;b.prototype.measureColumns=function(){var a=this.options.columnWidth;a&&"function"==typeof a&&(this.getContainerWidth(),this.columnWidth=a(this.containerWidth)),g.apply(this,arguments)},b.prototype.reload=function(){this.reloadItems.apply(this,arguments),this.layout.apply(this)};var h=b.prototype.destroy;b.prototype.destroy=function(){var a=this.getItemElements();jQuery(this.element).removeClass("masonry"),jQuery(a).removeClass("masonry-brick"),h.apply(this,arguments)}}(window);

}
/*
     FILE ARCHIVED ON 07:03:26 Jan 31, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:34 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.017
  PetaboxLoader3.resolve: 72.221 (2)
  CDXLines.iter: 21.973 (3)
  exclusion.robots.policy: 0.375
  RedisCDXSource: 9.78
  load_resource: 337.591 (2)
  captures_list: 173.07
  LoadShardBlock: 136.168 (3)
  PetaboxLoader3.datanode: 187.714 (5)
  exclusion.robots: 0.394
*/