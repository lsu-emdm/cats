//var phrases = ["Oh say can you see", "By the dawns early light", "What so proudly we hailed", "At the twilight's last gleaming", "Whose broad stripes and bright stars", "Perilous fight",
    //"Were so galantly streaming","And the rockets red glare", "Gave proof through the night", "Say does that star Spangled Banner yet wave", "Land of the free", "Home of the brave"]; //12 phrases

 //This array will contain a max of 10 objects since there are only 10 possible phrase regions

function Region (pNumber, pText, startNote, endNote) {
    this.phraseNumber = pNumber;
    this.phraseText = pText;
    this.startNote = startNote;
    this.endNote = endNote;
}

var arrayOfRegions = [];
//var lastRegioninArrayOfRegions = arrayOfRegions.length-1;

Region.prototype.notesInRegion = function() {
    var noteArray = [];
    for(var i = this.startNote; i<= this.endNote; i++){
        noteArray.push(notes[i]);
    }
    return noteArray;
};

Region.prototype.startTime = function(){
    return notes[this.startNote].time
};

Region.prototype.updateNotesInRegion = function(noteIndex, action) {
    if(action == "remove"){
        if(noteIndex <= this.startNote){
            this.startNote = this.startNote - 1;
        }
        if(noteIndex <= this.endNote){
            this.endNote = this.endNote - 1;
        }
    } else if (action == "add") {

        if(noteIndex <= this.endNote){
            this.endNote = this.endNote + 1;
        }
        if(noteIndex <= this.startNote){
            this.startNote = this.startNote + 1;
        }

    } else if(action == "dragged"){

        if(noteIndex == this.startNote){
            this.startNote = index;
        }

    }
};

Region.prototype.updateStartNote = function (noteIndex, phraseNumber) {

    if(phraseNumber == 1){
        if(noteIndex == this.startNote){
            this.startNote = index;
        }


    }

}




