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

$(function(){
    $("#qlf").click(function(){		//点击右边悬浮“领取100元卖机补贴”按钮
    	$(".lq_tc").removeClass("dn");
    	$(".lq_m").removeClass("dn");
    });
    $("#lq_cls,.lq_cls1").click(function(){ 	//点击叉叉按钮
    	$(".lq_tc").addClass('dn');
    	$(".lq_i,.lq_m,.lq_cg").addClass("dn");
    });
    $("#lq_bt").click(function(){	//第一个弹框点击领取100元卖机补贴按钮
    	$(".lq_i").addClass('dn');
    	$(".lq_m").removeClass("dn");
    });
    $("#c_btn").click(function() {	//点击马上回收
    	window.location = "/wymj.html";
//     	$(".lq_tc").addClass('dn');
//     	$(".lq_i,.lq_m,.lq_cg").addClass("dn");  
    });
	  //首页弹窗5秒后隐藏
    window.setTimeout(function(){
    if(!$(".lq_i").hasClass('dn')){
    $(".lq_tc").addClass('dn');
    $(".lq_i").addClass('dn');}
    
    },1000*5);
    $("#lq").click(function(){	//点击领取100元优惠券按钮
    	var c_phone = $.trim($("input[name='coupone_phone']").val());
    	var reg = /^((13[0-9]{1}|17[0-9]{1}|14[0-9]{1}|15[0-9]{1}|18[0-9]{1})+\d{8})$/;
    	if ($("#lq").attr("lq_flag")) {
    		$("#a_c_phone").html(c_phone);
			$(".lq_m").addClass("dn");
			$(".lq_cg").removeClass("dn");
			$(".lq_c_h").css("display","none");
			$(".lq_c_h1").css("display","block");
			return ;    		
    	}
		if (c_phone == "") {
			alert("请填写手机号");
			return;
		} else if (!reg.test(c_phone)) {
			alert("手机号格式错误");
			return;
		}
    	$.post("/coupone/act100.html",{phone:c_phone},function(data) {
			if (eval(data).result_code == 100) {
				$("#a_c_phone").html(c_phone);
				$(".lq_m").addClass("dn");$(".lq_cg").removeClass("dn");
				$(".lq_c_h").css("display","none");
				$(".lq_c_h1").css("display","block");
			} else if (eval(data).result_code == 0) {		//该活动不存在
				alert("该活动不存在");
			} else if (eval(data).result_code == -50) {		//活动已经结束
				alert("活动已经结束");
			} else if (eval(data).result_code == -10) {		//手机号码为空
				alert("手机号码为空");
			} else if (eval(data).result_code == -20) {		//手机号码格式错误
				alert("手机号格式错误");
			} else if (eval(data).result_code == -30) {		//手机号码自动注册失败
				alert("手机号码自动注册失败");
			} else if (eval(data).result_code == -40) {		//该手机号用户已经领取过
// 				$("#lq").html("您已领取过");
				$("#a_c_phone").html(c_phone);
				$(".lq_m").addClass("dn");$(".lq_cg").removeClass("dn");
				$(".lq_c_h").css("display","block");
				$(".lq_c_h1").css("display","none");
				$("#lq").attr("lq_flag","yjlq");
// 				alert("该手机号用户已经领取过");
			}
    	});
    });
    //流程指引
	$('.close_01').click(function(){
		$(this).parents('.zhiyincon').hide();
	});
	$("a").hover(function(){
		$(this).css("cursor","pointer");
	});
	
	//控制导航选中开始
	var url = ""+window.location;
    if (url == 'https://web.archive.org/web/20170603011451/http://localhost/' ||url == 'https://web.archive.org/web/20170603011451/http://localhost'
		|| url == 'https://web.archive.org/web/20170603011451/http://www.58yiji.com' || url == 'https://web.archive.org/web/20170603011451/http://www.yjshou.com/') {
    	$(".lq_tc").removeClass("dn");
        $(".lq_i").removeClass("dn");
    } else {
    	$(".lq_tc").addClass("dn");
        $(".lq_i").addClass("dn");
    }
	if (url.indexOf("wymj") != -1) {
		var plusPrice = "${plusPrice}";
		var pprice = "${pprice}";
		if ((plusPrice == '' || parseInt(plusPrice) <= 0) && (pprice == '' || parseInt(pprice) <= 0)) {
			$("#dh_wymj").addClass("on");
			$("#dh_xsgj").removeClass("on");
		} else {
			$("#dh_wymj").removeClass("on");
			$("#dh_xsgj").addClass("on");
		}
		$("#dh_index").removeClass("on");
		$("#dh_2shou").removeClass("on");
	} else if (url.toLowerCase().indexOf("gujia") != -1) {
		var pprice = "${pprice}";
		var plusPrice = "${plusPrice}";
		if ((plusPrice == '' || parseInt(plusPrice) <= 0) && (pprice == '' || parseInt(pprice) <= 0)) {
			$("#dh_wymj").addClass("on");
			$("#dh_xsgj").removeClass("on");
		} else {
			$("#dh_wymj").removeClass("on");
			$("#dh_xsgj").addClass("on");
		}
		$("#dh_index").removeClass("on");
		$("#dh_2shou").removeClass("on");
	} else if (url.indexOf("xsgj") != -1) {
		$("#dh_xsgj").addClass("on");
		$("#dh_index").removeClass("on");
		$("#dh_wymj").removeClass("on");
		$("#dh_2shou").removeClass("on");
	} else if (url == 'https://web.archive.org/web/20170603011451/http://localhost/' ||url == 'https://web.archive.org/web/20170603011451/http://localhost/'
		|| url == 'https://web.archive.org/web/20170603011451/http://www.58yiji.com' || url == 'https://web.archive.org/web/20170603011451/http://www.yjshou.com/'){
		$("#dh_index").addClass("on");
		$("#dh_xsgj").removeClass("on");
		$("#dh_wymj").removeClass("on");
		$("#dh_2shou").removeClass("on");
	}else if (url.indexOf("2shou") != -1){
		$("#dh_2shou").addClass("on");
		$("#dh_xsgj").removeClass("on");
		$("#dh_wymj").removeClass("on");
		$("#dh_index").removeClass("on");
	}

	//延迟加载图片
	/*
	$("img.lazy").lazyload({ 
        placeholder : "/resources/images/grey.gif",
        effect: "fadeIn",
        threshold : 200 
    });  
    */
	
	 var idx_tab;
	 var m;
	 $('.cart_nav a').hover(function(){ 
		 idx_tab_01 = $('.cart_nav a').index(this);
		 activeTab_lv3(idx_tab_01);
	 })
	  activeTab_lv3(0);
	  function activeTab_lv3(m) { 
		 $('.cart_nav a').removeClass('on');
		  $('.cart_nav a').eq(m).addClass('on');
		 $('.cart_Box .cart_box').eq(m).show().siblings().hide();
	 } 
	 
	 /*弹窗*/
	 
	  	var ww=$(window).width();	 
		 if(ww<1600){
			$('.cart').css({
				 "position":"fixed",
				 "top":"30%",
				 "right":"0"
			 }); 
		 }else{
			$('.cart').css({
				 "position":"fixed",
				 "top":"35%",
				 "right":"1%"
			 });  
		 };
		$('.icon1').click(function(event) {
			var hh=$('.bigbg').height();	
			$('.bigbg').show();
		});
		$('.close').click(function(event) {
			var hh=$('.bigbg').height();	
			$('.bigbg').hide();
		});
		$(".dingyueclose").hover(function() {
			$(this).css("cursor","pointer");
		});
		$("#dingyue_sub").hover(function() {
			$(this).css("cursor","pointer");
		});
		$(".dingyue_2shou").hover(function() {
			$(this).css("cursor","pointer");
			$(this).css("color","#f00");
		});
		$(".dingyue_2shou").mouseout(function() {
			//$(this).css("cursor","pointer");
			$(this).css("color","#fff");
		});
		$(".dingyueclose").click(function() {
			var hh=$('.dingyues').height();	
			$('.dingyues').hide();
		});
		$('.problem li .question').click(function(){
			$(this).siblings().slideDown();
			$('.problem li .answer').hide();
		});

		$("#dingyue_sub").click(function() {
			var phone = $.trim($("#dingyue_phone").val());
			var reg = /^((13[0-9]{1}|17[0-9]{1}|14[0-9]{1}|15[0-9]{1}|18[0-9]{1})+\d{8})$/;
			if (!reg.test(phone)) {
				$("#dingyue_phone").val("请填写正确的手机号码");
				return false;
			} else {
				var url = "/dingyue/save.html";
				$.post(url,{phone:phone},function(data) {
					if (eval(data).errorCode != 100) {
						$("#dingyue_phone").val(eval(data).msg);
					} else {
						$(".dingyue_2shou").html("已订阅");
						$(".dingyue_2shou").addClass("dingyue_2shou_over");
						$('.dingyues').hide();
					}
				});
			}
		});
		//大客户
		//$(".cooperation").slide({mainCell:".cooperations ul",autoPage:true,effect:"top",autoPlay:true,opp:false,easing:"easeOutCirc",delayTime:600});
});
//接入QQ客服
var hoverCount = 0;
$(".yingxiao_qq").hover(function() {
	if (hoverCount == 0) {
		loadQQ();
		hoverCount ++;
	} 
});
$(".yingxiao_qq").click(function() {
	loadQQ();
});
function loadQQ() {
	BizQQWPA.addCustom([
        	  	{ 
        	  		aty: '1', //指定工号类型,0-自动分流，1-指定工号，2-指定分组
        	  		a: '1001', //指定的工号 
        	  		nameAccount: '800093175', //营销QQ号码 
        	  		//node: 'p' //WPA被放置的元素 
        	  		selector: 'qqwpa_one' 
        	  	},
        		{ 
        	  		aty: '1', //指定工号类型 
        	  		a: '1001', //指定的工号 
        	  		nameAccount: '800093175', //营销QQ号码 
        	  		//node: 'p' //WPA被放置的元素 
        	  		selector: 'qqwpa_else' 
        	  	},
        	  	{ 
        	  		aty: '1', 
        	  		a: '1002',
        	  		nameAccount: '800093175', 
        	  		selector: 'qqwpa_two' 
        	  	},
        	  	{ 
        	  		aty: '1', 	
        	  		a: '1003',
        	  		nameAccount: '800093175',
        	  		selector: 'qqwpa_three' 
        	  	},
        	  	{ 
        	  		aty: '1', 
        	  		a: '1004',
        	  		nameAccount: '800093175',
        	  		selector: 'qqwpa_four' 
        	  	},
        	  	{ 
        	  		aty: '1', 
        	  		a: '1005',
        	  		nameAccount: '800093175',
        	  		selector: 'qqwpa_five' 
        	  	},
        	  	{ 
        	  		aty: '1', 
        	  		a: '1005',
        	  		nameAccount: '800093175',
        	  		selector: 'qqwpa_six' 
        	  	}
       ]);
}


}
/*
     FILE ARCHIVED ON 01:14:51 Jun 03, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:31:56 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.014
  captures_list: 79.877
  exclusion.robots.policy: 0.364
  PetaboxLoader3.datanode: 88.052 (4)
  CDXLines.iter: 21.381 (3)
  load_resource: 278.135
  RedisCDXSource: 0.676
  exclusion.robots: 0.381
  LoadShardBlock: 53.812 (3)
  PetaboxLoader3.resolve: 197.732
*/