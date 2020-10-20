

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

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height)
    Eraser.Draw()
    requestAnimationFrame(animate)
    BoothIcons.forEach((BoothIcon, index) => {
        BoothIcon.Update()
        if (CheckCollitionImg(BoothIcon, Eraser) == true){
            BoothIcons.splice(BoothIcon,1)
        }

        BoothIcons.forEach((B2, I) => {

        })
    });
    ToiletIcons.forEach((TI, index) => {
        TI.Update()
    })
    console.log(BoothIcons.length)
}


const Eraser = new eraser(0,30, 50,50,"./static/Icons/Eraser.png" )


addEventListener("click", (event) => {
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left -25
    MPos.y = event.clientY - border.top -25
})
//mode 0 = none ,mode 1 = Booth ,mode 2 = Toilet ,mode 3 = info, mode 4 = eraser

document.getElementById("canvas").addEventListener("click", (event) => {
    event.preventDefault()
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left - 25
    MPos.y = event.clientY - border.top - 25
    if (mode == 4) {
        BoothIcons.forEach((A, index) => {
            if (CheckCollition(MPos.x,MPos.y, A) == true) {
                BoothIcons.splice(index, 1)
            }
        });
        ToiletIcons.forEach((B, index) => {
            if (CheckCollition(MPos.x,MPos.y, B) == true) {
                ToiletIcons.splice(index, 1)
            }
        });
    }

    if (MPos.y < canvas.height && MPos.x < canvas.width) {
        if (mode == 1) {
            BoothIcons.push(new BoothIcon(MPos.x, MPos.y,50,50,"./static/Icons/Icon.png"))
            ShowMyForm()
        }

        if (mode == 2) {
            ToiletIcons.push(new BoothIcon(MPos.x, MPos.y, 50, 50, "./static/Icons/toilet.png", "Toilet"))
        }

        if (CheckCollition(event.clientX, event.clientY, eraser) == true){
            console.log("Eraser")
        }
    }
})


function Change(M) {
    mode = M
    console.log(M)
}
animate()