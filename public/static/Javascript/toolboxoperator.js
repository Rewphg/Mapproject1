let on = true;
let toolbox = document.getElementById("myForm")
$("#clickbutton").on('click', function(){
    toolbox.setVisible(on);
    on = !on;
});