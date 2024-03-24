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

function topCopy(obj) {
	if (obj != "") {
		var ok = window.clipboardData.setData("Text", document.getElementById(obj).value);
		if (ok == true)
			document.getElementById(obj).select();
	}
}

function del_html_tags(str, reallyDo, replaceWith) {
	var e = new RegExp(reallyDo, "g");
	words = str.replace(e, replaceWith);
	return words;
}

function ContentReplace() {
	var tbold = document.getElementById("tbOld").value;
	var tbnew = document.getElementById("tbNew").value;
	var tbContent = document.getElementById("Content").value;

	if (tbold == '') {
		alert("请输入待替换的字符！");
		return;
	}

	tbContent = del_html_tags(tbContent,tbold, tbnew);
	document.getElementById("Content").value = tbContent;
	alert("替换成功！\r\n已将【"+tbold+"】全部替换为【"+tbnew+"】");
}

function setHome() {
	try {
		home.style.behavior = 'url(#default#homepage)';
		home.setHomePage('https://web.archive.org/web/20181118004605/http://www.yan-wei.net');
	} catch (e) {
		alert("设置首页失败：" + e.description);
	}
}

function getCount() {
	var len;
	var len0;
	var value = document.getElementById("Content").value;
	Len = value.replace(/(\r\n)$/gm, '').split(''), len = len0 = Len.length;
	for (o in Len) {
		if (Len[o].charCodeAt(0) > 256) {
			len++;
		}
	}
	alert("共有 " + len0 + " 个字符");
}

function AddFavorite(sURL, sTitle)
{
	try
	{
		window.external.addFavorite(sURL, sTitle);
	}
	catch (e)
	{
		try
		{
			window.sidebar.addPanel(sTitle, sURL, "");
		}
		catch (e)
		{
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

function ShowLoading() {
    //以下代码判断排版文字是否超过限制
    var NowNum = document.getElementById('Content').value.length;
    if (NowNum > 30000) {
        alert('抱歉，您排版的内容字数超出限制，目前最多支持30000中文字符！');
        return false;
    }
	document.getElementById('authorization_box').style.display="block";
	return true;
}

function copy_clip() {
	var copy = document.getElementById('Content').value;
	if (window.clipboardData) {
		window.clipboardData.setData("Text", copy);
		document.getElementById('Content').select();
		//alert("内容已复制");
		return true;
	}
	else if (window.netscape) {
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = copy;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		document.getElementById('Content').select();
		//alert("内容已复制");
		return true;
	}
	alert("抱歉，您的浏览器不支持该功能，请使用IE浏览器");
	return false;
}

function paste() {
	if (window.clipboardData) {
		document.getElementById("Content").value = window.clipboardData.getData("Text");
		return true;
	} else {
		alert("抱歉，您的浏览器不支持该功能，请使用IE浏览器");
		return false;
	}
}

}
/*
     FILE ARCHIVED ON 00:46:05 Nov 18, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:59 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 160.246
  exclusion.robots: 0.177
  exclusion.robots.policy: 0.168
  RedisCDXSource: 5.908
  esindex: 0.008
  LoadShardBlock: 137.967 (3)
  PetaboxLoader3.datanode: 126.178 (5)
  CDXLines.iter: 14.229 (3)
  load_resource: 211.936 (2)
  PetaboxLoader3.resolve: 142.342 (2)
*/