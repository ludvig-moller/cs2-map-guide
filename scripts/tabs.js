
// Getting all tabs in document and activating first button in each tab
var tabs = document.getElementsByClassName("tabs")
for (var i = 0; i<tabs.length; i++) {
    tabs[i].children[0].click()
}

// Changing tab content
function changeTabContent(currentElement, parentElement) {
    // Changing active class new button
    var activeButtons = parentElement.getElementsByClassName("tab-button active")
    for (var i = 0; i<activeButtons.length; i++) {
        activeButtons[i].classList.remove("active")
    }
    currentElement.classList.add("active")

    // Getting tab ID
    var newTabId = currentElement.getAttribute("id")
    
    // Getting tab-content and setting block display to the one matching the new tab id
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
