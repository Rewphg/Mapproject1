//Reference: TACV - The Amazing Code Verse
var fcanvas = document.getElementById("canvas");
let images = document.getElementById("display");

function toShowup() {
    document.getElementById("append").onclick = function() {
        templateName = document.getElementById("namebox1").value;
        firebase.database().ref("Template/" + templateName).on('value', function(snapshot) {
            var append = images.src = snapshot.val().Link;
            var context = fcanvas.getContext("2d");
            fcanvas.addEventListener('load', (e) => {
                context.drawImage(append, 0, 0)
            })
            alert("Successfully load template.")
        })
    }
}