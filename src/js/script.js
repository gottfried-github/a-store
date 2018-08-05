function newTab(tabData) {

  var el = document.createElement("span")
  el.innerText = tabData.name

  return {
    el: el,
    content: tabData.content
  }
}

function fieldsAndDesc(data) {
  var container = document.createElement('div')
  var content = ""
  data.fields.forEach((field) => {
    // var span = document.createElement('span')
    // span.innerText = field.key
    content += "<span>"+ field.key + "</span><br/>"
  })

  content += "<h1>"+ "Description" + "</h1><br/>"
  content += data.description

  container.innerHTML = content
  return content
}

function newRow(row) {
  var row = document.createElement('div')

  row.forEach((cell) => {
    var cellSpan = document.createElement('span')
    cellSpan.innerText = cell
    row.appendChild(cell)
  })

  return row
}

function table(data) {
  var el = document.createElement('div')

  // add column names
  el.appendChild(newRow(['', 'L', 'D', 'H']))
  // var row_columnNames = ['', 'L', 'D', 'H']

  data.forEach((product) => {
    var row = newRow([
      product.name,
      product.sizes.l,
      product.sizes.d,
      product.sizes.h
    ])

    el.appendChild(row)
  })
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
  var tabs = document.querySelector(".info-tabs")
  var contentBox = document.querySelector(".info-content")

  tabs.forEach((tab) => {
    var tabDom = newTab(tab)
    tabs.appendChild(tab.el)

    // var contentEl = document.createElement('div')
    // contentEl.className = "content-slot"

    if (tab.name == "general") {
      var content = fieldsAndDesc(tab.content)
      content.el.className = "content-slot fields-and-desc"
      contentBox.appendChild(content)
    } else if (tab.name == "dimensions") {
      var content = table(tab.content)
      content.el.className = "content-slot table"
      contentBox.appendChild(content)
    }
  })
}

// window.addEventListener("load", main)
