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

//**************************************************************
// jQZoom allows you to realize a small magnifier window,close
// to the image or images on your web page easily.
//
// jqZoom version 2.0
// Author Doc. Ing. Renzi Marco(www.mind-projects.it)
// First Release on Dec 05 2007
// i'm searching for a job,pick me up!!!
// mail: renzi.mrc@gmail.com
//**************************************************************

(function($){

		$.fn.jqueryzoom = function(options){

		var settings = {
				xzoom: 200,		//zoomed width default width
				yzoom: 200,		//zoomed div default width
				offset: 10,		//zoomed div default offset
				position: "right", //zoomed div default position,offset position is to the right of the image
				preload: 1

			};

			if(options) {
				$.extend(settings, options);
			}

		    var noalt='';

		    $(this).hover(function(){
			
		    var imageLeft = this.offsetLeft;
		    var imageRight = this.offsetRight;
		    var imageTop =  $(this).get(0).offsetTop;
		    var imageWidth = $(this).children('img').get(0).offsetWidth;
		    var imageHeight = $(this).children('img').get(0).offsetHeight;


                noalt= $(this).children("img").attr("alt");

		    var bigimage = $(this).children("img").attr("jqimg");
                $(this).children("img").attr("alt",'');

		    if($("div.zoomdiv").get().length == 0){

		    $(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");

		    $(this).append("<div class='jqZoomPup'>&nbsp;</div>");

		    }


		    if(settings.position == "right"){

		    leftpos = imageLeft + imageWidth + settings.offset;

		    }else{

		    leftpos = imageLeft - settings.xzoom - settings.offset;

		    }

		    $("div.zoomdiv").css({ top: imageTop,left: leftpos });

		    $("div.zoomdiv").width(settings.xzoom);

		    $("div.zoomdiv").height(settings.yzoom);

            $("div.zoomdiv").show();




					$(document.body).mousemove(function(e){



                   $("div.jqZoomPup").hide();


				    var bigwidth = $(".bigimg").get(0).offsetWidth;

				    var bigheight = $(".bigimg").get(0).offsetHeight;

				    var scaley ='x';

				    var scalex= 'y';


				    if(isNaN(scalex)|isNaN(scaley)){

				    var scalex = (bigwidth/imageWidth);

				    var scaley = (bigheight/imageHeight);



				    $("div.jqZoomPup").width((settings.xzoom)/scalex );

		    		$("div.jqZoomPup").height((settings.yzoom)/scaley);


                     $('div.jqZoomPup').show();

                     $("div.jqZoomPup").css('visibility','visible');


				   }


			    	mouse = new MouseEvent(e);


                    xpos = mouse.x - $("div.jqZoomPup").width()/2 - imageLeft;

                    ypos = mouse.y - $("div.jqZoomPup").height()/2 - imageTop ;




                    xpos = (mouse.x - $("div.jqZoomPup").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.jqZoomPup").width()/2 > imageWidth + imageLeft ) ?  (imageWidth -$("div.jqZoomPup").width() -2)  : xpos;

					ypos = (mouse.y - $("div.jqZoomPup").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.jqZoomPup").height()/2  > imageHeight + imageTop ) ?  (imageHeight - $("div.jqZoomPup").height() -2 ) : ypos;



                    $("div.jqZoomPup").css({ top: ypos,left: xpos });

                    $("div.jqZoomPup").show();


                    //scrolly = mouse.y - imageTop - ($("div.zoomdiv").height()*1/scaley)/2 ;

					scrolly = ypos;

					$("div.zoomdiv").get(0).scrollTop = scrolly * scaley;

					scrollx = xpos;

				    //scrollx =    mouse.x - imageLeft - ($("div.zoomdiv").width()*1/scalex)/2 ;

					$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex ;


				    });
		    },function(){

                   $(this).children("img").attr("alt",noalt);
		       $(document.body).unbind("mousemove");
		       $("div.jqZoomPup").remove();
		       $("div.zoomdiv").remove();

		    });

             count=0;

		if(settings.preload){

		$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");

		$(this).each(function(){

        var imagetopreload= $(this).children("img").attr("jqimg");

        var content = jQuery('div.jqPreload'+count+'').html();

        jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');

		});

		}

		}

})(jQuery);

function MouseEvent(e) {
this.x = e.pageX
this.y = e.pageY
}




}
/*
     FILE ARCHIVED ON 04:42:54 May 09, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:31:55 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 127.639 (4)
  load_resource: 93.417
  esindex: 0.022
  RedisCDXSource: 2.199
  exclusion.robots: 0.484
  captures_list: 131.108
  exclusion.robots.policy: 0.462
  LoadShardBlock: 99.385 (3)
  PetaboxLoader3.resolve: 32.5
  CDXLines.iter: 25.003 (3)
*/