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

function wpzan(post_id, user_id){
	var id = "#wp-zan-" + post_id,
		$zan = jQuery(id);

	if( $zan.hasClass('zaned') ){
		alert('你已经赞过这篇文章啦~~');
		return;
	}

	if(post_id){
		$zan.addClass('zan-loader');
    	jQuery.post(wpzan_ajax_url, {
    		"action": "wpzan",
        	"post_id": post_id,
        	"user_id": user_id
    	}, function(result) { //console.log(result);
    		if( result.status == 200 ){
    			var $count = $zan.find('span');
    			$zan.addClass('zaned').removeClass('zan-loader');
    			$count.text(result.count);
    		}else{
    			alert('你已经赞过这篇文章啦~~');
    		}
    	}, 'json');		
	}
}

}
/*
     FILE ARCHIVED ON 17:01:31 Aug 26, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:31:55 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.286
  captures_list: 284.989
  esindex: 0.017
  CDXLines.iter: 22.48 (3)
  PetaboxLoader3.resolve: 183.346 (2)
  LoadShardBlock: 256.413 (3)
  load_resource: 308.199 (2)
  exclusion.robots.policy: 0.271
  PetaboxLoader3.datanode: 333.601 (5)
  RedisCDXSource: 0.704
*/