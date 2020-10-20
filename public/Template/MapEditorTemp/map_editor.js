//Reference and Credits: w3school, coursera, DeveloperMorzilla, Bennadel, DigitalOcean, Medium, CodingShiksha,
//Time2Hack, Cloudinary and Reddit forum. Video sources: Firebase Web App Tutorial, Zinglecode and HTML/CSS by CodingNepal.

//UPLOADING IMAGE and PREVIEW DISPLAY

var template, templateURL;
var files = [];
var reader = new FileReader();

    document.getElementById("select").onclick = function(e) {
    
        var input = document.createElement('input');
        input.type = "file";
        input.click();
    
        input.onchange = e =>  {
            files = e.target.files;
            reader = new FileReader();
            reader.onload = function() {
                document.getElementById("image").src = reader.result;
            }
            reader.readAsDataURL(files[0]);
        }
        input.click();
    }


    document.getElementById("upload").onclick = function(e) {
        templateName = document.getElementById('namebox').value;
        var uploaded = firebase.storage().ref(templateName).put(files[0]);

        uploaded.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('progress').innerHTML = 'Upload' + progress + '%';
        },
        
        function(error) {
            alert("Error in uploading image.")
        },

        function toDatabase() {
            uploaded.snapshot.ref.getDownloadURL().then(function(url) {
                templateURL = url;
        
                firebase.database().ref("Template/" + templateName).set({
                    Name: templateName,
                    Link: templateURL
                })
                alert("Template upload succesfully.")
            })
        }
        );
    }

    document.getElementById("next").onclick