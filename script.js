setInterval(function() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();},1000)

dragElement(document.getElementById("welcomeWindow"));

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

var welcomeScreen = document.querySelector("#welcomeWindow")
var welcomeScreenClose = document.querySelector("#welcomeClose")
var welcomeScreenOpen = document.querySelector("#welcomeOpen")

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex"
}

welcomeScreenClose.addEventListener("click",function() {closeWindow(welcomeScreen);})
welcomeScreenOpen.addEventListener("click",function() {openWindow(welcomeScreen);})