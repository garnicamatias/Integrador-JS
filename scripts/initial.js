
const init = () => {
	cartNavIcon.addEventListener("click", showCartMenu);
	closeCartBtn.addEventListener("click", closeCartMenu);
	removeAllCartItems.addEventListener("click", clearCartCheck);
	cartProductsContainer.addEventListener("click", removeCartItem)
	cartProductsContainer.addEventListener("click", addRemoveCartItem)
	checkoutBtn.addEventListener('click', checkout);
	addEventListenerInDropdownMenu();
	categoriesMenuContainer.addEventListener("mouseover",showDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseover",showDropdownMenu)
	dropdownMenuContainer.addEventListener("mouseout",hideDropdownMenu)
	document.addEventListener("scroll", closeCartMenu)
};

renderCart();
showUserName();
renderDropdownMenu();
init();
