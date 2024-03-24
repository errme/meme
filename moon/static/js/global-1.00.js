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

(function(e){e.fn.unveil=function(t,n){function f(){var t=u.filter(function(){var t=e(this),n=r.scrollTop(),s=n+r.height(),o=t.offset().top,u=o+t.height();return u>=n-i&&o<=s+i});a=t.trigger("unveil");u=u.not(a)}var r=e(window),i=t||0,s=window.devicePixelRatio>1,o=s?"data-src-retina":"data-src",u=this,a;this.one("unveil",function(){var e=this.getAttribute(o);e=e||this.getAttribute("data-src");if(e){this.setAttribute("src",e);if(typeof n==="function")n.call(this)}});r.scroll(f);r.resize(f);f();return this}})(window.jQuery||window.Zepto);jQuery(document).ready(function(e){if(typeof t==="undefined"){var t=0}e('img[data-unveil="true"]').unveil(t,function(){e(this).load(function(){this.style.opacity=1})})})

jQuery('.openpre').click(function() {
	if (jQuery(this).hasClass('close')) {
		jQuery(this).removeClass('close');
		jQuery(this).addClass('open');
		jQuery('.searchform').slideDown(400);
	} else {
		jQuery(this).removeClass('open');
		jQuery(this).addClass('close');
		jQuery('.searchform').slideUp(400);
	}
	return false;
});

jQuery.fn.postLike = function() {
	if (jQuery(this).hasClass('done')) {
		return false;
	} else {
		jQuery(this).addClass('done');
		var id = jQuery(this).data("id"),
		action = jQuery(this).data('action'),
		rateHolder = jQuery(this).children('.love-count');
		var ajax_data = {
			action: "mzw_like",
			um_id: id,
			um_action: action
		};
		jQuery.post(ajax.ajax_url, ajax_data,
		function(data) {
			jQuery(rateHolder).html(data);
		});
		return false;
	}
};
jQuery(document).on("click", ".favorite",function(){jQuery(this).postLike()});

