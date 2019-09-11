// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBSnXBBXl2PYk6i4mTfBK0U9ZnOBQDejgk",
    authDomain: "train-scheduler-88b95.firebaseapp.com",
    databaseURL: "https://train-scheduler-88b95.firebaseio.com",
    projectId: "train-scheduler-88b95",
    storageBucket: "",
    messagingSenderId: "719076505863",
    appId: "1:719076505863:web:6684f216300e9189f26da2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Submit Button (adding to firebase)
var database = firebase.database();
$("#submit").on("click", function() {
    // stops button from refreshing
    event.preventDefault();
    // variables that grabs from info card inputs, while also removing any unnecessary spaces
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstDeparture = $("#first-departure").val().trim();
    var frequency = $("#frequency").val().trim();
    // variable that creates firebase object using variables above
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstDeparture: firstDeparture,
        frequency: frequency
    }
    // once data is pushed to firebase, info card inputs will go blank so that it is ready to add any more train schedules
    database.ref().push(newTrain);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#frequency").val("");
})
// every time data is pushed to firebase, a new object will be created with pushed data
database.ref().on("child_added", function(childSnapshot){
    var trainName = (childSnapshot.val().name);
    var destination = (childSnapshot.val().destination);
    var firstDeparture = (childSnapshot.val().destination);
    var frequency = (childSnapshot.val().frequency);
    // variable that uses moment.js to figure out when the next train arrival will take place
    
})