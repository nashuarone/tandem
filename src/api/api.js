import axios from 'axios'
import { setLearner } from '../redux/profileReducer'
import { setFiles, addFile } from "../redux/fileReducer";

export const registrationAPI = async (email, password, myname, surname) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/registration', {
      email,
      password,
      myname,
      surname
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

export const authAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/auth", {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}
      );
      dispatch(setLearner(response.data.learner));
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
    } catch (e) {
      localStorage.removeItem('token')
      alert(e.response.data.message);
    }
  };
};

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId ? "?parent=" + dirId : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setFiles(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
