//Reference: w3school, TACV The Amazing Code Verse - YouTube Channel, Stackoverflow Answer 
let showcanvas = document.getElementById("canvas");
const context = showcanvas.getContext("2d");

function preview(input) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("display").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
}

function toCanvas() {
    var image = document.getElementById("display");
    context.drawImage(image, 10, 10);
}
