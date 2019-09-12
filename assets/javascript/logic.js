// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBSnXBBXl2PYk6i4mTfBK0U9ZnOBQDejgk",
    authDomain: "train-scheduler-88b95.firebaseapp.com",
    databaseURL: "https://train-scheduler-88b95.firebaseio.com",
    projectId: "train-scheduler-88b95",
    storageBucket: "train-scheduler-88b95.appspot.com",
    messagingSenderId: "719076505863",
    appId: "1:719076505863:web:6684f216300e9189f26da2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Submit Button (adding to firebase)
var database = firebase.database();
$("#submit-button").on("click", function() {
    // stops button from refreshing
    event.preventDefault();
    // variables that grab from info card inputs, while also removing any unnecessary spaces
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstDeparture = $("#first-departure").val().trim();
    var frequency = $("#frequency").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstDeparture);
    console.log(frequency);
    // variable that creates firebase object using variables above
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstDeparture: firstDeparture,
        frequency: frequency
    }
    // pushes newTrain to my console (inpspect)
    console.log(newTrain);
    // once data is pushed to firebase, info card inputs will clear out
    database.ref().push(newTrain);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#frequency").val("");
})
// every time data is pushed to firebase, a new object will be created with pushed data
database.ref().on("child_added", function(childSnapshot){
    var trainName = (childSnapshot.val().trainName);
    var destination = (childSnapshot.val().destination);
    var firstDeparture = (childSnapshot.val().firstDeparture);
    console.log(firstDeparture);
    var frequency = (childSnapshot.val().frequency);
    // variable that uses moment.js to figure out when the next train arrival will take place 
    var timeSplit = firstDeparture.split(":");
    var trainTime = moment().hours(timeSplit[0]).minutes(timeSplit[1]);
    var maxMoment = moment().max(moment(), trainTime);
    var nextArrival;  
    var minutesAway;
    if (maxMoment === trainTime) {
        nextArrival = trainTime.format("hh:mm A");
        minutesAway = trainTime.diff(moment(), "minutes");
    } else {
        // calculates minutes away from next arrival
        var timeDifference = moment().diff(trainTime, "minutes");
        var tRemainder = timeDifference % frequency;
        minutesAway = frequency - tRemainder;
        nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
    }
    console.log("Next Arrival:", nextArrival);
    console.log("Minutes Away:", minutesAway);
    var newRow = $("<tr>").append(
        $("<td class='text-center'>").text(trainName),
        $("<td class='text-center'>").text(destination),
        $("<td class='text-center'>").text(frequency),
        $("<td class='text-center'>").text(nextArrival),
        $("<td class='text-center'>").text(minutesAway)
    );
    // adds train info to table
    $("#train-table > tbody").append(newRow);

})