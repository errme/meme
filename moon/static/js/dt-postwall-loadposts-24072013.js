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

// Ajax-fetching "Load more posts"
jQuery('.dt-load-more-masonry a').live('click', function(e) {
	e.preventDefault();
	jQuery(this).addClass('loading').text('Loading...');
     
    jQuery.ajax({
		type: "GET",
		url: jQuery(this).attr('href') + '#dt-postwall',
		dataType: "html",
		success: function(out) {
			result = jQuery(out).find('.dt-postwall-masonry .item').fadeIn(1000);
			nextlink = jQuery(out).find('.dt-load-more-masonry a').attr('href');
            //alert(nextlink);			
			jQuery(out).hide();            
            var $container = jQuery(".dt-postwall-masonry");
            $container.imagesLoaded( function(){
				$container.masonry({
					itemSelector : ".item",
					isAnimated: true,
					itemWidth : ".item",
        			gutter: 12,
        			isFitWidth: true,
        			animationOptions: {
					    duration: 750,
					    easing: 'linear',
					    queue: false
				  	}
				});
			});


			jQuery('.dt-postwall-masonry').append(result).masonry( 'reload' );
			jQuery('.dt_postwall_grid_3 .view .mask p.fadeup, .dt_postwall_grid_3 .view .mask a.dt-overlay-meta, .dt_postwall_grid_3 .socialcount li a').flowtype({
				minFont : 10,
				maxFont : 12
			});
			jQuery('.dt_postwall_grid_3 .view .mask h3').flowtype({
				minFont : 14,
				maxFont : 18
			});    
			jQuery('.dt-postwall-masonry').masonry( 'reload' );
			jQuery('.dt-load-more-masonry a').removeClass('loading');	

        // alert(nextlink);
			if (nextlink != undefined) {
				jQuery('.dt-load-more-masonry a').attr('href', nextlink);
                jQuery('.dt-load-more-masonry a').text('Load More Posts');
			} else {
				jQuery('.dt-load-more-masonry').remove();
                jQuery('.dt-postwall-masonry').append('<div class="clear"></div>');
                jQuery('.dt-load-more-masonry').css('visibilty','hidden');
			}
        }
    });
	
});

// Ajax-fetching "Load more posts"
jQuery('.dt-load-more-grid a').live('click', function(e) {
	e.preventDefault();
	jQuery(this).addClass('loading').text('Loading...');
     
    jQuery.ajax({
		type: "GET",
		url: jQuery(this).attr('href') + '#dt-postwall',
		dataType: "html",
		success: function(out) {
			result = jQuery(out).find('.dt-postwall-grid .item').fadeIn(1000);
			nextlink = jQuery(out).find('.dt-load-more-grid a').attr('href');
            //alert(nextlink);
			
			jQuery(out).hide();
          
			jQuery('.dt-postwall-grid').append(result);
			jQuery('.dt_postwall_grid_3 .view .mask p.fadeup, .dt_postwall_grid_3 .view .mask a.dt-overlay-meta, .dt_postwall_grid_3 .socialcount li a').flowtype({
				minFont : 10,
				maxFont : 12
			});
			jQuery('.dt_postwall_grid_3 .view .mask h3').flowtype({
				minFont : 14,
				maxFont : 18
			});            
			jQuery('.dt-postwall-masonry').masonry( 'reload' );
			jQuery('.dt-load-more-grid a').removeClass('loading');

        // alert(nextlink);
			if (nextlink != undefined) {
				jQuery('.dt-load-more-grid a').attr('href', nextlink);
                jQuery('.dt-load-more-grid a').text('Load More Posts');
			} else {
				jQuery('.dt-load-more-grid').remove();
                jQuery('.dt-postwall-grid').append('<div class="clear"></div>');
                jQuery('.dt-load-more-grid').css('visibilty','hidden');
			}
        }
    });
});

}
/*
     FILE ARCHIVED ON 20:17:53 Jan 30, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:31 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.016
  captures_list: 171.479
  exclusion.robots.policy: 0.373
  PetaboxLoader3.datanode: 157.041 (5)
  CDXLines.iter: 21.538 (3)
  load_resource: 220.431 (2)
  RedisCDXSource: 1.93
  exclusion.robots: 0.389
  LoadShardBlock: 143.261 (3)
  PetaboxLoader3.resolve: 80.89 (2)
*/