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

/*
var row_columnNames = document.createElement('div')
var blank = document.createElement('span') // .className =
var l = document.createElement('span').innerText = "L"
var d = document.createElement('span').innerText = "D"
var h = document.createElement('span').innerText = "H"

row_columnNames.appendChild(blank)
row_columnNames.appendChild(l)
row_columnNames.appendChild(d)
row_columnNames.appendChild(h)
*/

function main() {
  var tabsContainer = document.querySelector(".info-tabs")
  var contentBox = document.querySelector(".info-content")

  data.tabs.forEach((tab) => {
    tab = newTab(tab)
    tabsContainer.appendChild(tab.el)

    // var contentEl = document.createElement('div')
    // contentEl.className = "content-slot"

    if (tab.name == "general") {
      var content = fieldsAndDesc(tab.content)
      content.className = "content-slot fields-and-desc"
      contentBox.appendChild(content)
    } else if (tab.name == "dimensions") {
      var content = table(tab.content.items)
      content.className = "content-slot table"
      contentBox.appendChild(content)
    }
  })
}

window.addEventListener("load", main)
