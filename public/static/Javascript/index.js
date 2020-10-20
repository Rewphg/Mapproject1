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
}

const Eraser = new eraser(0,30, 50,50,"./static/Icons/Eraser.png" )

addEventListener("click", (event) => {
    MPos.x = event.clientX - border.left
    MPos.y = event.clientY - border.top
    
    BoothIcons.push(new BoothIcon(MPos.x, MPos.y,50,50,"./static/Icons/Icon.png"))

    if (CheckCollition(event.clientX, event.clientY, eraser) == true){
        console.log("Eraser")
    }
})

animate()