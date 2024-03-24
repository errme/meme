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


App = {
  mouseEvent:function() { 
  // 滚动
	    $('#directory-content a[href*="#"]:not([href="#"])').click(function() {
	        if ( location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname ) {
	            var target = $(this.hash);
	            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
	            if (target.length) {
	                $("html, body").animate({
	                        scrollTop: target.offset().top - 80
	                    },
	                    500
	                );
	                return false;
	            }
	        }
	    });
  // 目录导航
	$('.content-area .entry-content h2').each(function(i) {
        	j = i++;
        	$(this).attr('id','directory-'+j);
    	});
		
  // Archives Page
	$('.archives').hide();
	$('.archives:first').show();
	$('.archive-title h3').click(function() {
		$(this).next().slideToggle('fast');
		return false;
	});
	
  $(".scrolldown").click(function (){  
                $('html, body').animate({  
                    scrollTop: $("#page").offset().top -60 
                }, 600);  
            });
 
  //shortcode
	$(".cr-tabs").tabs();
	
	$(".cr-toggle").each( function () {
		var $this = $(this);
		if( $this.attr('data-id') == 'closed' ) {
			$this.accordion({ header: '.cr-toggle-title', collapsible: true, active: false  });
		} else {
			$this.accordion({ header: '.cr-toggle-title', collapsible: true});
		}

		$this.on('accordionactivate', function( e, ui ) {
			$this.accordion('refresh');
		});

		$(window).on('resize', function() {
			$this.accordion('refresh');
		});
	});
  
	 //footer-tips 
	$(".footer-tips i").click(function(){
    $(".footer-tips").fadeToggle("fast");
	});
   
	//share    
	 $('.post-share a').click(function (event) {   
		 event.stopPropagation();   
		 $('.share-icons').fadeToggle("fast");  
		 return false;
	 });  
	$(document).click(function(event){
		var _con = $('.share-icons'); 
		if(!_con.is(event.target) && _con.has(event.target).length === 0){
		$('.share-icons').fadeOut('fast'); 
			 }
	});
	
	//donate
	$(".donate_icon img , i.iconfont.donate_close").click(function(){
		$(".donate_box").fadeToggle("fast");
		$(".donate_hide_box").fadeToggle("fast");
	});
	
	//ajax实时头像
	 $("input#email").blur(function() { // 输入框焦点
        var _email = $(this).val();
            $.ajax({
                type: "GET",
                data: {
                    action: 'ajax_avatar_get',  
                    form: Theme.ajaxurl,  // 主题的AJAX路径
                    email: _email
                },
                success: function(data) {
                    $('.v-avatar').attr('src', data); // 替换头像链接到img标签
                }
            }); // end ajax

        });
		
	//灯箱
	baguetteBox.run('.entry-content', {
        captions: function(element) {
            // `this` == Array of current gallery items
            return element.getElementsByTagName('img')[0].alt;
        }
    });	
	
  //结束
  },
  
  //back to top
gotop:function() { 
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 100,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	
		//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
  },
	
//preloading
preloading:function() { 	
$({property: 0}).animate({property: 100}, {
                duration: 1000,
                step: function() {
                    var percentage = Math.round(this.property);
                    $('#progress').css('width',  percentage+"%");
                     if(percentage == 100) {
                            $("#progress").addClass("done");//完成，隐藏进度条
                        }
                }
});
},



// 评论分页
commentsPaging:function() {
 $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $(document).on('click', '#comments-navi a',
    function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            beforeSend: function() {
                $('#comments-navi').remove();
                $('ul.commentwrap').remove();
                $('#loading-comments').slideDown()
            },
            dataType: "html",
            success: function(out) {
                result = $(out).find('ul.commentwrap');
                nextlink = $(out).find('#comments-navi');
                $('#loading-comments').slideUp(550);
                $('#loading-comments').after(result.fadeIn(800));
                $('ul.commentwrap').after(nextlink)
            }
        })
    });
},

