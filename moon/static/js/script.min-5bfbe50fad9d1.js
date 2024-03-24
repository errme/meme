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

/*!
 * Swipe 2.0.2
 *
 * Brad Birdsall & Felix Liu
 * Copyright 2015, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0); }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) {
        if (temp.style[ props[i] ] !== undefined){
          return true;
        }
      }
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) {
    return;
  }

  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  // AutoRestart option: auto restart slideshow after user's touch event
  options.autoRestart = options.autoRestart !== undefined ? options.autoRestart : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) {
      options.continuous = false;
    }

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;
	if (container.className.indexOf("fcposition-fullwidth")>-1) {
		width=document.body.scrollWidth||document.documentElement.scrollWidth;
		container.style.width = width + 'px';
	};

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) {
      element.style.left = (index * -width) + 'px';
    }

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) {
      slide(index-1);
    }
    else if (index) {
      slide(index-1);
    }

  }

  function next() {

    if (options.continuous) {
      slide(index+1);
    }
    else if (index < slides.length - 1) {
      slide(index+1);
    }

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function getPos() {
    // Fix for the clone issue in the event of 2 slides
    var currentIndex = index;

    if (currentIndex >= length) {
      currentIndex = currentIndex - length;
    }

    return currentIndex;
  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index === to) {
      return;
    }

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) {
          to =  -direction * slides.length + to;
        }

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) {
        move( circle((to > index ? to : index) - diff - 1), width * direction, 0);
      }

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) { // we need to get the next in place
        move(circle(to - direction), -(width * direction), 0);
      }

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(getPos(), slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) {
      return;
    }

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date();

    var timer = setInterval(function() {

      var timeElap = +new Date() - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) {
          begin();
        }

        if (options.transitionEnd) {
          options.transitionEnd.call(event, getPos(), slides[index]);
        }

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }

  function restart() {
    stop();
    delay = options.auto || 0;
    begin();
  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) {
        event.stopPropagation();
      }

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date()

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) {
        return;
      }

      if (options.disableScroll) {
        event.preventDefault();
      }

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      };

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling === 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0 ||             // if first slide and sliding left
                index === slides.length - 1 &&        // or if last slide and sliding right
                delta.x < 0                           // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date() - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250 &&         // if slide duration is less than 250ms
            Math.abs(delta.x) > 20 ||         // and if slide amt is greater than 20px
            Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0 ||                      // if first slide and slide amt is greater than 0
            index === slides.length - 1 && delta.x < 0;   // or if last slide and slide amt is less than 0

      if (options.continuous) {
        isPastBounds = false;
      }

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          if (options.callback) {
            options.callback(getPos(), slides[index]);
          }

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false);
      element.removeEventListener('touchend', events, false);

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) === index) {

        if (delay || options.autoRestart) {
          restart();
        }

        if (options.transitionEnd) {
          options.transitionEnd.call(event, getPos(), slides[index]);
        }

      }

    }

  };

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) {
    begin();
  }


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    if (browser.touch) {
      element.addEventListener('touchstart', events, false);
    }

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup(); }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    restart: function() {

      // Restart slideshow
      restart();

    },

    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return getPos();

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while (pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) {
          translate(pos, 0, 0);
        }

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  };

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    };
  })( window.jQuery || window.Zepto );
}

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+applescript+json+less+markdown+php+sass+scss */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var l=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(l[i]=a[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==t)for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[s]=l[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],a||l),"Object"!==n.util.type(e[l])||r[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||r[n.util.objId(e[l])]||(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,r)):(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,l=a.elements||document.querySelectorAll(a.selector),i=0;r=l[i++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1],i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var s=t.textContent,u={element:t,language:l,grammar:i,code:s};if(!s||!i)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var l=n.tokenize(e,t);return a.stringify(n.util.encode(l),r)},tokenize:function(e,t){var a=n.Token,r=[e],l=t.rest;if(l){for(var i in l)t[i]=l[i];delete t.rest}e:for(var i in t)if(t.hasOwnProperty(i)&&t[i]){var o=t[i];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,f=0,h=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){u.lastIndex=0;var m=u.exec(d);if(m){g&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,b=y+v,k=d.slice(0,y+1),w=d.slice(b+1),_=[p,1];k&&_.push(k);var P=new a(i,c?n.tokenize(m,c):m,h);_.push(P),w&&_.push(w),Array.prototype.splice.apply(r,_)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,l=0;r=a[l++];)r(t)}}},a=n.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var l={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==l.type&&(l.attributes.spellcheck="true"),e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}n.hooks.run("wrap",l);var o="";for(var s in l.attributes)o+=(o?" ":"")+s+'="'+(l.attributes[s]||"")+'"';return"<"+l.tag+' class="'+l.classes.join(" ")+'" '+o+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,l=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),l&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",n.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
Prism.languages.applescript={comment:[/\(\*(?:\(\*[\w\W]*?\*\)|[\w\W])*?\*\)/,/--.+/,/#.+/],string:/"(?:\\?.)*?"/,number:/\b-?\d*\.?\d+([Ee]-?\d+)?\b/,operator:[/[&=≠≤≥*+\-\/÷^]|[<>]=?/,/\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/],keyword:/\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,"class":{pattern:/\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,alias:"builtin"},punctuation:/[{}():,¬«»《》]/};
Prism.languages.json={property:/".*?"(?=\s*:)/gi,string:/"(?!:)(\\?[^"])*?"(?!:)/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,punctuation:/[{}[\]);,]/g,operator:/:/g,"boolean":/\b(true|false)\b/gi,"null":/\bnull\b/gi},Prism.languages.jsonp=Prism.languages.json;
Prism.languages.less=Prism.languages.extend("css",{comment:[/\/\*[\w\W]*?\*\//,{pattern:/(^|[^\\])\/\/.*/,lookbehind:!0}],atrule:{pattern:/@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,inside:{punctuation:/[:()]/}},selector:{pattern:/(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,inside:{variable:/@+[\w-]+/}},property:/(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,punctuation:/[{}();:,]/,operator:/[+\-*\/]/}),Prism.languages.insertBefore("less","punctuation",{"function":Prism.languages.less.function}),Prism.languages.insertBefore("less","property",{variable:[{pattern:/@[\w-]+\s*:/,inside:{punctuation:/:/}},/@@?[\w-]+/],"mixin-usage":{pattern:/([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,lookbehind:!0,alias:"function"}});
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:/\?>|<\?(?:php)?/i,variable:/\$\w+\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(a){return e.tokenStack.push(a),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var a,n=0;a=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(a,e.grammar,"php").replace(/\$/g,"$$$$"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/}));
!function(e){e.languages.sass=e.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var a=/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,t=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];e.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:a,operator:t}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:a,operator:t,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,delete e.languages.sass.selector,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism);
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)*url(?=\()/i,selector:{pattern:/(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{placeholder:/%[-_\w]+/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.insertBefore("scss","property",{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/,alias:"selector"},statement:/\B!(?:default|optional)\b/i,"boolean":/\b(?:true|false)\b/,"null":/\bnull\b/,operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);


!function(e,t,n){"use strict"
var a=e(t),i=e(n),s=e("html"),o=e("body"),l=e("html, body"),r=e("#s"),c=e("#rocket"),d=s.hasClass("lt-ie7"),f=s.hasClass("lt-ie8")
if(e(".userinfo .login-link").click(function(){return e("#minty_login").fadeIn(),!1}),e("#minty_login").click(function(t){"TD"==t.target.tagName&&e("#minty_login").fadeOut()}),e("#m-btns .search").click(function(){o.toggleClass("m-search"),r.focus()}),e(".mobile-menu").length?e("#m-btns .menu").click(function(){o.toggleClass("expand-mobile-menu")}):e("#m-menu option").each(function(){e(this).val()==location.href&&e(this).prop("selected",!0)}),d&&e(".menu-item-has-children").mouseenter(function(){e(this).find(".sub-menu").show()}).mouseleave(function(){e(this).find(".sub-menu").hide()}),f&&r.focus(function(){r.addClass("focus")}).blur(function(){r.removeClass("focus")}),d||t.matchMedia&&t.matchMedia("(max-width: 568px)").matches||a.scroll(function(){a.scrollTop()>Math.max(400,a.height())?c.addClass("show"):c.removeClass("show")}).load(function(){if(MINTY.stickySidebar){var t=e("#sidebar"),n=e("#sidebar-top"),i=e("#sidebar-bottom")
if("top"==MINTY.stickySidebar&&n.length)var s=n,o=t.height()+t.offset().top
else if("bottom"==MINTY.stickySidebar&&i.length)var s=i,o=s.offset().top-85
s&&s.length&&a.scroll(function(){var e=a.scrollTop()
s[e>o?"addClass":"removeClass"]("sticky")}).resize(function(){s.css("left",t.offset().left)}).resize()}}),c.click(function(){return c.addClass("launch"),l.animate({scrollTop:0},600,function(){c.removeClass("show launch")}),!1}),"object"==typeof slideList&&slideList.length){var m,h=e(".slideshow-wrap"),u=slideList.length,p=0
h.html('<a href="'+slideList[0].link+'" title="'+slideList[0].title+'" target="'+(slideListNewWin?"_blank":"_self")+'"><img src="'+slideList[0].image+'" alt="'+slideList[0].title+'" width="220" height="110"></a>')
var v=function(t){var n=e("a",h)
p=isNaN(t)?u-1>p?p+1:0:t,n.clone().addClass("temp").appendTo(h).fadeOut(function(){e(this).remove()}),n.attr("href",slideList[p].link).attr("target",slideListNewWin?"_blank":"_self").attr("title",slideList[p].title).html('<img src="'+slideList[p].image+'" alt="'+slideList[p].title+'">')}
if(u>1){var g=e("<span class='prev'>&lsaquo;</span>"),y=e("<span class='next'>&rsaquo;</span>")
g.click(function(){v(0===p?u-1:p-1)}),y.click(function(){v()}),h.append(g).append(y).hover(function(){clearInterval(m)},function(){m=setInterval(v,7e3)}),m=setInterval(v,7e3)}}var b=e("#main"),k=0
b.on("click",".loadmore",function(a,i){if(k)return!1
var s=e(this).attr("title",MINTY.i18n.loading).addClass("loading"),o=s.attr("href")
return k=1,e.get(o,function(a){s.parent().remove()
var l=e(a),r=l.find(".hentry").addClass("fadein"),c=l.filter("title").text();
if(MINTY.loadPostsCallback)MINTY.loadPostsCallback(r.get());
b.append(r).append(l.find(".navigation")),i&&E(r.eq(0)),t.history&&history.pushState&&history.pushState(null,c,o),n.title=c,k=0}),!1})
var C=e("#comments")
C.on("click",".loadmore",function(){var t=e(this)
return t.hasClass("loading")?!1:(t.attr("title",MINTY.i18n.loading).addClass("loading"),e.get(t.attr("href"),function(n){t.parent().remove()
var a=e(n).find(".commentlist").addClass("fadein");
if(MINTY.loadCommentsCallback)MINTY.loadCommentsCallback(a.get());
if(!n.getElementsByClassName)e(".lazyload").each(function(){this.src=this.getAttribute("data-src")})
C.append(a).append(e(n).find(".navigation"))}),!1)})
var T=0,I=C.find(".commentlist"),x=C.find(".pagination")
C.on("click","a.page-numbers",function(){return T?!1:(C.find("#cancel-comment-reply-link").click(),T=1,C.addClass("loading"),I.add(x).attr("title",MINTY.i18n.loading),e.get(e(this).attr("href"),function(t){var n=e(t).find("#comments")
I.html(n.find(".commentlist").html()),t.lazySizes&&lazySizes.loader.checkElems(),x.html(n.find(".pagination").html()).add(I).removeAttr("title"),C.removeClass("loading"),T=0}),!1)})
var w=e("#commentform"),N=e("#comment"),M=e("#comments-title"),S=e("#comment-settings"),z=e(".comment-settings-toggle"),L=e("span",z),Y=e("#author"),_=e("#submit")
if(z.click(function(){S.hasClass("show")||(S.addClass("show"),e(this).removeClass("required"),Y.focus(),setTimeout(function(){i.on("click.comment",function(e){S.find(e.target).length||e.target==S[0]||(S.removeClass("show"),i.off("click.comment"))})},100))}),Y.on("change input",function(){L.text(e(this).val())}),N.keydown(function(e){if(e.ctrlKey&&13==e.keyCode)w.trigger("submit")
else if(9==e.keyCode)return z.click(),!1}),e("#respond input").add(N).on("invalid",function(){e(this).one("input change",function(){e(this).parent().removeClass("invalid")}).parent().addClass("invalid"),e(this)[0]!=N[0]&&z.click()}),e(".commentlist").eq(0).children().length<10&&e("#comments .loadmore").length&&e("#comments .loadmore").trigger("click"),MINTY.ajaxComment){var j,q,D=15
w.submit(function(){return e.ajax({type:this.method,url:MINTY.ajaxurl,data:e(this).serialize()+"&action=minty_ajax_comment",beforeSend:function(){q=e("#comment_parent").val(),_.val(MINTY.i18n.posting+".").prop("disabled",!0),N.prop("disabled",!0),j=t.setInterval(function(){_.val(MINTY.i18n.posting+"..."==_.val()?MINTY.i18n.posting+".":_.val()+".")},700)},success:function(n){if(t.clearInterval(j),/<\/li>/.test(n)){if(e(".commentlist").length>0){"0"==q?e("<div style='display:none'>"+n+"</div>").prependTo(e(".commentlist").eq(0)).fadeIn():e("<ol class='children' style='display:none'>"+n+"</ol>").insertAfter(e("#comment-"+q)).fadeIn()
var a=parseInt((M.text().match(/\d/g)||[0]).join(""))+1
a>999&&(a=(""+a/1e3).replace(".",",")),M.text(MINTY.i18n.comments.replace("%s", a))}else e(".no-comments").replaceWith(e("<ol class='commentlist' style='display:none'>"+n+"</ol>").fadeIn()),M.text(MINTY.i18n.one_comment)
N.prop("disabled",!1).val(""),P()}else alert(e("<div>"+n+"</div>").text()),_.prop("disabled",!1).val(MINTY.i18n.post_comment),N.prop("disabled",!1)},error:function(e,n,a){console&&console.log&&console.log(e,n,a),t.clearInterval(j),alert(MINTY.i18n.comment_fail),_.prop("disabled",!1).val(MINTY.i18n.post_comment),N.prop("disabled",!1)}}),!1})
var P=function(){D>0?(_.val(MINTY.i18n.comment_success+"("+D--+")"),setTimeout(P,1e3)):(_.val(MINTY.i18n.post_comment).prop("disabled",!1),D=15)}}if(MINTY.keyboardNavigation){var A
i.keypress(function(t){var n=t.target.tagName
if("TEXTAREA"!=n&&"INPUT"!=n)switch(t.which){case 106:var a=e(".previous-post a")[0]
if(a)location.href=a.href
else{if(k)return
if(A){var s=A.next()
s.hasClass("ga")&&(s=s.next()),s.hasClass("hentry")?E(s):e(".loadmore").length&&(e(".loadmore").trigger("click",1),l.animate({scrollTop:i.height()},500))}else E(e(".hentry").eq(1))}t.preventDefault()
break
case 107:var o=e(".next-post a")[0]
if(o)location.href=o.href
else{if(k)return
if(A){var r=A.prev()
r.hasClass("ga")&&(r=r.prev()),r.hasClass("hentry")&&E(r)}else E(e(".hentry").eq(1))}t.preventDefault()
break
case 114:N.focus(),t.preventDefault()
break
case 47:e("#s").focus(),t.preventDefault()}})
var E=function(e){e&&(A=e,l.stop().animate({scrollTop:A.offset().top-85},500))}}if(MINTY.infiniteScroll>0){var O=parseInt(MINTY.infiniteScroll)
i.on("inview",".navigation .loadmore",function(t,n){1>O?i.off("inview"):n&&!e(this).hasClass("loading")&&(e(this).trigger("click"),O--)})}e(".widget-title span").each(function(){var t=e(this)
t.attr("title",t.text())}),t.lazySizes&&lazySizes.loader.checkElems(),location.hash.indexOf("#comment-")>-1&&t.setTimeout(function(){i.scrollTop(i.scrollTop()-74)},10),"ontouchstart"in t?(n.documentElement.className+="touch",e(".menu-item-has-children, .page_item_has_children").attr("aria-haspopup",!0).children("a").on("touchend",function(){return e(this).next().toggle(),!1})):"object"==typeof NProgress&&(NProgress.configure({showSpinner:!1}),NProgress.start(),n.onreadystatechange=function(){"complete"==n.readyState&&setTimeout(NProgress.done,500)});if(e.fn.Swipe){var s=e("#featured-content").Swipe({auto:MINTY.slidesTimeout}).data('Swipe');if(s){e('.swipe-prev').click(s.prev);e('.swipe-next').click(s.next)}};e.fn.fancybox&&e(".gallery").each(function(){var t=e(this),n=t.attr("id"),a=t.find(".gallery-item a")
a.each(function(){var t=e(this)
t.attr("rel",n).attr("title",t.find("img").attr("alt"))}).fancybox()});
var Z=e('#nav>ul');if(Z.width()==523){a.resize(function(){Z.css('width',a.width()-40-e("#hgroup").outerWidth()-e("#header .userinfo").outerWidth()-e("#header .connect").outerWidth())}).resize()};
e(".must-log-in a").click(function(){return e("#minty_login").fadeIn().length==0})}(jQuery,window,document);

jQuery(function(e){function t(e){return/\.([^.]+)$/.test(e)?MINTY.smileySettings.src_url+e:"".concat(twemoji.base,twemoji.size,"/",twemoji.convert.toCodePoint(e),twemoji.ext)}function n(n){var a,s=MINTY.smileySettings.smilies,o=""
for(var r in s)a=s[r],o+=n&&-1==a.indexOf(".")?'<span class="emoji" alt="'+r+'">'+a+"</span>":'<img class="emoji" draggable="false" src="'+t(a)+'" alt="'+r+'" />'
document.getElementById("comment-smilies").innerHTML=o,e("#comment-smilies .emoji").click(function(){var e=" "+this.getAttribute("alt")+" "
if(document.selection){i.focus()
var t=document.selection.createRange()
t.text=e}else if(isNaN(i.selectionStart))i.value+=e
else{var n=i.selectionStart,a=i.selectionEnd
i.value=i.value.substring(0,n)+e+i.value.substring(a),i.selectionStart=i.selectionEnd=n+e.length}i.focus()})}var i=document.getElementById("comment")
if(i){var a=0
!function s(){var e=_wpemojiSettings.supports&&_wpemojiSettings.supports.everything
"undefined"!=typeof twemoji||e?n(e):10>a&&(a++,setTimeout(s,500))}()}});/*1543234831*/

}
/*
     FILE ARCHIVED ON 04:57:25 Jan 27, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:30:34 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 139.785
  exclusion.robots: 0.125
  exclusion.robots.policy: 0.119
  RedisCDXSource: 2.862
  esindex: 0.005
  LoadShardBlock: 120.154 (3)
  PetaboxLoader3.datanode: 162.417 (4)
  CDXLines.iter: 14.679 (3)
  load_resource: 260.941
  PetaboxLoader3.resolve: 135.097
*/