var h = require('nhg/h')
var State = require('nhg/state')
var Value = require('nhg/value')
var sendSubmit = require('nhg/send-submit')
var events = require('../events')

function Input () {
  return State({
    message: Value('Your message here'),
    channels: {
      submit: submit,
      input: input
    }
  })
}

function submit (state, data) {
  state.message.set(data.message)
}

function input (state, data) {
  state.message.set(data.typer)
}

Input.render = function render (state) {
  return ([
    h('pre', state.message),
    h('div.ui.input', [

      h('input.ui.input', {
        placeholder: 'Your Message',
        name: 'typer',
        value: state.message,
        'ev-event': events.input(state.channels.input)
      })

    ])
  ])
}

module.exports = Input