skipper:function() { 
$(".slider-container").ikSlider({
		  speed: 500 ,
          controls: true,
		});
},

  Postindex: function() {
    	if ($('#directory-content')[0]) {
	    	var postDirectory = new Headroom(document.getElementById("directory-content"), {
			tolerance: 0,
			offset: 200,
			classes: {
				initial: "initial",
				pinned: "pinned",
				unpinned: "unpinned"
			}
			});
			postDirectory.init();
		}
    },

}
		
	
//ajax comments
function ajaxComt(){
    var commentform = '#commentform', // ××× form表单id
    comment = 'comment', // ××× textarea 的id 不带#
    commentlist = 'commentwrap',  // ××× 评论列表ul或ol的class，不带点
    respond = '#respond',  // ××× 评论插入位置，插入在这个id之前
    //homeUrl = document.location.href.match(/http:\/\/([^\/]+)\//i)[0], // 主页地址，用于下面的提交函数
    txt1 = '<div id="loading" class="text-info"><span class="comload"></span></div>',
    txt2 = '<div id="error">#</div>',
    txt3 = '"><div class="text-success"> <span class="sub-yes"></span>',
    edt1 = ' 刷新页面之前您可以<a rel="nofollow" class="comment-reply-link" href="#edit" onclick=\'return addComment.moveForm("',
    edt2 = ')\'>再次编辑评论</a></div>',
    cancel_edit = '取消编辑',
    edit,
    num = 1,
    $comments = $('#response'), // 评论数
    $cancel = $('#cancel-comment-reply-link'),
    cancel_text = $cancel.text(),
    $submit = $('#commentform #submit');
    $submit.attr('disabled', false),
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    comm_array = [];
    comm_array.push('');
    $('#'+comment).after(txt1 + txt2); // ××× textarea的id或class
    $('#loading').hide();
    $('#error').hide();
    // 评论提交
$('#commentform').submit(  //原版为动态绑定，即 $(document).on("submit", commentform,
    function() {
        if (edit) $('#'+comment).after('<input type="text" name="edit_id" id="edit_id" value="' + edit + '" style="display:none;" />');
        $submit.attr('disabled', true).fadeTo('slow', 0.5);
        $('#loading').slideDown();
        $.ajax({
            url: Theme.ajaxurl,
            data: $(this).serialize() + "&action=ajax_comment_post",
            type: $(this).attr('method'),
            error: function(request) {
                $('#loading').slideUp();
                $("#error").slideDown().html('<span class="sub-no"></span>' +request.responseText);
                setTimeout(function() {
                    $submit.attr('disabled', false).fadeTo('slow', 1);
                    $('#error').slideUp();
                },
                3000);
            },
            success: function(data) {
                $('#loading').hide();
                comm_array.push($('#'+comment).val());
                $('textarea').each(function() {
                    this.value = ''
                });
                var t = addComment,
                cancel = t.I('cancel-comment-reply-link'),
                temp = t.I('wp-temp-form-div'),
                respond = t.I(t.respondId),
                post = t.I('comment_post_ID').value,
                parent = t.I('comment_parent').value;
                // 增加评论数
                if (!edit && $comments.length) { 
                    n = parseInt($comments.text().match(/\d+/)); // 匹配数字
                    $comments.text($comments.text().replace(n, n + 1));
                }
                // 评论显示
                new_htm = '" id="new_comm_' + num + '"></';
                new_htm = (parent == '0') ? ('\n<ol class="'+commentlist+'" ' +  new_htm + 'ol>') : ('\n<ul class="children' + new_htm + 'ul>');
                ok_htm = '\n<div class="ajax-notice" id="success_' + num + txt3;
                div_ = (document.body.innerHTML.indexOf('div-comment-') == -1) ? '': ((document.body.innerHTML.indexOf('li-comment-') == -1) ? 'div-': '');
                ok_htm = ok_htm.concat(edt1, div_, 'comment-', parent, '", "', parent, '", "respond", "', post, '", ', num, edt2);
                ok_htm += '</span><span></span>\n';
                ok_htm += '</div>\n';
                if($('.commentwrap')[0]){ // ××××××××××××××××××××非嵌套评论时，新评论显示插入的位置（按自己的喜好修改显示位置）
                    $('.commentlist').append('<ul class="commentwrap"></ul>');
                    $('.commentwrap').prepend(new_htm);
                } else {
                    $('#respond').after(new_htm);
                }
                $('#new_comm_' + num).append(data);
                $('#new_comm_' + num + ' li').append(ok_htm);
                $body.animate({scrollTop: $('#new_comm_' + num).offset().top - 200},900);
                countdown();
                num++;
                edit = '';
                $('*').remove('#edit_id');
                cancel.style.display = 'none';
                cancel.onclick = null;
                t.I('comment_parent').value = '0';
                if (temp && respond) {
                    temp.parentNode.insertBefore(respond, temp);
                    temp.parentNode.removeChild(temp)
                }
            }
        });
        return false;
    });
    addComment = {
        moveForm: function(commId, parentId, respondId, postId, num) {
            var t = this,
            div,
            comm = t.I(commId),
            respond = t.I(respondId),
            cancel = t.I('cancel-comment-reply-link'),
            parent = t.I('comment_parent'),
            post = t.I('comment_post_ID');
            if (edit) exit_prev_edit();
            num ? (t.I(comment).value = comm_array[num], edit = t.I('new_comm_' + num).innerHTML.match(/(comment-)(\d+)/)[2], $new_sucs = $('#success_' + num), $new_sucs.hide(), $new_comm = $('#new_comm_' + num), $new_comm.hide(), $cancel.text(cancel_edit)) : $cancel.text(cancel_text);
            t.respondId = respondId;
            postId = postId || false;
            if (!t.I('wp-temp-form-div')) {
                div = document.createElement('div');
                div.id = 'wp-temp-form-div';
                div.style.display = 'none';
                respond.parentNode.insertBefore(div, respond)
            } ! comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
            $body.animate({scrollTop: $('#respond').offset().top - 180},400);
            if (post && postId) post.value = postId;
            parent.value = parentId;
            cancel.style.display = '';
            cancel.onclick = function() {
                if (edit) exit_prev_edit();
                var t = addComment,
                temp = t.I('wp-temp-form-div'),
                respond = t.I(t.respondId);
                t.I('comment_parent').value = '0';
                if (temp && respond) {
                    temp.parentNode.insertBefore(respond, temp);
                    temp.parentNode.removeChild(temp);
                }
                this.style.display = 'none';
                this.onclick = null;
                return false;
            };
            try {
                t.I(comment).focus();
            }
             catch(e) {}
            return false;
        },
        I: function(e) {
            return document.getElementById(e);
        }
    };
    function exit_prev_edit() {
        $new_comm.show();
        $new_sucs.show();
        $('textarea').each(function() {
            this.value = ''
        });
        edit = '';
    }
    var wait = 15,
    submit_val = $submit.val();
    function countdown() {
        if (wait > 0) {
            $submit.val(wait);
            wait--;
            setTimeout(countdown, 1000);
        } else {
            $submit.val(submit_val).attr('disabled', false).fadeTo('slow', 1);
            wait = 15;
        }
    }
} 

 //////////// share /////////////
