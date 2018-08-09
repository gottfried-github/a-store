function newTab(tab) {

  var el = document.createElement("span")
  el.innerText = tab.name

  tab.el = el
  return tab
}

function fieldsAndDesc(data) {
  var container = document.createElement('div')
  var content = ""
  data.fields.forEach((field) => {
    // var span = document.createElement('span')
    // span.innerText = field.key
    content += "<span>"+ field.key +":</span> "+ field.value +"<br/>"
  })

  content += "<h2>"+ "Description" + "</h2>"
  content += data.description

  container.innerHTML = content
  return container
}

function newRow(row) {
  var el = document.createElement('div')

  row.forEach((cell) => {
    var cellSpan = document.createElement('span')
    cellSpan.innerText = cell
    el.appendChild(cellSpan)
  })

  return el
}

function table(items) {
  var el = document.createElement('div')

  // add column names
  var row = newRow(['', 'L', 'D', 'H'])
  row.className = "row column-names"
  el.appendChild(row)
  // var row_columnNames = ['', 'L', 'D', 'H']

  items.forEach((item) => {
    var row = newRow([
      item.name,
      item.sizes.l,
      item.sizes.d,
      item.sizes.h
    ])
    row.className = "row"

    el.appendChild(row)
  })

  return el
}

function fitPhoto(container, image) {

  var containerRects = container.getBoundingClientRect()
  var imageRects = image.getBoundingClientRect()

  if (imageRects.width == 0 || imageRects.height == 0)
    throw new Error('image side is 0')

  // we define our ratio based on width:
  var containerRatio = containerRects.width / containerRects.height
  var imageRatio = imageRects.width / imageRects.height

  console.log('fitPhoto', imageRects, image)
  console.log('fitPhoto', containerRects, container)

  if (imageRatio > containerRatio) {
    // fit picture by width
    // $picture.width(theWindow.width + 'px')
    // $picture.height(theWindow.width / pictureRatio + 'px')
    // return $picture.get(0);

    var imageWidth = containerRects.width
    // image.style.width = containerRects.width.toString()+ 'px'

    var imageHeight = containerRects.width / imageRatio
    // image.style.height = imageHeight.toString() + 'px'
    console.log('fitPhoto, imgRatio > contRatio' )
    return {
      w: imageWidth,
      h: imageHeight
    }
  } else if (imageRatio < containerRatio) {
    // fit picture by height

    var imageWidth = containerRects.height * imageRatio
    // image.style.width = imageWidth.toString() +'px'

    var imageHeight = containerRects.height
    // image.style.height = containerRects.height.toString() +'px'
    console.log('fitPhoto, imgRatio < contRatio' )
    return {
      w: imageWidth,
      h: imageHeight
    }
  } else {
    return {
      w: imageRects.width,
      h: imageRects.height
    }
  }
}

function show(el, beforeshow, aftershow) {
  const classTransition = 'large-photo-anim'
  const classNoned = 'noned'

  el.classList.remove(classNoned)
  beforeshow()

  el.classList.add(classTransition)

  function transitionendCb() {
    el.classList.remove(classTransition)
    el.removeEventListener('transitionend', transitionendCb)
    aftershow()
  }

  el.addEventListener('transitionend', transitionendCb)
  el.style.opacity = '1'
}

function hide(el) {
  const classTransition = 'large-photo-anim'
  const classNoned = 'noned'

  el.classList.add(classTransition)

  function transitionendCb() {
    el.classList.remove(classTransition)
    el.classList.add(classNoned)
    el.removeEventListener('transitionend', transitionendCb)
    // afterhide()
  }

  el.addEventListener('transitionend', transitionendCb)
  el.style.opacity = '0'
}

function main() {
  var productContainer = document.querySelector(".product_container")
  var tabsContainer = productContainer.querySelector(".info-tabs")
  var contentBox = productContainer.querySelector(".info-content")

  // id of currently active (visible) content element, in info-content
  var contentActive = null

  data.tabs.forEach((tab) => {
    tab = newTab(tab)

    // var contentEl = document.createElement('div')
    // contentEl.className = "content-slot"

    if (tab.name == "general") {
      var content = fieldsAndDesc(tab.content)
      content.className = "content-slot fields-and-desc"

      // we create a unique id on content dom and store it in our tab,
      // to be able to reference it from the tab later on
      content.id = "info-general"
      tab.el.dataset.contentId = "info-general"

      contentBox.appendChild(content)
      contentActive = content.id
    } else if (tab.name == "dimensions") {
      var content = table(tab.content.items)
      content.className = "content-slot table"

      // the dimensions tab is not visible, by default
      content.className += " noned"

      content.id = "info-dimensions"
      tab.el.dataset.contentId = "info-dimensions"

      contentBox.appendChild(content)
    }

    tab.el.addEventListener('click', function() {

      if (contentActive == this.dataset.contentId)
        return

      // select the content element, respective to the clicked tab
      var content = contentBox.querySelector('#'+this.dataset.contentId)
      var contentActiveEl = contentBox.querySelector('#'+contentActive)
      console.log(contentActive, content)

      // hide currently active content sheet
      contentActiveEl.classList.add("noned")

      // make our content visible somehow (either with display none/block, or
      // using animation to scroll it into view, we'll see)
      content.classList.remove("noned")
      contentActive = content.id
    })

    tabsContainer.appendChild(tab.el)
  })

  var thumbs = productContainer.querySelectorAll(".photo_thumb")
  var largeView = document.querySelector(".large-photo")
  var largeCurrent = new Image()
  largeView.appendChild(largeCurrent)

  console.log(thumbs)

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', function() {
      console.log("thumb clicked")
      var img = new Image()

      img.onload = (function(imgLoaded) {
        return function() {
          console.log("loaded image", imgLoaded.src)
          imgLoaded.className = 'fullsize'
          largeView.replaceChild(imgLoaded, largeCurrent)
          largeCurrent = imgLoaded

          // imgLoaded.style.visibility = 'hidden'
          // largeView.classList.remove('noned')

          show(largeView,
            // beforeshow - fires after noned class is removed, but before opacity is set
            () => {
              var newDims = fitPhoto(largeView, imgLoaded)
              imgLoaded.style.width = newDims.w +'px'
              imgLoaded.style.height = newDims.h +'px'
            },
            () => {

            }
          )

          // imgLoaded.style.visibility = 'visible'
          // largeView.style.backgroundImage = "url("+ imgLoaded.src +")" // thumb.dataset.url
        }
      })(img)
      console.log(thumb.dataset.url)

      img.src = thumb.dataset.url
    })
  })

  largeView.addEventListener('click', (ev) => {
    console.log(ev)
    // return if the click bubbles from the image (we don't want to close the view if user clicks on image)
    if (ev.target.className == 'fullsize')
     return

     hide(largeView)
    // largeView.classList.add('noned')
  })

}

window.addEventListener("load", main)
