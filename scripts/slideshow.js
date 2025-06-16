
// Getting all slideshow in document
var slideshowElements = document.getElementsByClassName("slideshow")
for (var i = 0; i<slideshowElements.length; i++) {
    createSlideshow(slideshowElements[i])
}

// Creating slideshow
// Creating index container content and updating slide
function createSlideshow(slideshowElement) {
    // Getting elements
    var slideshowTitleElement = slideshowElement.getElementsByClassName("slide-title")[0]
    var slideshowImageElement = slideshowElement.getElementsByClassName("slide-image")[0]
    var slideshowVideoElement = slideshowElement.getElementsByClassName("slide-video")[0]
    var slideshowIndexContainerElement = slideshowElement.getElementsByClassName("index-container")[0]
    var slideshowDataElement = slideshowElement.getElementsByClassName("slideshow-data")[0]

    // Getting slideshow data
    var slideshowIndex = slideshowDataElement.getAttribute("index")
    var slideshowSlides = slideshowDataElement.getAttribute("slides")
    var slideshowSlideTitles = slideshowDataElement.getAttribute("slide-titles")

    // Parsing data
    slideshowIndex = parseInt(slideshowIndex)
    slideshowSlides = JSON.parse(slideshowSlides)
    slideshowSlideTitles = JSON.parse(slideshowSlideTitles)

    // Creating index container content
    createIndexContainerContent(slideshowIndex, slideshowSlides.length, slideshowIndexContainerElement)

    // Updating slide
    updateSlide(slideshowIndex, slideshowSlides, slideshowSlideTitles, slideshowImageElement, slideshowVideoElement, slideshowTitleElement)
}

// Change slideshow attributes
// Change slides (images/videos) and slide titles
function changeSlideshowAttributes(element, slideshowElement, slides, slideTitles) {
    // Changing active class to new button
    var activeButtons = element.parentElement.getElementsByClassName("tab-button active")
    for (var i = 0; i<activeButtons.length; i++) {
        activeButtons[i].classList.remove("active")
    }
    element.classList.add("active")

    // Getting data element
    var slideshowDataElement = slideshowElement.getElementsByClassName("slideshow-data")[0]

    // Updating data
    slideshowDataElement.setAttribute("index", "0")
    slideshowDataElement.setAttribute("slides", slides)
    slideshowDataElement.setAttribute("slide-titles", slideTitles)

    createSlideshow(slideshowElement)
}

// Change slide
function changeSlide(value, slideshowElement) {
    // Getting elements
    var slideshowTitleElement = slideshowElement.getElementsByClassName("slide-title")[0]
    var slideshowImageElement = slideshowElement.getElementsByClassName("slide-image")[0]
    var slideshowVideoElement = slideshowElement.getElementsByClassName("slide-video")[0]
    var slideshowIndexContainerElement = slideshowElement.getElementsByClassName("index-container")[0]
    var slideshowDataElement = slideshowElement.getElementsByClassName("slideshow-data")[0]

    // Getting slideshow data
    var slideshowIndex = slideshowDataElement.getAttribute("index")
    var slideshowSlides = slideshowDataElement.getAttribute("slides")
    var slideshowSlideTitles = slideshowDataElement.getAttribute("slide-titles")

    // Parsing data
    slideshowIndex = parseInt(slideshowIndex)
    slideshowSlides = JSON.parse(slideshowSlides)
    slideshowSlideTitles = JSON.parse(slideshowSlideTitles)

    // Updating index
    slideshowIndex += value
    if (slideshowIndex < 0) {
        slideshowIndex = slideshowSlides.length-1
    } 
    else if (slideshowIndex > slideshowSlides.length-1) {
        slideshowIndex = 0
    }
    slideshowDataElement.setAttribute("index", slideshowIndex)

    // Updating index container
    updateIndexContainer(slideshowIndex, slideshowIndexContainerElement)

    // Updating slide
    updateSlide(slideshowIndex, slideshowSlides, slideshowSlideTitles, slideshowImageElement, slideshowVideoElement, slideshowTitleElement)
}

// Create index container content
function createIndexContainerContent(index, slides, indexContainerElement) {
    // Removing content inside container
    indexContainerElement.innerHTML = ""

    // Adding index container content
    for (var i = 0; i<slides; i++) {
        var element = document.createElement("span")
        element.classList.add("index")
        if (i == index) {
            element.classList.add("active")
        }
        indexContainerElement.appendChild(element)
    }
}

// Updating index container
// Changing class active to current index
function updateIndexContainer(index, slideshowIndexContainerElement) {
    var activeIndexElements = slideshowIndexContainerElement.getElementsByClassName("index active")
    for (var i = 0; i<activeIndexElements.length; i++) {
        activeIndexElements[i].classList.remove("active")
    }
    var indexElements = slideshowIndexContainerElement.getElementsByClassName("index")
    indexElements[index].classList.add("active")
}

// Updating slide
// Setting src of image/video element to correct file
function updateSlide(index, slides, titles, slideshowImageElement, slideshowVideoElement, slideshowTitleElement) {
    // Getting current slide and looking at the file extension for image or video
    var currentSlide = slides[index]

    if (currentSlide == undefined) {
        return
    }

    var fileExtention = currentSlide.slice(-3)
    if (fileExtention == "jpg") {
        slideshowImageElement.setAttribute("src", currentSlide)
        slideshowImageElement.style.display = "block"
        slideshowVideoElement.setAttribute("src", "")
        slideshowVideoElement.style.display = "none"
        slideshowVideoElement.pause()
    }
    else {
        slideshowVideoElement.setAttribute("src", currentSlide)
        slideshowVideoElement.style.display = "block"
        slideshowImageElement.setAttribute("src", "")
        slideshowImageElement.style.display = "none"
    }

    if (titles.length-1<index) {
        slideshowTitleElement.innerText = ""
    } else {
        slideshowTitleElement.innerText = titles[index]
    }
}
