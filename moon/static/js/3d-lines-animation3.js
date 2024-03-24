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

    var w = $(window).width();
    $(window).resize(function() {
        w = $(window).width();
    })

    if (w > 1000) {
        $('#canvas').height(198);
        var mouseX = 0,
            mouseY = 0,

            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,

            SEPARATION = 200,
            AMOUNTX = 1,
            AMOUNTY = 1,

            camera, scene, renderer;

        init();
        animate();



        function init() {


            /*
             *   Define variables
             */
            var container, separation = 1000,
                amountX = 50,
                amountY = 50,
                color = 0xffffff,
                particles, particle;

            container = document.getElementById("canvas");


            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;

            scene = new THREE.Scene();

            renderer = new THREE.CanvasRenderer({
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0); // canvas background color
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);



            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({

                color: color,
                opacity: 0.5,
                program: function(context) {

                    context.beginPath();
                    context.arc(0, 0, 0.5, 0, PI2, true);
                    context.fill();

                }

            });

            var geometry = new THREE.Geometry();

            /*
             *   Number of particles
             */
            for (var i = 0; i < 150; i++) {

                particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                particle.position.normalize();
                particle.position.multiplyScalar(Math.random() * 10 + 600);
                particle.scale.x = particle.scale.y = 5;

                scene.add(particle);

                geometry.vertices.push(particle.position);

            }

            /*
             *   Lines
             */

            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: color,
                opacity: 0.2
            }));
            scene.add(line);

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);

            //

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        //

        function onDocumentMouseMove(event) {

            mouseX = (event.clientX - windowHalfX) * 0.05;
            mouseY = (event.clientY - windowHalfY) * 0.2;

        }

        function onDocumentTouchStart(event) {

            if (event.touches.length > 1) {

                event.preventDefault();

                mouseX = (event.touches[0].pageX - windowHalfX) * 0.7;
                mouseY = (event.touches[0].pageY - windowHalfY) * 0.7;

            }

        }

        function onDocumentTouchMove(event) {

            if (event.touches.length == 1) {

                event.preventDefault();

                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;

            }

        }

        //

        function animate() {

            requestAnimationFrame(animate);

            render();

        }

        function render() {

            camera.position.x += (mouseX - camera.position.x) * 0.1;
            camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);

        }

    }


}
/*
     FILE ARCHIVED ON 19:54:06 Jan 25, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:21:47 Feb 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  load_resource: 2615.661 (2)
  RedisCDXSource: 0.556
  exclusion.robots: 0.311
  LoadShardBlock: 118.021 (3)
  PetaboxLoader3.resolve: 676.119 (2)
  exclusion.robots.policy: 0.299
  PetaboxLoader3.datanode: 2027.206 (5)
  esindex: 0.01
  captures_list: 145.796
  CDXLines.iter: 24.092 (3)
*/