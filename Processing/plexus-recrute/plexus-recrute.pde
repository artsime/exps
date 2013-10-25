
PShape b;
PShape o;
PShape k;

int count = 0;
//int count2 = 0;

void setup(){
	smooth();

	size(1000, 400);
	background(0);

	b = loadShape("plexus_b.svg");
	o = loadShape("plexus_o.svg");
	k = loadShape("plexus_k.svg");
}


int xPos = 0;
int yPos = 0;

void draw(){

	if(count > 80){ count = 0;}
	//if(count2 > 400){ count2 = 0; background(0);}

	float n = round(random(1,3));

	if(n == 1){ shape(b, xPos, yPos, 100, 100);}
	if(n == 2){ shape(o, xPos, yPos, 100, 100);}
	if(n == 3){shape(k, xPos, yPos, 100, 100);}

	xPos +=100;
	if(xPos>1000){
		xPos = 0;
		yPos += 100;
	}

	if(count == 0 ){

		xPos = 0;
		yPos = 0;
	}

	count ++;
	//count2 ++;


	
}


