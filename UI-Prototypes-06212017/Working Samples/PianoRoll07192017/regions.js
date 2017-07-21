function Region(pText, startNote, endNote) {
	this.phraseNumber;
	this.phraseText = pText ? pText : "Oh say can you see";
	this.startNote = startNote;
	this.endNote = endNote;
}

Region.prototype.notesInRegion = funtion() {
	var noteArray = [];
	for(var i=this.startNote;i<this.endNote; i++){
		noteArray.push(notes[i]);
	}
	return noteArray;
}

Region.prototype.startTime = function(){
	return notes[this.startNote].time
}

Region.prototype.updateNotesInRegion(noteIndex, action) {
	if(action == "remove"){
		if(noteIndex <= this.startNote){
			this.startNote = this.startNote - 1;
		}
		if(noteIndex <= this.endNote){
			this.endNote = this.endNote - 1;
		}
	} else if (action == "add") {
		
	}
}



//*/
// To Create
region1 = new Region("Oh Say can you see", 1 ,6);

// text?
region1.phraseText
regionStartTime = region1.startTime()
regionNotes = region1.notesInRegion()
region1.updateNotesInRegion(110,"remove");
//*/