var h = require('nhg/h')
var State = require('nhg/state')
var Value = require('nhg/value')
var sendClick = require('nhg/send-click')
var events = require('../events')

function Click () {
  return State({
    greeting: Value('hello'),
    channels: {
      click: click
    }
  })
}

function click (state, data) {
  state.greeting.set(state.greeting() === 'hola' ? 'hello' : 'hola')
}

Click.render = function render (state) {
  return h('clicker', [
    h('pre', state.greeting + '!'),
    h('button', {
      className: 'ui button',
      'ev-event': events.click(state.channels.click)
    }, 'change me')
  ])
}

module.exports = Click
