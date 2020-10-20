const MPos = [{
    x: 0,
    y: 0,
}]

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

var mode = 0

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const BoothIcons = []
const ToiletIcons = []

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Eraser.Draw()
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
    console.log(BoothIcons.length)
}


const Eraser = new eraser(0, 30, 50, 50, "./static/Icons/Eraser.png")

var ConX = 0
var ConY = 0
var On = 0

document.getElementById("canvas").addEventListener("click", (event) => {
    event.preventDefault()
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left - 25
    MPos.y = event.clientY - border.top - 25

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
            ToiletIcons.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/toilet.png"))
        }

        if (CheckCollition(event.clientX, event.clientY, eraser) == true) {
            console.log("Eraser")
        }
    }
})

function DisplayInfo() {
    var title = document.getElementById("DisName").value
    BoothIcons.push(new BoothIcon(ConX, ConY, 50, 50, "./static/Icons/Icon.png", title))
    console.log(BoothIcons[BoothIcons.length - 1].title, MPos.x)
    document.getElementById("myForm").style.display = "none"
    On = 0
}

function Change(M) {
    mode = M
    console.log(M)
}
animate()