jQuery(document).on("click", ".share-icons span",
function() {
var e = jQuery(this),
t = e.data("type"),
r = e.parent(),
a = r.data("title"),
n = r.data("url"),
o = r.data("thumb"),
c = ["toolbar=0,status=0,resizable=1,width=640,height=560,left=", (screen.width - 640) / 2, ",top=", (screen.height - 560) / 2].join(""),
i;
switch (t) {
case "weibo":
i = "https://web.archive.org/web/20190213184710/http://service.weibo.com/share/share.php?title=" + a + "&appkey=4221439169&url=" + n;
window.open(i, "分享", c);
break;
case "qzone":
i = "https://web.archive.org/web/20190213184710/http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + a + "&url=" + n;
window.open(i, "分享", c);
break;
case "qq":
i = "https://web.archive.org/web/20190213184710/http://connect.qq.com/widget/shareqq/index.html?title=" + a + "&url=" + n;
window.open(i, "分享", c);
break;
case "tieba":
i = "https://web.archive.org/web/20190213184710/http://tieba.baidu.com/f/commit/share/openShareApi?title=" + a + "&url=" + n;
window.open(i, "分享", c);
break;
case "wechat":
i = "https://web.archive.org/web/20190213184710/http://qr.liantu.com/api.php?text=" + n;
window.open(i, "分享", c);
break;
case "twitter":
i = "https://web.archive.org/web/20190213184710/http://twitter.com/share?text=" + a + "&url=" + n;
window.open(i, "分享", c);
break;
case "facebook":
i = "https://web.archive.org/web/20190213184710/http://www.facebook.com/sharer.php?text=" + a + "&url=" + n;
window.open(i, "分享", c);
break
}
return false
});

 ////////////header and footer/////////////
  $(".top-tips a").click(function(){
    $(".tips-box").fadeToggle("fast");
  });

