import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://module-user-ltct.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function login_14(username, password) {
  try {
    const res = await axiosInstance.post('/login', { username, password })
    return res.data
  } catch (error) {
    return error
  }
}

export async function getListUsers_14() {
  try {
    const res = await axiosInstance.get('users/active')
    return res.data
  } catch (error) {
    return error
  }
}

export async function deleteUser_14(id) {
  try {
    const res = await axiosInstance.delete('user/' + id)
    return res.data
  } catch (error) {
    return error
  }
}

export async function getAccountById_14(id) {
  try {
    const res = await axiosInstance.get('user/' + id)
    return res.data
  } catch (error) {
    return error
  }
}

export async function updateAccount_14(id, data) {
  try {
    const res = await axiosInstance.put('/user/' + id, data)
    return {
      success: true,
      ...res.data,
    }
  } catch (error) {
    return {
      success: false,
      ...error,
    }
  }
}
