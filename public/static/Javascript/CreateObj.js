
class BoothIcon {
<<<<<<< HEAD
    constructor(x, y, width, height, src, title, dis) {
=======
    constructor(x, y, width, height, src) {
>>>>>>> a5778a5e76e4d36ad283713cfa5c0448aed74296
        this.x = x
        this.y = y
        this.src = src
        this.width = width
        this.height = height
<<<<<<< HEAD
        this.title = title
        this.dis = dis
=======
>>>>>>> a5778a5e76e4d36ad283713cfa5c0448aed74296
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
    if (X < rect2.x + rect2.width &&
        Y < rect2.y + rect2.height) {
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

<<<<<<< HEAD
function ShowMyForm(x, y, I) {
    var Form = document.getElementById("CreateForm");
=======
function ShowMyForm() {
    var Form = document.getElementById("myForm");
>>>>>>> a5778a5e76e4d36ad283713cfa5c0448aed74296
    Form.style.display = "block"
}

function DisplayInfo() {
    var title = document.getElementById("DisName").value
    var discript = document.getElementById("Discription").value
    BoothIcons.push(new BoothIcon(ConX, ConY, 50, 50, "./static/Icons/pin.png", title, discript))
    console.log(BoothIcons[BoothIcons.length - 1].title, MPos.x)
    document.getElementById("CreateForm").style.display = "none"
    On = 0
    document.getElementById("DisName").value = ""
    document.getElementById("Discription").value = ""
}

function Change(M) {
    mode = M
    console.log(M)
}

function OpenEdit(B) {
    document.getElementById("EditName").value = B.title
    document.getElementById("EditDis").value = B.dis
    document.getElementById("EditForm").style.display = "block"
}

function ApplyEditBoothInfo() {
    var B = BoothIcons[EditIndex]
    B.title = document.getElementById("EditName").value
    B.dis = document.getElementById("EditDis").value
    document.getElementById("EditForm").style.display = "none"
    document.getElementById("EditName").value = ""
    document.getElementById("EditDis").value = ""
}

function Close(e) {
    document.getElementById(e).style.display = "none"
}