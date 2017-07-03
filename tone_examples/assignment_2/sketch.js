var title = "Basic Synthesis";
var instructions = "Press a key [1,2,3,4,5]";

var synth;
var synth2;
var ampEnv;
var osc;

var oscNoise;
var ampEnvNoise;

var filt;
var lfo;
var lfo2;


function setup() {
	createCanvas(600,400);
	
	oscNoise = new Tone.Noise().start();
	filt = new Tone.Filter(10000,"lowpass");
	lfo = new Tone.LFO(10,-64, 0).start();
	
	osc = new Tone.Oscillator(440, "sine").start();
	osc2 = new Tone.Oscillator(660, "sawtooth6").start();
	lfo2 = new Tone.LFO(10,650, 670).start();
	
	osc2.volume.value = -12;
	
	ampEnv = new Tone.AmplitudeEnvelope({
		"attack": 0.1,
		"decay": 0.2,
		"sustain": 1.0,
		"release": 0.8
	}).toMaster();
	
	ampEnvNoise = new Tone.AmplitudeEnvelope({
		"attack": 0.1,
		"decay": 0.1,
		"sustain": 0.8,
		"release": 0.1
	}).toMaster();
	
	osc.connect(ampEnv);	
	osc2.connect(ampEnv);	
	lfo2.connect(osc2.frequency);
	
	lfo.connect(oscNoise.volume);
	oscNoise.connect(filt);
	filt.connect(ampEnvNoise);
}

function keyPressed() {
	console.log("Key is:", keyCode);
	
	if (keyCode == 49){
		osc.frequency.value = 'C4';
		osc.frequency.setValueAtTime('C5',"+0.25")
		osc2.frequency.value = 'G4';
		ampEnv.triggerAttackRelease(0.5)
		ampEnvNoise.triggerAttackRelease(0.2,"+0.25");
		
	} else if (keyCode == 50) {
		osc.frequency.value = 'D4';
		osc.frequency.setValueAtTime('A5',"+0.25")
		osc2.frequency.value = 'F4';
		ampEnv.triggerAttackRelease(0.5)
		ampEnvNoise.triggerAttackRelease(0.2,"+0.25");	
	} else if (keyCode == 51) {
		osc.frequency.value = 'E4';
		osc.frequency.setValueAtTime('B5',"+0.25")
		osc2.frequency.value = 'G4';
		ampEnv.triggerAttackRelease(0.5)
		ampEnvNoise.triggerAttackRelease(0.2,"+0.25");
	} else if (keyCode == 52) {
		osc.frequency.value = 'F4';
		osc.frequency.setValueAtTime('C5',"+0.25")
		osc2.frequency.value = 'A4';
		ampEnv.triggerAttackRelease(0.5)
		ampEnvNoise.triggerAttackRelease(0.2,"+0.25");
	}	else if (keyCode == 53) {
		osc.frequency.value = 'G4';
		osc.frequency.setValueAtTime('D5',"+0.25")
		osc2.frequency.value = 'B4';
		ampEnv.triggerAttackRelease(0.5)
		ampEnvNoise.triggerAttackRelease(0.2,"+0.25");
	}
}

function draw() {
  fill(255);
	rect(0,0,width,height);
	fill(200, 0, 255); 
	textAlign(10,10);
	text(title, 10, 50);
	text(instructions, 10, 100);
}









