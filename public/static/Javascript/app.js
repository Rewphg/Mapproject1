(function () {
    var config = {
        apiKey: "AIzaSyB-OBk-Q2Ik7jqRp9XlTCLIL8FPbUhozUA",
        authDomain: "mapproject1-76680.firebaseio.com",
        databaseURL: "https://mapproject1-76680.firebaseio.com/",
        storageBucket: "mapproject1-76680.appspot.com"
      };
    firebase.initializeApp(config);
    
    function writeFirebaseData(Data, Index) {
        firebase.database().ref().child('Data'){
            type: Data.type,
            x: Data.x,
            y: Data.y,
        });
        console.log("writeData")
    }
  })