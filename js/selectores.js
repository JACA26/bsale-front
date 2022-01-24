import { getCategories } from "./controllers/categoria.controller";

export const inputSelectAttribute = document.getElementById('orderbySelect');

export const inputSelectCategory = document.getElementById('categorySelect');

export const inputSelectTitleOrder = document.getElementById('titleOrderSelect');

export const formSearch = document.getElementById('searchForm');

export const inputSearch = document.getElementById('searchInput');

export const btnSearch = document.getElementById('btnSearch');

export const categoryContainer = document.querySelector('.category-container');

export const categoryHeader = document.querySelector('.category-header');

export const productContainer = document.querySelector('.product-container');

export const btnReset = document.getElementById('btnReset');






export const paintSelectCategories = async() => {
    const {data: arrCategories} = await getCategories();
    arrCategories.forEach(category => {
        const {id, name} = category;
        const option = document.createElement('option');
        option.value = id;
        option.innerHTML = name;
        inputSelectCategory.appendChild(option);
    });
}

export const paintSelectAttributes = () => {
    const orderTypes = [
        {attribute: 'Categoría', value: 'category'},
        {attribute: 'Precio', value: 'price'},
        {attribute: 'Nombre', value: 'name'},
        {attribute: 'Descuento', value: 'discount'}
    ];
    
    orderTypes.forEach(orderType => {
        const {attribute, value} = orderType;
        
        const option = document.createElement('option');
        option.value = value;
        option.innerHTML = attribute;
        inputSelectAttribute.appendChild(option);
    });
}

export const initSelects = async() => {
    paintSelectAttributes();
    await paintSelectCategories();
}