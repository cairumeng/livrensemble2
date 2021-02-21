import axios from 'axios'
import { GET_PROFILE } from '../actionType'

const getProfile = () => (dispatch) =>
  axios
    .post('/auth/me')
    .then((response) => dispatch({ type: GET_PROFILE, payload: response.data }))

export default getProfile
