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

var ajaxcontent = 'content';
var ajaxsearch_class = 'searchform';
var ajaxignore_string = new String('#, /wp-, .pdf, .zip, .rar, /share'); 
var ajaxignore = ajaxignore_string.split(', ');

var ajaxtrack_analytics = false
var ajaxscroll_top = true
	
var ajaxloading_code = '<div class="host"> <div class="loading loading-0"></div><div class="loading loading-1"></div><div class="loading loading-2"></div></div>';
var ajaxloading_error_code = '<div class="box"><p style="padding:20px;">出错啦，请刷新当前页面。</p></div>';
var ajaxreloadDocumentReady = false;

var ajaxisLoad = false;
var ajaxstarted = false;
var ajaxsearchPath = null;
var ajaxua = jQuery.browser;

jQuery(document).ready(function() {	
	ajaxloadPageInit("");
});


window.onpopstate = function(event) {
	if (ajaxstarted === true && ajaxcheck_ignore(document.location.toString()) == true) {	
		ajaxloadPage(document.location.toString(),1);
	}
};

function ajaxloadPageInit(scope){
	jQuery(scope + "a").click(function(event){
		if (this.href.indexOf(ajax.home) >= 0 && this.href.indexOf(ajax.home) <20 && ajaxcheck_ignore(this.href) == true){
			event.preventDefault();

			this.blur();

			var caption = this.title || this.name || "";

			var group = this.rel || false;

			try {
				ajaxclick_code(this);
			} catch(err) {
			}
			ajaxloadPage(this.href);
		}
	});
	
	jQuery('.' + ajaxsearch_class).each(function(index) {
		if (jQuery(this).attr("action")) {
			ajaxsearchPath = jQuery(this).attr("action");;
			jQuery(this).submit(function() {
				submitSearch(jQuery(this).serialize());
				return false;
			});
		} else {
		}
	});
	
	if (jQuery('.' + ajaxsearch_class).attr("action")) {} else {
	}
}

function ajaxloadPage(url, push, getData){

	if (!ajaxisLoad){
		if (ajaxscroll_top == true) {
			jQuery('html,body').animate({scrollTop: 0}, 1500);
		}
		ajaxisLoad = true;
		ajaxstarted = true;
		nohttp = url.replace("http://","").replace("https://","");
		firstsla = nohttp.indexOf("/");
		pathpos = url.indexOf(nohttp);
		path = url.substring(pathpos + firstsla);
		
		if (push != 1) {
			if (typeof window.history.pushState == "function") {
				var stateObj = { foo: 1000 + Math.random()*1001 };
				history.pushState(stateObj, "ajax page loaded...", path);
			} else {
			}
		}
		if (!jQuery('#' + ajaxcontent)) {
		}
		jQuery('#' + ajaxcontent).append(ajaxloading_code);
		jQuery('#' + ajaxcontent).fadeTo("fast",1,function() {
			jQuery('#' + ajaxcontent).fadeIn("fast", function() {
				jQuery.ajax({
					type: "GET",
					url: url,
					data: getData,
					dataType: "html",
					success: function(data) {
						ajaxisLoad = false;
						datax = data.split('<title>');
						titlesx = data.split('</title>');
						
						if (datax.length == 2 || titlesx.length == 2) {
							data = data.split('<title>')[1];
							titles = data.split('</title>')[0];
							jQuery(document).attr('title', (jQuery("<div/>").html(titles).text()));
						} else {
							
						}
						if (ajaxtrack_analytics == true) {
							if(typeof _gaq != "undefined") {
								if (typeof getData == "undefined") {
									getData = "";
								} else {
									getData = "?" + getData;
								}
								_gaq.push(['_trackPageview', path + getData]);
							} else {
								
							}
						}
						try {
							ajaxdata_code(data);
						} catch(err) {
						}
						data = data.split('id="' + ajaxcontent + '"')[1];
						data = data.substring(data.indexOf('>') + 1);
						var depth = 1;
						var output = '';
						
						while(depth > 0) {
							temp = data.split('</div>')[0];
							i = 0;
							pos = temp.indexOf("<div");
							while (pos != -1) {
								i++;
								pos = temp.indexOf("<div", pos + 1);
							}
							depth=depth+i-1;
							output=output+data.split('</div>')[0] + '</div>';
							data = data.substring(data.indexOf('</div>') + 6);
						}
						document.getElementById(ajaxcontent).innerHTML = output;
						jQuery('#' + ajaxcontent).css("position", "absolute");
						jQuery('#' + ajaxcontent).css("left", "20000px");
						jQuery('#' + ajaxcontent).show();
						ajaxloadPageInit("#" + ajaxcontent + " ");
						
						if (ajaxreloadDocumentReady == true) {
							jQuery(document).trigger("ready");
						}
						try {
							ajaxreload_code();
						} catch(err) {
						}
						jQuery('#' + ajaxcontent).hide();
						jQuery('#' + ajaxcontent).css("position", "");
						jQuery('#' + ajaxcontent).css("left", "");
						jQuery('#' + ajaxcontent).fadeTo("slow", 1, function() {});
					},
					error: function(jqXHR, textStatus, errorThrown) {
						ajaxisLoad = false;
						document.title = "Error loading requested page!";
						document.getElementById(ajaxcontent).innerHTML = ajaxloading_error_code;
					}
				});
			});
		});
	}
}

function submitSearch(param){
	if (!ajaxisLoad){
		ajaxloadPage(ajaxsearchPath, 0, param);
	}
}

function ajaxcheck_ignore(url) {
	for (var i in ajaxignore) {
		if (url.indexOf(ajaxignore[i]) >= 0) {
			return false;
		}
	}
	return true;
}

function ajaxreload_code() {
	initSlim();
	jQuery("img").unveil();
    hermitjs.reload();
}

function ajaxclick_code(thiss) {
jQuery('ul.nav li').each(function() {
	jQuery(this).removeClass('current-menu-item');
});
jQuery(thiss).parents('li').addClass('current-menu-item');
}

function ajaxdata_code(dataa) {
}

}
/*
     FILE ARCHIVED ON 18:00:22 Aug 26, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:31:56 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 159.838
  exclusion.robots: 0.21
  exclusion.robots.policy: 0.203
  RedisCDXSource: 2.171
  esindex: 0.01
  LoadShardBlock: 137.493 (3)
  PetaboxLoader3.datanode: 194.478 (5)
  CDXLines.iter: 17.03 (3)
  load_resource: 286.558 (2)
  PetaboxLoader3.resolve: 168.757 (2)
*/