const urlTitle = document.getElementsByTagName('title')
const subtitleContainer = document.querySelector('.subtitleContainer')

const values = window.location.search;
const urlParams = new URLSearchParams(values);
let categoryId = urlParams.get('id');


const requestCategoryInfo = async (id) => {
	const baseUrl = 'https://api.mercadolibre.com/categories/';
	const response = await fetch(baseUrl + id);


	const data = await response.json();
    return data
}

const categoryData = requestCategoryInfo(categoryId)

const renderCategoryName = async (id, element) => {
    const getCategoryName = await requestCategoryInfo(id);
    element.textContent = getCategoryName.name;

}

const renderCategoryProducts = async (e) => {
 
	let count = 0;
	let arrayCount =0;
		
	const dataCategory = await requestCategoryFromId(categoryId);
	const dataCategoryId = await dataCategory.results;

	dataCategoryId.forEach(async element => {
			const dataElement = await requestItemFromId(element.id);
			categorySelected.innerHTML += await renderCard(dataElement)
			count++;
		arrayCount ++;
		addEventFroMCategoryCard(clickData)
	})

	categorySelectedShowMore.innerHTML =`
										<a href="/categories/category.html?id=${idFromCategory}"><button>Ver Más  →</button>
										`


};


renderCategoryName(categoryId, urlTitle[0].lastChild)
renderCategoryName(categoryId, subtitleContainer.children[0])
renderCategoryProducts()