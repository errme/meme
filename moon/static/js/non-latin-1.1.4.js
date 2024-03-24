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

jQuery(document).ready(function($){

	// GD bbPress Attachments
	$('[id^="d4p-bbp-attachment_"]:not(:has("img"))').each(function(){
		var $this = $(this);
		
		var parameter = {
			id: $(this).attr('id').replace(/d4p-bbp-attachment_/,''),
			action: 'filename_for_download'
		};
		
		$.get(nlf.ajaxurl, parameter,function(title){
			$this.find('a:first').text(title).attr('title',title);
		});
	});

	// replace download link
	var attachments = [];
	$('a[href^="' + nlf.upload_baseurl + '"]').each(function(){
		attachments.push($(this).attr('href'));
	});
	if(attachments.length > 0){
		var post_vars = {
			'action': 'nlf_get_download_url',
			'attachments': attachments
		};
		$.post(nlf.ajaxurl, post_vars, function(result){
			for (var i = result.length - 1; i >= 0; i--) {
				var obj = result[i];
				$('a[href="' + obj.guid + '"]').attr('href', obj.download_url);
			}
		}, 'json');
	}
});

}
/*
     FILE ARCHIVED ON 19:29:00 Jan 24, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:34 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.01
  PetaboxLoader3.resolve: 250.372 (2)
  CDXLines.iter: 20.384 (3)
  exclusion.robots.policy: 0.239
  RedisCDXSource: 2.082
  load_resource: 350.073 (2)
  captures_list: 89.07
  LoadShardBlock: 62.752 (3)
  PetaboxLoader3.datanode: 114.801 (5)
  exclusion.robots: 0.251
*/