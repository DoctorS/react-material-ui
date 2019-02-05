const initialState = {
  email: localStorage && localStorage.email ? localStorage.email : ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      state = action.payload
      if (localStorage) localStorage.email = state.email
      return state
    default:
      return state
  }
}
