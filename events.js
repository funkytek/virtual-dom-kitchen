var extend = require('xtend')
var BaseEvent = require('value-event/base-event')
var getFormData = require('form-data-set/element')
var _ = require('lodash')

exports.click = require('value-event/click')
exports.submit = require('value-event/submit')
exports.key = require('value-event/key')
exports.change = require('value-event/change')
exports.input = require('value-event/change')

var events = {
  dblclick: 'doubleClick',
  mousdown: 'mouseDown',
  mouseup: 'mouseUp',
  mouseover: 'mouseOver',
  dragstart: 'dragStart',
  change: 'change',
  reset: 'reset',
  focus: 'focus',
  blur: 'blur'
}

_.each(events, function (eventName, domEventName) {
  exports[eventName] = BaseEvent(function (event, broadcast) {
    if (event.type !== domEventName) { return }
    var data = (this.options.getFormData)
      ? extend(getFormData(event.currentTarget), this.data)
      : this.data
    broadcast(data)
  })
})
