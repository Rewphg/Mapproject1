class BoothIcon {
    constructor(x, y, width, height, src, title, dis) {
        this.x = x
        this.y = y
        this.src = src
        this.width = width
        this.height = height
        this.title = title
        this.dis = dis
    }

    Draw() {
        var B = new Image()
        B.width = this.width
        B.height = this.height
        B.src = this.src
        ctx.drawImage(B, this.x, this.y, this.width, this.height)
        ctx.font = "15px Arial"
        ctx.textAlign = "center"
        ctx.fillText(this.title, this.x + 24, this.y - 10)
    }

    Update() {
        this.Draw()
        this.x = this.x
        this.y = this.y
    }
}

class eraser {
    constructor(x, y, width, height, src) {
        this.x = x
        this.y = y
        this.src = src
        this.width = width
        this.height = height
    }

    Draw() {
        var B = new Image()
        B.width = this.width
        B.height = this.height
        B.src = this.src
        ctx.drawImage(B, this.x, this.y, this.width, this.height)
    }

    Update() {
        this.Draw()
        this.x = this.x
        this.y = this.y
    }
}

function CheckCollition(X, Y, rect2) {
    if (X < rect2.x + rect2.width / 2 &&
        X > rect2.x - rect2.width / 2 &&
        Y < rect2.y + rect2.height / 2 &&
        Y > rect2.y - rect2.height / 2) {
        return true
    }
}

function CheckCollitionImg(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true
    }
}

function ShowMyForm(x, y, I) {
    var Form = document.getElementById("CreateForm");
    Form.style.display = "block"
}

function DisplayInfo() {
    var title = document.getElementById("DisName").value
    var discript = document.getElementById("Description").value
    object.booth.push(new BoothIcon(ConX, ConY, 50, 50, "./static/Icons/pin.png", title, discript))
    //console.log(object.booth[object.booth.length - 1].title, object)
    document.getElementById("CreateForm").style.display = "none"
    On = 0
    document.getElementById("DisName").value = ""
    document.getElementById("Description").value = ""
}

function Change(M) {
    mode = M
    console.log(object)
}

function OpenEdit(B) {
    document.getElementById("EditName").value = B.title
    document.getElementById("EditDis").value = B.dis
    document.getElementById("EditForm").style.display = "block"
}

function ApplyEditBoothInfo() {
    var B = object.booth[EditIndex]
    B.title = document.getElementById("EditName").value
    B.dis = document.getElementById("EditDis").value
    document.getElementById("EditForm").style.display = "none"
    document.getElementById("EditName").value = ""
    document.getElementById("EditDis").value = ""
}

function Close(e) {
    document.getElementById(e).style.display = "none"
}

function preview(input) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("display").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
}

function toCanvas() {
    var image = document.getElementById("display");
    Background.push(new eraser(10, 10, canvas.Width, canvas.Height, image))
}