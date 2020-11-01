//Test zone
var test = [
    {
        "toilet":[
            {
                "x":"55.0",
                "y":"78.0"
            }
        ],
        "booth":[
            {
                "x":"79.0",
                "y":"155.0",
                "boothname":"Hello, World",
                "boothdescription":"Tummai"
            }
        ],
        "info":[
            {
                "x":"102.0",
                "y":"222.0"
            }
        ],
        "route":[
            {
                "x":"100.0",
                "y":"325.0"
            },
    
            {
                "x":"12.0",
                "y":"212.0"
            }
        ],
        maptemplate:"https://yt3.ggpht.com/a/AATXAJywokR9YldORmSqcR0rgcqeH94IYEM9fNP2-SmHpA=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        "toilet":[
            {
                "x":"155.0",
                "y":"178.0"
            }
        ],
        "booth":[
            {
                "x":"9.0",
                "y":"55.0",
                "boothname":"Hello, World",
                "boothdescription":"Tummai"
            }
        ],
        "info":[
            {
                "x":"12.0",
                "y":"22.0"
            }
        ],
        "route":[
            {
                "x":"10.0",
                "y":"32.0"
            },
    
            {
                "x":"27.0",
                "y":"212.0"
            }
        ],
        maptemplate:"https://www.catdumb.tv/wp-content/uploads/2020/10/3-63.jpg"
    }
]

//Real zone
document.getElementById("app").innerHTML = `
<h1 class="project-title">(${test.length})</h1>
${test.map(function(template) {
    return `
    <div class="map">
        <h2>${test.projectname}</h2>
        <img class="map-size" src="${test.maptemplate}">
    </div>
    `
}).join("")}
`