import { GET_PROFILE } from '../actionType'

const initialState = {
  user: {
    email: '',
    id: '',
    username: '',
    avatar: '',
    description: '',
  },
}

const profileReducer = (state = initialState, action) => {
  if (action.type === GET_PROFILE) {
    return {
      user: action.payload,
    }
  }
  return initialState
}

export default profileReducer
