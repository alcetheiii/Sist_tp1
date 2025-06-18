//Variable que sostiene la instancia del mic
let mic;

function setup() {

    //Hace el camvas, no tocar
    let cnv = createCanvas(800, 600);

    //"empieza a agarrar audio cuando el usuario hace click" Evita bugs
    cnv.mousePressed(userStartAudio);

    //Crea la instancia del Mic para grabar sonido y hace que empieze a grabarlo
    mic = new p5.AudioIn();
    mic.start();

}


function draw() {
    //Obtiene la altura de la voz para el Y
    mic_level = mic.getLevel();
    
    //Pone la linea anterior en una variable usable
    let Y = (height - 100) - mic_level * height;

    background(200);
    
    //Codigo del circulito en si
    push();
    fill(0);
        //Crea una elipse con el circulo y la variable Y
    ellipse(width/2, Y, 100, 100);
    pop();
}
