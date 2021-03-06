//Reference: Stackoverflow, TowardDataScience, Reddit Forum

const MPos = [{
    x: 0,
    y: 0,
}]

// function setupCanvas(canvas) {
//     var dpr = window.devicePixelRatio || 1;
//     var rect = canvas.getBoundingClientRect();
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;
//     var ctx = canvas.getContext('2d');
//     ctx.scale(dpr, dpr);
//     return ctx;
//   }
// var ctx = setupCanvas(document.querySelector('.my-canvas'));

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')

var mode = 0

let route = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Background = []
const BoothIcons = []
const ToiletIcons = []
const Infos = []
const lines = []

// var object = {
//     "toilet": [],
//     "booth": [],
//     "info": [],
//     "route": [],
//     "map": [],
// }

var arr_object = []

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (Background.length > 0) {
        Background[Background.length - 1].Draw()
    }
    requestAnimationFrame(animate)
    var OldX;
    var OldY;
    arr_object.forEach((BoothIcon, index) => {
        if (BoothIcon.hasOwnProperty("type")) {
            
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            if(BoothIcon.type == "line"){
                ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.moveTo(OldX, OldY);
            ctx.lineTo(BoothIcon.x, BoothIcon.y);
            ctx.strokeStyle = "#FF0000";
            ctx.stroke();
            OldX = BoothIcon.x;
            OldY = BoothIcon.y;
            }

            if(BoothIcon.type=="background") {
                var B = new Image();
                B.width = canvas.width;
                B.height = canvas.height;
                B.src = BoothIcon.filename;
                ctx.drawImage(B, 0, 0, canvas.width, canvas.height);
            }
            
        } else {
            //console.log(arr_object);
            BoothIcon.Update();
        }
        /*if (CheckCollitionImg(BoothIcon, Eraser) == true) {
            BoothIcons.splice(BoothIcon, 1)
        }*/
    });
      
} // .End animate

function startRoute(e) {
    route = true;
    draw(e);
}

function endRoute() {
    route = false;
    ctx.beginPath();
}

function draw(e) {
    if (!route) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();

}

canvas.addEventListener("mousedown", startRoute);
canvas.addEventListener("mouseup", endRoute);
canvas.addEventListener("mousemove", draw);

var ConX = 0
var ConY = 0
var On = 0
var EditIndex = 0

//mode 0 = none ,mode 1 = Booth ,mode 2 = Toilet ,mode 3 = info, mode 4 = eraser, mode 5 = route

document.getElementById("canvas").addEventListener("click", (event) => {
    event.preventDefault()
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left
    MPos.y = event.clientY - border.top

    if (mode == 7) {

        arr_object.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                //BoothIcons.splice(index, 1)
                OpenEdit(arr_object[index])
                EditIndex = index

                qr2.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: arr_object[index].title + "," + arr_object[index].dis + "," + arr_object[index].x + "," + arr_object[index].y // set text for qr
                });

            }
        });
    }

    if (mode == 4) {
        arr_object.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                arr_object.splice(index, 1)
                /*OpenEdit(BoothIcons[index])
                //EditIndex = index

                qr2.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: BoothIcons[index].title + "," + BoothIcons[index].dis + "," + BoothIcons[index].x + "," + BoothIcons[index].y   // set text for qr
                });
                */
            }
        });

        arr_object.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                arr_object.splice(index, 1)
                    /*OpenEdit(BoothIcons[index])
                    //EditIndex = index

                    qr2.set({
                        foreground: 'black', //  setup background color of qr code.
                        size: 100, // size image qr code
                        value: BoothIcons[index].title + "," + BoothIcons[index].dis + "," + BoothIcons[index].x + "," + BoothIcons[index].y   // set text for qr
                    });
                    */
            }
        });

        arr_object.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                OpenEdit(arr_object[index])
                EditIndex = index

                qr2.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: object.booth[index].title // set text for qr
                });
            }
        });
        arr_object.forEach((B, index) => {
            if (CheckCollition(MPos.x, MPos.y, B) == true) {
                arr_object.splice(index, 1)
            }
        });
        arr_object.forEach((B, index) => {
            if (CheckCollition(MPos.x, MPos.y, B) == true) {
                arr_object.splice(index, 1)
            }
        });
    }

    if (MPos.y < canvas.height && MPos.x < canvas.width) {
        On = 1
        if (mode == 1) {
            ConX = event.clientX - border.left
            ConY = event.clientY - border.top
            var index = 1
            ShowMyForm(arr_object, index)
            console.log(arr_object)
        }

        if (mode == 2) {
            // object.toilet.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "/static/Icons/toilet.png", "Toilet"))
            arr_object.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "/static/Icons/toilet.png", "Toilet"))
            console.log(arr_object);
        }

        if (mode == 3) {
            arr_object.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "/static/Icons/info.png", "Info"))
            console.log(arr_object);
        }

        if (mode == 5) {
            arr_object.push({ x: MPos.x, y: MPos.y, "type": 'line' });
            //console.log(arr_object);
            console.log(arr_object)
        }

    }
})

function initObject(arr) {
    new_arr = []
    arr.forEach(elem => {
        if (elem['type'] != 'line') {
            new_arr.push(new BoothIcon(elem.x, elem.y, elem.width, elem.height, elem.src, elem.title))
        } else {
            new_arr.push(elem)
        }

    })
    return new_arr

}

document.getElementById("sent").addEventListener("click", function(event) {
    //var user = '{{username}}'
    //var pid = '{{pid}}'
    xmlObj = new XMLHttpRequest();
    xmlObj.open("POST", "http://localhost:5000/org/" + user + "/project/" + pid + "/save", true);
    xmlObj.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({ "object": arr_object });
    xmlObj.send(data);
    xmlObj.onreadystatechange = handleRequest();

    function handleRequest() {
        if (xmlObj.readyState == 4 && xmlObj.status == 200) {
            var myJSON = JSON.parse(xmlObj.responseText);
            document.getElementById("response").innerHTML = myJSON.prediction;
            alert("loaded");
        } else {
            alert(xmlObj.status);
        }
    }
})

animate()