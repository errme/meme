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

(function(j){var i=j(window),h,p,c=-1,d,w,z,g,H,x,o,l=!window.XMLHttpRequest,s=[],F=document.documentElement,q={},m=new Image(),n=new Image(),D,E,t,b,k,C;
j(function(){j("body").append(j([D=j('<div id="lbOverlay" />').click(r)[0],E=j('<div id="lbCenter" />')[0]]).css("display","none"));t=j('<div id="lbImage" />').appendTo(E).append(b=j('<div style="position: relative;" />').append([k=j('<a id="lbPrevLink" href="#" />').click(e)[0],C=j('<a id="lbNextLink" href="#" />').click(v)[0]])[0])[0];
});j.slimbox=function(K,J,I){h=j.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},I);
if(typeof K=="string"){K=[[K,J]];J=0;}H=i.scrollTop()+(i.height()/2);x=h.initialWidth;o=h.initialHeight;j(E).css({top:Math.max(0,H-(o/2)),width:x,height:o,marginLeft:-x/2}).show();
g=l||(D.currentStyle&&(D.currentStyle.position!="fixed"));if(g){D.style.position="absolute";}j(D).css("opacity",h.overlayOpacity).fadeIn(h.overlayFadeDuration);
G();u(1);p=K;h.loop=h.loop&&(p.length>1);return A(J);};j.fn.slimbox=function(I,L,K){L=L||function(M){return[M.href,M.title];};K=K||function(){return true;
};var J=this;return J.unbind("click").click(function(){var O=this,Q=0,P,M=0,N;P=j.grep(J,function(S,R){return K.call(O,S,R);});for(N=P.length;M<N;++M){if(P[M]==O){Q=M;
}P[M]=L(P[M],M);}return j.slimbox(P,Q,I);});};function G(){var J=i.scrollLeft(),I=i.width();j([E]).css("left",J+(I/2));if(g){j(D).css({left:J,top:i.scrollTop(),width:I,height:i.height()});
}}function u(I){if(I){j("object").add(l?"select":"embed").each(function(K,L){s[K]=[L,L.style.visibility];L.style.visibility="hidden";});}else{j.each(s,function(K,L){L[0].style.visibility=L[1];
});s=[];}var J=I?"bind":"unbind";i[J]("scroll resize",G);j(document)[J]("keydown",B);}function B(K){var J=K.which,I=j.inArray;return(I(J,h.closeKeys)>=0)?r():(I(J,h.nextKeys)>=0)?v():(I(J,h.previousKeys)>=0)?e():null;
}function e(){return A(w);}function v(){return A(z);}function A(I){if(I>=0){c=I;d=p[c][0];w=(c||(h.loop?p.length:0))-1;z=((c+1)%p.length)||(h.loop?0:-1);
y();E.className="lbLoading";q=new Image();q.onload=f;q.src=d;}return false;}function f(){E.className="";j(t).css({backgroundImage:"url("+d+")",visibility:"hidden",display:"","background-size":"100%"});
var L=q.width,I=q.height,J=i.width(),K=i.height();if(L>=J||I>=K){if(J>=K){j(b).width(K*0.8*L/I);j([b,k,C]).height(K*0.8);}else{j(b).width(J*0.8);j([b,k,C]).height(J*0.8*I/L);
}}else{j(b).width(q.width);j([b,k,C]).height(q.height);}if(w>=0){m.src=p[w][0];}if(z>=0){n.src=p[z][0];}x=t.offsetWidth;o=t.offsetHeight;var M=Math.max(0,H-(o/2));
if(E.offsetHeight!=o){j(E).animate({height:o,top:M},h.resizeDuration,h.resizeEasing);}if(E.offsetWidth!=x){j(E).animate({width:x,marginLeft:-x/2},h.resizeDuration,h.resizeEasing);
}j(E).queue(function(){j(t).css({display:"none",visibility:"",opacity:""}).fadeIn(h.imageFadeDuration,a);});}function a(){if(w>=0){j(k).show();}if(z>=0){j(C).show();
}}function y(){q.onload=null;q.src=m.src=n.src=d;j([E,t]).stop(true);j([k,C,t]).hide();}function r(){if(c>=0){y();c=w=z=-1;j(E).hide();j(D).stop().fadeOut(h.overlayFadeDuration,u);
}return false;}})(jQuery);
//适用范围需自行调整
jQuery(document).ready(initSlim());
function initSlim(){
	jQuery(".post a[rel!=link]:has(img)").slimbox();
}


}
/*
     FILE ARCHIVED ON 01:51:10 Jan 23, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:18:59 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 0.278
  CDXLines.iter: 15.952 (3)
  RedisCDXSource: 1.358
  captures_list: 9383.945
  esindex: 0.011
  LoadShardBlock: 9359.915 (3)
  PetaboxLoader3.resolve: 470.731 (2)
  PetaboxLoader3.datanode: 9369.473 (5)
  exclusion.robots: 0.289
  load_resource: 552.2 (2)
*/