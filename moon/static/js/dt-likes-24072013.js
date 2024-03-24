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

    $('.dtpostwall-likes').live('click',
        function() {
            var link = $(this);
            if(link.hasClass('active')) return false;
        
            var id = $(this).attr('id'),
                postfix = link.find('.dtpostwall-likes-postfix').text();
            
            $.post(dtpostwall_likes.ajaxurl, { action:'dtpostwall-likes', likes_id:id, postfix:postfix }, function(data){
                link.html(data).addClass('active').attr('title','You already like this');
            });
        
            return false;
    });
    
    if( $('body.ajax-dtpostwall-likes').length ) {
        $('.dtpostwall-likes').each(function(){
            var id = $(this).attr('id');
            $(this).load(dtpostwall.ajaxurl, { action:'dtpostwall-likes', post_id:id });
        });
    }

});

}
/*
     FILE ARCHIVED ON 12:15:54 Jan 31, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:32 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.389
  esindex: 0.017
  load_resource: 912.893 (2)
  captures_list: 131.351
  PetaboxLoader3.resolve: 94.881 (2)
  exclusion.robots.policy: 0.372
  PetaboxLoader3.datanode: 228.25 (5)
  RedisCDXSource: 2.446
  LoadShardBlock: 101.453 (3)
  CDXLines.iter: 22.031 (3)
*/