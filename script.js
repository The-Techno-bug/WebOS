setInterval(function() {document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();},1000);
document.querySelector("#dateElement").innerHTML = new Date().toDateString();

sideBarTitle = document.querySelector("#sideBarTitle")
topBarTitle = document.querySelector("#topBarTitle")

function syncText(source,target) {
    target.textContent = source.textContent;
}

sideBarTitle.addEventListener('keyup', ()=> syncText(sideBarTitle,topBarTitle))
topBarTitle.addEventListener('keyup', ()=> syncText(topBarTitle,sideBarTitle))

var content = [
    {
        title: "Welcome",
        date: new Date().toDateString(),
        selected: true,
        content: ``
    }
]

function addNote() {
    content.forEach(element => { 
        element.selected = false
    });
    content.concat({
        title: "New Note",
        date: new Date().toDateString(),
        selected: true,
        content: ``
    })


}

function dragElement(element) {
    var initX = 0;
    var initY = 0;
    var currX = 0;
    var currY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initX = e.clientX;
        initY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        currX = initX - e.clientX;
        currY = initY - e.clientY;
        initX = e.clientX;
        initY = e.clientY;

        element.style.top = (element.offsetTop - currY) + "px";
        element.style.left = (element.offsetLeft - currX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

class desktopApp {
    constructor(name,image) {
        this.name = name;
        this.image = image;
        this.element = undefined;
        this.show()
        this.windowName = this.name + "Window"
        this.closeName = this.name + "Close"
    }
    show(){
        const desktop = document.getElementById("desktop");
        const newDiv =`<div class="icon" id="${this.name}"><img src="${this.image}" alt="icon" height="128px" width="128px"></img></div>`;
        desktop.insertAdjacentHTML('beforeend',newDiv);
        this.element = document.getElementById(this.name);
        this.element.addEventListener("click",() => {selectIcon(this);});
    }

    open() {
        const windowElement = document.getElementById(this.windowName);
        if (windowElement) {
            openWindow(windowElement);
            var closeScreen = document.querySelector(("#"+this.closeName))
            closeScreen.addEventListener("click",() => this.close())
            dragElement(windowElement)
            windowElement.addEventListener("mousedown",() => handleWindowTap(windowElement))
        }
    }

    close() {
        const windowElement = document.getElementById(this.windowName);
        if (windowElement) {
            closeWindow(windowElement);
        }
    }
}

var selectedIcon = null;

function selectIcon(app) {
    if (selectedIcon === app) {
        app.element.classList.remove("selected");
        selectedIcon = null;
        app.open();
        return;
    }

    if (selectedIcon) {
        selectedIcon.element.classList.remove("selected");
    }

    app.element.classList.add("selected");
    selectedIcon = app;
}
function closeWindow(element) {
    element.classList.add("invisible");
    biggestIndex--;
}

function openWindow(element) {
    element.classList.remove("invisible");
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

const app = new desktopApp("welcome", "./Images/star.png");
const app2 = new desktopApp("notes", "./Images/star.png");

var biggestIndex = 1