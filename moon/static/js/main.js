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

var UpPath = "https://web.archive.org/web/20161105142114/http://210.51.2.101/uploadgbk/";

var liveSwitching = true;
 
function $(){
var Var1=new Array();
for(var i=0;i<arguments.length;i++){
var Var2=arguments[i];
if(typeof Var2=="string"){
Var2=document.getElementById(Var2);
}
if(arguments.length==1){
return Var2;
}
Var1.push(Var2);
}
return Var1;
}


var WinLoad={loadfuncs:new Array(),addFunc:function(ref){
 
}

};


function switchSearch(smode) {
    if (!liveSwitching) {
        return true;
        }
    else {
        $("smode").value = smode;
        var stabs = $("taglist").getElementsByTagName("li");
        for (var i=0; i < stabs.length; i++) stabs[i].className = "";
        $("sm_"+smode).className = "selected";
        $("sb").focus();
        return false;
    } 
}



//Media Link
function playmedia(playIcon, strID,strURL,intWidth,intHeight) {

	playIcon.replace(" ","%20");
	strID.replace(" ","%20");
	
	var objDiv=document.getElementById(strID);
	document.getElementById(playIcon).style.display='none';
	
	if (!objDiv) return false;
	if (objDiv.style.display!='none') {
		objDiv.innerHTML='';
		objDiv.style.display='none';
	} else {
		objDiv.innerHTML=makemedia(strURL,intWidth,intHeight);
		objDiv.style.display='block';
	}
}

//Media Build
function makemedia (strURL,intWidth,intHeight) {
	var strHtml;
	
	strHtml ="<object id='MediaPlayer1' width='"+ intWidth +"' height='"+ intHeight +"' classid='CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95' codebase='https://web.archive.org/web/20161105142114/http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715' align='baseline' border='0' standby='Loading Microsoft Windows Media Player components...' type='application/x-oleobject'>";
	strHtml+="<param name='invokeURLs' value='0'>";
    	strHtml+="<param name='FileName' value=\""+ strURL +"\">";
    	strHtml+="<param name='ShowControls' value='1'>";
    	strHtml+="<param name='ShowPositionControls' value='0'>";
    	strHtml+="<param name='ShowAudioControls' value='1'>";
    	strHtml+="<param name='ShowTracker' value='1'>";
    	strHtml+="<param name='ShowDisplay' value='0'>";
    	strHtml+="<param name='ShowStatusBar' value='1'>";
    	strHtml+="<param name='AutoSize' value='0'>";
    	strHtml+="<param name='ShowGotoBar' value='0'>";
    	strHtml+="<param name='ShowCaptioning' value='0'>";
    	strHtml+="<param name='AutoStart' value='1'>";
    	strHtml+="<param name='PlayCount' value='0'>";
    	strHtml+="<param name='AnimationAtStart' value='0'>";
    	strHtml+="<param name='TransparentAtStart' value='0'>";
    	strHtml+="<param name='AllowScan' value='0'>";
    	strHtml+="<param name='EnableContextMenu' value='1'>";
    	strHtml+="<param name='ClickToPlay' value='0'>";
    	strHtml+="<param name='DefaultFrame' value='datawindow'>";
	
	
	strHtml+="<embed src=\""+ strURL +"\" align='baseline' border='0' width='"+ intWidth +"' height='"+ intHeight +"' type='application/x-mplayer2'";
        strHtml+=" pluginspage='https://web.archive.org/web/20161105142114/http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;'";
        strHtml+="name='MediaPlayer' showcontrols='1' showpositioncontrols='0' showaudiocontrols='1' showtracker='1' showdisplay='0' showstatusbar='1' autosize='0' showgotobar='0' showcaptioning='0' autostart='1' autorewind='0'";
        strHtml+="animationatstart='0' transparentatstart='0' allowscan='1' enablecontextmenu='1' clicktoplay='0' defaultframe='datawindow' invokeurls='0'> </embed></object>";
        
     
	return strHtml;
}




//重新改写开始

function GetSongType(md5code)
{
	switch(md5code)
	{
		case "7d99bb4c7bd4602c342e2bb826ee8777":
			return ".wma";
			break;
		case "25e4f07f5123910814d9b8f3958385ba":
			return ".Wma";
			break;
		case "51bbd020689d1ce1c845a484995c0cce":
			return ".WMA";
			break;
		case "b3a7a4e64bcd8aabe4cabe0e55b57af5":
			return ".mp3";
			break;
		case "d82029f73bcaf052be8930f6f4247184":
			return ".MP3";
			break;
		case "5fd91d90d9618feca4740ac1f2e7948f":
			return ".Mp3";
			break;
	}	
}

