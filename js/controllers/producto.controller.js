import { URL_BASE } from "../utils/variables";
/* Data Filter Schema default*/
/* dataFilters = {
    category: null,
    orderby: category,
    ordermode: asc,
    withHeader: true,
    filterName: null,
} */

export const getProductsByCategory = async (dataFilter, page = 0) => {
    
    const urlSearchParams = new URLSearchParams();
    //filter data
    let {category, orderby, ordermode, filterName} = dataFilter;
    
    //add category param
    if(category && category !== "") {
        urlSearchParams.append("category", category);
    }
    
    //add orderby param
    if(orderby && orderby !== "") {
        urlSearchParams.append("orderby", orderby);
    }
    
    //add ordermode param
    if(ordermode && ordermode !== "") {
        urlSearchParams.append("ordermode", ordermode);
    }
    
    //add page param
    if(page && page !== "") {
        urlSearchParams.append("page", page);
    }
    
    //add filterName param
    if(filterName && filterName !== "") {
        urlSearchParams.append("filter", filterName);
    }
    
    console.log(urlSearchParams.toString());
    
	const params = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
    
	const data = await fetch(
		`${URL_BASE}/products/search?${urlSearchParams.toString()}&size=12`,
		params
	);
    console.log(data);
	return await data.json();
};