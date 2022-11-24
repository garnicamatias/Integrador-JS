const urlTitle = document.getElementsByTagName('title')
const subtitleContainer = document.querySelector('.subtitleContainer')
const showMoreBtn = document.querySelector('.showMoreBtn')
const sortAscBtn = document.querySelector('.sortAscBtn')
const sortDescBtn = document.querySelector('.sortDescBtn')

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

let newArray=[]

const renderCardSync = (data) => {

	const {id,  title: name, pictures: img,  price} = data;
	return `
	<div class="itemCard">
		<div class="favIconContainer">
			<img src="/assets/img/favHeart.png" alt="agregar a favoritos">
		</div>
		<div class="imgCardContainer">
		   <img src="${img[0].secure_url}" alt="">
		</div>
		<div class="cardDataContainer">
			<p> ${name.slice(0,40)}</p>
			<p>$${Math.trunc(price)}</p>
		</div>
		<button class="addToCart" data-id="${id}">Añadir al Carrito</button>
	</div>`
}

const sortPriceAsc = (e) =>{
	let newArray = categoryProductsArray
	newArray.sort((a,b)=>{return a.price - b.price})
	categorySelected.innerHTML =""
	newArray.forEach(element => categorySelected.innerHTML += renderCardSync(element))
}

const sortPriceDesc = (e) =>{
	let newArray = categoryProductsArray
	newArray.sort((a,b)=>{return b.price - a.price})
	categorySelected.innerHTML =""
	newArray.forEach(element => categorySelected.innerHTML += renderCardSync(element))
}

renderCategoryName(categoryId, urlTitle[0].lastChild)
renderCategoryName(categoryId, subtitleContainer.children[0])
renderCategoryProducts()
showMoreBtn.addEventListener("click", renderCategoryProducts)
// showMoreBtn.addEventListener("click", sortAscendenting(categoryProductsArray))
categorySelectedContainer.addEventListener("click", addToCart);
sortAscBtn.addEventListener("click", sortPriceAsc)
sortDescBtn.addEventListener("click", sortPriceDesc)