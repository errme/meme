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

$(document).ready(function() {
	var w = $(window).width();
	$(window).resize(function() {
		w = $(window).width();
	})
	if (w > 1000) {
		var colors = new Array(
			[62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);


		//  

		var step = 0;
		//color table indices for: 
		// current color left
		// next color left
		// current color right
		// next color right
		var colorIndices = [0, 1, 2, 3];

		//transition speed
		var gradientSpeed = 0.002;

		function updateGradient() {

			if ($ === undefined) return;

			var c0_0 = colors[colorIndices[0]];
			var c0_1 = colors[colorIndices[1]];
			var c1_0 = colors[colorIndices[2]];
			var c1_1 = colors[colorIndices[3]];

			var istep = 1 - step;
			var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
			var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
			var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
			var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

			var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
			var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
			var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
			var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

			$('.gradient').css({
				background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
			}).css({
				background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
			});

			step += gradientSpeed;
			if (step >= 1) {
				step %= 1;
				colorIndices[0] = colorIndices[1];
				colorIndices[2] = colorIndices[3];

				//pick two new target color indices
				//do not pick the same as the current one
				colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
				colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

			}
		}

		setInterval(updateGradient, 10);
	}
})

}
/*
     FILE ARCHIVED ON 11:36:58 Jan 22, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:33:07 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  esindex: 0.015
  captures_list: 2082.907
  load_resource: 2161.604 (2)
  RedisCDXSource: 7.741
  LoadShardBlock: 2045.548 (3)
  exclusion.robots: 0.369
  PetaboxLoader3.datanode: 3834.693 (5)
  exclusion.robots.policy: 0.352
  CDXLines.iter: 25.313 (3)
  PetaboxLoader3.resolve: 357.764 (2)
*/