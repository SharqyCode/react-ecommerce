import axios from "axios"

const BASE_URL = "http://localhost:5000/api/users"


export const getAllUsers = async () => {
    const pew = (await (axios.get(BASE_URL))).data.data.users;
    console.log("Get Users:", pew);
    return pew
}

export const getUserById = async (userId) => {
    const pew = (await (axios.get(`${BASE_URL}/${userId}`))).data
    console.log(pew);
    return pew
}

export const addUser = async (user) => {
    const pew = (await (axios.post(BASE_URL, user))).data
    console.log(pew);
    return pew
}

export const updateUser = async (userId, user) => {
    const pew = (await (axios.put(`${BASE_URL}/${userId}`, user))).data
    console.log("update:", pew);
    return pew
}

export const deleteUserById = async (userId) => {
    const pew = (await (axios.delete(`${BASE_URL}/${userId}`))).data
    console.log(pew);
    return pew
}
