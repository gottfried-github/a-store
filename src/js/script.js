function newTab(tabData) {

  var el = document.createElement("span")
  el.innerText = tabData.name

  return {
    el: el,
    content: tabData.content
  }
}

function fieldsAndDesc() {

}

function table() {

}

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

window.addEventListener("load", main)
