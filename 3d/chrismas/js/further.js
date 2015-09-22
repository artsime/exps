 


	   // var mesh = generateMesh();
	   // mesh.position.y = -30;
	   // group.add( mesh );
	  	for(var i = 0; i < 2; i ++){

			var n = random(8, 12);

			buidings[i] = bloc( n, n + 10, n);
			buidings[i].position.y= n * -1 /2;
			
			buidings[i].position.x = random(-45, 45);
			buidings[i].position.z = random(-45, 60);


			//group.add( buidings[i] );
		}




  function generateMesh(){

    	  var meshPoints = [];
  
		  var points = 66;
		  var min = 0;
		  var max = 50;

		  var xPos = 0;
		  var yPos = 0;
		  var zPos = 0;
		  
		  meshPoints.push({x:min,y:min,z:min});
		  
		  for(var p = 0; p < points; p++){
		    
		  	var x = xPos;
		     //var x = Math.floor(Math.random() * (max)) + (p + 5);
		    var y = Math.floor(Math.random() * (max)) + (p + 5);
		    //var z  = (Math.sqrt(Math.abs(Math.pow(x,2) - Math.pow(y,2))))/2;
		    //yPos = y;
		  	var z = zPos; 
		     

		      for(var q = 0; q < points; q++){

		      	xPos += 10;
		      }

		  	  zPos += 10;
		  
		  	  meshPoints.push( {x:xPos, y:yPos, z:zPos} );


		  }
		 
		  meshPoints.push({x:max,y:max,z:max});



		 var meshGeometry = new THREE.Geometry();



		  var vertices = [];
		  var holes = [];
		  var numVertices = 20;
		  
		  var lastCoords = 0;
		  
		  var lowestX = 0;
		  var highestX = 0;




		  for(var n in meshPoints){
		    
		    var coords = meshPoints[n];
		    // if(!lowestX) lowestX = coords.x;
		    // lowestX = Math.min(lowestX,coords.x);
		    
		    // if(!highestX) highestX = coords.x;
		    // highestX = Math.max(highestX,coords.x);
		    
		   // var z = (Math.sqrt(Math.abs(Math.pow(coords.x,2) - Math.pow(coords.y,2))))/2;
		   
		    vertices.push(new THREE.Vector3( (coords.x),  (coords.y),  (coords.z)));
		  }

		 
		  var boundingWidth = Math.abs(lowestX - highestX);
		 
		  vertices.push(new THREE.Vector3( meshPoints[0].x,  meshPoints[0].y,  0 ));
		  
		  meshGeometry.vertices = vertices;
		  var triangles = THREE.Shape.Utils.triangulateShape ( vertices, holes );



		  for( var i = 0; i < triangles.length; i++ ){		  
		     meshGeometry.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2] ));
		  }

		  var hex = 0xff0000;
		  meshGeometry.computeBoundingSphere();
		  var mesh = THREE.SceneUtils.createMultiMaterialObject( meshGeometry, [

		    new THREE.MeshBasicMaterial({color: hex,transparent:true,opacity:0.02,side : THREE.DoubleSide}),
		    new THREE.MeshBasicMaterial( { color: hex, wireframe: true,side : THREE.DoubleSide} )

			]);

		  

		  return mesh;

    }
