import { URL_BASE } from "../utils/variables";


export const getCategories = async () => {
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    const categories = await fetch(`${URL_BASE}/categories`, params);
    // console.log(categories.json());
    return categories.json();
}


export const getCategoriesIds = async () => {
    const {data} = await getCategories();
    const categoriesIds = [];
    data.forEach(category => {
        categoriesIds.push(category.id);
    });
    return categoriesIds;
}