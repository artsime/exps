TweenMax.defaultEase = Expo.easeOutSine;
TimelineMax.defaultEase = TweenMax.defaultEase;


var tl = new TimelineMax({paused: true});


var tm = TweenMax;
var duration = 1;

$(function(){

	var $bulle = $('.bubble');
	var $body = $('.page');
	var $canvas = document.querySelector('canvas');


	$('.card').fadeIn(500, function(){
		$('.page').show();
	});

	//create a new instance of shake.js.
	// var myShakeEvent = new Shake({
	//     threshold: 15 // optional shake strength threshold
	// });

	// start listening to device motion
	//myShakeEvent.start();

	resize();




	


	//$bulle.hide();

	// tl.to($bulle, duration, { 'width': '10px', 'height':'10px', 'ease': 'easeInExpo'});
	// tl.to($bulle, duration, { 'width': '500px', 'height':'500px', 'ease': 'easeOutExpo', 'onComplete':function(){

	// 	window.addEventListener('shake', onShake, false);

	// }});

	//tl.to( $body, 3,  { 'backgroundColor': '#333' });




	$('.canvas').on('click', function(){

		onShake ();

	});


	//function to call when shake occurs
	function onShake () {
		$canvas.shaked();

		//tl.reverse();
	
	}

	$(window).on('resize', function(){
		resize();
	});

	function resize(){
		var centerX = $(window).width()/2 - $('.bulle').width()/2;
		var centerY = $(window).height()/2 - $('.bulle').height()/2;

		//$('.wwrapper').css({'margin-top': centerY, 'margin-left': centerX });
	}


	setTimeout(function(){
		tl.restart();

	}, 2000);

	
	
});



	function random(min, max){
		  return Math.floor(Math.random() * max) + min;
		}







	var container, scene, camera, renderer, stats;
