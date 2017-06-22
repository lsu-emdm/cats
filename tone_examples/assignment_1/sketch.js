// PDM Audio Assignment 1 Example
//
// Jesse Allison 2017
//
// 

var title = "Sample Beast";

var multiPlayer, pingPong;

function preload() {
	multiPlayer = new Tone.MultiPlayer({
		"kick" : "media/kick.mp3",
		"hat" : "media/hh.mp3",
		"high" : "media/agogoHigh.mp3",
		"low" : "media/agogoLow.mp3"
	}, function(){
		multiPlayer.connect(pingPong);
		multiPlayer.start("kick");
	});
}

function setup() {
	var cnv = createCanvas(600,400);
	cnv.mousePressed(pingPongDelayTime);		// Allow the delay time to change.
	background(200);

	pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
	pingPong.wet.value = 0.5;
	
	
	// Buttons to trigger samples
	button = createButton('X');
  button.position(20, 80);
  button.mousePressed(kick);

	button2 = createButton('O');
  button2.position(50, 80);
  button2.mousePressed(hat);

	button3 = createButton('+');
  button3.position(80, 80);
  button3.mousePressed(high);

	button4 = createButton('-');
  button4.position(110, 80);
  button4.mousePressed(low);
}

function draw() {
	fill(200, 100, 100); 
	text(title, 10, 20);
	text("Click to set delay time (fast <-> slow)", 10, 50);
}


function pingPongDelayTime() {
	pingPong.delayTime.value = (mouseX/600) + 0.1;
}


function kick() {
	multiPlayer.start("kick");
}
function hat() {
	multiPlayer.start("hat");
}
function high() {
	multiPlayer.start("high");
}
function low() {
	multiPlayer.start("low");
}

