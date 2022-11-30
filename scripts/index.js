const renderIndex = () => {
	categorySelectedContainer.addEventListener("click", addToCart);
	featuredCardContainer.addEventListener("click", addToCart);
	// categoryStaticCard.addEventListener("click", goToMoreCategories)
	showMostPopular(MLCategoryId);
	addEventListenerInCategories();
};

renderIndex();

