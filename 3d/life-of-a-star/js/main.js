
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

var sphere;
var sphereColor = 0xffffff;
var lights = [];
var skyBox;


var intensite = 0;
var mouseX = 0, mouseY = 0;


var snd1;
var snd2;
var snd3;


function loadSounds(){

    snd1 = new buzz.sound("sounds/milk_rock_intro.mp3");
    snd2 = new buzz.sound("sounds/s1.mp3");
    snd3 = new buzz.sound("sounds/s2.mp3");

    snd1.bind("loadstart", function(e) {
        //$('body').append('<div id="loadscreen"></div>')
    })
    snd1.bind("canplay", function(){
        $('#loadscreen').fadeOut();
    });
    


   // .bind("loadstart", function(e) {
}
loadSounds();


$(function(){

    $(window).on('mousemove', function(e) {

       mouseX = e.pageX; 
       mouseY = e.pageY;

     })
});


$(function(){


   


    $('#content').hide().fadeIn();

    $('#start').on('click', function(e){
        e.preventDefault();
        $('#homescreen').fadeOut(500, function(){
            $('#homescreen').remove();
            $(window).unbind();
            init();
            animate();
            


        });

    });
})






function init() 
{



    // SCENE
    scene = new THREE.Scene();



    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);


    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer(); 






    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.createElement( 'div' );
    document.body.appendChild( container );



    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'f'.charCodeAt(0) });



    // CONTROLS
    controls = new THREE.TrackballControls( camera );
    // STATS
    /*
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement ); */
   


    // LIGHT
   

    for (var i = 0; i < 10; i++) {
        var light = new THREE.PointLight(0xffffff);

        light.position.set( random(-100,200),random(-100,200), random(-100,200) );
        light.intensity = intensite;


        scene.add(light);
        lights.push(light);


    };


    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xb69546, side: THREE.BackSide } );
    skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );

    scene.add(skyBox);
    scene.fog = new THREE.FogExp2( 0xdddddd, 0.00025 );

    makeSphere(0.1);
    //sphere.scale.set( 1, 1 , 1);
}


function changeLightIntensity($intensite){

    for (var i = 0; i < lights.length; i++) {
        TweenMax.to(lights[i], 1, {'intensity':$intensite});
       //intensity = $intensite;
    }

}
function changeLightColors(r,v,b){

    for (var i = 0; i < lights.length; i++) {
        //lights[i].color.setHex( $color );
        TweenMax.to( lights[i].color, 1, {'r':r, 'v':v, 'b':b });
       
    }

}

function changeSkyColor(r,v,b){
   
    TweenMax.to(skyBox.material.color, 1, {'r':r, 'v':v, 'b':b});

}


function makeSphere(turbulence){

    // create a sphere and apply the material
    var sphereGeometry = new THREE.SphereGeometry( 64, 64, 32 );
    var sphereMaterial = new THREE.MeshLambertMaterial( { color: sphereColor, emissive: 0xb09842 } );
   
    sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set( 0, 0, 0 );
    scene.add( sphere );
    sphere.geometry.dynamic = true;



    for ( var i = 0; i < sphere.geometry.vertices.length; i++ )
    for ( var j = i+1; i < sphere.geometry.vertices.length; i++ )
    {
        vi = sphere.geometry.vertices[i];
        vj = sphere.geometry.vertices[j];
        
        if ( vi.distanceTo(vj) < 0.001 ){
            sphere.geometry.vertices[i] = sphere.geometry.vertices[j];
        }
    }


    for ( var i = 0; i < sphere.geometry.vertices.length; i++ )
    {
        sphere.geometry.vertices[i].multiplyScalar( turbulence * Math.random());
    }
}




function removeSphere () {
     scene.remove(sphere);
     sphere.geometry.dispose();
}



function randomizeLights () {

    for (var i = 0; i < lights.length; i++) {
        lights[i].position.set(random(-100,200),random(-100,200), random(-100,200));
    };
}

function changeLightPosition(){
    for (var i = 0; i < lights.length; i++) {
        lights[i].position.set( lights[i].position.x +=1, lights[i].position.y +=1, lights[i].position.z += 1);
        
        if( lights[i].position.x > 200) lights[i].position.x = -100;
        if( lights[i].position.y > 200) lights[i].position.y = -100;
        if( lights[i].position.z > 200) lights[i].position.z = -100;


    };


  
}



function random(min, max){
    return Math.floor(Math.random() * max) + min;
}


function tremblement(){
    sphere.rotation.x += random(0.01, 0.1);
    sphere.rotation.y += random(0.01, 0.1);
    sphere.rotation.z += random(0.01, 0.1);

}
  

function mouseMoveCamera(){
    camera.position.x +=  (mouseX - camera.position.x ) * .05;
    camera.position.y +=  (-mouseY - camera.position.y ) * .05;
}





