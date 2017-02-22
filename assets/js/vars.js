
window.chooseVar = function (id) {
  var newValue = prompt('What would you like the variable to be?')
  if (newValue) {
    setVar(id, newValue)
  }
}

window.setVar = function (id, value) {
  getVarEls(id).forEach(function (el) {
    if (el.classList.contains('shorten') && value.length > 8)
      el.innerHTML = value.slice(0, 4) + '..' + value.slice(-2)
    else
      el.innerHTML = value
  })
}

function getVarEls (id) {
  return Array.prototype.slice.call(document.querySelectorAll('var[id="' + id + '"]'))
}