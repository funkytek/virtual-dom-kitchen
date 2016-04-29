var h = require('nhg/h')
var State = require('nhg/state')
var Value = require('nhg/value')
var sendSubmit = require('nhg/send-submit')

function Input () {
  return State({
    message: Value('Type a message and hit enter'),
    channels: {
      submit: submit
    }
  })
}

function submit (state, data) {
  state.message.set(data.message)
}

Input.render = function render (state) {
  return ([
    h('pre', state.message),
    h('div.ui.input',
      h('input.ui.input', {
        placeholder: 'Your Message',
        name: 'message',
        'ev-event': sendSubmit(state.channels.submit, {}, {key: 13})
      })
    )
  ])
}

module.exports = Input