var count = 0;
var sphereSize = 0;
var randomRotation = 0.01;



var timeBigger = 10;
var moulinette = false;




function animate()
{
    requestAnimationFrame( animate );

    tremblement();
    sphere.rotation.x += randomRotation;
    sphere.rotation.y += randomRotation;
    sphere.rotation.z += randomRotation;

   if(count < 10){
    randomizeLights ();
   }   

   if(count == 0){

    snd1.play().fadeIn();
    changeLightIntensity(0.1);

    
     TweenMax.to(sphere.scale, 8, {'x':"10", 'y':"10", 'z':"10", onComplete:function(){
      
        changeLightIntensity(0.1);
        randomizeLights ();
        changeLightColors(0,400,10);
        



        TweenMax.to(sphere.scale, 10, {'x':"15", 'y':"15", 'z':"15", onComplete:function(){
            changeLightColors(200,40,10);
            changeLightIntensity(0.2);
            snd3.play();

            TweenMax.to(sphere.scale, 20, {'x':"30", 'y':"30", 'z':"30", onComplete:function(){
           
                randomRotation = 0;

                TweenMax.to(sphere.scale, 0.3, {'x':"0.1", 'y':"0.1", 'z':"0.1", onComplete:function(){
                    //changeLightColors(0,0,0);
                    changeLightIntensity(1);
                    snd2.play();
                

                    TweenMax.to(sphere.scale, 0.5, {'x':"10000", 'y':"10000", 'z':"10000", onComplete:function(){
                          TweenMax.to(sphere.scale, 0.3, {'x':"0", 'y':"0", 'z':"0", onComplete:function(){
                                removeSphere ();
                                makeSphere( -1000 );
                                //var hemilight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
                               // scene.add(hemilight);
                            }});
                            TweenMax.to(sphere.scale, 10, {'x':"0", 'y':"0", 'z':"0", onComplete:function(){
                                snd2.play();
                                window.location.reload();
                            }});

                    }});
                }});
            }});

        }});

      }});


   }
    

    /*
    if(count == 300){
        removeSphere ();
        //changeLightIntensity(0.03);

        //sphereColor= 0xff0000;
        sphereSize=1;
        makeSphere( sphereSize );
        randomizeLights ();
    }



    if(count == 1000){
        removeSphere ();
        //changeLightIntensity(0.08);
       

        makeSphere( sphereSize );
        //randomizeLights ();

    }

     if(count == 2000){
        removeSphere ();
        changeLightIntensity(0.5);
        sphereColor= 0xff0000;

        makeSphere( 1.3 );
        randomizeLights ();

    }

    */


    //if((count > 1000) && (count < 2500) ) randomizeLights ();

   
 

    count++


    /*

    if(mode == 0){
        console.log("mode : 0");

        sphere.rotation.x += random(0.01, 0.1);
        sphere.rotation.y += random(0.01, 0.1);
        sphere.rotation.z += random(0.01, 0.1);
    }

    else if(mode == 1){
        console.log("mode : 1");
    if(count < 1){
        removeSphere ();
        makeSphere( 2 );

        randomizeLights ();
    }




    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;

    /*sphere.position.x += 1;
    sphere.position.y += 1;
 
    sphere.position.set( Math.random() ,Math.random(),Math.random() );




    }

    else if(mode == 2){
        console.log("mode : 2");
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        sphere.rotation.z += 0.01;


       if(count < 1){
         removeSphere ();
         makeSphere( -1000 );   
       } 
       if(count > 1000){
        
         count = 0;
        }
        count++

       
    }
    
    */



    render();       
    update();
}




function update()
{

    //randomizeLights () 
    changeLightPosition()




    if ( keyboard.pressed("m") ) 
    { 
        mode++;
        count = 0;

        if(mode == 3) mode = 0;
    }




    if ( keyboard.pressed("z") ) 
    { 
        var n = 4 * Math.random();
        sphere.scale.set( n,n,n);
    }
  

    if ( keyboard.pressed("l") ) 
    { 

        randomizeLights ();
        //changeLightPosition();
    }


    if ( keyboard.pressed("i") ) 
    { 

       intensite = random (0.1, 1);
        //changeLightPosition();
    }
    


    if ( keyboard.pressed("g") ) 
    { 
         removeSphere ();
         makeSphere( random(1,2) );
    }

      if ( keyboard.pressed("e") ) 
     { 
    
         removeSphere ();
         makeSphere( -1000 );
    }




    
    controls.update();
    //stats.update();
}

function render() 
{
    renderer.render( scene, camera );
}

$(function() {


    $( window ).bind('resize', function() {
       redimensionner();


    });

});


function center(el){
    //$(el).css({'marginLeft'})

}
function redimensionner(){
    $('#homescreen').width( $(screen).width() ).height( $(screen).height() );

   //$('#content').css({'top': $(screen).height()/2})
}