//header_2
$(".left-modal-bt").pageslide({ direction: "right", modal: false });

$('.js-toggle-search').on('click', function () {
    $('.js-toggle-search').toggleClass('is-active');
    $('.ma-search').toggleClass('is-visible');
    });	
	
//open popup
	$('.cd-popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });	

  
////////////////postlike///////////////
$.fn.postLike = function() {
 if ($(this).hasClass('done')) {
 return false;
 } else {
 $(this).addClass('done');
 var id = $(this).data("id"),
 action = $(this).data('action'),
 rateHolder = $(this).children('.count');
 var ajax_data = {
 action: "bigfa_like",
 um_id: id,
 um_action: action
 };
 $.post("/wp-admin/admin-ajax.php", ajax_data,
 function(data) {
 $(rateHolder).html(data);
 });
 return false;
 }
};
$(document).on("click", ".favorite",
function() {
 $(this).postLike();
});

/////////Wow.js div渐变加载动画//////////////////	  
var wow = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       70,
    mobile:       true,
    live:         true,
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null
  }
);
wow.init();



App.gotop();
App.mouseEvent();
ajaxComt(); 
App.commentsPaging();
App.skipper();  
App.preloading();
App.Postindex();

 //pjax
if(Theme.pjax){
$(document).pjax('a[target!=_top]', '#pjax-container', { // .page 需要刷新的 DIV 部分的类名
    fragment: '#pjax-container',
    timeout: 8000,
}).on('pjax:send', function() { 
    // 此处放置Pjax在加载过程中需要执行的动作，比如加载条函数
    $('body').append('<div id="progress"><span></span></div>'); // 加载过度动画
}).on('pjax:complete', function() {
    // 此处放置Pjax加载完毕后重载的函数，比如ajax评论函数
	Prism.highlightAll();
    ajaxComt();
    App.mouseEvent();
	App.Postindex();
    //App.commentsPaging(); 
    App.skipper();
    App.preloading();
    $('#progress').remove();// 删除过度动画 
    window.addEventListener('popstate',function(e) {
        // 此处放置浏览器点击后退键需要执行的函数
        App.mouseEvent();
		App.skipper();		
    }, false);
    
}).on('submit', '.ma-search', function (e) {  // .ma-search 搜索from标签的类名, 多个逗号隔开

    e.preventDefault(); // 去除搜索框默认事件
    $.pjax.submit(e, '#pjax-container', { // .page 需要刷新的 DIV 部分的类名
        fragment:'#pjax-container', 
        timeout:8000,
    });

});
}

}
/*
     FILE ARCHIVED ON 18:47:10 Feb 13, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:50 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.014
  captures_list: 147.016
  load_resource: 287.564 (2)
  RedisCDXSource: 0.784
  LoadShardBlock: 118.441 (3)
  exclusion.robots: 0.39
  PetaboxLoader3.datanode: 183.437 (5)
  exclusion.robots.policy: 0.368
  CDXLines.iter: 21.912 (3)
  PetaboxLoader3.resolve: 95.474 (2)
*/