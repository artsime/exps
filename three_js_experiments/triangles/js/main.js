var camera, scene, renderer;
var geometry, material, mesh;

var W = window.innerWidth, H = window.innerHeight;

var mouseX = 0, mouseY = 0;




$(function(){

	$(window).on('mousemove', function(e) {

	   mouseX = e.pageX; 
	   mouseY = e.pageY;

	 })
});



var Square = function(_w,_h, _d){

	Square.geometry = new THREE.CubeGeometry( _w, _h, _d );
	Square.material = new THREE.MeshBasicMaterial( { color: 0xCCCCCC, wireframe: true } );

	Square.mesh = new THREE.Mesh( Square.geometry, Square.material );

	return Square.mesh;
	
}

Square.prototype.render = function(){
	
	
	
}

var Triangle = function(f1,f2)
{
    var geom = new THREE.Geometry();

    var v1 = new THREE.Vector3(0,f1,0);
    var v2 = new THREE.Vector3(f2,0,50);
    var v3 = new THREE.Vector3(50,30,0);
    
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);


    geom.faces.push(new THREE.Face3(0, 2, 1));
    geom.computeFaceNormals();
    

    var mesh = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
  
    //scene.add(mesh);

    return  mesh; 
}



camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1000;



scene = new THREE.Scene();



var sArray = [];
var bec = new Triangle(300, 900);

scene.add( bec );


for(var i = 0; i<100; i++){

  
    var pos = rand(-500, 500);
    var t = new Triangle(pos, pos);

    sArray.push( t );
    scene.add( t );



    /*
	var pos = rand(-10, 600);
	var mySquare = new Square(pos, pos, pos);
	sArray.push( mySquare );
	scene.add( mySquare ); */







}



//

renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );




animate();



function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );



     if(!camera.position.x){

    	camera.position.x = 0;
		camera.position.y = 0;
	 
    }

    for(id in sArray){

    	//console.log(sArray[id]);
    	sArray[id].rotation.x += rand(mouseY*-1, mouseY);
    	sArray[id].rotation.y += rand(mouseY*-1, mouseY);
        bec.rotation.z += 0.01;

    	//sArray[id].position.x = rand(sArray[id].position.x-10, sArray[id].position.x+10)

    	//sArray[id].position.x = rand(mouseX*-1, mouseX);
    	//sArray[id].position.y = rand(mouseY*-1, mouseY);


    	sArray[id].position.x = sArray[id].position.x * 10 ;


		//sArray[id].position.y = Math.random()*(mouseX- camera.position.y);
    	//console.log(sArray[id].geometry.width);
    	//sArray[id].position.x += sArray[id].

    	//

    	//0debugger



    }




   


    camera.position.x +=  (mouseX - camera.position.x ) * .05;
    camera.position.x +=  (-mouseY - camera.position.y ) * .05;




    //console.log( camera.position.x );


    renderer.render( scene, camera );

}

function rand(min, max){
	return Math.floor(Math.random() * max) + min;
}


