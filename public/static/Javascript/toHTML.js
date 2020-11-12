// //Test zone
// var test = [
//     {
//         "toilet":[
//             {
//                 "x":"55.0",
//                 "y":"78.0"
//             }
//         ],
//         "booth":[
//             {
//                 "x":"79.0",
//                 "y":"155.0",
//                 "boothname":"Hello, World",
//                 "boothdescription":"Tummai"
//             }
//         ],
//         "info":[
//             {
//                 "x":"102.0",
//                 "y":"222.0"
//             }
//         ],
//         "route":[
//             {
//                 "x":"100.0",
//                 "y":"325.0"
//             },
//             {
//                 "x":"12.0",
//                 "y":"212.0"
//             }
//         ],
//         maptemplate:"https://yt3.ggpht.com/a/AATXAJywokR9YldORmSqcR0rgcqeH94IYEM9fNP2-SmHpA=s900-c-k-c0x00ffffff-no-rj"
//     }
// ]

// const { pid } = require("process");

// const { pid } = require("process");

// //Real zone
// document.getElementById("app").innerHTML = `
// <h1 class="project-title">(${test.length})</h1>
// ${test.map(function(template) {
//     return `
//     <div class="map">
//         <img class="map-size" src="${test[0].maptemplate}">
//     </div>
//     `
// }).join("")}
// `

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");

var pid = "GnRrzG"
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://localhost:5000/user/" + pid + "/load", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        //console.log(data)
        ctx.beginPath();
        for (var i in data) {
            ctx.lineTo(data.object[i], data.object[i])
        }
        ctx.closePath();
        ctx.fillStyle="#ffca05";
        ctx.strokeStyle="#ffca05"
        ctx.fill()
        ctx.stroke();
        console.log(data.object)
    }
}