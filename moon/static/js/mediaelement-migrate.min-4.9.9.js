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

!function(a,b){void 0===mejs.plugins&&(mejs.plugins={},mejs.plugins.silverlight=[],mejs.plugins.silverlight.push({types:[]})),mejs.HtmlMediaElementShim=mejs.HtmlMediaElementShim||{getTypeFromFile:mejs.Utils.getTypeFromFile},void 0===mejs.MediaFeatures&&(mejs.MediaFeatures=mejs.Features),void 0===mejs.Utility&&(mejs.Utility=mejs.Utils);var c=MediaElementPlayer.prototype.init;MediaElementPlayer.prototype.init=function(){this.options.classPrefix="mejs-",this.$media=this.$node=b(this.node),c.call(this)};var d=MediaElementPlayer.prototype._meReady;MediaElementPlayer.prototype._meReady=function(){this.container=b(this.container),this.controls=b(this.controls),this.layers=b(this.layers),d.apply(this,arguments)},MediaElementPlayer.prototype.getElement=function(a){return void 0!==b&&a instanceof b?a[0]:a},MediaElementPlayer.prototype.buildfeatures=function(a,c,d,e){for(var f=["playpause","current","progress","duration","tracks","volume","fullscreen"],g=0,h=this.options.features.length;g<h;g++){var i=this.options.features[g];if(this["build"+i])try{f.indexOf(i)===-1?this["build"+i](a,b(c),b(d),e):this["build"+i](a,c,d,e)}catch(j){console.error("error building "+i,j)}}}}(window,jQuery);

}
/*
     FILE ARCHIVED ON 17:57:08 Feb 09, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:50 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 221.579
  exclusion.robots: 0.239
  exclusion.robots.policy: 0.23
  RedisCDXSource: 2.418
  esindex: 0.009
  LoadShardBlock: 197.587 (3)
  PetaboxLoader3.datanode: 106.047 (4)
  CDXLines.iter: 18.348 (3)
  PetaboxLoader3.resolve: 122.934 (3)
  load_resource: 93.635
*/