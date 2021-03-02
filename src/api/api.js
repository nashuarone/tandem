import axios from 'axios'
import { setLearner } from '../redux/profileReducer'

export const registrationAPI = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/registration', {
      email,
      password
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const loginAPI = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(setLearner(response.data.learner))
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
    } catch (e) {
      alert(e.response.data.message);
    }
  }

};
