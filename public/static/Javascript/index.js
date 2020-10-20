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



addEventListener("click", (event) => {
    var border = document.getElementById("canvas").getBoundingClientRect();
    MPos.x = event.clientX - border.left -25
    MPos.y = event.clientY - border.top -25
    if (MPos.y < canvas.height && MPos.x < canvas.width) {
        if (mode == 1) {
            BoothIcons.push(new BoothIcon(MPos.x, MPos.y,50,50,"./static/Icons/Icon.png"))
            ShowMyForm()
        }

        if (mode == 2) {
            ToiletIcons.push(new BoothIcon(MPos.x, MPos.y,50,50,"./static/Icons/toilet.png"))
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