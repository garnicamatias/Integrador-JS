const featuredCardContainer = document.querySelector(".featuredCardContainer");
const listCategoryCard = document.querySelectorAll(".categoryCard")
const MLCategoryId = 'MLA1132'
const categorySelected = document.querySelector(".categorySelectedContainer")
const categorySelectedTitle = document.querySelector(".categorySelectedTitle");
const categorySelectedShowMore = document.querySelector(".categorySelectedShowMore");
const categorySelectedContainer = document.querySelector(".categorySelectedContainer");
const overlay = document.querySelector(".overlay")
const addProductMsg= document.querySelector(".addProduct")
const removeProductMsg= document.querySelector(".removeProduct")
const backgroundBlur = document.querySelector(".backgroundBlur")
const userWelcomeMessage = document.querySelector(".userWelcomeMessage")
const categoriesMenuContainer = document.querySelector(".categoriesMenuContainer")
const categoriesDropdownMenu = document.querySelector(".categoriesDropdownMenu")
const dropdownMenuContainer = document.querySelector(".dropdownMenuContainer")

// Carrito
const itemsCartSelected = document.querySelector(".cartProductsContainer");
const subtotal = document.querySelector(".subtotal");
const total = document.querySelector(".total");
const shippingCost = document.querySelector(".shippingCost");
const containerLessAndMore = document.querySelector("#containerLessAndMore");
const buttonLess = document.querySelector("#buttonLess"); 
const buttonPlus = document.querySelector("#buttonPlus");
const deleteAllMsJ = document.querySelector("#deleteAllMsJ");
const itemsCartContainer = document.querySelector("#items-cart-container");
const productsCounterIcon = document.querySelector("#productsCounterIcon");

const header = document.querySelector("header");
const buttonBuy = document.querySelector(".button-buy");
const cartNavIcon = document.querySelector("#cartIconNav");
const closeCartBtn = document.querySelector("#closeCartIcon");
const cartMenu = document.querySelector(".cartMenu");
const removeAllCartItems = document.querySelector(".removeAllItemsBtnContainer");
const cartProductsContainer = document.querySelector(".cartProductsContainer");
const removeAllProductsMsg= document.querySelector(".removeAllProducts")
const subtotalTitle = document.querySelector(".subtotalTitle")
const checkoutBtn = document.querySelector('.checkoutBtn')

const categories = [
	{
		id: "MLA432888",
		name: "Muñecos y Muñecas",
		category:"dolls"
	},
	{
		id: "MLA432988",
		name: "Juegos de Mesa",
		category: "boardGames"
	},
	{
		id: "MLA3655",
		name: "Primeras Infancias",
		category: "firstChildhood"
	},
	{
		id: "MLA1166",
		name: "Peluches",
		category: "teddies"
	},

  	{
		id: "MLA418284",
		name: "Arte y Manualidades",
		category: "artHandcraft"
  	},
  	{
		id: "MLA2967",
		name: "Electrónicos",
		category: "electronic"
  	},
  	{
		id: "MLA432873",
		name: "Hobbies",
		category: "hobbies"
  	},
  	{
		id: "MLA433069",
		name: "Juegos de Agua y Playa",
		category: "waterGames"
    },
  	{
		id: "MLA432991",
		name: "Juegos de Ingenio",
		category: "logicGames"
  	},
  	{
		id: "MLA455425",
		name: "Juguetes de Construcción",
		category: "constructionToys"
  	},
  	{
		id: "MLA432871",
		name: "Vehículos de Juguete",
		category: "vehicleToys"
  	},
   	{
	    id: "MLA1910",
	    name: "Otros",
	    category: "other"
	}
]

cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
loginStorage = JSON.parse(sessionStorage.getItem("login")) || [];

const saveToLocalStorage = (cartStorage) => {
	localStorage.setItem("cart", JSON.stringify(cartStorage));
};



const getPrices = () => {
	const subTotalPrice = cartStorage.reduce((acc, cur) => acc + Number(Math.trunc(cur.price)) * Number(cur.quantity), 0);
	let shippingCostCalc;
	const totalProducts = productCounter();
	if (subTotalPrice >= 6000) {
		shippingCost.textContent = `Gratis`;
		total.textContent = `$${subTotalPrice}`;
	} else {
		shippingCostCalc = 500;
		shippingCost.textContent = `$${shippingCostCalc}`;
		total.textContent = `$${subTotalPrice+shippingCostCalc}`;
	}
	subtotalTitle.textContent = `Subtotal (${totalProducts} productos)`
	
	subtotal.textContent = `$${subTotalPrice}`;

	if (!cartStorage.length) {
		cleanPrices();
	}
};

