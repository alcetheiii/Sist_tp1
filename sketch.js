//clase para armar los 4 cuadrados y colocarlos en la pantalla
class Cubo{
	constructor(med1,med2){
	this.CENTER = [width/2,height/2];
	this.med1 = med1;
	this.med2 = med2;
	this.pg = 0;
	this.color = [];
	this.tam = [];
	this.x = [];
	this.y = [];
	this.offset = (this.med1/4)*random([2,3]);
	}

	//Secuencia de creacion de la obra
	CSetup(){
		//Define el tamaño de los cuadrados
		for (let i = 1;i<=4;i++){
			this.color[i] = random([color("#DEE608"),color("#D40134"),color("#4F3B76"),color("#6C94BD")])
		}
		//define el tamaño de los cuadrados (array desde 1 porque me hago lios mentales desde el 0)
		this.tam[1] = random([this.med1,this.med2]);
		this.tam[3] = this.tam[1];
		this.tam[2] = this.tam[1] == this.med2?this.med1:this.med2;
		this.tam[4] = this.tam[1] == this.med2?this.med1:this.med2;

		//Posiciona a los cuadrados en su seccion	
		this.PosIn(1,0,0);
		this.PosIn(2,1,0);
		this.PosIn(3,1,1);
		this.PosIn(4,0,1);

		//añade distancia entre los cubos (offset) Reducir a una funcion
		if(random([0,1]) == 1){
			if(random([0,1]) == 1){
				this.x[1] += this.offset;
				this.x[2] += this.offset;
				this.y[2] += this.offset;
				this.y[3] += this.offset;
				this.x[3] -= this.offset;
				this.x[4] -= this.offset;
			} else {
				this.x[1] -= this.offset;
				this.x[2] -= this.offset;
				this.y[2] -= this.offset;
				this.y[3] -= this.offset;
				this.x[3] += this.offset;
				this.x[4] += this.offset;
			}
		}else{
			if(random([0,1])){
			this.x[1] += this.offset;
			this.x[2] += this.offset;
			} else {
			this.x[2] -= this.offset;
			this.x[1] -= this.offset;
			}
		}
	}

	//un poco de crimenes informaticos porque declarar 4 variables seguidas me da toc
	PosIn(id,vd1,vd2){
		vd1==0?this.x[id]=this.CENTER[0]-(this.tam[id]):this.x[id]=this.CENTER[0];
		vd2==0?this.y[id]=this.CENTER[1]-(this.tam[id]):this.y[id]=this.CENTER[1];
	}

	CDraw(){
		for(let i = 1;i<=4;i++){
			push();
			noStroke();
			fill(this.color[i]);
			square(this.x[i],this.y[i],this.tam[i]);
			pop();
		}
	}

}

class Generator{
	constructor(){
		this.cubo1 = new Cubo(50,55);
		this.genColor = [];
		this.pg = [];
		this.fpg = [];
	}

	GSetup(){
		for (let i = 1;i<=4;i++){
			this.genColor[i] = random([color("#9FE405"),color("#E7A3BD"),color("#ABC6CF"),color("#9E7DB2")])
		}
		this.cubo1 = new Cubo(90,100);
		this.cubo1.CSetup();
		//crea los recuadros en base a la distancia recorrida
		for(let i = 1;i<=4;i++){
			this.fpg[i] = random([0,1])==1?createGraphics():createGraphics(this.cubo1.tam[i]-(this.cubo1.offset),this.cubo1.tam[i]-(this.cubo1.offset));
			this.fpg[i].background(this.genColor[i]);
		}

		for(let i = 1;i<=4;i++){
			this.pg[i] = createGraphics(this.cubo1.tam[i]+(this.cubo1.offset),this.cubo1.tam[i]+(this.cubo1.offset));
			this.pg[i].background(this.genColor[i]);
		}	
	}

	GDraw(){
		for(let i = 1;i<=4;i++){
		image(this.pg[i],this.cubo1.x[i]-(this.cubo1.offset/2),this.cubo1.y[i]-(this.cubo1.offset/2));
		}
		this.cubo1.CDraw();
		for(let i = 1;i<=4;i++){
		image(this.fpg[i],this.cubo1.x[i]+(this.cubo1.offset/2),this.cubo1.y[i]+(this.cubo1.offset/2));
		}
	}
}

let gen;
let mic;

function setup(){
	let can = createCanvas(400, 400);
	can.mousePressed(userStartAudio);
	gen = new Generator();
	mic = new p5.AudioIn();
	mic.start();
	gen.GSetup();
}

function draw(){
	mic_level = mic.getLevel();
	for(let i = 1; i<=4; i++){
	print(mic_level);
	mic_level<=0.05?gen.cubo1.tam[i] -= mic_level*2:gen.cubo1.tam[i] += mic_level;
	}
	background(155);
	gen.GDraw();
}

function keyPressed(){
	gen.GSetup();

}
