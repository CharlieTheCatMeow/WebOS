//Welcome Screen variables
var welcomeScreen = document.querySelector("#welcomeScreen")
var welcomeScreenClose = document.querySelector("#closeWelcomeScreenWindow")
var welcomeScreenOpen = document.querySelector("#openWelcomeScreenWindow")

//Stopwatch Variables
var stopwatch = document.querySelector("#stopwatch")
var stopwatchClose = document.querySelector("#closeStopwatchWindow")
var stopwatchOpen = document.querySelector("#openStopwatchWindow")

//top bar variable
var topBar = document.querySelector("#top_bar")

var selectedIcon = undefined
var icons = document.querySelectorAll(".app_icon")

var biggestIndex = 1

//clock
function updateTime() {
    var currentTime = new Date().toLocaleString()
    var timeText = document.querySelector("#clockTime")
    timeText.innerHTML = currentTime
}
setInterval(updateTime, 1000)

//dragging windows
function dragElement(element) {
    var initialX = 0
    var initialY = 0
    var currentX = 0
    var currentY = 0
    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = startDragging
    } else {
        element.onmousedown = startDragging
    }

    function startDragging(e) {
        e.preventDefault()
        initialX = e.clientX
        initialY = e.clientY
        document.onmouseup = stopDragging
        document.onmousemove = dragElement
    }

    function dragElement(e) {
        e.preventDefault()
        currentX = initialX - e.clientX
        currentY = initialY - e.clientY
        initialX = e.clientX
        initialY = e.clientY
        element.style.top = (element.offsetTop - currentY) + "px"
        element.style.left = (element.offsetLeft - currentX) + "px"
    }
    function stopDragging() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

//open and close windows
function closeWindow(element) {
    element.style.display = "none"
}
function openWindow(element) {
    element.style.display = "flex"
    biggestIndex++
    element.style.zIndex = biggestIndex
    topBar.style.zIndex = biggestIndex + 1
}

//selecting icons
function selectIcon(element) {
    if (selectedIcon && selectedIcon !== element) {
        deselectIcon(selectedIcon)
    }
    element.classList.add("selected")
    selectedIcon = element

    setTimeout(function () {
        if (selectedIcon == element) {
            deselectIcon(element)
        }
    }, 300)
}
function deselectIcon(element) {
    element.classList.remove("selected")
    selectedIcon = undefined
}
function iconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        var targetWindowID = element.getAttribute("data-window")
        var targetWindow = document.getElementById(targetWindowID)

        if (targetWindow) {
            openWindow(targetWindow)
        }
    } else {
        selectIcon(element)
    }
}

//Window z-index
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}
function handleWindowTap(element) {
    biggestIndex++
    element.style.zIndex = biggestIndex
    topBar.style.zIndex = biggestIndex + 1
    deselectIcon(selectedIcon)
}

//icons
icons.forEach(function (icon) {
    icon.addEventListener("click", function () {
        iconTap(icon)
    })
})


//Welcome Screen
dragElement(document.getElementById("welcomeScreen"))
welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen)
})
welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen)
})
addWindowTapHandling(welcomeScreen)

//Stopwatch
dragElement(document.getElementById("stopwatch"))
stopwatchClose.addEventListener("click", function() {
  closeWindow(stopwatch)
})
stopwatchOpen.addEventListener("click", function() {
  openWindow(stopwatch)
})
addWindowTapHandling(stopwatch)