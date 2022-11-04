const cartNavIcon = document.querySelector("#cartIconNav");
const closeCartBtn = document.querySelector("#closeCartIcon");
const cart = document.querySelector(".cart");


const showCartMenu = () => {
    cart.style.display = "flex";
}

const closeCartMenu = () =>{
    cart.style.display = "none";
}



const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeCartBtn.addEventListener("click", closeCartMenu);
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