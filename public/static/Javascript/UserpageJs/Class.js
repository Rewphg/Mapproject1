// var canvas = document.querySelector("Canvas")
// var ctx = canvas.getContent("2d")

class BoothClass {
    constructor(x, y, width, height, src, title, dis, type, fill) {
        this.x = x
        this.y = y
        this.src = src
        this.width = width
        this.height = height
        this.title = title
        this.dis = dis
        this.type = type
        this.fill = fill
    }

    Draw() {
        var B = new Image()
        B.width = this.width
        B.height = this.height
        B.src = this.src
        ctx.drawImage(B, this.x, this.y, this.width, this.height)
        ctx.font = "15px Arial"
        ctx.fillStyle = this.fill
        ctx.textAlign = "center"
        ctx.fillText(this.title, this.x + 24, this.y - 10)
    }

    Update() {
        this.Draw()
    }
}