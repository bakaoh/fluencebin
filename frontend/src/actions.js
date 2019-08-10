export function ChangeText (text) {
  return {
    type: 'CHANGE_TEXT',
    text
  }
}

export function ChangeMode (mode) {
  return {
    type: 'CHANGE_MODE',
    mode
  }
}

export function ChangeSpinner (show) {
  return {
    type: 'CHANGE_SPINNER',
    show
  }
}

export function Save () {
  return {
    type: 'SAVE'
  }
}

export function Saved (hash) {
  return {
    type: 'SAVED',
    hash
  }
}

export function Reset () {
  return {
    type: 'RESET'
  }
}
