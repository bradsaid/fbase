
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
let trainTime = 0;
let frequency = 0;


database.on("child_added", snap => {
    let train = snap.val().train;
    let destination = snap.val().destination;
    let trainTime = snap.val().time;
    let frequency = snap.val().frequency;
    console.log(train);
    $("#trains").text(train);
    $("#destinations").text(destination);
    $("#frequencies").text(frequency);
    $("#traintimes").text(trainTime);
})


/*database.ref().child("trains").on("value", function(snapshot) {  // ttrying to set path to pull  LEFT OFF HERE
  if (snapshot.child("train").exists() && snapshot.child("frequency").exists() && snapshot.child("time").exists() && snapshot.child("destination").exists()) {
    train = snapshot.val().train;
    destination = snapshot.val().destination;
    trainTime = parseInt(snapshot.val().time);
    frequency = parseInt(snapshot.val().frequency);
    console.log(train);
  }
  /// a for loop here to add each table row?
  $("#trains").text(train);
  $("#destinations").text(destination);
  $("#frequencies").text(frequency);
  $("#traintimes").text(trainTime);

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});*/


$("#submit-bid").on("click", function(event) {
  event.preventDefault();
  // Get the input values
  let train1 = $("#train-name").val().trim();  
  let destination = $("#destination").val().trim();
  let trainTime = parseInt($("#train-time").val().trim());
  let frequency = parseInt($("#frequency").val().trim());
      database.push({
      train: train1,
      frequency: frequency,
      destination : destination,
      time : trainTime
    });

  
});
