var title = "Instruments";

var synth, synth2;
var mSynth;
var fmSynth;
var plucky;
var polyS;

function setup() {
	createCanvas(600,400);
	
	synth = new Tone.Synth({
		oscillator:{
			type:"triangle"
		},
		envelope:{
			attack:0.005,
			decay:0.1,
			sustain:0.3,
			release:1
		}
	}).toMaster()
	
	synth.envelope.attack = 2.;
	
	synth2 = new Tone.Synth().toMaster()
	
	synth.triggerAttackRelease('C4', 3)
	synth2.triggerAttackRelease('G4', '4n',+1, 0.5)
	
	mSynth = new Tone.MonoSynth({
		"oscillator" : {
			"type" : "square"
	 },
	 "envelope" : {
	 	"attack" : 0.7
	 }
	}).toMaster();
	
	fmSynth = new Tone.FMSynth().toMaster();
	fmSynth.modulationIndex =5;
	
	plucky = new Tone.PluckSynth().toMaster();
	
	polyS = new Tone.PolySynth(6, Tone.Synth).toMaster();
	polyS.set("detune", -1200);
	
}

function keyPressed() {
	console.log("Key is:", keyCode);
	if (keyCode == 49){
		mSynth.triggerAttackRelease("C4", "8n");
	} else if (keyCode == 50) {
		fmSynth.triggerAttackRelease("D4", "4n");
	} else if (keyCode == 51) {
		plucky.triggerAttack("E4");
	} else if (keyCode == 52){
		polyS.triggerAttackRelease(["C4", "E4", "A4"], "4n");
		polyS.triggerAttackRelease(["G4", "F4", "B3"], ["4n","8n","16n"], "+1");
	}
	
}

function draw() {
  fill(255);
	    rect(0,0,width,height);
	    fill(200, 0, 255); 
	    textAlign(10,10);
	    text(title, 10, 50);
	
	var mx = mouseX / width;
	fmSynth.harmonicity.value = mx * 8.0;
	var my = mouseY / height;
	plucky.dampening.value = (my * 6000) + 500;
	plucky.resonance.value = mx;
}