//Media Link
function playmedia1(playIcon, strID,strURL,intWidth,intHeight,type, Head,st_songid,t) {
 
	playIcon.replace(" ","%20");
	strID.replace(" ","%20");
	
	var objDiv=document.getElementById(strID);
	document.getElementById(playIcon).style.display='none';
	
	if (!objDiv) return false;
	if (objDiv.style.display!='none') {
		objDiv.innerHTML='';
		objDiv.style.display='none';
	} else {
		if(strURL.indexOf('rayfile')>0) {
			var SongUrl = Head + strURL + GetSongType(type);
			objDiv.innerHTML=makemedia_html(SongUrl,intWidth,intHeight);
			objDiv.style.display='block';
		} else {
			$.ajax({
				type:'POST',
				url:'/time.php',
				cache:false,
				data:'str='+strURL+'&sid='+st_songid+'&t='+t,
				dataType:'html',
				success:function(data){
					//alert(data);
					if(data){
						objDiv.innerHTML=makemedia_html(data,intWidth,intHeight);
						objDiv.style.display='block';
						if(data.indexOf('duomi.com') > 0){
							$("#show_logo").show();	
						}
					}
				},
				error:function(data){
					//alert('error');
				}
				});
		}
		
	}
}

//Media Build
function makemedia_html (SongUrl,intWidth,intHeight) {
	var strHtml ="<object id='MediaPlayer1' width='"+ intWidth +"' height='"+ intHeight +"' classid='CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95' codebase='https://web.archive.org/web/20161105142114/http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715' align='baseline' border='0' standby='Loading Microsoft Windows Media Player components...' type='application/x-oleobject'>";
	strHtml+="<param name='invokeURLs' value='0'>";
		strHtml+="<param name='AutoRewind' value='1'>";
    	strHtml+="<param name='FileName' value=\""+ SongUrl +"\">";
    	strHtml+="<param name='ShowControls' value='1'>";
    	strHtml+="<param name='ShowPositionControls' value='0'>";
    	strHtml+="<param name='ShowAudioControls' value='1'>";
    	strHtml+="<param name='ShowTracker' value='1'>";
    	strHtml+="<param name='ShowDisplay' value='0'>";
    	strHtml+="<param name='ShowStatusBar' value='1'>";
    	strHtml+="<param name='AutoSize' value='0'>";
    	strHtml+="<param name='ShowGotoBar' value='0'>";
    	strHtml+="<param name='ShowCaptioning' value='0'>";
    	strHtml+="<param name='AutoStart' value='1'>";
    	strHtml+="<param name='PlayCount' value='100'>";
    	strHtml+="<param name='AnimationAtStart' value='0'>";
    	strHtml+="<param name='TransparentAtStart' value='0'>";
    	strHtml+="<param name='AllowScan' value='0'>";
    	strHtml+="<param name='EnableContextMenu' value='1'>";
    	strHtml+="<param name='ClickToPlay' value='0'>";
    	strHtml+="<param name='DefaultFrame' value='datawindow'>";
	
	
	strHtml+="<embed src=\""+ SongUrl +"\" align='baseline' border='0' width='"+ intWidth +"' height='"+ intHeight +"' type='application/x-mplayer2'";
        strHtml+=" pluginspage='https://web.archive.org/web/20161105142114/http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;'";
        strHtml+="name='MediaPlayer' showcontrols='1' showpositioncontrols='0' showaudiocontrols='1' showtracker='1' showdisplay='0' showstatusbar='1' autosize='0' showgotobar='0' showcaptioning='0' autostart='1' autorewind='1'";
        strHtml+="animationatstart='0' transparentatstart='0' allowscan='1' enablecontextmenu='1' clicktoplay='0' defaultframe='datawindow' invokeurls='0' playcount='100'> </embed></object>";
        
     
	return strHtml;
	
}

function wrtSongLink(strURL,intWidth,intHeight,type, Head)
{
	
	SongUrl = Head + strURL + GetSongType(type);
	if(SongUrl.length > 35)
		SongUrl1 = SongUrl.slice(0,24)+"......"+SongUrl.slice(-10)
	else
		SongUrl1 = SongUrl
		
	document.write("下载地址 <a href='"+SongUrl +"'>"+SongUrl1+"</a>")	
	//document.write("<a href=\"#\" onclick=\"window.open('"+Head + strURL + GetSongType(type) +"','','width=0,height=0,top=0,left=0');\">点此下载</a>")
}
//重新改写结束



