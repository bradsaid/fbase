
let config = {
  apiKey: "AIzaSyDUkcRwJRJl8CNtm_PY66c9IvciRRlDZTI",
  authDomain: "myapp-85244.firebaseapp.com",
  databaseURL: "https://myapp-85244.firebaseio.com",
  projectId: "myapp-85244",
  storageBucket: "myapp-85244.appspot.com",
  messagingSenderId: "547867111421"
};
firebase.initializeApp(config);

let database = firebase.database().ref();

let train = "";
let destination = "";
let trainTime = "";
let frequency = 0;


database.on("child_added", function (snap) {
    let train = snap.val().train;
    let destination = snap.val().destination;
    let trainTime = snap.val().time;  
    let frequency = snap.val().frequency;
    let time1 = moment(trainTime, "HH:mm").subtract(1, "years");
    let timeComparison = moment().diff(moment(time1), "minutes");
    let remainder = timeComparison % frequency;
    let remainingTime = frequency - remainder;
    let trainNext = moment().add(remainingTime, "minutes");
    let useThisTime = moment(trainNext).format("HH:mm");


    $("#display").append(
      ' <tr><td>' + train + '</td>' +
      ' <td>' + destination + '</td>' +
      ' <td>' + useThisTime + '</td>' +
      ' <td>' + frequency + " minutes" + ' </td>' +
      ' <td>' + remainingTime + " minutes" + '</tr>'
    )
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });



$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  // Get the input values
  let train1 = $("#train-name").val().trim();  
  let destination = $("#destination").val().trim();
  let trainTime = $("#train-time").val().trim();
  console.log(trainTime);
  let frequency = parseInt($("#frequency").val().trim());
      database.push({
      train: train1,
      frequency: frequency,
      destination : destination,
      time : trainTime
    });


  
});
