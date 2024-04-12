import axios from "axios"

export const axiosJWT = axios.create()

export const getAllUserSelected = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
    return res.data
}

export const getTaskUser = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/todos`)
    return res.data
}