const cleanPrices = () => {
	total.textContent = "--";
	subtotal.textContent = "--";
	shippingCost.textContent = "--";
	subtotalTitle.textContent = "Subtotal";
};

// const cartRender = () => {
	
// 	// activeButtonBuy();
// };

const showCartMenu = () => {
    cartMenu.style.display = "flex";
	renderCart();
	backgroundBlur.style.right = "450px"
	backgroundBlur.style.top = "0"
	backgroundBlur.classList.toggle("blurActive")
}

const closeCartMenu = () =>{
    cartMenu.style.display = "none";
	backgroundBlur.style.right = "0"
	backgroundBlur.style.top = "130px"
	backgroundBlur.classList.remove("blurActive")
}

const removeCleanCartBtn = () => {
	removeAllCartItems.style.display= "none";
}

const addCleanCartBtn = () => {
	removeAllCartItems.style.display= "flex";
}

// LLamados a API de ML AR

const requestCategory = async (id) => {
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const response = await fetch(baseUrl + id);


	const data = await response.json();
	const arrayId = await data.results;
	return arrayId;
}

const showSixMostPopular = async (id) => {
        const arrayId= await requestCategory(id);
        let count = 0;
		arrayId.forEach(async element => {
		const dataElement = await requestItemFromId(element.id);
				
		if (count < 6) {
		featuredCardContainer.innerHTML += await renderCard(dataElement);
        count++;
		}
		
	})
}

const requestItemFromId = async (id) =>{
		const dataElementResponse= await fetch('https://api.mercadolibre.com/items?ids='+id)
		const dataElement = await dataElementResponse.json();
		const dataElementReestructured = await dataElement[0].body;

		return dataElementReestructured;
}

