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

  content += "<h1>"+ "Description" + "</h1><br/>"
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
  row.className = "row"
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

function main() {
  var tabsContainer = document.querySelector(".info-tabs")
  var contentBox = document.querySelector(".info-content")

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
}

window.addEventListener("load", main)
