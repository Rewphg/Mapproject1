window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let route = false;

    function startRoute(e) {
        route = true;
        draw(e);
    }

    function endRoute() {
        route = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!route) return;
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        
    }
    canvas.addEventListener("mousedown", startRoute);
    canvas.addEventListener("mouseup", endRoute);
    canvas.addEventListener("mousemove", draw);
})