const renderCard = async (data) => {

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

const searchIdFromCategory = async (data) => {
	const  categoryData = categories.find(element => element.name === data);
	return categoryData.id;
}

const searchNameFromCategory = async (data) => {
	const  categoryData = categories.find(element => element.name === data);
	return categoryData.category;
}


const renderCategory = async (e) => {
	const clickData = e.target.dataset.type;
 
	removeEventFromCategoryCard(clickData)
	const idFromCategory = await searchIdFromCategory (clickData); 
	const categoryName = await searchNameFromCategory (clickData);
	
	categorySelected.innerHTML = ``;
	categorySelectedTitle.innerHTML = `
		<p> ${clickData} </p>
		`;

	let count = 0;
	let arrayCount =0;
	
	
	const dataCategory = await requestCategoryFromId(idFromCategory);
	const dataCategoryId = await dataCategory.results;

	dataCategoryId.forEach(async element => {
			const dataElement = await requestItemFromId(element.id);
			if (count < 12) {
			categorySelected.innerHTML += await renderCard(dataElement)
			count++;
	}
		arrayCount ++;
		if (arrayCount === 12) {
			addEventFroMCategoryCard(clickData)
		}
	})

	categorySelectedShowMore.innerHTML =`
										<a href="/categories/category.html?id=${idFromCategory}"><button>Ver Más  →</button>
										`


};

const removeEventFromCategoryCard = async (data) => {
	listCategoryCard.forEach(element => {
		if (element.dataset.type == data) {
			element.removeEventListener('click', renderCategory)
		}
	});
}

const addEventFroMCategoryCard = async (data) => {
	listCategoryCard.forEach(element => {
		if (element.dataset.type == data) {
			element.addEventListener('click', renderCategory)
		}
	});
}
//armar funcion que renderice n cantidad de cards

const requestCategoryFromId = async (id) =>{
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const dataCategoryResponse = await fetch(baseUrl + id);
	const dataCategory = await dataCategoryResponse.json();

	return dataCategory;
}
// const addCategoryButtonShowMore = (e) => {

// }

const addEventListenerInCategories = async () => {
	listCategoryCard.forEach(element => {
		element.addEventListener("click", renderCategory);
	});
}

// const getProductData = (e) => {		//hacerlo también para los recomendados
// 	const productId = e.target.dataset.id;
// 	if(productId){
// 		if(!checkBeforeToAdd(productId)){
// 			addToCart(productId);
// 		} else {
// 			alert("El producto ya se encuentra en el añadido")
// 		}
// 	} else return
	
// }

const checkBeforeToAdd = (product) =>{
	const mapItemsId = cartStorage.map((element) => element.id);
	return mapItemsId.includes(product);
}

const getProductDataFromId = async (id) => {
	const dataElement= await fetch('https://api.mercadolibre.com/items?ids='+id)
	const data2 = await dataElement.json();
	const restructureData = data2[0].body;
	return restructureData;
}

const getProductId = (e) => {
	const productId = e.target.dataset.id;
	return productId;
}


const addToCart = async (e) => {

	const productId = getProductId(e);
	if (productId){
		if (!checkBeforeToAdd(productId)) {
			showAddMsg();
			const productData = await getProductDataFromId(productId);
			const productDataWithQuantity = { ...productData, quantity: 1 };
			cartStorage.push(productDataWithQuantity);
			saveToLocalStorage(cartStorage);
			renderCart();
			
		} else alert('El producto ya se encuentra en el carrito')
	} else return
}

const showAddMsg = () =>{
		addProductMsg.style.display = "flex";
		backgroundBlur.classList.toggle("blurActive")
	setTimeout(
		() => {
			addProductMsg.style.display = "none";
			backgroundBlur.classList.remove("blurActive")
		},
		600
	)
}

const showDeleteCartMsg = () => {
	removeAllProductsMsg.style.display = "flex";
	setTimeout(
		() => {
			removeAllProductsMsg.style.display = "none";
		},
		1500
	)
}


const renderCart = (e) => {

	if (!cartStorage.length) {
		itemsCartSelected.innerHTML = "<p>Tu carrito está vacío</p>";
		cleanPrices();
		// cleanProductsCartIcon();
		removeCleanCartBtn();
		activeButtonBuy();
		renderProductsCounterIcon();
		return;
	}
	itemsCartSelected.innerHTML = cartStorage.map(renderCartList).join("");
	addCleanCartBtn();
	getPrices();
	activeButtonBuy();
	renderProductsCounterIcon();

}

const renderCartList = (product) => {

	const {id,  title: name, pictures: img,  price, quantity} = product;
	
	return `<div class="cartItemCard">
				<div class="removeBtnContainer" data-id=${id}>
				<img class="imgRemoveItem" src="/assets/img/close_icon.png" data-id=${id} alt="eliminar producto del carrito">
			</div>
			<div class="imgItemContainer">
				<img src="${img[0].secure_url}" alt="miniatura del producto">
			</div>
			<div class="itemContentContainer">
			<div class="itemDescriptionContainer">
				<p>${name.slice(0,40)}</p>
				<p>$${Math.trunc(price)}</p>
			</div>
			<div class="addRemoveBtnContainer">
				<button class="removeItem" data-id=${id}>-</button>
				<p>${quantity}</p>
				<button class="addItem" data-id=${id}>+</button>
			</div>
				</div>
			</div>`
}

const removeCartItem = (e) => {
	if (e.target.classList.contains("imgRemoveItem")){
		const confirmRemove= window.confirm("¿Desea eliminar el producto del carrito");
		if (confirmRemove) {
			const productId = getProductId(e);
			deleteItem(productId);
			renderCart();
		} else return;
	} else return;
}

const addRemoveCartItem = (e) => {
	const productId = e.target.dataset.id;
	if (e.target.classList.contains("addItem")){
		incrementItemQuantity(productId);
	} else if(e.target.classList.contains("removeItem")){
		decrementItemQuantity(productId);
	}
}

const incrementItemQuantity = (productId) => {
	cartStorage = cartStorage.map((item) =>{
		if (item.id === productId) {
			item.quantity ++;
			return item;	
		} else return item;
	})
	renderCart();
	saveToLocalStorage(cartStorage);
}

const decrementItemQuantity = (productId) => {
	cartStorage = cartStorage.map((item) =>{
		if (item.id === productId) {
			if (item.quantity=== 1) {
				const confirmRemove= window.confirm("¿Desea eliminar el producto del carrito");
				if (confirmRemove) {
					item.quantity --;
				}
			} else item.quantity --;
			return item;
		} else return item;
	})
	deleteItemWithNullQuantity();
	renderCart();
	saveToLocalStorage(cartStorage);
}

const renderProductsCounterIcon = () => {
	if (!cartStorage.length) {
		cleanProductsCartIcon();
	} else {
		const totalProducts = productCounter();
		productsCounterIcon.style.display = "flex";
		productsCounterIcon.innerHTML = `<p>${totalProducts}</p>`;
	}
};

const desestructuringQuantity = (product) => {
	const { quantity } = product;
	return quantity;
};

const productCounter = () =>{
	let productsCounterArray = cartStorage.map(desestructuringQuantity);
	let totalProducts = productsCounterArray.reduce((a, b) => a + b, 0);
	return totalProducts;
}

const cleanProductsCartIcon = () => {
	productsCounterIcon.style.display = "none";
};

const deleteItem = (id) => {
	cartStorage = cartStorage.filter(item => item.id !== id)
	saveToLocalStorage(cartStorage)
	return
}

const deleteItemWithNullQuantity = () => {
	cartStorage = cartStorage.filter(item => item.quantity)
	saveToLocalStorage(cartStorage)
	return
}

const activeButtonBuy = () => {

	if (!cartStorage.length) {
		if (checkoutBtn.classList.contains("activeCheckoutBtn")) {
			checkoutBtn.classList.remove("activeCheckoutBtn");
		}
		checkoutBtn.classList.toggle("desactiveCheckoutBtn");
	} else {
		if (checkoutBtn.classList.contains("activeCheckoutBtn")) {
			return;
		}
		checkoutBtn.classList.toggle("activeCheckoutBtn");
		checkoutBtn.classList.remove("desactiveCheckoutBtn")
	}
}

const checkout = () => {
	if(isButtonBuyActive()){
		const confirmCheckout= window.confirm("¿Desea finalizar la compra?");
	if (confirmCheckout) {
		clearCart();
		window.alert("Su compra ha finalizado. Gracias por elegirnos!");
		closeCartMenu();
	} else return;
	} else return;
	
}

// Chequea si el botón de finalizar compra está activo

const isButtonBuyActive = () => {
	if (checkoutBtn.classList.contains("activeCheckoutBtn")){
		return true;
	} else return false;
}


// const addToCart = async (product) => {

// 	const productData= await getProductDataFromId(product);
// 	const productDataWithQuantity = { ...productData, quantity: 1 };
// 	alert('Producto Añadido al Carrito!')
// 	cartStorage.push(productDataWithQuantity);
// 	saveToLocalStorage(cartStorage);
// 	// getPrices();
// 	// cartRender();
// 	// renderProductsCounterIcon();
// };



const clearCartCheck = () => {
	const confirmClear= window.confirm("¿Desea eliminar todos los productos del carrito?");
	
	if (confirmClear) {
		clearCart();
		showDeleteCartMsg();
		renderProductsCounterIcon();
	}
}

const clearCart = () => {
	cartStorage = [];
	saveToLocalStorage(cartStorage);
	renderCart();
}

const showUserName = () => {
	
	if (loginStorage[0]) {
		const name = loginStorage[0].name
		userWelcomeMessage.innerHTML =`¡Hola ${name}!`
	}else {
		return
	}
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

const renderDropdownMenu = () => {
	const orderedCategories = compareElements(categories)
	orderedCategories.forEach(element => addCategoryToMenu(element))
	addEventListenerInDropdownMenu()
}

const addEventListenerInDropdownMenu = () => {
	const categoryDropdownList = document.querySelectorAll(".categoryDropdown")
	categoryDropdownList.forEach(element => {
		element.addEventListener("click", linkToCategoryPage);
	});
}

const linkToCategoryPage = (e) => {
	const categoryId = e.target.id
	window.location.href = `/categories/category.html?id=${categoryId}`
}


const compareElements = (array) => {
	let result = array.sort((c1,c2)=>{
		if (c1.name < c2.name) {
			return -1		
		} else if (c1.name > c2.name){
			return 1
		} else return 0
	})

	return result
}

const addCategoryToMenu = (element) => {
	return categoriesDropdownMenu.innerHTML += `<li id="${element.id}" class="categoryDropdown"> ${element.name} </li>`
}

const showDropdownMenu = () => {
	dropdownMenuContainer.style.display = "flex"
}

const hideDropdownMenu = () => {
	dropdownMenuContainer.style.display = "none"
}

const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeCartBtn.addEventListener("click", closeCartMenu);
	categorySelectedContainer.addEventListener("click", addToCart);
	featuredCardContainer.addEventListener("click", addToCart);
	removeAllCartItems.addEventListener("click", clearCartCheck);
	cartProductsContainer.addEventListener("click", removeCartItem)
	cartProductsContainer.addEventListener("click", addRemoveCartItem)
	checkoutBtn.addEventListener('click', checkout);
	showSixMostPopular(MLCategoryId);
	// categoryCard.addEventListener("click", renderCategory);
	addEventListenerInCategories();
	addEventListenerInDropdownMenu();
	categoriesMenuContainer.addEventListener("mouseover",showDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseover",showDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseout",hideDropdownMenu)
	document.addEventListener("scroll", closeCartMenu)
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

renderCart();
showUserName();
renderDropdownMenu();
init();

