
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB-OBk-Q2Ik7jqRp9XlTCLIL8FPbUhozUA",
    authDomain: "mapproject1-76680.firebaseapp.com",
    databaseURL: "https://mapproject1-76680.firebaseio.com",
    projectId: "mapproject1-76680",
    storageBucket: "mapproject1-76680.appspot.com",
    messagingSenderId: "845059379868",
    appId: "1:845059379868:web:b027db02ef397c849f5359",
    measurementId: "G-WB26Y8VMXC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function SaveData() {
    for (i = 0; i < Marker.length; i++) {
        var D = Marker[i]
        Mname = "Marker" + D.Number
        writeFirebaseData(D, Mname)
        console.log("save")
    }
}
