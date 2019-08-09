export const initialState = {
  'hash': null,
  'text': '',
  'saved_text': '',
  'mode': null,
  'saved': true,
  'saving': false
}

const action_map = {
  CHANGE_TEXT: (state, action) => {
    return Object.assign({}, state, {
      text: action.text,
      saved: state.text === action.text
    })
  },
  CHANGE_MODE: (state, action) => {
    return Object.assign({}, state, {
      mode: action.mode,
      saved: false
    })
  },
  SAVE: (state, action) => {
    return Object.assign({}, state, {
      saved: false,
      saving: true
    })
  },
  SAVED: (state, action) => {
    return Object.assign({}, state, {
      saved: true,
      saving: false,
      saved_text: state.text,
      hash: action.hash
    })
  },
  RESET: (state, action) => {
    return Object.assign({}, state, initialState)
  }
}

function reducer (state = initialState, action) {
  if (!action) {
    return state
  }
  if (action_map[action.type] !== undefined) {
    return action_map[action.type](state, action)
  } else {
    return state
  }
}

export default reducer
