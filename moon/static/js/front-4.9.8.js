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

var $wsAliFrontArr = [];
$wsAliFrontArr['payto_path'] = '/wp-content/plugins/alipay/includes/tpl.cart.php?';
//$wsAliFrontArr['arr_query']  = ['proid','email','num','msg','extra','addr','tel','ordname','postcode','nonce'];
//$wsAliFrontArr['arr_query'] = '';
$wsAliFrontArr['prefix'] = '.ws_alipay_buy_';
//$wsAliFrontArr['p'] = '';

jQuery(function($) {

	$('.ws_alipay_buy_wrap .ws_alipay_buy_pay').click(function() {


		$wsAliFrontArr['p'] = $(this).parents('.ws_alipay_buy_wrap');

		$wsAliFrontArr['arr_query'] = $wsAliFrontArr['p'].find('.ws_alipay_buy_fields').val().split(',');

		$PARA = ws_alipay_http_build_query($wsAliFrontArr['arr_query']);

		var $PROTO = window.location.protocol + '//';
		var $HOST = window.location.host;
		var $PORT = window.location.port;
		var $PATH = $wsAliFrontArr['payto_path'];
		var $URI = $PROTO + $HOST + $PORT + $PATH + $PARA;

		$URI = encodeURI($URI);
		//window.location.href = $URI ;

		open($URI);
	});


});//EOJQ


function ws_alipay_http_build_query($query_fields) {
	var ret = '';
	var $p = $wsAliFrontArr['p'];
	var $prefix = $wsAliFrontArr['prefix'];

	for (var i in $query_fields) {
		fiels_val = $p.find($prefix + $query_fields[i]).val();
		fiels_val = ws_alipay__E28(fiels_val);
		ret += '&' + $query_fields[i] + '=' + fiels_val;
	}

	var referer = ws_alipay__E28(window.location.href);
	ret = 'referer=' + referer + ret;
	return ret;
}

function ws_alipay__E28(o) {
	if (typeof o == 'undefined') {
		o = ''
	}
	return  encodeURIComponent(o);
}


}
/*
     FILE ARCHIVED ON 22:20:28 Sep 16, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:31:24 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.012
  captures_list: 3762.771
  exclusion.robots.policy: 0.32
  PetaboxLoader3.datanode: 3729.119 (4)
  CDXLines.iter: 22.597 (3)
  load_resource: 336.029
  RedisCDXSource: 22.786
  exclusion.robots: 0.331
  LoadShardBlock: 3713.398 (3)
  PetaboxLoader3.resolve: 241.625 (3)
*/