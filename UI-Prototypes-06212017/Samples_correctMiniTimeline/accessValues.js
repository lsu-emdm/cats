/**
 * Created by Indira Avendano on 6/12/2017.
 */
var durationValues = [];
var pitchValues = [];
var rangeOfDurationValues;
var rangeOfPitchValues;

const allNotes = musicFeatures.tracks[1].notes;

var accessData = function() {

//iterate through object keys
    allNotes.forEach(function (item) {
        //get value of name
        var val = item.duration;
        var val2 = item.name;
        //push duration value into array
        durationValues.push(val);
        pitchValues.push(val2);

    });
    rangeOfDurationValues = durationValues.splice(0, 2);
    console.log(durationValues);
    rangeOfPitchValues = pitchValues.splice(0, 2);
    console.log(pitchValues);
//var durationValues = [];

//durationValues.push(allNotes.duration);

//alert(allNotes.duration);
//
    function loggedChangedArray() {

        myJsonString = JSON.stringify(rangeOfDurationValues);
        myJsonString2 = JSON.stringify(rangeOfPitchValues);

        console.log("myJsonString = " + myJsonString + "\n");
        console.log("myJsonString2 = " + myJsonString2 + "\n");
        //storeFinalChanges(myJsonString);
        //}
    }

    loggedChangedArray();


};