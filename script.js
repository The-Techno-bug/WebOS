setInterval(function() {
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();},1000)


dragElement(document.getElementsByClassName("draggableWindow"))
//Make all elements with the draggableWindow Class Draggable
function dragElement(element) {
    var initX = 0;
    var initY = 0;
    var currX = 0;
    var currY = 0;
    if (document.getElementById(element.id + "header")) {document.getElementById(element.id + "header").onmousedown = startDragging; } else {
        element.onmousedown = startDragging
    }
}

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initX = e.clientX;
        initY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initX - e.clientX;

    }