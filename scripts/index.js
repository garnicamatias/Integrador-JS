const cartNavIcon = document.querySelector("#cartIconNav");
const closeCartBtn = document.querySelector("#closeCartIcon");
const featuredCardContainer = document.querySelector(".featuredCardContainer");
const cart = document.querySelector(".cart");

const MLCategoryId = 'MLA1071'


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
		console.log(data2);
		if (data2[0].body.domain_id !== "MLA-PUREBRED_DOGS" && count < 5) {
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