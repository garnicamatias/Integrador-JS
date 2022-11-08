const cartNavIcon = document.querySelector("#cartIconNav");
const closeCartBtn = document.querySelector("#closeCartIcon");
const featuredCardContainer = document.querySelector(".featuredCardContainer");
const cart = document.querySelector(".cart");
const listCategoryCard = document.querySelectorAll(".categoryCard")
const MLCategoryId = 'MLA1132'
const categorySelected = document.querySelector(".categorySelectedContainer")
const categorySelectedTitle = document.querySelector(".categorySelectedTitle")

const categories = [
	{
		id: "MLA432888",
		name: "Muñecos y Muñecas",
	},
	{
		id: "MLA432988",
		name: "Juegos de Mesa",
	},
	{
		id: "MLA3655",
		name: "Primeras Infancias",
	},
	{
		id: "MLA1166",
		name: "Peluches",
	},
]


const showCartMenu = () => {
    cart.style.display = "flex";
}

const closeCartMenu = () =>{
    cart.style.display = "none";
}


// LLamados a API de ML AR

const requestCategory = async (id) => {
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const response = await fetch(baseUrl + id);


	const data = await response.json();
	const arrayId = await data.results;
	return arrayId;
}

const showFiveMostPopular = async (id) => {
        const array= await requestCategory(id);
        let count = 0;
		array.forEach(async element => {
		const dataElement= await fetch('https://api.mercadolibre.com/items?ids='+element.id)
		const data2 = await dataElement.json();
		if (count < 5) {
		featuredCardContainer.innerHTML +=`
								<div class="featuredCard">
									<div class="imgCardContainer">
									   <img src="${data2[0].body.pictures[0].secure_url}" alt="">
									</div>
									<div class="cardDataContainer">
										<p> ${data2[0].body.title.slice(0,40)}</p>
										<p>$${data2[0].body.price}</p>
									</div>
									<button>Añadir al Carrito</button>
								</div>`;

        count++;
		}
	})
}

const searchIdFromCategory = (data) => {
	const  categoryData = categories.find(element => element.name === data);
	return categoryData.id;
}

const renderCategory = async (e) => {
	const clickData = e.target.dataset.type;
	console.log(clickData)
	const idFromCategory = searchIdFromCategory (clickData);

	categorySelected.innerHTML = "";
	categorySelectedTitle.innerHTML = `
		<p> ${clickData} </p>
	`;

	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const response = await fetch(baseUrl + idFromCategory);


	const data = await response.json();
	const arrayId = await data.results;

	console.log(data);

	let count = 0;
		arrayId.forEach(async element => {
		const dataElement= await fetch('https://api.mercadolibre.com/items?ids='+element.id)
		const data2 = await dataElement.json();
		console.log(data2);
		if (count < 5) {
		categorySelected.innerHTML +=`
								<div class="featuredCard">
									<div class="imgCardContainer">
									   <img src="${data2[0].body.pictures[0].secure_url}" alt="">
									</div>
									<div class="cardDataContainer">
										<p> ${data2[0].body.title.slice(0,40)}</p>
										<p>$${data2[0].body.price}</p>
									</div>
									<button>Añadir al Carrito</button>
								</div>`;

        count++;
		}
	})

	// if (clickData === "popular") {
	// 	randomProducts();
	// 	changeBtnActive(clickData);
	// 	changeFilterTitle(clickData);
	// } else if (clickData) {
	// 	menuContainer.innerHTML = "";
	// 	const obtainProduct = productsArray.filter(
	// 		(objeto) => objeto.category === clickData
	// 	);
	// 	renderProduct = obtainProduct.map(
	// 		(object) => (menuContainer.innerHTML += desestructuringPopulars(object))
	// 	);
	// }
};

const addEventListenerInCategories = () => {
	listCategoryCard.forEach(element => {
		element.addEventListener("click", renderCategory);
	});
}
// arrayId.forEach(element => {

// });

// arrayId.forEach(element => {
//     div_prueba.innerHTML +=`<div class="textImgContainer">
//                             <p> ${element.price}</p>
//                             <img src="${element.thumbnail}" alt=""></div>`
// });


// const getImg = async (id) =>{
//     const dataElement= await fetch('https://api.mercadolibre.com/items?ids='+id)
//     const data2 = await dataElement.json();
//     console.log(data2[0].body.pictures[0].secure_url)
//     return data2[0].body.pictures[0].secure_url;
// }

// arrayId.forEach(element => {
//     var urlImg = getImg(element.id)
//     div_prueba.innerHTML +=`<img src="${urlImg}" alt="">`
// });

// const urlId = await data.results[0].id;
// const request = await fetch('https://api.mercadolibre.com/items?ids='+urlId)
// const data2 = await request.json(request)
// console.log(data2);

// // const urlImg = await data.results[0].thumbnail;
// // const urlImg2= await data2[0].body.pictures[0].secure_url;
// console.log(data)


const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeCartBtn.addEventListener("click", closeCartMenu);
	showFiveMostPopular(MLCategoryId);
	// categoryCard.addEventListener("click", renderCategory);
	addEventListenerInCategories();
	// burguerIcon.addEventListener("click", openCloseBurguerMenu);
	// showMoreButton.addEventListener("click", showFourMore);
 	// showLessButton.addEventListener("click", () => showLessFunction(filterMostPopulars(productsArray)));
 	// filterMostPopulars(productsArray);
	// menuContainer.addEventListener("click", getItemInfo);
	// cartMenuContainer.addEventListener("click", getItemInfo);
	// recommendedApp.addEventListener("click", getItemInfo);
	// window.addEventListener("resize", showNavBar);
	// document.addEventListener("click", renderMenu);
	// deleteAllMsJ.addEventListener("click", deleteAllProductsItems);
	// buttonBuy.addEventListener("click", checkout);
	// renderProductsCounterIcon();
	// closeCartMenuToScroll();
	// randomRecommended();
	// randomProducts()
};

// cartRender();

init();