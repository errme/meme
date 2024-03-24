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
* If you create a derivative, please leave this text intact:
*
* FlowType.JS 1.0
* Copyright (c) 2013, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

(function($) {
   $.fn.flowtype = function(options) {

// Establish default settings/variables
// ====================================
      var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35,
         lineRatio : 1.45
      }, options),

// Do the magic math
// =================
      changes = function(el) {
         var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;

         $el.css({
            'font-size'   : fontSize + 'px',
            'line-height' : fontSize * settings.lineRatio + 'px'
         });
      };

// Make the magic visible
// ======================
      return this.each(function() {
         
      // Context for resize callback
         var that = this;
         
      // Set changes on load
         changes(this);
         
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      });
   };
}(jQuery));

}
/*
     FILE ARCHIVED ON 08:25:37 Feb 01, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:37 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.363
  esindex: 0.014
  load_resource: 2030.634 (2)
  captures_list: 273.393
  PetaboxLoader3.resolve: 269.108 (2)
  exclusion.robots.policy: 0.347
  PetaboxLoader3.datanode: 260.065 (5)
  RedisCDXSource: 2.719
  LoadShardBlock: 244.504 (3)
  CDXLines.iter: 21.433 (3)
*/