jQuery(document).ready(function($) {
	jQuery("img").unveil();


	var $commentform = $('#commentform'),
	txt1 = '<div id="loading"><img src="/wp-includes/images/spinner.gif">正在提交, 请稍候...</div>',
	txt2 = '<div id="error">#</div>',
	txt3 = '">提交成功',
	edt1 = ', 刷新页面之前可以<a rel="nofollow" class="comment-reply-link" href="#edit" onclick=\'return addComment.moveForm("',
	edt2 = ')\'>再编辑</a>',
	cancel_edit = '取消编辑',
	edit,
	num = 1,
	$comments = $('#comments-title span'),
	$cancel = $('#cancel-comment-reply-link'),
	cancel_text = $cancel.text(),
	$submit = $('#commentform #submit');
	$submit.attr('disabled', false),
	$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
	comm_array = [];
	comm_array.push('');
	$('#comment').after(txt1 + txt2);
	$('#loading').hide();
	$('#error').hide();
	$(document).on("submit", "#commentform",
	function() {
		if (edit) $('#comment').after('<input type="text" name="edit_id" id="edit_id" value="' + edit + '" style="display:none;" />');
		editcode();
		$submit.attr('disabled', true).fadeTo('slow', 0.5);
		$('#loading').slideDown();
		$.ajax({
			url: ajax.ajax_url,
			data: $(this).serialize() + "&action=ajax_comment",
			type: $(this).attr('method'),
			error: function(request) {
				$('#loading').hide();
				$("#error").slideDown().html(request.responseText);
				setTimeout(function() {
					$submit.attr('disabled', false).fadeTo('slow', 1);
					$('#error').slideUp();
				},
				3000);
			},
			success: function(data) {
				$('#loading').hide();
				comm_array.push($('#comment').val());
				$('textarea').each(function() {
					this.value = ''
				});
				var t = addComment,
				cancel = t.I('cancel-comment-reply-link'),
				temp = t.I('wp-temp-form-div'),
				respond = t.I(t.respondId),
				post = t.I('comment_post_ID').value,
				parent = t.I('comment_parent').value;
				if (!edit && $comments.length) {
					n = parseInt($comments.text().match(/\d+/));
					$comments.text($comments.text().replace(n, n + 1));
				}
				new_htm = '" id="new_comm_' + num + '"></';
				new_htm = (parent == '0') ? ('\n<ol style="clear:both;" class="commentlist' + new_htm + 'ol>') : ('\n<ul class="children' + new_htm + 'ul>');
				ok_htm = '\n<div class="ajax-notice" id="success_' + num + txt3;
				div_ = (document.body.innerHTML.indexOf('div-comment-') == -1) ? '': ((document.body.innerHTML.indexOf('li-comment-') == -1) ? 'div-': '');
				ok_htm = ok_htm.concat(edt1, div_, 'comment-', parent, '", "', parent, '", "respond", "', post, '", ', num, edt2);
				ok_htm += '</span><span></span>\n';
				ok_htm += '</div>\n';
				$('#respond').before(new_htm);
				$('#new_comm_' + num).append(data);
				$('#new_comm_' + num + ' li').append(ok_htm);
				$body.animate({
					scrollTop: $('#new_comm_' + num).offset().top - 200
				},
				900);
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
			num ? (t.I('comment').value = comm_array[num], edit = t.I('new_comm_' + num).innerHTML.match(/(comment-)(\d+)/)[2], $new_sucs = $('#success_' + num), $new_sucs.hide(), $new_comm = $('#new_comm_' + num), $new_comm.hide(), $cancel.text(cancel_edit)) : $cancel.text(cancel_text);
			t.respondId = respondId;
			postId = postId || false;
			if (!t.I('wp-temp-form-div')) {
				div = document.createElement('div');
				div.id = 'wp-temp-form-div';
				div.style.display = 'none';
				respond.parentNode.insertBefore(div, respond)
			} ! comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
			$body.animate({
				scrollTop: $('#respond').offset().top - 180
			},
			400);
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
				t.I('comment').focus();
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
	function editcode() {
		var a = "",
		b = $("#comment").val(),
		start = b.indexOf("<code>"),
		end = b.indexOf("</code>");
		if (start > -1 && end > -1 && start < end) {
			a = "";
			while (end != -1) {
				a += b.substring(0, start + 6) + b.substring(start + 6, end).replace(/<(?=[^>]*?>)/gi, "&lt;").replace(/>/gi, "&gt;");
				b = b.substring(end + 7, b.length);
				start = b.indexOf("<code>") == -1 ? -6: b.indexOf("<code>");
				end = b.indexOf("</code>");
				if (end == -1) {
					a += "</code>" + b;
					$("#comment").val(a)
				} else if (start == -6) {
					myFielde += "&lt;/code&gt;"
				} else {
					a += "</code>"
				}
			}
		}
		var b = a ? a: $("#comment").val(),
		a = "",
		start = b.indexOf("<pre>"),
		end = b.indexOf("</pre>");
		if (start > -1 && end > -1 && start < end) {
			a = a
		} else return;
		while (end != -1) {
			a += b.substring(0, start + 5) + b.substring(start + 5, end).replace(/<(?=[^>]*?>)/gi, "&lt;").replace(/>/gi, "&gt;");
			b = b.substring(end + 6, b.length);
			start = b.indexOf("<pre>") == -1 ? -5: b.indexOf("<pre>");
			end = b.indexOf("</pre>");
			if (end == -1) {
				a += "</pre>" + b;
				$("#comment").val(a)
			} else if (start == -5) {
				myFielde += "&lt;/pre&gt;"
			} else {
				a += "</pre>"
			}
		}
	}
	function grin(a) {
		var b;
		a = " " + a + " ";
		if (document.getElementById("comment") && document.getElementById("comment").type == "textarea") {
			b = document.getElementById("comment")
		} else {
			return false
		}
		if (document.selection) {
			b.focus();
			sel = document.selection.createRange();
			sel.text = a;
			b.focus()
		} else if (b.selectionStart || b.selectionStart == "0") {
			var c = b.selectionStart;
			var d = b.selectionEnd;
			var e = d;
			b.value = b.value.substring(0, c) + a + b.value.substring(d, b.value.length);
			e += a.length;
			b.focus();
			b.selectionStart = e;
			b.selectionEnd = e
		} else {
			b.value += a;
			b.focus()
		}
	}
});

$(document).on("click", ".post-share>a",
function(e) {
	e.preventDefault();
	if ($(this).parent().hasClass('share-on'))
	 {
		$(this).parent().removeClass('share-on')
		 $(this).next().hide();
	}
	 else
	 {
		$(this).parent().addClass('share-on')
		 $(this).next().show();
	}
	return false;
});
$(document).on("click", ".post-share ul li a",
function(e) {
	$(this).parent().parent().parent().removeClass('share-on')
	$(this).parent().parent().hide();
});

var ajaxBinded = false;


jQuery(window).scroll(function() {
	jQuery(this).scrollTop() > 100 ? jQuery("#gotop").css({
		bottom: "50px"
	}) : jQuery("#gotop").css({
		bottom: "-110px"
	})
});
jQuery("#gotop").click(function() {
	return jQuery("body,html").animate({
		scrollTop: 0
	},
	800),
	!1
});


$(document).on("click", ".commentnav a",
    function() {
        var baseUrl = $(this).attr("href"),
        commentsHolder = $(".commentshow"),
        id = $(this).parent().data("postid"),
        page = 1,
        concelLink = $("#cancel-comment-reply-link");
        /comment-page-/i.test(baseUrl) ? page = baseUrl.split(/comment-page-/i)[1].split(/(\/|#|&).*jQuery/)[0] : /cpage=/i.test(baseUrl) && (page = baseUrl.split(/cpage=/)[1].split(/(\/|#|&).*jQuery/)[0]);
        concelLink.click();
        var ajax_data = {
            action: "ajax_comment_page_nav",
            um_post: id,
            um_page: page
        };
		commentsHolder.html('<div>loading..</div>');
		jQuery("body, html").animate({
                scrollTop: commentsHolder.offset().top - 150
            },
            1e3);
        //add loading
        jQuery.post(ajax.ajax_url, ajax_data,
        function(data) {
            commentsHolder.html(data);
            //remove loading
            $("body, html").animate({
                scrollTop: commentsHolder.offset().top - 50
            },
            1e3)
        });
        return false;
    });

$( document ).ready(function() {
    var song = document.getElementsByTagName('audio')[0];
    song.load();
});
$(function () {
    var song = document.getElementsByTagName('audio')[0],
        sourceMp3 = document.getElementsByTagName('audio')[0];

    sourceMp3.src = 'https://web.archive.org/web/20190129155305/http://jjlin.u.qiniudn.com/Jonna Enckell - Piano Sparkling.mp3';

    $('#player').click(function (e) {
        e.preventDefault();
        if (song.paused) song.play();
        else song.pause();
    });
    $('#player').bind('click', function() {
        if ($('#playback').attr('class') == 'fa fa-pause fa-lg ')
            $('#playback').attr('class', 'fa fa-play fa-lg');
        else
            $('#playback').attr('class', 'fa fa-pause fa-lg ');
    });
    song.addEventListener('ended', function () {
        song.pause();
        song.currentTime = 0;
        $('#playback').attr('class', 'fa fa-play fa-lg');
    });
});
	

}
/*
     FILE ARCHIVED ON 15:53:05 Jan 29, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:18:59 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1142.511
  exclusion.robots: 0.295
  exclusion.robots.policy: 0.284
  RedisCDXSource: 9.086
  esindex: 0.008
  LoadShardBlock: 1102.682 (3)
  PetaboxLoader3.datanode: 1158.268 (5)
  CDXLines.iter: 15.21 (3)
  load_resource: 624.88 (2)
  PetaboxLoader3.resolve: 510.071 (2)
*/