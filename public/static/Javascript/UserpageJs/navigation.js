let graph = new Graph();
var pid = `{{pid}}`

function euclid() {
    graph.addNode(arr_object)
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", window.location.href + "/json", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data)
        data.object.forEach(element => {
            graph.addNode(element)
        });
        console.log(graph)
    }
}

//Reference: Medium, LevelUp, TutorialPoints