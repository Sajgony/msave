// Initialize Firebase
var config = {
  apiKey: "AIzaSyDuILTd3Ee9gaxZei1ejtlrnvabNz3W294",
  authDomain: "msave-5b0b0.firebaseapp.com",
  databaseURL: "https://msave-5b0b0.firebaseio.com",
  projectId: "msave-5b0b0",
  storageBucket: "msave-5b0b0.appspot.com",
  messagingSenderId: "241757104027"
};
firebase.initializeApp(config);

// Authentication
var provider = new firebase.auth.GoogleAuthProvider();


firebase.auth().signInWithPopup(provider).then(function (result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

  // *** Retrive the Initial Values
  var dbRef = firebase.database().ref('users/' + user.uid + '/value');
  dbRef.on("value", function (snapshot) {
    iniVal = snapshot.val();
    console.log(iniVal);
    document.getElementById("showval").value = iniVal;
  });

  // *** Greet Users with their email name
  document.getElementById("name").innerText = "Welcome back " + user.displayName;
  document.getElementById("email").innerText = user.email;

}).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

// Get a reference to the database service
var database = firebase.database();


// *** Send Value to Firebase
var typeVal = document.getElementById("typeval");
function send() {
  user = firebase.auth().currentUser;
  if (user) {
    var curCycleRef = document.getElementById("curcycle");
    var curCycle = curCycleRef.options[curCycleRef.selectedIndex].value;
    firebase.database().ref('users/' + user.uid + "/cycle").child(curCycle).update({
      value: typeVal.value,
      id: curCycle,
    });
  }
}

// *** Create a new cycle 
var newBudget = document.getElementById("newbudget");
function createCycle() {
  user = firebase.auth().currentUser;
  if (user) {

    var ref = firebase.database().ref('users/' + user.uid + '/cycle');
    ref.orderByChild("id").limitToLast(1).on("child_added", function(snapshot) {
      var cycleExist = snapshot.key;
      if (cycleExist) {
        console.log("cycle exists " + cycleExist)
      }
      else {
        console.log("cycle doesn't exists")
      }
    });
  }
}
