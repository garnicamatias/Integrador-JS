const renderIndex = () => {
	categorySelectedContainer.addEventListener("click", addToCart);
	featuredCardContainer.addEventListener("click", addToCart);
	showSixMostPopular(MLCategoryId);
	addEventListenerInCategories();
	
};

renderIndex();

