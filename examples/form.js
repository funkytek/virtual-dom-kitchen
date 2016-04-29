var h = require('nhg/h')
var State = require('nhg/state')
var Value = require('nhg/value')
var sendSubmit = require('nhg/send-submit')
var _ = require('lodash')
var classNames = require('classnames')

function Form () {
  return State({
    user: Value({}),
    errors: Value({}),
    channels: {
      submit: submit
    }
  })
}

function submit (state, data) {
  // set user from submitted data
  state.user.set(data)
  // determine if there's errors
  state.errors.set(
    _.mapValues(data, function (v) {
      return !v
    })
  )
}

function checkErrors (state, field) {
  return {className: classNames({error: state.errors[field]})}
}

Form.render = function render (state) {
  return ([
    h('pre', [
      'first name: ' + (state.user.firstName || '') + '\n' +
      'last name: '  + (state.user.lastName  || '') + '\n' +
      'agreed: '     + (state.user.agree     || '') + '\n'
    ]),

    h('form.ui.form', {
      'ev-event': sendSubmit(state.channels.submit)
    }, [

      // First Name
      h('div.field', checkErrors(state, 'firstName'), [
        h('label', 'First Name'),
        h('input', {name: 'firstName'})
      ]),

      // Last Name
      h('div.field', checkErrors(state, 'lastName'), [
        h('label', 'Last Name'),
        h('input', {name: 'lastName'})
      ]),

      // Terms
      h('div.field', checkErrors(state, 'agree'), [
        h('div.ui.checkbox', [
          h('input', {type: 'checkbox', name: 'agree'}),
          h('label', 'I agree to terms and conditions')
        ]),
      ]),

      // Submit
      h('div.field',
        h('button.ui.button', {type: 'submit'}, 'Submit')
      )

    ])

  ])
}

module.exports = Form
