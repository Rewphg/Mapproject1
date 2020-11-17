var pid = `{{pid}}`
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://localhost:5000/user/Homepage" + pid + "/json", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var desc = document.getElementById("info");
        renderData(data.object);
        //console.log(data)
        arr_object.forEach((Description, index) => {
            if (Description.hasOwnProperty("dis") && Description != undefined) {
                desc.innerHTML += Description
                console.log(Description)
            }
        })
    }
}

var arr_object = [];
var current_booth;

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

        if (el.hasOwnProperty("type")) {
            console.log(el.type)
            arr_object.push({ x: el.x, y: el.y, "type": "line" });
            console.log(el.x, el.y)
        }
    })


    data.forEach(function(el, i) {
        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/pin.png" || el.src == "../../../static/Icons/pin.png")) {
            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/pin.png", el.title))
        }
    });

    data.forEach(function(el, i) {
        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/info.png" || el.src == "../../../static/Icons/info.png")) {
            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/info.png", el.title))
        }
    });

    data.forEach(function(el, i) {
        if (el.hasOwnProperty("src") && (el.src == "/static/Icons/toilet.png" || el.src == "../../../static/Icons/toilet.png")) {
            arr_object.push(new BoothIcon(el.x, el.y, 50, 50, "../../../static/Icons/toilet.png", el.title))
        }
    });


}

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

function updateQrCode() {
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