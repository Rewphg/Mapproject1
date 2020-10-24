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

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

var mode = 0

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Background = []
const BoothIcons = []
const ToiletIcons = []
const Infos = []

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (Background.length > 0) {
        Background[Background.length-1].Draw()
    }
    requestAnimationFrame(animate)
    BoothIcons.forEach((BoothIcon, index) => {
        BoothIcon.Update()
        if (CheckCollitionImg(BoothIcon, Eraser) == true) {
            BoothIcons.splice(BoothIcon, 1)
        }
    });
    ToiletIcons.forEach((TI, index) => {
        TI.Update()
    })
    Infos.forEach((TI, index) => {
        TI.Update()
    })
    console.log(BoothIcons.length)
}


const Eraser = new eraser(0, 30, 50, 50, "./static/Icons/Eraser.png")

var ConX = 0
var ConY = 0
var On = 0
var EditIndex = 0

//mode 0 = none ,mode 1 = Booth ,mode 2 = Toilet ,mode 3 = info, mode 4 = eraser

document.getElementById("canvas").addEventListener("click", (event) => {
    event.preventDefault()
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left - 25
    MPos.y = event.clientY - border.top - 25
    if (mode == 4) {
        BoothIcons.forEach((A, index) => {
            if (CheckCollition(MPos.x,MPos.y, A) == true) {
                OpenEdit(BoothIcons[index])
                EditIndex = index
            }
        });
        ToiletIcons.forEach((B, index) => {
            if (CheckCollition(MPos.x,MPos.y, B) == true) {
                ToiletIcons.splice(index, 1)
            }
        });
        Infos.forEach((B, index) => {
            if (CheckCollition(MPos.x,MPos.y, B) == true) {
                Infos.splice(index, 1)
            }
        });
    }

    if (MPos.y < canvas.height && MPos.x < canvas.width) {
        On = 1
        if (mode == 1) {
            ConX = event.clientX - border.left - 25
            ConY = event.clientY - border.top - 25
            // BoothIcons.push(new BoothIcon(MPos.x, MPos.y,50,50,"./static/Icons/Icon.png"))
            var index = 1
            ShowMyForm(MPos.x, MPos.y, index)
        }

        if (mode == 2) {
            ToiletIcons.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/toilet.png", "Toilet"))
        }

        if (mode == 3) {
            Infos.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/info.png", "Info"))
        }

        if (CheckCollition(event.clientX, event.clientY, eraser) == true) {
            console.log("Eraser")
        }
    }
})

animate()