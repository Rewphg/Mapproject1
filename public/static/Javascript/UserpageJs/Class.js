class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    };
    dequeue() {
        return this.values.shift();
    };
    sort() {
        this.values.sort((a, b) => a.priority = b.priority)
    }
}

class Graph {
    constructor() {
        // this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        // this.nodes.push(node); 
        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = {};
        }

    }

    addEdge(node1, node2, weight) {
        // this.adjacencyList[node1].push({node:node2, weight: weight});
        // this.adjacencyList[node2].push({node:node1, weight: weight});
        this.adjacencyList[node1][node2] = weight
        this.adjacencyList[node2][node1] = weight

    }
    print() {
        return this.adjacencyList
    }

    shortestPath(start, finish) {
        const costFromStartTo = {};
        const checkList = new PriorityQueue();
        const prev = {};

        let current;
        let result = [];
        for (let vert in this.adjacencyList) {
            if (vert === start) {
                costFromStartTo[vert] = 0;
                checkList.enqueue(vert, 0);
            } else {
                costFromStartTo[vert] = Infinity;
            }
            prev[vert] = null;
        }
        while (checkList.values.length) {
            current = checkList.dequeue().val;
            if (current === finish) {
                while (prev[current]) {
                    result.push(current);
                    current = prev[current];
                }
                break;
            }
            else {
                for (let neighbor in this.adjacencyList[current]) {
                    let costToNeighbor = costFromStartTo[current] + this.adjacencyList[current][neighbor];
                    if (costToNeighbor < costFromStartTo[neighbor]) {
                        costFromStartTo[neighbor] = costToNeighbor;
                        prev[neighbor] = current;
                        checkList.enqueue(neighbor, costToNeighbor);
                    }
                }
            }
        }
        console.log(costFromStartTo)
        return result.concat(current).reverse();
    }
}

//
//Function for Shortest Path Zone, Calling Graph Class
//

function distance(obj1, obj2) {
    var delX = obj1.x - obj2.x
    var delY = obj1.y - obj2.y
    var sum = Math.sqrt(delX * delX + delY * delY)
    return sum
}

// document.getElementById("direct").addEventListener("click", function() {
function getShortestPath(current, destination) {
    graph = new Graph()
    // console.log(arr_object)
    // console.log(arr_object[0])

    // for (i = 0; i < arr_object.length; i++) {
    //     graph.addNode(arr_object[i].title)
    // }

    // for (i=0; i < arr_object.length; i++) {
    //     graph.addNode(arr_object[i.title])
    //     for (j=0; j < arr_object.length; j++) {
    //         graph.addNode(arr_object[j].title)
    //         graph.addEdge(arr_object[i].title, arr_object[j].title), distance(arr_object[i], arr_object[j])
    //     }
    // }

    graph.addEdge(arr_object[0].title, arr_object[1].title, distance(arr_object[0], arr_object[1]))
    graph.addEdge(arr_object[1].title, arr_object[2].title, distance(arr_object[1], arr_object[2]))
    graph.addEdge(arr_object[2].title, arr_object[3].title, distance(arr_object[2], arr_object[3]))

    current = "Toilet1"
    destination = "Toilet3"
    sortedTitlePath = graph.shortestPath(current, destination)
    arrLines = []
    sortedTitlePath.forEach(title => {
        arr_object.forEach(obj => {
            if (title == obj.title){
                arrLines.push({x:obj.x, y:obj.y})
            }
        })
    });
    console.log(arrLines)
    const canvas = document.getElementById("Canvas")
    const ctx = canvas.getContext('2d')

    for (i=1; i< arrLines.length; i++){
        // ctx.setLineDash([5, 15]);
        ctx.beginPath();
        // ctx.lineWidth = 5;
        // ctx.lineCap = "round";
        // ctx.strokeStyle = "#FF0000";
        ctx.moveTo(arrLines[i-1].x, arrLines[i-1].y)
        ctx.lineTo(arrLines[i].x, arrLines[i].y)
        ctx.stroke();
    }
}

// graph.addNode("A")
// graph.addNode("B")
// graph.addNode("C")
// graph.addNode("D")

// graph.addEdge("A", "B", 10)
// // graph.addEdge("A", "C", 10)
// graph.addEdge("A", "C", 10)
// graph.addEdge("B", "C", 25)
// graph.addEdge("C", "D", 10)
// console.log(graph.shortestPath("B", "D"))


//End of shortest path zone

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