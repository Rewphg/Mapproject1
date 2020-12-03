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

var object = {
    "toilet": [],
    "booth": [],
    "info": [],
    "route": [],
    "map": [],
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (Background.length > 0) {
        Background[Background.length - 1].Draw()
    }
    requestAnimationFrame(animate)
    object.booth.forEach((BoothIcon, index) => {
        BoothIcon.Update()
            /*if (CheckCollitionImg(BoothIcon, Eraser) == true) {
                BoothIcons.splice(BoothIcon, 1)
            }*/
    });
    object.toilet.forEach((TI, index) => {
        TI.Update()
    });

    object.info.forEach((TI, index) => {
            TI.Update()
        });

    var OldX;
    var OldY;
    object.route.forEach((P,index) => {
        //console.log(object);

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.moveTo(OldX,OldY);
        ctx.lineTo(P.x, P.y);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        OldX = P.x;
        OldY = P.y;
    });
    //console.log(lines.length)
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
    MPos.x = event.clientX - border.left - 25
    MPos.y = event.clientY - border.top - 25
    
    if(mode==7){
        
        object.booth.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                //BoothIcons.splice(index, 1)
                OpenEdit(object.booth[index])
                EditIndex = index

                qr2.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: object.booth[index].title + "," + object.booth[index].dis + "," + object.booth[index].x + "," + object.booth[index].y   // set text for qr
                });
                
            }
        });
    }
    
    if (mode == 4) {
        object.booth.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                object.booth.splice(index, 1)
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

        object.booth.forEach((A, index) => {
            if (CheckCollition(MPos.x, MPos.y, A) == true) {
                OpenEdit(object.booth[index])
                EditIndex = index

                qr2.set({
                    foreground: 'black', //  setup background color of qr code.
                    size: 100, // size image qr code
                    value: object.booth[index].title // set text for qr
                });
            }
        });
        object.toilet.forEach((B, index) => {
            if (CheckCollition(MPos.x, MPos.y, B) == true) {
                object.toilet.splice(index, 1)
            }
        });
        object.info.forEach((B, index) => {
            if (CheckCollition(MPos.x, MPos.y, B) == true) {
                object.info.splice(index, 1)
            }
        });
    }

    if (MPos.y < canvas.height && MPos.x < canvas.width) {
        On = 1
        if (mode == 1) {
            ConX = event.clientX - border.left - 25
            ConY = event.clientY - border.top - 25
            var index = 1
            ShowMyForm(object, index)
        }

        if (mode == 2) {
            object.toilet.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/toilet.png", "Toilet"))
            console.log(object);
        }

        if (mode == 3) {
            object.info.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/info.png", "Info"))
            console.log(object);
        }

        if (mode == 5) {
            object.route.push({x:MPos.x,y:MPos.y});
            console.log(object);
        }

    }
})

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()
    xmlObj = new XMLHttpRequest();
    xmlObj.open("POST", "http://localhost:5000/TestMap", true);
    xmlObj.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(object);
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