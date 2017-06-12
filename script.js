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
  
  var dbRef = firebase.database().ref('users/' + user.uid + '/value');
  var bigOne = document.getElementById("bigOne"); 
  dbRef.on("value", snap => bigOne.innerText = snap.val() );

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




function show() {
  user = firebase.auth().currentUser;
  if (user) {
    
     // Zapis do databaze
     firebase.database().ref('users/' + user.uid).set({
      Name: user.email,
      gender: "Male"
     });
      console.log(user.email + " signed");

      // Initial Values
var starCountRef = firebase.database().ref('users/' + user.uid + '/value');
starCountRef.on('value', function(snapshot) {
  var data =  snapshot.val();
  console.log(data);
});


   
  } else {
    console.log(user + "not siggned");
  }
}


// Reference k inputu
var value1 = document.getElementById("value1");
function send() {
    
  user = firebase.auth().currentUser;
  if (user) {   
    firebase.database().ref('users/' + user.uid).update({
      value: value1.value,
     });     
  }
}



