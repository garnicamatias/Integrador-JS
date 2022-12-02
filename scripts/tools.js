

cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
loginStorage = JSON.parse(sessionStorage.getItem("login_data")) || [];

const saveToLocalStorage = (cartStorage) => {
	localStorage.setItem("cart", JSON.stringify(cartStorage));
};



const goToIndex = () => {
	if (window.location.pathname.includes("/index.html") ){
		window.location.href = "#principalRef"
	} else {
		window.location.href = "/index.html";
	}
}

//Funciones del carrito

//Renderiza el listado de productos en el carrito, teniendo en cuenta el LS
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


//Renderiza en el carrito cada card de los items que hay en el LS
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


//Eliminar un item individual del carrito
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

//Agregar o eliminar unidades de items del carrito
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


//Verifica si hay una sola unidad y se elimina, se elimina el item del carrito y del LS
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


//Estila la cantidad de productos en el icono del carrito y en el subtotal del carrito
const renderProductsCounterIcon = () => {
	if (!cartStorage.length) {
		cleanProductsCartIcon();
	} else {
		const totalProducts = productCounter();
		productsCounterIcon.style.display = "flex";
		productsCounterIcon.innerHTML = `<p>${totalProducts}</p>`;
	}
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


//Función para extraer la cantidad de un producto
const desestructuringQuantity = (product) => {
	const { quantity } = product;
	return quantity;
};

//Contados de unidades de cada item en el carrito
const productCounter = () =>{
	let productsCounterArray = cartStorage.map(desestructuringQuantity);
	let totalProducts = productsCounterArray.reduce((a, b) => a + b, 0);
	return totalProducts;
}

//Limpia el contador de items del icono del carrito
const cleanProductsCartIcon = () => {
	productsCounterIcon.style.display = "none";
};


// Chequea si el botón de finalizar compra está activo
const isButtonBuyActive = () => {
	if (checkoutBtn.classList.contains("activeCheckoutBtn")){
		return true;
	} else return false;
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

//Finaliza la compra, si hay items, y en ese caso, limpia carrito y LS
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


//Chequea si se quieren eliminar todos los productos
const clearCartCheck = () => {
	const confirmClear= window.confirm("¿Desea eliminar todos los productos del carrito?");
	
	if (confirmClear) {
		clearCart();
		// showDeleteCartMsg();
		renderProductsCounterIcon();
	}
}

//Limpia carrito y LS
const clearCart = () => {
	cartStorage = [];
	saveToLocalStorage(cartStorage);
	renderCart();
}

//Toma los precios de cada producto, si el subtotal es mayor a 6000, el envío es 0

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

//Limpia los precios del carrito
const cleanPrices = () => {
	total.textContent = "--";
	subtotal.textContent = "--";
	shippingCost.textContent = "--";
	subtotalTitle.textContent = "Subtotal";
};

//Funciones para mostrar y ocultar carrito
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
	backgroundBlur.style.top = "155px"
	backgroundBlur.classList.remove("blurActive")
}

//Funciones que muestran u ocultan el botón de vaciar carrito
const removeCleanCartBtn = () => {
	removeAllCartItems.style.display= "none";
}

const addCleanCartBtn = () => {
	removeAllCartItems.style.display= "flex";
}


//Funciones que hacen consulta a API de Mercado Libre AR

//Trae datos de una categoría en específica y guarda los ID de los items.
const requestCategory = async (id) => {
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const response = await fetch(baseUrl + id);


	const data = await response.json();
	const arrayId = await data.results;
	return arrayId;
}

//Trae data de un item en particular dado su ID
const getProductDataFromId = async (id) => {
	const dataElement= await fetch('https://api.mercadolibre.com/items?ids='+id)
	const data2 = await dataElement.json();
	const restructureData = await data2[0].body;

	return restructureData;
}

//Trae items de una categoría en específica, con un limit y offset pasados por parámetros
const requestCategoryFromId = async (id, limit, offset) =>{
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const dataCategoryResponse = await fetch(baseUrl + id + `&limit=${limit}&offset=${offset}`);
	const dataCategory = await dataCategoryResponse.json();
	return dataCategory;
}


//Funciones que renderizan cards y categorías

//Renderiza card standard, dada data que viene de la API
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
				<p> ${name.slice(0,34)}</p>
				<p>$${Math.trunc(price)}</p>
				</div>
				<button class="addToCart" data-id="${id}"><img src="/assets/img/add_shopping_cart.png" data-id="${id}"> Añadir al Carrito</button>
		</div>`
}

//Renderiza la categoría clickeada en index con 12 cards (items) de dicha categoría
const renderCategory = async (e) => {
	const clickData = e.target.dataset.type;
 
	removeEventFromCategoryCard(clickData)
	const idFromCategory = await searchIdFromCategory (clickData); 
	const categoryName = await searchNameFromCategory (clickData);
	
	categorySelected.innerHTML = ``;
	categorySelectedTitle.innerHTML = `<div class = "categoryRender" id="category${idFromCategory}">`   
	categorySelectedTitle.innerHTML += `
	<h3> ${clickData} </h3>
	`;
	
	const dataCategory = await requestCategoryFromId(idFromCategory,12,0);
	const dataCategoryId = await dataCategory.results;
	
	dataCategoryId.forEach(async element => {
		const dataElement = await getProductDataFromId(element.id);
			categorySelected.innerHTML += await renderCard(dataElement)
			
	})
    addEventFroMCategoryCard(clickData)
	categorySelectedShowMore.innerHTML =`
										<a href="/categories/category.html?id=${idFromCategory}"><button>Ver categoría</button>
										`

    window.location.href = `#category${idFromCategory}`;
};

