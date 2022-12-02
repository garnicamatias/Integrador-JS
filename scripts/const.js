// Principales
const header = document.querySelector("header");
const logoContainer = document.querySelector(".logoContainer")
const navbarMenu = document.querySelector(".secondaryUl")
const userWelcomeMessage = document.querySelector(".userWelcomeMessage")
const dropdownMenuContainer = document.querySelector(".dropdownMenuContainer")
const burguerIcon = document.getElementById("burguerMenu");
const categoriesDropdownMenu = document.querySelector(".categoriesDropdownMenu")
const categoriesMenuContainer = document.querySelector(".categoriesMenuContainer")
const listCategoryCard = document.querySelectorAll(".categoryCard")
const categoryStaticCard = document.querySelector(".categoryStaticCard")
const categorySelected = document.querySelector(".categorySelectedContainer")
const categorySelectedTitle = document.querySelector(".categorySelectedTitle");
const categorySelectedContainer = document.querySelector(".categorySelectedContainer");
const categorySelectedShowMore = document.querySelector(".categorySelectedShowMore");
const featuredCardContainer = document.querySelector(".featuredCardContainer");
const MLCategoryId = 'MLA1132'
const backgroundBlur = document.querySelector(".backgroundBlur")
const alertMsg = document.querySelector(".alertMsg")
const alertMsgElement = document.getElementById("alertMsg")
const removeProductMsg= document.querySelector(".removeProduct")



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
const buttonBuy = document.querySelector(".button-buy");
const cartNavIcon = document.querySelector("#cartIconNav");
const closeCartBtn = document.querySelector("#closeCartIcon");
const cartMenu = document.querySelector(".cartMenu");
const removeAllCartItems = document.querySelector(".removeAllItemsBtnContainer");
const cartProductsContainer = document.querySelector(".cartProductsContainer");
const removeAllProductsMsg= document.querySelector(".removeAllProducts")
const subtotalTitle = document.querySelector(".subtotalTitle")
const checkoutBtn = document.querySelector('.checkoutBtn')


// Registro y Login
const form = document.querySelector("form") 
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const emailInput = document.getElementById("email")
const phoneNumberInput = document.getElementById("phoneNumber")
const nameInput = document.getElementById("name")
const welcomeMsg = document.querySelector(".welcomeMsg")
const loginError = document.getElementById("loginError")
const createAccountBtn = document.querySelector(".createAccountBtn")



// Array de Categorías Específicas de ML
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