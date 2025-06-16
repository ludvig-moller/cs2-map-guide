
var tabs = document.getElementsByClassName("tabs")
for (var i = 0; i<tabs.length; i++) {
    tabs[i].children[0].click()
}

function changeTabContent(currentElement, parentElement) {
    var activeButtons = parentElement.getElementsByClassName("tab-button active")
    for (var i = 0; i<activeButtons.length; i++) {
        activeButtons[i].classList.remove("active")
    }
    currentElement.classList.add("active")

    var newTabId = currentElement.getAttribute("id")
    
    var tabContentElements = parentElement.parentElement.getElementsByClassName("tab-content")
    var newTabContentElement
    for (var i = 0; i<tabContentElements.length; i++) {
        if (tabContentElements[i].getAttribute("id") == newTabId) {
            tabContentElements[i].style.display = "block"
            newTabContentElement = tabContentElements[i]
        }
        else {
            tabContentElements[i].style.display = "none"
        }
    }

    // Activating the first button in new tab
    newTabContentElement.getElementsByClassName("tab-button")[0].click()
}
