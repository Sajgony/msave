// Zapis .set do Firebase multi Information
function show() {
  user = firebase.auth().currentUser;

  if (user) {   
    firebase.database().ref('users/' + user.uid).set({
      Name: user.email,
      gender: "Male"
    });
  } 
}

 //Pri zmene proved nasleduji cinost
 dbRef.on("value", snap => bigOne.innerText = snap.val());


 //Show If user is logged
 function show() {
  user = firebase.auth().currentUser;

  if (user) {   
    console.log(user.email + " signed");
  } else {
    console.log(user + "not siggned");
  }
}