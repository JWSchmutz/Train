// Initialize Firebase
var config = {
  apiKey: "AIzaSyDISOi9_L8SBi3XPMuX63bjL0Kvyxk6MWs",
  authDomain: "train-39b3f.firebaseapp.com",
  databaseURL: "https://train-39b3f.firebaseio.com",
  projectId: "train-39b3f",
  storageBucket: "train-39b3f.appspot.com",
  messagingSenderId: "516803639284"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").click(function (event) {
  event.preventDefault();
  var train = {
    name: $("#trainName").val(),
    destination: $("#destination").val(),
    first: $("#first").val(),
    frequency: $("#frequency").val()
  }
  if ((train.name !== "") && (train.destination !== "") && (train.first !== "") && (train.frequency !== "")) {
    database.ref().push(train);
    $("#trainName").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");
  } else {
    alert("All fields are required.")
  }
})

database.ref().on("child_added", function (snap) {
  var name = snap.val().name
  var destination = snap.val().destination
  var first = snap.val().first
  var frequency = snap.val().frequency
  var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
  var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
  var remainder = timeDifference % frequency;
  var minutesTillTrain = frequency - remainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm A");
  var tr = $("<tr>");
  var tdName = $("<td>").text(name);
  var tdDestination = $("<td>").text(destination);
  var tdFrequency = $("<td>").text(frequency);
  var tdNext = $("<td>").text(nextTrain);
  var tdAway = $("<td>").text(minutesTillTrain);
  $(tr).prepend(tdName, tdDestination, tdFrequency, tdNext, tdAway);
  $("#trainStation").append(tr);
  console.log(nextTrain);
})
