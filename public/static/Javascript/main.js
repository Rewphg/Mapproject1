var Marker = [];
var Index = 1

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.addEventListener("click", GenCan);

    function GenCan(e) {
        var Border = document.getElementById("canvas").getBoundingClientRect();
        PosX = e.clientX - Border.left - 30;
        PosY = e.clientY - Border.top - 30;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(CreateImg("/static/Icons/Icon.png", 100, 100, "ssss"), PosX, PosY, 50, 50);
        console.log("Create", PosX, PosY);
        var MarkerInfo = [{
            type: "booth",
            x: PosX,
            y: PosY,
            Number: Index,
        }]
        Marker.push(MarkerInfo)
        console.log(Marker.length)
        Index++
    }
})

function CreateImg(src, width, height, alt) {
    var ImageObj = new Image();
    ImageObj.src = src;
    ImageObj.width = width;
    ImageObj.height = height;
    ImageObj.alt = alt;
    return ImageObj;
}


var Number = 0
window.addEventListener("click", function(e) {
    console.log('X:', e.x, 'Y:', e.y)
        // GenPhoto("Icons/Icon.png", 1024/4, 1024/4, "ssss",3000,2000)
})

var createItem = function(Marker) {
    var IconE = document.createElement('div');
    IconE.setAttribute('class', 'icon-button icon-radio-checked');
    IconE.style.left = Marker.left + 'px';
    IconE.style.top = Marker.top + 'px';
    $('.interactive-Image').append(IconE);

    var titleE = document.createElement('span')
    titleE.setAttribute('class', 'title')
    titleE.appendChild(document.createTextNode(Marker.title))

    var containerElement = document.createElement('div');
    containerElement.setAttribute('class', 'container');
    containerElement.setAttribute('data-id', Marker.title);
    containerElement.style.color = Marker.fontColor;
    containerElement.style.backgroundColor = Marker.backgroundColor;
    containerElement.style.left = (Marker.left - 100 + 12) + 'px';
    containerElement.style.top = (Marker.top + 30) + 'px';

    return $(containerElement);
};

function GenPhoto(src, width, height, alt, x, y) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    img.x = x
    img.y = y

    document.body.appendChild(img);
}


document.getElementById("Clear").addEventListener('click', function() {
    var MyCan = document.getElementById("canvas");
    var ctx = MyCan.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

function CreateImg(src, width, height, alt) {
    var ImageObj = new Image();
    ImageObj.src = src;
    ImageObj.width = width;
    ImageObj.height = height;
    ImageObj.alt = alt;
    return ImageObj;
}

//  s sdocument.getElementById("Clear").addEventListener('click', function() {
//     var MyCan = document.getElementById("canvas");
//     var ctx = MyCan.getContext('2d');
//     ctx.clearRect(0,0, canvas.width, canvas.height);
// })

window.addEventListener("resize", function() {
    const canvas = document.querySelector("#canvas");
    var mW = window.innerWidth;
    var mH = window.innerHeight;
    canvas.width = mW
    canvas.width = mH
    canvas.fillStyle = '#00FFF'
    canvas.fillRect(0, 0)
}, false)

var config = {
    apiKey: "AIzaSyB-OBk-Q2Ik7jqRp9XlTCLIL8FPbUhozUA",
    authDomain: "mapproject1-76680.firebaseio.com",
    databaseURL: "https://mapproject1-76680.firebaseio.com/",
    storageBucket: "mapproject1-76680.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();

function writeFirebaseData(Data, Index) {
    firebase.database().ref('Marker/' + Index).set({
        type: Data.type,
        x: Data.x,
        y: Data.y,
    });
    console.log("writeData")
}

function SaveData() {
    for (i = 0; i < Marker.length; i++) {
        var D = Marker[i]
        Mname = "Marker" + D.Number
        writeFirebaseData(D, Mname)
    }
}
document.getElementById("SaveBut").addEventListener('click', SaveData(Marker))