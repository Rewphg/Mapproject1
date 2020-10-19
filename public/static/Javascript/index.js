const MPos = [{
    x: 0,
    y: 0,
}]

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const mode = 0

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const BoothIcons = [] 

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height)
    Eraser.Draw()
    requestAnimationFrame(animate)
    BoothIcons.forEach((BoothIcon, index) => {
        BoothIcon.Update()
        if (mode == 1) {
            if (CheckCollition(MPos, BoothIcon) == true){
                BoothIcons.splice(index,1)
                mode = 0
            }
        }
        if (CheckCollitionImg(BoothIcon, Eraser) == true){
            BoothIcons.splice(index,1)
            mode = 1
        }

        BoothIcons.forEach((B2, I) => {
            
        })
    });
}

const Eraser = new eraser(0,30, 50,50,"./static/Icons/Eraser.png" )

addEventListener("click", (event) => {
    if (mode == 0) {
        BoothIcons.push(new BoothIcon(event.clientX, event.clientY,50,50,"./static/Icons/Icon.png"))
    }
    if (CheckCollition(event.clientX, event.clientY, eraser) == true){
        mode = 1
        console.log("Eraser")
    }
    MPos.x = event.clientX
    MPos.y = event.clientY
})

addEventListener('mouseover', (event) => {
    
})

animate()