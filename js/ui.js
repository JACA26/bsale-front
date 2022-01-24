import { getCategoriesIds } from "./controllers/categoria.controller";
import { getProductsByCategory } from "./controllers/producto.controller";
import { btnReset, categoryContainer, formSearch, inputSearch, inputSelectAttribute, inputSelectCategory, inputSelectTitleOrder } from "./selectores";
import { filterArrayProducts, orderArrayNumbers } from "./utils/functions";

//data filters default
let dataFilters = {
    category: null,
    orderby: 'category',
    ordermode: 'asc',
    withHeader: true,
    filterName: null,
}


const limpiarHTML = () => {
    // limpiar los resultados anteriores
    while(categoryContainer.firstChild) {
        categoryContainer.removeChild(categoryContainer.firstChild);
    }
}


const resetFilters = async() => {
    // resetear los filtros
    dataFilters = {
        category: null,
        orderby: 'category',
        ordermode: 'asc',
        withHeader: true,
        filterName: null,
    }
    inputSearch.value = "";
    inputSelectCategory.value = "";
    inputSelectAttribute.value = "";
    inputSelectTitleOrder.value = "";
    await mostrarProductos(dataFilters);
}
const noResultElement = () => {
    const noResult = document.createElement('div');
    noResult.classList.add('no-result', 'alert','alert-danger');
    noResult.innerHTML = "No se encontraron resultados";
    categoryContainer.appendChild(noResult);
}


export const pintarProductCard = (product) => {
    //destructuring product
    const {name, price, url_image, discount} = product;
    
    //create url for default image
    const url = (url_image === "" || !url_image) ? "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" : url_image
    
    const productCard = document.createElement('div');
    productCard.classList.add('row', 'product-container');
    productCard.innerHTML = `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card">
                <img
                    src="${url}"
                    class="card-img-top img-product"
                    alt="${name}"
                />
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <p class="small text-secondary">Descuento</p>
                        <p class="small text-danger">${discount}%</p>
                    </div>
                    
                    <div class="d-flex justify-content-between mb-3">
                        <h5 class="mb-0">${name}</h5>
                        <h5 class="text-dark mb-0">$${price}</h5>
                    </div>
                </div>
            </div>
        </div>
    `
    return productCard;
}

const pintarCategoryContainer = async(productsByCategory, withHeader = true) => {
    
    if(withHeader === "") {
        withHeader = true;
    }
    
    let cardsHtml = '';
    const categoryRow = document.createElement('div');
    categoryRow.classList.add('row','mt-3');
    
    //create cards for each product
    productsByCategory.forEach(product => {
        cardsHtml += pintarProductCard(product).innerHTML;
    });
    
    //validate template for category header
    if(withHeader){
        const categoryName = productsByCategory[0].Category.name;
        //Row by category
        categoryRow.innerHTML = 
        `<div class="col-12 category-header">
            <h3 class="text-left">${categoryName}</h3>
            <hr />
        </div>
        <div class="row product-container">
            ${cardsHtml}
        </div>`
    }else{
        //Row by category
        categoryRow.innerHTML = 
        `<div class="row product-container">
            ${cardsHtml}
        </div>`
    }
    
    //insert row to DOM
    categoryContainer.appendChild(categoryRow);
}


const processCategoryData = async(products, withHeader = true) => {
    
    
    if(withHeader){
        let categoriesIds = await getCategoriesIds();
        categoriesIds = orderArrayNumbers(categoriesIds);
        
        categoriesIds.forEach(categoryId => {
            
            //filter products from data by categoryId
            const productsByCategory = filterArrayProducts(products, categoryId);
            
            if(productsByCategory.length > 0){
                
                //if is not empty, create list products
                //create category Header
                pintarCategoryContainer(productsByCategory, withHeader);
            }else{
                //if is empty, return
                return "no elements";
            }
        })
    }else{
        if(products.length > 0){
            pintarCategoryContainer(products, withHeader);
        }else{
            return "no elements";
        }
    }
    }


const pintarPaginacion =  async (totalPaginas) => {
    
    $('#pagination-products').twbsPagination({
        totalPages: (totalPaginas+1),
        visiblePages: 10,
        initiateStartPageClick: false,
        onPageClick: async (event, page) => {
            console.log(page);
            await mostrarProductos(dataFilters, page-1);
        }
    });
}

const mostrarProductos = async(dataFilter, page = 0) => {
    
    const {withHeader} = dataFilter;
    
    if(!page || page === "") {
        page = 0;
    }
    
    if(withHeader === "" || withHeader === null || withHeader === undefined) {
        withHeader = true;
    }
    
    limpiarHTML();
    const data = await getProductsByCategory(dataFilter, page);
    console.log(data);
    
    //validate if result is empty show no result message
    if(data.products.length === 0){
        noResultElement();
    }else{
    const {products, totalPages} = data;
    processCategoryData(products, withHeader);
    pintarPaginacion(totalPages);
    }
}




/* ON CHANGE FILTERS */
//on change attribute
inputSelectAttribute.addEventListener('input', async(e) => {
    //toggle category header
    if(e.target.value === "category"){
        dataFilters.withHeader = true;
    }else{
        dataFilters.withHeader = false;
    }
    
    //set attribute
    dataFilters.orderby = e.target.value;
    
    //send fetch to show result
    await mostrarProductos(dataFilters);
});

//on change category
inputSelectCategory.addEventListener('input', async (e) => {
    //toggle category header
    if(e.target.value === "") {
        dataFilters.withHeader = true;
    }else{
        dataFilters.withHeader = false;
    }
    
    //set category
    dataFilters.category = e.target.value;
    
    //send fetch to show result
    await mostrarProductos(dataFilters);
});

//on change order
inputSelectTitleOrder.addEventListener('input', async (e) => {
    //set order
    dataFilters.ordermode = e.target.value;
    
    //send fetch to show result
    await mostrarProductos(dataFilters);
});

//on search name product
formSearch.addEventListener('submit', async (e) => {
    //prevent default
    e.preventDefault();
    
    //get value
    dataFilters.filterName = inputSearch.value;
    
    //send fetch to show result
    await mostrarProductos(dataFilters);
});


//reset filters
btnReset.addEventListener('click', async() => {
    //reset filters
    await resetFilters();
} );



export const init = async() => {
    limpiarHTML();
    await mostrarProductos(dataFilters);
}