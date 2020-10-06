

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.addEventListener("click", GenCan);
    function GenCan(e){
        console.log("Create", e.clientX,e.clientY);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(CreateImg("/static/Icons/Icon.png", 100, 100, "ssss"), e.clientX,e.clientY, 50,50)
    }
})
window.addEventListener("click", function(e) {
    console.log('X:', e.x, 'Y:', e.y)
    // GenPhoto("Icons/Icon.png", 1024/4, 1024/4, "ssss",3000,2000)
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

document.getElementById("Clear").addEventListener('click', function() {
    var MyCan = document.getElementById("canvas");
    var ctx = MyCan.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
})

function CreateImg(src, width, height, alt) {
    var ImageObj = new Image();
    ImageObj.src = src;
    ImageObj.width = width;
    ImageObj.height = height;
    ImageObj.alt = alt;
    return ImageObj;
}
