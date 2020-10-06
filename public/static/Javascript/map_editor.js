//Reference and Credits: w3school, coursera, DeveloperMorzilla, Bennadel, DigitalOcean, Medium, CodingShiksha,
//Time2Hack, Cloudinary and Reddit forum. Video sources: Firebase Web App Tutorial, Zinglecode and HTML/CSS by CodingNepal.

//Declare a placeholder to store our file in order to display our image to our web server
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const fileName = document.querySelector(".file-name");
var file = document.getElementById("default-btn");
var preview = document.getElementById("preview");

//Now we add our Regular Expression for us to detect file path and display it as a file name.
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;

//In JS, to make a web functional we need to create an HTML events to make it more
//functional.
file.addEventListener("change", function() {
    test(this);
});

//Now we create a function to display filename and preview a picture before upload it to our database.
function displayTemplate() {
    window.alert("Please upload your map template.")
    defaultBtn.click();
}
defaultBtn.addEventListener("change", function() {
    if (this.value) {
        let nameValue = this.value.match(regExp);
        fileName.style.display = "block";
        fileName.textContent = nameValue;
    }
});

//But, we also need to push our file to our server (request) and make it respond back.
//So now we create another function to call this to another webpage.
function uploadResponse() {
    window.alert("File has been uploaded.")
    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("template", template);

    xhr.onreadystatechange = state => {console.log(xhr.status);}
    xhr.open("POST", '/upload/template');
    xhr.send(formData);
    
    document.template.imagetag.src=document.template.filetag.value;
}

function test(input) {
    var reader;

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function(e) {
      preview.setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function displayAnother() {
    uploadResponse()
    displayTemplate()
    location.replace("http://https://mapproject1-76680.firebaseapp.com/Template/template.html:8080/upload")
}

function toDatabase() {

    const ref = firebase.storage().ref()
    const file = document.querySelector("preview").files[0]
    const name = new Data() + '-' + file.name
    const metadata = {
        contentType:file.type
    }

    const task = ref.child(name).put(file,metadata)

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url)
        alert("Image upload successful")
        const preview = document.querySelector("#preview")
        preview.src = url
    })
}