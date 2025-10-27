import axios from "axios"

const BASE_URL = "http://localhost:5000/api/products"


export const getAllProducts = async () => {
    const pew = (await (axios.get(BASE_URL))).data;
    console.log(pew);
    return pew
}

export const getProdctById = async (productId) => {
    const pew = (await (axios.get(`${BASE_URL}/${productId}`))).data
    console.log(pew);
    return pew
}

export const addProduct = async (product) => {
    const pew = (await (axios.post(BASE_URL, product))).data
    console.log(pew);
    return pew
}

export const updateProduct = async (product, productId) => {
    const pew = (await (axios.put(`${BASE_URL}/${productId}`, product)))
    console.log(pew);
    return pew
}
