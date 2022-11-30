const featuredCardContainer = document.querySelector(".featuredCardContainer");
const listCategoryCard = document.querySelectorAll(".categoryCard")
const categoryStaticCard = document.querySelector(".categoryStaticCard")
const MLCategoryId = 'MLA1132'
const categorySelected = document.querySelector(".categorySelectedContainer")
const categorySelectedTitle = document.querySelector(".categorySelectedTitle");
const categorySelectedShowMore = document.querySelector(".categorySelectedShowMore");
const categorySelectedContainer = document.querySelector(".categorySelectedContainer");
const overlay = document.querySelector(".overlay")
const cartAlertMsg= document.querySelector(".cartAlertMsg")
const removeProductMsg= document.querySelector(".removeProduct")
const backgroundBlur = document.querySelector(".backgroundBlur")
const userWelcomeMessage = document.querySelector(".userWelcomeMessage")
const categoriesMenuContainer = document.querySelector(".categoriesMenuContainer")
const categoriesDropdownMenu = document.querySelector(".categoriesDropdownMenu")
const dropdownMenuContainer = document.querySelector(".dropdownMenuContainer")
const navbarMenu = document.querySelector(".secondaryUl")
const burguerIcon = document.getElementById("burguerMenu");

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