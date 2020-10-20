var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mapproject1-76680.firebaseio.com"
});

var refreshToken; // Get refresh token from OAuth2 flow

admin.initializeApp({
  credential: admin.credential.refreshToken(refreshToken),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

export default GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"

var database = firebase.database();

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();