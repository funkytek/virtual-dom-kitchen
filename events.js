var extend = require('xtend')
var BaseEvent = require('value-event/base-event')
var getFormData = require('form-data-set/element')
var _ = require('lodash')

exports.click = require('value-event/click')
exports.submit = require('value-event/submit')
exports.key = require('value-event/key')
// exports.change = require('value-event/change')
// exports.input = require('value-event/change')

var events = {
  dblclick: 'doubleClick',
  mousdown: 'mouseDown',
  mouseup: 'mouseUp',
  mouseover: 'mouseOver',
  dragstart: 'dragStart',
  change: 'change',
  reset: 'reset',
  focus: 'focus',
  blur: 'blur',
  input: {
    name: 'input',
    defaults: {
      getFormData: true
    }
  },
  change: {
    name: 'change',
    defaults: {
      getFormData: true
    }
  }
}

_.each(events, function (eventData, domEventName) {
  var defaults = eventData.defaults
  var eventName = eventData.name
  exports[eventName] = BaseEvent(function eventHandler (event, broadcast) {
    if (event.type !== domEventName) return

    var options = defaults
      ? extend(defaults, this.options)
      : (this.options || {})

    if (options.ignore) return
    if (options.preventDefault) event.preventDefault()

    var data = options.getFormData
      ? extend(getFormData(event.currentTarget), this.data)
      : this.data

    broadcast(data)
  })
})