//	var keyboard = new THREEx.KeyboardState();
	//var clock = new THREE.Clock();

	var sphere;
	var group;

	var lights = [];
	var skyBox;


	var intensite = 0;
	var mouseX = 0, mouseY = 0;

	var dir = "/chrismas/img/three/";

	var rotate = false;

	//here are the sounds
	var soundSrc = [];

	$(function(){

		init();
		animate();

		$(window).on('mousemove', function(e) {

	       mouseX = e.pageX; 
	       mouseY = e.pageY;

	     })
	});



    // SCENE
    scene = new THREE.Scene();


    // CAMERA
    //var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    
	var SCREEN_WIDTH = 800, SCREEN_HEIGHT = 800;

    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

   

    scene.add(camera);
   
	

   var smokeTextureImg;
   var smokeTexture;


   var msg;
   var messageTextureImg;
   var massageTexture;

 //camera.lookAt( scene.position );
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer(); 





    //renderer.sortObjects = false;
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.createElement( 'div' );
    container.setAttribute("class", "three");
  
   // document.body.appendChild( container );

   	document.querySelector(".bubble").appendChild( container );

    container.appendChild( renderer.domElement );
     //$('.bulle').append( container );



    // CONTROLS
  var controls = new THREE.TrackballControls( camera );

 	controls.rotateSpeed = 1.0;
	// controls.zoomSpeed = 1.2;
	// controls.panSpeed = 0.8;
	controls.noZoom = true;
	controls.noPan = true;
	// controls.staticMoving = true;
	// controls.dynamicDampingFactor = 0.3;

    
   var tree;
   var trees = [];
   var soleil;

   var axis = new THREE.Vector3(0,1,0);
	var rad = -.003;

	var trainGroup;
    
    function init(){

    	group = new THREE.Object3D();
    	scene.add( group );


    	var groundMaterial = new THREE.MeshLambertMaterial({
	        map: THREE.ImageUtils.loadTexture('/chrismas/img/three/ground.png'),
	        transparent: true, 
	        opacity: 1
	      });

    	groundMaterial.depthWrite = false;

    	var light = new THREE.PointLight(0xffffff);
        light.position.set(0, -100, -200 );
        scene.add(light);



		var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	

	    // create a sphere and apply the material
	    var sphereGeometry = new THREE.SphereGeometry( 64, 64, 64 );

	    var transparentMaterial = new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.3 } );
	    var sphereMaterial = new THREE.MeshLambertMaterial( { color:  0xffffff, emissive: 0xb09842 } );



    	var ground = new THREE.Mesh( new THREE.CylinderGeometry( 61, 61, 2, 32 ), material );
			ground.position.y =- 16;

	    sphere = new THREE.Mesh( sphereGeometry, groundMaterial);
	    sphere.position.set( 0, 0, 0 );



	    var dir = new THREE.Vector3( 0, 0, 1 );
		var origin = new THREE.Vector3( 0, 0, 0 );
		var length = 1;
		var hex = 0xffff00;
		  
		var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
		scene.add( arrowHelper );
		

		camera.position.set(0, 0, -180);
		camera.lookAt( arrowHelper.position );

		light.lookAt( arrowHelper.position );

		//sphere.rotation.z = (100 * (Math.PI/180));
		//sphere.rotation.z = 45 ;


		sphere.geometry.dynamic = true;
		group.rotation.x -= .05;
	    

		//tree = planeTwo("arbre.png", 20, 20 );
	  
	


		//tree.position.x = 40;


		var building = box("building-01.png", 15, 15, 15);
		//group.add( building );

		trainGroup = cylinder("", 2, 10);
		trainGroup.position.y = -1;

		//trainGroup.rotation.y = ( 90 * (Math.PI/180) );

		trainGroup.rotateOnAxis(axis, ( 180 * (Math.PI/180))  );



		var train = [];
		train[0] = plane("train2.png", 20, 20);


		group.add( trainGroup );



		var assetTrain = "train1.png";


		train[0] = plane( "train1.png", 10, 10 );
		train[0].position.x = -49;
		train[0].rotation.y = ( 90  * (Math.PI/180));


		smokeTextureImg = THREE.ImageUtils.loadTexture('/chrismas/img/three/smoke.png');
		smokeTexture =  new TextureAnimator( smokeTextureImg, 40, 1, 40, 200 ); // texture, #horiz, #vert, #total, duration.


		var smoke = planeSprite(smokeTextureImg, 10, 10);


		smoke.position.x = -3;
		train[0].add(smoke);

		trainGroup.add( train[0] );


		var cars = [];
		
		for(var i = 1; i < 5; i ++){

			cars[i] = carriage();
	
			if( i == 1 ){
				train[0].add( cars[i] );
				cars[i].position.x = 6;
			} 
			else {
				cars[i-1].add( cars[i] );
				cars[i].position.x = 12;
				//cars[i].position.
			} 
				cars[i].rotation.y = ( -15  * (Math.PI/180));

			

			//train[i].position.z = 3 * i;
			//train[i].rotation.y = ( (-i *2)  * (Math.PI/180));

			//train[i].center( train[0] );

			//train[i].position.x = r * Math.cos(t);
			//train[i].position.z = r * Math.sin(t);

			//train[i].rotation.y  = ( (i * -10)  * (Math.PI/180));

			//train[0].add( train[i] );


			
		}
	
		function carriage(){

			var connector = cylinder("", .1, 1);
			//connector.position.y = -2;
			//connector.position.y = -2;
			var carriage = plane( "train2.png", 10, 10 );
		
			//carriage.position.y = 2;
			//carriage.position.y = 2;
			carriage.position.x = 6;
			connector.add( carriage );


			return connector;



		}
	



		var logo = plane("logo.png", 40, 40);


		var logoBloc = bloc(45, 48, 2);
		logo.position.y = 5;
		logo.rotation.y = (180 * (Math.PI/180));;





		logoBloc.position.z = 2;

		//logo.lookAt( camera );


		messageTextureImg = THREE.ImageUtils.loadTexture('/chrismas/img/three/message.png');
		messageTexture =  new TextureAnimator( messageTextureImg, 4, 1, 4, 100 ); // texture, #horiz, #vert, #total, duration.
		messageTexture.update(10000);


		

		msg = planeSprite( messageTextureImg, 20, 20);
		msg.position.z = 2;
		msg.position.y = 16;


		logoBloc.add( msg );



		group.add( logo );
		group.add( logoBloc );


		var buidings = [];

		var terrain = [];

		var mount = [];

	  
	   // terrain[1] = basicCylinder( 50, 10 );

	   

	    for(var i = 0; i < 7; i ++){

	    	terrain[i] = basicCylinder( 50 -  i * 4 , 8 + i *5 );
	    	terrain[i].position.y =- 10;
	    	group.add(  terrain[i] );


	    	//mount[i] = basicPyramid( 10, 10+ i *5 );
	    	//mount[i].position.y = 0;


	    	//mount[i].position.x = random(-30, 30);
	    	//group.add(  mount[i] );

	    }

	    


		for(var i = 0; i < 40; i ++){
			var n = 10;
			trees[i] = planeTwo("arbre.png", n, n);
			

			var pos = { y: n *- 1 };

			//tm.to(pos, .5, { 'y': '-=4'});

			var r = 55;
			var t = 15 + i*2;

			if( t > 50 && t < 80){
				r = 44;
				n = 0;
			} 
			else if( t > 79 ){
				r = 30;
				n = - 8;
			}

			trees[i].position.y = n *- 1;


			//console.log( trees[i].position.y );

			trees[i].position.x = 0 + r * Math.cos(t);
			trees[i].position.z = 0 + r * Math.sin(t);

			trees[i].position.x += random(-1, 1);
			trees[i].position.z += random(-1, 1);

			 //x0 + r*cos(t)


			group.add( trees[i] );
		}


	
		


		soleil  = new THREE.PointLight(0xffffff);
		soleil.intensity = 0.5;
        soleil.position.set(-200, 0, -200 );
   


        //group.add( soleil );


	    group.add( sphere );
	    group.add( ground );



	    //group.add( tree  );
	    
	    //camera.lookAt( sphere );

	 	//sphere.lookAt( camera);


	 
	 	$('.open').on('click', function(e){

	 		openCard();
	 		$('.card').fadeOut(2000);
	 		e.preventDefault();
	 	})

    }




    function openCard(){
    	
    	setTimeout(function(){
	 		rotate = true;

	 		var $container = $('.container');
		 	$container.fadeIn();

		 	var sound = new Howl({
			  urls: soundSrc
			}).play();

		 	tm.to( $container , 2, { 'marginTop': '0'});
		 	tm.to( $('.page') , 2, { 'backgroundColor': '#022038'});
		 	
	 	}, 2000)

    }



    function basicCylinder( w, h ){
    	var geometry = new THREE.CylinderGeometry( w, w, h, 32 );

	    var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		var material = new THREE.MeshBasicMaterial( {
			
			overdraw: true,
			//transparent: true,
			color: 0xffffff,
			//map: THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc), 
			//wireframe: true,
			side: THREE.DoubleSide} );

		//material.blending = THREE[ "AdditiveAlphaBlending" ];
		//material.depthWrite = false;
		return new THREE.Mesh( geometry, material );

    }




    function basicPyramid( w, h){
    	var geometry = new THREE.CylinderGeometry(0, w, w, h, false); 
    	var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		var material = new THREE.MeshBasicMaterial( {
			
			overdraw: true,
			//transparent: true,
			color: 0xffffff,
			//map: THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc), 
			//wireframe: true,
			side: THREE.DoubleSide} );

		//material.blending = THREE[ "AdditiveAlphaBlending" ];
		//material.depthWrite = false;
		return new THREE.Mesh( geometry, material );
    }






    function cylinder( textureSrc, w, h ){

	    var geometry = new THREE.CylinderGeometry( w, w, h, 32 );

	    //var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		
		var material = new THREE.MeshBasicMaterial( {
			color: "none",
			overdraw: true,
			transparent: true,
			//wireframe: true,
			side: THREE.DoubleSide
		});

		//material.blending = THREE[ "AdditiveAlphaBlending" ];


		if(textureSrc !="") material.map = THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc)

		material.depthWrite = false;
		return new THREE.Mesh( geometry, material );
    }

 	

  



    function bloc( w, h, d  ){
	    var geometry = new THREE.CubeGeometry(w, h, d, 2, 2, 2);
		var material = new THREE.MeshBasicMaterial( {
			color: 0x000000,
			//overdraw: true,
			transparent: true,
			//map: THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc), 
			//wireframe: true,
			side: THREE.DoubleSide} );

		//material.blending = THREE[ "AdditiveAlphaBlending" ];
		//material.depthWrite = false;
		return new THREE.Mesh( geometry, material  );
    }





   	 function box( textureSrc, w, h, d  ){

	    var geometry = new THREE.CubeGeometry(w, h, d, 2, 2, 2);
		var material = new THREE.MeshBasicMaterial( {
			
			overdraw: true,
			transparent: true,
			map: THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc), 
			side: THREE.DoubleSide} );

		//material.blending = THREE[ "AdditiveAlphaBlending" ];
		material.depthWrite = false;
		return new THREE.Mesh( geometry, material );
    }


    function planeSprite(_map, w, h){

    	var geometry = new THREE.PlaneGeometry( w, h, 32 );
	    //var geometry = new THREE.CubeGeometry(150, 200, 150, 2, 2, 2);


		var material = new THREE.MeshBasicMaterial( {
			//color: 0xff0000,  

			//shading: null,
			overdraw: true,

			transparent: true,
			map: _map, 
			side: THREE.DoubleSide} );

		material.depthWrite = false;
		return new THREE.Mesh( geometry, material );
    }

    function plane( textureSrc, w, h  ){

    	var geometry = new THREE.PlaneGeometry( w, h, 32 );
	    //var geometry = new THREE.CubeGeometry(150, 200, 150, 2, 2, 2);


		var material = new THREE.MeshBasicMaterial( {
			//color: 0xff0000,  

			//shading: null,
			overdraw: true,

			transparent: true,
			map: THREE.ImageUtils.loadTexture("/chrismas/img/three/" + textureSrc), 
			side: THREE.DoubleSide} );

		//material.blending = THREE[ "AdditiveAlphaBlending" ];
		material.depthWrite = false;
		return new THREE.Mesh( geometry, material );
    }




     function planeTwo( textureSrc, w, h ){
   		var planeTwoGroup = new THREE.Object3D();
   		var p1 = plane(textureSrc, w, h);
   		var p2 = plane(textureSrc, w, h);
   		var p3 = plane(textureSrc, w, h);
   		p2.rotation.y = 90;
   		p3.rotation.y = 45;


   		planeTwoGroup.add( p1 );
   		planeTwoGroup.add( p2 );
   		planeTwoGroup.add( p3 );

   		return planeTwoGroup;


   		//planeTwoGroup

   	}





	function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
	{	
		// note: texture passed by reference, will be updated by the update function.
			
		this.tilesHorizontal = tilesHoriz;
		this.tilesVertical = tilesVert;
		// how many images does this spritesheet contain?
		//  usually equals tilesHoriz * tilesVert, but not necessarily,
		//  if there at blank tiles at the bottom of the spritesheet. 
		this.numberOfTiles = numTiles;
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

		// how long should each image be displayed?
		this.tileDisplayDuration = tileDispDuration;

		// how long has the current image been displayed?
		this.currentDisplayTime = 0;

		// which image is currently being displayed?
		this.currentTile = 0;
			
		this.update = function( milliSec )
		{
			this.currentDisplayTime += milliSec;
			while (this.currentDisplayTime > this.tileDisplayDuration)
			{
				this.currentDisplayTime -= this.tileDisplayDuration;
				this.currentTile++;
				if (this.currentTile == this.numberOfTiles)
					this.currentTile = 0;
				var currentColumn = this.currentTile % this.tilesHorizontal;
				texture.offset.x = currentColumn / this.tilesHorizontal;
				var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
				texture.offset.y = currentRow / this.tilesVertical;
			}
		};
	}		



    function stats(){
    	// STATS
    	stats = new Stats();
	    stats.domElement.style.position = 'absolute';
	    stats.domElement.style.bottom = '0px';
	    stats.domElement.style.zIndex = 100;
	    container.appendChild( stats.domElement ); 
    }


    function animate()
	{
    	requestAnimationFrame( animate );

    	console.log('animate');

    	update();
    	render();       
   		

	}

	var count = 0;



	function update(){
		//console.log('update');
		

	}


	

    function render() 
	{

		controls.update();

		
		


		if( rotate ){
			smokeTexture.update(100);
			messageTexture.update(5);
			group.rotateOnAxis(axis,rad);
			trainGroup.rotateOnAxis(axis, .008);

		} 

		//soleil.rotation.z += .1;
		//sphere.rotation.z += .1;
		//console.log( sphere.rotation.z );

		renderer.render( scene, camera );

		//console.log('render');
	}










