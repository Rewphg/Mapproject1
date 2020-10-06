

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 500;
    canvas.addEventListener("click", GenCan);
    function GenCan(e){
        var Border = document.getElementById("canvas").getBoundingClientRect();
        PosX = e.clientX - Border.left -30;
        PosY = e.clientY - Border.top - 30;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(CreateImg("/static/Icons/Icon.png", 100, 100, "ssss"), PosX, PosY, 50,50);
        console.log("Create", PosX, PosY);
    }
})
window.addEventListener("click", function(e) {
    console.log('X:', e.x, 'Y:', e.y)
    var rect = document.getElementById("Map-Image").getBoundingClientRect()
    console.log("s",rect.top, rect.right, rect.bottom, rect.left)
    var Marker = [
        {
            top: 300,
            left: 300,
            title: "marker1"
        }
    ]
    var createItem = function(Marker){
        var IconE = document.createElement('div');
        IconE.setAttribute('class', 'icon-button icon-radio-checked');
        IconE.style.left = Marker.left+'px';
        IconE.style.top = Marker.top+'px';
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

    createItem(Marker)
    
})

function GenPhoto(src, width, height, alt,x, y) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    img.x = x
    img.y = y

    document.body.appendChild(img);
}

// document.getElementById("Clear").addEventListener('click', function() {
//     var MyCan = document.getElementById("canvas");
//     var ctx = MyCan.getContext('2d');
//     ctx.clearRect(0,0, canvas.width, canvas.height);
// })

function CreateImg(src, width, height, alt) { 
    var ImageObj = new Image();
    ImageObj.src = src;
    ImageObj.width = width;
    ImageObj.height = height;
    ImageObj.alt = alt;
    return ImageObj;
}


