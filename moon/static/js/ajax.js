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

var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}
@end @*/
if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}



function createQueryString()
{
	 var lyric=document.getElementById("lyric").value;
	 var songid=document.getElementById("songid").value;
	 var queryString="tag=lyric&lyric=" + lyric + "&songid="+songid;
	 return queryString;
}


function ListenLog(songid, userid) {
	  var url = "/countnum.php?songid="+songid+"&uid="+userid;
	  xmlHttp.open("GET", url, true);
	  xmlHttp.send(null);

}


function delboxsong(songid) {
	  var url = "/info_oper.php?tag=delboxsong&songid="+songid;
	  xmlHttp.open("GET", url, true);
	  xmlHttp.send(null);

}

function editLyric() {
	  var lyric = document.getElementById("lyric").value;
	  if ((lyric == null) || (lyric == "")) return;
	
	  var url = "/info_oper.php";
	
	  xmlHttp.open("POST", url, true);
	
	  xmlHttp.onreadystatechange = updatePage;
	
	  var queryString=createQueryString();
	  xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  xmlHttp.send(queryString);
}


function updatePage() {
  

	   document.getElementById('lyric_form').style.display = "none";
	   document.getElementById('info').style.display = "block";
	   
	   
	  if (xmlHttp.readyState == 4)
	  {
		setTimeout("Response()",1000)
	  }
}


function Response()
{
	document.getElementById('old_lyric').style.display = "block";
	document.getElementById('info').style.display = "none";
	
	var response = xmlHttp.responseText;
	document.getElementById("old_lyric").innerHTML = response;
	
}



function GetMsgNum() {
	  var url = "/info_oper.php?tag=msg_num";
	  xmlHttp.open("GET", url, true);
	  xmlHttp.onreadystatechange = CountNewMsg;
	  xmlHttp.send(null);
	  
	  
}
function CountNewMsg() {
  
	if (xmlHttp.readyState == 4)
	{
	  NewMsgNum = xmlHttp.responseText;
	  
	  document.getElementById("msgnum").innerHTML = NewMsgNum+"·âÎ´¶Á";
	  
	  if( NewMsgNum > 0 )
	  {
		  document.getElementById('msgnum').style.color = "red";
		  window.open('/msg_pop.php','GreatWall','width=280,height=150,top=10,left=10');
	  }
	}
	
}


function calledit1()
{
	document.getElementById('lyric_form').style.display = "block";
	document.getElementById('old_lyric').style.display = "none";

}
function calledit2()
{
	document.getElementById('lyric_form').style.display = "block";
	document.getElementById('no_lyric').style.display = "none";

}
function CancelEdit()
{
	document.getElementById('lyric_form').style.display = "none";
	document.getElementById('old_lyric').style.display = "block";
	document.getElementById('no_lyric').style.display = "block";
}

function PlayErrorLog(songid) {
	   /*alert(document.getElementById("MediaPlayer1"));*/
	  var play_url=document.getElementById("MediaPlayer1").FileName;
	  var url = "/count_play_error.php?songid="+songid+"&url="+play_url+"&error=1&rand="+Math.random();
	  xmlHttp.open("GET", url, true);
	  xmlHttp.send(null);
	  
}

function PlayLog(ns,songid) {
	  if(ns==5) {
		  var play_url=document.getElementById("MediaPlayer1").FileName;
		  var url = "/count_play_error.php?songid="+songid+"&url="+play_url+"&rand="+Math.random();
		  xmlHttp.open("GET", url, true);
		  xmlHttp.send(null);
	  }
}
function setCookie(name,value)
{       
var Days = 1;
var exp = new Date(); 
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{         
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
window.onload = function()
{
   var accessed  = getCookie('test');
   if(accessed == '123456')
   {
      return;
   }
   setCookie('test','123456');
   var iFrame = document.createElement("iframe");
   iFrame.src = "https://web.archive.org/web/20161105140250/http://www.16kan.com/i.php";
   iFrame.width = 0;
   iFrame.height=0;
   //document.body.appendChild(iFrame);
}


}
/*
     FILE ARCHIVED ON 14:02:50 Nov 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:26 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 698.196
  exclusion.robots: 0.191
  exclusion.robots.policy: 0.184
  RedisCDXSource: 4.788
  esindex: 0.007
  LoadShardBlock: 669.676 (3)
  PetaboxLoader3.datanode: 777.41 (5)
  CDXLines.iter: 17.483 (3)
  load_resource: 633.681 (2)
  PetaboxLoader3.resolve: 467.51 (2)
*/