var chkArray=document.getElementsByName("chkSongID");

//全选反选,s 1全选,s 0反选
function selAll(s){
	if(chkArray.length){
		var sel=true;
		switch(s){
			case 1:
				for(i=0;i<chkArray.length;i++){
					if(!chkArray[i].checked){
						sel=false;
						break;
					}
				}
				for(i=0;i<chkArray.length;i++){
				   chkArray[i].checked=sel?false:true; 
				}
				break;
			case 0:
				for(i=0;i<chkArray.length;i++){
				   chkArray[i].checked=chkArray[i].checked?false:true; 
				}
				break;	
		}
	}

}

//判断是否有记录被选中
function sel(){
	var sel=false;
	if(chkArray.length){
		for(i=0;i<chkArray.length;i++){
			if(chkArray[i].checked){
				sel=true;
				break;
			}
		}
	}
	return sel;
}


function doMusicList(){
	if(sel())
	{
		var id="";
		for(i=0;i<chkArray.length;i++)
		{
			if(chkArray[i].checked)
			{
				id+=chkArray[i].value+",";
        		}
		}
		id=id.substring(0,id.length-1);
	
		window.open("/playmusic.php?song_id="+id+"","songtaste","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=50,height=50");
	}
	else
	{
		alert("请选择歌曲");
	}
}

//批量删除推荐歌曲
function delSongBat(pageref){		
	if(sel())
	{
		var id="";
		for(i=0;i<chkArray.length;i++)
		{
			if(chkArray[i].checked)
			{
				id+=chkArray[i].value+",";
        		}
		}
		id=id.substring(0,id.length-1);
	
		if(confirm("确定要从推荐列表中删除该歌曲吗?"))
		{
			window.location="info_oper.php?tag=delsong_bat&songid="+id+"&pageref="+pageref;
		}
		
	}
	else
	{
		alert("请选择歌曲");
	}
}


function addBoxList(){
	if(sel())
	{
		var id="";
		for(i=0;i<chkArray.length;i++)
		{
			if(chkArray[i].checked)
			{
				id+=chkArray[i].value+",";
        		}
		}
		id=id.substring(0,id.length-1);
	
		window.open("/info_oper.php?tag=addboxlist&song_id="+id+"","songtaste","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=280,height=150,top=200,left=210");
	}
	else
	{
		alert("请选择歌曲");
	}
}





function checkall(formname, selnum)   //选中或不选当前页面的所有选项
{
	if ( document.all("selall").checked ==1  )
	{
	    for ( var i = 0; i < selnum; i++ )
	    	formname.sel[i].checked = 1;
	}
	if ( document.all("selall").checked ==0  )
	{
	    for ( var i = 0; i < selnum; i++ )
	    	formname.sel[i].checked = 0;
	}
}





var liveSwitching = true;
 
function $(){
var Var1=new Array();
for(var i=0;i<arguments.length;i++){
var Var2=arguments[i];
if(typeof Var2=="string"){
Var2=document.getElementById(Var2);
}
if(arguments.length==1){
return Var2;
}
Var1.push(Var2);
}
return Var1;
}


var WinLoad={loadfuncs:new Array(),addFunc:function(ref){
 
}

};


function switchSearch(smode) {
    if (!liveSwitching) {
        return true;
        }
    else {
        $("smode").value = smode;
        var stabs = $("taglist").getElementsByTagName("li");
        for (var i=0; i < stabs.length; i++) stabs[i].className = "";
        $("sm_"+smode).className = "selected";
        $("sb").focus();
        return false;
    } 
}






function delsong(songid, pageref)
{
	if(confirm("确定要从推荐列表中删除该歌曲吗?"))
	{
		window.location="/info_oper.php?tag=delsong&songid="+songid+"&pageref="+escape(pageref);
	}
}



function delfavsong(songid, pageref)
{
	if(confirm("确定要从收藏列表中删除该歌曲吗?"))
	{
		window.location="/info_oper.php?tag=delfavsong&songid="+songid+"&pageref="+escape(pageref);
	}
}


