import axios from "axios"

const BASE_URL = "http://localhost:5000/api/categories"


export const getAllCategories = async () => {
    const pew = (await (axios.get(BASE_URL))).data;
    console.log("Get categories:", pew);
    let category = [];
    let subCategory = [];
    pew.map((item) => {
        if (item.parentCategory)
            subCategory.push(item.name)
        else
            category.push(item.name)
    })

    return { category, subCategory }
}

// export const getProdctById = async (productId) => {
//     const pew = (await (axios.get(`${BASE_URL}/${productId}`))).data
//     console.log(pew);
//     return pew
// }

// export const addProduct = async (product) => {
//     const pew = (await (axios.post(BASE_URL, product))).data
//     console.log(pew);
//     return pew
// }

// export const updateProduct = async (productId, product) => {
//     const pew = (await (axios.put(`${BASE_URL}/${productId}`, product))).data
//     console.log("update:", pew);
//     return pew
// }

// export const deleteProductById = async (productId) => {
//     const pew = (await (axios.delete(`${BASE_URL}/${productId}`))).data
//     console.log(pew);
//     return pew
// }
