cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
loginStorage = JSON.parse(sessionStorage.getItem("login_data")) || [];

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

const showMostPopular = async (id) => {
        const arrayId= await requestCategory(id);
        let count = 0;
		arrayId.forEach(async element => {
		const dataElement = await requestItemFromId(element.id);
				
		if (count < 8) {
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
				<p> ${name.slice(0,34)}</p>
				<p>$${Math.trunc(price)}</p>
			</div>
			<button class="addToCart" data-id="${id}"><img src="/assets/img/add_shopping_cart.png" data-id="${id}"> Añadir al Carrito</button>
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
	// categorySelectedTitle.innerHTML = ``    agregar un div fantasma
	categorySelectedTitle.innerHTML = `
		<h3> ${clickData} </h3>
		`;
	
	const dataCategory = await requestCategoryFromId(idFromCategory,12,0);
	const dataCategoryId = await dataCategory.results;

	dataCategoryId.forEach(async element => {
			const dataElement = await requestItemFromId(element.id);
			categorySelected.innerHTML += await renderCard(dataElement)
			
	})
    addEventFroMCategoryCard(clickData)
	categorySelectedShowMore.innerHTML =`
										<a href="/categories/category.html?id=${idFromCategory}"><button>Ver categoría</button>
										`

    window.location.href = "#categoryRender";
};


const showNavBar = () => {
	if (window.innerWidth > 768) {
		navbarMenu.style.display = "flex";
	} else {
		navbarMenu.style.display = "none";
	}
};


const openCloseBurguerMenu = () => {
	if (navbarMenu.style.display === "flex") {
		navbarMenu.style.display = "none";
		navbarMenu.classList.toggle("burguerDropdown")
	} else {
		navbarMenu.style.display = "flex";
		navbarMenu.classList.toggle("burguerDropdown")
	}
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

const requestCategoryFromId = async (id, limit, offset) =>{
	const baseUrl = 'https://api.mercadolibre.com/sites/MLA/search?category=';
	const dataCategoryResponse = await fetch(baseUrl + id + `&limit=${limit}&offset=${offset}`);
	const dataCategory = await dataCategoryResponse.json();
	return dataCategory;
}



const addEventListenerInCategories = async () => {
	listCategoryCard.forEach(element => {
		element.addEventListener("click", renderCategory);
	});
}

const goToMoreCategories = () => {
	window.location.href = "/categories/otherCategories.html";
}

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
			showMsg("Producto añadido al carrito!", "addProduct");
			const productData = await getProductDataFromId(productId);
			const productDataWithQuantity = { ...productData, quantity: 1 };
			cartStorage.push(productDataWithQuantity);
			saveToLocalStorage(cartStorage);
			renderCart();
			
		} else alert('El producto ya se encuentra en el carrito')
	} else return
}

const showMsg = (msg, msgClass) =>{
		backgroundBlur.classList.toggle("blurActive")
		console.log(cartAlertMsg)
		cartAlertMsg.classList.toggle("alertMsg")
		cartAlertMsg.classList.toggle("addProduct")
		cartAlertMsg.innerHTML = `<p>${msg}</p>`
	setTimeout(
		() => {
			backgroundBlur.classList.remove("blurActive")
			cartAlertMsg.classList.remove(msgClass)
			cartAlertMsg.innerHTML = ``
		},
		700
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