function delfavalbum(aid, pageref)
{
	if(confirm("确定要从收藏列表中删除该专辑吗?"))
	{
		window.location="/info_oper.php?tag=delfavalbum&aid="+aid+"&pageref="+escape(pageref);
	}
}


function delgrpfav(favid, grpid)
{
	if(confirm("确定要从小组收藏列表中删除该歌曲吗?"))
	{
		window.location="/info_oper.php?tag=grp_delfav&favid="+favid+"&grpid="+grpid;
	}
}


function delfrd(frdid)
{
	if(confirm("确定要从好友列表中删除吗?"))
	{
		window.location="/info_oper.php?tag=delfrd&frdid="+frdid;
	}
}

function delfavuser(favid)
{
	if(confirm("确定要从推荐列表中删除吗?"))
	{
		window.location="/info_oper.php?tag=delfavuser&favid="+favid;
	}
}

function delbad(frdid)
{
	if(confirm("确定要从坏蛋列表中删除吗?"))
	{
		window.location="/info_oper.php?tag=delbad&frdid="+frdid;
	}
}

function deltag(tagid)
{
	if(confirm("确定要删除该标签吗?"))
	{
		window.location="/info_oper.php?tag=deltag&tagid="+tagid;
	}
}

function delupfile(fileid, pageref)
{
	if(confirm("确定要删除该文件吗?该操作不可恢复!"))
	{
		window.location="/info_oper.php?tag=delupfile&fileid="+fileid+"&pageref="+escape(pageref);
	}
}


function delsonggrade(gradeid)
{
	if(confirm("确定要删除该条评分记录吗?该操作不可恢复!"))
	{
		window.location="/info_oper.php?tag=delsonggrade&gradeid="+gradeid;
	}
}

function delalbumcmt(cmtid)
{
	if(confirm("确定要删除该条评价吗?该操作不可恢复!"))
	{
		window.location="/info_oper.php?tag=del_albumcmt&cmtid="+cmtid;
	}
}


function getCookieVal(offset) { 
  var endstr = document.cookie.indexOf (";", offset); 
  if (endstr == -1) { 
    endstr = document.cookie.length; 
  } 
  return unescape(document.cookie.substring(offset, endstr)); 
} 




function getCookie(name) { 
  var arg = name + "="; 
  var alen = arg.length; 
  var clen = document.cookie.length; 
  var i = 0; 
  while (i < clen) { 
    var j = i + alen; 
    if (document.cookie.substring(i, j) == arg) { 
      return getCookieVal(j); 
    } 
    i = document.cookie.indexOf(" ", i) + 1; 
    if (i == 0) break; 
  } 
  return null; 
} 


function GetUInfoBlk()
{
	var icon = getCookie("CookIcon");
	var uid = getCookie("CookID");
	 

	if( uid == null || uid == "" || uid==0)
	{
		document.write("<div id='sign'>");
		document.write("已经有帐号了？<a href='/signin.php' class='underline white'>登录</a><br />");
		document.write("Or 免费 <a href='/signup.php' class='underline white'>注册</a>");
		document.write("</div>");		
	}
	else
	{
		if( icon == null || icon == "" )
		{
			icon = "default.gif";
		}
		else
			icon = uid.substring(uid.length-2)+"/"+icon;
		
		
		document.write("<div id='user_blk'><ul>");
		document.write("<li class='hb1'><a href='/user/"+uid+"/'>别人眼中我的主页</a></li>");
		document.write("<li class='hb2'><a href='/home.php'>我的操作页</a>  <a href='/home.php?tag=feed'>动态</a></li>");
		document.write("<li class='hb3'><a href='#' onClick=window.open('/play.php?tag=box','popwin_kt','menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=50,height=50'); >音乐盒</a>　<a href='/home.php?tag=fav'>收藏夹</a></li>");
		
		
		document.write("<li><img src='https://web.archive.org/web/20161105142114/http://image.songtaste.com/images/mail.gif'> <a href='/msg.php' id='msgnum'> 0 封未读</a> | <a href='/info_oper.php?tag=signout'>退出</a></li></ul>");
		document.write("<img src='https://web.archive.org/web/20161105142114/http://image.songtaste.com/images/usericon/s/"+icon+"' style='margin:0;margin-right:2px;margin-bottom:-3px;'>");
		document.write("</div>");
		
		path = document.location.pathname;
		if( path.substring(1,6) == "music")
			GetMsgNum();
	}
}


