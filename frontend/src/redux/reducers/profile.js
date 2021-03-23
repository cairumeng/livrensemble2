import { GET_PROFILE } from '../actionType'

const initialState = {
  user: {
    email: '',
    id: '',
    username: '',
    avatar: '',
    role: '',
  },
  isAuthenticated: false,
}

const profileReducer = (state = initialState, action) => {
  if (action.type === GET_PROFILE) {
    return {
      user: action.payload,
      isAuthenticated: true,
    }
  }
  return initialState
}

export default profileReducer
