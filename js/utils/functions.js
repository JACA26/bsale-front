
export const filterArrayProducts = (products, categoryId) => {
    const productsByCategory = products.filter(product => product.Category.id === categoryId);
    
    if(productsByCategory.length > 0) {
        return productsByCategory;
    }else{
        return [];
    }
}


export const orderArrayNumbers = (arr) => {
    return arr.sort((a,b)=>a-b); 
}