function GetUInfoLeft()
{
	var uid = getCookie("CookID");
	var name = getCookie("CookName");
	var icon = getCookie("CookIcon");
	
	if( uid != null && uid != "" && uid != 0 && name != null && name != "")
	{
		if( icon == null || icon == "" )
		{
			icon = "default.gif";
		}
		else
			icon = uid.substring(uid.length-2)+"/"+icon;
			
		document.write("<h1 class='h1user'>"+decodeURI(escape(name))+"</h1>");
		document.write("<div class='icon_div'><a href='/home.php'><img src='/images/usericon/l/"+icon+"' border=0 class='icon'></a></div>");
		document.write("<div class='usr_fun'>");
		document.write("<a class='add underline' href='/home.php?tag=add_song'>推荐歌曲</a> <br />  ");   		
		document.write("<a class='msg underline' href='/umodi.php'>个人设置</a>");
		document.write("</div>");	
	}
}



function imgcheck()
{
	var imgNum = document.images.length;
	
	for(i=0;i<imgNum;i++)
	{
		if(window.document.images[i].width > 670)
			window.document.images[i].width = 670;
	}
}


function WrtFoot()
{
	//document.write("<div id='footer'><div id='foot_right'><div style='float:right;margin:0 30px 0 0;display:inline'><a href='https://web.archive.org/web/20161105142114/http://www.miibeian.gov.cn' target=_blank><font color='#ffffff'>京ICP备07025509号</font></a> <font color='#ffffff'> 京网文[2011]0173-066号</font> </div>                <ul class='foot_fun'><li><a href='/aboutus.php'>关于我们</a></li> <li><a href='/copyright.php'>版权声明</a></li>  <li><a href='/bbs.php?tag=board&bid=09'>站务论坛</a></li><li><a href='/help.php'>SongTaste帮助</a></li> <li><a href='/sitemap.html'>站点地图</a></li> <li><a href='/link.php'>友情链接</a></li> <li><a href='/hotmusic.php'>热门歌曲</a></li></ul><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy; 2006 - 2011   SongTaste.com  &nbsp; Ver 1.0  &nbsp; LastUpdate: 2011.04.01</p></div></div>");
	document.write("<div id='footer' style='position:relative;'><ul class='foot_fun'><li><a href='/aboutus.php'>关于我们</a></li> <li><a href='/copyright.php'>版权声明</a></li>  <li><a href='/bbs.php?tag=board&bid=09'>站务论坛</a></li><li><a href='/help.php'>SongTaste帮助</a></li> <li><a href='/sitemap.html'>站点地图</a></li> <li><a href='/link.php'>友情链接</a></li> <li><a href='/hotmusic.php'>热门歌曲</a></li> <li><a href='/musicians_coop.php'>独立音乐人合作</a></li></ul><p></p> <div style='margin:0 20px 0 0;display:inline'><a href='https://web.archive.org/web/20161105142114/http://www.miibeian.gov.cn' target=_blank><font color='#CCCCCC'>京ICP备11022597号</font></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#CCCCCC'>京ICP证110908号</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#CCCCCC'> 京文网文[2011]0173-066号</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#CCCCCC'> 京公网安备 11010502026085</font> </div><a href='https://web.archive.org/web/20161105142114/http://182.131.21.137/ccnt-apply/admin/business/preview/business-preview!lookUrlRFID.action?main_id=23C682DA1BF54A3D8120E2BEAAD763BF' style='position:absolute;right:245px;top:25px'><img style='width:30px;' src='https://web.archive.org/web/20161105142114/http://image.songtaste.com/images/gameRFID.png' /></a><span style='padding-left:28px'>&copy; 2006 - 2014   SongTaste.com</span>  &nbsp;</div>");
	
}



function imgcheckquote(obj)
{
	if(obj.width > 600)
		obj.width = 600;
}

function codehash(n)
{
	var rnd="";
	for(var i=0;i<n;i++)
	rnd+=Math.floor(Math.random()*10);
	return rnd;
}


}
/*
     FILE ARCHIVED ON 14:21:14 Nov 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:25 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 258.678 (3)
  PetaboxLoader3.datanode: 333.668 (5)
  RedisCDXSource: 1.43
  exclusion.robots.policy: 0.49
  exclusion.robots: 0.509
  CDXLines.iter: 25.529 (3)
  captures_list: 294.444
  esindex: 0.016
  PetaboxLoader3.resolve: 113.471 (2)
  load_resource: 361.07 (2)
*/