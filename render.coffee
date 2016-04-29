h = require 'nhg/h'
{div, button} = require('hyperscript-helpers')(h)
sendClick = require 'nhg/send-click'

module.exports = (state) ->
  div [
    'hello foo ' + state.hello
    button {
      'ev-click': sendClick(state.channels.click)
    }, 'change me'
  ]
