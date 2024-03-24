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

(function($){
	// Tabs
	jQuery('ul.nd_tabs li a:not(ul.nd_tabs li.tab_right a), form.nd_form a.forgotten').click(function(){
		var $this = jQuery(this);
		var $wrap = $this.closest('.nd_login_widget');

		$wrap.find('.nd_form, .nd_logged_in').hide();
		$wrap.find('ul.nd_tabs li').removeClass('active');

		var target = $this.attr('href');
		target = target.replace( '#', '' );

		$this.parent().addClass('active');
		$wrap.find( '.' + target ).fadeIn();

		return false;
	});

	jQuery('ul.nd_tabs li:first').click();

	// Ajax
	jQuery('form.nd_form').submit(function(){
		var thisform = this;
		jQuery('div.nd_form_inner').block({ message: null, overlayCSS: {
	        backgroundColor: '#fff',
	        opacity:         0.6
	    } });
		jQuery.ajax({
			type: 'POST',
			url: jQuery(thisform).attr('action'),
			data: jQuery(thisform).serialize(),
			success: function( result ){
				jQuery('ul.errors, ul.messages').remove();
				result = jQuery.trim( result );
				if (result=='SUCCESS') {
					window.location = jQuery(thisform).attr('action');
				} else if (result.substring(8,0) =='SUCCESS:') {
					message = result.substr(8);
					jQuery('div.nd_form_inner', thisform).prepend('<ul class="messages"><li>' + message + '</li></ul>');
					jQuery('div.nd_form_inner').unblock();
				} else {
					jQuery('div.nd_form_inner', thisform).prepend('<ul class="errors"><li>' + result + '</li></ul>');
					jQuery('div.nd_form_inner').unblock();
				}
			}
		});
		return false;
	});
})(jQuery);

}
/*
     FILE ARCHIVED ON 19:20:20 Jan 27, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:34 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  load_resource: 416.457 (2)
  RedisCDXSource: 0.927
  exclusion.robots: 0.295
  LoadShardBlock: 141.358 (3)
  PetaboxLoader3.resolve: 175.85 (2)
  exclusion.robots.policy: 0.283
  PetaboxLoader3.datanode: 207.177 (5)
  esindex: 0.016
  captures_list: 170.754
  CDXLines.iter: 23.074 (3)
*/