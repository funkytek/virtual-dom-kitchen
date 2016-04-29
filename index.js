var RunApp = require('nhg/app')
var h = require('nhg/h')
var {div, button} = require('hyperscript-helpers')(h)
var State = require('nhg/state')
var Value = require('nhg/value')
var sendClick = require('nhg/send-click')
var sendSubmit = require('nhg/send-submit')
var sendKey = require('nhg/send-key')
var fs = require('fs')
var highlight = require('highlight.js')
var stripComments = require('strip-comments')

var Click = require('./examples/click')
var Input = require('./examples/input')
var Form = require('./examples/form')

// fetch code
function getCode (file) {
  // highlight code
  return highlight.highlightAuto(file, ['javascript']).value
}

function renderComponent (state, name, component, file) {

  var code = getCode(file)

  return [
    h('h2.ui.dividing.header', name),
    component.render(state[name]),
    h('div.ui.segment',
      h('pre', h('code', {innerHTML: code}))
    )
  ]

}


// TODO: document can't use name

function App () {
  return State({
    click: Click(),
    input: Input(),
    form: Form()
  })
}

App.render = function render (state) {
  return h('kitchensink', {className: 'ui container'}, [
    h('h1', 'virtual-dom events'),
    h('p', 'Events in virtual-dom work a bit differently than other frameworks, here are some examples to get you started'),

    // Click
    renderComponent(state, 'click', Click, fs.readFileSync('./examples/click.js', 'utf8')),
    // Input
    renderComponent(state, 'input', Input, fs.readFileSync('./examples/input.js', 'utf8')),
    // Form
    renderComponent(state, 'form', Form, fs.readFileSync('./examples/form.js', 'utf8'))

  ])
}

RunApp(document.body, App(), App.render)
