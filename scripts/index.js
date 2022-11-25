const renderIndex = () => {
	categorySelectedContainer.addEventListener("click", addToCart);
	featuredCardContainer.addEventListener("click", addToCart);
	showMostPopular(MLCategoryId);
	addEventListenerInCategories();
	
};

renderIndex();

