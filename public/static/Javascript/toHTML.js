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

// var user = document.getElementById("user")
// var ctxuser = user.getContext("2d");

//This part of code, I was implemented from an old code into this one by simply use the benefit of arr_object then
//ask this from server to make it render from JSON.parse()
console.log(window.location.href)
// var pid = `{{pid}}`
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", window.location.href + "/json", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var desc = document.getElementById("info");
        // for (var i = 0; i < data.length; i++) {
        //     if (data.object.hasOwnProperty("dis")) {
        //         desc.innerHTML = "Description" + data[i].object
        //         desc.appendChild(desc.innerHTML)
        //     }
        // }
        renderData(data.object);
        //console.log(data)
    }
}

            var arr_object = [];
            var current_booth;
            // var user = '{{username}}'
            
            var qr;

            var savedContent = new Object();

            (function() {
                qr = new QRious({
                    element: document.getElementById('qr-code'), // canvas object
                    size: 100, // size image qr code
                    value: 'Event Me!!!' // value default text
                });

                doRenderTemp();
                
            })();

            function generateQRCode() {
                var qrtext = document.getElementById("qr-text").value; // value  text from text box
                //document.getElementById("qr-result").innerHTML = "QR code for " + qrtext +":"; // get element p object to assign text
                //alert(qrtext); 
                qr.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: qrtext // set text for qr
                });
            }

            // function refreshServer() {
            //     $.getJSON("/user/{{pid}}/json", function(d) {
            //         //console.log(d.object);
            //         // Put the object into storage
            //         if (localStorage.getItem('mapObject') != null) {
            //             localStorage.setItem('mapsObject', JSON.stringify(d.object));
            //         }
            //         renderData(d.object);
                    
            //     }).fail(function() {
            //         console.log("An error has occurred.");
            //     });
            // }

            function clearMap() {
                arr_object = [];
                saveTemp();
                doRenderTemp()
            }

            function saveTemp() {
                // Put the object into storage
                var tempData = arr_object

                localStorage.setItem('mapsObject', JSON.stringify(tempData));
            }

            function renderData(data) {
                    var OldX;
                    var OldY;
                    data.forEach((el, index) => {
                        
                        if (el.hasOwnProperty("type")){
                            console.log(el.type)
                            arr_object.push({x:el.x,y:el.y, "type": "line"});
                            console.log(el.x, el.y)
                        }
                    })
                

                    data.forEach(function(el,i) {
                        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/pin.png" || el.src == "../../../static/Icons/pin.png")){
                            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/pin.png", el.title))
                        }
                    });

                    data.forEach(function(el,i) {
                        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/info.png" || el.src == "../../../static/Icons/info.png")){
                            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/info.png", el.title))
                        }
                    });

                    data.forEach(function(el,i) {
                        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/toilet.png" || el.src == "../../../static/Icons/toilet.png" )){
                            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/toilet.png", el.title))
                        }
                    });

                    
            } // load data

            function readTemp() {
                // Retrieve the object from storage

                var retrievedObject = JSON.parse(localStorage.getItem('mapsObject')); //JSON.stringify());
                if (retrievedObject != null && retrievedObject.length > 0) {
                    return retrievedObject;
                }
                return [];

            }

            function doRenderTemp() {
                renderData(readTemp());
            }

            function updateQrCode(){
                var title = $("#DisName").val();
                var desc = $("#Description").val();
                var new_x = MPos.x;
                var new_y = MPos.y;
                qr.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: title + "," + desc + "," + new_x + "," + new_y // set text for qr
                });
            }
            