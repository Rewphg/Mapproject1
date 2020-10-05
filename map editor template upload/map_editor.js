//Declare a variable to store clientFile id in order to use it in our function.
let upload = document.getElementById("clientFile").files[0];
let dataform = new FormData();

//Create our function to do HTML Events by append our upload to our web server.
//Command and syntax reference: Flaviocopes.com
const templateUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append("myFie", files[0])

    fetch("upload/template", {
        method: "POST",
        body: formData
    })
}