//Renderiza los 8 items populares de la categoría Juegos y Juguetes de ML
const showMostPopular = async (id) => {
	const arrayId= await requestCategory(id);
	let count = 0;
	arrayId.forEach(async element => {
	const dataElement = await getProductDataFromId(element.id);
			
	if (count < 8) {
	featuredCardContainer.innerHTML += await renderCard(dataElement);
	count++;
	}
	
})
}


//Funciones Auxiliares
//Trae el id de una categoría en específica (guardada en un array)
const searchIdFromCategory = async (data) => {
	const  categoryData = categories.find(element => element.name === data);
	return categoryData.id;
}

//Trae el nombre de una categoría en específica (guardada en un array)
const searchNameFromCategory = async (data) => {
	const  categoryData = categories.find(element => element.name === data);
	return categoryData.category;
}


//Despliega el menu hamburguesa
const checkBurguerMenu = () => {
	if (navbarMenu.classList.contains("burguerDropdown")) {
		navbarMenu.classList.toggle("burguerDropdown")
		navbarMenu.style.display = "none";
	} 
}

const openCloseBurguerMenu = () => {
	if (navbarMenu.style.display === "flex") {
		navbarMenu.style.display = "none";
		navbarMenu.classList.toggle("burguerDropdown")
	} else {
		navbarMenu.style.display = "flex";
		navbarMenu.classList.toggle("burguerDropdown")
	}
};

//Muestra u oculta el navbar según ancho de dispositivo
const showNavBar = () => {
	if (window.innerWidth > 768) {
		navbarMenu.style.display = "flex";
	} else {
		navbarMenu.style.display = "none";
	}
};


//Despliega el menú de categorías
const showDropdownMenu = () => {
	dropdownMenuContainer.style.display = "flex"
}

const activeDropdownMenu = () => {
	dropdownMenuContainer.classList.toggle("active")
}

const hideDropdownMenu = () => {
	if(dropdownMenuContainer.classList.contains("active")){
	return
	} else dropdownMenuContainer.style.display = "none"
}

const desactiveDropdownMenu = () =>  {
	dropdownMenuContainer.style.display = "none";
	dropdownMenuContainer.classList.remove("active")
}

const isShowDropdownMenuClosed = () => {
	if (dropdownMenuContainer.style.display == "flex") {
		dropdownMenuContainer.style.display = "flex"
	} 
}

//Renderiza menú de categorías
const renderDropdownMenu = () => {
	const orderedCategories = compareElements(categories)
	orderedCategories.forEach(element => addCategoryToMenu(element))
	addEventListenerInDropdownMenu()
}

//Añade eventListener a cada categoría del menú desplegable
const addEventListenerInDropdownMenu = () => {
	const categoryDropdownList = document.querySelectorAll(".categoryDropdown")
	categoryDropdownList.forEach(element => {
		element.addEventListener("click", linkToCategoryPage);
	});
}


const addCategoryToMenu = (element) => {
	return categoriesDropdownMenu.innerHTML += `<li id="${element.id}" class="categoryDropdown"> ${element.name} </li>`
}


//Linkea a página de categorías
const linkToCategoryPage = (e) => {
	const categoryId = e.target.id
	window.location.href = `/categories/category.html?id=${categoryId}`
}


//Añade o elimina eventListener a categoría específica
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


//Añade eventListener a categorías de index (traídas con querySelectorAll)
const addEventListenerInCategories = async () => {
	listCategoryCard.forEach(element => {
		element.addEventListener("click", renderCategory);
	});
}


//Linkea a otras categorías (en proceso)
const goToMoreCategories = () => {
	window.location.href = "/categories/otherCategories.html";
}

//Trae ID de producto clickeado
const getProductId = (e) => {
	const productId = e.target.dataset.id;
	return productId;
}

//Añade producto al carrito
const addToCart = async (e) => {

	const productId = getProductId(e);
	if (productId){
		if (!checkBeforeToAdd(productId)) {
			showMsg("El producto se ha añadido al carrito", "addProduct");
			const productData = await getProductDataFromId(productId);
			const productDataWithQuantity = { ...productData, quantity: 1 };
			cartStorage.push(productDataWithQuantity);
			saveToLocalStorage(cartStorage);
			renderCart();
			
		} else showMsg("El producto ya se encuenta en el carrito!", "productRepeat")
	} else return
}
//Verifica si el producto ya se encuentra en el carrito
const checkBeforeToAdd = (product) =>{
	const mapItemsId = cartStorage.map((element) => element.id);
	return mapItemsId.includes(product);
}

//Muestra mensaje (utilizado al agregar item al carrito y alertar si el item ya se encuentra en el mismo)
const showMsg = (msg, msgStyle) =>{
	backgroundBlur.classList.toggle("blurActive")
	alertMsgElement.classList.add("animate__fadeInUp")
	alertMsg.style.display = "flex"
	alertMsgElement.classList.toggle (msgStyle)
	alertMsg.innerHTML = `<p>${msg}</p>`
	setTimeout(
		() => {
			backgroundBlur.classList.remove("blurActive")
			alertMsgElement.classList.remove("animate__fadeInUp")
			alertMsgElement.classList.toggle (msgStyle)
			alertMsg.innerHTML = ``
			alertMsg.style.display = "none"
		},
		1000
		)
	}

// const showDeleteCartMsg = () => {
// 	removeAllProductsMsg.style.display = "flex";
// 	setTimeout(
// 		() => {
// 			removeAllProductsMsg.style.display = "none";
// 		},
// 		1500
// 	)
// }


//Muestra en el header el nombre del usuario registrado
const showUserName = () => {
	
	if (loginStorage[0]) {
		const name = loginStorage[0].name
		userWelcomeMessage.innerHTML =`¡Hola ${name}!`
	}else {
		return
	}
}



//Ordena elementos de mayor a menor o de menor a mayor
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


