const urlTitle = document.getElementsByTagName('title')
const subtitleContainer = document.querySelector('.subtitleContainer')
const showMoreBtn = document.querySelector('.showMoreBtn')

const values = window.location.search;
const urlParams = new URLSearchParams(values);
let categoryId = urlParams.get('id');


let limit = 20;
let offset= 0;
let categoryProductsArray = []


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
 	
	const dataCategory = await requestCategoryFromId(categoryId, limit, offset);
	const dataCategoryId = await dataCategory.results;

	dataCategoryId.forEach(async element => {
			const dataElement = await requestItemFromId(element.id);
			categorySelected.innerHTML += await renderCard(dataElement)
			categoryProductsArray.push(dataElement)
	})

	offset +=20;
	console.log(categoryProductsArray)
};

renderCategoryName(categoryId, urlTitle[0].lastChild)
renderCategoryName(categoryId, subtitleContainer.children[0])
renderCategoryProducts()
showMoreBtn.addEventListener("click", renderCategoryProducts)