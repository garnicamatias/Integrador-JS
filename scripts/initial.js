
const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeCartBtn.addEventListener("click", closeCartMenu);
	removeAllCartItems.addEventListener("click", clearCartCheck);
	cartProductsContainer.addEventListener("click", removeCartItem)
	cartProductsContainer.addEventListener("click", addRemoveCartItem)
	checkoutBtn.addEventListener('click', checkout);
	addEventListenerInDropdownMenu();
	categoriesMenuContainer.addEventListener("mouseover",showDropdownMenu)
	categoriesMenuContainer.addEventListener("mouseout",hideDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseover",activeDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseout",desactiveDropdownMenu)
	document.addEventListener("scroll", closeCartMenu)
};

renderCart();
showUserName();
renderDropdownMenu();
init();
